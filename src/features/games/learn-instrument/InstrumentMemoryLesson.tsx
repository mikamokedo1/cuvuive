import { EntityData } from "@/types/game";
import { MemoryLesson } from "@/components/games/MemoryLesson";

interface InstrumentMemoryLessonProps {
  instruments: EntityData[];
  onComplete: () => void;
  pairsCount?: number;
}

export function InstrumentMemoryLesson({ instruments, onComplete, pairsCount = 6 }: InstrumentMemoryLessonProps) {
  return <MemoryLesson items={instruments} pairsCount={pairsCount} onComplete={onComplete} additionText="nhạc cụ" />;
}
