"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Volume2 } from "lucide-react";
import { SafeRideActivity, SafeAction } from "./constants";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playButtonSound } from "@/libs/utils/playSound";

interface SafeRiderLessonProps {
  activities: SafeRideActivity[];
  onComplete: () => void;
}

export function SafeRiderLesson({ activities, onComplete }: SafeRiderLessonProps) {
  const { speak } = useTextToSpeech();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [correctIds, setCorrectIds] = useState<Set<string>>(new Set());
  const [wrongIds, setWrongIds] = useState<Set<string>>(new Set());
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentActivity = activities[currentIndex];
  const requiredWins = activities.length;

  // Auto-speak
  useEffect(() => {
    if (currentActivity && !showResult) {
      const timeout = setTimeout(() => {
        speak(currentActivity.situationText);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentActivity, showResult, speak]);

  const handleActionClick = useCallback(
    (action: SafeAction) => {
      if (showResult || selectedIds.has(action.id)) return;

      playButtonSound();
      const newSelected = new Set(selectedIds);
      newSelected.add(action.id);
      setSelectedIds(newSelected);

      if (action.isCorrect) {
        const newCorrect = new Set(correctIds);
        newCorrect.add(action.id);
        setCorrectIds(newCorrect);
        speak(`Đúng! ${action.text}!`);

        // Check if all correct actions found
        const totalCorrect = currentActivity.actions.filter((a) => a.isCorrect).length;
        if (newCorrect.size >= totalCorrect) {
          setShowResult(true);
          playWinEffect(500);
          speak("Tuyệt vời! Pé chọn đúng hết rồi!");

          setTimeout(() => {
            const newScore = score + 1;
            setScore(newScore);
            if (newScore >= requiredWins) {
              onComplete();
            } else {
              setCurrentIndex((prev) => prev + 1);
              setSelectedIds(new Set());
              setCorrectIds(new Set());
              setWrongIds(new Set());
              setShowResult(false);
            }
          }, 2500);
        }
      } else {
        const newWrong = new Set(wrongIds);
        newWrong.add(action.id);
        setWrongIds(newWrong);
        speak(`${action.text} — Không nên làm!`);

        setTimeout(() => {
          setWrongIds((prev) => {
            const next = new Set(prev);
            next.delete(action.id);
            return next;
          });
          setSelectedIds((prev) => {
            const next = new Set(prev);
            next.delete(action.id);
            return next;
          });
        }, 1500);
      }
    },
    [showResult, selectedIds, correctIds, wrongIds, currentActivity, speak, score, requiredWins, onComplete],
  );

  if (!currentActivity) return <div>Đang tải...</div>;

  const totalCorrect = currentActivity.actions.filter((a) => a.isCorrect).length;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl px-4">
      {/* Situation image + text */}
      <div
        className="relative w-full bg-blue-50 border-4 border-blue-200 rounded-2xl p-6 shadow-lg cursor-pointer hover:bg-blue-100 transition-colors flex flex-col items-center"
        onClick={() => speak(currentActivity.situationText)}
      >
        <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-md">
          <Volume2 className="w-5 h-5" />
        </div>
        <div className="relative w-40 h-40 md:w-48 md:h-48 mb-4 rounded-xl overflow-hidden">
          <Image
            src={currentActivity.image}
            alt="situation"
            fill
            className="object-contain drop-shadow-md"
            priority
          />
        </div>
        <h2 className="text-lg md:text-xl font-bold text-blue-800 text-center leading-relaxed">
          {currentActivity.situationText}
        </h2>
        <p className="text-sm text-blue-500 mt-2">
          Chọn tất cả hành động đúng ({correctIds.size}/{totalCorrect})
        </p>
      </div>

      {/* Action options */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 w-full max-w-2xl">
        {currentActivity.actions.map((action) => {
          const isCorrect = correctIds.has(action.id);
          const isWrong = wrongIds.has(action.id);

          let cardClass = "border-gray-200 bg-white hover:border-blue-400 hover:scale-105 cursor-pointer";
          if (isCorrect) {
            cardClass = "border-green-500 bg-green-50 scale-105 shadow-green-200";
          }
          if (isWrong) {
            cardClass = "border-red-400 bg-red-50 animate-shake";
          }

          return (
            <div
              key={action.id}
              onClick={() => {
                if (!isCorrect && !showResult) handleActionClick(action);
              }}
              role="button"
              tabIndex={0}
              className={`relative flex flex-col items-center gap-1 p-3 md:p-4 rounded-2xl border-3 shadow-md transition-all duration-300 active:scale-95 ${cardClass}`}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  speak(action.text);
                }}
                aria-label={`Nghe: ${action.text}`}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 active:scale-90 text-blue-600 flex items-center justify-center shadow-sm z-10 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <span className="text-3xl md:text-4xl">{action.emoji}</span>
              <span className="font-bold text-xs md:text-sm text-gray-700 text-center">{action.text}</span>
              {isCorrect && <span className="text-green-500 text-sm">✓</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
