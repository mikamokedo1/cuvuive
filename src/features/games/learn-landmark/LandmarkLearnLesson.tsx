import { ExploreLesson } from "@/components/games/ExploreLesson";
import { EntityData } from "@/types/game";

interface LandmarkLearnLessonProps {
  landmarks: EntityData[];
  descriptions: Record<string, string>;
  onComplete: () => void;
}

export function LandmarkLearnLesson({ landmarks, descriptions, onComplete }: LandmarkLearnLessonProps) {
  return (
    <ExploreLesson terrains={landmarks} descriptions={descriptions} onComplete={onComplete} additionText="địa danh" />
  );
}
