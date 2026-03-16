import { ExploreLesson } from "@/components/games/ExploreLesson";
import { EntityData } from "@/types/game";

interface AnimalLearnLessonProps {
  animals: EntityData[];
  descriptions: Record<string, string>;
  onComplete: () => void;
}

export function AnimalLearnLesson({ animals, descriptions, onComplete }: AnimalLearnLessonProps) {
  return (
    <ExploreLesson terrains={animals} descriptions={descriptions} onComplete={onComplete} additionText="con vật" />
  );
}
