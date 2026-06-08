"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import Image from "next/image";
import { AlphabetWord } from "./constants";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { CheckCircle2, XCircle } from "lucide-react";
import { ActionButton } from "@/components/common/ActionButton";

const MAP_INDEX_TO_COLOR = ["blue", "green", "orange", "purple"] as const;

interface AlphabetQuizLessonProps {
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

export function AlphabetQuizLesson({ words, onComplete }: AlphabetQuizLessonProps) {
  const [currentRound, setCurrentRound] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const requiredRounds = Math.min(words.length, 6);
  const { speak: speakEn } = useTextToSpeech("en-US");
  const { speak: speakVi } = useTextToSpeech("vi-VN");

  useEffect(() => {
    // Read the instruction on mount
    const timeout = setTimeout(() => {
      speakVi("Đâu là chữ cái bắt đầu của từ này?");
    }, 500);
    return () => clearTimeout(timeout);
  }, [speakVi]);

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
    if (round) {
      // Delay longer on the first round to wait for the Vietnamese instruction
      const delay = currentRound === 0 ? 3000 : 500;
      const timeout = setTimeout(() => {
        speakVi(round.correctWord.vietnamese);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentRound, round, speakVi]);

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

      {/* Question */}
      <div 
        className="flex flex-col items-center gap-4 text-center cursor-pointer group"
        onClick={() => speakVi(round.correctWord.vietnamese)}
      >
        <p 
          className="text-lg font-semibold text-gray-700 group-hover:text-blue-500 transition-colors cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            speakVi("Đâu là chữ cái bắt đầu của từ này?");
          }}
        >
          🤔 Đâu là chữ cái bắt đầu của từ này?
        </p>
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 bg-white rounded-3xl shadow-xl p-4 border-4 border-orange-200 transition-transform duration-300 group-hover:scale-105">
          <Image
            src={round.correctWord.image}
            alt={round.correctWord.word}
            fill
            className="object-contain p-3"
            sizes="(max-width: 640px) 160px, 192px"
          />
        </div>
        <div className="space-y-1 transition-transform duration-300 group-hover:scale-105">
            <p className="text-2xl font-bold text-blue-600 group-hover:text-blue-500 transition-colors capitalize">{round.correctWord.vietnamese}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-sm w-full">
        {round.options.map((option, index) => {
          const isCorrectOption = option === round.correctWord.letter;
          const isSelected = selectedId === option;

          // Determine button color based on response feedback
          let btnColor: "green" | "orange" | "purple" | "blue" | "red" = MAP_INDEX_TO_COLOR[index % MAP_INDEX_TO_COLOR.length];
          if (feedback === "wrong" && isSelected) {
            btnColor = "red";
          } else if (feedback === "correct" && isSelected) {
            btnColor = "green";
          }

          return (
            <ActionButton
              key={option}
              onClick={() => handleSelect(option)}
              disabled={feedback !== null}
              variant="glossy"
              color={btnColor}
              size="auto"
              clickPlaySound={false}
              className={`
                relative w-full py-6 rounded-3xl text-center font-black text-5xl
                font-display text-white transition-all duration-300
                ${feedback === null ? "hover:scale-105" : "cursor-default"}
                ${feedback === "correct" && isSelected ? "scale-105 shadow-green-200 shadow-xl" : ""}
                ${feedback === "wrong" && isSelected ? "animate-shake shadow-red-200 shadow-lg" : ""}
                ${feedback !== null && !isSelected ? "opacity-40 scale-95" : ""}
              `}
            >
              <span className="drop-shadow-md">{option}</span>
              {feedback === "correct" && isCorrectOption && (
                <CheckCircle2 className="absolute -top-3 -right-3 w-10 h-10 text-green-500 bg-white rounded-full p-1 shadow-md z-10 animate-scale" />
              )}
              {feedback === "wrong" && isSelected && (
                <XCircle className="absolute -top-3 -right-3 w-10 h-10 text-red-500 bg-white rounded-full p-1 shadow-md z-10 animate-scale" />
              )}
            </ActionButton>
          );
        })}
      </div>
    </div>
  );
}
