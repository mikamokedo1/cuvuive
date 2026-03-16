import { ExploreLesson } from "@/components/games/ExploreLesson";
import { EntityData } from "@/types/game";

interface HygieneLearnLessonProps {
  items: EntityData[];
  descriptions: Record<string, string>;
  onComplete: () => void;
}

export function HygieneLearnLesson({ items, descriptions, onComplete }: HygieneLearnLessonProps) {
  return (
    <ExploreLesson terrains={items} descriptions={descriptions} onComplete={onComplete} additionText="thói quen" />
  );
}
