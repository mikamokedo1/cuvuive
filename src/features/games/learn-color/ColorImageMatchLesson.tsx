"use client";

import { useState, useEffect, useRef } from "react";
import { ColorData } from "./constants";
import NextImage from "next/image";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { getRandomItem } from "@/libs/utils/randomQuestion";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { FeedbackType } from "@/types/game";
import { playWrongSound } from "@/libs/utils/playSound";

interface ColorImageMatchLessonProps {
  colors: ColorData[];
  onComplete: () => void;
  requiredWins?: number;
}

export function ColorImageMatchLesson({ colors, onComplete, requiredWins = 5 }: ColorImageMatchLessonProps) {
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

    // Pick distractors
    let distractorPool = colors.filter((c) => c.id !== target.id);
    distractorPool = distractorPool.sort(() => Math.random() - 0.5);

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
  }, [colors]);

  const handleOptionClick = (selected: ColorData) => {
    speak(selected.name);
    if (!targetColor) return;
    if (feedback === "correct") return;

    if (selected.id === targetColor.id) {
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
      }, 1000);
    } else {
      playWrongSound();
      setFeedback("wrong");
      setTimeout(() => setFeedback(null), 600);
    }
  };

  useEffect(() => {
    if (targetColor) {
      speak(`${targetColor.imageName} màu gì`);
    }
  }, [targetColor]);

  if (!targetColor) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl px-4">
      {/* Target Image Display */}
      <div className="flex flex-col items-center gap-4">
        <div
          className={`cursor-pointer relative w-48 h-48 md:w-64 md:h-64 bg-white rounded-3xl p-4 shadow-lg border-4 transition-all ${
            feedback === "correct"
              ? "border-green-400 bg-green-50"
              : feedback === "wrong"
                ? "border-red-400 bg-red-50 animate-shake"
                : "border-orange-200"
          }`}
          onClick={() => speak(`${targetColor.imageName} ${targetColor.name}`)}
        >
          <NextImage
            src={targetColor.image}
            alt={targetColor.imageName}
            fill
            className="object-contain p-4 hover:scale-105 transition-all"
          />
        </div>
      </div>

      {/* Color Options */}
      <div className="grid grid-cols-3 gap-3 md:gap-6 w-full max-w-md justify-items-center">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionClick(option)}
            className={`
              w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full shadow-lg border-4 border-white cursor-pointer
              transform transition-all duration-200 hover:scale-110 active:scale-95
              ${feedback === "wrong" && "opacity-50"}
            `}
            style={{ backgroundColor: option.hex }}
          />
        ))}
      </div>
    </div>
  );
}
