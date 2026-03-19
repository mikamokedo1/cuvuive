"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { generateSkipCountQuestion, generateChoices } from "./constants";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useQuizLogic } from "@/hooks/useQuizLogic";
import { BlankBox, FeedbackCard, ChoiceGrid, SpeakerButton } from "@/features/games/_shared/math";

interface SkipCountLessonProps {
  multiplier: number | "mixed";
  onComplete: () => void;
}

const SEQUENCE_COLORS = [
  "from-blue-400 to-blue-600",
  "from-green-400 to-green-600",
  "from-purple-400 to-purple-600",
  "from-pink-400 to-pink-600",
  "from-orange-400 to-orange-600",
];

export function SkipCountLesson({ multiplier, onComplete }: SkipCountLessonProps) {
  const { speak } = useTextToSpeech();
  const [question, setQuestion] = useState<ReturnType<typeof generateSkipCountQuestion> | null>(null);
  const [choices, setChoices] = useState<number[]>([]);
  const prevQuestionRef = useRef<string>("");

  const newQuestion = useCallback(() => {
    const q = generateSkipCountQuestion(multiplier, prevQuestionRef.current);
    prevQuestionRef.current = q.questionKey;
    setQuestion(q);
    const maxVal = Math.max(...q.sequence.filter((v): v is number => v !== null)) + 10;
    setChoices(generateChoices(q.answer, maxVal));
    quiz.resetFeedback();

    const seqText = q.sequence.map((v) => (v === null ? "mấy" : v)).join(", ");
    setTimeout(() => speak(`Điền số còn thiếu: ${seqText}`), 500);
  }, [multiplier]);

  const quiz = useQuizLogic({
    correctAnswer: question?.answer ?? 0,
    onComplete,
    onNextQuestion: newQuestion,
    correctMessage: `Đúng rồi, là ${question?.answer}`,
  });

  useEffect(() => {
    newQuestion();
  }, [newQuestion]);

  if (!question) return null;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xl px-4">
      {/* Title */}
      <div className="text-center">
        <h3
          className="text-xl font-bold text-purple-700 cursor-pointer hover:text-purple-900 transition-colors"
          onClick={() => speak(`Nhảy số nhân ${question.multiplierUsed}`)}
        >
          Nhảy số ×{question.multiplierUsed}
        </h3>
        <p className="text-slate-500 text-sm mt-1">Điền số còn thiếu vào chuỗi</p>
      </div>

      {/* Sequence display */}
      <FeedbackCard feedback={quiz.feedback} className="p-4 md:p-6">
        <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap">
          {question.sequence.map((value, idx) => (
            <div key={idx} className="flex items-center gap-1 md:gap-2">
              {value === null ? (
                <BlankBox
                  answered={quiz.feedback === "correct"}
                  answerValue={question.answer}
                  className="!w-16 !h-16 md:!w-20 md:!h-20"
                />
              ) : (
                <div
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-b ${SEQUENCE_COLORS[idx % SEQUENCE_COLORS.length]} flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-all active:scale-95`}
                  onClick={() => speak(`${value}`)}
                >
                  <span className="text-2xl md:text-3xl font-black text-white">{value}</span>
                </div>
              )}
              {idx < question.sequence.length - 1 && <span className="text-2xl font-bold text-slate-300">→</span>}
            </div>
          ))}
        </div>
      </FeedbackCard>

      <SpeakerButton
        onSpeak={() => {
          const seqText = question.sequence.map((v) => (v === null ? "mấy" : v)).join(", ");
          speak(`Điền số còn thiếu: ${seqText}`);
        }}
      />

      <ChoiceGrid choices={choices} correctAnswer={question.answer} feedback={quiz.feedback} onChoice={quiz.handleChoice} />
    </div>
  );
}
