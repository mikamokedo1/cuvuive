"use client";
import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, AlertCircle } from "lucide-react";
import Image from "next/image";
import Loading from "../common/Loading";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { getRandomItem } from "@/libs/utils/randomQuestion";
import { useTextToSpeech } from "@/libs/hooks/useTextToSpeech";
import { useSpeechRecognition } from "@/libs/hooks/useSpeechRecognition";
import { fuzzyMatchVietnamese } from "@/libs/utils/fuzzyMatch";
import { EntityData } from "@/types/game";
import { playButtonSound } from "@/libs/utils/playSound";

interface SpeakPraticeLayoutProps {
  entities: EntityData[];
  onComplete: () => void;
  requiredWins?: number;
}

const SpeakPraticeLayout = ({ entities, onComplete, requiredWins = 6 }: SpeakPraticeLayoutProps) => {
  const { speak } = useTextToSpeech();
  const { isListening, transcript, interimTranscript, isSupported, startListening, stopListening, resetTranscript } =
    useSpeechRecognition("vi-VN");

  const [targetEntity, setTargetEntity] = useState<EntityData | null>(null);
  const prevTargetRef = useRef<EntityData | null>(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [hasTried, setHasTried] = useState(false);

  // Generate new question
  const generateQuestion = () => {
    if (entities.length === 0) return;

    // Pick a random target
    const target = getRandomItem(entities, prevTargetRef.current);
    prevTargetRef.current = target;

    setTargetEntity(target);
    setFeedback(null);
    setHasTried(false);
    resetTranscript();

    // Auto speak question after a short delay
    setTimeout(() => {
      speak(`${target.name}`);

      // Auto-start microphone after TTS finishes (approx 1.5 seconds)
      setTimeout(() => {
        startListening();
      }, 1500);
    }, 800);
  };

  useEffect(() => {
    generateQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entities]);

  // Handle speech result
  useEffect(() => {
    if (!isListening && transcript && targetEntity && !feedback) {
      setHasTried(true);
      const isCorrect = fuzzyMatchVietnamese(transcript, targetEntity.name);

      if (isCorrect) {
        // Correct
        playWinEffect(500);
        setFeedback("correct");

        setTimeout(() => {
          const newScore = score + 1;
          setScore(newScore);
          if (newScore >= requiredWins) {
            onComplete();
          } else {
            generateQuestion();
          }
        }, 2000);
      } else {
        // Wrong
        setFeedback("wrong");
        speak("Thử lại nhé!");
        setTimeout(() => {
          setFeedback(null);
          resetTranscript();
          // Auto-start microphone again after "Thử lại nhé"
          startListening();
        }, 2000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListening, transcript, targetEntity, feedback]);

  const handleMicClick = () => {
    playButtonSound();
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!isSupported) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-orange-50 rounded-3xl border-4 border-orange-200 text-center max-w-lg mt-10">
        <AlertCircle className="w-16 h-16 text-orange-400 mb-4" />
        <h2 className="text-2xl font-bold text-orange-600 mb-2">Trình duyệt không hỗ trợ</h2>
        <p className="text-orange-800 text-lg">
          Tiếc quá, trình duyệt của bạn không hỗ trợ tính năng nhận diện giọng nói. Bạn hãy thử mở bằng{" "}
          <b>Google Chrome</b> hoặc <b>Safari</b> nhé!
        </p>
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
          `}
          onClick={() => speak(targetEntity.name)}
        >
          <Image src={targetEntity.image} alt={targetEntity.name} fill className="object-contain cursor-pointer" />
        </div>

        {/* Name Tag */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-6 py-2 rounded-full shadow-lg border-2 border-slate-200 z-10 whitespace-nowrap">
          <span className="text-2xl md:text-3xl font-display font-medium text-slate-800">{targetEntity.name}</span>
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
          <p className="text-xl md:text-2xl text-blue-500 font-medium animate-pulse text-center">
            Bé hãy nói tên con vật nhé...
          </p>
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
