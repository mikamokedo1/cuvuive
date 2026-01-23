"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ActionButton } from "@/components/common/ActionButton";
import { playSound } from "@/libs/utils/playSound";
import { SoundNumbers } from "./LearnLesson";
import { playWinEffect } from "@/libs/utils/playWinEffect";

interface QuizLessonProps {
  range: [number, number];
  onComplete: () => void;
}

export function QuizLesson({ range, onComplete }: QuizLessonProps) {
  const [start, end] = range;
  const [targetNumber, setTargetNumber] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const prevTargetRef = useRef<number | null>(null);
  const REQUIRED_WINS = 6;

  // Sound effects would go here

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
    // Simple logic: pick 2 other unique numbers from range if possible, or wider range if needed
    // Since range is small (3 numbers), we can just shuffle the range [start, start+1, start+2]
    const pool = Array.from({ length: end - start + 1 }).map((_, i) => start + i);
    // Shuffle pool
    const shuffled = pool.sort(() => Math.random() - 0.5).slice(0, 3);

    setTargetNumber(target);
    setOptions(shuffled);
  }, [end, start]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    generateQuestion();
  }, [generateQuestion]); // Init

  const handleAnswer = (num: number) => {
    playSound(SoundNumbers[num - 1]);
    if (num === targetNumber) {
      // Correct
      playWinEffect(500);

      if (correctCount + 1 >= REQUIRED_WINS) {
        // Finished lesson
        setTimeout(onComplete, 1000); // Delay to show success
      } else {
        setCorrectCount((prev) => prev + 1);
        setTimeout(generateQuestion, 500); // Delay for next Q
      }
    } else {
      // Wrong - shake or sound
      // For now, no penalty, just maybe visual feedback handled by button or parent
      // We could add state for 'wrongId' to shake specific button
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
      <div className="bg-white p-12 rounded-3xl border-4 border-blue-200 shadow-xl mb-8">
        <span
          className="text-9xl font-display font-black text-blue-600 block text-center min-w-[200px] animate-scale cursor-pointer"
          onClick={() => playSound(SoundNumbers[targetNumber - 1])}
        >
          {targetNumber}
        </span>
      </div>

      <div className="flex gap-6 flex-wrap justify-center">
        {options.map((opt) => (
          <ActionButton
            key={opt}
            variant="glossy"
            color="orange"
            size="auto"
            className="w-24 h-24 md:w-32 md:h-32 rounded-3xl"
            onClick={() => handleAnswer(opt)}
            clickPlaySound={false}
          >
            <span className="text-5xl md:text-6xl font-display text-white drop-shadow-md">{opt}</span>
          </ActionButton>
        ))}
      </div>
    </div>
  );
}
