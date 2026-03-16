import { ExploreLesson } from "@/components/games/ExploreLesson";
import { EntityData } from "@/types/game";

interface WeatherLearnLessonProps {
  items: EntityData[];
  descriptions: Record<string, string>;
  onComplete: () => void;
}

export function WeatherLearnLesson({ items, descriptions, onComplete }: WeatherLearnLessonProps) {
  return (
    <ExploreLesson terrains={items} descriptions={descriptions} onComplete={onComplete} additionText="thời tiết" />
  );
}
