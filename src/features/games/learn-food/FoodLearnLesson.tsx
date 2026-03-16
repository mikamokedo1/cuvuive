import { ExploreLesson } from "@/components/games/ExploreLesson";
import { EntityData } from "@/types/game";

interface FoodLearnLessonProps {
  foods: EntityData[];
  descriptions: Record<string, string>;
  onComplete: () => void;
}

export function FoodLearnLesson({ foods, descriptions, onComplete }: FoodLearnLessonProps) {
  return (
    <ExploreLesson terrains={foods} descriptions={descriptions} onComplete={onComplete} additionText="món ăn" />
  );
}
