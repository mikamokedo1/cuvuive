"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import Image from "next/image";
import { EnglishWord } from "./constants";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { Volume2, CheckCircle2, XCircle } from "lucide-react";

interface EnglishListenQuizLessonProps {
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

export function EnglishListenQuizLesson({ words, onComplete }: EnglishListenQuizLessonProps) {
  const [currentRound, setCurrentRound] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hasMistake, setHasMistake] = useState(false);
  const [score, setScore] = useState(0);
  const requiredRounds = Math.min(words.length, 15);
  const { speak: speakEn } = useTextToSpeech("en-US");
  const { speak: speakVi } = useTextToSpeech("vi-VN");

  const rounds = useMemo(() => {
    const shuffledWords = shuffleArray(words);
    return shuffledWords.slice(0, requiredRounds).map((correctWord) => {
      const otherWords = shuffleArray(words.filter((w) => w.id !== correctWord.id)).slice(0, 3);
      const options = shuffleArray([correctWord, ...otherWords]);
      return { correctWord, options };
    });
  }, [words, requiredRounds]);

  const round = rounds[currentRound];

  useEffect(() => {
    if (!round) return;

    if (currentRound === 0) {
      speakVi("Bé hãy nghe và chọn hình ảnh đúng nhé");

      const timeout = setTimeout(() => {
        speakEn(round.correctWord.english);
      }, 3000);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        speakEn(round.correctWord.english);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentRound, round, speakEn, speakVi]);

  const handleSelect = useCallback(
    (id: string) => {
      if (feedback) return;

      setSelectedId(id);
      const isCorrect = id === round.correctWord.id;
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
        setTimeout(() => {
          setFeedback(null);
          setSelectedId(null);
        }, 1500);
      }
    },
    [feedback, round, currentRound, requiredRounds, onComplete, hasMistake, speakEn]
  );

  const handleReplay = useCallback(() => {
    if (round) {
      speakEn(round.correctWord.english);
    }
  }, [round, speakEn]);

  if (!round) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4">
      {/* Progress */}
      <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
        <span>Câu {currentRound + 1}/{requiredRounds}</span>
        <span className="ml-4">⭐ {score}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-xs h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-emerald-600 rounded-full transition-all duration-500"
          style={{ width: `${(currentRound / requiredRounds) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="text-center space-y-3">
        <p className="text-lg font-semibold text-gray-700">🎧 Nghe và chọn hình đúng</p>
        <button
          onClick={handleReplay}
          className="flex items-center gap-2 mx-auto bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          <Volume2 className="w-6 h-6" />
          <span className="font-bold text-lg">Nghe lại</span>
        </button>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-2 gap-4 max-w-md w-full">
        {round.options.map((option) => {
          const isCorrectOption = option.id === round.correctWord.id;
          const isSelected = selectedId === option.id;
          const showCorrect = feedback === "correct" && isCorrectOption;
          const showWrong = feedback === "wrong" && isSelected;

          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={feedback !== null}
              className={`
                relative bg-white rounded-2xl shadow-lg border-3 p-4 flex flex-col items-center gap-2
                transition-all duration-300 
                ${feedback === null ? "hover:scale-105 hover:shadow-xl border-gray-200 cursor-pointer" : "cursor-default"}
                ${showCorrect ? "border-green-500 bg-green-50 scale-105" : ""}
                ${showWrong ? "border-red-400 bg-red-50 animate-shake" : ""}
                ${feedback !== null && !isSelected && !showCorrect ? "opacity-50" : ""}
              `}
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                <Image
                  src={option.image}
                  alt={option.vietnamese}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 80px, 96px"
                />
              </div>
              <p className="text-sm font-medium text-gray-600">{option.vietnamese}</p>

              {/* Feedback icon */}
              {showCorrect && (
                <div className="absolute -top-2 -right-2">
                  <CheckCircle2 className="w-8 h-8 text-green-500 fill-white" />
                </div>
              )}
              {showWrong && (
                <div className="absolute -top-2 -right-2">
                  <XCircle className="w-8 h-8 text-red-500 fill-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
