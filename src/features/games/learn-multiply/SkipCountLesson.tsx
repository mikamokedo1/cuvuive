"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { generateSkipCountQuestion, generateChoices } from "./constants";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { FeedbackType } from "@/types/game";
import { LoudSpeaker } from "@/libs/constants/game-assets";

interface SkipCountLessonProps {
  multiplier: number | "mixed";
  onComplete: () => void;
}

const REQUIRED_WINS = 8;

export function SkipCountLesson({ multiplier, onComplete }: SkipCountLessonProps) {
  const { speak } = useTextToSpeech();
  const [question, setQuestion] = useState<ReturnType<typeof generateSkipCountQuestion> | null>(null);
  const [choices, setChoices] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const prevQuestionRef = useRef<string>("");

  const newQuestion = useCallback(() => {
    const q = generateSkipCountQuestion(multiplier, prevQuestionRef.current);
    prevQuestionRef.current = q.questionKey;
    setQuestion(q);
    // Max for choices: the largest number in the sequence + some
    const maxVal = Math.max(...q.sequence.filter((v): v is number => v !== null)) + 10;
    setChoices(generateChoices(q.answer, maxVal));
    setFeedback(null);

    const seqText = q.sequence.map((v) => (v === null ? "mấy" : v)).join(", ");
    setTimeout(() => speak(`Điền số còn thiếu: ${seqText}`), 500);
  }, [multiplier]);

  useEffect(() => {
    newQuestion();
  }, [newQuestion]);

  const handleChoice = (choice: number) => {
    if (feedback || !question) return;

    if (choice === question.answer) {
      speak(`Đúng rồi, là ${question.answer}`);
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

  // Color theme for skip counting
  const colors = [
    "from-blue-400 to-blue-600",
    "from-green-400 to-green-600",
    "from-purple-400 to-purple-600",
    "from-pink-400 to-pink-600",
    "from-orange-400 to-orange-600",
  ];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xl px-4">
      {/* Title */}
      <div className="text-center">
        <h3
          className="text-xl font-bold text-purple-700 cursor-pointer hover:text-purple-900 transition-colors"
          onClick={() => speak(`Điền số còn thiếu vào chuỗi`)}
        >
          Điền số còn thiếu vào chuỗi
        </h3>
      </div>

      {/* Sequence display */}
      <div
        className={`bg-white/90 rounded-3xl p-4 md:p-6 shadow-xl border-4 w-full transition-all ${
          feedback === "correct"
            ? "border-green-400 bg-green-50"
            : feedback === "wrong"
              ? "border-red-400 bg-red-50 animate-shake"
              : "border-purple-200"
        }`}
      >
        <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap">
          {question.sequence.map((value, idx) => (
            <div key={idx} className="flex items-center gap-1 md:gap-2">
              {value === null ? (
                feedback === "correct" ? (
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-b from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-200 animate-scale">
                    <span className="text-2xl md:text-3xl font-black text-white">{question.answer}</span>
                  </div>
                ) : (
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border-4 border-dashed border-orange-400 bg-orange-50 flex items-center justify-center shadow-lg animate-pulse cursor-pointer hover:scale-110 transition-all"
                    onClick={() => speak("mấy?")}
                  >
                    <span className="text-3xl md:text-4xl font-black text-orange-400">?</span>
                  </div>
                )
              ) : (
                <div
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-b ${colors[idx % colors.length]} flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-all active:scale-95`}
                  onClick={() => speak(`${value}`)}
                >
                  <span className="text-2xl md:text-3xl font-black text-white">{value}</span>
                </div>
              )}
              {idx < question.sequence.length - 1 && <span className="text-2xl font-bold text-slate-300">→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Speaker button */}
      <div className="flex flex-col items-center gap-4 text-center">
        <button
          onClick={() => {
            const seqText = question.sequence.map((v) => (v === null ? "mấy" : v)).join(", ");
            speak(`Điền số còn thiếu: ${seqText}`);
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
