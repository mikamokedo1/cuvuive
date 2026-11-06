"use client";
import { useState, useEffect, useRef } from "react";
import { Mic, MicOff } from "lucide-react";
import Image from "next/image";
import Loading from "../common/Loading";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useMicrophonePermission } from "@/hooks/useMicrophonePermission";
import { fuzzyMatchVietnamese } from "@/libs/utils/fuzzyMatch";
import { EntityData, FeedbackType } from "@/types/game";
import { playButtonSound } from "@/libs/utils/playSound";
import { NextLessonButton } from "@/components/games/NextLessonButton";
import { trackEvent } from "@/libs/analytics";

/** After this many wrong tries on one item, offer a ">" button so the child is never stuck. */
const WRONG_TRIES_BEFORE_SKIP = 2;

interface SpeakPraticeLayoutProps {
  entities: EntityData[];
  onComplete: () => void;
  language?: string;
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
}

const SpeakPraticeLayout = ({
  entities,
  onComplete,
  language = "vi-VN",
  currentIndex: externalIndex,
  onIndexChange,
}: SpeakPraticeLayoutProps) => {
  const { speak: speakTarget } = useTextToSpeech(language.startsWith("en") ? "en-US" : "vi");
  const { speak: speakSystem } = useTextToSpeech("vi");
  const {
    isListening,
    transcript,
    interimTranscript,
    isSupported,
    error: speechError,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition(language);
  const { status: micStatus, requestPermission } = useMicrophonePermission();

  const [internalIndex, setInternalIndex] = useState(0);
  const activeIndex = externalIndex !== undefined ? externalIndex : internalIndex;

  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [hasTried, setHasTried] = useState(false);
  const [wrongCount, setWrongCount] = useState(0);
  const hasMatchedRef = useRef(false);

  const targetEntity = entities[activeIndex];

  // Only read the word aloud once the practice screen is actually shown, not behind the
  // microphone permission prompt or the "no microphone" notice
  const canPractice = isSupported && speechError !== "service-not-allowed" && micStatus === "granted";

  // Auto speak question when target changes
  useEffect(() => {
    if (!targetEntity) return;

    setFeedback(null);
    setHasTried(false);
    resetTranscript();
    if (!canPractice) return;

    // Auto speak question after a short delay
    const speakTimer = setTimeout(() => {
      speakTarget(`${targetEntity.name}`);
    }, 800);

    return () => clearTimeout(speakTimer);
  }, [activeIndex, targetEntity, speakTarget, resetTranscript, canPractice]);

  const handleIndexChange = (newIndex: number) => {
    if (externalIndex !== undefined && onIndexChange) {
      onIndexChange(newIndex);
    } else {
      setInternalIndex(newIndex);
    }
  };

  const goToNextQuestion = () => {
    setWrongCount(0);
    if (activeIndex + 1 >= entities.length) {
      onComplete();
    } else {
      handleIndexChange(activeIndex + 1);
    }
  };

  // Reset transcript if speaking for too long without correct answer
  useEffect(() => {
    const currentText = (transcript + " " + interimTranscript).trim();
    if (!isListening || !currentText || feedback === "correct" || hasMatchedRef.current) return;

    const words = currentText.split(/\s+/);

    // 1. Instant reset if too many words (>= 10)
    if (words.length >= 10) {
      speakSystem("Thử lại nhé!");
      setFeedback("wrong");
      setWrongCount((c) => c + 1);
      // Stop listening immediately, restart after TTS finishes
      stopListening();

      setTimeout(() => {
        setFeedback(null);
        resetTranscript();
      }, 2000);
      return;
    }

    // 2. Time-based reset (2.5 seconds without a correct answer)
    const resetTimer = setTimeout(() => {
      speakSystem("Thử lại nhé!");
      setFeedback("wrong");
      setWrongCount((c) => c + 1);
      stopListening();

      setTimeout(() => {
        setFeedback(null);
        resetTranscript();
      }, 2000);
    }, 2500);

    return () => clearTimeout(resetTimer);
  }, [transcript, interimTranscript, isListening, feedback, speakSystem, resetTranscript, stopListening]);

  // Handle speech result — check both during listening (interim) and after listening stops (final)
  // On Android Chrome, interim results may show the correct answer but the final transcript
  // transition differs from desktop, so we need to check in real-time too.

  // Reset match flag when moving to next question
  useEffect(() => {
    hasMatchedRef.current = false;
  }, [activeIndex]);

  // Real-time check: match during listening using combined transcript + interim
  useEffect(() => {
    if (!isListening || !targetEntity || feedback || hasMatchedRef.current) return;

    const currentText = (transcript + " " + interimTranscript).trim();
    if (!currentText) return;

    const answersToCheck = targetEntity.acceptedAnswers?.length ? targetEntity.acceptedAnswers : [targetEntity.name];
    const isCorrect = answersToCheck.some((answer) => fuzzyMatchVietnamese(currentText, answer));

    if (isCorrect) {
      hasMatchedRef.current = true;
      setHasTried(true);
      stopListening();
      playWinEffect(500);
      speakSystem("Giỏi quá!");
      setFeedback("correct");

      setTimeout(() => {
        goToNextQuestion();
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript, interimTranscript, isListening, targetEntity, feedback]);

  // Post-listening check: handle the case where listening ends with a final transcript
  useEffect(() => {
    if (!isListening && transcript && targetEntity && !feedback && !hasMatchedRef.current) {
      setHasTried(true);
      const answersToCheck = targetEntity.acceptedAnswers?.length ? targetEntity.acceptedAnswers : [targetEntity.name];
      const isCorrect = answersToCheck.some((answer) => fuzzyMatchVietnamese(transcript, answer));

      if (isCorrect) {
        hasMatchedRef.current = true;
        playWinEffect(500);
        speakSystem("Giỏi quá!");
        setFeedback("correct");

        setTimeout(() => {
          goToNextQuestion();
        }, 2000);
      } else {
        // Wrong
        setFeedback("wrong");
        setWrongCount((c) => c + 1);
        speakSystem("Thử lại nhé!");
        setTimeout(() => {
          setFeedback(null);
          resetTranscript();
        }, 2000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListening, transcript, targetEntity, feedback]);

  const handleMicClick = () => {
    if (isListening) {
      playButtonSound();
      stopListening();
    } else {
      // Don't play button sound when starting to listen — on iOS Safari,
      // AudioContext and SpeechRecognition compete for the audio session
      startListening();
    }
  };

  // Never block the child: if this device cannot use the microphone, the speaking lesson counts as
  // done and the child moves on (lessons unlock in order). Only definite states trigger this:
  // isSupported starts true and micStatus only becomes "denied" after the browser answers.
  const noMicReason = !isSupported
    ? "unsupported"
    : speechError === "service-not-allowed"
      ? "dictation_off"
      : micStatus === "denied"
        ? "mic_denied"
        : null;
  const skippedRef = useRef(false);
  useEffect(() => {
    if (!noMicReason || skippedRef.current) return;
    skippedRef.current = true;
    trackEvent("speak_practice", { action: "skipped_no_mic", reason: noMicReason });
    onComplete();
  }, [noMicReason, onComplete]);

  const skipCurrent = () => {
    trackEvent("speak_practice", { action: "skip_after_wrong", wrong: wrongCount });
    speakSystem("Con giỏi lắm! Mình sang từ tiếp theo nhé");
    goToNextQuestion();
  };

  const entityFrame = targetEntity ? (
    <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center mb-6">
      <div
        className={`absolute inset-0 bg-white rounded-3xl border-4 shadow-xl transition-colors duration-300
        ${
          feedback === "correct"
            ? "border-green-400 bg-green-50 shadow-green-200"
            : feedback === "wrong"
              ? "border-orange-400 bg-orange-50 animate-shake"
              : "border-blue-300"
        }
        `}
      />
      <div
        className={`
          relative w-3/4 h-3/4 transition-all duration-300
          ${feedback === "correct" ? "scale-110" : "hover:scale-105"}
          ${isListening ? "cursor-not-allowed" : "cursor-pointer"}
        `}
        onClick={() => !isListening && speakTarget(targetEntity.name)}
      >
        {targetEntity.textRepresent ? (
          <p className="text-center text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 drop-shadow-lg select-none leading-[150px]">
            {targetEntity.textRepresent}
          </p>
        ) : (
          <Image src={targetEntity.image} alt={targetEntity.name} fill className="object-contain" />
        )}
      </div>
    </div>
  ) : null;

  if (noMicReason) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-blue-50 rounded-3xl border-4 border-blue-200 text-center max-w-lg mt-10 gap-4">
        <MicOff className="w-14 h-14 text-blue-400" />
        <h2 className="text-2xl font-bold text-blue-700">Máy này chưa dùng được micro</h2>
        <p className="text-blue-800 text-lg">Bé bỏ qua bài Tập nói và học tiếp bài sau nhé!</p>
        {/* For the grown-up: how to turn speaking practice on next time */}
        <p className="text-sm text-slate-500">
          {noMicReason === "unsupported" &&
            "Muốn bé luyện nói: mở bằng Safari hoặc Chrome (không mở trong Facebook, Zalo)."}
          {noMicReason === "dictation_off" &&
            "Muốn bé luyện nói: bật Cài đặt → Cài đặt chung → Bàn phím → Đọc chính tả."}
          {noMicReason === "mic_denied" && "Muốn bé luyện nói: bật lại quyền micro trong cài đặt trình duyệt."}
        </p>
      </div>
    );
  }

  // Microphone permission gate
  if (micStatus !== "granted") {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-blue-50 rounded-3xl border-4 border-blue-200 text-center max-w-lg mt-10 gap-6">
        {/* (denied is handled above: the lesson is skipped) */}
        <>
          <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center shadow-xl">
            <Mic className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-blue-700">Cho phép sử dụng micro 🎤</h2>
          <p className="text-blue-800 text-lg leading-relaxed">
            Trò chơi này cần nghe giọng nói của bé. Bấm nút bên dưới và chọn <b>&quot;Cho phép&quot;</b> khi trình duyệt
            hỏi nhé!
          </p>
          <button
            onClick={requestPermission}
            disabled={micStatus === "requesting"}
            className={`
                font-bold text-lg px-8 py-4 rounded-2xl shadow-lg transition-all duration-200
                ${
                  micStatus === "requesting"
                    ? "bg-blue-300 cursor-wait text-white"
                    : "bg-green-500 hover:bg-green-400 active:scale-95 text-white"
                }
              `}
          >
            {micStatus === "requesting" ? "Đang chờ..." : "✅ Bắt đầu"}
          </button>
        </>
      </div>
    );
  }

  if (!targetEntity) return <Loading />;

  const displayTranscript = interimTranscript || transcript;

  return (
    <div className="flex flex-col items-center gap-6 md:gap-8 w-full max-w-4xl">
      {entityFrame}

      {/* Transcript Display Area */}
      <div className="h-16 flex items-center justify-center w-full px-4">
        {displayTranscript ? (
          <p className="text-2xl md:text-3xl font-medium text-slate-700 text-center animate-fade-in">
            "{displayTranscript}"
          </p>
        ) : hasTried && feedback === "wrong" ? (
          <p className="text-xl md:text-2xl text-orange-500 font-medium animate-fade-in text-center">
            Mình chưa nghe rõ, bé nói lại nhé!
          </p>
        ) : isListening ? (
          <p className="text-xl md:text-2xl text-blue-500 font-medium animate-pulse text-center">Bé hãy nói to...</p>
        ) : (
          <p className="text-xl md:text-2xl text-slate-400 font-medium text-center">Bấm vào chiếc mic để bắt đầu nói</p>
        )}
      </div>

      {/* Microphone Control, plus ">" once the child has tried a few times */}
      <div className="flex items-center gap-6 mt-4">
        <div className="relative">
          {/* Pulsing rings when listening */}
          {isListening && (
            <>
              <div
                className="absolute inset-0 rounded-full bg-blue-400 opacity-20 animate-ping"
                style={{ animationDuration: "1.5s" }}
              />
              <div
                className="absolute inset-[-10px] rounded-full bg-blue-300 opacity-10 animate-ping"
                style={{ animationDuration: "1.5s", animationDelay: "0.2s" }}
              />
            </>
          )}

          <button
            onClick={handleMicClick}
            disabled={feedback === "correct"}
            className={`
            relative w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 z-10
            ${
              isListening
                ? "bg-red-500 scale-110 shadow-red-200 border-4 border-red-300 focus:outline-none"
                : "bg-blue-500 hover:bg-blue-400 hover:scale-105 active:scale-95 border-4 border-blue-300"
            }
            ${feedback === "correct" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
          >
            {isListening ? (
              <MicOff className="w-10 h-10 md:w-14 md:h-14 text-white" />
            ) : (
              <Mic className="w-12 h-12 md:w-16 md:h-16 text-white" />
            )}
          </button>
        </div>
        {wrongCount >= WRONG_TRIES_BEFORE_SKIP && feedback !== "correct" && (
          <NextLessonButton onClick={skipCurrent} isLast={activeIndex === entities.length - 1} />
        )}
      </div>
    </div>
  );
};

export default SpeakPraticeLayout;
