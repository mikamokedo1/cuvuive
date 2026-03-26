"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { generateDivideQuestion, generateChoices } from "./constants";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useQuizLogic } from "@/hooks/useQuizLogic";
import { NumberBox, OperatorSign, BlankBox, FeedbackCard, ChoiceGrid, SpeakerButton } from "@/features/games/_shared/math";

interface NumberDivideLessonProps {
  divisor: number | "mixed";
  maxDividend: number;
  onComplete: () => void;
}

export function NumberDivideLesson({ divisor, maxDividend, onComplete }: NumberDivideLessonProps) {
  const { speak } = useTextToSpeech();
  const [question, setQuestion] = useState<ReturnType<typeof generateDivideQuestion> | null>(null);
  const [choices, setChoices] = useState<number[]>([]);
  const prevQuestionRef = useRef<string>("");

  const newQuestion = useCallback(() => {
    const q = generateDivideQuestion(divisor, maxDividend, prevQuestionRef.current);
    prevQuestionRef.current = q.questionKey;
    setQuestion(q);
    setChoices(generateChoices(q.answer, 10));
    quiz.resetFeedback();
    setTimeout(() => speak(`${q.dividend} chia ${q.divisor} bằng mấy?`), 500);
  }, [divisor, maxDividend]);

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
          <NumberBox value={question.dividend} gradient="purple" speakText={`${question.dividend}`} />
          <OperatorSign symbol="÷" speakText="dấu chia" />
          <NumberBox value={question.divisor} gradient="blue" speakText={`${question.divisor}`} />
          <OperatorSign symbol="=" speakText="dấu bằng" />
          <BlankBox answered={quiz.feedback === "correct"} answerValue={question.answer} />
        </div>
      </FeedbackCard>

      <SpeakerButton onSpeak={() => speak(`${question.dividend} chia ${question.divisor} bằng mấy?`)} />

      <ChoiceGrid choices={choices} correctAnswer={question.answer} feedback={quiz.feedback} onChoice={quiz.handleChoice} />
    </div>
  );
}
