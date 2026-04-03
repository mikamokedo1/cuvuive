"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { generateSavingsQuestion, formatMoney, speakMoney } from "./constants";
import { BillCard } from "./BillCard";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { FeedbackType } from "@/types/game";
import { FeedbackCard, SpeakerButton } from "@/features/games/_shared/math";
import { playWinEffect } from "@/libs/utils/playWinEffect";

interface SavingsLessonProps {
  onComplete: () => void;
}

const REQUIRED_WINS = 8;

export function SavingsLesson({ onComplete }: SavingsLessonProps) {
  const { speak } = useTextToSpeech();
  const [question, setQuestion] = useState<ReturnType<typeof generateSavingsQuestion> | null>(null);
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const completedRef = useRef(false);
  const prevKeyRef = useRef("");

  /* ── Derived state ── */
  const selectedTotal = useMemo(() => {
    if (!question) return 0;
    return Array.from(selectedIndices).reduce((sum, i) => sum + question.bills[i].value, 0);
  }, [selectedIndices, question]);

  const progress = question ? Math.min((selectedTotal / question.target) * 100, 100) : 0;
  const isOver = question ? selectedTotal > question.target : false;

  /* ── New question ── */
  const newQuestion = useCallback(() => {
    const q = generateSavingsQuestion(prevKeyRef.current);
    prevKeyRef.current = q.questionKey;
    setQuestion(q);
    setSelectedIndices(new Set());
    setFeedback(null);
    setTimeout(() => speak(`Pé cần tiết kiệm đủ ${speakMoney(q.target)}. Chọn tờ tiền bỏ heo nhé!`), 500);
  }, []);

  useEffect(() => {
    newQuestion();
  }, [newQuestion]);

  /* ── Toggle a bill ── */
  const toggleBill = (index: number) => {
    if (feedback === "correct" || !question) return;

    const next = new Set(selectedIndices);
    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
    }
    setSelectedIndices(next);

    const newTotal = Array.from(next).reduce((sum, i) => sum + question.bills[i].value, 0);

    if (newTotal === question.target) {
      /* ✅ Correct */
      setFeedback("correct");
      speak(`Giỏi lắm! Đủ ${speakMoney(question.target)} rồi!`);
      const newCount = correctCount + 1;
      setCorrectCount(newCount);

      if (newCount >= REQUIRED_WINS && !completedRef.current) {
        completedRef.current = true;
        playWinEffect(500);
        setTimeout(onComplete, 1200);
      } else {
        setTimeout(() => newQuestion(), 3000);
      }
    } else if (newTotal > question.target) {
      speak("Nhiều quá rồi, bỏ bớt nhé!");
    }
  };

  if (!question) return null;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xl px-4">
      {/* ── Piggy bank card ── */}
      <FeedbackCard feedback={feedback} className="p-4 md:p-6">
        <div className="flex flex-col items-center gap-3">
          {/* Piggy bank */}
          <div
            className={`text-7xl sm:text-8xl transition-transform duration-300 ${
              feedback === "correct" ? "animate-bounce" : ""
            } ${isOver ? "animate-shake" : ""}`}
            onClick={() => speak(`Pé cần tiết kiệm đủ ${speakMoney(question.target)}`)}
          >
            🐷
          </div>

          {/* Target label */}
          <div className="text-center">
            <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">Mục tiêu tiết kiệm</div>
            <div className="text-3xl sm:text-4xl font-black text-orange-500">{formatMoney(question.target)}</div>
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-xs">
            <div className="flex justify-between text-sm font-bold mb-1">
              <span className={isOver ? "text-red-500" : "text-emerald-600"}>{formatMoney(selectedTotal)}</span>
              <span className="text-gray-400">{formatMoney(question.target)}</span>
            </div>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  feedback === "correct"
                    ? "bg-green-400"
                    : isOver
                      ? "bg-red-400"
                      : "bg-gradient-to-r from-yellow-400 to-orange-400"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </FeedbackCard>

      {/* ── Bill grid (3×2) ── */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full justify-items-center">
        {question.bills.map((bill, index) => (
          <div
            key={index}
            className={`transform transition-all duration-300 ${
              selectedIndices.has(index) ? "-translate-y-2" : ""
            } ${feedback === "correct" && !selectedIndices.has(index) ? "opacity-30 grayscale" : ""}`}
          >
            <BillCard bill={bill} size="sm" selected={selectedIndices.has(index)} onClick={() => toggleBill(index)} />
            {selectedIndices.has(index) && (
              <div className="flex justify-center -mt-2 relative z-10">
                <span className="bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                  ✓
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
