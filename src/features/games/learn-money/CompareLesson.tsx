"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { generateCompareQuestion, formatMoney } from "./constants";
import { BillCard } from "./BillCard";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { FeedbackType } from "@/types/game";

interface CompareLessonProps {
  onComplete: () => void;
}

export function CompareLesson({ onComplete }: CompareLessonProps) {
  const { speak } = useTextToSpeech();
  const [question, setQuestion] = useState<ReturnType<typeof generateCompareQuestion> | null>(null);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const prevKeyRef = useRef<string>("");
  const completedRef = useRef(false);
  const requiredWins = 8;

  const newQuestion = useCallback(() => {
    const q = generateCompareQuestion(prevKeyRef.current);
    prevKeyRef.current = q.questionKey;
    setQuestion(q);
    setFeedback(null);
    setTimeout(() => speak("Bên nào có nhiều tiền hơn?"), 500);
  }, []);

  useEffect(() => {
    newQuestion();
  }, [newQuestion]);

  const handleChoice = (choice: "A" | "B") => {
    if (feedback || !question) return;

    if (choice === question.answer) {
      speak("Đúng rồi!");
      setFeedback("correct");
      const newCount = correctCount + 1;
      setCorrectCount(newCount);

      if (newCount >= requiredWins) {
        if (!completedRef.current) {
          completedRef.current = true;
          playWinEffect(500);
          setTimeout(onComplete, 1200);
        }
      } else {
        setTimeout(newQuestion, 1500);
      }
    } else {
      speak("Sai rồi, thử lại nhé");
      setFeedback("wrong");
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  if (!question) return null;

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-xl px-4">
      {/* Progress */}
      <div className="flex gap-1.5">
        {Array.from({ length: requiredWins }).map((_, i) => (
          <div
            key={i}
            className={`w-6 h-2 rounded-full transition-all ${
              i < correctCount ? "bg-green-400" : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      <p className="text-lg font-bold text-purple-600">Bên nào nhiều tiền hơn? 🤔</p>

      <div className="flex flex-col sm:flex-row gap-4 w-full">
        {/* Group A */}
        <button
          type="button"
          onClick={() => handleChoice("A")}
          className={`
            flex-1 bg-white rounded-3xl p-4 border-4 shadow-lg
            cursor-pointer transform transition-all duration-200 hover:scale-[1.02] active:scale-95
            ${feedback === "correct" && question.answer === "A" ? "border-green-400 bg-green-50 scale-[1.02]" : ""}
            ${feedback === "correct" && question.answer !== "A" ? "opacity-30" : ""}
            ${feedback === "wrong" ? "opacity-30" : ""}
            ${!feedback ? "border-blue-200 hover:border-blue-400" : ""}
          `}
        >
          <p className="text-sm font-bold text-blue-500 mb-3 text-center">Bên A</p>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {question.groupA.map((bill, i) => (
              <BillCard key={`a-${i}`} bill={bill} size="sm" />
            ))}
          </div>
          {feedback === "correct" && question.answer === "A" && (
            <p className="text-sm font-bold text-green-600 mt-2 text-center">
              = {formatMoney(question.totalA)} ✅
            </p>
          )}
        </button>

        {/* VS */}
        <div className="flex items-center justify-center">
          <span className="text-2xl font-black text-gray-300">VS</span>
        </div>

        {/* Group B */}
        <button
          type="button"
          onClick={() => handleChoice("B")}
          className={`
            flex-1 bg-white rounded-3xl p-4 border-4 shadow-lg
            cursor-pointer transform transition-all duration-200 hover:scale-[1.02] active:scale-95
            ${feedback === "correct" && question.answer === "B" ? "border-green-400 bg-green-50 scale-[1.02]" : ""}
            ${feedback === "correct" && question.answer !== "B" ? "opacity-30" : ""}
            ${feedback === "wrong" ? "opacity-30" : ""}
            ${!feedback ? "border-orange-200 hover:border-orange-400" : ""}
          `}
        >
          <p className="text-sm font-bold text-orange-500 mb-3 text-center">Bên B</p>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {question.groupB.map((bill, i) => (
              <BillCard key={`b-${i}`} bill={bill} size="sm" />
            ))}
          </div>
          {feedback === "correct" && question.answer === "B" && (
            <p className="text-sm font-bold text-green-600 mt-2 text-center">
              = {formatMoney(question.totalB)} ✅
            </p>
          )}
        </button>
      </div>
    </div>
  );
}
