"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { generateReverseMultiplyQuestion, generateChoices } from "./constants";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useQuizLogic } from "@/hooks/useQuizLogic";
import { NumberBox, OperatorSign, BlankBox, FeedbackCard, ChoiceGrid, SpeakerButton } from "@/features/games/_shared/math";

interface ReverseMultiplyLessonProps {
  divisor: number | "mixed";
  maxDividend: number;
  onComplete: () => void;
}

export function ReverseMultiplyLesson({ divisor, maxDividend, onComplete }: ReverseMultiplyLessonProps) {
  const { speak } = useTextToSpeech();
  const [question, setQuestion] = useState<ReturnType<typeof generateReverseMultiplyQuestion> | null>(null);
  const [choices, setChoices] = useState<number[]>([]);
  const prevQuestionRef = useRef<string>("");

  const newQuestion = useCallback(() => {
    const q = generateReverseMultiplyQuestion(divisor, maxDividend, prevQuestionRef.current);
    prevQuestionRef.current = q.questionKey;
    setQuestion(q);
    setChoices(generateChoices(q.answer, maxDividend));
    quiz.resetFeedback();
    setTimeout(() => speak(`${q.quotient} nhân ${q.divisor} bằng mấy?`), 500);
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
      {/* Show the division equation as reference */}
      <div className="bg-purple-50 rounded-2xl px-5 py-3 shadow-md">
        <p
          className="text-xl font-bold text-purple-600 cursor-pointer hover:scale-105 transition-all"
          onClick={() => speak(`${question.dividend} chia ${question.divisor} bằng ${question.quotient}`)}
        >
          {question.dividend} ÷ {question.divisor} = {question.quotient}
        </p>
      </div>

      {/* Ask the reverse multiplication */}
      <FeedbackCard feedback={quiz.feedback}>
        <div className="flex items-center justify-center gap-4">
          <NumberBox value={question.quotient} gradient="emerald" speakText={`${question.quotient}`} />
          <OperatorSign symbol="×" speakText="dấu nhân" />
          <NumberBox value={question.divisor} gradient="blue" speakText={`${question.divisor}`} />
          <OperatorSign symbol="=" speakText="dấu bằng" />
          <BlankBox answered={quiz.feedback === "correct"} answerValue={question.answer} />
        </div>
      </FeedbackCard>

      <SpeakerButton onSpeak={() => speak(`${question.quotient} nhân ${question.divisor} bằng mấy?`)} />

      <ChoiceGrid choices={choices} correctAnswer={question.answer} feedback={quiz.feedback} onChoice={quiz.handleChoice} />
    </div>
  );
}
