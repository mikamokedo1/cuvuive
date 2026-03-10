import { EntityData } from "@/types/game";
import { MemoryLesson } from "@/components/games/MemoryLesson";

interface FoodMemoryLessonProps {
  foods: EntityData[];
  onComplete: () => void;
  pairsCount?: number;
}

export function FoodMemoryLesson({ foods, onComplete, pairsCount = 6 }: FoodMemoryLessonProps) {
  return <MemoryLesson items={foods} pairsCount={pairsCount} onComplete={onComplete} additionText="đồ ăn" />;
}
