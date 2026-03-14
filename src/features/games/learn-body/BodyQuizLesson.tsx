import { EntityData } from "@/types/game";
import { QuizzLesson } from "@/components/games/QuizLesson";

interface BodyQuizLessonProps {
  items: EntityData[];
  onComplete: () => void;
  requiredWins?: number;
}

export function BodyQuizLesson({ items, onComplete, requiredWins = 6 }: BodyQuizLessonProps) {
  return <QuizzLesson items={items} onComplete={onComplete} requiredWins={requiredWins} />;
}
