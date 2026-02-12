"use client";

import { useState } from "react";
import { InstrumentData } from "./constants";
import { InstrumentCard } from "./InstrumentCard";
import { BackLessonButton } from "@/components/games/BackLessonButton";
import { NextLessonButton } from "@/components/games/NextLessonButton";

interface InstrumentLearnLessonProps {
  instruments: InstrumentData[];
  onComplete: () => void;
}

export function InstrumentLearnLesson({ instruments, onComplete }: InstrumentLearnLessonProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < instruments.length - 1) {
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

  const isLast = currentIndex === instruments.length - 1;
  const currentInstrument = instruments[currentIndex];

  return (
    <div className="flex flex-col items-center gap-6 md:gap-8 w-full max-w-4xl px-4">
      {/* Instrument Display */}
      <div className="flex items-center justify-center w-full min-h-[300px]">
        <InstrumentCard instrument={currentInstrument} active={true} showName={true} />
      </div>
      {/* Controls */}
      <div className="flex items-center gap-6 mt-4">
        <BackLessonButton onClick={handlePrev} disabled={currentIndex === 0} />
        <NextLessonButton onClick={handleNext} isLast={isLast} />
      </div>
    </div>
  );
}
