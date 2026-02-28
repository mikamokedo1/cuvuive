"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { RightWrongScenario } from "./constants";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playButtonSound } from "@/libs/utils/playSound";

interface HygieneRightWrongLessonProps {
  scenarios: RightWrongScenario[];
  onComplete: () => void;
}

export function HygieneRightWrongLesson({ scenarios, onComplete }: HygieneRightWrongLessonProps) {
  const { speak } = useTextToSpeech();
  const [shuffledScenarios, setShuffledScenarios] = useState<RightWrongScenario[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const shuffled = [...scenarios].sort(() => Math.random() - 0.5);
    setShuffledScenarios(shuffled);
  }, [scenarios]);

  const currentScenario = shuffledScenarios[currentIndex];

  // Auto-speak the scenario text
  useEffect(() => {
    if (currentScenario && !feedback) {
      const timeout = setTimeout(() => {
        speak(currentScenario.text);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentScenario, feedback, speak]);

  const handleAnswer = useCallback(
    (answeredCorrect: boolean) => {
      if (feedback) return;
      if (!currentScenario) return;

      const isRight = answeredCorrect === currentScenario.isCorrect;
      playButtonSound();

      if (isRight) {
        setFeedback("correct");
        speak(currentScenario.isCorrect ? "Đúng rồi! Đây là thói quen tốt!" : "Giỏi lắm! Đây là thói quen xấu!");
        playWinEffect(500);

        setTimeout(() => {
          const newScore = score + 1;
          setScore(newScore);

          if (currentIndex < shuffledScenarios.length - 1) {
            setFeedback(null);
            setCurrentIndex(currentIndex + 1);
          } else {
            onComplete();
          }
        }, 2000);
      } else {
        setFeedback("wrong");
        speak("Sai rồi, thử lại nhé!");

        setTimeout(() => {
          setFeedback(null);
        }, 1500);
      }
    },
    [feedback, currentScenario, speak, score, currentIndex, shuffledScenarios.length, onComplete],
  );

  if (!currentScenario) return <div>Đang tải...</div>;

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl px-4">
      {/* Scenario Card */}
      <div
        className={`
          w-full rounded-3xl p-8 shadow-xl border-4 transition-all duration-300
          ${
            feedback === "correct"
              ? "bg-green-50 border-green-400 scale-105"
              : feedback === "wrong"
                ? "bg-red-50 border-red-400 animate-shake"
                : "bg-white border-purple-200"
          }
        `}
      >
        <div className="text-center flex flex-col items-center">
          {/* Scenario Image */}
          <div className="relative w-48 h-48 md:w-56 md:h-56 mb-6" onClick={() => speak(currentScenario.text)}>
            <Image
              src={currentScenario.image}
              alt="scenario image"
              fill
              className="object-contain drop-shadow-md"
              priority
            />
          </div>
        </div>
      </div>

      {/* Answer Buttons */}
      <div className="flex gap-6 w-full max-w-md">
        <button
          onClick={() => handleAnswer(true)}
          disabled={feedback !== null}
          className={`
            flex-1 py-6 rounded-2xl text-2xl font-bold shadow-lg
            transform transition-all duration-200 active:scale-95
            ${
              feedback === "correct" && currentScenario.isCorrect
                ? "bg-green-500 text-white scale-110"
                : feedback !== null
                  ? "opacity-50 cursor-not-allowed bg-green-100 text-green-700"
                  : "bg-green-500 text-white hover:bg-green-600 hover:scale-105 cursor-pointer"
            }
          `}
        >
          ✅ Đúng
        </button>

        <button
          onClick={() => handleAnswer(false)}
          disabled={feedback !== null}
          className={`
            flex-1 py-6 rounded-2xl text-2xl font-bold shadow-lg
            transform transition-all duration-200 active:scale-95
            ${
              feedback === "correct" && !currentScenario.isCorrect
                ? "bg-red-500 text-white scale-110"
                : feedback !== null
                  ? "opacity-50 cursor-not-allowed bg-red-100 text-red-700"
                  : "bg-red-500 text-white hover:bg-red-600 hover:scale-105 cursor-pointer"
            }
          `}
        >
          ❌ Sai
        </button>
      </div>
    </div>
  );
}
