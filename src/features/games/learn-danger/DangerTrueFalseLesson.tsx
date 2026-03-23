"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { TrueFalseStatement } from "./constants";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playButtonSound, playWrongSound } from "@/libs/utils/playSound";
import { TrueFalseButtons } from "@/components/games/TrueFalseButtons";

interface DangerTrueFalseLessonProps {
  statements: TrueFalseStatement[];
  onComplete: () => void;
}

export function DangerTrueFalseLesson({ statements, onComplete }: DangerTrueFalseLessonProps) {
  const { speak } = useTextToSpeech();
  const [shuffled, setShuffled] = useState<TrueFalseStatement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);

  // Shuffle on mount
  useEffect(() => {
    setShuffled([...statements].sort(() => Math.random() - 0.5));
  }, [statements]);

  const current = shuffled[currentIndex];
  const totalQuestions = shuffled.length;

  // Auto-speak statement
  useEffect(() => {
    if (current && !feedback) {
      const timeout = setTimeout(() => {
        speak(current.statement);
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [current, feedback, speak]);

  const handleAnswer = useCallback(
    (answer: boolean) => {
      if (feedback) return;

      setSelectedAnswer(answer);
      playButtonSound();

      const isCorrect = answer === current.isTrue;
      console.log(isCorrect);
      if (isCorrect) {
        setFeedback("correct");
        setScore((prev) => prev + 1);
        playWinEffect(300);
        speak(current.explanation);

        setTimeout(() => {
          if (currentIndex < totalQuestions - 1) {
            setCurrentIndex((prev) => prev + 1);
            setFeedback(null);
            setSelectedAnswer(null);
          } else {
            onComplete();
          }
        }, 5000);
      } else {
        setFeedback("wrong");
        playWrongSound();
        setTimeout(() => {
          setFeedback(null);
          setSelectedAnswer(null);
        }, 3000);
      }
    },
    [feedback, current, currentIndex, totalQuestions, speak, onComplete],
  );

  if (!current) return <div>Đang tải...</div>;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl px-4">
      {/* Progress */}
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span>
            Câu {currentIndex + 1}/{totalQuestions}
          </span>
          <span>⭐ {score}</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Statement card with image */}
      <div
        className={`w-full max-w-md rounded-3xl p-6 md:p-8 shadow-xl border-4 cursor-pointer transition-all duration-500 ${
          feedback === "correct"
            ? "bg-green-50 border-green-400"
            : feedback === "wrong"
              ? "bg-red-50 border-red-400 animate-shake"
              : "bg-orange-50 border-orange-200 hover:border-orange-400"
        }`}
        onClick={() => !feedback && speak(current.statement)}
      >
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Illustration image */}
          <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden">
            <Image
              src={current.image}
              alt="minh họa"
              fill
              className="object-contain drop-shadow-md"
              sizes="(max-width: 640px) 144px, 176px"
              priority
            />
          </div>

          <p className="text-lg md:text-xl font-bold text-gray-800 leading-relaxed">{current.statement}</p>
        </div>
      </div>

      {/* True / False buttons */}
      <TrueFalseButtons
        onAnswer={handleAnswer}
        feedback={feedback}
        correctAnswer={current.isTrue}
        selectedAnswer={selectedAnswer}
      />
    </div>
  );
}
