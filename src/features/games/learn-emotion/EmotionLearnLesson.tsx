import { ExploreLesson } from "@/components/games/ExploreLesson";
import { EntityData } from "@/types/game";

interface EmotionLearnLessonProps {
  items: EntityData[];
  descriptions: Record<string, string>;
  onComplete: () => void;
}

export function EmotionLearnLesson({ items, descriptions, onComplete }: EmotionLearnLessonProps) {
  return (
    <ExploreLesson terrains={items} descriptions={descriptions} onComplete={onComplete} additionText="cảm xúc" />
  );
}
