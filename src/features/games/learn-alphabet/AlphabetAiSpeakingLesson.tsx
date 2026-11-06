"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Check, Loader2, Mic, Play } from "lucide-react";
import { ActionButton } from "@/components/common/ActionButton";
import { NextLessonButton } from "@/components/games/NextLessonButton";
import { OwlVoiceAvatar } from "@/features/games/talk-with-owl/OwlVoiceAvatar";
import { VoiceChatNotifyModal } from "@/features/games/talk-with-owl/VoiceChatNotifyModal";
import "@/features/games/talk-with-owl/voice-chat.css";
import { useAccess } from "@/context/AccessContext";
import { useGeminiLive, type GeminiToolCall } from "@/hooks/useGeminiLive";
import { trackEvent } from "@/libs/analytics";
import { createClient } from "@/libs/supabase/client";
import { AlphabetCard } from "./AlphabetCard";
import type { LetterData } from "./constants";
import {
  MAX_ATTEMPTS_PER_LETTER,
  NO_CURRENT_LETTER_RESULT,
  matchesLetter,
  retryResultFor,
  skipResultFor,
  stayOnLetterResult,
  toolResultFor,
} from "./letterPractice";

const GAME = "learn-alphabet";

/** Same resolution as the English voice chat (VoiceChat.tsx). */
const RELAY_URL =
  typeof window !== "undefined"
    ? window.location.protocol === "https:"
      ? `wss://${window.location.host}/ws/voice`
      : `ws://${window.location.hostname}:8081`
    : "ws://localhost:8081";

/** Mic level (0-1, see estimateLevel) above which we consider the child is making a sound. */
const SPEECH_LEVEL = 0.15;
/**
 * Gemini's voice detection sometimes misses a short syllable ("a"). If the mic heard the child
 * but Gemini neither transcribed nor answered within this delay, ask Cú to invite them again.
 */
const MISSED_SPEECH_MS = 2500;
/** At most one such nudge every NUDGE_GAP_MS, and NUDGES_PER_LETTER per letter (background noise). */
const NUDGE_GAP_MS = 8000;
const NUDGES_PER_LETTER = 2;
/** Two wrong-reading reports closer than this are the same reading reported twice. */
const DUPLICATE_WRONG_MS = 4000;
/** Offer a manual "next letter" button after this long on one letter. */
const MANUAL_NEXT_AFTER_MS = 20_000;
/** Wait at most this long for Cú's goodbye before finishing the lesson. */
const GOODBYE_MAX_MS = 10_000;

type Phase = "intro" | "connecting" | "live" | "finishing" | "done" | "quota" | "fallback";
type LetterResult = "ok" | "skip" | undefined;

interface AlphabetAiSpeakingLessonProps {
  /** Alphabet group id: the relay builds the lesson prompt for this group's letters */
  groupId: string;
  letters: LetterData[];
  onComplete: () => void;
  /** Accepted for the same props as the other alphabet lessons; review mode behaves the same here. */
  isReviewMode?: boolean;
}

function track(action: string, extra: Record<string, string | number> = {}) {
  trackEvent("ai_speak", { course_id: GAME, action, ...extra });
}

/**
 * "Tập nói" with Cú as an AI teacher (Gemini Live through the voice relay).
 * The AI judges each letter and reports through function calls; this component owns the
 * order of letters and when the lesson is complete. Every failure path falls back to a
 * listen-and-repeat mode, so a child can never get stuck here.
 */
export function AlphabetAiSpeakingLesson({ groupId, letters, onComplete }: AlphabetAiSpeakingLessonProps) {
  const pathname = usePathname();
  const { isLoggedIn, showPaywall } = useAccess();

  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<LetterResult[]>(() => letters.map(() => undefined));
  const [authToken, setAuthToken] = useState<string | undefined>(undefined);
  const [letterStartedAt, setLetterStartedAt] = useState(() => Date.now());
  const [now, setNow] = useState(() => Date.now());
  const [quotaModalOpen, setQuotaModalOpen] = useState(false);

  const indexRef = useRef(0);
  /** Wrong readings on the current letter, counted here because the AI does not count reliably */
  const wrongCountRef = useRef(0);
  const lastWrongAtRef = useRef(0);
  const phaseRef = useRef<Phase>("intro");
  const completedRef = useRef(false);
  /** Last time the mic heard the child, Gemini heard them, Cú spoke, and we nudged. */
  const lastLoudRef = useRef(0);
  const lastHeardRef = useRef(0);
  const lastAiSpeechRef = useRef(0);
  const lastNudgeRef = useRef(0);
  const nudgesForLetterRef = useRef(0);
  const resultsRef = useRef<LetterResult[]>(results);
  const sendToolResponseRef = useRef<(id: string, name: string, response: Record<string, unknown>) => void>(() => {});

  useEffect(() => {
    resultsRef.current = results;
  }, [results]);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    if (!isLoggedIn) {
      // Reacting to the connection status of an external socket; same pattern as other lessons.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAuthToken(undefined);
      return;
    }
    createClient()
      .auth.getSession()
      .then(({ data }) => setAuthToken(data.session?.access_token));
  }, [isLoggedIn]);


  const finishLesson = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setPhase("done");
    track("complete", {
      ok: resultsRef.current.filter((r) => r === "ok").length,
      total: letters.length,
    });
    // Like the other alphabet lessons, completing again in review mode still shows the
    // congratulations modal and moves on.
    onComplete();
  }, [letters.length, onComplete]);

  /** Move past the current letter. Returns the new index. */
  const advance = useCallback(
    (result: Exclude<LetterResult, undefined>) => {
      const current = indexRef.current;
      setResults((prev) => {
        const updated = prev.map((r, i) => (i === current ? result : r));
        resultsRef.current = updated;
        return updated;
      });
      const next = current + 1;
      indexRef.current = next;
      wrongCountRef.current = 0;
      setIndex(Math.min(next, letters.length - 1));
      setLetterStartedAt(Date.now());
      return next;
    },
    [letters.length],
  );

  const handleToolCall = useCallback(
    (call: GeminiToolCall) => {
      const reply = (result: string) => sendToolResponseRef.current(call.id, call.name, { result });
      const current = letters[indexRef.current];
      const known = call.name === "be_noi_dung" || call.name === "be_doc_sai";
      if (!current || !known) {
        reply(NO_CURRENT_LETTER_RESULT);
        return;
      }
      if (!matchesLetter(call.args.chu, current)) {
        // Usually a repeated call for a letter we already moved past.
        reply(stayOnLetterResult(current));
        return;
      }

      if (call.name === "be_noi_dung") {
        track("letter_ok", { letter: current.letter, wrong: wrongCountRef.current });
        const next = advance("ok");
        reply(toolResultFor(letters, next));
        if (next >= letters.length) setPhase("finishing");
        return;
      }

      // be_doc_sai: count it; after MAX_ATTEMPTS_PER_LETTER wrong readings, move on.
      // The model sometimes reports one reading twice ~2-3s apart; a real retry takes longer,
      // because the child waits for Cú to read the letter again.
      const t = Date.now();
      if (wrongCountRef.current > 0 && t - lastWrongAtRef.current < DUPLICATE_WRONG_MS) {
        reply(retryResultFor(current, wrongCountRef.current));
        return;
      }
      lastWrongAtRef.current = t;
      wrongCountRef.current += 1;
      const wrong = wrongCountRef.current;
      track("letter_wrong", { letter: current.letter, attempt: wrong });
      if (wrong < MAX_ATTEMPTS_PER_LETTER) {
        reply(retryResultFor(current, wrong));
        return;
      }
      track("letter_skip", { letter: current.letter });
      const next = advance("skip");
      reply(skipResultFor(letters, next));
      if (next >= letters.length) setPhase("finishing");
    },
    [advance, letters],
  );

  // The relay builds prompt and greeting; on a reconnect mid-lesson startIndex makes Cú resume
  const live = useGeminiLive({
    relayUrl: RELAY_URL,
    voice: "Kore",
    token: authToken,
    lesson: { kind: "letter-practice", groupId, startIndex: index },
    onToolCall: handleToolCall,
    idleTimeoutMs: 90_000,
  });
  const { status, isAiSpeaking, micLevel, transcript, speakerLevel, micError, connect, disconnect, sendCue } = live;

  useEffect(() => {
    sendToolResponseRef.current = live.sendToolResponse;
  }, [live.sendToolResponse]);

  const goFallback = useCallback(
    (reason: string) => {
      if (phaseRef.current === "fallback" || phaseRef.current === "done") return;
      track("fallback", { reason });
      if (status === "live" || status === "connecting") disconnect("user");
      setLetterStartedAt(Date.now());
      setPhase("fallback");
    },
    [disconnect, status],
  );

  // Follow the connection status
  useEffect(() => {
    // Reacting to the connection status of an external socket; same pattern as other lessons.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (status === "live" && phaseRef.current === "connecting") setPhase("live");
    if (status === "error" && phaseRef.current === "connecting") goFallback("connect_error");
    if (status === "quota_exceeded" && phaseRef.current !== "quota") {
      track("quota");
      setPhase("quota");
      setQuotaModalOpen(true);
    }
    // Connection dropped mid-lesson (idle timeout, network): let the child reconnect
    if (status === "idle" && (phaseRef.current === "live" || phaseRef.current === "connecting")) setPhase("intro");
  }, [status, goFallback, showPaywall, pathname]);

  useEffect(() => {
    // Reacting to the connection status of an external socket; same pattern as other lessons.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (micError && (phaseRef.current === "live" || phaseRef.current === "connecting")) goFallback("no_mic");
  }, [micError, goFallback]);

  // After the last letter, let Cú say goodbye, then finish.
  // The timers must only depend on `phase` / `isAiSpeaking`: the open mic re-renders this
  // component ~50 times a second, and any other dependency would restart them forever.
  const endLessonRef = useRef<() => void>(() => {});
  useEffect(() => {
    endLessonRef.current = () => {
      disconnect("user");
      finishLesson();
    };
  }, [disconnect, finishLesson]);

  useEffect(() => {
    if (phase !== "finishing") return;
    const hardStop = setTimeout(() => endLessonRef.current(), GOODBYE_MAX_MS);
    return () => clearTimeout(hardStop);
  }, [phase]);

  const sawGoodbyeRef = useRef(false);
  useEffect(() => {
    if (phase !== "finishing") return;
    if (isAiSpeaking) {
      sawGoodbyeRef.current = true;
      return;
    }
    if (!sawGoodbyeRef.current) return;
    const t = setTimeout(() => endLessonRef.current(), 1200);
    return () => clearTimeout(t);
  }, [phase, isAiSpeaking]);

  // Continuous mic: remember when the child made a sound, when Gemini heard them, when Cú spoke
  useEffect(() => {
    if (phase === "live" && !isAiSpeaking && micLevel > SPEECH_LEVEL) lastLoudRef.current = Date.now();
  }, [phase, isAiSpeaking, micLevel]);

  useEffect(() => {
    if (isAiSpeaking) lastAiSpeechRef.current = Date.now();
  }, [isAiSpeaking]);

  const userTurns = transcript.filter((t) => t.role === "user").length;
  useEffect(() => {
    if (userTurns > 0) lastHeardRef.current = Date.now();
  }, [userTurns]);

  useEffect(() => {
    nudgesForLetterRef.current = 0;
  }, [index]);

  // The mic heard the child but Gemini did not react: let Cú ask again instead of waiting in silence
  useEffect(() => {
    if (phase !== "live") return;
    const timer = setInterval(() => {
      const t = Date.now();
      const loud = lastLoudRef.current;
      const missed =
        loud > lastHeardRef.current &&
        loud > lastAiSpeechRef.current &&
        t - loud > MISSED_SPEECH_MS &&
        t - lastNudgeRef.current > NUDGE_GAP_MS &&
        nudgesForLetterRef.current < NUDGES_PER_LETTER;
      if (missed && !isAiSpeaking) {
        lastNudgeRef.current = t;
        nudgesForLetterRef.current += 1;
        track("nudge", { letter: letters[indexRef.current]?.letter ?? "" });
        sendCue({ cue: "nudge" });
      }
    }, 500);
    return () => clearInterval(timer);
  }, [phase, isAiSpeaking, sendCue, letters]);

  // Clock for the manual "next" button
  useEffect(() => {
    if (phase !== "live") return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [phase]);

  const current = letters[index];

  const handleStart = () => {
    track("start", { mode: "ai" });
    sawGoodbyeRef.current = false;
    setPhase("connecting");
    setLetterStartedAt(Date.now());
    connect();
  };

  const handleManualNext = () => {
    track("manual_next", { letter: current?.letter ?? "" });
    const next = advance("skip");
    sendCue({ cue: "manual_next", nextIndex: next });
    if (next >= letters.length) setPhase("finishing");
  };

  const handleFallbackNext = () => {
    const next = advance("ok");
    if (next >= letters.length) finishLesson();
  };

  if (!current) return null;
  const showManualNext = phase === "live" && now - letterStartedAt > MANUAL_NEXT_AFTER_MS;
  const doneCount = results.filter(Boolean).length;

  return (
    <div className="flex flex-col items-center gap-2 md:gap-4 w-full max-w-4xl px-4">
      {/* Progress: one bubble per letter */}
      <div className="flex flex-wrap justify-center gap-1 md:gap-1.5">
        {letters.map((l, i) => {
          const r = results[i];
          const isCurrent = i === index && phase !== "done";
          return (
            <span
              key={l.id}
              className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-sm font-black border-2 transition-all ${
                r === "ok"
                  ? "bg-green-500 border-green-600 text-white"
                  : r === "skip"
                    ? "bg-amber-300 border-amber-400 text-amber-900"
                    : isCurrent
                      ? "bg-white border-purple-500 text-purple-600 scale-110"
                      : "bg-white/70 border-slate-200 text-slate-400"
              }`}
            >
              {r === "ok" ? <Check className="w-3.5 h-3.5" /> : l.letter}
            </span>
          );
        })}
      </div>

      {/* Letter card and Cú side by side on wide screens, stacked on phones */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-10 w-full">
        {/* Same card as lesson 1. In fallback mode it reads the letter aloud itself. */}
        <AlphabetCard letter={current} active showName={phase === "fallback"} compact />

        <div className="flex flex-col items-center gap-2">
          {/* Phones: Cú and the buttons share one row. Wide screens: one column. */}
          <div className="flex items-center gap-5 md:flex-col md:gap-3">
            {/* The English voice chat avatar, shrunk: it is 160-200px there */}
            <div className="[&_.vc-owl]:w-24 [&_.vc-owl]:h-24 [&_.vc-owl-img-wrap]:w-20 [&_.vc-owl-img-wrap]:h-20 md:[&_.vc-owl]:w-32 md:[&_.vc-owl]:h-32 md:[&_.vc-owl-img-wrap]:w-28 md:[&_.vc-owl-img-wrap]:h-28">
              <OwlVoiceAvatar
                speakerLevel={speakerLevel}
                isSpeaking={isAiSpeaking}
                isListening={phase === "live" && !isAiSpeaking && micLevel > SPEECH_LEVEL}
                status={phase === "fallback" || phase === "done" ? "idle" : status}
              />
            </div>

            {(phase === "intro" || phase === "connecting") && (
              // Same round glossy button as the lessons' ">" (NextLessonButton), with a Play icon
              <ActionButton
                variant="glossy"
                color="green"
                size="auto"
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full ${phase === "connecting" ? "opacity-80" : "animate-bounce-subtle"}`}
                onClick={handleStart}
                disabled={phase === "connecting"}
                aria-label={doneCount > 0 ? "Tiếp tục với Cú" : "Bắt đầu nói với Cú"}
              >
                {phase === "connecting" ? (
                  <Loader2 className="w-10 h-10 text-white animate-spin" strokeWidth={3} />
                ) : (
                  <Play className="w-10 h-10 text-white ml-1" fill="currentColor" strokeWidth={3} />
                )}
              </ActionButton>
            )}

            {phase === "live" && (
              <div className="flex items-center gap-4">
                <div className="vc-mic-indicator" title="Micro đang mở, bé cứ đọc to nhé">
                  {micLevel > SPEECH_LEVEL && !isAiSpeaking ? (
                    <Mic size={28} className="vc-mic-active" />
                  ) : (
                    <Mic size={28} className="vc-mic-idle" />
                  )}
                </div>
                {showManualNext && (
                  <NextLessonButton onClick={handleManualNext} isLast={index === letters.length - 1} />
                )}
              </div>
            )}

            {phase === "fallback" && (
              <NextLessonButton onClick={handleFallbackNext} isLast={index === letters.length - 1} />
            )}
          </div>

          <p className="text-base md:text-lg font-bold text-purple-700 text-center max-w-xs">
            {phase === "intro" && "Bắt đầu nào!!!"}
            {phase === "connecting" && "Cú đang tới..."}
            {phase === "live" && (isAiSpeaking ? "Cú đang nói..." : "Cú đang nghe, bé đọc thật to nhé!")}
            {phase === "finishing" && "Bé giỏi quá! 🎉"}
            {phase === "done" && `Bé đã đọc xong ${doneCount} chữ! 🎉`}
            {phase === "fallback" && "Bé nghe rồi đọc theo nhé!"}
            {phase === "quota" && "Hôm nay bé đã dùng hết 3 phút nói chuyện với Cú."}
          </p>

          {/* Mic level while the child talks (same meter as the English voice chat) */}
          {/* Hidden on phones to keep everything on one screen; the mic icon already lights up */}
          {phase === "live" && (
            <div className="hidden md:block">
              <div className="vc-meters">
                <div className="vc-meter">
                  <Mic size={14} />
                  <div className="vc-meter-bar">
                    <div className="vc-meter-fill vc-meter-mic" style={{ width: `${Math.round(micLevel * 100)}%` }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {phase === "quota" && !quotaModalOpen && (
            <div className="flex flex-col sm:flex-row gap-3">
              <ActionButton
                variant="glossy"
                color="orange"
                className="px-5 py-3"
                onClick={() => showPaywall("premium", pathname)}
              >
                Mở khóa Premium
              </ActionButton>
              <ActionButton variant="glossy" color="blue" className="px-5 py-3" onClick={() => goFallback("quota")}>
                Học tiếp không có Cú
              </ActionButton>
            </div>
          )}
        </div>
      </div>

      {/* Out of free minutes: same notice modal as the English voice chat */}
      <VoiceChatNotifyModal
        isOpen={quotaModalOpen}
        onClose={() => setQuotaModalOpen(false)}
        icon="⏰"
        title="Hết lượt nói với Cú hôm nay"
        description="Bé đã dùng hết 3 phút nói chuyện với Cú ở trò chơi này. Mở khóa Premium để bé nói với Cú mỗi ngày nhé!"
        primaryAction={{
          label: "Mở khóa Premium",
          color: "orange",
          onClick: () => {
            setQuotaModalOpen(false);
            showPaywall("premium", pathname);
          },
        }}
        secondaryAction={{
          label: "Học tiếp không có Cú",
          onClick: () => {
            setQuotaModalOpen(false);
            goFallback("quota");
          },
        }}
      />
    </div>
  );
}
