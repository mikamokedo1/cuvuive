"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ActionButton } from "@/components/common/ActionButton";
import { playSound } from "@/libs/utils/playSound";
import { SoundNumbers } from "./LearnLesson";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { FeedbackType } from "@/types/game";

export const MAP_INDEX_TO_COLOR = ["blue", "green", "orange", "purple"] as const;

interface QuizLessonProps {
  range: [number, number];
  onComplete: () => void;
  requiredWins?: number;
}

export function QuizLesson({ range, onComplete, requiredWins = 6 }: QuizLessonProps) {
  const [start, end] = range;
  const [targetNumber, setTargetNumber] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const prevTargetRef = useRef<number | null>(null);
  const [feedback, setFeedback] = useState<FeedbackType>(null);

  // Generate new question
  const generateQuestion = useCallback(() => {
    // Pick random target
    let target = Math.floor(Math.random() * (end - start + 1)) + start;

    // Prevent regenerating the previous number
    if (end > start && prevTargetRef.current !== null) {
      while (target === prevTargetRef.current) {
        target = Math.floor(Math.random() * (end - start + 1)) + start;
      }
    }

    prevTargetRef.current = target;

    // Pick distractors
    const pool = Array.from({ length: end - start + 1 })
      .map((_, i) => start + i)
      .filter((n) => n !== target);

    // Shuffle pool and take 2
    const distractors = pool.sort(() => Math.random() - 0.5).slice(0, 2);

    // Combine and shuffle
    const finalOptions = [target, ...distractors].sort(() => Math.random() - 0.5);

    setTargetNumber(target);
    setOptions(finalOptions);
    setFeedback(null);
  }, [end, start]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    generateQuestion();
  }, [generateQuestion]); // Init

  const handleAnswer = (num: number) => {
    playSound(SoundNumbers[num - 1]);
    if (num === targetNumber) {
      setFeedback("correct");
      // Correct
      playWinEffect(500);

      if (correctCount + 1 >= requiredWins) {
        // Finished lesson
        setTimeout(onComplete, 1000); // Delay to show success
      } else {
        setCorrectCount((prev) => prev + 1);
        setTimeout(generateQuestion, 1500); // Delay for next Q
      }
    } else {
      // Wrong - shake or sound
      // For now, no penalty, just maybe visual feedback handled by button or parent
      // We could add state for 'wrongId' to shake specific button
      setFeedback("wrong");
      setTimeout(() => setFeedback(null), 600);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 md:gap-8 w-full max-w-4xl px-4">
      <div
        className={`bg-white p-8 md:p-12 rounded-3xl border-4 shadow-xl mb-4 md:mb-8 ${feedback === "correct" ? "border-green-400 bg-green-50" : feedback === "wrong" ? "border-red-400 bg-red-50 animate-shake" : "border-blue-200"}`}
      >
        <span
          className="text-7xl md:text-9xl font-display font-black text-blue-600 block text-center min-w-[150px] md:min-w-[200px] animate-scale cursor-pointer"
          onClick={() => playSound(SoundNumbers[targetNumber - 1])}
        >
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
