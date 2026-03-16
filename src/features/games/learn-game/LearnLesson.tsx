"use client";

import { useState } from "react";
import { NumberCard } from "@/features/games/learn-game/NumberCard";
import { ThingImages } from "@/libs/constants/thingImages";
import { BackLessonButton } from "@/components/games/BackLessonButton";
import { NextLessonButton } from "@/components/games/NextLessonButton";
import { useSwipe } from "@/hooks/useSwipe";

const MAP_NUMBERS = [
  {
    number: 1,
    title: "Số 1",
    icon: ThingImages[0].icon,
  },
  {
    number: 2,
    title: "Số 2",
    icon: ThingImages[1].icon,
  },
  {
    number: 3,
    title: "Số 3",
    icon: ThingImages[2].icon,
  },
  {
    number: 4,
    title: "Số 4",
    icon: ThingImages[3].icon,
  },
  {
    number: 5,
    title: "Số 5",
    icon: ThingImages[4].icon,
  },
  {
    number: 6,
    title: "Số 6",
    icon: ThingImages[5].icon,
  },
  {
    number: 7,
    title: "Số 7",
    icon: ThingImages[6].icon,
  },
  {
    number: 8,
    title: "Số 8",
    icon: ThingImages[7].icon,
  },
  {
    number: 9,
    title: "Số 9",
    icon: ThingImages[8].icon,
  },
];
interface LearnLessonProps {
  range: [number, number]; // e.g. [1, 3]
  onComplete: () => void;
}

export function LearnLesson({ range, onComplete }: LearnLessonProps) {
  const [start, end] = range;
  const [currentNumber, setCurrentNumber] = useState(start);
  const [viewedNumbers, setViewedNumbers] = useState<number[]>([start]);

  const handleNext = () => {
    if (currentNumber < end) {
      const next = currentNumber + 1;
      setCurrentNumber(next);
      if (!viewedNumbers.includes(next)) {
        setViewedNumbers([...viewedNumbers, next]);
      }
    } else {
      // Completed
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentNumber > start) {
      setCurrentNumber(currentNumber - 1);
    }
  };

  const swipeRef = useSwipe({ onSwipeLeft: handleNext, onSwipeRight: handlePrev });

  const isLast = currentNumber === end;

  return (
    <div ref={swipeRef} className="flex flex-col items-center gap-6 md:gap-8 w-full max-w-4xl">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-4 md:gap-16 w-full">
        {/* Number Display */}
        <NumberCard number={currentNumber} active={true} image={MAP_NUMBERS[currentNumber - 1].icon} />
      </div>

      {/* <div className="text-2xl text-orange-600 font-bold bg-white/80 px-6 py-2 rounded-full backdrop-blur-sm">
        Số {currentNumber}
      </div> */}

      {/* Controls */}
      <div className="flex items-center gap-6 mt-4">
        <BackLessonButton onClick={handlePrev} disabled={currentNumber === start} />
        <NextLessonButton onClick={handleNext} isLast={isLast} />
      </div>
    </div>
  );
}
