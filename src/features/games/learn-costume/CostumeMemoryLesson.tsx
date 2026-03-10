import { CostumeData } from "./constants";
import { MemoryLesson } from "@/components/games/MemoryLesson";

interface CostumeMemoryLessonProps {
  costumes: CostumeData[];
  onComplete: () => void;
  pairsCount?: number; // Number of unique costumes to use (default 6)
}

export function CostumeMemoryLesson({ costumes, onComplete, pairsCount = 6 }: CostumeMemoryLessonProps) {
  return <MemoryLesson items={costumes} pairsCount={pairsCount} onComplete={onComplete} additionText="trang phục" />;
}
