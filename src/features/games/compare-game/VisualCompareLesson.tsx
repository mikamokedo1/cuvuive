"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { ThingImages } from "@/libs/constants/thingImages";
import { randomNum } from "@/libs/utils/randomNum";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { ActionButton } from "@/components/common/ActionButton";
import SoundGreater from "@/assets/games/compare-quantity/sounds/dau-lon.mp3";
import SoundLess from "@/assets/games/compare-quantity/sounds/dau-be.mp3";
import SoundEqual from "@/assets/games/compare-quantity/sounds/dau-bang.mp3";
import { playSound } from "@/libs/utils/playSound";
import { useTextToSpeech } from "@/libs/hooks/useTextToSpeech";

export const MAP_COMPARE_SIGN_SOUND = {
  ">": SoundGreater,
  "<": SoundLess,
  "=": SoundEqual,
};

interface VisualCompareLessonProps {
  comparisonType: "greater" | "less" | "equal";
  onComplete: () => void;
}

const REQUIRED_WINS = 5;

export function VisualCompareLesson({ comparisonType, onComplete }: VisualCompareLessonProps) {
  const { speak } = useTextToSpeech();
  const [leftCount, setLeftCount] = useState(0);
  const [rightCount, setRightCount] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const prevQuestionRef = useRef<string>("");

  const generateQuestion = useCallback(() => {
    let left: number, right: number;
    let attempts = 0;

    do {
      if (comparisonType === "greater") {
        // Left should be greater
        left = randomNum(3, 8);
        right = randomNum(1, left - 1);
      } else if (comparisonType === "less") {
        // Left should be less
        right = randomNum(3, 8);
        left = randomNum(1, right - 1);
      } else {
        // Equal
        const val = randomNum(2, 6);
        left = val;
        right = val;
      }
      attempts++;
    } while (`${left}-${right}` === prevQuestionRef.current && attempts < 10);

    prevQuestionRef.current = `${left}-${right}`;
    setLeftCount(left);
    setRightCount(right);
    setImageIndex(randomNum(0, ThingImages.length - 1));
    setFeedback(null);
  }, [comparisonType]);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const handleChoice = (sign: "<" | ">" | "=") => {
    if (feedback) return;
    playSound(MAP_COMPARE_SIGN_SOUND[sign]);
    let isCorrect = false;

    if (leftCount > rightCount) {
      isCorrect = sign === ">";
    } else if (leftCount < rightCount) {
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
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl">
      {/* Visual comparison */}
      <div
        className={`bg-white/90 rounded-3xl p-6 shadow-xl border-4 w-full transition-all ${
          feedback === "correct"
            ? "border-green-400 bg-green-50"
            : feedback === "wrong"
              ? "border-red-400 bg-red-50 animate-shake"
              : "border-yellow-200"
        }`}
      >
        <div className="flex items-center justify-around gap-4">
          {/* Left Group */}
          <div
            onClick={() => speak(`Có ${leftCount} ${ThingImages[imageIndex].name}`)}
            className="flex flex-wrap justify-center gap-2 p-4 rounded-2xl bg-white/50 border-2 border-slate-100 w-2/5 min-h-[150px] cursor-pointer hover:scale-105"
          >
            {Array.from({ length: leftCount }).map((_, i) => (
              <div
                key={`left-${i}`}
                className="w-16 h-16 md:w-20 md:h-20 relative animate-popIn"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <Image src={ThingImages[imageIndex].icon} alt="item" fill className="object-contain drop-shadow-md" />
              </div>
            ))}
          </div>

          {/* Center Space for Sign */}
          <div className="w-16 h-16 flex items-center justify-center">
            {feedback === "correct" ? (
              <div className="text-6xl font-black text-green-500 animate-scaleIn">
                {leftCount > rightCount ? ">" : leftCount < rightCount ? "<" : "="}
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-slate-100 border-2 border-dashed border-slate-300"></div>
            )}
          </div>

          {/* Right Group */}
          <div
            onClick={() => speak(`Có ${rightCount} ${ThingImages[(imageIndex + 1) % ThingImages.length].name}`)}
            className="flex flex-wrap justify-center gap-2 p-4 rounded-2xl bg-white/50 border-2 border-slate-100 w-2/5 min-h-[150px] cursor-pointer hover:scale-105"
          >
            {Array.from({ length: rightCount }).map((_, i) => (
              <div
                key={`right-${i}`}
                className="w-16 h-16 md:w-20 md:h-20 relative animate-popIn"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <Image
                  src={ThingImages[(imageIndex + 1) % ThingImages.length].icon}
                  alt="item"
                  fill
                  className="object-contain drop-shadow-md"
                />
              </div>
            ))}
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
