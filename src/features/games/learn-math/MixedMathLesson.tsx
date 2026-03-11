"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { ThingImages } from "@/libs/constants/thingImages";
import { generateMathQuestion, generateChoices, MathOperator } from "./constants";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { SymbolComponent } from "./ExplainMathLesson";
const LoudSpeaker = "https://assets.cuthongminh.com/games/loud-speaker.webp";
import { FeedbackType } from "@/types/game";

interface MixedMathLessonProps {
  mode: "visual" | "number" | "mixed";
  maxSum: number;
  onComplete: () => void;
}

const REQUIRED_WINS = 10;

export function MixedMathLesson({ mode, maxSum, onComplete }: MixedMathLessonProps) {
  const { speak } = useTextToSpeech();
  const [question, setQuestion] = useState<ReturnType<typeof generateMathQuestion> | null>(null);
  const [displayMode, setDisplayMode] = useState<"visual" | "number">("visual");
  const [choices, setChoices] = useState<number[]>([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const prevQuestionRef = useRef<string>("");

  const newQuestion = useCallback(() => {
    const q = generateMathQuestion("mixed", maxSum, prevQuestionRef.current);
    prevQuestionRef.current = q.questionKey;
    setQuestion(q);
    setChoices(generateChoices(q.answer, maxSum));

    // Determine display mode
    if (mode === "mixed") {
      setDisplayMode(Math.random() > 0.5 ? "visual" : "number");
    } else {
      setDisplayMode(mode);
    }

    setImageIndex(Math.floor(Math.random() * ThingImages.length));
    setFeedback(null);

    const sym = q.op === "add" ? "cộng" : "trừ";
    setTimeout(() => speak(`${q.a} ${sym} ${q.b} bằng mấy?`), 500);
  }, [maxSum, mode]);

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

  const symbol = question.op === "add" ? "+" : "−";
  const thingImage = ThingImages[imageIndex];
  const secondImage = ThingImages[(imageIndex + 1) % ThingImages.length];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xl px-4">
      {/* Display area */}
      <div
        className={`bg-white/90 rounded-3xl p-4 md:p-6 shadow-xl border-4 w-full transition-all ${
          feedback === "correct"
            ? "border-green-400 bg-green-50"
            : feedback === "wrong"
              ? "border-red-400 bg-red-50 animate-shake"
              : "border-yellow-200"
        }`}
      >
        {displayMode === "visual" ? (
          <>
            <div className="flex items-center justify-center gap-3 flex-wrap cursor-pointer">
              <div className="flex flex-wrap justify-center gap-2 max-w-[40%]">
                {Array.from({ length: question.a }).map((_, i) => (
                  <div key={`a-${i}`} className="w-10 h-10 md:w-12 md:h-12 relative">
                    <Image src={thingImage.icon} alt="item" fill className="object-contain drop-shadow-md" />
                  </div>
                ))}
              </div>
              <SymbolComponent symbol={symbol} size="text-7xl" />
              <div className="flex flex-wrap justify-center gap-2 max-w-[40%]">
                {Array.from({ length: question.b }).map((_, i) => (
                  <div
                    key={`b-${i}`}
                    className={`w-10 h-10 md:w-12 md:h-12 relative ${question.op === "sub" ? "opacity-60 grayscale" : ""}`}
                  >
                    <Image src={thingImage.icon} alt="item" fill className="object-contain drop-shadow-md" />
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center gap-4">
            <div
              className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-b ${
                question.op === "add" ? "from-blue-400 to-blue-600" : "from-orange-400 to-orange-600"
              } flex items-center justify-center shadow-lg`}
            >
              <span className="text-4xl md:text-5xl font-black text-white">{question.a}</span>
            </div>
            <SymbolComponent symbol={symbol} size="text-7xl" />
            <div
              className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-b ${
                question.op === "add" ? "from-green-400 to-green-600" : "from-red-400 to-red-600"
              } flex items-center justify-center shadow-lg`}
            >
              <span className="text-4xl md:text-5xl font-black text-white">{question.b}</span>
            </div>
            <SymbolComponent symbol="=" size="text-7xl" />
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-b from-slate-300 to-slate-400 flex items-center justify-center shadow-lg animate-pulse">
              <span className="text-4xl md:text-5xl font-black text-white">?</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-4 text-center">
        <button
          onClick={() => speak(`${question.a} ${symbol === "−" ? "trừ" : "cộng"} ${question.b} bằng mấy?`)}
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
