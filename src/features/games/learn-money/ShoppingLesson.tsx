"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { generateShoppingQuestion, speakMoney } from "./constants";
import { BillCard } from "./BillCard";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useQuizLogic } from "@/hooks/useQuizLogic";
import { FeedbackCard, SpeakerButton } from "@/features/games/_shared/math";

interface ShoppingLessonProps {
  onComplete: () => void;
}

export function ShoppingLesson({ onComplete }: ShoppingLessonProps) {
  const { speak } = useTextToSpeech();
  const [question, setQuestion] = useState<ReturnType<typeof generateShoppingQuestion> | null>(null);
  const prevKeyRef = useRef<string>("");

  const newQuestion = useCallback(() => {
    const q = generateShoppingQuestion(prevKeyRef.current);
    prevKeyRef.current = q.questionKey;
    setQuestion(q);
    quiz.resetFeedback();
    setTimeout(() => speak(`${q.item.name} giá ${speakMoney(q.item.price)}. Pé trả tờ tiền nào?`), 500);
  }, []);

  const quiz = useQuizLogic({
    correctAnswer: question?.correctBill.value ?? 0,
    onComplete,
    onNextQuestion: newQuestion,
    correctMessage: `Đúng rồi, trả tờ ${question?.correctBill.label ?? ""}`,
  });

  useEffect(() => {
    newQuestion();
  }, [newQuestion]);

  if (!question) return null;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xl px-4">
      <FeedbackCard feedback={quiz.feedback} className="p-4 md:p-6">
        <div className="flex flex-col items-center gap-3">
          {/* Item display */}
          <div
            className="text-7xl sm:text-8xl"
            onClick={() => speak(`${question.item.name} giá ${question.item.price}`)}
          >
            {question.item.emoji}
          </div>
          <div className="bg-orange-100 rounded-2xl px-6 py-2">
            <span className="text-2xl sm:text-3xl font-black text-orange-600">
              {question.correctBill.label === question.item.emoji
                ? ""
                : `${question.item.price.toLocaleString("vi-VN")}đ`}
            </span>
          </div>
        </div>
      </FeedbackCard>

      <SpeakerButton
        onSpeak={() => speak(`${question.item.name} giá ${speakMoney(question.item.price)}. Pé trả tờ tiền nào?`)}
      />

      {/* Bill choices */}
      <div className="flex gap-3 sm:gap-4 flex-wrap justify-center">
        {question.choices.map((bill) => (
          <div
            key={bill.value}
            className={`transform transition-all duration-200 ${
              quiz.feedback === "wrong" ? "opacity-30 grayscale" : ""
            } ${quiz.feedback === "correct" && bill.value === question.correctBill.value ? "scale-110" : ""}`}
          >
            <BillCard
              bill={bill}
              size="md"
              selected={quiz.feedback === "correct" && bill.value === question.correctBill.value}
              onClick={() => quiz.handleChoice(bill.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
