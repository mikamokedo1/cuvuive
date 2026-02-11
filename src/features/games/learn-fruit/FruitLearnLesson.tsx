"use client";

import { useState } from "react";
import { FruitData } from "./constants";
import { FruitCard } from "./FruitCard";
import { BackLessonButton } from "@/components/games/BackLessonButton";
import { NextLessonButton } from "@/components/games/NextLessonButton";

interface FruitLearnLessonProps {
  fruits: FruitData[];
  onComplete: () => void;
}

export function FruitLearnLesson({ fruits, onComplete }: FruitLearnLessonProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < fruits.length - 1) {
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

  const isLast = currentIndex === fruits.length - 1;
  const currentFruit = fruits[currentIndex];

  return (
    <div className="flex flex-col items-center gap-6 md:gap-8 w-full max-w-4xl px-4">
      {/* Fruit Display */}
      <div className="flex items-center justify-center w-full min-h-[300px]">
        <FruitCard fruit={currentFruit} active={true} showName={true} />
      </div>
      {/* Controls */}
      <div className="flex items-center gap-6 mt-4">
        <BackLessonButton onClick={handlePrev} disabled={currentIndex === 0} />
        <NextLessonButton onClick={handleNext} isLast={isLast} />
      </div>
    </div>
  );
}
