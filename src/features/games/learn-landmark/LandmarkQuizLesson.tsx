import { EntityData } from "@/types/game";
import { QuizzLesson } from "@/components/games/QuizLesson";

interface LandmarkQuizLessonProps {
  landmarks: EntityData[];
  onComplete: () => void;
  requiredWins?: number;
}

export function LandmarkQuizLesson({ landmarks, onComplete, requiredWins = 6 }: LandmarkQuizLessonProps) {
  return <QuizzLesson items={landmarks} onComplete={onComplete} requiredWins={requiredWins} />;
}
