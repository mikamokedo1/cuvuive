"use client";

import { useState, useEffect, useRef } from "react";
import { EntityData } from "@/types/game";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { getRandomItem } from "@/libs/utils/randomQuestion";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import Image from "next/image";
import LoudSpeaker from "@/assets/games/loud-speaker.webp";
import { FeedbackType } from "@/types/game";
import { QuizzLesson } from "@/components/games/QuizLesson";

interface FruitQuizLessonProps {
  fruits: EntityData[];
  onComplete: () => void;
  requiredWins?: number;
}

export function FruitQuizLesson({ fruits, onComplete, requiredWins = 6 }: FruitQuizLessonProps) {
  return <QuizzLesson items={fruits} onComplete={onComplete} requiredWins={requiredWins} />;
}
