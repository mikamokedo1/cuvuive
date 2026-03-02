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

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl">
      <SpeakPraticeLayout entities={isReviewMode ? [letters[selectedIndex]] : letters} onComplete={onComplete} />

      {/* Letter selector - shown when revisiting a completed lesson */}
      {isReviewMode && <LetterSelector letters={letters} currentIndex={selectedIndex} onSelect={setSelectedIndex} />}
    </div>
  );
}
