import { EntityData } from "@/types/game";
import { QuizzLesson } from "@/components/games/QuizLesson";

interface OccupationQuizLessonProps {
  occupations: EntityData[];
  onComplete: () => void;
  requiredWins?: number;
}

export function OccupationQuizLesson({ occupations, onComplete, requiredWins = 6 }: OccupationQuizLessonProps) {
  return <QuizzLesson items={occupations} onComplete={onComplete} requiredWins={requiredWins} />;
}
