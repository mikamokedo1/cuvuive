"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { BILLS, BillDef } from "./constants";
import { NextLessonButton } from "@/components/games/NextLessonButton";
import { BackLessonButton } from "@/components/games/BackLessonButton";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useSwipe } from "@/hooks/useSwipe";

interface ExplainMoneyLessonProps {
  onComplete: () => void;
}

export function ExplainMoneyLesson({ onComplete }: ExplainMoneyLessonProps) {
  const { speak } = useTextToSpeech();
  const [billIdx, setBillIdx] = useState(0);
  const hasCompletedRef = useRef(false);

  const bill = BILLS[billIdx];
  const isFirst = billIdx === 0;
  const isLast = billIdx === BILLS.length - 1;

  const handleNext = () => {
    if (billIdx < BILLS.length - 1) {
      setBillIdx((i) => i + 1);
    } else if (!hasCompletedRef.current) {
      hasCompletedRef.current = true;
      onComplete();
    }
  };

  const handleBack = () => {
    if (billIdx > 0) {
      setBillIdx((i) => i - 1);
    }
  };

  const swipeRef = useSwipe({ onSwipeLeft: handleNext, onSwipeRight: handleBack });

  useEffect(() => {
    speak(`Đây là tờ ${bill.labelFull}. Chạm để lật xem 2 mặt nhé`);
  }, [billIdx]);

  return (
    <div ref={swipeRef} className="flex flex-col items-center gap-6 w-full max-w-lg px-4">
      {/* Main card */}
      <div className="bg-white rounded-[32px] p-6 md:p-8 border-4 border-purple-200 shadow-2xl w-full">
        <div className="flex flex-col items-center gap-4">
          <FlipBillCard bill={bill} />

          <span
            className={`text-4xl sm:text-5xl font-black ${bill.textColor} cursor-pointer hover:scale-105 transition-all`}
            onClick={() => speak(bill.label)}
          >
            {bill.label}
          </span>
          <span
            className="text-xl sm:text-2xl font-bold text-gray-600 cursor-pointer hover:scale-105 transition-all"
            onClick={() => speak(bill.labelFull)}
          >
            {bill.labelFull}
          </span>
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

// ── Interactive Flip Card ──

function FlipBillCard({ bill }: { bill: BillDef }) {
  const { speak } = useTextToSpeech();
  const [isFlipped, setIsFlipped] = useState(false);
  const [imgErrorFront, setImgErrorFront] = useState(false);
  const [imgErrorBack, setImgErrorBack] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
    setImgErrorFront(false);
    setImgErrorBack(false);
  }, [bill.value]);

  const handleFlip = () => {
    setIsFlipped((f) => !f);
    speak(isFlipped ? "Mặt trước" : "Mặt sau");
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {/* 3D Flip container — 908:440 ratio */}
      <div
        onClick={handleFlip}
        className="cursor-pointer w-[280px] h-[136px] sm:w-[340px] sm:h-[165px]"
        style={{ perspective: "800px" }}
      >
        <div
          className="relative w-full h-full transition-transform duration-700 ease-in-out"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front face */}
          <div
            className="absolute inset-0 rounded-xl overflow-hidden shadow-lg"
            style={{ backfaceVisibility: "hidden" }}
          >
            {!imgErrorFront ? (
              <Image
                src={bill.imageFront}
                alt={`${bill.labelFull} - mặt trước`}
                fill
                className="object-cover"
                onError={() => setImgErrorFront(true)}
                sizes="(max-width: 640px) 280px, 340px"
              />
            ) : (
              <div className={`w-full h-full ${bill.color} flex flex-col items-center justify-center`}>
                <span className={`text-3xl font-black ${bill.textColor}`}>{bill.label}</span>
                <span className={`text-xs ${bill.textColor} opacity-70`}>Mặt trước</span>
              </div>
            )}
          </div>

          {/* Back face */}
          <div
            className="absolute inset-0 rounded-xl overflow-hidden shadow-lg"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {!imgErrorBack ? (
              <Image
                src={bill.imageBack}
                alt={`${bill.labelFull} - mặt sau`}
                fill
                className="object-cover"
                onError={() => setImgErrorBack(true)}
                sizes="(max-width: 640px) 280px, 340px"
              />
            ) : (
              <div className={`w-full h-full ${bill.color} flex flex-col items-center justify-center`}>
                <span className={`text-3xl font-black ${bill.textColor}`}>{bill.label}</span>
                <span className={`text-xs ${bill.textColor} opacity-70`}>Mặt sau</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <span className="text-sm font-semibold text-gray-500">{isFlipped ? "Mặt sau" : "Mặt trước"}</span>
    </div>
  );
}
