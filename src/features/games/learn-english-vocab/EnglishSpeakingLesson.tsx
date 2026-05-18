"use client";

import { useMemo } from "react";
import { EnglishWord } from "./constants";
import SpeakPraticeLayout from "@/components/games/SpeakPraticeLayout";
import { EntityData } from "@/types/game";

interface EnglishSpeakingLessonProps {
  words: EnglishWord[];
  onComplete: () => void;
}

export function EnglishSpeakingLesson({ words, onComplete }: EnglishSpeakingLessonProps) {
  const entities: EntityData[] = useMemo(() => {
    return words.map((word) => ({
      id: word.id,
      name: word.english,
      image: word.image,
      category: word.category,
      acceptedAnswers: [word.english],
    }));
  }, [words]);

  return <SpeakPraticeLayout entities={entities} onComplete={onComplete} language="en-US" />;
}
