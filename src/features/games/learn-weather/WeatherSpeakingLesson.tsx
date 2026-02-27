import SpeakPraticeLayout from "@/components/games/SpeakPraticeLayout";
import { EntityData } from "@/types/game";

interface WeatherSpeakingLessonProps {
  items: EntityData[];
  onComplete: () => void;
}

export function WeatherSpeakingLesson({ items, onComplete }: WeatherSpeakingLessonProps) {
  return <SpeakPraticeLayout entities={items} onComplete={onComplete} />;
}
