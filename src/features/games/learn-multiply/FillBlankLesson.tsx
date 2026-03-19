"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { generateFillBlankQuestion, generateChoices } from "./constants";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useQuizLogic } from "@/hooks/useQuizLogic";
import { NumberBox, BlankBox, OperatorSign, FeedbackCard, ChoiceGrid, SpeakerButton } from "@/features/games/_shared/math";

interface FillBlankLessonProps {
  multiplier: number | "mixed";
  maxProduct: number;
  onComplete: () => void;
}

export function FillBlankLesson({ multiplier, maxProduct, onComplete }: FillBlankLessonProps) {
  const { speak } = useTextToSpeech();
  const [question, setQuestion] = useState<ReturnType<typeof generateFillBlankQuestion> | null>(null);
  const [choices, setChoices] = useState<number[]>([]);
  const prevQuestionRef = useRef<string>("");

  const newQuestion = useCallback(() => {
    const q = generateFillBlankQuestion(multiplier, maxProduct, prevQuestionRef.current);
    prevQuestionRef.current = q.questionKey;
    setQuestion(q);
    const maxChoice = 10;
    setChoices(generateChoices(q.missingValue, maxChoice));
    quiz.resetFeedback();

    setTimeout(() => {
      if (q.missingPosition === "a") {
        speak(`mấy nhân ${q.b} bằng ${q.answer}?`);
      } else {
        speak(`${q.a} nhân mấy bằng ${q.answer}?`);
      }
    }, 500);
  }, [multiplier, maxProduct]);

  const quiz = useQuizLogic({
    correctAnswer: question?.missingValue ?? 0,
    onComplete,
    onNextQuestion: newQuestion,
    correctMessage: `Đúng rồi, là số ${question?.missingValue}`,
  });

  useEffect(() => {
    newQuestion();
  }, [newQuestion]);

  if (!question) return null;

  const speakQuestion = () => {
    if (question.missingPosition === "a") {
      speak(`mấy nhân ${question.b} bằng ${question.answer}?`);
    } else {
      speak(`${question.a} nhân mấy bằng ${question.answer}?`);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xl px-4">
      <FeedbackCard feedback={quiz.feedback}>
        <div className="flex items-center justify-center gap-3 md:gap-4">
          {/* A or blank */}
          {question.missingPosition === "a" ? (
            <BlankBox answered={quiz.feedback === "correct"} answerValue={question.missingValue} />
          ) : (
            <NumberBox value={question.a} gradient="purple" speakText={`${question.a}`} />
          )}

          <OperatorSign symbol="×" speakText="nhân" />

          {/* B or blank */}
          {question.missingPosition === "b" ? (
            <BlankBox answered={quiz.feedback === "correct"} answerValue={question.missingValue} />
          ) : (
            <NumberBox value={question.b} gradient="blue" speakText={`${question.b}`} />
          )}

          <OperatorSign symbol="=" speakText="bằng" />

          {/* Answer (always shown) */}
          <NumberBox value={question.answer} gradient="emerald" speakText={`${question.answer}`} />
        </div>
      </FeedbackCard>

      <SpeakerButton onSpeak={speakQuestion} />

      <ChoiceGrid choices={choices} correctAnswer={question.missingValue} feedback={quiz.feedback} onChoice={quiz.handleChoice} />
    </div>
  );
}
