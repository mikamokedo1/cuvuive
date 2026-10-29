"use client";

import { useState, useRef, useEffect } from "react";
import { NextLessonButton } from "@/components/games/NextLessonButton";
import { BackLessonButton } from "@/components/games/BackLessonButton";
import {
  FeedbackCard,
  NumberBox,
  OperatorSign,
  SpeakerButton,
} from "@/features/games/_shared/math";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useSwipe } from "@/hooks/useSwipe";

interface ExplainMultiplyLessonProps {
  multiplier: number;
  onComplete: () => void;
  operation?: "multiply" | "divide";
}

const ROW_COLORS = [
  "bg-purple-500 border-purple-600",
  "bg-indigo-500 border-indigo-600",
  "bg-blue-500 border-blue-600",
  "bg-cyan-500 border-cyan-600",
  "bg-teal-500 border-teal-600",
  "bg-emerald-500 border-emerald-600",
  "bg-amber-500 border-amber-600",
  "bg-orange-500 border-orange-600",
  "bg-rose-500 border-rose-600",
];

export function ExplainMultiplyLesson({
  multiplier,
  onComplete,
  operation = "multiply",
}: ExplainMultiplyLessonProps) {
  const { speak } = useTextToSpeech();
  const [selectedFactor, setSelectedFactor] = useState<number>(3);
  const [visitedFactors, setVisitedFactors] = useState<number[]>([3]);
  const hasCompletedRef = useRef(false);

  const isDivide = operation === "divide";
  const product = multiplier * selectedFactor;
  const firstNum = isDivide ? product : multiplier;
  const secondNum = isDivide ? multiplier : selectedFactor;
  const answer = isDivide ? selectedFactor : product;
  const opSymbol = isDivide ? "÷" : "×";
  const opWord = isDivide ? "chia" : "nhân";

  const selectFactor = (n: number) => {
    setSelectedFactor(n);
    setVisitedFactors((prev) => (prev.includes(n) ? prev : [...prev, n]));
    if (isDivide) {
      speak(`${multiplier * n} chia ${multiplier} bằng ${n}`);
    } else {
      speak(`${multiplier} nhân ${n} bằng ${multiplier * n}`);
    }
  };

  useEffect(() => {
    const t = setTimeout(() => {
      if (isDivide) {
        speak(
          `Bảng chia ${multiplier}. ${multiplier * selectedFactor} chia ${multiplier} bằng ${selectedFactor}`,
        );
      } else {
        speak(
          `Bảng nhân ${multiplier}. ${multiplier} nhân ${selectedFactor} bằng ${multiplier * selectedFactor}`,
        );
      }
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [multiplier, isDivide]);

  const handleNext = () => {
    if (selectedFactor < 10) {
      selectFactor(selectedFactor + 1);
    } else if (!hasCompletedRef.current) {
      hasCompletedRef.current = true;
      onComplete();
    }
  };

  const handleBack = () => {
    if (selectedFactor > 1) {
      selectFactor(selectedFactor - 1);
    }
  };

  const swipeRef = useSwipe({ onSwipeLeft: handleNext, onSwipeRight: handleBack });

  return (
    <div
      ref={swipeRef}
      className="flex flex-col items-center gap-2.5 sm:gap-4 w-full max-w-4xl px-2 sm:px-4 select-none"
    >
      <FeedbackCard feedback={null} className="!p-3 sm:!p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-5 items-center">
          {/* LEFT COLUMN (5 cols): Interactive 1..10 Table Selector */}
          <div className="md:col-span-5 flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => {
                const isSelected = n === selectedFactor;
                const isVisited = visitedFactors.includes(n);
                const leftExpr = isDivide ? `${multiplier * n} ÷ ${multiplier}` : `${multiplier} × ${n}`;
                const rightRes = isDivide ? n : multiplier * n;
                return (
                  <button
                    key={n}
                    onClick={() => selectFactor(n)}
                    className={`flex items-center justify-between px-3 py-1.5 sm:px-3.5 sm:py-2.5 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base transition-all cursor-pointer border-2 ${
                      isSelected
                        ? "bg-purple-600 text-white border-purple-700 scale-[1.02] shadow-md"
                        : isVisited
                          ? "bg-emerald-50 text-slate-700 border-emerald-200 hover:bg-emerald-100"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-purple-50 hover:border-purple-200"
                    }`}
                  >
                    <span>{leftExpr}</span>
                    <span className={isSelected ? "text-amber-300" : "text-emerald-600"}>
                      = {rightRes}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN (7 cols): Shared Math Components + Pop-It Matrix */}
          <div className="md:col-span-7 flex flex-col gap-2 sm:gap-3 bg-slate-50 rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 border-2 border-slate-200">
            {/* Shared NumberBox + OperatorSign + SpeakerButton Equation Row */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2.5">
              <NumberBox
                value={firstNum}
                gradient="purple"
                speakText={`${firstNum}`}
                className="!w-12 !h-11 sm:!w-16 sm:!h-14 !rounded-xl [&_span]:!text-xl sm:[&_span]:!text-3xl"
              />
              <OperatorSign
                symbol={opSymbol}
                speakText={`dấu ${opWord}`}
                className="!text-2xl sm:!text-4xl"
              />
              <NumberBox
                value={secondNum}
                gradient="blue"
                speakText={`${secondNum}`}
                className="!w-11 !h-11 sm:!w-14 sm:!h-14 !rounded-xl [&_span]:!text-xl sm:[&_span]:!text-3xl"
              />
              <OperatorSign symbol="=" speakText="dấu bằng" className="!text-2xl sm:!text-4xl" />
              <NumberBox
                value={answer}
                gradient="emerald"
                speakText={`${answer}`}
                className="!w-12 !h-11 sm:!w-16 sm:!h-14 !rounded-xl [&_span]:!text-xl sm:[&_span]:!text-3xl"
              />
              <div className="ml-1">
                <SpeakerButton
                  onSpeak={() => speak(`${firstNum} ${opWord} ${secondNum} bằng ${answer}`)}
                />
              </div>
            </div>

            {/* Column Numbers Header (1..10) */}
            <div className="grid grid-cols-12 gap-1 items-center px-0.5 sm:px-1">
              <div className="col-span-1 text-[11px] sm:text-xs font-black text-slate-400 text-center">
                {opSymbol}
              </div>
              <div className="col-span-10 grid grid-cols-10 gap-1">
                {Array.from({ length: 10 }, (_, c) => c + 1).map((colNum) => (
                  <button
                    key={`col-hdr-${colNum}`}
                    onClick={() => selectFactor(colNum)}
                    className={`text-[11px] sm:text-xs font-black rounded-md py-0.5 text-center transition-all cursor-pointer ${
                      colNum <= selectedFactor
                        ? "bg-purple-600 text-white shadow-xs"
                        : "text-slate-400 hover:bg-slate-200"
                    }`}
                  >
                    {colNum}
                  </button>
                ))}
              </div>
              <div className="col-span-1 text-[11px] sm:text-xs font-black text-emerald-600 text-center">
                =
              </div>
            </div>

            {/* Matrix Rows (multiplier rows × 10 columns) */}
            <div className="flex flex-col gap-1 sm:gap-1.5">
              {Array.from({ length: multiplier }, (_, r) => r + 1).map((rowNum) => {
                const rowSum = rowNum * selectedFactor;
                const rowColor = ROW_COLORS[(rowNum - 1) % ROW_COLORS.length];

                return (
                  <div
                    key={`row-${rowNum}`}
                    className="grid grid-cols-12 gap-1 items-center px-0.5 sm:px-1"
                  >
                    <div className="col-span-1 text-[11px] sm:text-xs font-extrabold text-slate-500 text-center">
                      {isDivide ? `#${rowNum}` : `×${rowNum}`}
                    </div>

                    <div className="col-span-10 grid grid-cols-10 gap-1">
                      {Array.from({ length: 10 }, (_, c) => c + 1).map((colNum) => {
                        const isActive = colNum <= selectedFactor;
                        return (
                          <button
                            key={`cell-${rowNum}-${colNum}`}
                            onClick={() => selectFactor(colNum)}
                            className={`h-5 sm:h-7 rounded-md sm:rounded-lg border-b-2 transition-all cursor-pointer flex items-center justify-center ${
                              isActive
                                ? `${rowColor} text-white scale-100 shadow-xs`
                                : "bg-slate-200/70 border-slate-300/60 text-transparent hover:bg-slate-300"
                            }`}
                          >
                            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/60" />
                          </button>
                        );
                      })}
                    </div>

                    <div
                      onClick={() => speak(`${isDivide ? selectedFactor : rowSum}`)}
                      className="col-span-1 bg-emerald-100 text-emerald-800 font-black text-[11px] sm:text-xs rounded-md sm:rounded-lg py-0.5 sm:py-1 text-center cursor-pointer hover:bg-emerald-200 transition-colors"
                    >
                      {isDivide ? selectedFactor : rowSum}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </FeedbackCard>

      {/* Shared Navigation Buttons */}
      <div className="flex items-center gap-4 sm:gap-5">
        <BackLessonButton onClick={handleBack} disabled={selectedFactor <= 1} />
        <NextLessonButton onClick={handleNext} isLast={selectedFactor >= 10} />
      </div>
    </div>
  );
}
