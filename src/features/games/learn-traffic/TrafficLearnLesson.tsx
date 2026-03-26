import { ExploreLesson } from "@/components/games/ExploreLesson";
import { EntityData } from "@/types/game";

interface TrafficLearnLessonProps {
  items: EntityData[];
  descriptions: Record<string, string>;
  onComplete: () => void;
}

export function TrafficLearnLesson({ items, descriptions, onComplete }: TrafficLearnLessonProps) {
  return <ExploreLesson terrains={items} descriptions={descriptions} onComplete={onComplete} additionText="qui tắc" />;
}
