import { EntityData } from "@/types/game";
import { QuizzLesson } from "@/components/games/QuizLesson";

interface InstrumentQuizLessonProps {
  instruments: EntityData[];
  onComplete: () => void;
  requiredWins?: number;
}

export function InstrumentQuizLesson({ instruments, onComplete, requiredWins = 6 }: InstrumentQuizLessonProps) {
  return <QuizzLesson items={instruments} onComplete={onComplete} requiredWins={requiredWins} />;
}
