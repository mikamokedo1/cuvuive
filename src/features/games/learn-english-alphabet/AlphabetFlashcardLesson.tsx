"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { AlphabetWord } from "./constants";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { Volume2, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

interface AlphabetFlashcardLessonProps {
  words: AlphabetWord[];
  onComplete: () => void;
}

export function AlphabetFlashcardLesson({ words, onComplete }: AlphabetFlashcardLessonProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const { speak: speakEn } = useTextToSpeech("en-US");

  const currentWord = words[currentIndex];

  const handleFlip = useCallback(() => {
    if (!currentWord) return;
    if (!isFlipped) {
      setIsFlipped(true);
    }
    speakEn(currentWord.letter + ", " + currentWord.word);
  }, [isFlipped, currentWord, speakEn]);

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
    if (currentWord) speakEn(currentWord.letter + ", " + currentWord.word);
  }, [currentWord, speakEn]);

  if (!currentWord) return null;

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
        className="relative w-72 h-80 sm:w-80 sm:h-96 cursor-pointer group [perspective:1000px]"
      >
        <div 
          className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* Front - BIG LETTER */}
          <div
            className={`absolute inset-0 bg-white rounded-3xl shadow-2xl border-4 border-blue-200 flex flex-col items-center justify-center gap-4 p-6 [backface-visibility:hidden]`}
          >
            <div className="text-9xl font-black text-blue-600 drop-shadow-sm">
              {currentWord.letter}
            </div>
            <div className="text-4xl font-bold text-blue-400">
              {currentWord.letter.toLowerCase()}
            </div>
            <p className="text-sm text-gray-400 animate-pulse mt-4">👆 Chạm để học từ vựng</p>
          </div>

          {/* Back - Image + Word */}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl flex flex-col items-center justify-center gap-4 p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]`}
          >
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 bg-white/20 rounded-2xl p-4">
              <Image
                src={currentWord.image}
                alt={currentWord.word}
                fill
                className="object-contain drop-shadow-lg p-2"
                sizes="(max-width: 640px) 128px, 160px"
              />
            </div>
            <div className="text-center">
              <p className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-md">
                <span className="text-yellow-300">{currentWord.letter}</span>
                {currentWord.word.slice(1)}
              </p>
              <p className="text-xl text-white/80 font-medium">{currentWord.vietnamese}</p>
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
