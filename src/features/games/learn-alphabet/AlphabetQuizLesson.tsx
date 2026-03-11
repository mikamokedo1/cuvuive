"use client";

import { useState, useEffect, useRef } from "react";
import { LetterData } from "./constants";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { getRandomItem } from "@/libs/utils/randomQuestion";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import Image from "next/image";
const LoudSpeaker = "https://assets.cuthongminh.com/games/loud-speaker.webp";
import { playButtonSound } from "@/libs/utils/playSound";
import { FeedbackType } from "@/types/game";

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

    // Auto speak question after a short delay
    setTimeout(() => {
      speak(`${target.word} bắt đầu bằng chữ gì?`);
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

    if (selected.id === targetLetter.id) {
      speak(`Đúng rồi, ${targetLetter.word} bắt đầu bằng chữ ${targetLetter.letter}`);
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
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  if (!targetLetter) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
      {/* Target Image Display */}
      <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
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

      {/* Question - Speaker */}
      <div className="flex flex-col items-center gap-4 text-center">
        <button
          onClick={() => speak(`${targetLetter.word} bắt đầu bằng chữ gì?`)}
          className="cursor-pointer hover:scale-105 transition-all"
        >
          <Image width={48} height={40} src={LoudSpeaker} alt="Speaker" className="w-12 h-10" />
        </button>
      </div>

      {/* Letter Options */}
      <div className="grid grid-cols-3 gap-6 md:gap-10 w-full max-w-xl justify-items-center mt-4">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => handleOptionClick(option)}
            className={`
              relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-3xl shadow-lg border-4 bg-white
              flex items-center justify-center cursor-pointer
              transform transition-all duration-200 hover:scale-110 active:scale-95
              ${feedback === "wrong" ? "opacity-30 grayscale" : ""}
              ${feedback === "correct" && option.id === targetLetter.id ? "border-green-500 scale-110 shadow-green-200" : "border-white"}
            `}
          >
            <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 select-none">
              {option.id}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
