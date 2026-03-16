import SpeakPraticeLayout from "@/components/games/SpeakPraticeLayout";
import { EntityData } from "@/types/game";

interface BodySpeakingLessonProps {
  items: EntityData[];
  onComplete: () => void;
}

export function BodySpeakingLesson({ items, onComplete }: BodySpeakingLessonProps) {
  return <SpeakPraticeLayout entities={items} onComplete={onComplete} />;
}
