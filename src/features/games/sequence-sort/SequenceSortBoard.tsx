"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { generatePuzzle, SortPuzzle, SortableItem } from "./constants";
import { PatternShape } from "@/features/games/find-pattern/PatternShape";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { playButtonSound, playWrongSound } from "@/libs/utils/playSound";
import { FeedbackType } from "@/types/game";

interface SequenceSortBoardProps {
  groupId: string;
  lessonId: string;
  onComplete: () => void;
}

const REQUIRED_WINS = 5;

export function SequenceSortBoard({ groupId, lessonId, onComplete }: SequenceSortBoardProps) {
  const { speak } = useTextToSpeech();
  const [puzzle, setPuzzle] = useState<SortPuzzle | null>(null);
  const [placedIds, setPlacedIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [score, setScore] = useState(0);
  const [wrongItemId, setWrongItemId] = useState<string | null>(null);

  const loadNewPuzzle = useCallback(
    (currentScore: number = 0) => {
      const newPuzzle = generatePuzzle(groupId, lessonId);
      setPuzzle(newPuzzle);
      setPlacedIds([]);
      setFeedback(null);
      setWrongItemId(null);

      setTimeout(() => {
        speak(newPuzzle.instruction);
      }, 400);
    },
    [groupId, lessonId, speak],
  );

  useEffect(() => {
    setScore(0);
    loadNewPuzzle(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId, lessonId]);

  const handleItemClick = (item: SortableItem) => {
    if (!puzzle || feedback === "correct") return;
    if (placedIds.includes(item.id)) return;

    const nextIndex = placedIds.length;
    const expectedId = puzzle.correctOrder[nextIndex];

    if (item.id === expectedId) {
      playButtonSound();
      const newPlaced = [...placedIds, item.id];
      setPlacedIds(newPlaced);
      setWrongItemId(null);

      // Check if puzzle complete
      if (newPlaced.length === puzzle.correctOrder.length) {
        setFeedback("correct");
        speak("Giỏi lắm!");

        setTimeout(() => {
          const newScore = score + 1;
          setScore(newScore);
          if (newScore >= REQUIRED_WINS) {
            onComplete();
          } else {
            loadNewPuzzle(newScore);
          }
        }, 1500);
      }
    } else {
      setWrongItemId(item.id);
      speak("Chưa đúng, thử lại nhé!");
      setTimeout(() => setWrongItemId(null), 600);
    }
  };

  if (!puzzle) return <div>Loading...</div>;

  const totalSlots = puzzle.correctOrder.length;
  const isWide = totalSlots >= 4;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl px-4">
      {/* Instruction */}
      <div className="text-center">
        <p className="text-lg md:text-2xl font-bold text-blue-500 drop-shadow-md">{puzzle.instruction}</p>
      </div>

      {/* Answer slots */}
      <div className="w-full bg-white/80 rounded-3xl p-4 md:p-6 shadow-xl border-4 border-white backdrop-blur-sm">
        <div className={`grid ${isWide ? "grid-cols-4" : "grid-cols-3"} gap-3 md:gap-4`}>
          {puzzle.correctOrder.map((slotId, index) => {
            const placed = placedIds.includes(slotId);
            const item = placed ? puzzle.items.find((i) => i.id === slotId) : null;

            return (
              <div
                key={`slot-${index}`}
                className={`
                  relative flex flex-col items-center justify-center
                  ${isWide ? "h-24 md:h-32" : "h-28 md:h-36"}
                  rounded-2xl border-3 transition-all duration-300
                  ${
                    placed
                      ? "border-green-400 bg-green-50 scale-[1.02]"
                      : "border-dashed border-slate-300 bg-slate-50/50"
                  }
                `}
              >
                {placed && item ? (
                  <div className="animate-popIn">
                    <SortItemDisplay item={item} size={isWide ? "sm" : "md"} />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-2xl md:text-3xl font-black text-slate-200">{index + 1}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direction arrows between slots */}
        <div className={`flex justify-center items-center gap-1 mt-2`}>
          {puzzle.correctOrder.map((_, i) => (
            <span key={`arrow-${i}`} className="text-slate-300 text-sm">
              {i < puzzle.correctOrder.length - 1 && <span className="font-bold">→</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Shuffled items to choose from */}
      <div className={`grid ${isWide ? "grid-cols-4" : "grid-cols-3"} gap-3 md:gap-5 w-full`}>
        {puzzle.items.map((item) => {
          const isPlaced = placedIds.includes(item.id);
          const isWrong = wrongItemId === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              disabled={isPlaced || feedback === "correct"}
              className={`
                relative flex items-center justify-center
                ${isWide ? "h-28 md:h-36" : "h-32 md:h-40"}
                rounded-2xl border-4 shadow-lg
                transition-all duration-300
                ${
                  isPlaced
                    ? "opacity-30 scale-90 border-slate-200 bg-slate-100 cursor-not-allowed"
                    : isWrong
                      ? "border-red-400 bg-red-50 animate-shake cursor-pointer"
                      : "border-white bg-white hover:scale-105 hover:border-blue-300 active:scale-95 cursor-pointer"
                }
              `}
            >
              <SortItemDisplay item={item} size={isWide ? "sm" : "md"} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============ Item Display Component ============

interface SortItemDisplayProps {
  item: SortableItem;
  size: "sm" | "md";
}

function SortItemDisplay({ item, size }: SortItemDisplayProps) {
  const containerClass = size === "sm" ? "w-14 h-14 md:w-20 md:h-20" : "w-20 h-20 md:w-24 md:h-24";
  const shapeSize = size === "sm" ? 56 : 72;

  if (item.type === "size" && item.image) {
    return (
      <div className={`relative ${containerClass}`} style={{ transform: `scale(${item.displayScale ?? 1})` }}>
        <Image src={item.image} alt={item.label} fill className="object-contain drop-shadow-md" />
      </div>
    );
  }

  if (item.type === "height" && item.image) {
    return (
      <div className={`flex items-center justify-center ${containerClass}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image as string}
          alt={item.label}
          className="max-w-full max-h-full object-contain drop-shadow-md"
        />
      </div>
    );
  }

  if (item.type === "quantity" && item.quantityImage) {
    const qty = item.quantity ?? 1;
    const imgSize = qty <= 3 ? "w-8 h-8 md:w-10 md:h-10" : "w-6 h-6 md:w-8 md:h-8";
    return (
      <div className="flex flex-wrap justify-center items-center gap-1 p-1">
        {Array.from({ length: qty }).map((_, i) => (
          <div key={i} className={`relative ${imgSize}`}>
            <Image src={item.quantityImage!} alt={`${i + 1}`} fill className="object-contain" />
          </div>
        ))}
      </div>
    );
  }

  if (item.type === "color" && item.color && item.shape) {
    return <PatternShape shape={item.shape} color={item.color} size={shapeSize} className={containerClass} />;
  }

  return null;
}
