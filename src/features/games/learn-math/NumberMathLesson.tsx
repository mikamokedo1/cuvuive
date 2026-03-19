"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { MathOperator, generateMathQuestion, generateChoices } from "./constants";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useQuizLogic } from "@/hooks/useQuizLogic";
import { NumberBox, OperatorSign, BlankBox, FeedbackCard, ChoiceGrid, SpeakerButton } from "@/features/games/_shared/math";

interface NumberMathLessonProps {
  operator: MathOperator | "mixed";
  maxSum: number;
  onComplete: () => void;
}

export function NumberMathLesson({ operator, maxSum, onComplete }: NumberMathLessonProps) {
  const { speak } = useTextToSpeech();
  const [question, setQuestion] = useState<ReturnType<typeof generateMathQuestion> | null>(null);
  const [choices, setChoices] = useState<number[]>([]);
  const prevQuestionRef = useRef<string>("");

  const newQuestion = useCallback(() => {
    const q = generateMathQuestion(operator, maxSum, prevQuestionRef.current);
    prevQuestionRef.current = q.questionKey;
    setQuestion(q);
    setChoices(generateChoices(q.answer, maxSum));
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
  const gradA = question.op === "add" ? "blue" : "orange" as const;
  const gradB = question.op === "add" ? "green" : "pink" as const;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xl px-4">
      <FeedbackCard feedback={quiz.feedback}>
        <div className="flex items-center justify-center gap-4">
          <NumberBox value={question.a} gradient={gradA} speakText={`${question.a}`} />
          <OperatorSign symbol={symbol as any} speakText={`dấu ${operatorWord}`} />
          <NumberBox value={question.b} gradient={gradB} speakText={`${question.b}`} />
          <OperatorSign symbol="=" speakText="dấu bằng" />
          <BlankBox answered={quiz.feedback === "correct"} answerValue={question.answer} />
        </div>
      </FeedbackCard>

      <SpeakerButton onSpeak={() => speak(`${question.a} ${operatorWord} ${question.b} bằng mấy?`)} />

      <ChoiceGrid choices={choices} correctAnswer={question.answer} feedback={quiz.feedback} onChoice={quiz.handleChoice} />
    </div>
  );
}
