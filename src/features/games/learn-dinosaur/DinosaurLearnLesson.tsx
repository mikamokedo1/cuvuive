import { ExploreLesson } from "@/components/games/ExploreLesson";
import { EntityData } from "@/types/game";

interface DinosaurLearnLessonProps {
  dinosaurs: EntityData[];
  descriptions: Record<string, string>;
  onComplete: () => void;
}

export function DinosaurLearnLesson({ dinosaurs, descriptions, onComplete }: DinosaurLearnLessonProps) {
  return (
    <ExploreLesson terrains={dinosaurs} descriptions={descriptions} onComplete={onComplete} additionText="khủng long" />
  );
}
