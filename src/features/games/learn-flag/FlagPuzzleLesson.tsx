import { PuzzleLesson } from "@/components/games/PuzzleLesson";
import { EntityData } from "@/types/game";

interface FlagPuzzleLessonProps {
  flags: EntityData[];
  onComplete: () => void;
}

export function FlagPuzzleLesson({ flags, onComplete }: FlagPuzzleLessonProps) {
  return <PuzzleLesson dataItems={flags} onComplete={onComplete} titleItem="cờ" />;
}
