"use client";

import { useMemo } from "react";
import { ToneWord } from "./constants";
import { MemoryLesson } from "@/components/games/MemoryLesson";
import { EntityData } from "@/types/game";

interface ToneMemoryLessonProps {
  words: ToneWord[];
  onComplete: () => void;
}

export function ToneMemoryLesson({ words, onComplete }: ToneMemoryLessonProps) {
  // Convert ToneWords to standard EntityData for MemoryLesson
  // We can duplicate the items to make pairs, or if words has enough items, memory module handles it
  const memoryItems = useMemo(() => {
    // Basic conversion
    return words.map((w) => ({
      id: w.id,
      name: w.name,
      image: w.image,
    } as EntityData));
  }, [words]);

  return <MemoryLesson items={memoryItems} onComplete={onComplete} pairsCount={4} />;
}
