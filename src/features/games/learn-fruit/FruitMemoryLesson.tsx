"use client";

import { EntityData } from "@/types/game";
import { MemoryLesson } from "@/components/games/MemoryLesson";

interface FruitMemoryLessonProps {
  fruits: EntityData[];
  onComplete: () => void;
  pairsCount?: number;
}

export function FruitMemoryLesson({ fruits, onComplete, pairsCount = 6 }: FruitMemoryLessonProps) {
  return <MemoryLesson items={fruits} pairsCount={pairsCount} onComplete={onComplete} additionText="trái cây" />;
}
