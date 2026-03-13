import { ExploreLesson } from "@/components/games/ExploreLesson";
import { EntityData } from "@/types/game";

interface FruitLearnLessonProps {
  fruits: EntityData[];
  descriptions: Record<string, string>;
  onComplete: () => void;
}

export function FruitLearnLesson({ fruits, descriptions, onComplete }: FruitLearnLessonProps) {
  return (
    <ExploreLesson terrains={fruits} descriptions={descriptions} onComplete={onComplete} additionText="trái cây" />
  );
}
