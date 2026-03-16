"use client";

import { useState, useEffect, useRef } from "react";
import { SyllableData } from "./constants";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { getRandomItem } from "@/libs/utils/randomQuestion";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import Image from "next/image";
import { playButtonSound } from "@/libs/utils/playSound";
import { FeedbackType } from "@/types/game";
import Loading from "@/components/common/Loading";

interface SyllableQuizLessonProps {
  syllables: SyllableData[];
  onComplete: () => void;
  requiredWins?: number;
}

export function SyllableQuizLesson({ syllables, onComplete, requiredWins = 6 }: SyllableQuizLessonProps) {
  const { speak } = useTextToSpeech();
  const [target, setTarget] = useState<SyllableData | null>(null);
  const prevTargetRef = useRef<SyllableData | null>(null);
  const [options, setOptions] = useState<SyllableData[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackType>(null);

  const generateQuestion = () => {
    if (!syllables || syllables.length === 0) return;

    const target = getRandomItem(syllables, prevTargetRef.current);
    prevTargetRef.current = target;

    // Distractors: other syllables (try to get unique syllables)
    let distractorPool = syllables.filter((s) => s.syllable !== target.syllable);

    // If we don't have enough unique syllables in this group, use other groups?
    // For now, just shuffle and pick.
    distractorPool = distractorPool.sort(() => Math.random() - 0.5);

    const uniqueDistractors: SyllableData[] = [];
    const seenSyllables = new Set([target.syllable]);

    for (const d of distractorPool) {
      if (!seenSyllables.has(d.syllable)) {
        uniqueDistractors.push(d);
        seenSyllables.add(d.syllable);
      }
      if (uniqueDistractors.length >= 2) break;
    }

    const newOptions = [target, ...uniqueDistractors].sort(() => Math.random() - 0.5);

    setTarget(target);
    setOptions(newOptions);
    setFeedback(null);

    setTimeout(() => {
      speak(`Vần của ${target.name} là gì?`);
    }, 1000);
  };

  useEffect(() => {
    generateQuestion();
  }, [syllables]);

  const handleOptionClick = (selected: SyllableData) => {
    if (!target) return;
    if (feedback === "correct") return;

    playButtonSound();

    if (selected.syllable === target.syllable) {
      speak(`Đúng rồi, ${target.name} có vần ${target.syllable}`);
      setFeedback("correct");
      playWinEffect(500);

      setTimeout(() => {
        const newScore = score + 1;
        setScore(newScore);
        if (newScore >= requiredWins) {
          onComplete();
        } else {
          generateQuestion();
        }
      }, 1500);
    } else {
      speak("Chưa đúng rồi, hãy thử lại");
      setFeedback("wrong");
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  if (!target) return <Loading />;

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl px-4">
      {/* Target Word Display */}
      <div
        onClick={() => speak(`Vần của ${target.name} là gì?`)}
        className={`relative w-56 h-56 md:w-72 md:h-72 flex flex-col items-center justify-center p-8 bg-white rounded-[3rem] border-4 shadow-2xl gap-6 transition-all duration-300 cursor-pointer
          ${
            feedback === "correct"
              ? "border-emerald-400 bg-emerald-50 shadow-emerald-100"
              : feedback === "wrong"
                ? "border-orange-400 bg-orange-50 animate-shake"
                : "border-blue-400"
          }
      `}
      >
        <div className="relative w-32 h-32 md:w-44 md:h-44 transition-transform duration-500 flex items-center justify-center">
          {target.image ? (
            <Image src={target.image} alt={target.name} fill className="object-contain drop-shadow-md" />
          ) : (
            <span className="text-5xl md:text-6xl font-black text-blue-400 drop-shadow-md select-none">
              {target.name}
            </span>
          )}
        </div>

        {feedback === "correct" && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-full animate-ping rounded-[3rem] bg-emerald-100 opacity-20" />
          </div>
        )}
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 w-full max-w-2xl justify-items-center mt-4">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => handleOptionClick(option)}
            className={`
              relative w-32 h-24 sm:w-40 sm:h-28 md:w-48 md:h-32 rounded-3xl shadow-lg border-4 bg-white
              flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95
              ${feedback === "wrong" ? "opacity-30 grayscale" : ""}
              ${feedback === "correct" && option.syllable === target.syllable ? "border-emerald-500 scale-110 shadow-emerald-200 bg-emerald-50" : "border-gray-200"}
            `}
          >
            <span className="text-4xl md:text-6xl font-black text-emerald-600 select-none">{option.syllable}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
