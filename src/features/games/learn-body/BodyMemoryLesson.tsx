import { EntityData } from "@/types/game";
import { MemoryLesson } from "@/components/games/MemoryLesson";

interface BodyMemoryLessonProps {
  items: EntityData[];
  onComplete: () => void;
  pairsCount?: number;
}

export function BodyMemoryLesson({ items, onComplete, pairsCount = 6 }: BodyMemoryLessonProps) {
  return <MemoryLesson items={items} pairsCount={pairsCount} onComplete={onComplete} additionText="bộ phận cơ thể" />;
}
