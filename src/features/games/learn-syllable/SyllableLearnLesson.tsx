"use client";

import { useState, useEffect } from "react";
import { SyllableData } from "./constants";
import { BackLessonButton } from "@/components/games/BackLessonButton";
import { NextLessonButton } from "@/components/games/NextLessonButton";
import { useSwipe } from "@/hooks/useSwipe";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import Image from "next/image";
import { playButtonSound } from "@/libs/utils/playSound";

interface SyllableLearnLessonProps {
  syllables: SyllableData[];
  onComplete: () => void;
}

export function SyllableLearnLesson({ syllables, onComplete }: SyllableLearnLessonProps) {
  const { speak } = useTextToSpeech();
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalScreens = syllables.length;

  const handleNext = () => {
    if (currentIndex < totalScreens - 1) {
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

  const currentSyllable = syllables[currentIndex];

  // Auto speak on step change
  useEffect(() => {
    if (currentSyllable) {
      speak(currentSyllable.syllable);
    }
  }, [currentIndex, currentSyllable, speak]);

  const handleSpeakSyllable = () => {
    speak(currentSyllable.spelling);
  };

  const isLast = currentIndex === totalScreens - 1;

  if (!currentSyllable || totalScreens === 0) return null;

  return (
    <div ref={swipeRef} className="flex flex-col items-center gap-6 md:gap-8 w-full max-w-4xl px-4">
      {/* Target Display */}
      <div className="relative w-full md:w-[450px] flex flex-col items-center justify-around p-3 md:p-8 rounded-[3rem] border-4 border-emerald-400 shadow-2xl overflow-hidden">
        {/* Background Sparkle or simple design */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-100 rounded-full translate-y-1/2 -translate-x-1/2 opacity-50" />

        <div
          className="relative w-full h-40 min-h-[100px] md:h-60 md:w-60 transition-transform duration-300 hover:scale-105 cursor-pointer z-10 flex items-center justify-center"
          onClick={() => speak(currentSyllable.name)}
        >
          {currentSyllable.image ? (
            <Image src={currentSyllable.image} alt={currentSyllable.name} fill className="object-contain" />
          ) : (
            <span className="text-6xl md:text-8xl font-black text-emerald-400 drop-shadow-md select-none">
              {currentSyllable.name}
            </span>
          )}
        </div>

        <div className="flex flex-col items-center gap-2 z-10 w-full mt-2">
          <div
            onClick={handleSpeakSyllable}
            className="cursor-pointer transition-all text-7xl md:text-9xl font-black text-emerald-600 drop-shadow-sm"
          >
            {currentSyllable.syllable}
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              speak(currentSyllable.fullSpelling);
            }}
            className="mt-2 cursor-pointer transition-all hover:opacity-80 text-2xl md:text-3xl font-bold text-gray-500"
          >
            {currentSyllable.name}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-8 mt-4">
        <BackLessonButton onClick={handlePrev} disabled={currentIndex === 0} />
        <NextLessonButton onClick={handleNext} isLast={isLast} />
      </div>
    </div>
  );
}
