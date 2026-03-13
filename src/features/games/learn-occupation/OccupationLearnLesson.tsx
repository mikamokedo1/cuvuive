import { ExploreLesson } from "@/components/games/ExploreLesson";
import { EntityData } from "@/types/game";

interface OccupationLearnLessonProps {
  occupations: EntityData[];
  descriptions: Record<string, string>;
  onComplete: () => void;
}

export function OccupationLearnLesson({ occupations, descriptions, onComplete }: OccupationLearnLessonProps) {
  return (
    <ExploreLesson terrains={occupations} descriptions={descriptions} onComplete={onComplete} additionText="nghề nghiệp" />
  );
}
