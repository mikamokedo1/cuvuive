"use client";

import { useState } from "react";
import SpeakPraticeLayout from "@/components/games/SpeakPraticeLayout";
import { AlphabetWord } from "./constants";
import { useSwipe } from "@/hooks/useSwipe";

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

interface AlphabetSpeakingLessonProps {
  words: AlphabetWord[];
  onComplete: () => void;
  isReviewMode?: boolean;
}

export function AlphabetSpeakingLesson({ words, onComplete, isReviewMode = false }: AlphabetSpeakingLessonProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Map words to include accepted answers for better speech recognition
  const entities = words.map((w) => ({
    id: w.id,
    name: w.letter,
    image: w.image,
    textRepresent: w.letter,
    // Use rich acceptedAnswers from constants (includes phonetic variants like "ay", "bee", "see")
    // Fall back to just the letter if no acceptedAnswers defined
    acceptedAnswers: w.acceptedAnswers?.length
      ? w.acceptedAnswers
      : [w.letter.toLowerCase(), w.letter],
  }));

  const handleNext = () => {
    if (selectedIndex < words.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const swipeRef = useSwipe({ onSwipeLeft: handleNext, onSwipeRight: handlePrev });

  return (
    <div ref={swipeRef} className="flex flex-col items-center gap-6 w-full max-w-4xl px-4">
      <SpeakPraticeLayout
        entities={entities}
        currentIndex={selectedIndex}
        onIndexChange={setSelectedIndex}
        onComplete={isReviewMode ? () => {} : onComplete}
        language="en-US"
      />

      {/* Letter selector - shown when revisiting a completed lesson */}
      {isReviewMode && <EnglishLetterSelector words={words} currentIndex={selectedIndex} onSelect={setSelectedIndex} />}
    </div>
  );
}
