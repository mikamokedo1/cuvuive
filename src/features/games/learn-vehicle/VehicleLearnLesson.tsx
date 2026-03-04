"use client";

import { useState } from "react";
import { EntityData } from "@/types/game";
import { VehicleCard } from "./VehicleCard";
import { BackLessonButton } from "@/components/games/BackLessonButton";
import { NextLessonButton } from "@/components/games/NextLessonButton";
import { useSwipe } from "@/hooks/useSwipe";

interface VehicleLearnLessonProps {
  vehicles: EntityData[];
  onComplete: () => void;
}

export function VehicleLearnLesson({ vehicles, onComplete }: VehicleLearnLessonProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < vehicles.length - 1) {
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

  const isLast = currentIndex === vehicles.length - 1;
  const currentVehicle = vehicles[currentIndex];

  return (
    <div ref={swipeRef} className="flex flex-col items-center gap-6 md:gap-8 w-full max-w-4xl px-4">
      {/* Vehicle Display */}
      <div className="flex items-center justify-center w-full min-h-[300px]">
        <VehicleCard vehicle={currentVehicle} active={true} showName={true} />
      </div>
      {/* Controls */}
      <div className="flex items-center gap-6 mt-4">
        <BackLessonButton onClick={handlePrev} disabled={currentIndex === 0} />
        <NextLessonButton onClick={handleNext} isLast={isLast} />
      </div>
    </div>
  );
}
