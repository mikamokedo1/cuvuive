import { EntityData } from "@/types/game";
import { QuizzLesson } from "@/components/games/QuizLesson";

interface VehicleQuizLessonProps {
  vehicles: EntityData[];
  onComplete: () => void;
  requiredWins?: number;
}

export function VehicleQuizLesson({ vehicles, onComplete, requiredWins = 6 }: VehicleQuizLessonProps) {
  return <QuizzLesson items={vehicles} onComplete={onComplete} requiredWins={requiredWins} />;
}
