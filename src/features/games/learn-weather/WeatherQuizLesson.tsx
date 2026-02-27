"use client";

import { useState, useEffect, useRef } from "react";
import { EntityData } from "@/types/game";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { getRandomItem } from "@/libs/utils/randomQuestion";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import Image from "next/image";
import LoudSpeaker from "@/assets/games/loud-speaker.webp";
import { FeedbackType } from "@/types/game";

interface WeatherQuizLessonProps {
  items: EntityData[];
  onComplete: () => void;
  requiredWins?: number;
}

export function WeatherQuizLesson({ items, onComplete, requiredWins = 6 }: WeatherQuizLessonProps) {
  const { speak } = useTextToSpeech();
  const [targetItem, setTargetItem] = useState<EntityData | null>(null);
  const prevTargetRef = useRef<EntityData | null>(null);
  const [options, setOptions] = useState<EntityData[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackType>(null);

  // Generate new question
  const generateQuestion = () => {
    if (items.length < 2) return;

    // Pick a random target
    const target = getRandomItem(items, prevTargetRef.current);
    prevTargetRef.current = target;

    // Pick distractors (need total 3 options usually)
    let distractorPool = items.filter((a) => a.id !== target.id);
    // Shuffle distractors
    distractorPool = distractorPool.sort(() => Math.random() - 0.5);

    // Take 2 distractors (or 1 if only 2 options exist)
    const optionsCount = Math.min(2, distractorPool.length);
    const selectedDistractors = distractorPool.slice(0, optionsCount);

    // Combine and shuffle options
    const newOptions = [target, ...selectedDistractors].sort(() => Math.random() - 0.5);

    setTargetItem(target);
    setOptions(newOptions);
    setFeedback(null);

    // Auto speak question after a short delay
    setTimeout(() => {
      speak(`Đâu là ${target.name}?`);
    }, 1000);
  };

  useEffect(() => {
    generateQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const handleOptionClick = (selected: EntityData) => {
    if (!targetItem) return;
    if (feedback === "correct") return;

    if (selected.id === targetItem.id) {
      // Correct
      speak(`Đúng rồi, đây là ${selected.name}`);
      setFeedback("correct");
      playWinEffect(500);

      setTimeout(() => {
        const newScore = score + 1;
        setScore(newScore);
        if (newScore >= requiredWins) {
          onComplete();
        } else {
          generateQuestion();
        }
      }, 1500);
    } else {
      // Wrong
      speak("Sai rồi, thử lại nhé");
      setFeedback("wrong");
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  if (!targetItem) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
      {/* Target Item Display */}
      <div className="relative w-40 h-40 md:w-56 md:h-56 flex items-center justify-center">
        {/* The Frame/Container */}
        <div
          className={`absolute inset-0 bg-gray-100 rounded-3xl border-4 border-gray-300 shadow-inner
        ${
          feedback === "correct"
            ? "border-green-400 bg-green-50"
            : feedback === "wrong"
              ? "border-red-400 bg-red-50 animate-shake"
              : "border-dashed"
        }
        `}
        />

        {/* The Item Silhouette */}
        <div
          className={`
            relative w-3/4 h-3/4 transition-all duration-700 ease-out
            ${
              feedback === "correct"
                ? "opacity-100 scale-100"
                : "opacity-40 grayscale contrast-[10] mix-blend-multiply scale-90"
            }
          `}
          onClick={() => speak(`${targetItem.name} bị thiếu`)}
        >
          <Image src={targetItem.image} alt={targetItem.name} fill className="object-contain hover:scale-105" />
        </div>

        {/* Success Effect */}
        {feedback === "correct" && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-full animate-ping rounded-3xl bg-green-100 opacity-20" />
          </div>
        )}
      </div>

      {/* Question Text */}
      <div className="flex flex-col items-center gap-4 text-center">
        <button
          onClick={() => speak(`Đâu là ${targetItem.name}?`)}
          className="cursor-pointer hover:scale-105 transition-all"
        >
          <Image src={LoudSpeaker} alt="Speaker" className="w-12 h-10" />
        </button>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-10 w-full max-w-3xl justify-items-center mt-8">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => handleOptionClick(option)}
            className={`
              relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-3xl shadow-lg border-4 bg-white
              flex items-center justify-center p-4 cursor-pointer
              transform transition-all duration-200 hover:scale-110 active:scale-95
              ${feedback === "wrong" && "opacity-30 grayscale"}
              ${feedback === "correct" && option.id === targetItem.id ? "border-green-500 scale-110 shadow-green-200" : "border-white"}
            `}
          >
            <Image src={option.image} alt={option.name} fill className="object-contain p-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
