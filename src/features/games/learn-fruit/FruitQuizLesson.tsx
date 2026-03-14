"use client";

import { useState, useEffect, useRef } from "react";
import { EntityData } from "@/types/game";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { getRandomItem } from "@/libs/utils/randomQuestion";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import Image from "next/image";
import { FeedbackType } from "@/types/game";
import { QuizzLesson } from "@/components/games/QuizLesson";
import { LoudSpeaker } from "@/libs/constants/game-assets";

interface FruitQuizLessonProps {
  fruits: EntityData[];
  onComplete: () => void;
  requiredWins?: number;
}

export function FruitQuizLesson({ fruits, onComplete, requiredWins = 6 }: FruitQuizLessonProps) {
  return <QuizzLesson items={fruits} onComplete={onComplete} requiredWins={requiredWins} />;
}
