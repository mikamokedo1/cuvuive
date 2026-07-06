"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ActionButton } from "@/components/common/ActionButton";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { NUMBER_NAMES_VI } from "@/libs/constants/numberPaths2";
import { randomExcluding } from "@/libs/utils/randomNum";
import { FeedbackType } from "@/types/game";
import { playWrongSound } from "@/libs/utils/playSound";

const MAP_INDEX_TO_COLOR = ["blue", "green", "orange", "purple"] as const;

interface QuizLesson2Props {
  numbers: number[];
  onComplete: () => void;
  requiredWins?: number;
}

export function QuizLesson2({ numbers, onComplete, requiredWins = 6 }: QuizLesson2Props) {
  const { speak } = useTextToSpeech();
  const [targetNumber, setTargetNumber] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
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

    // Pick distractors from a wider pool (0-20) to make it interesting
    const allNumbers = Array.from({ length: 21 }, (_, i) => i);
    const pool = allNumbers.filter(
      (n) => (n !== target && !numbers.includes(n)) || (n !== target && numbers.includes(n)),
    );
    const uniquePool = pool.filter((n) => n !== target);

    // Shuffle and take 2 distractors
    const shuffled = uniquePool.sort(() => Math.random() - 0.5);
    const distractors = shuffled.slice(0, 2);

    // Combine and shuffle options
    const finalOptions = [target, ...distractors].sort(() => Math.random() - 0.5);

    setTargetNumber(target);
    setOptions(finalOptions);
    setFeedback(null);
  }, [numbers]);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  // Speak the target number when it changes
  useEffect(() => {
    if (targetNumber !== undefined) {
      const timer = setTimeout(() => {
        speak(`Số ${NUMBER_NAMES_VI[targetNumber] ?? targetNumber} ở đâu nhỉ?`);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [targetNumber, speak]);

  const handleAnswer = (num: number) => {
    speak(`${NUMBER_NAMES_VI[num] ?? num}`);
    if (num === targetNumber) {
      setFeedback("correct");
      playWinEffect(500);

      if (correctCount + 1 >= requiredWins) {
        setTimeout(onComplete, 1000);
      } else {
        setCorrectCount((prev) => prev + 1);
        setTimeout(generateQuestion, 1500);
      }
    } else {
      setFeedback("wrong");
      playWrongSound();
      setTimeout(() => setFeedback(null), 600);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 md:gap-8 w-full max-w-4xl px-4">
      <div
        className={`bg-white p-8 md:p-12 rounded-3xl border-4 shadow-xl mb-4 md:mb-8 cursor-pointer ${
          feedback === "correct"
            ? "border-green-400 bg-green-50"
            : feedback === "wrong"
              ? "border-red-400 bg-red-50 animate-shake"
              : "border-blue-200"
        }`}
        onClick={() => speak(`Số ${NUMBER_NAMES_VI[targetNumber] ?? targetNumber}`)}
      >
        <span className="text-7xl md:text-9xl font-display font-black text-blue-600 block text-center min-w-[150px] md:min-w-[200px] animate-scale">
          {targetNumber}
        </span>
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
