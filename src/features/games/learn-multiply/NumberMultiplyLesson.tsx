"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { generateMultiplyQuestion, generateChoices } from "./constants";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useQuizLogic } from "@/hooks/useQuizLogic";
import { NumberBox, OperatorSign, FeedbackCard, ChoiceGrid, SpeakerButton, BlankBox } from "@/features/games/_shared/math";

interface NumberMultiplyLessonProps {
  multiplier: number | "mixed";
  maxProduct: number;
  onComplete: () => void;
}

export function NumberMultiplyLesson({ multiplier, maxProduct, onComplete }: NumberMultiplyLessonProps) {
  const { speak } = useTextToSpeech();
  const [question, setQuestion] = useState<ReturnType<typeof generateMultiplyQuestion> | null>(null);
  const [choices, setChoices] = useState<number[]>([]);
  const prevQuestionRef = useRef<string>("");

  const newQuestion = useCallback(() => {
    const q = generateMultiplyQuestion(multiplier, maxProduct, prevQuestionRef.current);
    prevQuestionRef.current = q.questionKey;
    setQuestion(q);
    setChoices(generateChoices(q.answer, maxProduct));
    quiz.resetFeedback();
    setTimeout(() => speak(`${q.a} nhân ${q.b} bằng mấy?`), 500);
  }, [multiplier, maxProduct]);

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

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xl px-4">
      <FeedbackCard feedback={quiz.feedback}>
        <div className="flex items-center justify-center gap-4">
          <NumberBox value={question.a} gradient="purple" speakText={`${question.a}`} />
          <OperatorSign symbol="×" speakText="dấu nhân" />
          <NumberBox value={question.b} gradient="blue" speakText={`${question.b}`} />
          <OperatorSign symbol="=" speakText="dấu bằng" />
          <BlankBox answered={quiz.feedback === "correct"} answerValue={question.answer} />
        </div>
      </FeedbackCard>

      <SpeakerButton onSpeak={() => speak(`${question.a} nhân ${question.b} bằng mấy?`)} />

      <ChoiceGrid choices={choices} correctAnswer={question.answer} feedback={quiz.feedback} onChoice={quiz.handleChoice} />
    </div>
  );
}
