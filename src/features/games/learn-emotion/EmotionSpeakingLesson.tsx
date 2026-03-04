"use client";

import SpeakPraticeLayout from "@/components/games/SpeakPraticeLayout";
import { EntityData } from "@/types/game";

interface EmotionSpeakingLessonProps {
  items: EntityData[];
  onComplete: () => void;
}

export function EmotionSpeakingLesson({ items, onComplete }: EmotionSpeakingLessonProps) {
  return <SpeakPraticeLayout entities={items} onComplete={onComplete} />;
}
