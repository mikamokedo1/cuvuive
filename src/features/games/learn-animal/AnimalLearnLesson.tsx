"use client";

import { useState } from "react";
import { AnimalData } from "./constants";
import { AnimalCard } from "./AnimalCard";
import { BackLessonButton } from "@/components/games/BackLessonButton";
import { NextLessonButton } from "@/components/games/NextLessonButton";

interface AnimalLearnLessonProps {
  animals: AnimalData[];
  onComplete: () => void;
}

export function AnimalLearnLesson({ animals, onComplete }: AnimalLearnLessonProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < animals.length - 1) {
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

  const isLast = currentIndex === animals.length - 1;
  const currentAnimal = animals[currentIndex];

  return (
    <div className="flex flex-col items-center gap-6 md:gap-8 w-full max-w-4xl px-4">
      {/* Animal Display */}
      <div className="flex items-center justify-center w-full min-h-[300px]">
        <AnimalCard animal={currentAnimal} active={true} showName={true} />
      </div>
      {/* Controls */}
      <div className="flex items-center gap-6 mt-4">
        <BackLessonButton onClick={handlePrev} disabled={currentIndex === 0} />
        <NextLessonButton onClick={handleNext} isLast={isLast} />
      </div>
    </div>
  );
}
