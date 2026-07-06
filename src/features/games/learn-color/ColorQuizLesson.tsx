"use client";

import { useState, useEffect, useRef } from "react";
import { ColorData } from "./constants";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { getRandomItem } from "@/libs/utils/randomQuestion";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { FeedbackType } from "@/types/game";
import { playWrongSound } from "@/libs/utils/playSound";

interface ColorQuizLessonProps {
  colors: ColorData[];
  onComplete: () => void;
  requiredWins?: number;
}

export function ColorQuizLesson({ colors, onComplete, requiredWins = 5 }: ColorQuizLessonProps) {
  const { speak } = useTextToSpeech();
  const [targetColor, setTargetColor] = useState<ColorData | null>(null);
  const prevTargetRef = useRef<ColorData | null>(null);
  const [options, setOptions] = useState<ColorData[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackType>(null);

  // Generate new question
  const generateQuestion = () => {
    if (colors.length < 2) return;

    // Pick a random target
    const target = getRandomItem(colors, prevTargetRef.current);
    prevTargetRef.current = target;

    // Pick distractors (need total 3 options usually)
    let distractorPool = colors.filter((c) => c.id !== target.id);
    // Shuffle distractors
    distractorPool = distractorPool.sort(() => Math.random() - 0.5);

    // Take 2 distractors (or 1 if only 2 options exist)
    const optionsCount = Math.min(2, distractorPool.length);
    const selectedDistractors = distractorPool.slice(0, optionsCount);

    // Combine and shuffle options
    const newOptions = [target, ...selectedDistractors].sort(() => Math.random() - 0.5);

    setTargetColor(target);
    setOptions(newOptions);
    setFeedback(null);
  };

  useEffect(() => {
    generateQuestion();
  }, [colors]); // Init

  useEffect(() => {
    if (targetColor) {
      speak(`Màu nào giống ${targetColor.name} nhỉ?`);
    }
  }, [targetColor, speak]);

  const handleOptionClick = (selected: ColorData) => {
    speak(selected.name);
    if (!targetColor) return;
    if (feedback === "correct") return; // Prevent double clicks

    if (selected.id === targetColor.id) {
      // Correct
      setFeedback("correct");
      playWinEffect(500);
      // Play success sound (if any) or existing game sounds

      setTimeout(() => {
        const newScore = score + 1;
        setScore(newScore);
        if (newScore >= requiredWins) {
          onComplete();
        } else {
          generateQuestion();
        }
      }, 1000);
    } else {
      // Wrong
      playWrongSound();
      setFeedback("wrong");
      setTimeout(() => setFeedback(null), 600);
    }
  };

  if (!targetColor) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl px-4">
      {/* Question - Visual Color Display Instead of Text */}
      <div className="flex flex-col items-center gap-4">
        {/* Target Color Display - Show both color blob and associated image */}
        <div
          className={`cursor-pointer flex items-center gap-6 bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border-4 transition-all ${
            feedback === "correct"
              ? "border-green-400 bg-green-50"
              : feedback === "wrong"
                ? "border-red-400 bg-red-50 animate-shake"
                : "border-transparent"
          }`}
          onClick={() => speak(targetColor.name)}
        >
          {/* Color Blob */}
          <div
            className="transition-all  w-24 h-24 md:w-32 md:h-32 rounded-full shadow-md border-4 border-white hover:scale-105"
            style={{ backgroundColor: targetColor.hex }}
          />
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 w-full max-w-3xl justify-items-center">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionClick(option)}
            className={`
              w-32 h-32 sm:w-40 sm:h-40 rounded-2xl shadow-lg border-4 border-white
              transform transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer
              ${feedback === "wrong" && "opacity-50"}
            `}
            style={{ backgroundColor: option.hex }}
          />
        ))}
      </div>
    </div>
  );
}
