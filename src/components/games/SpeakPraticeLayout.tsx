"use client";
import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, AlertCircle, Settings } from "lucide-react";
import Image from "next/image";
import Loading from "../common/Loading";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useMicrophonePermission } from "@/hooks/useMicrophonePermission";
import { fuzzyMatchVietnamese } from "@/libs/utils/fuzzyMatch";
import { EntityData, FeedbackType } from "@/types/game";
import { playButtonSound } from "@/libs/utils/playSound";

interface SpeakPraticeLayoutProps {
  entities: EntityData[];
  onComplete: () => void;
}

const SpeakPraticeLayout = ({ entities, onComplete }: SpeakPraticeLayoutProps) => {
  const { speak } = useTextToSpeech();
  const {
    isListening,
    transcript,
    interimTranscript,
    isSupported,
    error: speechError,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition("vi-VN");
  const { status: micStatus, requestPermission } = useMicrophonePermission();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [hasTried, setHasTried] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const hasMatchedRef = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        typeof window !== "undefined" &&
          (window.innerWidth <= 768 || "ontouchstart" in window || navigator.maxTouchPoints > 0),
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const targetEntity = entities[currentIndex];

  // Auto speak question when target changes
  useEffect(() => {
    if (!targetEntity) return;

    setFeedback(null);
    setHasTried(false);
    resetTranscript();

    // Auto speak question after a short delay
    const speakTimer = setTimeout(() => {
      speak(`${targetEntity.name}`);

      // Auto-start microphone after TTS finishes (approx 1.5 seconds)
      // Only auto-start on desktop. On mobile, require explicit user tap.
      if (!isMobile) {
        const listenTimer = setTimeout(() => {
          startListening();
        }, 1500);

        return () => clearTimeout(listenTimer);
      }
    }, 800);

    return () => clearTimeout(speakTimer);
  }, [currentIndex, targetEntity, speak, startListening, resetTranscript, isMobile]);

  const goToNextQuestion = () => {
    if (currentIndex + 1 >= entities.length) {
      onComplete();
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Reset transcript if speaking for too long without correct answer
  useEffect(() => {
    const currentText = (transcript + " " + interimTranscript).trim();
    if (!isListening || !currentText || feedback === "correct" || hasMatchedRef.current) return;

    const words = currentText.split(/\s+/);

    // 1. Instant reset if too many words (>= 10)
    if (words.length >= 10) {
      speak("Thử lại nhé!");
      setFeedback("wrong");
      // Stop listening immediately, restart after TTS finishes
      stopListening();

      setTimeout(() => {
        setFeedback(null);
        resetTranscript();
        // Only auto-restart on desktop. On mobile, require explicit user tap
        // to avoid TTS audio bleeding into the microphone.
        if (!isMobile) startListening();
      }, 2000);
      return;
    }

    // 2. Time-based reset (2.5 seconds without a correct answer)
    const resetTimer = setTimeout(() => {
      speak("Thử lại nhé!");
      setFeedback("wrong");
      stopListening();

      setTimeout(() => {
        setFeedback(null);
        resetTranscript();
        if (!isMobile) startListening();
      }, 2000);
    }, 2500);

    return () => clearTimeout(resetTimer);
  }, [transcript, interimTranscript, isListening, feedback, speak, resetTranscript, startListening, stopListening]);

  // Handle speech result — check both during listening (interim) and after listening stops (final)
  // On Android Chrome, interim results may show the correct answer but the final transcript
  // transition differs from desktop, so we need to check in real-time too.

  // Reset match flag when moving to next question
  useEffect(() => {
    hasMatchedRef.current = false;
  }, [currentIndex]);

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
      speak("Giỏi quá!");
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
        speak("Giỏi quá!");
        setFeedback("correct");

        setTimeout(() => {
          goToNextQuestion();
        }, 2000);
      } else {
        // Wrong
        setFeedback("wrong");
        speak("Thử lại nhé!");
        setTimeout(() => {
          setFeedback(null);
          resetTranscript();
          // Only auto-restart on desktop. On mobile, let the kid tap the mic.
          if (!isMobile) startListening();
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

  if (!isSupported) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-orange-50 rounded-3xl border-4 border-orange-200 text-center max-w-lg mt-10 gap-4">
        <AlertCircle className="w-16 h-16 text-orange-400" />
        <h2 className="text-2xl font-bold text-orange-600">Không thể sử dụng giọng nói</h2>
        <p className="text-orange-800 text-lg leading-relaxed">
          Trình duyệt hiện tại không hỗ trợ tính năng nhận diện giọng nói. Hãy thử các cách sau:
        </p>
        <div className="bg-white rounded-2xl p-4 border-2 border-orange-100 text-left w-full space-y-3">
          <div>
            <p className="font-semibold text-orange-700">1. Mở bằng Safari 🧭</p>
            <p className="text-slate-600 text-base">
              Nếu bạn đang mở từ Facebook, Zalo, hoặc ứng dụng khác, hãy bấm <b>&quot;Mở trong Safari&quot;</b> hoặc
              copy link và dán vào Safari.
            </p>
          </div>
          <div>
            <p className="font-semibold text-orange-700">2. Bật tính năng Đọc chính tả 🎙️</p>
            <p className="text-slate-600 text-base">
              Vào <b>Cài đặt</b> → <b>Cài đặt chung</b> → <b>Bàn phím</b> → Bật <b>Đọc chính tả</b>
            </p>
          </div>
          <div>
            <p className="font-semibold text-orange-700">3. Cập nhật iOS 📲</p>
            <p className="text-slate-600 text-base">Tính năng này yêu cầu iOS 14.5 trở lên.</p>
          </div>
        </div>
      </div>
    );
  }

  // iOS Safari / PWA: Dictation service not allowed
  if (speechError === "service-not-allowed") {
    // Detect if running as Home Screen PWA (standalone mode)
    const isStandalone =
      typeof window !== "undefined" &&
      (window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone === true);

    return (
      <div className="flex flex-col items-center justify-center p-8 bg-orange-50 rounded-3xl border-4 border-orange-200 text-center max-w-lg mt-10 gap-4">
        <AlertCircle className="w-16 h-16 text-orange-400" />
        {isStandalone ? (
          <>
            <h2 className="text-2xl font-bold text-orange-600">Cần mở bằng Safari 🧭</h2>
            <p className="text-orange-800 text-lg leading-relaxed">
              Tính năng nhận diện giọng nói <b>không hoạt động</b> khi mở từ Màn hình chính. Bạn cần mở bằng{" "}
              <b>Safari</b>.
            </p>
            <div className="bg-white rounded-2xl p-4 border-2 border-orange-100 text-left w-full space-y-3">
              <div>
                <p className="font-semibold text-orange-700">Mở Safari 🧭</p>
                <p className="text-slate-600 text-base">
                  Mở ứng dụng <b>Safari</b> và truy cập lại trang web này để sử dụng tính năng giọng nói.
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-orange-600">Cần cấp quyền giọng nói 🎙️</h2>
            <p className="text-orange-800 text-lg leading-relaxed">
              Safari trên iPhone cần được cấp quyền <b>nhận diện giọng nói</b> để chơi trò này.
            </p>
            <div className="bg-white rounded-2xl p-4 border-2 border-orange-100 text-left w-full space-y-3">
              <div>
                <p className="font-semibold text-orange-700">Cách 1: Bật Đọc chính tả ⚙️</p>
                <p className="text-slate-600 text-base">
                  <b>Cài đặt</b> → <b>Cài đặt chung</b> → <b>Bàn phím</b> → Bật <b>&quot;Đọc chính tả&quot;</b>
                </p>
              </div>
              <div>
                <p className="font-semibold text-orange-700">Cách 2: Xoá dữ liệu Safari 🗑️</p>
                <p className="text-slate-600 text-base">
                  <b>Cài đặt</b> → <b>Safari</b> → <b>Xoá lịch sử và dữ liệu</b>, rồi thử lại.
                </p>
              </div>
            </div>
          </>
        )}
        <button
          onClick={() => window.location.reload()}
          className="bg-orange-500 hover:bg-orange-400 active:scale-95 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-lg transition-all duration-200 mt-2"
        >
          🔄 Tải lại trang
        </button>
      </div>
    );
  }

  // Microphone permission gate
  if (micStatus !== "granted") {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-blue-50 rounded-3xl border-4 border-blue-200 text-center max-w-lg mt-10 gap-6">
        {micStatus === "denied" ? (
          <>
            <Settings className="w-16 h-16 text-orange-400" />
            <h2 className="text-2xl font-bold text-orange-600">Cần bật quyền micro 🎤</h2>
            <p className="text-orange-800 text-lg leading-relaxed">
              Bạn đã chặn quyền truy cập micro trước đó. Để chơi trò này, bạn cần bật lại trong cài đặt trình duyệt:
            </p>
            <div className="bg-white rounded-2xl p-4 border-2 border-orange-100 text-left w-full">
              <p className="font-semibold text-orange-700 mb-2">📱 Trên iPhone (Safari):</p>
              <p className="text-slate-600 text-base mb-3">
                Vào <b>Cài đặt</b> → <b>Safari</b> → <b>Micro</b> → <b>Cho phép</b>
              </p>
              <p className="font-semibold text-orange-700 mb-2">💻 Trên máy tính, Android (Chrome):</p>
              <p className="text-slate-600 text-base">
                Bấm vào biểu tượng 🔒 trên thanh địa chỉ → <b>Micro</b> → <b>Cho phép</b>
              </p>
            </div>
            <button
              onClick={requestPermission}
              className="bg-blue-500 hover:bg-blue-400 active:scale-95 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-lg transition-all duration-200"
            >
              🔄 Thử lại
            </button>
          </>
        ) : (
          <>
            <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center shadow-xl">
              <Mic className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-blue-700">Cho phép sử dụng micro 🎤</h2>
            <p className="text-blue-800 text-lg leading-relaxed">
              Trò chơi này cần nghe giọng nói của bé. Bấm nút bên dưới và chọn <b>&quot;Cho phép&quot;</b> khi trình
              duyệt hỏi nhé!
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
        )}
      </div>
    );
  }

  if (!targetEntity) return <Loading />;

  const displayTranscript = interimTranscript || transcript;

  return (
    <div className="flex flex-col items-center gap-6 md:gap-8 w-full max-w-4xl">
      {/* Target Animal Display */}
      <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center mb-6">
        {/* The Frame/Container */}
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

        {/* The Animal */}
        <div
          className={`
            relative w-3/4 h-3/4 transition-all duration-300
            ${feedback === "correct" ? "scale-110" : "hover:scale-105"}
            ${isListening ? "cursor-not-allowed" : "cursor-pointer"}
          `}
          onClick={() => !isListening && speak(targetEntity.name)}
        >
          {targetEntity.textRepresent ? (
            <p className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 leading-none text-center">
              {targetEntity.textRepresent}
            </p>
          ) : (
            <Image src={targetEntity.image} alt={targetEntity.name} fill className="object-contain" />
          )}
        </div>
      </div>

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

      {/* Microphone Control */}
      <div className="relative mt-4">
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
    </div>
  );
};

export default SpeakPraticeLayout;
