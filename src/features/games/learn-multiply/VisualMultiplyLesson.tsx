"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { ThingImages } from "@/libs/constants/thingImages";
import { generateMultiplyQuestion, generateChoices } from "./constants";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { FeedbackType } from "@/types/game";
import { LoudSpeaker } from "@/libs/constants/game-assets";

interface VisualMultiplyLessonProps {
  multiplier: number | "mixed";
  maxProduct: number;
  onComplete: () => void;
}

const REQUIRED_WINS = 8;

export function VisualMultiplyLesson({ multiplier, maxProduct, onComplete }: VisualMultiplyLessonProps) {
  const { speak } = useTextToSpeech();
  const [question, setQuestion] = useState<ReturnType<typeof generateMultiplyQuestion> | null>(null);
  const [choices, setChoices] = useState<number[]>([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const prevQuestionRef = useRef<string>("");

  const newQuestion = useCallback(() => {
    const q = generateMultiplyQuestion(multiplier, maxProduct, prevQuestionRef.current);
    prevQuestionRef.current = q.questionKey;
    setQuestion(q);
    setChoices(generateChoices(q.answer, maxProduct));
    setImageIndex(Math.floor(Math.random() * ThingImages.length));
    setFeedback(null);

    setTimeout(() => speak(`${q.a} nhân ${q.b} bằng mấy?`), 500);
  }, [multiplier, maxProduct]);

  useEffect(() => {
    newQuestion();
  }, [newQuestion]);

  const handleChoice = (choice: number) => {
    if (feedback || !question) return;

    if (choice === question.answer) {
      speak(`Đúng rồi, bằng ${question.answer}`);
      setFeedback("correct");
      const newCount = correctCount + 1;
      setCorrectCount(newCount);

      if (newCount >= REQUIRED_WINS) {
        playWinEffect(500);
        setTimeout(onComplete, 1200);
      } else {
        setTimeout(newQuestion, 1500);
      }
    } else {
      speak("Sai rồi, thử lại nhé");
      setFeedback("wrong");
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  if (!question) return null;

  const thingImage = ThingImages[imageIndex];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xl px-4">
      {/* Visual display: groups of items */}
      <div
        className={`bg-white/90 rounded-3xl p-4 md:p-6 shadow-xl border-4 w-full transition-all ${
          feedback === "correct"
            ? "border-green-400 bg-green-50"
            : feedback === "wrong"
              ? "border-red-400 bg-red-50 animate-shake"
              : "border-purple-200"
        }`}
      >
        <div className="flex flex-col items-center gap-3">
          {/* Show groups */}
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

          {/* Equation */}
          <div
            className="flex items-center gap-2 mt-2 cursor-pointer hover:scale-105 transition-all active:scale-95"
            onClick={() => speak(`${question.a} nhân ${question.b} bằng mấy?`)}
          >
            <span className="text-3xl font-black text-purple-600">{question.a}</span>
            <span className="text-3xl font-black text-emerald-500">×</span>
            <span className="text-3xl font-black text-purple-600">{question.b}</span>
            <span className="text-3xl font-black text-emerald-500">=</span>
            <span className="text-3xl font-black text-slate-400 animate-pulse">?</span>
          </div>
        </div>
      </div>

      {/* Speaker button */}
      <div className="flex flex-col items-center gap-4 text-center">
        <button
          onClick={() => speak(`${question.a} nhân ${question.b} bằng mấy?`)}
          className="cursor-pointer hover:scale-105 transition-all"
        >
          <Image width={48} height={40} src={LoudSpeaker} alt="Speaker" className="w-12 h-10" />
        </button>
      </div>

      {/* Answer choices */}
      <div className="grid grid-cols-3 gap-4 md:gap-8 w-full max-w-2xl justify-items-center mt-2">
        {choices.map((choice) => (
          <div
            key={choice}
            onClick={() => handleChoice(choice)}
            className={`
              w-24 h-24 sm:w-32 sm:h-32 rounded-2xl shadow-lg border-4 bg-white
              flex items-center justify-center cursor-pointer
              transform transition-all duration-200 hover:scale-110 active:scale-95
              ${feedback === "wrong" && "opacity-30 grayscale"}
              ${feedback === "correct" && choice === question.answer ? "border-green-500 scale-110 shadow-green-200" : "border-white"}
            `}
          >
            <span className="text-4xl sm:text-5xl font-black text-orange-500">{choice}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
