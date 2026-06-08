"use client";

import { useState, useEffect, useRef } from "react";
import { LetterData } from "./constants";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { getRandomItem } from "@/libs/utils/randomQuestion";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import Image from "next/image";
import { playButtonSound } from "@/libs/utils/playSound";
import { FeedbackType } from "@/types/game";
import { LoudSpeaker } from "@/libs/constants/game-assets";
import { ActionButton } from "@/components/common/ActionButton";

const MAP_INDEX_TO_COLOR = ["blue", "green", "orange", "purple"] as const;

interface AlphabetQuizLessonProps {
  letters: LetterData[];
  onComplete: () => void;
  requiredWins?: number;
}

export function AlphabetQuizLesson({ letters, onComplete, requiredWins = 6 }: AlphabetQuizLessonProps) {
  const { speak } = useTextToSpeech();
  const [targetLetter, setTargetLetter] = useState<LetterData | null>(null);
  const prevTargetRef = useRef<LetterData | null>(null);
  const [options, setOptions] = useState<LetterData[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Generate new question
  const generateQuestion = () => {
    if (letters.length < 2) return;

    const target = getRandomItem(letters, prevTargetRef.current);
    prevTargetRef.current = target;

    let distractorPool = letters.filter((l) => l.id !== target.id);
    distractorPool = distractorPool.sort(() => Math.random() - 0.5);

    const optionsCount = Math.min(2, distractorPool.length);
    const selectedDistractors = distractorPool.slice(0, optionsCount);

    const newOptions = [target, ...selectedDistractors].sort(() => Math.random() - 0.5);

    setTargetLetter(target);
    setOptions(newOptions);
    setFeedback(null);
    setSelectedId(null);

    // Auto speak question after a short delay
    setTimeout(() => {
      speak(`${target.word} có chữ gì?`);
    }, 1000);
  };

  useEffect(() => {
    generateQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letters]);

  const handleOptionClick = (selected: LetterData) => {
    if (!targetLetter) return;
    if (feedback === "correct") return;

    playButtonSound();
    setSelectedId(selected.id);

    if (selected.id === targetLetter.id) {
      speak(`Đúng rồi, ${targetLetter.word} có chữ ${targetLetter.letter}`);
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
      speak("Sai rồi, thử lại nhé");
      setFeedback("wrong");
      setTimeout(() => {
        setFeedback(null);
        setSelectedId(null);
      }, 1000);
    }
  };

  if (!targetLetter) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
      {/* Target Image Display */}
      <div
        className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center"
        onClick={() => speak(`${targetLetter.word} có chữ gì?`)}
      >
        <div
          className={`absolute inset-0 bg-gray-100 rounded-3xl border-4 border-gray-300 shadow-inner
          ${
            feedback === "correct"
              ? "border-green-400 bg-green-50"
              : feedback === "wrong"
                ? "border-red-400 bg-red-50 animate-shake"
                : "border-dashed"
          }
        `}
        />
        <div
          className={`relative w-3/4 h-3/4 transition-all duration-700 ease-out ${
            feedback === "correct" ? "opacity-100 scale-100" : "opacity-90 scale-95"
          }`}
        >
          <Image src={targetLetter.image} alt={targetLetter.word} fill className="object-contain hover:scale-105" />
        </div>

        {feedback === "correct" && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-full animate-ping rounded-3xl bg-green-100 opacity-20" />
          </div>
        )}
      </div>

      {/* Letter Options */}
      <div className="grid grid-cols-3 gap-6 md:gap-10 w-full max-w-xl justify-items-center mt-4">
        {options.map((option, index) => {
          const isSelected = selectedId === option.id;
          const isCorrectAnswer = option.id === targetLetter.id;

          // Determine button color based on response feedback
          let btnColor: "green" | "orange" | "purple" | "blue" | "red" = MAP_INDEX_TO_COLOR[index % MAP_INDEX_TO_COLOR.length];
          if (feedback === "wrong" && isSelected) {
            btnColor = "red";
          } else if (feedback === "correct" && isCorrectAnswer) {
            btnColor = "green";
          }

          return (
            <ActionButton
              key={option.id}
              onClick={() => handleOptionClick(option)}
              disabled={feedback !== null}
              variant="glossy"
              color={btnColor}
              size="auto"
              clickPlaySound={false}
              className={`
                relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-3xl text-center font-black text-5xl
                font-display text-white transition-all duration-300
                ${feedback === null ? "hover:scale-110" : "cursor-default"}
                ${feedback === "correct" && isCorrectAnswer ? "scale-110 shadow-green-200 shadow-xl" : ""}
                ${feedback === "wrong" && isSelected ? "animate-shake shadow-red-200 shadow-lg" : ""}
                ${feedback === "correct" && !isCorrectAnswer ? "opacity-40 scale-95" : ""}
                ${feedback === "wrong" && !isSelected ? "opacity-40 scale-95" : ""}
              `}
            >
              <span className="drop-shadow-md">{option.id}</span>
            </ActionButton>
          );
        })}
      </div>
    </div>
  );
}
