"use client";

import { useState } from "react";
import { ColorData } from "./constants";
import { ColorCard } from "./ColorCard";
import { BackLessonButton } from "@/components/games/BackLessonButton";
import { NextLessonButton } from "@/components/games/NextLessonButton";
import { useSwipe } from "@/hooks/useSwipe";

interface ColorLearnLessonProps {
  colors: ColorData[];
  onComplete: () => void;
}

export function ColorLearnLesson({ colors, onComplete }: ColorLearnLessonProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < colors.length - 1) {
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

  const isLast = currentIndex === colors.length - 1;
  const currentColor = colors[currentIndex];

  return (
    <div ref={swipeRef} className="flex flex-col items-center gap-6 md:gap-8 w-full max-w-4xl px-4">
      {/* Progress Dots? Optional */}

      {/* Color Display */}
      <div className="flex items-center justify-center w-full min-h-[300px]">
        <ColorCard color={currentColor} active={true} />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 mt-4">
        <BackLessonButton onClick={handlePrev} disabled={currentIndex === 0} />
        <NextLessonButton onClick={handleNext} isLast={isLast} />
      </div>
    </div>
  );
}
