import SpeakPraticeLayout from "@/components/games/SpeakPraticeLayout";
import { EntityData } from "@/types/game";

interface AnimalSpeakingLessonProps {
  animals: EntityData[];
  onComplete: () => void;
}

export function AnimalSpeakingLesson({ animals, onComplete }: AnimalSpeakingLessonProps) {
  return <SpeakPraticeLayout entities={animals} onComplete={onComplete} />;
}
