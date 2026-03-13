import { ExploreLesson } from "@/components/games/ExploreLesson";
import { EntityData } from "@/types/game";

interface TerrainExploreLessonProps {
  terrains: EntityData[];
  descriptions: Record<string, string>;
  onComplete: () => void;
}

export function TerrainExploreLesson({ terrains, descriptions, onComplete }: TerrainExploreLessonProps) {
  return (
    <ExploreLesson terrains={terrains} descriptions={descriptions} onComplete={onComplete} additionText="địa hình" />
  );
}
