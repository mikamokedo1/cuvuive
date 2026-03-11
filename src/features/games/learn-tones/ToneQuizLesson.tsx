"use client";

import { useState, useEffect, useRef } from "react";
import { ToneWord, WORDS_BY_TONE } from "./constants";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { getRandomItem } from "@/libs/utils/randomQuestion";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import Image from "next/image";
import { playButtonSound } from "@/libs/utils/playSound";
import { FeedbackType } from "@/types/game";
import Loading from "@/components/common/Loading";

interface ToneQuizLessonProps {
  words: ToneWord[];
  onComplete: () => void;
  requiredWins?: number;
}

export function ToneQuizLesson({ words, onComplete, requiredWins = 6 }: ToneQuizLessonProps) {
  const { speak } = useTextToSpeech();
  const [targetWord, setTargetWord] = useState<ToneWord | null>(null);
  const prevTargetRef = useRef<ToneWord | null>(null);
  const [options, setOptions] = useState<ToneWord[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackType>(null);

  // Generate new question
  const generateQuestion = () => {
    if (!words || words.length === 0) return;

    // Pick a random target
    const target = getRandomItem(words, prevTargetRef.current);
    prevTargetRef.current = target;

    // Use ALL available game words to pick distractors from DIFFERENT tones
    let distractorPool = WORDS_BY_TONE.filter((w) => w.tone !== target.tone);

    distractorPool = distractorPool.sort(() => Math.random() - 0.5);

    const selectedDistractors: ToneWord[] = [];
    for (const w of distractorPool) {
      if (!selectedDistractors.some((d) => d.tone === w.tone)) {
        selectedDistractors.push(w);
      }
      if (selectedDistractors.length >= 2) break; // we need 2 distractors
    }

    const newOptions = [target, ...selectedDistractors].sort(() => Math.random() - 0.5);

    setTargetWord(target);
    setOptions(newOptions);
    setFeedback(null);

    // Auto speak question after a short delay
    setTimeout(() => {
      speak(`Từ ${target.name} mang dấu gì?`);
    }, 1000);
  };

  useEffect(() => {
    generateQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words]);

  const handleOptionClick = (selected: ToneWord) => {
    if (!targetWord) return;
    if (feedback === "correct") return;

    playButtonSound();

    if (selected.id === targetWord.id) {
      const toneNames: Record<string, string> = {
        ngang: "ngang",
        sac: "sắc",
        huyen: "huyền",
        hoi: "hỏi",
        nga: "ngã",
        nang: "nặng",
      };
      speak(`Đúng rồi, ${targetWord.name} có thanh ${toneNames[targetWord.tone]}`);
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

  if (!targetWord) return <Loading />;

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
      {/* Target Word Display */}
      <div
        onClick={() => speak(`Từ ${targetWord.name} mang dấu gì?`)}
        className={`relative w-48 h-48 md:w-64 md:h-64 flex flex-col items-center justify-center p-6 bg-white rounded-3xl border-4 shadow-xl gap-4 transition-colors duration-300
          ${
            feedback === "correct"
              ? "border-green-400 bg-green-50 shadow-green-200"
              : feedback === "wrong"
                ? "border-orange-400 bg-orange-50 animate-shake"
                : "border-blue-400"
          }
      `}
      >
        <div
          className={`relative w-24 h-24 md:w-32 md:h-32 transition-all duration-700 ease-out ${
            feedback === "correct" ? "opacity-100 scale-100" : "opacity-90 scale-95"
          }`}
        >
          <Image src={targetWord.image} alt={targetWord.name} fill className="object-contain" />
        </div>

        <div
          onClick={(e) => {
            e.stopPropagation();
            speak(targetWord?.spelling ?? "");
          }}
          className=" animate-scale shrink-0 text-4xl md:text-5xl font-black leading-[70px] text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-center"
        >
          {targetWord!.name}
        </div>

        {feedback === "correct" && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-full animate-ping rounded-3xl bg-green-100 opacity-20" />
          </div>
        )}
      </div>

      {/* Tone Options */}
      <div className="grid grid-cols-3 gap-6 md:gap-10 w-full max-w-xl justify-items-center mt-4">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => handleOptionClick(option)}
            className={`
              relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-3xl shadow-lg border-4 bg-white
              flex flex-col items-center justify-center cursor-pointer p-2
              transform transition-all duration-200 hover:scale-110 active:scale-95
              ${feedback === "wrong" ? "opacity-30 grayscale" : ""}
              ${feedback === "correct" && option.id === targetWord.id ? "border-green-500 scale-110 shadow-green-200 bg-green-50" : "border-gray-200"}
            `}
          >
            <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 select-none">
              {option.toneSymbol}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
