"use client";

import { useState, useEffect, useRef } from "react";
import { ShapeData } from "./constants";
import NextImage from "next/image";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { getRandomItem } from "@/libs/utils/randomQuestion";
import { useTextToSpeech } from "@/libs/hooks/useTextToSpeech";
import { FeedbackType } from "@/types/game";

interface ShapeMatchLessonProps {
  shapes: ShapeData[];
  onComplete: () => void;
  requiredWins?: number;
}

export function ShapeMatchLesson({ shapes, onComplete, requiredWins = 6 }: ShapeMatchLessonProps) {
  const { speak } = useTextToSpeech();
  const [targetShape, setTargetShape] = useState<ShapeData | null>(null);
  const prevTargetRef = useRef<ShapeData | null>(null);
  const [options, setOptions] = useState<ShapeData[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackType>(null);

  // Generate new question
  const generateQuestion = () => {
    if (shapes.length < 2) return;

    // Pick a random target
    const target = getRandomItem(shapes, prevTargetRef.current);
    prevTargetRef.current = target;

    // Pick distractors
    let distractorPool = shapes.filter((c) => c.id !== target.id);
    distractorPool = distractorPool.sort(() => Math.random() - 0.5);

    const optionsCount = Math.min(2, distractorPool.length);
    const selectedDistractors = distractorPool.slice(0, optionsCount);

    // Combine and shuffle options
    const newOptions = [target, ...selectedDistractors].sort(() => Math.random() - 0.5);

    setTargetShape(target);
    setOptions(newOptions);
    setFeedback(null);

    setTimeout(() => {
      speak(`${target.objectName} có hình gì?`);
    }, 1500);
  };

  useEffect(() => {
    generateQuestion();
  }, [shapes]);

  const handleOptionClick = (selected: ShapeData) => {
    if (!targetShape) return;
    if (feedback === "correct") return;

    if (selected.id === targetShape.id) {
      speak(`Đúng rồi! ${targetShape.objectName} có ${targetShape.name}`);
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
      speak("Sai rồi, thử lại nhé");
      setFeedback("wrong");
      setTimeout(() => setFeedback(null), 600);
    }
  };

  if (!targetShape) return <div>Loading...</div>;

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
          onClick={() => speak(`${targetShape.objectName}`)}
        >
          <NextImage
            src={targetShape.objectImage}
            alt={targetShape.objectName}
            fill
            className="object-contain p-4 hover:scale-105 transition-all"
          />
        </div>
      </div>

      {/* Shape Options */}
      <div className="grid grid-cols-3 gap-4 md:gap-8 w-full max-w-2xl justify-items-center mt-6">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => handleOptionClick(option)}
            className={`
              relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl shadow-lg border-4 border-white bg-white cursor-pointer
              flex items-center justify-center p-3
              transform transition-all duration-200 hover:scale-110 active:scale-95
              ${feedback === "wrong" ? "opacity-50" : ""}
            `}
          >
            <NextImage src={option.image} alt={option.name} fill className="object-contain p-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
