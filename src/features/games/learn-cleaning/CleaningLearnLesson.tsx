import { ExploreLesson } from "@/components/games/ExploreLesson";
import { EntityData } from "@/types/game";

interface CleaningLearnLessonProps {
  items: EntityData[];
  descriptions: Record<string, string>;
  onComplete: () => void;
}

export function CleaningLearnLesson({ items, descriptions, onComplete }: CleaningLearnLessonProps) {
  return (
    <ExploreLesson terrains={items} descriptions={descriptions} onComplete={onComplete} additionText="thói quen" />
  );
}
