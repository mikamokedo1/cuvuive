"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Volume2 } from "lucide-react";
import { ScenarioMatchActivity, EMOTION_ITEMS } from "./constants";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playButtonSound, playWrongSound } from "@/libs/utils/playSound";

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
  }, [currentActivity, speak]);

  const handleSelectOption = useCallback(
    (optionId: string, emotionName: string) => {
      if (feedback) return;

      setSelectedOption(optionId);
      const isRight = optionId === currentActivity.correctEmotionId;

      if (isRight) {
        setFeedback("correct");
        speak(`${emotionName} Đúng rồi! Cảm xúc rất chính xác!`);
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
        speak(`${emotionName} Chưa đúng rồi`);
        playWrongSound();

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
        className="relative w-full bg-blue-50 border-4 border-blue-200 rounded-2xl p-6 md:p-8 shadow-lg cursor-pointer hover:bg-blue-100 transition-colors flex flex-col items-center"
        onClick={() => speak(currentActivity.situationText)}
      >
        <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-md">
          <Volume2 className="w-5 h-5" />
        </div>
        <div className="relative w-40 h-40 md:w-56 md:h-56 mb-2">
          <Image
            src={currentActivity.image}
            alt="scenario image"
            fill
            className="object-contain drop-shadow-md rounded-xl"
            priority
          />
        </div>
      </div>

      {/* Emotion Options Grid */}
      <div className="grid grid-cols-2 gap-4 md:gap-8 w-full max-w-2xl mt-2">
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
            <div
              key={optionId}
              onClick={() => {
                if (feedback === null) handleSelectOption(optionId, emotion.name);
              }}
              role="button"
              tabIndex={0}
              className={`
                relative flex flex-col items-center justify-center p-4 md:p-6
                rounded-3xl border-4 shadow-md transition-all duration-300 cursor-pointer
                ${cardStyle}
              `}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  speak(emotion.name);
                }}
                aria-label={`Nghe: ${emotion.name}`}
                className="absolute top-2.5 right-2.5 w-9 h-9 rounded-full bg-blue-100 hover:bg-blue-200 active:scale-90 text-blue-600 flex items-center justify-center shadow-sm z-10 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
              </button>
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
