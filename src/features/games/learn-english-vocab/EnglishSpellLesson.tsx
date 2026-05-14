"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import Image from "next/image";
import { EnglishWord } from "./constants";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

interface EnglishSpellLessonProps {
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

export function EnglishSpellLesson({ words, onComplete }: EnglishSpellLessonProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState<{ letter: string; originalIndex: number }[]>([]);
  const [availableLetters, setAvailableLetters] = useState<{ letter: string; originalIndex: number; used: boolean }[]>([]);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const { speak: speakEn } = useTextToSpeech("en-US");
  const { speak: speakVi } = useTextToSpeech("vi-VN");

  const orderedWords = useMemo(() => {
    return shuffleArray(words).slice(0, Math.min(words.length, 6));
  }, [words]);

  const currentWord = orderedWords[currentIndex];

  // Initialize available letters when word changes
  useEffect(() => {
    if (!currentWord) return;
    const letters = currentWord.english.toUpperCase().split("");
    const shuffled = shuffleArray(
      letters.map((letter, index) => ({ letter, originalIndex: index, used: false }))
    );
    setAvailableLetters(shuffled);
    setSelectedLetters([]);
    setFeedback(null);

    // Auto speak
    if (currentIndex === 0) {
      speakVi("Bé hãy ghép các chữ cái thành từ đúng nhé");

      const timeout = setTimeout(() => {
        speakEn(currentWord.english);
      }, 3000);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        speakEn(currentWord.english);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, currentWord, speakEn, speakVi]);

  const handleSelectLetter = useCallback(
    (index: number) => {
      if (feedback) return;

      const letter = availableLetters[index];
      if (letter.used) return;

      const newSelected = [...selectedLetters, { letter: letter.letter, originalIndex: letter.originalIndex }];
      setSelectedLetters(newSelected);

      const newAvailable = [...availableLetters];
      newAvailable[index] = { ...newAvailable[index], used: true };
      setAvailableLetters(newAvailable);

      // Check if word is complete
      if (newSelected.length === currentWord.english.length) {
        const spelled = newSelected.map((s) => s.letter).join("");
        const correct = currentWord.english.toUpperCase();

        if (spelled === correct) {
          setFeedback("correct");
          speakEn(currentWord.english);
          setTimeout(() => {
            if (currentIndex < orderedWords.length - 1) {
              setCurrentIndex((prev) => prev + 1);
            } else {
              onComplete();
            }
          }, 1500);
        } else {
          setFeedback("wrong");
          setTimeout(() => {
            // Reset
            setSelectedLetters([]);
            const letters = currentWord.english.toUpperCase().split("");
            setAvailableLetters(
              shuffleArray(letters.map((l, i) => ({ letter: l, originalIndex: i, used: false })))
            );
            setFeedback(null);
          }, 1000);
        }
      }
    },
    [feedback, availableLetters, selectedLetters, currentWord, currentIndex, orderedWords.length, onComplete, speakEn]
  );

  const handleRemoveLetter = useCallback(
    (index: number) => {
      if (feedback) return;

      const removed = selectedLetters[index];
      const newSelected = selectedLetters.filter((_, i) => i !== index);
      setSelectedLetters(newSelected);

      // Un-use the letter
      const availableIndex = availableLetters.findIndex(
        (l) => l.originalIndex === removed.originalIndex && l.used
      );
      if (availableIndex >= 0) {
        const newAvailable = [...availableLetters];
        newAvailable[availableIndex] = { ...newAvailable[availableIndex], used: false };
        setAvailableLetters(newAvailable);
      }
    },
    [feedback, selectedLetters, availableLetters]
  );

  if (!currentWord) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5 px-4">
      {/* Progress */}
      <div className="text-sm font-medium text-gray-500">
        {currentIndex + 1} / {orderedWords.length}
      </div>

      <div className="w-full max-w-xs h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full transition-all duration-500"
          style={{ width: `${(currentIndex / orderedWords.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="text-center mt-2 mb-1">
        <p className="text-lg font-semibold text-gray-700">🧩 Ghép các chữ cái thành từ đúng</p>
      </div>

      {/* Image + Vietnamese hint */}
      <div className="flex flex-col items-center gap-3">
        <div
          className="relative w-32 h-32 sm:w-40 sm:h-40 cursor-pointer transition-transform hover:scale-105 active:scale-95"
          onClick={() => speakEn(currentWord.english)}
        >
          <Image
            src={currentWord.image}
            alt={currentWord.vietnamese}
            fill
            className="object-contain drop-shadow-lg"
            sizes="(max-width: 640px) 128px, 160px"
          />
        </div>
        <p className="text-gray-500 text-sm">{currentWord.vietnamese}</p>
      </div>

      {/* Spelling area */}
      <div className="flex flex-wrap justify-center gap-2 min-h-[52px]">
        {Array.from({ length: currentWord.english.length }).map((_, i) => {
          const letter = selectedLetters[i];
          return (
            <button
              key={i}
              onClick={() => letter && handleRemoveLetter(i)}
              className={`
                w-10 h-12 sm:w-12 sm:h-14 rounded-xl border-2 flex items-center justify-center
                text-xl sm:text-2xl font-bold transition-all duration-200
                ${letter ? "bg-blue-500 text-white border-blue-600 hover:bg-blue-400 cursor-pointer" : "bg-gray-100 border-dashed border-gray-300"}
                ${feedback === "correct" && letter ? "bg-green-500 border-green-600 animate-bounce" : ""}
                ${feedback === "wrong" && letter ? "bg-red-400 border-red-500 animate-shake" : ""}
              `}
            >
              {letter?.letter || ""}
            </button>
          );
        })}
      </div>

      {/* Available letters */}
      <div className="flex flex-wrap justify-center gap-2 max-w-sm">
        {availableLetters.map((item, index) => (
          <button
            key={`${item.letter}-${item.originalIndex}`}
            onClick={() => handleSelectLetter(index)}
            disabled={item.used || feedback !== null}
            className={`
              w-10 h-12 sm:w-12 sm:h-14 rounded-xl border-2 flex items-center justify-center
              text-xl sm:text-2xl font-bold transition-all duration-200
              ${item.used
                ? "bg-gray-100 border-gray-200 text-gray-300 cursor-default"
                : "bg-white border-purple-300 text-purple-700 hover:bg-purple-50 hover:scale-110 cursor-pointer shadow-md active:scale-95"
              }
            `}
          >
            {item.letter}
          </button>
        ))}
      </div>

      {/* Feedback message */}
      {feedback === "correct" && (
        <div className="text-green-600 font-bold text-lg animate-bounce">
          ✅ Tuyệt vời! {currentWord.english}
        </div>
      )}
      {feedback === "wrong" && (
        <div className="text-red-500 font-medium text-sm">
          ❌ Thử lại nhé!
        </div>
      )}
    </div>
  );
}
