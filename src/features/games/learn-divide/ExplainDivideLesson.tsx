"use client";

import { ExplainMultiplyLesson } from "@/features/games/learn-multiply/ExplainMultiplyLesson";

interface ExplainDivideLessonProps {
  divisor: number;
  onComplete: () => void;
}

export function ExplainDivideLesson({ divisor, onComplete }: ExplainDivideLessonProps) {
  return <ExplainMultiplyLesson multiplier={divisor} onComplete={onComplete} operation="divide" />;
}
