"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ScenarioMatchActivity, EMOTION_ITEMS } from "./constants";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playButtonSound } from "@/libs/utils/playSound";

interface EmotionScenarioLessonProps {
  activities: ScenarioMatchActivity[];
  onComplete: () => void;
}

export function EmotionScenarioLesson({ activities, onComplete }: EmotionScenarioLessonProps) {
  const { speak } = useTextToSpeech();
  const [shuffledActivities, setShuffledActivities] = useState<ScenarioMatchActivity[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const shuffled = [...activities].sort(() => Math.random() - 0.5);
    setShuffledActivities(shuffled);
  }, [activities]);

  const currentActivity = shuffledActivities[currentIndex];

  // Auto-speak the situation text
  useEffect(() => {
    if (currentActivity && !feedback) {
      const timeout = setTimeout(() => {
        speak(currentActivity.situationText);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentActivity, feedback, speak]);

  const handleSelectOption = useCallback(
    (optionId: string) => {
      if (feedback) return;

      playButtonSound();
      setSelectedOption(optionId);
      const isRight = optionId === currentActivity.correctEmotionId;

      if (isRight) {
        setFeedback("correct");
        speak("Đúng rồi! Cảm xúc rất chính xác!");
        playWinEffect(500);

        setTimeout(() => {
          const newScore = score + 1;
          setScore(newScore);

          if (currentIndex < shuffledActivities.length - 1) {
            setFeedback(null);
            setSelectedOption(null);
            setCurrentIndex(currentIndex + 1);
          } else {
            onComplete();
          }
        }, 2500);
      } else {
        setFeedback("wrong");
        speak("Chưa đúng rồi, bé thử suy nghĩ lại nhé!");

        setTimeout(() => {
          setFeedback(null);
          setSelectedOption(null);
        }, 1500);
      }
    },
    [feedback, currentActivity, speak, score, currentIndex, shuffledActivities.length, onComplete],
  );

  if (!currentActivity) return <div>Đang tải...</div>;

  return (
    <div className="flex flex-col items-center gap-6 md:gap-8 w-full max-w-4xl px-4">
      {/* Situation Text Banner */}
      <div
        className="w-full bg-blue-50 border-4 border-blue-200 rounded-2xl p-6 md:p-8 shadow-lg cursor-pointer hover:bg-blue-100 transition-colors flex flex-col items-center"
        onClick={() => speak(currentActivity.situationText)}
      >
        <div className="relative w-40 h-40 md:w-56 md:h-56 mb-4">
          <Image
            src={currentActivity.image}
            alt="scenario image"
            fill
            className="object-contain drop-shadow-md rounded-xl"
            priority
          />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-blue-800 text-center leading-relaxed">
          {currentActivity.situationText}
        </h2>
      </div>

      {/* Emotion Options Grid */}
      <div className="grid grid-cols-2 gap-4 md:gap-8 w-full max-w-2xl mt-4">
        {currentActivity.options.map((optionId) => {
          const emotion = EMOTION_ITEMS.find((e) => e.id === optionId);
          if (!emotion) return null;

          const isSelected = selectedOption === optionId;
          const isCorrectAnswer = optionId === currentActivity.correctEmotionId;

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
              key={optionId}
              onClick={() => handleSelectOption(optionId)}
              disabled={feedback !== null}
              className={`
                relative flex flex-col items-center justify-center p-4 md:p-6
                rounded-3xl border-4 shadow-md transition-all duration-300
                ${cardStyle}
              `}
            >
              <div className="relative w-24 h-24 md:w-32 md:h-32">
                <Image src={emotion.image} alt={emotion.name} fill className="object-contain drop-shadow-sm" />
              </div>

              <span
                className={`mt-3 font-bold text-lg md:text-xl ${
                  feedback === "correct" && isCorrectAnswer
                    ? "text-green-700"
                    : feedback === "wrong" && isSelected
                      ? "text-red-700"
                      : "text-gray-700"
                }`}
              >
                {emotion.name}
              </span>

              {feedback === "correct" && isCorrectAnswer && (
                <div className="absolute top-2 right-2 text-3xl animate-bounce">✨</div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
