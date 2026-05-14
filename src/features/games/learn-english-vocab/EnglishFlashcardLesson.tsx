"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { EnglishWord } from "./constants";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

interface EnglishFlashcardLessonProps {
  words: EnglishWord[];
  onComplete: () => void;
}

export function EnglishFlashcardLesson({ words, onComplete }: EnglishFlashcardLessonProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const { speak: speakEn } = useTextToSpeech("en-US");

  const currentWord = words[currentIndex];

  const handleFlip = useCallback(() => {
    if (!isFlipped) {
      setIsFlipped(true);
    }
    speakEn(currentWord.english);
  }, [isFlipped, currentWord.english, speakEn]);

  const handleNext = useCallback(() => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
      setCompletedCount((prev) => prev + 1);
    } else {
      onComplete();
    }
  }, [currentIndex, words.length, onComplete]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  }, [currentIndex]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4">
      {/* Progress */}
      <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
        <span>{currentIndex + 1}</span>
        <span>/</span>
        <span>{words.length}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-xs h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500"
          style={{ width: `${((completedCount) / words.length) * 100}%` }}
        />
      </div>

      {/* Flashcard */}
      <div
        key={currentIndex}
        onClick={handleFlip}
        className="relative w-[90vw] max-w-[340px] h-[220px] sm:max-w-none sm:w-[520px] sm:h-[300px] cursor-pointer group [perspective:1000px]"
      >
        <div 
          className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* Front - Image + Vietnamese */}
          <div
            className={`absolute inset-0 bg-white rounded-3xl shadow-2xl border-4 border-blue-200 flex flex-row items-center justify-center gap-4 sm:gap-8 p-6 [backface-visibility:hidden]`}
          >
            <div className="relative w-28 h-28 sm:w-48 sm:h-48 shrink-0">
              <Image
                src={currentWord.image}
                alt={currentWord.vietnamese}
                fill
                className="object-contain drop-shadow-lg p-2"
                sizes="(max-width: 640px) 112px, 192px"
              />
            </div>
            <div className="text-left flex flex-col justify-center items-center">
              <p className="text-2xl sm:text-4xl font-bold text-gray-700 text-center mb-4">{currentWord.vietnamese}</p>
              <p className="text-sm text-gray-400 animate-pulse mt-2">👆 Chạm để học</p>
            </div>
          </div>

          {/* Back - Image + English */}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl flex flex-row items-center justify-center gap-4 sm:gap-8 p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]`}
          >
            <div className="relative w-28 h-28 sm:w-48 sm:h-48 bg-white/20 rounded-2xl p-2 shrink-0">
              <Image
                src={currentWord.image}
                alt={currentWord.english}
                fill
                className="object-contain drop-shadow-lg p-2"
                sizes="(max-width: 640px) 112px, 192px"
              />
            </div>
            <div className="text-left flex flex-col justify-center max-w-[150px] sm:max-w-[200px]">
              <p className="text-3xl sm:text-5xl font-extrabold text-white drop-shadow-md mb-1 sm:mb-2 break-words">
                {currentWord.english}
              </p>
              <p className="text-lg sm:text-2xl text-white/80 font-medium mb-3">{currentWord.vietnamese}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => {
            setIsFlipped(false);
          }}
          className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          className="p-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-all shadow-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
