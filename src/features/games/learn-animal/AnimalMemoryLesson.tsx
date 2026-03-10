import { EntityData } from "@/types/game";
import { MemoryLesson } from "@/components/games/MemoryLesson";

interface AnimalMemoryLessonProps {
  animals: EntityData[];
  onComplete: () => void;
  pairsCount?: number; // Number of unique animals to use (default 6)
}

export function AnimalMemoryLesson({ animals, onComplete, pairsCount = 6 }: AnimalMemoryLessonProps) {
  return <MemoryLesson items={animals} pairsCount={pairsCount} onComplete={onComplete} additionText="động vật" />;
}
