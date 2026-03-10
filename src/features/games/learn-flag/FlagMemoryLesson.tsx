import { EntityData } from "@/types/game";
import { MemoryLesson } from "@/components/games/MemoryLesson";

interface FlagMemoryLessonProps {
  flags: EntityData[];
  onComplete: () => void;
  pairsCount?: number; // Number of unique flags to use (default 6)
}

export function FlagMemoryLesson({ flags, onComplete, pairsCount = 6 }: FlagMemoryLessonProps) {
  return <MemoryLesson items={flags} pairsCount={pairsCount} onComplete={onComplete} additionText="cờ" />;
}
