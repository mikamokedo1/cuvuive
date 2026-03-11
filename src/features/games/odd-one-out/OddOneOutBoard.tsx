"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { OddOneOutPuzzle, OddOneOutImagePuzzle, generatePuzzle, PatternItem, ImageItem } from "./constants";
import { PatternShape } from "@/features/games/find-pattern/PatternShape";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { playButtonSound, playSound, playWrongSound } from "@/libs/utils/playSound";
import { FeedbackType } from "@/types/game";

interface OddOneOutBoardProps {
  groupId: string;
  onComplete: () => void;
}

export function OddOneOutBoard({ groupId, onComplete }: OddOneOutBoardProps) {
  const { speak } = useTextToSpeech();
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [puzzle, setPuzzle] = useState<OddOneOutPuzzle | OddOneOutImagePuzzle | null>(null);
  const hintTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isGroup3 = groupId === "group3";
  const requiredWins = isGroup3 ? 10 : 5;

  const prepareNextPuzzle = (currentScore: number = score) => {
    const itemCount = 4;
    // Pass the next puzzle index (equal to current score) so Group 3 loops correctly without duplicates immediately
    const newPuzzle = generatePuzzle(groupId, itemCount, currentScore);
    // Shuffle the items to randomize the position of the odd one out
    const shuffledItems = [...newPuzzle.items].map((item, index) => ({ item, originalIndex: index }));
    shuffledItems.sort(() => Math.random() - 0.5);

    // Find the new index of the odd one out after shuffling
    const newOddIndex = shuffledItems.findIndex((x) => x.originalIndex === newPuzzle.oddIndex);

    setPuzzle({
      items: shuffledItems.map((x) => x.item) as any, // TypeScript needs help here as items can be mixed in the union, but we know they're homogeneous
      oddIndex: newOddIndex,
    });
    setFeedback(null);

    if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);

    // Play group-specific instruction on first render, then short prompt after
    setTimeout(() => {
      speak(score === 0 ? "Hình nào khác biệt?" : "Tiếp tục nào!");
    }, 500);
  };

  useEffect(() => {
    prepareNextPuzzle();
    return () => {
      if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId]);

  const handleItemClick = (index: number) => {
    if (feedback === "correct" || !puzzle) return;

    if (hintTimeoutRef.current) {
      clearTimeout(hintTimeoutRef.current);
    }

    if (index === puzzle.oddIndex) {
      playButtonSound();
      speak("Đúng rồi! Giỏi lắm!");
      setFeedback("correct");
      playWinEffect(500);

      setTimeout(() => {
        const newScore = score + 1;
        setScore(newScore);
        if (newScore >= requiredWins) {
          onComplete();
        } else {
          prepareNextPuzzle(newScore);
        }
      }, 1500);
    } else {
      playWrongSound();
      speak("Chưa đúng, thử lại nhé!");
      setFeedback("wrong");
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  if (!puzzle) return <div>Loading...</div>;

  // Layout logic based on item count
  const itemCount = puzzle.items.length;
  let gridColsClass = "grid-cols-2";
  if (itemCount === 3) gridColsClass = "grid-cols-2 lg:grid-cols-3";
  if (itemCount === 6) gridColsClass = "grid-cols-2 lg:grid-cols-3";

  // Adjust sizes based on count so they fit well
  const btnSizeClass =
    itemCount >= 6 ? "w-28 h-28 md:w-36 md:h-36 rounded-[1.5rem]" : "w-32 h-32 md:w-48 md:h-48 rounded-[2rem]";

  const svgSize = itemCount >= 6 ? { normal: 64, success: 80 } : { normal: 80, success: 100 };
  const svgClass = itemCount >= 6 ? "w-16 h-16 md:w-24 md:h-24" : "w-20 h-20 md:w-28 md:h-28";

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl px-4">
      <div
        className={`grid ${gridColsClass} gap-6 md:gap-10 p-6 md:p-10 bg-white/80 rounded-[3rem] shadow-xl border-4 border-white backdrop-blur-sm place-items-center`}
      >
        {puzzle.items.map((item, index) => {
          const isCorrectAnswer = index === puzzle.oddIndex;
          const isSuccess = feedback === "correct" && isCorrectAnswer;

          const isImageItem = "image" in item;

          return (
            <button
              key={index}
              onClick={() => handleItemClick(index)}
              className={`
                relative flex items-center justify-center
                ${btnSizeClass} 
                border-4 bg-white shadow-lg overflow-hidden
                transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer
                ${isSuccess ? "border-green-500 bg-green-50 scale-110 z-10" : "border-gray-100 hover:border-blue-300"}
                ${feedback === "wrong" ? "opacity-90" : ""}
                ${itemCount === 3 && index === 2 ? "col-span-2 lg:col-span-1" : ""}
              `}
            >
              <div className={`relative ${isSuccess ? "animate-bounce-in" : ""}`}>
                {isImageItem ? (
                  <div className={`relative ${svgClass}`}>
                    <Image
                      src={(item as ImageItem).image}
                      alt={(item as ImageItem).id}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <PatternShape
                    shape={(item as PatternItem).shape}
                    color={(item as PatternItem).color.code}
                    size={isSuccess ? svgSize.success : svgSize.normal}
                    className={svgClass}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
