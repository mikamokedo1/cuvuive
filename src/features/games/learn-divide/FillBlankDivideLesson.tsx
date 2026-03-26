"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { generateFillBlankDivideQuestion, generateChoices } from "./constants";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useQuizLogic } from "@/hooks/useQuizLogic";
import { NumberBox, BlankBox, OperatorSign, FeedbackCard, ChoiceGrid, SpeakerButton } from "@/features/games/_shared/math";

interface FillBlankDivideLessonProps {
  divisor: number | "mixed";
  maxDividend: number;
  onComplete: () => void;
}

export function FillBlankDivideLesson({ divisor, maxDividend, onComplete }: FillBlankDivideLessonProps) {
  const { speak } = useTextToSpeech();
  const [question, setQuestion] = useState<ReturnType<typeof generateFillBlankDivideQuestion> | null>(null);
  const [choices, setChoices] = useState<number[]>([]);
  const prevQuestionRef = useRef<string>("");

  const newQuestion = useCallback(() => {
    const q = generateFillBlankDivideQuestion(divisor, maxDividend, prevQuestionRef.current);
    prevQuestionRef.current = q.questionKey;
    setQuestion(q);
    const maxChoice = q.missingPosition === "dividend" ? maxDividend : 10;
    setChoices(generateChoices(q.missingValue, maxChoice));
    quiz.resetFeedback();

    setTimeout(() => {
      if (q.missingPosition === "dividend") {
        speak(`mấy chia ${q.divisor} bằng ${q.answer}?`);
      } else {
        speak(`${q.dividend} chia mấy bằng ${q.answer}?`);
      }
    }, 500);
  }, [divisor, maxDividend]);

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
    if (question.missingPosition === "dividend") {
      speak(`mấy chia ${question.divisor} bằng ${question.answer}?`);
    } else {
      speak(`${question.dividend} chia mấy bằng ${question.answer}?`);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xl px-4">
      <FeedbackCard feedback={quiz.feedback}>
        <div className="flex items-center justify-center gap-3 md:gap-4">
          {/* Dividend or blank */}
          {question.missingPosition === "dividend" ? (
            <BlankBox answered={quiz.feedback === "correct"} answerValue={question.missingValue} />
          ) : (
            <NumberBox value={question.dividend} gradient="purple" speakText={`${question.dividend}`} />
          )}

          <OperatorSign symbol="÷" speakText="chia" />

          {/* Divisor or blank */}
          {question.missingPosition === "divisor" ? (
            <BlankBox answered={quiz.feedback === "correct"} answerValue={question.missingValue} />
          ) : (
            <NumberBox value={question.divisor} gradient="blue" speakText={`${question.divisor}`} />
          )}

          <OperatorSign symbol="=" speakText="bằng" />

          {/* Quotient (always shown) */}
          <NumberBox value={question.answer} gradient="emerald" speakText={`${question.answer}`} />
        </div>
      </FeedbackCard>

      <SpeakerButton onSpeak={speakQuestion} />

      <ChoiceGrid choices={choices} correctAnswer={question.missingValue} feedback={quiz.feedback} onChoice={quiz.handleChoice} />
    </div>
  );
}
