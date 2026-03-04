"use client";

import { useState } from "react";
import { NumberCard2 } from "./NumberCard2";
import { BackLessonButton } from "@/components/games/BackLessonButton";
import { NextLessonButton } from "@/components/games/NextLessonButton";
import { useSwipe } from "@/hooks/useSwipe";

interface LearnLesson2Props {
  numbers: number[]; // e.g. [0], [10, 11, 12], etc.
  onComplete: () => void;
}

export function LearnLesson2({ numbers, onComplete }: LearnLesson2Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < numbers.length - 1) {
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

  const swipeRef = useSwipe({ onSwipeLeft: handleNext, onSwipeRight: handlePrev });

  const isLast = currentIndex === numbers.length - 1;

  return (
    <div ref={swipeRef} className="flex flex-col items-center gap-6 md:gap-8 w-full max-w-4xl">
      {/* Number Display */}
      <div className="flex items-center justify-center gap-4 md:gap-16 w-full">
        <NumberCard2 number={numbers[currentIndex]} active={true} />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 mt-4">
        <BackLessonButton onClick={handlePrev} disabled={currentIndex === 0} />
        <NextLessonButton onClick={handleNext} isLast={isLast} />
      </div>
    </div>
  );
}
