"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { ThingImages } from "@/libs/constants/thingImages";
import { generateDivideQuestion, generateChoices } from "./constants";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useQuizLogic } from "@/hooks/useQuizLogic";
import { FeedbackCard, ChoiceGrid, SpeakerButton } from "@/features/games/_shared/math";

interface VisualDivideLessonProps {
  divisor: number | "mixed";
  maxDividend: number;
  onComplete: () => void;
}

export function VisualDivideLesson({ divisor, maxDividend, onComplete }: VisualDivideLessonProps) {
  const { speak } = useTextToSpeech();
  const [question, setQuestion] = useState<ReturnType<typeof generateDivideQuestion> | null>(null);
  const [choices, setChoices] = useState<number[]>([]);
  const [imageIndex, setImageIndex] = useState(0);
  const prevQuestionRef = useRef<string>("");

  const newQuestion = useCallback(() => {
    const q = generateDivideQuestion(divisor, maxDividend, prevQuestionRef.current);
    prevQuestionRef.current = q.questionKey;
    setQuestion(q);
    setChoices(generateChoices(q.answer, 10));
    setImageIndex(Math.floor(Math.random() * ThingImages.length));
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

  const thingImage = ThingImages[imageIndex];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xl px-4">
      <FeedbackCard feedback={quiz.feedback} className="p-4 md:p-6">
        <div className="flex flex-col items-center gap-3">
          <p
            className="text-lg font-bold text-purple-600 cursor-pointer hover:text-purple-800 transition-colors"
            onClick={() => speak(`${question.dividend} ${thingImage.name} chia ${question.divisor} nhóm`)}
          >
            {question.dividend} {thingImage.name} chia đều {question.divisor} nhóm
          </p>

          {/* Show items divided into groups */}
          <div className="flex flex-wrap justify-center gap-3">
            {Array.from({ length: question.divisor }).map((_, gi) => (
              <div
                key={`group-${gi}`}
                className="border-2 border-dashed border-emerald-300 rounded-2xl p-2 flex flex-wrap gap-1 justify-center items-center min-w-[50px] cursor-pointer hover:scale-105 hover:border-emerald-500 transition-all active:scale-95"
                onClick={() => speak(`${question.answer} ${thingImage.name}`)}
              >
                {Array.from({ length: question.answer }).map((_, ii) => (
                  <div key={`item-${gi}-${ii}`} className="w-8 h-8 md:w-10 md:h-10 relative">
                    <Image src={thingImage.icon} alt="item" fill className="object-contain drop-shadow-md" />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Equation */}
          <div
            className="flex items-center gap-2 mt-2 cursor-pointer hover:scale-105 transition-all active:scale-95"
            onClick={() => speak(`${question.dividend} chia ${question.divisor} bằng mấy?`)}
          >
            <span className="text-3xl font-black text-purple-600">{question.dividend}</span>
            <span className="text-3xl font-black text-emerald-500">÷</span>
            <span className="text-3xl font-black text-purple-600">{question.divisor}</span>
            <span className="text-3xl font-black text-emerald-500">=</span>
            <span className="text-3xl font-black text-slate-400 animate-pulse">?</span>
          </div>
        </div>
      </FeedbackCard>

      <SpeakerButton onSpeak={() => speak(`${question.dividend} chia ${question.divisor} bằng mấy?`)} />

      <ChoiceGrid choices={choices} correctAnswer={question.answer} feedback={quiz.feedback} onChoice={quiz.handleChoice} />
    </div>
  );
}
