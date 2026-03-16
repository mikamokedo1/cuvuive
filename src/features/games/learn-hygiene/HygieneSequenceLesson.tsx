"use client";

import { useState, useEffect, useRef } from "react";
import { SequenceActivity } from "./constants";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playButtonSound } from "@/libs/utils/playSound";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface HygieneSequenceLessonProps {
  activities: SequenceActivity[];
  onComplete: () => void;
}

export function HygieneSequenceLesson({ activities, onComplete }: HygieneSequenceLessonProps) {
  const { speak } = useTextToSpeech();
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);

  // We keep track of the original index of each step
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);
  // Stores the index of the step placed in each slot (or null if empty)
  const [placedSteps, setPlacedSteps] = useState<(number | null)[]>([]);

  const [draggedStep, setDraggedStep] = useState<number | null>(null);
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);
  const [wrongSlot, setWrongSlot] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cachedSlotRects = useRef<{ index: number; rect: DOMRect }[]>([]);

  const currentActivity = activities[currentActivityIndex];

  // Shuffle steps when activity changes
  useEffect(() => {
    if (currentActivity) {
      const indices = Array.from({ length: currentActivity.steps.length }, (_, i) => i);
      const shuffled = indices.sort(() => Math.random() - 0.5);
      setShuffledIndices(shuffled);
      setPlacedSteps(Array(currentActivity.steps.length).fill(null));
      setWrongSlot(null);
      setShowSuccess(false);
      slotRefs.current = Array(currentActivity.steps.length).fill(null);
    }
  }, [currentActivity]);

  // Auto-speak activity title
  useEffect(() => {
    if (currentActivity && !showSuccess) {
      const timeout = setTimeout(() => {
        speak(`Sắp xếp các bước: ${currentActivity.title}`);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentActivity, showSuccess, speak]);

  const handleDragStart = (stepIndex: number) => {
    if (showSuccess) return;
    setDraggedStep(stepIndex);
    playButtonSound();

    // Cache slot rectangles at the start of drag to avoid layout thrashing during onDrag
    cachedSlotRects.current = slotRefs.current
      .map((ref, index) => ({
        index,
        rect: ref?.getBoundingClientRect() || ({} as DOMRect),
      }))
      .filter((item) => placedSteps[item.index] === null);
  };

  const handleDragUpdate = (info: { point: { x: number; y: number } }) => {
    if (draggedStep === null) return;

    let foundSlot: number | null = null;
    for (const { index, rect } of cachedSlotRects.current) {
      if (
        info.point.x >= rect.left &&
        info.point.x <= rect.right &&
        info.point.y >= rect.top &&
        info.point.y <= rect.bottom
      ) {
        foundSlot = index;
        break;
      }
    }

    if (foundSlot !== hoveredSlot) {
      setHoveredSlot(foundSlot);
    }
  };

  const handleDragEnd = (info: { point: { x: number; y: number } }, stepIndex: number) => {
    let slotIndex: number | null = null;
    for (const { index, rect } of cachedSlotRects.current) {
      if (
        info.point.x >= rect.left &&
        info.point.x <= rect.right &&
        info.point.y >= rect.top &&
        info.point.y <= rect.bottom
      ) {
        slotIndex = index;
        break;
      }
    }

    setHoveredSlot(null);
    setDraggedStep(null);
    cachedSlotRects.current = [];

    if (slotIndex === null) return;

    // The logic: children must place step 0 into slot 0, step 1 into slot 1, etc.
    if (stepIndex === slotIndex) {
      // Correct placement
      playButtonSound();
      speak(currentActivity.steps[stepIndex]);

      const newPlaced = [...placedSteps];
      newPlaced[slotIndex] = stepIndex;
      setPlacedSteps(newPlaced);

      // Check if all steps are complete
      if (newPlaced.every((step) => step !== null)) {
        setShowSuccess(true);
        playWinEffect(500);
        speak("Giỏi lắm! Đúng thứ tự rồi!");

        setTimeout(() => {
          if (currentActivityIndex < activities.length - 1) {
            setCurrentActivityIndex(currentActivityIndex + 1);
          } else {
            onComplete();
          }
        }, 2500);
      }
    } else {
      // Wrong placement
      setWrongSlot(slotIndex);
      speak("Chưa đúng vị trí rồi, thử lại nhé!");

      setTimeout(() => {
        setWrongSlot(null);
      }, 1000);
    }
  };

  if (!currentActivity) return <div>Đang tải...</div>;

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-6 w-full max-w-4xl px-4 select-none">
      {/* Target Slots (Empty Cells) */}
      <div className="flex flex-wrap justify-center gap-4 w-full mt-4">
        {currentActivity.steps.map((_, index) => {
          const placedStepIndex = placedSteps[index];
          const isHovered = hoveredSlot === index;
          const isWrong = wrongSlot === index;

          return (
            <div
              key={`slot-${index}`}
              ref={(el) => {
                slotRefs.current[index] = el;
              }}
              className={`
                relative flex flex-col items-center w-[140px] h-[180px] md:w-[160px] md:h-[200px] border-4 rounded-2xl transition-all duration-300
                ${
                  placedStepIndex !== null
                    ? "border-green-400 bg-green-50 shadow-md transform scale-105"
                    : isWrong
                      ? "border-red-400 bg-red-50 animate-shake"
                      : isHovered
                        ? "border-blue-500 bg-blue-100 scale-105 border-dashed"
                        : "border-gray-300 bg-gray-50 border-dashed"
                }
              `}
            >
              <div className="absolute -top-4 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold shadow-md z-10">
                {index + 1}
              </div>

              {placedStepIndex !== null ? (
                <>
                  {currentActivity.stepImages?.[placedStepIndex] ? (
                    <div className="relative w-full flex-1 mt-4 p-2">
                      <Image
                        src={currentActivity.stepImages[placedStepIndex]}
                        alt={currentActivity.steps[placedStepIndex]}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-full flex-1 mt-4 flex items-center justify-center text-4xl">📸</div>
                  )}
                  <div className="w-full p-2 text-center text-sm font-bold text-green-700 bg-green-100/50 rounded-b-xl leading-tight h-16 flex items-center justify-center">
                    {currentActivity.steps[placedStepIndex]}
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center opacity-30 text-gray-400 font-medium p-4 text-center">
                  <span className="text-4xl mb-2">⬇️</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Available Items (Draggable Images) */}
      <AnimatePresence>
        {!showSuccess && (
          <div className="w-full mt-8">
            <div className="flex flex-wrap justify-center gap-6">
              {shuffledIndices.map((stepIndex) => {
                if (placedSteps.includes(stepIndex)) return null;

                return (
                  <motion.div
                    key={`drag-${stepIndex}`}
                    drag
                    dragSnapToOrigin
                    onDragStart={() => handleDragStart(stepIndex)}
                    onDrag={(_, info) => handleDragUpdate(info)}
                    onDragEnd={(_, info) => handleDragEnd(info, stepIndex)}
                    className="relative flex flex-col items-center justify-center w-[130px] h-[160px] md:w-[150px] md:h-[180px] bg-white rounded-xl shadow-lg border-2 border-blue-200 cursor-grab hover:-translate-y-2 hover:shadow-xl transition-all shadow-blue-100"
                    onClick={() => speak(currentActivity.steps[stepIndex])}
                  >
                    {currentActivity.stepImages?.[stepIndex] ? (
                      <div className="relative w-full flex-1 p-2">
                        <Image
                          src={currentActivity.stepImages[stepIndex]}
                          alt={currentActivity.steps[stepIndex]}
                          fill
                          className="object-contain drop-shadow-sm pointer-events-none"
                        />
                      </div>
                    ) : (
                      <div className="w-full flex-1 flex items-center justify-center text-4xl pointer-events-none">
                        📸
                      </div>
                    )}
                    <div className="w-full px-2 py-2 text-center text-xs md:text-sm font-bold text-gray-700 bg-gray-50 rounded-b-lg border-t border-gray-100 leading-tight h-14 flex items-center justify-center pointer-events-none">
                      {currentActivity.steps[stepIndex]}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
