"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import Image from "next/image";
import { EnglishWord } from "./constants";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { CheckCircle2, XCircle } from "lucide-react";

interface EnglishQuizLessonProps {
  words: EnglishWord[];
  onComplete: () => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function EnglishQuizLesson({ words, onComplete }: EnglishQuizLessonProps) {
  const [currentRound, setCurrentRound] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hasMistake, setHasMistake] = useState(false);
  const [score, setScore] = useState(0);
  const requiredRounds = Math.min(words.length, 15);
  const { speak: speakEn } = useTextToSpeech("en-US");
  const { speak: speakVi } = useTextToSpeech("vi-VN");

  useEffect(() => {
    speakVi("Bé hãy chọn từ tiếng anh đúng với hình ảnh nhé");
  }, [speakVi]);

  const rounds = useMemo(() => {
    const shuffled = shuffleArray(words);
    return shuffled.slice(0, requiredRounds).map((correctWord) => {
      const others = shuffleArray(words.filter((w) => w.id !== correctWord.id)).slice(0, 3);
      const options = shuffleArray([correctWord.english, ...others.map((o) => o.english)]);
      return { correctWord, options };
    });
  }, [words, requiredRounds]);

  const round = rounds[currentRound];

  const handleSelect = useCallback(
    (option: string) => {
      if (feedback) return;
      setSelectedId(option);
      const isCorrect = option === round.correctWord.english;
      setFeedback(isCorrect ? "correct" : "wrong");

      if (isCorrect) {
        speakVi("Đúng rồi, giỏi quá!");
        if (!hasMistake) {
          setScore((prev) => prev + 1);
        }
        setTimeout(() => {
          setFeedback(null);
          setSelectedId(null);
          setHasMistake(false);
          if (currentRound < requiredRounds - 1) {
            setCurrentRound((prev) => prev + 1);
          } else {
            onComplete();
          }
        }, 1500);
      } else {
        speakVi("Sai rồi, thử lại nhé!");
        setHasMistake(true);
        setTimeout(() => {
          setFeedback(null);
          setSelectedId(null);
        }, 1500);
      }
    },
    [feedback, round, currentRound, requiredRounds, onComplete, hasMistake, speakEn]
  );

  if (!round) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4">
      {/* Progress */}
      <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
        <span>Câu {currentRound + 1}/{requiredRounds}</span>
        <span className="ml-4">⭐ {score}</span>
      </div>

      <div className="w-full max-w-xs h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-500"
          style={{ width: `${(currentRound / requiredRounds) * 100}%` }}
        />
      </div>

      {/* Question - Show image, ask for English word */}
      <div className="flex flex-col items-center gap-4">
        <p className="text-lg font-semibold text-gray-700">🤔 Đây là từ gì?</p>
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 bg-white rounded-3xl shadow-xl p-4 border-4 border-orange-200">
          <Image
            src={round.correctWord.image}
            alt={round.correctWord.vietnamese}
            fill
            className="object-contain p-3"
            sizes="(max-width: 640px) 160px, 192px"
          />
        </div>
        <p className="text-gray-500">{round.correctWord.vietnamese}</p>
      </div>

      {/* Answer options */}
      <div className="grid grid-cols-2 gap-3 max-w-sm w-full">
        {round.options.map((option) => {
          const isCorrectOption = option === round.correctWord.english;
          const isSelected = selectedId === option;

          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              disabled={feedback !== null}
              className={`
                relative py-4 px-3 rounded-2xl border-3 text-center font-bold text-lg
                transition-all duration-300
                ${feedback === null ? "bg-white hover:bg-blue-50 hover:scale-105 border-gray-200 cursor-pointer shadow-md" : "cursor-default"}
                ${feedback === "correct" && isSelected ? "bg-green-100 border-green-500 scale-105 text-green-700" : ""}
                ${feedback === "wrong" && isSelected ? "bg-red-100 border-red-400 text-red-600 animate-shake" : ""}
                ${feedback !== null && !isSelected ? "opacity-40" : ""}
              `}
            >
              {option}
              {feedback === "correct" && isCorrectOption && (
                <CheckCircle2 className="absolute -top-2 -right-2 w-7 h-7 text-green-500 fill-white" />
              )}
              {feedback === "wrong" && isSelected && !isCorrectOption && (
                <XCircle className="absolute -top-2 -right-2 w-7 h-7 text-red-400 fill-white" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
