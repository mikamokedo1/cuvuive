"use client";

import { useTextToSpeech } from "@/libs/hooks/useTextToSpeech";
import { useState } from "react";
import { EntityData } from "@/types/game";
import { FoodCard } from "./FoodCard";
import { BackLessonButton } from "@/components/games/BackLessonButton";
import { NextLessonButton } from "@/components/games/NextLessonButton";

interface FoodLearnLessonProps {
  foods: EntityData[];
  onComplete: () => void;
}

export function FoodLearnLesson({ foods, onComplete }: FoodLearnLessonProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < foods.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const isLast = currentIndex === foods.length - 1;
  const currentFood = foods[currentIndex];

  return (
    <div className="flex flex-col items-center gap-6 md:gap-8 w-full max-w-4xl px-4">
      {/* Food Display */}
      <div className="flex items-center justify-center w-full min-h-[300px]">
        <FoodCard food={currentFood} active={true} showName={true} />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 mt-4">
        <BackLessonButton onClick={handlePrev} disabled={currentIndex === 0} />
        <NextLessonButton onClick={handleNext} isLast={isLast} />
      </div>
    </div>
  );
}
