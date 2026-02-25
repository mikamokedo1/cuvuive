import SpeakPraticeLayout from "@/components/games/SpeakPraticeLayout";
import { EntityData } from "@/types/game";

interface AnimalSpeakingLessonProps {
  animals: EntityData[];
  onComplete: () => void;
  requiredWins?: number;
}

export function AnimalSpeakingLesson({ animals, onComplete, requiredWins = 6 }: AnimalSpeakingLessonProps) {
  return <SpeakPraticeLayout entities={animals} onComplete={onComplete} requiredWins={requiredWins} />;
}
