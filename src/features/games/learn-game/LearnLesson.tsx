"use client";

import { useState } from "react";
import { ActionButton } from "@/components/common/ActionButton";
import { ChevronRight, Check } from "lucide-react";
import { NumberCard } from "@/features/games/learn-game/NumberCard";
import Sound1 from "@/assets/games/learn-numbers/sound/number-1.mp3";
import Sound2 from "@/assets/games/learn-numbers/sound/number-2.mp3";
import Sound3 from "@/assets/games/learn-numbers/sound/number-3.mp3";
import Sound4 from "@/assets/games/learn-numbers/sound/number-4.mp3";
import Sound5 from "@/assets/games/learn-numbers/sound/number-5.mp3";
import Sound6 from "@/assets/games/learn-numbers/sound/number-6.mp3";
import Sound7 from "@/assets/games/learn-numbers/sound/number-7.mp3";
import Sound8 from "@/assets/games/learn-numbers/sound/number-8.mp3";
import Sound9 from "@/assets/games/learn-numbers/sound/number-9.mp3";
import { ThingImages } from "@/libs/constants/thingImages";
import { BackLessonButton } from "@/components/games/BackLessonButton";
import { NextLessonButton } from "@/components/games/NextLessonButton";

export const SoundNumbers = [Sound1, Sound2, Sound3, Sound4, Sound5, Sound6, Sound7, Sound8, Sound9];

const MAP_NUMBERS = [
  {
    number: 1,
    title: "Số 1",
    icon: ThingImages[0].icon,
    sound: SoundNumbers[0],
  },
  {
    number: 2,
    title: "Số 2",
    icon: ThingImages[1].icon,
    sound: SoundNumbers[1],
  },
  {
    number: 3,
    title: "Số 3",
    icon: ThingImages[2].icon,
    sound: SoundNumbers[2],
  },
  {
    number: 4,
    title: "Số 4",
    icon: ThingImages[3].icon,
    sound: SoundNumbers[3],
  },
  {
    number: 5,
    title: "Số 5",
    icon: ThingImages[4].icon,
    sound: SoundNumbers[4],
  },
  {
    number: 6,
    title: "Số 6",
    icon: ThingImages[5].icon,
    sound: SoundNumbers[5],
  },
  {
    number: 7,
    title: "Số 7",
    icon: ThingImages[6].icon,
    sound: SoundNumbers[6],
  },
  {
    number: 8,
    title: "Số 8",
    icon: ThingImages[7].icon,
    sound: SoundNumbers[7],
  },
  {
    number: 9,
    title: "Số 9",
    icon: ThingImages[8].icon,
    sound: SoundNumbers[8],
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

  const isLast = currentNumber === end;

  return (
    <div className="flex flex-col items-center gap-6 md:gap-8 w-full max-w-4xl">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-4 md:gap-16 w-full">
        {/* Number Display */}
        <NumberCard
          number={currentNumber}
          active={true}
          soundNum={MAP_NUMBERS[currentNumber - 1].sound}
          image={MAP_NUMBERS[currentNumber - 1].icon}
        />
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
