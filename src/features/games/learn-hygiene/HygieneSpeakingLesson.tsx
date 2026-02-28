import SpeakPraticeLayout from "@/components/games/SpeakPraticeLayout";
import { EntityData } from "@/types/game";

interface HygieneSpeakingLessonProps {
  items: EntityData[];
  onComplete: () => void;
}

export function HygieneSpeakingLesson({ items, onComplete }: HygieneSpeakingLessonProps) {
  return <SpeakPraticeLayout entities={items} onComplete={onComplete} />;
}
