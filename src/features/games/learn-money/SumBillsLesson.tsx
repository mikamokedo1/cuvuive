"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { generateSumQuestion, formatMoney, speakMoney } from "./constants";
import { BillCard } from "./BillCard";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useQuizLogic } from "@/hooks/useQuizLogic";
import { FeedbackCard, SpeakerButton } from "@/features/games/_shared/math";

interface SumBillsLessonProps {
  onComplete: () => void;
}

export function SumBillsLesson({ onComplete }: SumBillsLessonProps) {
  const { speak } = useTextToSpeech();
  const allowedValues = [1000, 2000, 5000, 10000, 20000];
  const [question, setQuestion] = useState<ReturnType<typeof generateSumQuestion> | null>(null);
  const prevKeyRef = useRef<string>("");

  const newQuestion = useCallback(() => {
    const q = generateSumQuestion(allowedValues, prevKeyRef.current);
    prevKeyRef.current = q.questionKey;
    setQuestion(q);
    quiz.resetFeedback();
    setTimeout(() => speak("Tổng cộng là bao nhiêu tiền?"), 500);
  }, []);

  const quiz = useQuizLogic({
    correctAnswer: question?.total ?? 0,
    onComplete,
    onNextQuestion: newQuestion,
    correctMessage: `Đúng rồi, tổng cộng là ${speakMoney(question?.total ?? 0)}`,
  });

  useEffect(() => {
    newQuestion();
  }, [newQuestion]);

  if (!question) return null;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xl px-4">
      <FeedbackCard feedback={quiz.feedback} className="p-4 md:p-6">
        <div className="flex flex-col items-center gap-4">
          {/* Bills to sum */}
          <div className="flex gap-2 sm:gap-3 flex-wrap justify-center items-center">
            {question.shownBills.map((bill, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <BillCard bill={bill} size="md" />
                {i < question.shownBills.length - 1 && <span className="text-3xl font-black text-emerald-500">+</span>}
              </div>
            ))}
          </div>

          {/* Equals */}
          <div className="text-4xl font-black text-emerald-500">=</div>
          <div className="text-3xl font-black text-orange-500">❓</div>
        </div>
      </FeedbackCard>

      <SpeakerButton onSpeak={() => speak("Tổng cộng là bao nhiêu tiền?")} />

      {/* Formatted money choices */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 w-full max-w-2xl justify-items-center">
        {question.choices.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => quiz.handleChoice(value)}
            className={`
              w-full py-4 px-2 rounded-2xl shadow-lg border-4 bg-white
              flex items-center justify-center cursor-pointer
              transform transition-all duration-200 hover:scale-105 active:scale-95
              ${quiz.feedback === "wrong" ? "opacity-30 grayscale" : ""}
              ${
                quiz.feedback === "correct" && value === question.total
                  ? "border-green-500 scale-105 shadow-green-200 bg-green-50"
                  : "border-white hover:border-orange-200"
              }
            `}
          >
            <span className="text-lg sm:text-xl font-black text-orange-500">{formatMoney(value)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
