"use client";

import { WordData } from "./constants";
import SpeakPraticeLayout from "@/components/games/SpeakPraticeLayout";

interface WordSpeakingLessonProps {
  words: WordData[];
  onComplete: () => void;
}

export function WordSpeakingLesson({ words, onComplete }: WordSpeakingLessonProps) {
  return <SpeakPraticeLayout entities={words} onComplete={onComplete} />;
}
