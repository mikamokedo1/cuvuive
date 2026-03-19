"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { ThingImages } from "@/libs/constants/thingImages";
import { MathOperator, generateMathQuestion, generateChoices } from "./constants";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useQuizLogic } from "@/hooks/useQuizLogic";
import { OperatorSign, FeedbackCard, ChoiceGrid, SpeakerButton } from "@/features/games/_shared/math";

interface VisualMathLessonProps {
  operator: MathOperator | "mixed";
  maxSum: number;
  onComplete: () => void;
}

export function VisualMathLesson({ operator, maxSum, onComplete }: VisualMathLessonProps) {
  const { speak } = useTextToSpeech();
  const [question, setQuestion] = useState<ReturnType<typeof generateMathQuestion> | null>(null);
  const [choices, setChoices] = useState<number[]>([]);
  const [imageIndex, setImageIndex] = useState(0);
  const prevQuestionRef = useRef<string>("");

  const newQuestion = useCallback(() => {
    const q = generateMathQuestion(operator, maxSum, prevQuestionRef.current);
    prevQuestionRef.current = q.questionKey;
    setQuestion(q);
    setChoices(generateChoices(q.answer, maxSum));
    setImageIndex(Math.floor(Math.random() * ThingImages.length));
    quiz.resetFeedback();

    const sym = q.op === "add" ? "cộng" : "trừ";
    setTimeout(() => speak(`${q.a} ${sym} ${q.b} bằng mấy?`), 500);
  }, [operator, maxSum]);

  const quiz = useQuizLogic({
    correctAnswer: question?.answer ?? 0,
    onComplete,
    onNextQuestion: newQuestion,
    correctMessage: `Đúng rồi, bằng ${question?.answer}`,
  });

  useEffect(() => {
    newQuestion();
  }, [newQuestion]);

  if (!question) return null;

  const symbol = question.op === "add" ? "+" : "−";
  const operatorWord = question.op === "add" ? "cộng" : "trừ";
  const thingImage = ThingImages[imageIndex];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xl px-4">
      <FeedbackCard feedback={quiz.feedback} className="p-4 md:p-6">
        <div className="flex items-center justify-center gap-3 flex-col">
          {/* First group of items */}
          <div
            className="flex flex-wrap justify-center gap-2 cursor-pointer hover:scale-[1.02] transition-all"
            onClick={() => speak(`${question.a} ${thingImage.name}`)}
          >
            {Array.from({ length: question.a }).map((_, i) => (
              <div key={`a-${i}`} className="w-10 h-10 md:w-14 md:h-14 relative">
                <Image src={thingImage.icon} alt="item" fill className="object-contain drop-shadow-md" />
              </div>
            ))}
          </div>

          <OperatorSign symbol={symbol as any} speakText={`dấu ${operatorWord}`} className="!text-7xl" />

          {/* Second group of items */}
          <div
            className="flex flex-wrap justify-center gap-2 cursor-pointer hover:scale-[1.02] transition-all"
            onClick={() => speak(`${question.b} ${thingImage.name}`)}
          >
            {Array.from({ length: question.b }).map((_, i) => (
              <div
                key={`b-${i}`}
                className={`w-10 h-10 md:w-12 md:h-12 relative ${question.op === "sub" ? "opacity-60 grayscale" : ""}`}
              >
                <Image src={thingImage.icon} alt="item" fill className="object-contain drop-shadow-md" />
              </div>
            ))}
          </div>

          <OperatorSign symbol="=" speakText="dấu bằng" className="!text-7xl" />

          {/* Answer items */}
          <div
            className="flex flex-wrap justify-center gap-2 cursor-pointer hover:scale-[1.02] transition-all"
            onClick={() => speak(`${question.answer} ${thingImage.name}`)}
          >
            {Array.from({ length: question.answer }).map((_, i) => (
              <div key={`ans-${i}`} className="w-10 h-10 md:w-12 md:h-12 relative">
                <Image src={thingImage.icon} alt="item" fill className="object-contain drop-shadow-md" />
              </div>
            ))}
          </div>
        </div>
      </FeedbackCard>

      <SpeakerButton onSpeak={() => speak(`${question.a} ${operatorWord} ${question.b} bằng mấy?`)} />

      <ChoiceGrid choices={choices} correctAnswer={question.answer} feedback={quiz.feedback} onChoice={quiz.handleChoice} />
    </div>
  );
}
