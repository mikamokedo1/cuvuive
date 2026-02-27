"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ThingImages } from "@/libs/constants/thingImages";
import { MathOperator, SymbolToText } from "./constants";
import { NextLessonButton } from "@/components/games/NextLessonButton";
import { BackLessonButton } from "@/components/games/BackLessonButton";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

interface ExplainMathLessonProps {
  operator: MathOperator;
  onComplete: () => void;
}

const EXAMPLES_ADD = [
  { a: 1, b: 1 },
  { a: 2, b: 1 },
  { a: 1, b: 2 },
  { a: 2, b: 3 },
];

const EXAMPLES_SUB = [
  { a: 2, b: 1 },
  { a: 3, b: 1 },
  { a: 3, b: 2 },
  { a: 5, b: 2 },
];

type Phase = "intro" | "example";

export const SymbolComponent = ({ symbol, size = "text-9xl" }: { symbol: string; size?: string }) => {
  const { speak } = useTextToSpeech();
  return (
    <span
      onClick={() => speak(symbol === "=" ? "dấu bằng" : SymbolToText(symbol))}
      className={`${size} font-black drop-shadow-lg text-emerald-500 animate-scale cursor-pointer`}
    >
      {symbol}
    </span>
  );
};

export function ExplainMathLesson({ operator, onComplete }: ExplainMathLessonProps) {
  const { speak } = useTextToSpeech();
  const [phase, setPhase] = useState<Phase>("intro");
  const [exampleIdx, setExampleIdx] = useState(0);
  const [animStage, setAnimStage] = useState(0);
  const [imageIdx] = useState(() => Math.floor(Math.random() * ThingImages.length));
  const hasCompletedRef = useRef(false);

  const symbol = operator === "add" ? "+" : "−";
  const examples = operator === "add" ? EXAMPLES_ADD : EXAMPLES_SUB;
  const thingImage = ThingImages[imageIdx];
  const operatorWord = operator === "add" ? "cộng" : "trừ";
  const thingName = thingImage.name;

  const currentExample = examples[exampleIdx];
  const answer = operator === "add" ? currentExample.a + currentExample.b : currentExample.a - currentExample.b;

  const isFirst = phase === "intro";
  const isLast = phase === "example" && exampleIdx === examples.length - 1 && animStage >= 2;

  const handleNext = () => {
    if (phase === "intro") {
      setPhase("example");
      setExampleIdx(0);
      setAnimStage(0);
      return;
    }
    if (animStage < 2) {
      setAnimStage((s) => s + 1);
      return;
    }
    if (exampleIdx < examples.length - 1) {
      setExampleIdx((i) => i + 1);
      setAnimStage(0);
    } else if (!hasCompletedRef.current) {
      hasCompletedRef.current = true;
      onComplete();
    }
  };

  const handleBack = () => {
    if (phase === "example") {
      if (animStage > 0) {
        setAnimStage((s) => s - 1);
      } else if (exampleIdx > 0) {
        setExampleIdx((i) => i - 1);
        setAnimStage(2);
      } else {
        setPhase("intro");
      }
    }
  };

  useEffect(() => {
    if (phase === "intro") {
      speak(SymbolToText(symbol));
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== "example") return;
    const ex = examples[exampleIdx];
    const ans = operator === "add" ? ex.a + ex.b : ex.a - ex.b;
    if (animStage === 0) {
      speak(`${ex.a} ${thingName}`);
    } else if (animStage === 1) {
      speak(`${operatorWord} ${ex.b} ${thingName}`);
    } else if (animStage === 2) {
      speak(`bằng ${ans} ${thingName}`);
    }
  }, [phase, exampleIdx, animStage]);

  // --- INTRO ---
  if (phase === "intro") {
    return (
      <div className="flex flex-col items-center gap-8 w-full max-w-lg px-4">
        <SymbolComponent symbol={symbol} />
        <div className="flex items-center gap-6">
          <NextLessonButton onClick={handleNext} isLast={false} />
        </div>
      </div>
    );
  }

  // --- EXAMPLES ---
  const accentBg = operator === "add" ? "bg-green-500" : "bg-orange-500";
  const accentText = operator === "add" ? "text-green-600" : "text-orange-600";
  const cardBorder = operator === "add" ? "border-green-200" : "border-orange-200";
  const cardShadow = operator === "add" ? "shadow-green-100/50" : "shadow-orange-100/50";

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md px-4">
      {/* Main card */}
      <div
        className={`bg-white rounded-[32px] p-6 border-4 ${cardBorder} shadow-2xl ${cardShadow} w-full transition-all`}
      >
        {/* Step 0: First group */}
        <div className="flex flex-col items-center">
          {/* Number badge + items */}
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5 flex-wrap justify-center">
              {Array.from({ length: currentExample.a }).map((_, i) => (
                <div key={`a-${i}`} className="w-14 h-14 sm:w-16 sm:h-16 relative">
                  <Image src={thingImage.icon} alt="" fill className="object-contain drop-shadow-md" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step 1: Operator + second group */}
        <div
          className={`flex flex-col items-center mt-4 transition-all duration-500 ease-out ${
            animStage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 h-0 mt-0 overflow-hidden"
          }`}
        >
          {/* Operator badge */}
          <SymbolComponent symbol={symbol} size="text-7xl" />

          {/* B items with number */}
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5 flex-wrap justify-center">
              {Array.from({ length: currentExample.b }).map((_, i) => (
                <div
                  key={`b-${i}`}
                  className={`w-14 h-14 sm:w-16 sm:h-16 relative ${operator === "sub" ? "opacity-30 grayscale" : ""}`}
                >
                  <Image src={thingImage.icon} alt="" fill className="object-contain drop-shadow-md" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step 2: Answer */}
        <div
          className={`flex flex-col items-center mt-4 transition-all duration-500 ease-out ${
            animStage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 h-0 mt-0 overflow-hidden"
          }`}
        >
          <SymbolComponent symbol="=" size="text-7xl" />

          {/* = sign + answer */}
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5 flex-wrap justify-center">
              {Array.from({ length: answer }).map((_, i) => (
                <div key={`ans-${i}`} className="w-14 h-14 sm:w-16 sm:h-16 relative">
                  <Image src={thingImage.icon} alt="" fill className="object-contain drop-shadow-md" />
                </div>
              ))}
            </div>
          </div>

          {/* Equation summary */}
          <div
            className="mt-4 bg-slate-50 rounded-2xl px-6 py-3 animate-scale cursor-pointer"
            onClick={() => speak(`${currentExample.a} ${symbol} ${currentExample.b} = ${answer}`)}
          >
            <span className="text-3xl sm:text-4xl font-black text-orange-500 tracking-wide">
              {currentExample.a} {symbol} {currentExample.b} = {answer}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-6">
        <BackLessonButton onClick={handleBack} disabled={isFirst} />
        <NextLessonButton onClick={handleNext} isLast={isLast} />
      </div>
    </div>
  );
}
