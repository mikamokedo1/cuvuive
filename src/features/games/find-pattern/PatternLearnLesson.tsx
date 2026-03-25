"use client";

import { useState, useEffect } from "react";
import { PatternDef, buildSequence, pickRandomPatterns } from "./constants";
import { PatternShape } from "./PatternShape";
import { BackLessonButton } from "@/components/games/BackLessonButton";
import { NextLessonButton } from "@/components/games/NextLessonButton";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useSwipe } from "@/hooks/useSwipe";

interface PatternLearnLessonProps {
  groupId: string;
  onComplete: () => void;
}

export function PatternLearnLesson({ groupId, onComplete }: PatternLearnLessonProps) {
  const { speak } = useTextToSpeech();
  const [patterns] = useState<PatternDef[]>(() => pickRandomPatterns(groupId, 4));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealedCount, setRevealedCount] = useState(1);
  const [temporaryDisableNext, setTemporaryDisableNext] = useState(false);

  const currentPattern = patterns[currentIndex];
  const sequence = buildSequence(currentPattern);
  const isFullyRevealed = revealedCount >= sequence.length;

  const handleRevealNext = () => {
    if (revealedCount < sequence.length) {
      const nextCount = revealedCount + 1;
      setRevealedCount(nextCount);
      if (revealedCount === sequence.length - 1) {
        setTemporaryDisableNext(true);
        setTimeout(() => {
          setTemporaryDisableNext(false);
        }, 3000);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < patterns.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setRevealedCount(1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (revealedCount > 1) {
      setRevealedCount((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const item = sequence[revealedCount - 1];
    const shapeName = getShapeName(item.shape);
    const colorName = item.color.name;
    speak(groupId === "group1" ? colorName : shapeName);
  }, [revealedCount]);

  useEffect(() => {
    if (isFullyRevealed) {
      setTimeout(() => {
        speak(`Qui luật ${currentPattern.name}`);
      }, 1000);
    }
  }, [isFullyRevealed]);

  const isLast = currentIndex === patterns.length - 1;

  const handleSwipeLeft = () => {
    if (temporaryDisableNext) return;
    if (isFullyRevealed) {
      handleNext();
    } else {
      handleRevealNext();
    }
  };

  const handleSwipeRight = () => {
    if (temporaryDisableNext) return;
    handlePrev();
  };

  const swipeRef = useSwipe({ onSwipeLeft: handleSwipeLeft, onSwipeRight: handleSwipeRight });

  return (
    <div ref={swipeRef} className="flex flex-col items-center gap-6 w-full max-w-4xl px-4">
      {/* Pattern Display */}
      <div className="bg-white p-8 md:p-12 rounded-3xl border-4 shadow-xl mb-4 md:mb-8 border-blue-200">
        <div className="flex flex-wrap items-center gap-3 md:gap-4 min-h-[80px]">
          {sequence.map((item, i) => (
            <div
              key={i}
              className={`transition-all duration-500 ${
                i < revealedCount ? "opacity-100 scale-100" : "opacity-0 scale-50"
              }`}
            >
              <PatternShape shape={item.shape} color={item.color.code} size={52} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-6 mt-4">
        <BackLessonButton onClick={handlePrev} disabled={revealedCount === 1 || temporaryDisableNext} />
        <NextLessonButton
          onClick={isFullyRevealed ? handleNext : handleRevealNext}
          isLast={isFullyRevealed}
          disabled={temporaryDisableNext}
        />
      </div>
    </div>
  );
}

function getShapeName(shape: string): string {
  const names: Record<string, string> = {
    circle: "Hình tròn",
    square: "Hình vuông",
    triangle: "Hình tam giác",
    star: "Ngôi sao",
    hexagon: "Hình lục giác",
    diamond: "Hình thoi",
  };
  return names[shape] || shape;
}

function describePattern(pattern: PatternDef): string {
  const unitLen = pattern.unit.length;
  if (unitLen === 2) return "Lặp lại 2 phần tử!";
  if (unitLen === 3) return "Lặp lại 3 phần tử!";
  if (unitLen === 4) return "Lặp lại 4 phần tử!";
  return `Lặp lại ${unitLen} phần tử!`;
}
