"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { BILLS, BillDef } from "./constants";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { FeedbackType } from "@/types/game";

interface SortBillsLessonProps {
  onComplete: () => void;
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function SortBillsLesson({ onComplete }: SortBillsLessonProps) {
  const { speak } = useTextToSpeech();
  const [bills, setBills] = useState<BillDef[]>([]);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);
  const completedRef = useRef(false);
  const requiredWins = 5;

  // Touch drag refs
  const touchStartIdx = useRef<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const generateRound = useCallback(() => {
    // Pick 4 random bills, ensure they're NOT already sorted
    let picked: BillDef[], shuffled: BillDef[];
    do {
      picked = shuffleArray(BILLS).slice(0, 4);
      shuffled = shuffleArray(picked);
    } while (shuffled.every((b, i) => i === 0 || b.value >= shuffled[i - 1].value));

    setBills(shuffled);
    setDragIdx(null);
    setOverIdx(null);
    setFeedback(null);
  }, []);

  useEffect(() => {
    generateRound();
    setTimeout(() => speak("Pé xếp các tờ tiền từ nhỏ đến lớn nhé"), 500);
  }, [generateRound]);

  const checkSorted = (arr: BillDef[]) => {
    const isSorted = arr.every((b, i) => i === 0 || b.value >= arr[i - 1].value);
    if (isSorted) {
      speak("Giỏi lắm!");
      setFeedback("correct");
      const newCount = correctCount + 1;
      setCorrectCount(newCount);

      if (newCount >= requiredWins) {
        if (!completedRef.current) {
          completedRef.current = true;
          playWinEffect(500);
          setTimeout(onComplete, 1200);
        }
      } else {
        setTimeout(generateRound, 1500);
      }
    }
  };

  const swapBills = (fromIdx: number, toIdx: number) => {
    if (fromIdx === toIdx || feedback) return;
    const newBills = [...bills];
    const [removed] = newBills.splice(fromIdx, 1);
    newBills.splice(toIdx, 0, removed);
    setBills(newBills);
    setDragIdx(null);
    setOverIdx(null);
    checkSorted(newBills);
  };

  // ── Desktop drag handlers ──
  const handleDragStart = (idx: number) => {
    if (feedback) return;
    setDragIdx(idx);
  };

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (dragIdx !== null && dragIdx !== idx) {
      setOverIdx(idx);
    }
  };

  const handleDrop = (idx: number) => {
    if (dragIdx !== null) {
      swapBills(dragIdx, idx);
    }
  };

  const handleDragEnd = () => {
    setDragIdx(null);
    setOverIdx(null);
  };

  // ── Touch drag handlers ──
  const getTouchOverIdx = (touchY: number) => {
    for (let i = 0; i < itemRefs.current.length; i++) {
      const el = itemRefs.current[i];
      if (el) {
        const rect = el.getBoundingClientRect();
        if (touchY >= rect.top && touchY <= rect.bottom) return i;
      }
    }
    return null;
  };

  const handleTouchStart = (idx: number) => {
    if (feedback) return;
    touchStartIdx.current = idx;
    setDragIdx(idx);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartIdx.current === null) return;
    const touch = e.touches[0];
    const over = getTouchOverIdx(touch.clientY);
    setOverIdx(over);
  };

  const handleTouchEnd = () => {
    if (touchStartIdx.current !== null && overIdx !== null) {
      swapBills(touchStartIdx.current, overIdx);
    }
    touchStartIdx.current = null;
    setDragIdx(null);
    setOverIdx(null);
  };

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-md px-4">
      {/* Vertical bill list */}
      <div ref={listRef} className="flex flex-col gap-3" onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        {bills.map((bill, idx) => {
          const isDragging = dragIdx === idx;
          const isOver = overIdx === idx && dragIdx !== idx;

          return (
            <div
              key={`${bill.value}-${idx}`}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              draggable={!feedback}
              onDragStart={() => handleDragStart(idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDrop={() => handleDrop(idx)}
              onDragEnd={handleDragEnd}
              onTouchStart={() => handleTouchStart(idx)}
              className={`
                flex items-center gap-3 rounded-2xl p-2 pr-4
                border-2 transition-all duration-200 select-none
                ${feedback === "correct" ? "border-green-400 bg-green-50" : "border-gray-200 bg-white hover:border-purple-300"}
                ${isDragging ? "opacity-50 scale-95 border-dashed border-purple-400" : ""}
                ${isOver ? "border-purple-500 bg-purple-50 scale-[1.02] shadow-lg" : ""}
                ${!feedback ? "cursor-grab active:cursor-grabbing" : ""}
              `}
            >
              {/* Drag handle */}
              <div className="flex flex-col gap-[3px] px-2 py-3 text-gray-300">
                <div className="w-4 h-[2px] bg-current rounded" />
                <div className="w-4 h-[2px] bg-current rounded" />
                <div className="w-4 h-[2px] bg-current rounded" />
              </div>

              {/* Bill image */}
              <div className="relative w-[120px] h-[58px] sm:w-[144px] sm:h-[70px] rounded-lg overflow-hidden shrink-0">
                <Image
                  src={bill.imageBack}
                  alt={bill.labelFull}
                  fill
                  className="object-cover pointer-events-none"
                  sizes="144px"
                  draggable={false}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
