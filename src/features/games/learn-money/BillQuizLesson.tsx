"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { BILLS, generateBillQuiz } from "./constants";
import { BillCard } from "./BillCard";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useQuizLogic } from "@/hooks/useQuizLogic";
import { FeedbackCard, SpeakerButton } from "@/features/games/_shared/math";
import { FeedbackType } from "@/types/game";

interface BillQuizLessonProps {
  onComplete: () => void;
}

export function BillQuizLesson({ onComplete }: BillQuizLessonProps) {
  const { speak } = useTextToSpeech();
  const [question, setQuestion] = useState<ReturnType<typeof generateBillQuiz> | null>(null);
  const prevKeyRef = useRef<string>("");

  const newQuestion = useCallback(() => {
    const q = generateBillQuiz(BILLS, prevKeyRef.current);
    prevKeyRef.current = q.questionKey;
    setQuestion(q);
    quiz.resetFeedback();
    setTimeout(() => speak("Đây là bao nhiêu tiền?"), 500);
  }, []);

  const quiz = useQuizLogic({
    correctAnswer: question?.bill.value ?? 0,
    onComplete,
    onNextQuestion: newQuestion,
    correctMessage: `Đúng rồi, đây là tờ ${question?.bill.labelFull ?? ""}`,
  });

  useEffect(() => {
    newQuestion();
  }, [newQuestion]);

  if (!question) return null;
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xl px-4">
      <FeedbackCard feedback={quiz.feedback} className="p-4 md:p-6">
        <div className="flex flex-col items-center gap-4" onClick={() => speak("Đây là bao nhiêu tiền?")}>
          <BillCard bill={question.bill} size="lg" />
        </div>
      </FeedbackCard>

      {/* Money choice grid (text-based, not number) */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 w-full max-w-2xl justify-items-center">
        {question.choices.map((choice) => (
          <button
            key={choice.value}
            type="button"
            onClick={() => quiz.handleChoice(choice.value)}
            className={`
              w-full py-4 px-2 rounded-2xl shadow-lg border-4 bg-white
              flex items-center justify-center cursor-pointer
              transform transition-all duration-200 hover:scale-105 active:scale-95
              ${quiz.feedback === "wrong" ? "opacity-30 grayscale" : ""}
              ${
                quiz.feedback === "correct" && choice.value === question.bill.value
                  ? "border-green-500 scale-105 shadow-green-200 bg-green-50"
                  : "border-white hover:border-orange-200"
              }
            `}
          >
            <span className="text-xl sm:text-2xl font-black text-orange-500">{choice.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
