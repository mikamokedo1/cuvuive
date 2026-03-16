"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { EntityData, FeedbackType } from "@/types/game";
import { BodyAction, BODY_ITEMS } from "./constants";
import Image from "next/image";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { playWrongSound } from "@/libs/utils/playSound";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { getRandomItem } from "@/libs/utils/randomQuestion";
import { LoudSpeaker } from "@/libs/constants/game-assets";

interface BodyActionLessonProps {
  actions: BodyAction[];
  onComplete: () => void;
  requiredWins?: number;
}

export function BodyActionLesson({ actions, onComplete, requiredWins = 6 }: BodyActionLessonProps) {
  const { speak } = useTextToSpeech();
  const [currentAction, setCurrentAction] = useState<BodyAction | null>(null);
  const prevActionRef = useRef<BodyAction | null>(null);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const generateQuestion = useCallback(() => {
    const newAction = getRandomItem(actions, prevActionRef.current, (a) => a.question);
    prevActionRef.current = newAction;

    // Shuffle options
    const shuffledOptions = [...newAction.options].sort(() => Math.random() - 0.5);
    setCurrentAction({ ...newAction, options: shuffledOptions });
    setFeedback(null);
    setSelectedOption(null);

    setTimeout(() => {
      speak(newAction.question);
    }, 800);
  }, [actions, speak]);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const handleOptionClick = useCallback(
    (bodyId: string) => {
      if (!currentAction || feedback === "correct") return;

      setSelectedOption(bodyId);
      const selectedPart = BODY_ITEMS.find((b) => b.id === bodyId);

      if (bodyId === currentAction.correctBodyId) {
        setFeedback("correct");
        playWinEffect(0);
        speak(`Đúng rồi! Pé dùng ${selectedPart?.name ?? ""}`);

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
        playWrongSound();
        speak(`Đây là ${selectedPart?.name ?? ""}, chưa đúng rồi!`);

        setTimeout(() => {
          setFeedback(null);
          setSelectedOption(null);
        }, 1500);
      }
    },
    [currentAction, feedback, score, requiredWins, onComplete, generateQuestion, speak],
  );

  if (!currentAction) return null;

  return (
    <div className="flex flex-col items-center gap-6 md:gap-8 w-full max-w-4xl px-4">
      {/* Question banner */}
      <div
        className="w-full max-w-md bg-gradient-to-r from-purple-50 to-pink-50 border-4 border-purple-200 rounded-3xl p-6 shadow-lg cursor-pointer hover:bg-purple-100/50 transition-colors relative"
        onClick={() => speak(currentAction.question)}
      >
        {/* Speech bubble tail */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-purple-50 border-l-4 border-t-4 border-purple-200 rotate-45" />

        <div className="flex items-center gap-4">
          <Image width={40} height={32} src={LoudSpeaker} alt="Nghe lại" className="w-10 h-8 shrink-0" />
          <p className="text-lg md:text-xl font-bold text-purple-800 leading-relaxed">{currentAction.question}</p>
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-3 gap-4 md:gap-6 w-full max-w-2xl">
        {currentAction.options.map((bodyId) => {
          const bodyPart = BODY_ITEMS.find((b) => b.id === bodyId);
          if (!bodyPart) return null;

          const isSelected = selectedOption === bodyId;
          const isCorrect = bodyId === currentAction.correctBodyId;

          let cardClass = "border-white hover:border-purple-400 hover:scale-105 active:scale-95";
          if (feedback === "correct" && isCorrect) {
            cardClass = "border-green-500 scale-110 ring-4 ring-green-200 shadow-green-200";
          } else if (feedback === "wrong" && isSelected) {
            cardClass = "border-red-400 animate-shake";
          } else if (feedback === "wrong" && !isSelected) {
            cardClass = "opacity-40";
          }

          return (
            <button
              key={bodyId}
              onClick={() => handleOptionClick(bodyId)}
              disabled={feedback !== null}
              className={`relative flex flex-col items-center gap-2 p-3 md:p-4 rounded-3xl bg-white shadow-xl border-4 cursor-pointer transition-all duration-300 ${cardClass}`}
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
                <Image
                  src={bodyPart.image}
                  alt={bodyPart.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 80px, 112px"
                />
              </div>
              <span className="font-bold text-sm md:text-base text-gray-700">{bodyPart.name}</span>

              {feedback === "correct" && isCorrect && (
                <div className="absolute -top-3 -right-3 text-2xl animate-bounce">⭐</div>
              )}
            </button>
          );
        })}
      </div>

      {/* Score */}
      <div className="flex items-center gap-1">
        {Array.from({ length: score }).map((_, i) => (
          <span key={i} className="text-xl">
            ⭐
          </span>
        ))}
        {Array.from({ length: requiredWins - score }).map((_, i) => (
          <span key={i} className="text-xl opacity-20">
            ⭐
          </span>
        ))}
      </div>
    </div>
  );
}
