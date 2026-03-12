"use client";

import { SyllableData } from "./constants";
import SpeakPraticeLayout from "@/components/games/SpeakPraticeLayout";

interface SyllableSpeakLessonProps {
  syllables: SyllableData[];
  onComplete: () => void;
}

export function SyllableSpeakLesson({ syllables, onComplete }: SyllableSpeakLessonProps) {
  return (
    <SpeakPraticeLayout
      entities={syllables.map((s) => ({
        ...s,
        acceptedAnswers: [s.fullSpelling, s.syllable, s.name],
      }))}
      onComplete={onComplete}
    />
  );
}
