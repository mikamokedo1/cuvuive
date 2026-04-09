"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ThingImages } from "@/libs/constants/thingImages";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { BackLessonButton } from "@/components/games/BackLessonButton";
import { NextLessonButton } from "@/components/games/NextLessonButton";
import { playSound } from "@/libs/utils/playSound";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useSwipe } from "@/hooks/useSwipe";

interface ExplainLessonProps {
  comparisonType: "greater" | "less" | "equal";
  onComplete: () => void;
}

const CONCEPTS = {
  greater: {
    symbol: ">",
    title: "Lớn hơn",
    description: "Số bên trái LỚN HƠN số bên phải",
    examples: [
      {
        left: 5,
        right: 2,
        textSpeakLeft: "Có 5 quả táo",
        textSpeakRight: "Có 2 quả táo",
        sound: "5 quả táo lớn hơn 2 quả táo",
      },
      {
        left: 4,
        right: 1,
        textSpeakLeft: "Có 4 quả bóng",
        textSpeakRight: "Có 1 quả bóng",
        sound: "4 quả bóng lớn hơn 1 quả bóng",
      },
      {
        left: 3,
        right: 2,
        textSpeakLeft: "Có 3 con gấu",
        textSpeakRight: "Có 2 con gấu",
        sound: "3 con gấu lớn hơn 2 con gấu",
      },
    ],
    color: "text-red-500",
  },
  less: {
    symbol: "<",
    title: "Nhỏ hơn",
    description: "Số bên trái NHỎ HƠN số bên phải",
    examples: [
      {
        left: 2,
        right: 5,
        textSpeakLeft: "Có 2 quả táo",
        textSpeakRight: "Có 5 quả táo",
        sound: "2 quả táo nhỏ hơn 5 quả táo",
      },
      {
        left: 1,
        right: 4,
        textSpeakLeft: "Có 1 quả bóng",
        textSpeakRight: "Có 4 quả bóng",
        sound: "1 quả bóng nhỏ hơn 4 quả bóng",
      },
      {
        left: 2,
        right: 3,
        textSpeakLeft: "Có 2 con gấu",
        textSpeakRight: "Có 3 con gấu",
        sound: "2 con gấu nhỏ hơn 3 con gấu",
      },
    ],
    color: "text-blue-500",
  },
  equal: {
    symbol: "=",
    title: "Bằng nhau",
    description: "Hai bên BẰNG NHAU",
    examples: [
      {
        left: 3,
        right: 3,
        textSpeakLeft: "Có 3 quả táo",
        textSpeakRight: "Có 3 quả táo",
        sound: "3 quả táo bằng 3 quả táo",
      },
      {
        left: 4,
        right: 4,
        textSpeakLeft: "Có 4 quả bóng",
        textSpeakRight: "Có 4 quả bóng",
        sound: "4 quả bóng bằng 4 quả bóng",
      },
      {
        left: 2,
        right: 2,
        textSpeakLeft: "Có 2 con gấu",
        textSpeakRight: "Có 2 con gấu",
        sound: "2 con gấu bằng 2 con gấu",
      },
    ],
    color: "text-green-500",
  },
};

export function ExplainLesson({ comparisonType, onComplete }: ExplainLessonProps) {
  const { speak } = useTextToSpeech();
  const [currentIndex, setCurrentIndex] = useState(0);
  const concept = CONCEPTS[comparisonType];
  const example = concept.examples[currentIndex];
  const isLast = currentIndex === concept.examples.length - 1;

  const handleNext = () => {
    if (isLast) {
      playWinEffect(500);
      setTimeout(onComplete, 1000);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const swipeRef = useSwipe({ onSwipeLeft: handleNext, onSwipeRight: handlePrev });

  // Use different icons for left vs right
  const IconIndex = currentIndex % ThingImages.length;

  useEffect(() => {
    speak(example.sound);
  }, [currentIndex]);

  return (
    <div ref={swipeRef} className="flex flex-col items-center gap-6 w-full max-w-4xl">
      <div className="bg-white/90 rounded-3xl p-4 md:p-8 shadow-xl border-4 border-yellow-200 w-full overflow-hidden">
        <div className="flex items-center justify-center gap-2 md:gap-8">
          {/* Left Group */}
          <div
            className="flex flex-wrap justify-center gap-1 md:gap-2 w-28 md:w-48 min-h-[80px] md:min-h-[100px] cursor-pointer hover:scale-105"
            onClick={() => speak(concept.examples[currentIndex].textSpeakLeft)}
          >
            {Array.from({ length: example.left }).map((_, i) => (
              <div key={`left-${i}`} className="w-12 h-12 md:w-20 md:h-20 relative">
                <Image src={ThingImages[IconIndex].icon} alt="item" fill className="object-contain drop-shadow-md" />
              </div>
            ))}
          </div>

          <div
            className="flex items-center justify-center cursor-pointer hover:scale-105 shrink-0"
            onClick={() => speak(concept.examples[currentIndex].sound)}
          >
            <span className="text-8xl md:text-[12rem] leading-none font-display font-black text-orange-500 drop-shadow-md animate-scale">
              {concept.symbol}
            </span>
          </div>

          <div
            className="flex flex-wrap justify-center gap-1 md:gap-2 w-28 md:w-48 min-h-[80px] md:min-h-[100px] cursor-pointer hover:scale-105"
            onClick={() => speak(concept.examples[currentIndex].textSpeakRight)}
          >
            {Array.from({ length: example.right }).map((_, i) => (
              <div key={`right-${i}`} className="w-12 h-12 md:w-20 md:h-20 relative">
                <Image src={ThingImages[IconIndex].icon} alt="item" fill className="object-contain drop-shadow-md" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 mt-4">
        <BackLessonButton onClick={handlePrev} disabled={currentIndex === 0} />
        <NextLessonButton onClick={handleNext} isLast={isLast} />
      </div>
    </div>
  );
}
