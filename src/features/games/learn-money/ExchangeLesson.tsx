"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { generateExchangeQuestion, formatMoney } from "./constants";
import { BillCard } from "./BillCard";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useQuizLogic } from "@/hooks/useQuizLogic";
import { FeedbackCard, SpeakerButton } from "@/features/games/_shared/math";

interface ExchangeLessonProps {
  onComplete: () => void;
}

export function ExchangeLesson({ onComplete }: ExchangeLessonProps) {
  const { speak } = useTextToSpeech();
  const [question, setQuestion] = useState<ReturnType<typeof generateExchangeQuestion> | null>(null);
  const prevKeyRef = useRef<string>("");

  const newQuestion = useCallback(() => {
    const q = generateExchangeQuestion(prevKeyRef.current);
    prevKeyRef.current = q.questionKey;
    setQuestion(q);
    quiz.resetFeedback();
    setTimeout(() => speak(`1 tờ ${q.bigBill.label} bằng mấy tờ ${q.smallBill.label}?`), 500);
  }, []);

  const quiz = useQuizLogic({
    correctAnswer: question?.answer ?? 0,
    onComplete,
    onNextQuestion: newQuestion,
    correctMessage: `Đúng rồi, bằng ${question?.answer} tờ`,
  });

  useEffect(() => {
    newQuestion();
  }, [newQuestion]);

  if (!question) return null;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xl px-4">
      <FeedbackCard feedback={quiz.feedback} className="p-4 md:p-6">
        <div className="flex flex-col items-center gap-4">
          {/* Big bill */}
          <div className="flex items-center gap-3">
            <BillCard bill={question.bigBill} size="md" />
          </div>

          {/* Arrow */}
          <div className="text-6xl text-orange-600">=</div>

          {/* Small bill with question mark */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-black text-orange-500">?</span>
            <span className="text-2xl font-bold text-gray-500">tờ</span>
            <BillCard bill={question.smallBill} size="sm" />
          </div>
        </div>
      </FeedbackCard>

      <SpeakerButton onSpeak={() => speak(`1 tờ ${question.bigBill.label} bằng mấy tờ ${question.smallBill.label}?`)} />

      {/* Number choices */}
      <div className="grid grid-cols-3 gap-4 md:gap-8 w-full max-w-2xl justify-items-center">
        {question.choices.map((choice) => (
          <div
            key={choice}
            onClick={() => quiz.handleChoice(choice)}
            className={`
              w-24 h-24 sm:w-32 sm:h-32 rounded-2xl shadow-lg border-4 bg-white
              flex items-center justify-center cursor-pointer
              transform transition-all duration-200 hover:scale-110 active:scale-95
              ${quiz.feedback === "wrong" ? "opacity-30 grayscale" : ""}
              ${
                quiz.feedback === "correct" && choice === question.answer
                  ? "border-green-500 scale-110 shadow-green-200"
                  : "border-white"
              }
            `}
          >
            <span className="text-4xl sm:text-5xl font-black text-orange-500">{choice}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
