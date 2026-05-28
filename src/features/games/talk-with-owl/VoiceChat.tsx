"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { useGeminiLive } from "@/hooks/useGeminiLive";
import { useAccess } from "@/context/AccessContext";
import { createClient } from "@/libs/supabase/client";
import { OwlVoiceAvatar } from "./OwlVoiceAvatar";
import { VoiceChatNotifyModal } from "./VoiceChatNotifyModal";
import { Mic, MicOff, Phone, PhoneOff } from "lucide-react";
import "./voice-chat.css";

const RELAY_URL =
  typeof window !== "undefined"
    ? window.location.protocol === "https:"
      ? `wss://${window.location.host}/ws/voice`    // production: nginx proxies to relay
      : `ws://${window.location.hostname}:8081`      // dev: direct to relay port
    : "ws://localhost:8081";

/** Free/guest users: max 60 seconds per session */
const FREE_SESSION_LIMIT_MS = 60_000;
/** Premium users: max 10 minutes per session */
const PREMIUM_SESSION_LIMIT_MS = 10 * 60_000;

interface VoiceChatProps {
  /** Topic-specific system instruction for the AI */
  topicInstruction?: string;
  /** Greeting prompt to make the AI speak first after connecting */
  greeting?: string;
}

export function VoiceChat({ topicInstruction, greeting }: VoiceChatProps) {
  const logRef = useRef<HTMLDivElement>(null);
  const { isPremium, isLoggedIn, showPaywall } = useAccess();
  const [sessionExpired, setSessionExpired] = useState(false);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [authToken, setAuthToken] = useState<string | undefined>(undefined);
  const [freeTrialUsed, setFreeTrialUsed] = useState(() => {
    if (typeof window === "undefined") return false;
    const today = new Date().toISOString().split("T")[0];
    return localStorage.getItem(`talk-owl-trial-${today}`) === "1";
  });
  const sessionStartRef = useRef<number | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Get Supabase access token for authenticated users
  useEffect(() => {
    if (!isLoggedIn) {
      setAuthToken(undefined);
      return;
    }
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      setAuthToken(data.session?.access_token);
    });
  }, [isLoggedIn]);

  const { status, transcript, micLevel, speakerLevel, isAiSpeaking, disconnectReason, connect, disconnect } =
    useGeminiLive({
      relayUrl: RELAY_URL,
      voice: "Kore",
      token: authToken,
      instructions: topicInstruction,
      greeting,
    });

  // Track if user explicitly dismissed the modal for the current disconnect
  const [dismissedReason, setDismissedReason] = useState<string | null>(null);

  // Modal is shown when there's a relevant disconnect reason that hasn't been dismissed
  const showModal =
    (disconnectReason === "idle_timeout" || disconnectReason === "session_expired") &&
    dismissedReason !== disconnectReason;

  const isLive = status === "live";
  const isConnecting = status === "connecting";
  const isQuotaExceeded = status === "quota_exceeded";
  const sessionLimitMs = isPremium ? PREMIUM_SESSION_LIMIT_MS : FREE_SESSION_LIMIT_MS;

  // Auto-scroll transcript
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [transcript]);

  // Session countdown for all users
  useEffect(() => {
    if (isLive) {
      sessionStartRef.current = Date.now();
      setRemainingTime(Math.ceil(sessionLimitMs / 1000));
      setSessionExpired(false);

      countdownRef.current = setInterval(() => {
        const elapsed = Date.now() - (sessionStartRef.current ?? Date.now());
        const remaining = Math.max(0, Math.ceil((sessionLimitMs - elapsed) / 1000));
        setRemainingTime(remaining);

        if (remaining <= 0) {
          disconnect("session_expired");
          setSessionExpired(true);
          // Mark free trial as used for non-premium users
          if (!isPremium) {
            setFreeTrialUsed(true);
            const today = new Date().toISOString().split("T")[0];
            localStorage.setItem(`talk-owl-trial-${today}`, "1");
          }
          if (countdownRef.current) {
            clearInterval(countdownRef.current);
            countdownRef.current = null;
          }
        }
      }, 1000);
    }

    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
        countdownRef.current = null;
      }
    };
  }, [isLive, sessionLimitMs, disconnect]);

  // Clear expired state on new connect
  const handleStart = useCallback(() => {
    setSessionExpired(false);
    setDismissedReason(null);
    setRemainingTime(null);
    connect();
  }, [connect]);

  const handleStop = useCallback(() => {
    disconnect();
    setRemainingTime(null);
  }, [disconnect]);

  const dismissModal = useCallback(() => {
    setDismissedReason(disconnectReason);
  }, [disconnectReason]);

  const modalConfig = useMemo(() => {
    if (disconnectReason === "idle_timeout") {
      return {
        icon: "😴",
        title: "Hết thời gian chờ",
        description: "Cú không nghe thấy bạn nói gì trong 30 giây nên đã tạm ngắt kết nối.",
        primaryAction: { label: "Kết nối lại", onClick: handleStart, color: "green" as const },
        secondaryAction: { label: "Đóng", onClick: dismissModal },
      };
    }
    if (disconnectReason === "session_expired") {
      return {
        icon: "⏰",
        title: "Phiên trò chuyện đã hết",
        description: isPremium
          ? "Bạn đã trò chuyện được 10 phút. Bấm kết nối lại để tiếp tục nhé!"
          : "Phiên miễn phí 1 phút đã hết. Đăng ký Premium để tiếp tục trò chuyện!",
        primaryAction: isPremium
          ? { label: "Kết nối lại", onClick: handleStart, color: "green" as const }
          : !isLoggedIn
            ? {
                label: "Đăng nhập",
                onClick: () => {
                  dismissModal();
                  showPaywall("login", "/games/talk-with-owl");
                },
                color: "orange" as const,
              }
            : {
                label: "Nâng cấp Premium",
                onClick: () => {
                  dismissModal();
                  showPaywall("premium", "/games/talk-with-owl");
                },
                color: "orange" as const,
              },
        // Free/guest users: no secondary action after trial used
        // They must login or upgrade to continue
        secondaryAction: isPremium
          ? { label: "Đóng", onClick: dismissModal }
          : undefined,
      };
    }
    return null;
  }, [disconnectReason, isPremium, isLoggedIn, handleStart, dismissModal, showPaywall]);
  return (
    <div className="vc-container">
      {/* Notify Modal — portaled to body to escape .vc-container's backdrop-filter containing block */}
      {modalConfig &&
        createPortal(
          <VoiceChatNotifyModal
            isOpen={showModal}
            onClose={dismissModal}
            icon={modalConfig.icon}
            title={modalConfig.title}
            description={modalConfig.description}
            primaryAction={modalConfig.primaryAction}
            secondaryAction={modalConfig.secondaryAction}
          />,
          document.body,
        )}

      {/* Status badge */}
      {status !== "idle" && (
        <div className="vc-status-row">
          <div className="vc-status-badge" data-status={status}>
            {status === "connecting" && "Đang kết nối..."}
            {status === "live" && "🟢 Đang trò chuyện"}
            {status === "error" && "❌ Lỗi kết nối"}
          </div>
          {/* Countdown */}
          {isLive && remainingTime !== null && (
            <div className={`vc-countdown ${remainingTime <= 10 ? "vc-countdown-warn" : ""}`}>
              ⏱ {Math.floor(remainingTime / 60)}:{String(remainingTime % 60).padStart(2, "0")}
            </div>
          )}
        </div>
      )}

      {/* Daily quota exceeded banner */}
      {isQuotaExceeded && (
        <div className="vc-expired-banner">
          <p className="vc-expired-text">⏰ Bạn đã dùng hết 20 phút trò chuyện cho hôm nay.</p>
          <p className="vc-expired-subtext">Quota sẽ reset vào 0h ngày mai. Hẹn gặp lại bạn nhé! 🦉</p>
        </div>
      )}

      {/* Owl Avatar */}
      <div className="vc-avatar-area">
        <OwlVoiceAvatar
          speakerLevel={speakerLevel}
          isSpeaking={isAiSpeaking}
          isListening={isLive && !isAiSpeaking}
          status={status}
        />
      </div>

      {/* Audio Level Meters */}
      {isLive && (
        <div className="vc-meters">
          <div className="vc-meter">
            <Mic size={14} />
            <div className="vc-meter-bar">
              <div className="vc-meter-fill vc-meter-mic" style={{ width: `${Math.round(micLevel * 100)}%` }} />
            </div>
          </div>
          <div className="vc-meter">
            <span className="vc-meter-icon">🔊</span>
            <div className="vc-meter-bar">
              <div className="vc-meter-fill vc-meter-speaker" style={{ width: `${Math.round(speakerLevel * 100)}%` }} />
            </div>
          </div>
        </div>
      )}

      {/* Transcript */}
      <div className="vc-transcript" ref={logRef}>
        {transcript.length === 0 && !isLive && !sessionExpired && (
          <div className="vc-empty">
            <p className="vc-empty-title">👋 Xin chào!</p>
            <p className="vc-empty-text">Bấm nút bên dưới để bắt đầu trò chuyện với Cú Thông Minh nhé!</p>
          </div>
        )}
        {transcript.length === 0 && isLive && (
          <div className="vc-empty">
            <p className="vc-empty-title">🎤 Cú đang lắng nghe...</p>
            <p className="vc-empty-text">Hãy nói gì đó với Cú nhé! Ví dụ: &quot;Hello! How are you?&quot;</p>
          </div>
        )}
        {transcript.map((entry, i) => (
          <div key={i} className={`vc-bubble ${entry.role === "user" ? "vc-bubble-user" : "vc-bubble-model"}`}>
            {entry.role === "model" && (
              <span className="vc-bubble-avatar">
                <img src="https://assets.cuthongminh.com/assets/logo.webp" alt="Cú" width={28} height={28} />
              </span>
            )}
            <p className="vc-bubble-text">{entry.text}</p>
            {entry.role === "user" && <span className="vc-bubble-avatar">👦</span>}
          </div>
        ))}
      </div>

      {/* Bottom controls */}
      <div className="vc-controls">
        {!isLive ? (
          <button
            className="vc-call-btn vc-call-start"
            onClick={freeTrialUsed && !isPremium
              ? () => showPaywall(isLoggedIn ? "premium" : "login", "/games/talk-with-owl")
              : handleStart
            }
            disabled={isConnecting}
          >
            <div className="vc-call-icon">{isConnecting ? <div className="vc-spinner" /> : <Phone size={32} />}</div>
          </button>
        ) : (
          <div className="vc-live-controls">
            <button
              className="vc-mic-indicator"
              title={micLevel > 0.01 ? "Mic đang nhận giọng nói" : "Mic đang lắng nghe"}
            >
              {micLevel > 0.01 ? (
                <Mic size={24} className="vc-mic-active" />
              ) : (
                <MicOff size={24} className="vc-mic-idle" />
              )}
            </button>

            <button className="vc-call-btn vc-call-end" onClick={handleStop}>
              <PhoneOff size={28} />
              <span className="vc-call-label">Kết thúc</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
