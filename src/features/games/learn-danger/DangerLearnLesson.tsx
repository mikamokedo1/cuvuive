import { ExploreLesson } from "@/components/games/ExploreLesson";
import { EntityData } from "@/types/game";

interface DangerLearnLessonProps {
  items: EntityData[];
  descriptions: Record<string, string>;
  onComplete: () => void;
}

export function DangerLearnLesson({ items, descriptions, onComplete }: DangerLearnLessonProps) {
  return (
    <ExploreLesson terrains={items} descriptions={descriptions} onComplete={onComplete} additionText="đồ vật" />
  );
}
