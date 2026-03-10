import { EntityData } from "@/types/game";
import { MemoryLesson } from "@/components/games/MemoryLesson";

interface DinosaurMemoryLessonProps {
  dinosaurs: EntityData[];
  onComplete: () => void;
  pairsCount?: number;
}

export function DinosaurMemoryLesson({ dinosaurs, onComplete, pairsCount = 6 }: DinosaurMemoryLessonProps) {
  return <MemoryLesson items={dinosaurs} pairsCount={pairsCount} onComplete={onComplete} additionText="khủng long" />;
}
