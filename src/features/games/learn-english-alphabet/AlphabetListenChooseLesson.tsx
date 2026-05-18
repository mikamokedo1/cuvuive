"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { AlphabetWord } from "./constants";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { CheckCircle2, XCircle, Volume2 } from "lucide-react";

interface AlphabetListenChooseLessonProps {
  words: AlphabetWord[];
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

export function AlphabetListenChooseLesson({ words, onComplete }: AlphabetListenChooseLessonProps) {
  const [currentRound, setCurrentRound] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const requiredRounds = Math.min(words.length, 6);
  const { speak: speakEn } = useTextToSpeech("en-US");
  const { speak: speakVi } = useTextToSpeech("vi-VN");

  const rounds = useMemo(() => {
    const shuffled = shuffleArray(words);
    return shuffled.slice(0, requiredRounds).map((correctWord) => {
      const others = shuffleArray(words.filter((w) => w.id !== correctWord.id)).slice(0, 3);
      const options = shuffleArray([correctWord.letter, ...others.map((o) => o.letter)]);
      return { correctWord, options };
    });
  }, [words, requiredRounds]);

  const round = rounds[currentRound];

  useEffect(() => {
    // Read the instruction on mount
    const timeout = setTimeout(() => {
      speakVi("Hãy nghe và chọn chữ cái đúng.");
    }, 500);
    return () => clearTimeout(timeout);
  }, [speakVi]);

  useEffect(() => {
    if (round) {
      // Delay longer on the first round to wait for the Vietnamese instruction
      const delay = currentRound === 0 ? 3000 : 500;
      const timeout = setTimeout(() => {
        speakEn(round.correctWord.letter);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentRound, round, speakEn]);

  const handleSelect = useCallback(
    (option: string) => {
      if (feedback) return;
      setSelectedId(option);
      const isCorrect = option === round.correctWord.letter;
      setFeedback(isCorrect ? "correct" : "wrong");
      if (isCorrect) {
        speakVi("Đúng rồi, giỏi quá!");
        setScore((prev) => prev + 1);
      } else {
        speakVi("Sai rồi, thử lại nhé!");
      }

      setTimeout(() => {
        setFeedback(null);
        setSelectedId(null);
        if (isCorrect) {
          if (currentRound < requiredRounds - 1) {
            setCurrentRound((prev) => prev + 1);
          } else {
            onComplete();
          }
        }
      }, 1200);
    },
    [feedback, round, currentRound, requiredRounds, onComplete, speakEn]
  );

  if (!round) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 px-4">
      {/* Progress */}
      <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
        <span>Câu {currentRound + 1}/{requiredRounds}</span>
        <span className="ml-4">⭐ {score}</span>
      </div>

      <div className="w-full max-w-xs h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500"
          style={{ width: `${(currentRound / requiredRounds) * 100}%` }}
        />
      </div>

      {/* Question - Audio Player */}
      <div className="flex flex-col items-center gap-6 text-center">
        <p 
          className="text-xl font-bold text-gray-700 cursor-pointer hover:text-blue-500 transition-colors"
          onClick={() => speakVi("Hãy nghe và chọn chữ cái đúng.")}
        >
          🎧 Hãy nghe và chọn chữ cái đúng
        </p>
        
        <button
          onClick={() => speakEn(round.correctWord.letter)}
          className="relative w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all group"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-full transition-opacity" />
          <Volume2 className="w-16 h-16 sm:w-20 sm:h-20 text-white drop-shadow-md" />
          
          {/* Sound waves animation */}
          <div className="absolute inset-0 rounded-full border-4 border-blue-400 opacity-0 group-hover:animate-ping" />
        </button>
        <p className="text-gray-500 font-medium">Chạm loa để nghe lại</p>
      </div>

      {/* Answer options */}
      <div className="grid grid-cols-2 gap-4 max-w-sm w-full">
        {round.options.map((option) => {
          const isCorrectOption = option === round.correctWord.letter;
          const isSelected = selectedId === option;

          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              disabled={feedback !== null}
              className={`
                relative py-6 px-4 rounded-3xl border-4 text-center font-black text-5xl
                transition-all duration-300
                ${feedback === null ? "bg-white hover:bg-blue-50 hover:scale-105 border-gray-200 cursor-pointer shadow-lg" : "cursor-default"}
                ${feedback === "correct" && isSelected ? "bg-green-100 border-green-500 scale-105 text-green-700 shadow-green-200 shadow-xl" : ""}
                ${feedback === "wrong" && isSelected ? "bg-red-100 border-red-400 text-red-600 animate-shake shadow-red-200 shadow-lg" : ""}
                ${feedback !== null && !isSelected ? "opacity-40 scale-95" : ""}
              `}
            >
              {option}
              {feedback === "correct" && isCorrectOption && (
                <CheckCircle2 className="absolute -top-3 -right-3 w-10 h-10 text-green-500 bg-white rounded-full p-1 shadow-md" />
              )}
              {feedback === "wrong" && isSelected && (
                <XCircle className="absolute -top-3 -right-3 w-10 h-10 text-red-500 bg-white rounded-full p-1 shadow-md" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
