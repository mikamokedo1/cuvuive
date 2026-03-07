"use client";

import { useState, useEffect, useRef } from "react";
import { OccupationData } from "./constants";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { getRandomItem } from "@/libs/utils/randomQuestion";
import { playButtonSound } from "@/libs/utils/playSound";
import Image from "next/image";
import LoudSpeaker from "@/assets/games/loud-speaker.webp";
import { FeedbackType } from "@/types/game";

interface OccupationMatchLessonProps {
  occupations: OccupationData[];
  onComplete: () => void;
  requiredWins?: number;
}

export function OccupationMatchLesson({ occupations, onComplete, requiredWins = 6 }: OccupationMatchLessonProps) {
  const { speak } = useTextToSpeech();
  const [targetOccupation, setTargetOccupation] = useState<OccupationData | null>(null);
  const prevTargetRef = useRef<OccupationData | null>(null);
  const [toolOptions, setToolOptions] = useState<OccupationData[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const generateQuestion = () => {
    if (occupations.length < 2) return;

    const target = getRandomItem(occupations, prevTargetRef.current);
    prevTargetRef.current = target;

    let distractorPool = occupations.filter((o) => o.id !== target.id);
    distractorPool = distractorPool.sort(() => Math.random() - 0.5);

    const optionsCount = Math.min(2, distractorPool.length);
    const selectedDistractors = distractorPool.slice(0, optionsCount);

    const newOptions = [target, ...selectedDistractors].sort(() => Math.random() - 0.5);

    setTargetOccupation(target);
    setToolOptions(newOptions);
    setFeedback(null);
    setSelectedId(null);

    setTimeout(() => {
      speak(`${target.name} dùng dụng cụ gì?`);
    }, 1000);
  };

  useEffect(() => {
    generateQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [occupations]);

  const handleToolClick = (selected: OccupationData) => {
    if (!targetOccupation) return;
    if (feedback === "correct") return;

    playButtonSound();
    setSelectedId(selected.id);

    if (selected.id === targetOccupation.id) {
      speak(`Đúng rồi! ${targetOccupation.name} dùng ${selected.toolName}`);
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
      }, 3000);
    } else {
      speak("Sai rồi, thử lại nhé!");
      setFeedback("wrong");
      setTimeout(() => {
        setFeedback(null);
        setSelectedId(null);
      }, 1000);
    }
  };

  if (!targetOccupation) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl px-4">
      {/* Target Occupation */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-40 h-40 md:w-52 md:h-52 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl border-4 border-blue-200 shadow-lg p-4">
          <Image src={targetOccupation.image} alt={targetOccupation.name} fill className="object-contain p-2" />
        </div>

        {/* Question */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => speak(`${targetOccupation.name} dùng dụng cụ gì?`)}
            className="cursor-pointer hover:scale-105 transition-all"
          >
            <Image src={LoudSpeaker} alt="Speaker" className="w-10 h-8" />
          </button>
        </div>
      </div>

      {/* Tool Options */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-10 w-full max-w-3xl justify-items-center mt-8">
        {toolOptions.map((option) => {
          const isSelected = selectedId === option.id;
          const isCorrectAnswer = feedback === "correct" && option.id === targetOccupation.id;
          const isWrongAnswer = feedback === "wrong" && isSelected;

          return (
            <div
              key={option.id}
              onClick={() => handleToolClick(option)}
              className={`
                relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-3xl shadow-lg border-4 bg-white
                flex flex-col items-center justify-center p-3 cursor-pointer
                transform transition-all duration-200 hover:scale-110 active:scale-95
                ${isCorrectAnswer ? "border-green-500 scale-110 shadow-green-200 bg-green-50" : ""}
                ${isWrongAnswer ? "border-red-400 bg-red-50 animate-shake" : ""}
                ${!isSelected && !isCorrectAnswer ? "border-gray-200 hover:border-blue-300" : ""}
                ${feedback === "wrong" && !isSelected ? "opacity-40" : ""}
              `}
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
                <Image src={option.toolImage} alt={option.toolName} fill className="object-contain" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
