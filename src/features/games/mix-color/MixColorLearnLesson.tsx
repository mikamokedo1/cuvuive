"use client";

import { useState, useEffect } from "react";
import { MixingRule } from "./constants";
import { BackLessonButton } from "@/components/games/BackLessonButton";
import { NextLessonButton } from "@/components/games/NextLessonButton";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import LoudSpeaker from "@/assets/games/loud-speaker.webp";
import Image from "next/image";

interface MixColorLearnLessonProps {
  rules: MixingRule[];
  onComplete: () => void;
}

export function MixColorLearnLesson({ rules, onComplete }: MixColorLearnLessonProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { speak } = useTextToSpeech();

  const handleNext = () => {
    if (currentIndex < rules.length - 1) {
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

  const isLast = currentIndex === rules.length - 1;
  const currentRule = rules[currentIndex];

  useEffect(() => {
    speak(`Màu ${currentRule.color1.name} pha với màu ${currentRule.color2.name} thành màu ${currentRule.result.name}`);
  }, [currentIndex]);

  return (
    <div className="flex flex-col items-center gap-6 md:gap-12 w-full max-w-4xl px-4">
      {/* Visual Display */}
      <div
        className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 w-full min-h-[300px] cursor-pointer"
        onClick={() =>
          speak(
            `Màu ${currentRule.color1.name} pha với màu ${currentRule.color2.name} thành màu ${currentRule.result.name}`,
          )
        }
      >
        {/* Color 1 */}
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full shadow-lg border-4 border-white transform transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: currentRule.color1.hex }}
          >
            <div className="absolute top-4 right-6 w-6 h-6 bg-white/30 rounded-full blur-sm" />
          </div>
        </div>

        {/* Plus Sign */}
        <div className="text-5xl md:text-6xl font-black text-blue-600 opacity-60">+</div>

        {/* Color 2 */}
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full shadow-lg border-4 border-white transform transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: currentRule.color2.hex }}
          >
            <div className="absolute top-4 right-6 w-6 h-6 bg-white/30 rounded-full blur-sm" />
          </div>
        </div>

        {/* Equals Sign */}
        <div className="text-5xl md:text-6xl font-black text-blue-600 opacity-60">=</div>

        {/* Result Color */}
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-40 h-40 sm:w-48 sm:h-48 rounded-full shadow-2xl border-4 border-white transform transition-all duration-500 scale-110 animate-pulse-gentle"
            style={{ backgroundColor: currentRule.result.hex }}
          >
            <div className="absolute top-5 right-8 w-8 h-8 bg-white/40 rounded-full blur-sm" />
          </div>
        </div>
      </div>
      {/* Controls */}
      <div className="flex items-center gap-6 mt-4">
        <BackLessonButton onClick={handlePrev} disabled={currentIndex === 0} />
        <NextLessonButton onClick={handleNext} isLast={isLast} />
      </div>
    </div>
  );
}
