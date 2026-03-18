"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ThingImages } from "@/libs/constants/thingImages";
import { NextLessonButton } from "@/components/games/NextLessonButton";
import { BackLessonButton } from "@/components/games/BackLessonButton";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useSwipe } from "@/hooks/useSwipe";

interface ExplainMultiplyLessonProps {
  multiplier: number;
  onComplete: () => void;
}

// Predefined examples per multiplier to keep it simple for kids
const EXAMPLES: Record<number, Array<{ groups: number; perGroup: number }>> = {
  2: [
    { groups: 2, perGroup: 1 },
    { groups: 2, perGroup: 2 },
    { groups: 2, perGroup: 3 },
    { groups: 2, perGroup: 4 },
    { groups: 2, perGroup: 5 },
  ],
  3: [
    { groups: 3, perGroup: 1 },
    { groups: 3, perGroup: 2 },
    { groups: 3, perGroup: 3 },
    { groups: 3, perGroup: 4 },
  ],
  4: [
    { groups: 4, perGroup: 1 },
    { groups: 4, perGroup: 2 },
    { groups: 4, perGroup: 3 },
  ],
  5: [
    { groups: 5, perGroup: 1 },
    { groups: 5, perGroup: 2 },
    { groups: 5, perGroup: 3 },
  ],
};

type Phase = "intro" | "example";

export function ExplainMultiplyLesson({ multiplier, onComplete }: ExplainMultiplyLessonProps) {
  const { speak } = useTextToSpeech();
  const [phase, setPhase] = useState<Phase>("intro");
  const [exampleIdx, setExampleIdx] = useState(0);
  const [animStage, setAnimStage] = useState(0); // 0: show groups, 1: show equation, 2: show answer
  const [imageIdx] = useState(() => Math.floor(Math.random() * ThingImages.length));
  const hasCompletedRef = useRef(false);

  const examples = EXAMPLES[multiplier] || EXAMPLES[2];
  const thingImage = ThingImages[imageIdx];
  const thingName = thingImage.name;

  const currentExample = examples[exampleIdx];
  const answer = currentExample.groups * currentExample.perGroup;

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

  const swipeRef = useSwipe({ onSwipeLeft: handleNext, onSwipeRight: handleBack });

  useEffect(() => {
    if (phase === "intro") {
      speak("dấu nhân");
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== "example") return;
    const ex = examples[exampleIdx];
    const ans = ex.groups * ex.perGroup;
    if (animStage === 0) {
      speak(`${ex.groups} nhóm, mỗi nhóm có ${ex.perGroup} ${thingName}`);
    } else if (animStage === 1) {
      speak(`${ex.groups} nhân ${ex.perGroup}`);
    } else if (animStage === 2) {
      speak(`bằng ${ans} ${thingName}`);
    }
  }, [phase, exampleIdx, animStage]);

  // --- INTRO ---
  if (phase === "intro") {
    return (
      <div ref={swipeRef} className="flex flex-col items-center gap-8 w-full max-w-lg px-4">
        <span
          onClick={() => speak("dấu nhân")}
          className="text-9xl font-black drop-shadow-lg text-purple-500 animate-scale cursor-pointer"
        >
          ×
        </span>
        <p className="text-2xl font-bold text-slate-600 text-center">Dấu Nhân</p>
        <div className="flex items-center gap-6">
          <NextLessonButton onClick={handleNext} isLast={false} />
        </div>
      </div>
    );
  }

  // --- EXAMPLES ---
  return (
    <div ref={swipeRef} className="flex flex-col items-center gap-6 w-full max-w-md px-4">
      {/* Main card */}
      <div className="bg-white rounded-[32px] p-6 border-4 border-purple-200 shadow-2xl shadow-purple-100/50 w-full transition-all">
        {/* Step 0: Show groups of items */}
        <div className="flex flex-col items-center">
          <p className="text-lg font-bold text-purple-600 mb-3">
            {currentExample.groups} nhóm, mỗi nhóm {currentExample.perGroup} {thingName}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {Array.from({ length: currentExample.groups }).map((_, gi) => (
              <div
                key={`group-${gi}`}
                className="border-2 border-dashed border-purple-300 rounded-2xl p-2 flex flex-wrap gap-1 justify-center items-center min-w-[60px] cursor-pointer hover:scale-105 hover:border-purple-500 transition-all active:scale-95"
                onClick={() => speak(`${currentExample.perGroup} ${thingName}`)}
              >
                {Array.from({ length: currentExample.perGroup }).map((_, ii) => (
                  <div key={`item-${gi}-${ii}`} className="w-10 h-10 sm:w-12 sm:h-12 relative">
                    <Image src={thingImage.icon} alt="" fill className="object-contain drop-shadow-md" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Show equation */}
        <div
          className={`flex flex-col items-center mt-4 transition-all duration-500 ease-out ${
            animStage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 h-0 mt-0 overflow-hidden"
          }`}
        >
          <div
            className="bg-purple-50 rounded-2xl px-6 py-3 cursor-pointer hover:scale-105 transition-all active:scale-95"
            onClick={() => speak(`${currentExample.groups} nhân ${currentExample.perGroup}`)}
          >
            <span className="text-3xl sm:text-4xl font-black text-purple-600 tracking-wide">
              {currentExample.groups} × {currentExample.perGroup}
            </span>
          </div>
        </div>

        {/* Step 2: Show answer */}
        <div
          className={`flex flex-col items-center mt-4 transition-all duration-500 ease-out ${
            animStage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 h-0 mt-0 overflow-hidden"
          }`}
        >
          <span className="text-7xl font-black drop-shadow-lg text-emerald-500 animate-scale cursor-pointer" onClick={() => speak("dấu bằng")}>
            =
          </span>

          {/* Answer items */}
          <div
            className="flex gap-1.5 flex-wrap justify-center mt-2 cursor-pointer hover:scale-[1.02] transition-all"
            onClick={() => speak(`${answer} ${thingName}`)}
          >
            {Array.from({ length: answer }).map((_, i) => (
              <div key={`ans-${i}`} className="w-10 h-10 sm:w-12 sm:h-12 relative">
                <Image src={thingImage.icon} alt="" fill className="object-contain drop-shadow-md" />
              </div>
            ))}
          </div>

          {/* Equation summary */}
          <div
            className="mt-4 bg-slate-50 rounded-2xl px-6 py-3 animate-scale cursor-pointer"
            onClick={() => speak(`${currentExample.groups} nhân ${currentExample.perGroup} bằng ${answer}`)}
          >
            <span className="text-3xl sm:text-4xl font-black text-orange-500 tracking-wide">
              {currentExample.groups} × {currentExample.perGroup} = {answer}
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
