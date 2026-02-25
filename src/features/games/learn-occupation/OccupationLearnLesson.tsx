"use client";

import { useState } from "react";
import { EntityData } from "@/types/game";
import { OccupationCard } from "./OccupationCard";
import { BackLessonButton } from "@/components/games/BackLessonButton";
import { NextLessonButton } from "@/components/games/NextLessonButton";

interface OccupationLearnLessonProps {
  occupations: EntityData[];
  onComplete: () => void;
}

export function OccupationLearnLesson({ occupations, onComplete }: OccupationLearnLessonProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < occupations.length - 1) {
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

  const isLast = currentIndex === occupations.length - 1;
  const currentOccupation = occupations[currentIndex];

  return (
    <div className="flex flex-col items-center gap-6 md:gap-8 w-full max-w-4xl px-4">
      {/* Occupation Display */}
      <div className="flex items-center justify-center w-full min-h-[300px]">
        <OccupationCard occupation={currentOccupation} active={true} showName={true} />
      </div>
      {/* Controls */}
      <div className="flex items-center gap-6 mt-4">
        <BackLessonButton onClick={handlePrev} disabled={currentIndex === 0} />
        <NextLessonButton onClick={handleNext} isLast={isLast} />
      </div>
    </div>
  );
}
