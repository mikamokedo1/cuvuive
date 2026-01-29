"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { randomNum } from "@/libs/utils/randomNum";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { ActionButton } from "@/components/common/ActionButton";
import SoundGreater from "@/assets/games/compare-quantity/sounds/dau-lon.mp3";
import SoundLess from "@/assets/games/compare-quantity/sounds/dau-be.mp3";
import SoundEqual from "@/assets/games/compare-quantity/sounds/dau-bang.mp3";
import { playSound } from "@/libs/utils/playSound";
import { MAP_COMPARE_SIGN_SOUND } from "./VisualCompareLesson";
import { SoundNumbers } from "../learn-game/LearnLesson";

interface NumberCompareLessonProps {
  comparisonType: "greater" | "less" | "equal" | "mixed";
  onComplete: () => void;
}

const REQUIRED_WINS = 5;

export function NumberCompareLesson({ comparisonType, onComplete }: NumberCompareLessonProps) {
  const [leftNum, setLeftNum] = useState(0);
  const [rightNum, setRightNum] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const prevQuestionRef = useRef<string>("");

  const generateQuestion = useCallback(() => {
    let left: number, right: number;
    let attempts = 0;

    do {
      if (comparisonType === "greater") {
        // Generate where left > right
        left = randomNum(3, 9);
        right = randomNum(1, left - 1);
      } else if (comparisonType === "less") {
        // Generate where left < right
        right = randomNum(3, 9);
        left = randomNum(1, right - 1);
      } else if (comparisonType === "equal") {
        // Equal
        const val = randomNum(1, 9);
        left = val;
        right = val;
      } else {
        // Mixed
        left = randomNum(1, 9);
        right = randomNum(1, 9);
      }
      attempts++;
    } while (`${left}-${right}` === prevQuestionRef.current && attempts < 10);

    prevQuestionRef.current = `${left}-${right}`;
    setLeftNum(left);
    setRightNum(right);
    setFeedback(null);
  }, [comparisonType]);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const handleChoice = (sign: "<" | ">" | "=") => {
    if (feedback) return;
    playSound(MAP_COMPARE_SIGN_SOUND[sign]);

    let isCorrect = false;

    if (leftNum > rightNum) {
      isCorrect = sign === ">";
    } else if (leftNum < rightNum) {
      isCorrect = sign === "<";
    } else {
      isCorrect = sign === "=";
    }

    if (isCorrect) {
      setFeedback("correct");
      const newCount = correctCount + 1;
      setCorrectCount(newCount);
      playWinEffect(500);

      if (newCount >= REQUIRED_WINS) {
        setTimeout(onComplete, 1200);
      } else {
        setTimeout(generateQuestion, 1000);
      }
    } else {
      setFeedback("wrong");
      setTimeout(() => setFeedback(null), 600);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
      {/* Number comparison */}
      <div
        className={`bg-white/90 rounded-3xl p-8 shadow-xl border-4 w-full transition-all ${
          feedback === "correct"
            ? "border-green-400 bg-green-50"
            : feedback === "wrong"
              ? "border-red-400 bg-red-50 animate-shake"
              : "border-yellow-200"
        }`}
      >
        <div className="flex items-center justify-center gap-4 md:gap-8">
          {/* Left Number */}
          <div
            className="flex-1 flex items-center justify-center cursor-pointer hover:scale-105"
            onClick={() => leftNum && playSound(SoundNumbers[leftNum - 1])}
          >
            <span className="text-[12rem] leading-none font-display font-black text-orange-500 drop-shadow-md animate-scale ">
              {leftNum}
            </span>
          </div>

          {/* Symbol placeholder */}
          <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
            {feedback === "correct" ? (
              <div className="text-6xl md:text-8xl font-black text-green-500 animate-scaleIn">
                {leftNum > rightNum ? ">" : leftNum < rightNum ? "<" : "="}
              </div>
            ) : (
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-100 border-2 border-dashed border-slate-300"></div>
            )}
          </div>

          {/* Right Number */}
          <div
            className="flex-1 flex items-center justify-center cursor-pointer hover:scale-105"
            onClick={() => rightNum && playSound(SoundNumbers[rightNum - 1])}
          >
            <span className="text-[12rem] leading-none font-display font-black text-orange-500 drop-shadow-md animate-scale ">
              {rightNum}
            </span>
          </div>
        </div>
      </div>

      {/* Sign Buttons */}
      <div className="flex gap-4 sm:gap-8 justify-center mt-4">
        {[
          { sign: "<", color: "blue" },
          { sign: ">", color: "orange" },
          { sign: "=", color: "purple" },
        ].map(({ sign, color }) => (
          <ActionButton
            key={sign}
            onClick={() => handleChoice(sign as "<" | ">" | "=")}
            disabled={!!feedback}
            color={color as "blue" | "orange" | "purple"}
            size="auto"
            className="w-20 h-20 sm:w-24 sm:h-24 text-4xl sm:text-6xl font-black rounded-2xl shadow-lg border-b-4 active:translate-y-1 active:border-b-0"
          >
            {sign}
          </ActionButton>
        ))}
      </div>
    </div>
  );
}
