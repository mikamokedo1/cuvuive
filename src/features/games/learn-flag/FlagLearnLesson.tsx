import { ExploreLesson } from "@/components/games/ExploreLesson";
import { EntityData } from "@/types/game";

interface FlagLearnLessonProps {
  flags: EntityData[];
  descriptions: Record<string, string>;
  onComplete: () => void;
}

export function FlagLearnLesson({ flags, descriptions, onComplete }: FlagLearnLessonProps) {
  return (
    <ExploreLesson terrains={flags} descriptions={descriptions} onComplete={onComplete} additionText="quốc kỳ" />
  );
}
