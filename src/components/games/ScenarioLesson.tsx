"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ScenarioQuestion } from "@/types/game";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playWrongSound } from "@/libs/utils/playSound";

interface ScenarioLessonProps {
  scenarios: ScenarioQuestion[];
  onComplete: () => void;
  altText?: string;
}

export function ScenarioLesson({ scenarios, onComplete, altText = "scenario" }: ScenarioLessonProps) {
  const { speak } = useTextToSpeech();
  const [shuffledScenarios, setShuffledScenarios] = useState<ScenarioQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const shuffled = [...scenarios].sort(() => Math.random() - 0.5);
    setShuffledScenarios(shuffled);
  }, [scenarios]);

  const currentScenario = shuffledScenarios[currentIndex];

  // Auto-speak
  useEffect(() => {
    if (currentScenario && !feedback) {
      const timeout = setTimeout(() => {
        speak(currentScenario.situationText);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentScenario, speak]);

  const handleSelectOption = useCallback(
    (optionId: string, text: string) => {
      if (feedback) return;

      setSelectedOption(optionId);
      const isRight = optionId === currentScenario.correctOptionId;

      if (isRight) {
        setFeedback("correct");
        speak(currentScenario.explanation);
        playWinEffect(500);

        setTimeout(() => {
          const newScore = score + 1;
          setScore(newScore);

          if (currentIndex < shuffledScenarios.length - 1) {
            setFeedback(null);
            setSelectedOption(null);
            setCurrentIndex(currentIndex + 1);
          } else {
            onComplete();
          }
        }, 5000);
      } else {
        speak(text);

        setFeedback("wrong");
        playWrongSound();

        setTimeout(() => {
          setFeedback(null);
          setSelectedOption(null);
        }, 1500);
      }
    },
    [feedback, currentScenario, speak, score, currentIndex, shuffledScenarios.length, onComplete],
  );

  if (!currentScenario) return <div>Đang tải...</div>;

  return (
    <div className="flex flex-col items-center gap-6 md:gap-8 w-full max-w-4xl px-4">
      {/* Situation card */}
      <div
        className="w-full bg-blue-50 border-4 border-blue-200 rounded-2xl p-6 md:p-8 shadow-lg cursor-pointer hover:bg-blue-100 transition-colors flex flex-col items-center"
        onClick={() => speak(currentScenario.situationText)}
      >
        <div className="relative w-40 h-40 md:w-56 md:h-56 mb-4">
          <Image
            src={currentScenario.image}
            alt={altText}
            fill
            className="object-contain drop-shadow-md rounded-xl"
            priority
          />
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 w-full max-w-2xl mt-4">
        {currentScenario.options.map((option) => {
          const isSelected = selectedOption === option.id;
          const isCorrectAnswer = option.id === currentScenario.correctOptionId;

          let cardStyle = "bg-white border-gray-200 hover:border-blue-400 hover:scale-105 active:scale-95";

          if (feedback === "correct") {
            if (isCorrectAnswer) {
              cardStyle = "bg-green-50 border-green-500 scale-105 shadow-xl ring-4 ring-green-200";
            } else {
              cardStyle = "opacity-40 bg-gray-50 border-gray-200 scale-95 grayscale";
            }
          } else if (feedback === "wrong" && isSelected) {
            cardStyle = "bg-red-50 border-red-500 animate-shake ring-4 ring-red-200";
          } else if (feedback === "wrong") {
            cardStyle = "opacity-70 bg-white border-gray-200 pointer-events-none";
          }

          return (
            <button
              key={option.id}
              onClick={() => handleSelectOption(option.id, option.text)}
              disabled={feedback !== null}
              className={`
                relative flex flex-col items-center justify-center p-4 md:p-6
                rounded-3xl border-4 shadow-md transition-all duration-300
                ${cardStyle}
              `}
            >
              <span className="text-4xl md:text-5xl mb-2">{option.emoji}</span>
              <span
                className={`font-bold text-sm md:text-base ${
                  feedback === "correct" && isCorrectAnswer
                    ? "text-green-700"
                    : feedback === "wrong" && isSelected
                      ? "text-red-700"
                      : "text-gray-700"
                }`}
              >
                {option.text}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
