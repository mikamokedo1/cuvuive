"use client";

import { useState } from "react";
import SpeakPraticeLayout from "@/components/games/SpeakPraticeLayout";
import { LetterData } from "./constants";
import { LetterSelector } from "./LetterSelector";

interface AlphabetSpeakingLessonProps {
  letters: LetterData[];
  onComplete: () => void;
  isReviewMode?: boolean;
}

export function AlphabetSpeakingLesson({ letters, onComplete, isReviewMode = false }: AlphabetSpeakingLessonProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Map letters to include accepted answers for better speech recognition
  const entities = (isReviewMode ? [letters[selectedIndex]] : letters).map((l) => ({
    ...l,
    // Accept "chữ a", just the letter "a", or the representative word (e.g. "cà chua")
    acceptedAnswers: [l.name, l.letter, l.word],
  }));

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl">
      <SpeakPraticeLayout entities={entities} onComplete={onComplete} />

      {/* Letter selector - shown when revisiting a completed lesson */}
      {isReviewMode && <LetterSelector letters={letters} currentIndex={selectedIndex} onSelect={setSelectedIndex} />}
    </div>
  );
}
