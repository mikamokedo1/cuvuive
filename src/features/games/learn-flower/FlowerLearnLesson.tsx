"use client";

import { useState } from "react";
import { FlowerData } from "./constants";
import { FlowerCard } from "./FlowerCard";
import { BackLessonButton } from "@/components/games/BackLessonButton";
import { NextLessonButton } from "@/components/games/NextLessonButton";

interface FlowerLearnLessonProps {
  flowers: FlowerData[];
  onComplete: () => void;
}

export function FlowerLearnLesson({ flowers, onComplete }: FlowerLearnLessonProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < flowers.length - 1) {
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

  const isLast = currentIndex === flowers.length - 1;
  const currentFlower = flowers[currentIndex];

  return (
    <div className="flex flex-col items-center gap-6 md:gap-8 w-full max-w-4xl px-4">
      {/* Flower Display */}
      <div className="flex items-center justify-center w-full min-h-[300px]">
        <FlowerCard flower={currentFlower} active={true} showName={true} />
      </div>
      {/* Controls */}
      <div className="flex items-center gap-6 mt-4">
        <BackLessonButton onClick={handlePrev} disabled={currentIndex === 0} />
        <NextLessonButton onClick={handleNext} isLast={isLast} />
      </div>
    </div>
  );
}
