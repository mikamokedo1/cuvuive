"use client";

import { ScenarioQuestion } from "@/types/game";
import { ScenarioLesson } from "@/components/games/ScenarioLesson";

interface DangerScenarioLessonProps {
  scenarios: ScenarioQuestion[];
  onComplete: () => void;
}

export function DangerScenarioLesson({ scenarios, onComplete }: DangerScenarioLessonProps) {
  return <ScenarioLesson scenarios={scenarios} onComplete={onComplete} altText="tình huống nguy hiểm" />;
}
