import { PuzzleLesson } from "@/components/games/PuzzleLesson";
import { EntityData } from "@/types/game";

interface LandmarkPuzzleLessonProps {
  landmarks: EntityData[];
  onComplete: () => void;
}

export function LandmarkPuzzleLesson({ landmarks, onComplete }: LandmarkPuzzleLessonProps) {
  return <PuzzleLesson dataItems={landmarks} onComplete={onComplete} titleItem="địa danh" />;
}
