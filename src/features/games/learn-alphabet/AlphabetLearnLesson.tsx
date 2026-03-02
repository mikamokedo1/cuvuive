"use client";

import { useState } from "react";
import { LetterData } from "./constants";
import { AlphabetCard } from "./AlphabetCard";
import { BackLessonButton } from "@/components/games/BackLessonButton";
import { NextLessonButton } from "@/components/games/NextLessonButton";
import { LetterSelector } from "./LetterSelector";

interface AlphabetLearnLessonProps {
  letters: LetterData[];
  onComplete: () => void;
  isReviewMode?: boolean;
}

export function AlphabetLearnLesson({ letters, onComplete, isReviewMode = false }: AlphabetLearnLessonProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < letters.length - 1) {
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

  const isLast = currentIndex === letters.length - 1;
  const currentLetter = letters[currentIndex];

  return (
    <div className="flex flex-col items-center gap-6 md:gap-8 w-full max-w-4xl px-4">
      {/* Letter Display */}
      <div className="flex items-center justify-center w-full min-h-[300px]">
        <AlphabetCard letter={currentLetter} active={true} showName={true} />
      </div>
      {/* Controls */}
      <div className="flex items-center gap-6 mt-4">
        <BackLessonButton onClick={handlePrev} disabled={currentIndex === 0} />
        <NextLessonButton onClick={handleNext} isLast={isLast} />
      </div>

      {/* Letter selector - shown when revisiting a completed lesson */}
      {isReviewMode && <LetterSelector letters={letters} currentIndex={currentIndex} onSelect={setCurrentIndex} />}
    </div>
  );
}
