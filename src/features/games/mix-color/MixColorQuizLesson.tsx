"use client";

import { useState, useEffect, useRef } from "react";
import { MixingRule, MIXING_RULES } from "./constants";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { getRandomItem } from "@/libs/utils/randomQuestion";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { FeedbackType } from "@/types/game";

interface MixColorQuizLessonProps {
  rules: MixingRule[];
  onComplete: () => void;
  requiredWins?: number;
}

export function MixColorQuizLesson({ rules, onComplete, requiredWins = 5 }: MixColorQuizLessonProps) {
  const { speak } = useTextToSpeech();
  const [targetRule, setTargetRule] = useState<MixingRule | null>(null);
  const prevTargetRef = useRef<MixingRule | null>(null);
  const [options, setOptions] = useState<MixingRule[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [shakeIndex, setShakeIndex] = useState<number | null>(null);

  const generateQuestion = () => {
    if (rules.length === 0) return;

    // Pick a random target rule
    const target = getRandomItem(rules, prevTargetRef.current);
    prevTargetRef.current = target;

    // We need distractors. Let's pick from ALL rules, not just this group's rules,
    // to ensure we always have enough options.
    let distractorPool = MIXING_RULES.filter((r) => r.id !== target.id);
    distractorPool = distractorPool.sort(() => Math.random() - 0.5);

    // Take 3 distractors to make 4 options total
    const optionsCount = 3;
    const selectedDistractors = distractorPool.slice(0, optionsCount);

    // Combine and shuffle options
    const newOptions = [target, ...selectedDistractors].sort(() => Math.random() - 0.5);

    setTargetRule(target);
    setOptions(newOptions);
    setFeedback(null);
    setShakeIndex(null);
  };

  useEffect(() => {
    generateQuestion();
  }, [rules]);

  const handleOptionClick = (selected: MixingRule, index: number) => {
    if (!targetRule) return;
    if (feedback === "correct") return;

    if (selected.id === targetRule.id) {
      setFeedback("correct");
      playWinEffect(500);
      speak(`Đúng rồi, ${targetRule.color1.name} pha với ${targetRule.color2.name} thành ${targetRule.result.name}`);

      setTimeout(() => {
        const newScore = score + 1;
        setScore(newScore);
        if (newScore >= requiredWins) {
          onComplete();
        } else {
          generateQuestion();
        }
      }, 2000);
    } else {
      setFeedback("wrong");
      setShakeIndex(index);
      speak("Chưa đúng, thử lại nhé");

      setTimeout(() => {
        setFeedback(null);
        setShakeIndex(null);
      }, 600);
    }
  };

  useEffect(() => {
    if (!targetRule) return;
    speak(`Cần pha màu gì để được màu ${targetRule.result.name}?`);
  }, [targetRule]);

  if (!targetRule) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center gap-10 w-full max-w-4xl px-4">
      {/* Target Color Display */}
      <div
        className="flex flex-col items-center gap-4 cursor-pointer"
        onClick={() => speak(`Cần pha màu gì để được màu ${targetRule.result.name}?`)}
      >
        <div
          className={`
            transition-all w-32 h-32 md:w-40 md:h-40 rounded-full shadow-lg border-4 
            flex items-center justify-center
            ${feedback === "correct" ? "border-green-400 scale-110" : "border-white hover:scale-105"}
          `}
          style={{ backgroundColor: targetRule.result.hex }}
        >
          <div className="absolute top-4 right-6 w-6 h-6 bg-white/30 rounded-full blur-sm" />
        </div>
      </div>

      {/* Options - Pairs of colors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
        {options.map((option, index) => (
          <button
            key={`${option.id}-${index}`}
            onClick={() => handleOptionClick(option, index)}
            className={`
              flex items-center justify-center gap-3 p-4 rounded-3xl shadow-md border-4
              transform transition-all duration-200 hover:scale-105 active:scale-95
              ${feedback === "wrong" && shakeIndex === index ? "border-red-400 animate-shake opacity-70" : "border-gray-100 hover:border-orange-300"}
              ${feedback === "correct" && option.id === targetRule.id ? "border-green-400 bg-green-50" : ""}
            `}
          >
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-inner border-2 border-grey"
              style={{ backgroundColor: option.color1.hex }}
            />
            <span className="text-2xl font-bold text-blue-600">+</span>
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-inner border-2 border-grey"
              style={{ backgroundColor: option.color2.hex }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
