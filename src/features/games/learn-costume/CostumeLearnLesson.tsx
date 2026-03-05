"use client";

import { useState, useEffect } from "react";
import { CostumeData } from "./constants";
import { CostumeCard } from "./CostumeCard";
import { BackLessonButton } from "@/components/games/BackLessonButton";
import { NextLessonButton } from "@/components/games/NextLessonButton";
import { useSwipe } from "@/hooks/useSwipe";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

interface CostumeLearnLessonProps {
  costumes: CostumeData[];
  onComplete: () => void;
}

export function CostumeLearnLesson({ costumes, onComplete }: CostumeLearnLessonProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { speak } = useTextToSpeech();

  const handleNext = () => {
    if (currentIndex < costumes.length - 1) {
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

  const isLast = currentIndex === costumes.length - 1;
  const currentCostume = costumes[currentIndex];

  useEffect(() => {
    if (currentCostume) {
      speak(`${currentCostume.name} của ${currentCostume.category}`);
    }
  }, [currentIndex, currentCostume, speak]);

  return (
    <div ref={swipeRef} className="flex flex-col items-center gap-6 md:gap-8 w-full max-w-4xl px-4 py-8">
      {/* Costume Display */}
      <div className="flex items-center justify-center w-full max-w-[240px] md:max-w-xs mt-4">
        <CostumeCard costume={currentCostume} isFlipped={true} />
      </div>
      {/* Controls */}
      <div className="flex items-center gap-6 mt-8">
        <BackLessonButton onClick={handlePrev} disabled={currentIndex === 0} />
        <NextLessonButton onClick={handleNext} isLast={isLast} />
      </div>
    </div>
  );
}
