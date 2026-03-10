import { EntityData } from "@/types/game";
import { QuizzLesson } from "@/components/games/QuizLesson";

interface DinosaurQuizLessonProps {
  dinosaurs: EntityData[];
  onComplete: () => void;
  requiredWins?: number;
}

export function DinosaurQuizLesson({ dinosaurs, onComplete, requiredWins = 6 }: DinosaurQuizLessonProps) {
  return <QuizzLesson items={dinosaurs} onComplete={onComplete} requiredWins={requiredWins} />;
}
