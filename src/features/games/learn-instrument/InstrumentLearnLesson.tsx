import { ExploreLesson } from "@/components/games/ExploreLesson";
import { EntityData } from "@/types/game";

interface InstrumentLearnLessonProps {
  instruments: EntityData[];
  descriptions: Record<string, string>;
  onComplete: () => void;
}

export function InstrumentLearnLesson({ instruments, descriptions, onComplete }: InstrumentLearnLessonProps) {
  return (
    <ExploreLesson terrains={instruments} descriptions={descriptions} onComplete={onComplete} additionText="nhạc cụ" />
  );
}
