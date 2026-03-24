"use client";

import { ScenarioQuestion } from "@/types/game";
import { ScenarioLesson } from "@/components/games/ScenarioLesson";

interface ScenarioSpotterLessonProps {
  scenarios: ScenarioQuestion[];
  onComplete: () => void;
}

export function ScenarioSpotterLesson({ scenarios, onComplete }: ScenarioSpotterLessonProps) {
  return <ScenarioLesson scenarios={scenarios} onComplete={onComplete} />;
}
