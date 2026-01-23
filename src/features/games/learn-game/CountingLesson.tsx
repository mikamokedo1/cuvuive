"use client";

import { useState, useEffect } from "react";
import { ActionButton } from "@/components/common/ActionButton";
import { ThingImages } from "@/libs/contants/thingImages";
import { randomNum } from "@/libs/utils/randomNum";
import Image from "next/image";
import { playSound } from "@/libs/utils/playSound";
import { SoundNumbers } from "./LearnLesson";
import { playWinEffect } from "@/libs/utils/playWinEffect";

interface CountingLessonProps {
  range: [number, number];
  onComplete: () => void;
}

export function CountingLesson({ range, onComplete }: CountingLessonProps) {
  const [start, end] = range;
  const [targetNumber, setTargetNumber] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [iconType, setIconType] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const REQUIRED_WINS = 6;

  const generateQuestion = () => {
    let target = Math.floor(Math.random() * (end - start + 1)) + start;

    // Prevent regenerating the previous number
    if (end > start) {
      while (target === targetNumber) {
        target = Math.floor(Math.random() * (end - start + 1)) + start;
      }
    }

    // Options: target + 2 distractors from range
    const pool = Array.from({ length: end - start + 1 }).map((_, i) => start + i);
    const shuffledOpts = pool.sort(() => Math.random() - 0.5).slice(0, 3);

    setTargetNumber(target);
    setOptions(shuffledOpts);
    setIconType(randomNum(0, ThingImages.length - 1));
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleAnswer = (num: number) => {
    playSound(SoundNumbers[num - 1]);
    if (num === targetNumber) {
      playWinEffect(500);

      if (correctCount + 1 >= REQUIRED_WINS) {
        setTimeout(onComplete, 1500);
      } else {
        setCorrectCount((prev) => prev + 1);
        setTimeout(generateQuestion, 500);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full w-100">
      <div className="bg-white/80 rounded-3xl py-2 border-4 border-purple-200 shadow-xl flex  items-center flex-wrap justify-center w-100 min-h-50">
        {Array.from({ length: targetNumber }).map((_, i) => (
          <div key={i} className="w-30 h-30 relative hover:scale-105">
            <Image src={ThingImages[iconType]} alt="Number" fill className="object-contain" />
          </div>
        ))}
      </div>

      <div className="flex gap-6 flex-wrap justify-center">
        {options.map((opt) => (
          <ActionButton
            key={opt}
            variant="glossy"
            color="purple"
            size="auto"
            className="w-24 h-24 md:w-32 md:h-32 rounded-3xl"
            onClick={() => handleAnswer(opt)}
            clickPlaySound={false}
          >
            <span className="text-5xl md:text-6xl font-display text-white drop-shadow-md">{opt}</span>
          </ActionButton>
        ))}
      </div>
    </div>
  );
}
