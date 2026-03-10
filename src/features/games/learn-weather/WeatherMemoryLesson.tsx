import { EntityData } from "@/types/game";
import { MemoryLesson } from "@/components/games/MemoryLesson";

interface WeatherMemoryLessonProps {
  items: EntityData[];
  onComplete: () => void;
  pairsCount?: number; // Number of unique items to use (default 6)
}

export function WeatherMemoryLesson({ items, onComplete, pairsCount = 6 }: WeatherMemoryLessonProps) {
  return <MemoryLesson items={items} pairsCount={pairsCount} onComplete={onComplete} additionText="thời tiết" />;
}
