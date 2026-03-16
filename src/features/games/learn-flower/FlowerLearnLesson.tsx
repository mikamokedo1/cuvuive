import { ExploreLesson } from "@/components/games/ExploreLesson";
import { EntityData } from "@/types/game";

interface FlowerLearnLessonProps {
  flowers: EntityData[];
  descriptions: Record<string, string>;
  onComplete: () => void;
}

export function FlowerLearnLesson({ flowers, descriptions, onComplete }: FlowerLearnLessonProps) {
  return (
    <ExploreLesson terrains={flowers} descriptions={descriptions} onComplete={onComplete} additionText="hoa và cây" />
  );
}
