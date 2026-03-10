import { EntityData } from "@/types/game";
import { MemoryLesson } from "@/components/games/MemoryLesson";

interface LandmarkMemoryLessonProps {
  landmarks: EntityData[];
  onComplete: () => void;
  pairsCount?: number; // Number of unique landmarks to use (default 6)
}

export function LandmarkMemoryLesson({ landmarks, onComplete, pairsCount = 6 }: LandmarkMemoryLessonProps) {
  return <MemoryLesson items={landmarks} pairsCount={pairsCount} onComplete={onComplete} additionText="địa danh" />;
}
