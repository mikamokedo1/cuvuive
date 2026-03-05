"use client";

import { useState } from "react";
import { EntityData } from "@/types/game";
import { LandmarkCard } from "./LandmarkCard";
import { BackLessonButton } from "@/components/games/BackLessonButton";
import { NextLessonButton } from "@/components/games/NextLessonButton";
import { useSwipe } from "@/hooks/useSwipe";

interface LandmarkLearnLessonProps {
  landmarks: EntityData[];
  onComplete: () => void;
}

export function LandmarkLearnLesson({ landmarks, onComplete }: LandmarkLearnLessonProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < landmarks.length - 1) {
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

  const isLast = currentIndex === landmarks.length - 1;
  const currentLandmark = landmarks[currentIndex];

  return (
    <div ref={swipeRef} className="flex flex-col items-center gap-6 md:gap-8 w-full max-w-4xl px-4">
      {/* Landmark Display */}
      <div className="flex items-center justify-center w-full min-h-[350px]">
        <LandmarkCard landmark={currentLandmark} active={true} />
      </div>
      {/* Controls */}
      <div className="flex items-center gap-6 mt-4">
        <BackLessonButton onClick={handlePrev} disabled={currentIndex === 0} />
        <NextLessonButton onClick={handleNext} isLast={isLast} />
      </div>
    </div>
  );
}
