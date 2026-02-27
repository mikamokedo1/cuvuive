"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ActionButton } from "@/components/common/ActionButton";
import { ThingImages } from "@/libs/constants/thingImages";
import { randomNum } from "@/libs/utils/randomNum";
import Image from "next/image";
import { playSound } from "@/libs/utils/playSound";
import { SoundNumbers } from "./LearnLesson";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { MAP_INDEX_TO_COLOR } from "./QuizLesson";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { FeedbackType } from "@/types/game";

interface CountingLessonProps {
  range: [number, number];
  onComplete: () => void;
  requiredWins?: number;
}

export function CountingLesson({ range, onComplete, requiredWins = 6 }: CountingLessonProps) {
  const { speak } = useTextToSpeech();
  const [start, end] = range;
  const [targetNumber, setTargetNumber] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [iconType, setIconType] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const prevTargetRef = useRef<number | null>(null);
  const [feedback, setFeedback] = useState<FeedbackType>(null);

  const generateQuestion = useCallback(() => {
    let target = Math.floor(Math.random() * (end - start + 1)) + start;

    // Prevent regenerating the previous number
    if (end > start && prevTargetRef.current !== null) {
      while (target === prevTargetRef.current) {
        target = Math.floor(Math.random() * (end - start + 1)) + start;
      }
    }

    prevTargetRef.current = target;

    // Options: target + 2 distractors
    const pool = Array.from({ length: end - start + 1 })
      .map((_, i) => start + i)
      .filter((n) => n !== target);

    const distractors = pool.sort(() => Math.random() - 0.5).slice(0, 2);
    const finalOptions = [target, ...distractors].sort(() => Math.random() - 0.5);

    setTargetNumber(target);
    setOptions(finalOptions);
    setIconType(randomNum(0, ThingImages.length - 1));
    setFeedback(null);
  }, [end, start]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    generateQuestion();
  }, [generateQuestion]);

  const handleAnswer = (num: number) => {
    playSound(SoundNumbers[num - 1]);
    if (num === targetNumber) {
      playWinEffect(500);
      setFeedback("correct");

      if (correctCount + 1 >= requiredWins) {
        setTimeout(onComplete, 1500);
      } else {
        setCorrectCount((prev) => prev + 1);
        setTimeout(generateQuestion, 1000);
      }
    } else {
      setFeedback("wrong");
      setTimeout(() => setFeedback(null), 600);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 md:gap-8 w-full px-4">
      <div
        className={`bg-white/80 rounded-3xl p-4 md:py-2 hover:scale-105 cursor-pointer border-4 shadow-xl flex items-center flex-wrap justify-center w-full min-h-[150px] md:min-h-50 ${feedback === "correct" ? "border-green-400 bg-green-50" : feedback === "wrong" ? "border-red-400 bg-red-50 animate-shake" : "border-purple-200"}`}
        onClick={() => speak(`Có ${targetNumber} ${ThingImages[iconType].name}`)}
      >
        {Array.from({ length: targetNumber }).map((_, i) => (
          <div key={i} className="w-16 h-16 md:w-30 md:h-30 relative">
            <Image src={ThingImages[iconType].icon} alt="Number" fill className="object-contain" />
          </div>
        ))}
      </div>

      <div className="flex gap-6 flex-wrap justify-center">
        {options.map((opt, index) => (
          <ActionButton
            key={opt}
            variant="glossy"
            color={MAP_INDEX_TO_COLOR[index]}
            size="auto"
            className="w-20 h-20 md:w-32 md:h-32 rounded-3xl"
            onClick={() => handleAnswer(opt)}
            clickPlaySound={false}
            disabled={!!feedback}
          >
            <span className="text-4xl md:text-6xl font-display text-white drop-shadow-md">{opt}</span>
          </ActionButton>
        ))}
      </div>
    </div>
  );
}
