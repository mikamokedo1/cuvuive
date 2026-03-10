import { EntityData } from "@/types/game";
import { QuizzLesson } from "@/components/games/QuizLesson";

interface WeatherQuizLessonProps {
  items: EntityData[];
  onComplete: () => void;
  requiredWins?: number;
}

export function WeatherQuizLesson({ items, onComplete, requiredWins = 6 }: WeatherQuizLessonProps) {
  return <QuizzLesson items={items} onComplete={onComplete} requiredWins={requiredWins} />;
}
