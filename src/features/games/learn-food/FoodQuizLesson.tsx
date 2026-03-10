import { EntityData } from "@/types/game";
import { QuizzLesson } from "@/components/games/QuizLesson";

interface FoodQuizLessonProps {
  foods: EntityData[];
  onComplete: () => void;
  requiredWins?: number;
}

export function FoodQuizLesson({ foods, onComplete, requiredWins = 6 }: FoodQuizLessonProps) {
  return <QuizzLesson items={foods} onComplete={onComplete} requiredWins={requiredWins} />;
}
