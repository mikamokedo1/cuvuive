"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { EnglishWord, speakEnglish } from "./constants";
import { Volume2, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

interface EnglishFlashcardLessonProps {
  words: EnglishWord[];
  onComplete: () => void;
}

export function EnglishFlashcardLesson({ words, onComplete }: EnglishFlashcardLessonProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);

  const currentWord = words[currentIndex];

  const handleFlip = useCallback(() => {
    if (!isFlipped) {
      setIsFlipped(true);
      speakEnglish(currentWord.english);
    }
  }, [isFlipped, currentWord.english]);

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

  const handleSpeak = useCallback(() => {
    speakEnglish(currentWord.english);
  }, [currentWord.english]);

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
        onClick={handleFlip}
        className={`
          relative w-72 h-80 sm:w-80 sm:h-96 cursor-pointer perspective-1000
          transition-transform duration-700 transform-style-3d
          ${isFlipped ? "[transform:rotateY(180deg)]" : ""}
        `}
      >
        {/* Front - Image + Vietnamese */}
        <div className="absolute inset-0 backface-hidden bg-white rounded-3xl shadow-2xl border-4 border-blue-200 flex flex-col items-center justify-center gap-4 p-6">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48">
            <Image
              src={currentWord.image}
              alt={currentWord.vietnamese}
              fill
              className="object-contain drop-shadow-lg"
              sizes="(max-width: 640px) 160px, 192px"
            />
          </div>
          <p className="text-xl font-bold text-gray-700">{currentWord.vietnamese}</p>
          <p className="text-sm text-gray-400 animate-pulse">👆 Chạm để lật</p>
        </div>

        {/* Back - English word */}
        <div className="absolute inset-0 backface-hidden [transform:rotateY(180deg)] bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl flex flex-col items-center justify-center gap-4 p-6">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40">
            <Image
              src={currentWord.image}
              alt={currentWord.english}
              fill
              className="object-contain drop-shadow-lg"
              sizes="(max-width: 640px) 128px, 160px"
            />
          </div>
          <p className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-md">
            {currentWord.english}
          </p>
          <p className="text-lg text-white/80">{currentWord.vietnamese}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSpeak();
            }}
            className="mt-2 flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-all"
          >
            <Volume2 className="w-5 h-5" />
            <span className="text-sm font-medium">Nghe lại</span>
          </button>
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
