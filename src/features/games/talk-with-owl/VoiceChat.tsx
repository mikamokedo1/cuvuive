"use client";

import { useState, useRef, useEffect } from "react";
import { useGeminiLive } from "@/hooks/useGeminiLive";
import { OwlVoiceAvatar } from "./OwlVoiceAvatar";
import { Mic, MicOff, Phone, PhoneOff, Send, ArrowLeft } from "lucide-react";
import Link from "next/link";
import "./voice-chat.css";

const RELAY_URL =
  typeof window !== "undefined"
    ? `ws://${window.location.hostname}:8081`
    : "ws://localhost:8081";

export function VoiceChat() {
  const [textInput, setTextInput] = useState("");
  const logRef = useRef<HTMLDivElement>(null);

  const {
    status,
    transcript,
    micLevel,
    speakerLevel,
    isAiSpeaking,
    connect,
    disconnect,
    sendText,
  } = useGeminiLive({
    relayUrl: RELAY_URL,
    voice: "Kore",
  });

  // Auto-scroll transcript
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [transcript]);

  const handleStart = () => {
    connect();
  };

  const handleStop = () => {
    disconnect();
  };

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) return;
    sendText(textInput.trim());
    setTextInput("");
  };

  const isLive = status === "live";
  const isConnecting = status === "connecting";

  return (
    <div className="vc-page">
      {/* Header */}
      <header className="vc-header">
        <Link href="/games" className="vc-back-btn" aria-label="Quay lại">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="vc-title">Nói Chuyện Với Cú</h1>
        <div className="vc-status-badge" data-status={status}>
          {status === "idle" && "Sẵn sàng"}
          {status === "connecting" && "Đang kết nối..."}
          {status === "live" && "🟢 Đang trò chuyện"}
          {status === "error" && "❌ Lỗi kết nối"}
        </div>
      </header>

      {/* Main content */}
      <main className="vc-main">
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
                <div
                  className="vc-meter-fill vc-meter-mic"
                  style={{ width: `${Math.round(micLevel * 100)}%` }}
                />
              </div>
            </div>
            <div className="vc-meter">
              <span className="vc-meter-icon">🔊</span>
              <div className="vc-meter-bar">
                <div
                  className="vc-meter-fill vc-meter-speaker"
                  style={{ width: `${Math.round(speakerLevel * 100)}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Transcript */}
        <div className="vc-transcript" ref={logRef}>
          {transcript.length === 0 && !isLive && (
            <div className="vc-empty">
              <p className="vc-empty-title">👋 Xin chào!</p>
              <p className="vc-empty-text">
                Bấm nút bên dưới để bắt đầu trò chuyện với Cú Thông Minh nhé!
              </p>
            </div>
          )}
          {transcript.length === 0 && isLive && (
            <div className="vc-empty">
              <p className="vc-empty-title">🎤 Cú đang lắng nghe...</p>
              <p className="vc-empty-text">
                Hãy nói gì đó với Cú nhé! Ví dụ: &quot;Cú ơi, kể chuyện cho
                bé nghe!&quot;
              </p>
            </div>
          )}
          {transcript.map((entry, i) => (
            <div
              key={i}
              className={`vc-bubble ${entry.role === "user" ? "vc-bubble-user" : "vc-bubble-model"}`}
            >
              {entry.role === "model" && <span className="vc-bubble-avatar">🦉</span>}
              <p className="vc-bubble-text">{entry.text}</p>
              {entry.role === "user" && <span className="vc-bubble-avatar">👦</span>}
            </div>
          ))}
        </div>

        {/* Text input (when live) */}
        {isLive && (
          <form className="vc-text-form" onSubmit={handleSendText}>
            <input
              type="text"
              className="vc-text-input"
              placeholder="Hoặc gõ câu hỏi tại đây..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              autoComplete="off"
            />
            <button type="submit" className="vc-send-btn" disabled={!textInput.trim()}>
              <Send size={18} />
            </button>
          </form>
        )}
      </main>

      {/* Bottom controls */}
      <footer className="vc-controls">
        {!isLive ? (
          <button
            className="vc-call-btn vc-call-start"
            onClick={handleStart}
            disabled={isConnecting}
          >
            <div className="vc-call-icon">
              {isConnecting ? (
                <div className="vc-spinner" />
              ) : (
                <Phone size={32} />
              )}
            </div>
            <span className="vc-call-label">
              {isConnecting ? "Đang kết nối..." : "Gọi cho Cú"}
            </span>
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
      </footer>
    </div>
  );
}
