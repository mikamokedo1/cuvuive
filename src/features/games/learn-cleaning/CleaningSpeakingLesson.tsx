import SpeakPraticeLayout from "@/components/games/SpeakPraticeLayout";
import { EntityData } from "@/types/game";

interface CleaningSpeakingLessonProps {
  items: EntityData[];
  onComplete: () => void;
}

export function CleaningSpeakingLesson({ items, onComplete }: CleaningSpeakingLessonProps) {
  return <SpeakPraticeLayout entities={items} onComplete={onComplete} />;
}
