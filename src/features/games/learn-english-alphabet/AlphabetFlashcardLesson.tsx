"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AlphabetWord } from "./constants";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { BackLessonButton } from "@/components/games/BackLessonButton";
import { NextLessonButton } from "@/components/games/NextLessonButton";
import { useSwipe } from "@/hooks/useSwipe";

// EnglishAlphabetCard component
function EnglishAlphabetCard({
  word,
  active = false,
  showName = true,
  onClick,
}: {
  word: AlphabetWord;
  active?: boolean;
  showName?: boolean;
  onClick?: () => void;
}) {
  const { speak } = useTextToSpeech("en-US");
  const { speak: speakVi } = useTextToSpeech("vi-VN");

  useEffect(() => {
    if (active && showName) {
      const timeout = setTimeout(() => {
        const pronunciation = word.acceptedAnswers?.[1] || word.letter;
        speak(`${pronunciation}, ${word.word}`);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [active, word.letter, word.word, showName, speak]);

  const handleClick = () => {
    const pronunciation = word.acceptedAnswers?.[1] || word.letter;
    speak(`${pronunciation}`);
    onClick?.();
  };

  return (
    <div
      className={`
        relative flex flex-col items-center gap-4 p-6 rounded-3xl cursor-pointer
        transition-all duration-300 transform
        ${active ? "scale-100 opacity-100" : "scale-90 opacity-60"}
      `}
    >
      {/* Large Letter Display */}
      <div
        className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 drop-shadow-lg select-none leading-none flex items-baseline gap-2"
        onClick={handleClick}
      >
        <span>{word.letter}</span>
        <span className="text-6xl md:text-7xl">{word.letter.toLowerCase()}</span>
      </div>

      {/* Representative image */}
      <div className="relative w-40 h-40 md:w-48 md:h-48" onClick={() => speak(`${word.word}`)}>
        <Image
          src={word.image}
          alt={word.word}
          fill
          className="object-contain drop-shadow-lg"
          sizes="(max-width: 768px) 160px, 192px"
        />
      </div>

      {/* Word below */}
      <div className="text-center mt-2" onClick={() => speak(`${word.word}`)}>
        <p className="text-3xl md:text-4xl font-extrabold text-[#38BDF8] drop-shadow-sm mb-1">{word.word}</p>
        <p
          className="text-xl md:text-2xl text-gray-500 font-medium"
          onClick={(e) => {
            e.stopPropagation();
            speakVi(word.vietnamese);
          }}
        >
          {word.vietnamese}
        </p>
      </div>
    </div>
  );
}

// EnglishLetterSelector component
function EnglishLetterSelector({
  words,
  currentIndex,
  onSelect,
}: {
  words: AlphabetWord[];
  currentIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="w-full max-w-lg px-2">
      <div className="flex flex-wrap justify-center gap-2">
        {words.map((word, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={word.id}
              onClick={() => onSelect(index)}
              className={`
                relative w-12 h-12 rounded-xl font-bold text-lg cursor-pointer
                transition-all duration-200 transform active:scale-95
                ${
                  isActive
                    ? "bg-gradient-to-br from-orange-400 to-pink-500 text-white scale-110 shadow-lg shadow-orange-200"
                    : "bg-white border-2 border-gray-200 text-gray-700 hover:border-orange-300 hover:scale-105"
                }
              `}
            >
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <span className="text-base leading-none">{word.letter}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface AlphabetFlashcardLessonProps {
  words: AlphabetWord[];
  onComplete: () => void;
  isReviewMode?: boolean;
}

export function AlphabetFlashcardLesson({ words, onComplete, isReviewMode = false }: AlphabetFlashcardLessonProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
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

  const isLast = currentIndex === words.length - 1;
  const currentWord = words[currentIndex];

  if (!currentWord) return null;

  return (
    <div ref={swipeRef} className="flex flex-col items-center gap-6 md:gap-8 w-full max-w-4xl px-4">
      {/* Word Display */}
      <div className="flex items-center justify-center w-full min-h-[300px]">
        <EnglishAlphabetCard word={currentWord} active={true} showName={true} />
      </div>
      {/* Controls */}
      <div className="flex items-center gap-6 mt-4">
        <BackLessonButton onClick={handlePrev} disabled={currentIndex === 0} />
        <NextLessonButton onClick={handleNext} isLast={isLast} />
      </div>

      {/* Letter selector - shown when revisiting a completed lesson */}
      {isReviewMode && <EnglishLetterSelector words={words} currentIndex={currentIndex} onSelect={setCurrentIndex} />}
    </div>
  );
}
