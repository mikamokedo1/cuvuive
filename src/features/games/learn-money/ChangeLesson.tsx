"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { generateChangeQuestion, formatMoney, speakMoney } from "./constants";
import { BillCard } from "./BillCard";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useQuizLogic } from "@/hooks/useQuizLogic";
import { FeedbackCard, SpeakerButton } from "@/features/games/_shared/math";

interface ChangeLessonProps {
  onComplete: () => void;
}

export function ChangeLesson({ onComplete }: ChangeLessonProps) {
  const { speak } = useTextToSpeech();
  const [question, setQuestion] = useState<ReturnType<typeof generateChangeQuestion> | null>(null);
  const prevKeyRef = useRef<string>("");

  const newQuestion = useCallback(() => {
    const q = generateChangeQuestion(prevKeyRef.current);
    prevKeyRef.current = q.questionKey;
    setQuestion(q);
    quiz.resetFeedback();
    setTimeout(
      () =>
        speak(`${q.item.name} giá ${speakMoney(q.item.price)}. Pé đưa tờ ${q.paidBill.label}. Được trả lại bao nhiêu?`),
      500,
    );
  }, []);

  const quiz = useQuizLogic({
    correctAnswer: question?.change ?? 0,
    onComplete,
    onNextQuestion: newQuestion,
    correctMessage: `Đúng rồi, tiền thừa ${speakMoney(question?.change ?? 0)}`,
  });

  useEffect(() => {
    newQuestion();
  }, [newQuestion]);

  if (!question) return null;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xl px-4">
      <FeedbackCard feedback={quiz.feedback} className="p-4 md:p-6">
        <div className="flex flex-col items-center gap-4">
          {/* Item */}
          <div
            className="flex items-center gap-3"
            onClick={() => speak(`${question.item.name} giá ${question.item.price} `)}
          >
            <span className="text-7xl sm:text-8xl">{question.item.emoji}</span>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-black text-orange-600">
                {formatMoney(question.item.price)}
              </span>
            </div>
          </div>

          {/* Bill paid */}
          <div className="flex items-center gap-3" onClick={() => speak(`Pé đưa tờ ${question.paidBill.label}`)}>
            <BillCard bill={question.paidBill} size="sm" />
          </div>
        </div>
      </FeedbackCard>

      <SpeakerButton
        onSpeak={() =>
          speak(
            `${question.item.name} giá ${speakMoney(question.item.price)}. Pé đưa tờ ${question.paidBill.label}. Được trả lại bao nhiêu?`,
          )
        }
      />

      {/* Money choices */}
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
                quiz.feedback === "correct" && value === question.change
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
