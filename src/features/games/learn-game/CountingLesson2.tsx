"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ActionButton } from "@/components/common/ActionButton";
import { ThingImages } from "@/libs/constants/thingImages";
import { randomNum, randomExcluding } from "@/libs/utils/randomNum";
import Image from "next/image";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { NUMBER_NAMES_VI } from "@/libs/constants/numberPaths2";
import { getThingImage } from "@/libs/constants/numberData";
import { FeedbackType } from "@/types/game";

const MAP_INDEX_TO_COLOR = ["blue", "green", "orange", "purple"] as const;

interface CountingLesson2Props {
  numbers: number[];
  onComplete: () => void;
  requiredWins?: number;
}

export function CountingLesson2({ numbers, onComplete, requiredWins = 6 }: CountingLesson2Props) {
  const { speak } = useTextToSpeech();
  const [targetNumber, setTargetNumber] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [iconType, setIconType] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const prevTargetRef = useRef<number | null>(null);
  const [feedback, setFeedback] = useState<FeedbackType>(null);

  const generateQuestion = useCallback(() => {
    let target: number;

    if (numbers.length === 1) {
      target = numbers[0];
    } else {
      target = randomExcluding(numbers, prevTargetRef.current);
    }

    prevTargetRef.current = target;

    // Create distractor pool from 0-20, excluding the target
    const allNumbers = Array.from({ length: 21 }, (_, i) => i);
    const pool = allNumbers.filter((n) => n !== target);

    // Pick 2 distractors, prefer numbers close to target for difficulty
    const nearby = pool.filter((n) => Math.abs(n - target) <= 3);
    const distractors: number[] = [];

    // Try to get at least 1 nearby distractor
    if (nearby.length > 0) {
      const shuffledNearby = nearby.sort(() => Math.random() - 0.5);
      distractors.push(shuffledNearby[0]);
    }

    // Fill remaining with random from pool
    const remaining = pool.filter((n) => !distractors.includes(n)).sort(() => Math.random() - 0.5);
    while (distractors.length < 2 && remaining.length > 0) {
      distractors.push(remaining.shift()!);
    }

    const finalOptions = [target, ...distractors].sort(() => Math.random() - 0.5);

    setTargetNumber(target);
    setOptions(finalOptions);
    setIconType(randomNum(0, ThingImages.length - 1));
    setFeedback(null);
  }, [numbers]);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const handleAnswer = (num: number) => {
    speak(`${NUMBER_NAMES_VI[num] ?? num}`);
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

  // For number 0, show an empty area with a message
  const renderItems = () => {
    if (targetNumber === 0) {
      return (
        <div className="flex items-center justify-center w-full min-h-[100px]">
          <span className="text-xl text-gray-400 italic">Không có gì cả!</span>
        </div>
      );
    }

    return (
      <>
        {Array.from({ length: targetNumber }).map((_, i) => (
          <div
            key={i}
            className={`relative ${targetNumber > 9 ? "w-12 h-12 md:w-16 md:h-16" : "w-16 h-16 md:w-24 md:h-24"}`}
          >
            <Image src={ThingImages[iconType].icon} alt="Item" fill className="object-contain" />
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="flex flex-col items-center gap-4 md:gap-8 w-full px-4">
      <div
        className={`bg-white/80 rounded-3xl p-4 md:py-2 hover:scale-105 cursor-pointer border-4 shadow-xl flex items-center flex-wrap justify-center w-full min-h-[150px] md:min-h-50 gap-1 max-w-3xl ${
          feedback === "correct"
            ? "border-green-400 bg-green-50"
            : feedback === "wrong"
              ? "border-red-400 bg-red-50 animate-shake"
              : "border-purple-200"
        }`}
        onClick={() =>
          speak(targetNumber === 0 ? "Không có gì cả" : `Có ${targetNumber} ${ThingImages[iconType].name}`)
        }
      >
        {renderItems()}
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
