import { EntityData } from "@/types/game";
import { QuizzLesson } from "@/components/games/QuizLesson";

interface FlagQuizLessonProps {
  flags: EntityData[];
  onComplete: () => void;
  requiredWins?: number;
}

export function FlagQuizLesson({ flags, onComplete, requiredWins = 6 }: FlagQuizLessonProps) {
  return <QuizzLesson additionText="cờ" items={flags} onComplete={onComplete} requiredWins={requiredWins} />;
}
