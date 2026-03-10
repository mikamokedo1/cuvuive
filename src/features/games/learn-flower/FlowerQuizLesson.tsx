import { EntityData } from "@/types/game";
import { QuizzLesson } from "@/components/games/QuizLesson";

interface FlowerQuizLessonProps {
  flowers: EntityData[];
  onComplete: () => void;
  requiredWins?: number;
}

export function FlowerQuizLesson({ flowers, onComplete, requiredWins = 6 }: FlowerQuizLessonProps) {
  return <QuizzLesson items={flowers} onComplete={onComplete} requiredWins={requiredWins} />;
}
