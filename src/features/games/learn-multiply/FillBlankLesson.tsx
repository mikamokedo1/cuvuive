"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { generateFillBlankQuestion, generateChoices } from "./constants";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { FeedbackType } from "@/types/game";
import { LoudSpeaker } from "@/libs/constants/game-assets";

interface FillBlankLessonProps {
  multiplier: number | "mixed";
  maxProduct: number;
  onComplete: () => void;
}

const REQUIRED_WINS = 8;

export function FillBlankLesson({ multiplier, maxProduct, onComplete }: FillBlankLessonProps) {
  const { speak } = useTextToSpeech();
  const [question, setQuestion] = useState<ReturnType<typeof generateFillBlankQuestion> | null>(null);
  const [choices, setChoices] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const prevQuestionRef = useRef<string>("");

  const newQuestion = useCallback(() => {
    const q = generateFillBlankQuestion(multiplier, maxProduct, prevQuestionRef.current);
    prevQuestionRef.current = q.questionKey;
    setQuestion(q);
    // Generate choices for the missing value (not the product)
    const maxChoice = q.missingPosition === "a" ? 10 : 10;
    setChoices(generateChoices(q.missingValue, maxChoice));
    setFeedback(null);

    setTimeout(() => {
      if (q.missingPosition === "a") {
        speak(`mấy nhân ${q.b} bằng ${q.answer}?`);
      } else {
        speak(`${q.a} nhân mấy bằng ${q.answer}?`);
      }
    }, 500);
  }, [multiplier, maxProduct]);

  useEffect(() => {
    newQuestion();
  }, [newQuestion]);

  const handleChoice = (choice: number) => {
    if (feedback || !question) return;

    if (choice === question.missingValue) {
      speak(`Đúng rồi, là số ${question.missingValue}`);
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

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xl px-4">
      {/* Equation with blank */}
      <div
        className={`bg-white/90 rounded-3xl p-6 md:p-8 shadow-xl border-4 w-full transition-all ${
          feedback === "correct"
            ? "border-green-400 bg-green-50"
            : feedback === "wrong"
              ? "border-red-400 bg-red-50 animate-shake"
              : "border-purple-200"
        }`}
      >
        <div className="flex items-center justify-center gap-3 md:gap-4">
          {/* Number A or blank */}
          {question.missingPosition === "a" ? (
            feedback === "correct" ? (
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-b from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-200 animate-scale">
                <span className="text-4xl md:text-5xl font-black text-white">{question.missingValue}</span>
              </div>
            ) : (
              <div
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl border-4 border-dashed border-orange-400 bg-orange-50 flex items-center justify-center shadow-lg animate-pulse cursor-pointer hover:scale-110 transition-all"
                onClick={() => speak("mấy?")}
              >
                <span className="text-4xl md:text-5xl font-black text-orange-400">?</span>
              </div>
            )
          ) : (
            <div
              className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-b from-purple-400 to-purple-600 flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-all active:scale-95"
              onClick={() => speak(`${question.a}`)}
            >
              <span className="text-4xl md:text-5xl font-black text-white">{question.a}</span>
            </div>
          )}

          {/* Multiply sign */}
          <span
            className="text-5xl md:text-6xl font-black drop-shadow-lg text-emerald-500 cursor-pointer hover:scale-110 transition-all"
            onClick={() => speak("nhân")}
          >×</span>

          {/* Number B or blank */}
          {question.missingPosition === "b" ? (
            feedback === "correct" ? (
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-b from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-200 animate-scale">
                <span className="text-4xl md:text-5xl font-black text-white">{question.missingValue}</span>
              </div>
            ) : (
              <div
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl border-4 border-dashed border-orange-400 bg-orange-50 flex items-center justify-center shadow-lg animate-pulse cursor-pointer hover:scale-110 transition-all"
                onClick={() => speak("mấy?")}
              >
                <span className="text-4xl md:text-5xl font-black text-orange-400">?</span>
              </div>
            )
          ) : (
            <div
              className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-all active:scale-95"
              onClick={() => speak(`${question.b}`)}
            >
              <span className="text-4xl md:text-5xl font-black text-white">{question.b}</span>
            </div>
          )}

          {/* Equals */}
          <span
            className="text-5xl md:text-6xl font-black drop-shadow-lg text-emerald-500 cursor-pointer hover:scale-110 transition-all"
            onClick={() => speak("bằng")}
          >=</span>

          {/* Answer (always shown) */}
          <div
            className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-b from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-all active:scale-95"
            onClick={() => speak(`${question.answer}`)}
          >
            <span className="text-4xl md:text-5xl font-black text-white">{question.answer}</span>
          </div>
        </div>
      </div>

      {/* Speaker button */}
      <div className="flex flex-col items-center gap-4 text-center">
        <button
          onClick={() => {
            if (question.missingPosition === "a") {
              speak(`mấy nhân ${question.b} bằng ${question.answer}?`);
            } else {
              speak(`${question.a} nhân mấy bằng ${question.answer}?`);
            }
          }}
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
              ${feedback === "correct" && choice === question.missingValue ? "border-green-500 scale-110 shadow-green-200" : "border-white"}
            `}
          >
            <span className="text-4xl sm:text-5xl font-black text-orange-500">{choice}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
