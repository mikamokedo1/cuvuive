import { ExploreLesson } from "@/components/games/ExploreLesson";
import { EntityData } from "@/types/game";

interface VehicleLearnLessonProps {
  vehicles: EntityData[];
  descriptions: Record<string, string>;
  onComplete: () => void;
}

export function VehicleLearnLesson({ vehicles, descriptions, onComplete }: VehicleLearnLessonProps) {
  return (
    <ExploreLesson terrains={vehicles} descriptions={descriptions} onComplete={onComplete} additionText="phương tiện" />
  );
}
