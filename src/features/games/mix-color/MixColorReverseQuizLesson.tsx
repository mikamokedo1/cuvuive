"use client";

import { useState, useEffect, useRef } from "react";
import { MixingRule, MIXING_RULES, ColorMix } from "./constants";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { getRandomItem } from "@/libs/utils/randomQuestion";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { FeedbackType } from "@/types/game";

interface MixColorReverseQuizLessonProps {
  rules: MixingRule[];
  onComplete: () => void;
  requiredWins?: number;
}

export function MixColorReverseQuizLesson({ rules, onComplete, requiredWins = 5 }: MixColorReverseQuizLessonProps) {
  const { speak } = useTextToSpeech();
  const [targetRule, setTargetRule] = useState<MixingRule | null>(null);
  const prevTargetRef = useRef<MixingRule | null>(null);
  const [options, setOptions] = useState<ColorMix[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [shakeIndex, setShakeIndex] = useState<number | null>(null);

  const generateQuestion = () => {
    if (rules.length === 0) return;

    // Pick a random target
    const target = getRandomItem(rules, prevTargetRef.current);
    prevTargetRef.current = target;

    // Pick 3 distractor result colors
    const allResultColors = MIXING_RULES.map((r) => r.result);
    // Remove duplicates based on hex
    const uniqueResultColors = allResultColors.filter((v, i, a) => a.findIndex((t) => t.hex === v.hex) === i);

    let distractorPool = uniqueResultColors.filter((c) => c.hex !== target.result.hex);
    distractorPool = distractorPool.sort(() => Math.random() - 0.5);

    const optionsCount = 3;
    const selectedDistractors = distractorPool.slice(0, optionsCount);

    // Combine and shuffle options
    const newOptions = [target.result, ...selectedDistractors].sort(() => Math.random() - 0.5);

    setTargetRule(target);
    setOptions(newOptions);
    setFeedback(null);
    setShakeIndex(null);
  };

  useEffect(() => {
    generateQuestion();
  }, [rules]);

  const handleOptionClick = (selected: ColorMix, index: number) => {
    if (!targetRule) return;
    if (feedback === "correct") return;

    if (selected.hex === targetRule.result.hex) {
      setFeedback("correct");
      playWinEffect(500);
      speak(`Màu ${selected.name}, đúng rồi`);

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
    speak(`Màu ${targetRule.color1.name} pha với màu ${targetRule.color2.name} ra màu gì?`);
  }, [targetRule]);

  if (!targetRule) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center gap-10 w-full max-w-4xl px-4">
      {/* Target Colors Display */}
      <div
        className="flex flex-col items-center gap-4 cursor-pointer"
        onClick={() => speak(`Màu ${targetRule.color1.name} pha với màu ${targetRule.color2.name} ra màu gì?`)}
      >
        <div className="flex items-center justify-center gap-4">
          <div
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full shadow-lg border-4 border-white"
            style={{ backgroundColor: targetRule.color1.hex }}
          />
          <span className="text-4xl font-bold text-blue-600">+</span>
          <div
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full shadow-lg border-4 border-white"
            style={{ backgroundColor: targetRule.color2.hex }}
          />
        </div>
      </div>

      {/* Options - Single colors */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-3xl justify-items-center">
        {options.map((option, index) => (
          <button
            key={`${option.hex}-${index}`}
            onClick={() => handleOptionClick(option, index)}
            className={`
              w-32 h-32 sm:w-36 sm:h-36 rounded-2xl shadow-lg border-4
              transform transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer
              ${feedback === "wrong" && shakeIndex === index ? "opacity-50 border-red-400 animate-shake" : "border-white"}
              ${feedback === "correct" && option.hex === targetRule.result.hex ? "border-green-400 scale-110" : ""}
            `}
            style={{ backgroundColor: option.hex }}
          />
        ))}
      </div>
    </div>
  );
}
