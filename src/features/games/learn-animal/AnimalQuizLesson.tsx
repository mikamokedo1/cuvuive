import { EntityData } from "@/types/game";
import { QuizzLesson } from "@/components/games/QuizLesson";

interface AnimalQuizLessonProps {
  animals: EntityData[];
  onComplete: () => void;
  requiredWins?: number;
}

export function AnimalQuizLesson({ animals, onComplete, requiredWins = 6 }: AnimalQuizLessonProps) {
  return <QuizzLesson items={animals} onComplete={onComplete} requiredWins={requiredWins} />;
}
