"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { ThingImages } from "@/libs/constants/thingImages";
import { generateMultiplyQuestion, generateChoices } from "./constants";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useQuizLogic } from "@/hooks/useQuizLogic";
import { FeedbackCard, ChoiceGrid, SpeakerButton, OperatorSign } from "@/features/games/_shared/math";

interface VisualMultiplyLessonProps {
  multiplier: number | "mixed";
  maxProduct: number;
  onComplete: () => void;
}

export function VisualMultiplyLesson({ multiplier, maxProduct, onComplete }: VisualMultiplyLessonProps) {
  const { speak } = useTextToSpeech();
  const [question, setQuestion] = useState<ReturnType<typeof generateMultiplyQuestion> | null>(null);
  const [choices, setChoices] = useState<number[]>([]);
  const [imageIndex, setImageIndex] = useState(0);
  const prevQuestionRef = useRef<string>("");

  const newQuestion = useCallback(() => {
    const q = generateMultiplyQuestion(multiplier, maxProduct, prevQuestionRef.current);
    prevQuestionRef.current = q.questionKey;
    setQuestion(q);
    setChoices(generateChoices(q.answer, maxProduct));
    setImageIndex(Math.floor(Math.random() * ThingImages.length));
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

  const thingImage = ThingImages[imageIndex];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xl px-4">
      <FeedbackCard feedback={quiz.feedback} className="p-4 md:p-6">
        <div className="flex flex-col items-center gap-3">
          <p
            className="text-lg font-bold text-purple-600 cursor-pointer hover:text-purple-800 transition-colors"
            onClick={() => speak(`${question.a} nhóm, mỗi nhóm ${question.b} ${thingImage.name}`)}
          >
            {question.a} nhóm, mỗi nhóm {question.b} {thingImage.name}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {Array.from({ length: question.a }).map((_, gi) => (
              <div
                key={`group-${gi}`}
                className="border-2 border-dashed border-purple-300 rounded-2xl p-2 flex flex-wrap gap-1 justify-center items-center min-w-[50px] cursor-pointer hover:scale-105 hover:border-purple-500 transition-all active:scale-95"
                onClick={() => speak(`${question.b} ${thingImage.name}`)}
              >
                {Array.from({ length: question.b }).map((_, ii) => (
                  <div key={`item-${gi}-${ii}`} className="w-8 h-8 md:w-10 md:h-10 relative">
                    <Image src={thingImage.icon} alt="item" fill className="object-contain drop-shadow-md" />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div
            className="flex items-center gap-2 mt-2 cursor-pointer hover:scale-105 transition-all active:scale-95"
            onClick={() => speak(`${question.a} nhân ${question.b} bằng mấy?`)}
          >
            <span className="text-3xl font-black text-purple-600">{question.a}</span>
            <span className="text-3xl font-black text-emerald-500">×</span>
            <span className="text-3xl font-black text-purple-600">{question.b}</span>
            <OperatorSign symbol="=" speakText="dấu bằng" className="!text-3xl" />
            <span className="text-3xl font-black text-slate-400 animate-pulse">?</span>
          </div>
        </div>
      </FeedbackCard>

      <SpeakerButton onSpeak={() => speak(`${question.a} nhân ${question.b} bằng mấy?`)} />

      <ChoiceGrid choices={choices} correctAnswer={question.answer} feedback={quiz.feedback} onChoice={quiz.handleChoice} />
    </div>
  );
}
