"use client";

import { useState, useEffect } from "react";
import { ToneWord } from "./constants";
import { BackLessonButton } from "@/components/games/BackLessonButton";
import { NextLessonButton } from "@/components/games/NextLessonButton";
import { useSwipe } from "@/hooks/useSwipe";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import Image from "next/image";
import { playButtonSound } from "@/libs/utils/playSound";

interface ToneLearnLessonProps {
  words: ToneWord[];
  onComplete: () => void;
}

export function ToneLearnLesson({ words, onComplete }: ToneLearnLessonProps) {
  const { speak } = useTextToSpeech();
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalScreens = words.length > 0 ? words.length + 1 : 0;

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

  const toneNames: Record<string, string> = {
    ngang: "ngang",
    sac: "sắc",
    huyen: "huyền",
    hoi: "hỏi",
    nga: "ngã",
    nang: "nặng",
  };

  const toneMarks: Record<string, string> = {
    ngang: "",
    sac: "´",
    huyen: "`",
    hoi: "?",
    nga: "~",
    nang: ".",
  };

  const firstWord = words[0];
  const isToneScreen = currentIndex === 0;
  const currentWord = !isToneScreen ? words[currentIndex - 1] : undefined;

  // Auto speak on step change
  useEffect(() => {
    if (!firstWord) return;

    if (isToneScreen) {
      speak(`Dấu ${toneNames[firstWord.tone] || firstWord.tone}`);
    } else if (currentWord) {
      speak(`${currentWord.spelling}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, firstWord, currentWord]);

  const handleSpeak = () => {
    playButtonSound();
    if (isToneScreen && firstWord) {
      speak(`Dấu ${toneNames[firstWord.tone] || firstWord.tone}`);
    } else if (currentWord) {
      speak(currentWord.spelling || currentWord.name);
    }
  };

  const isLast = currentIndex === totalScreens - 1;

  if (!firstWord || totalScreens === 0) return null;

  return (
    <div ref={swipeRef} className="flex flex-col items-center gap-6 md:gap-8 w-full max-w-4xl px-4">
      {/* Target Display */}
      <div className="relative w-56 h-56 md:w-72 md:h-72 flex flex-col items-center justify-center p-6 bg-white rounded-3xl border-4 border-blue-400 shadow-xl gap-4">
        {isToneScreen ? (
          <div
            className="flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105"
            onClick={handleSpeak}
          >
            <div
              className="font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 leading-none"
              style={{ fontSize: "12rem" }}
            >
              {toneMarks[firstWord.tone]}
            </div>
          </div>
        ) : (
          <>
            <div
              className="relative w-28 h-28 md:w-40 md:h-40 transition-transform duration-300 hover:scale-105 cursor-pointer animate-scale"
              onClick={() => speak(currentWord?.name ?? "")}
            >
              <Image src={currentWord!.image} alt={currentWord!.name} fill className="object-contain" />
            </div>

            <div
              onClick={() => speak(currentWord?.spelling ?? "")}
              className=" animate-scale shrink-0 text-4xl md:text-5xl font-black leading-[70px] text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-center"
            >
              {currentWord!.name}
            </div>
          </>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 mt-4">
        <BackLessonButton onClick={handlePrev} disabled={currentIndex === 0} />
        <NextLessonButton onClick={handleNext} isLast={isLast} />
      </div>
    </div>
  );
}
