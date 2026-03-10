import { EntityData } from "@/types/game";
import { MemoryLesson } from "@/components/games/MemoryLesson";

interface FlowerMemoryLessonProps {
  flowers: EntityData[];
  onComplete: () => void;
  pairsCount?: number;
}

export function FlowerMemoryLesson({ flowers, onComplete, pairsCount = 6 }: FlowerMemoryLessonProps) {
  return <MemoryLesson items={flowers} pairsCount={pairsCount} onComplete={onComplete} additionText="hoa" />;
}
