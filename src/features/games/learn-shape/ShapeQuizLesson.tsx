import { QuizzLesson } from "@/components/games/QuizLesson";
import { ShapeData } from "./constants";

interface ShapeQuizLessonProps {
  shapes: ShapeData[];
  onComplete: () => void;
  requiredWins?: number;
}

export function ShapeQuizLesson({ shapes, onComplete, requiredWins = 6 }: ShapeQuizLessonProps) {
  return <QuizzLesson items={shapes} onComplete={onComplete} requiredWins={requiredWins} />;
}
