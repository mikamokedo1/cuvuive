"use client";

import { useEffect, useState } from "react";
import { EntityData } from "@/types/game";
import { EmotionCard } from "./EmotionCard";
import { BackLessonButton } from "@/components/games/BackLessonButton";
import { NextLessonButton } from "@/components/games/NextLessonButton";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

interface EmotionLearnLessonProps {
  items: EntityData[];
  onComplete: () => void;
}

export function EmotionLearnLesson({ items, onComplete }: EmotionLearnLessonProps) {
  const { speak } = useTextToSpeech();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
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

  useEffect(() => {
    const item = items[currentIndex];
    speak(item.name);
  }, [currentIndex]);

  const isLast = currentIndex === items.length - 1;
  const currentItem = items[currentIndex];

  return (
    <div className="flex flex-col items-center gap-6 md:gap-8 w-full max-w-4xl px-4">
      {/* Item Display */}
      <div className="flex items-center justify-center w-full min-h-[300px]">
        <EmotionCard item={currentItem} active={true} showName={true} />
      </div>
      {/* Controls */}
      <div className="flex items-center gap-6 mt-4">
        <BackLessonButton onClick={handlePrev} disabled={currentIndex === 0} />
        <NextLessonButton onClick={handleNext} isLast={isLast} />
      </div>
    </div>
  );
}
