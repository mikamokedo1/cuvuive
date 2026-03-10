import { EntityData } from "@/types/game";
import { MemoryLesson } from "@/components/games/MemoryLesson";

interface VehicleMemoryLessonProps {
  vehicles: EntityData[];
  onComplete: () => void;
  pairsCount?: number; // Number of unique vehicles to use (default 6)
}

export function VehicleMemoryLesson({ vehicles, onComplete, pairsCount = 6 }: VehicleMemoryLessonProps) {
  return <MemoryLesson items={vehicles} pairsCount={pairsCount} onComplete={onComplete} additionText="phương tiện" />;
}
