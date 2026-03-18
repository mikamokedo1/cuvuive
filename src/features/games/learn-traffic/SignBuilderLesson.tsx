"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { SignChallenge, SignPart } from "./constants";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playButtonSound } from "@/libs/utils/playSound";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface SignBuilderLessonProps {
  challenges: SignChallenge[];
  onComplete: () => void;
}

export function SignBuilderLesson({ challenges, onComplete }: SignBuilderLessonProps) {
  const { speak } = useTextToSpeech();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [placedParts, setPlacedParts] = useState<SignPart[]>([]);
  const [shuffledParts, setShuffledParts] = useState<SignPart[]>([]);
  const [wrongPart, setWrongPart] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cachedSlotRects = useRef<{ index: number; rect: DOMRect }[]>([]);
  const [draggedPart, setDraggedPart] = useState<string | null>(null);
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);
  const hoveredSlotRef = useRef<number | null>(null);

  const currentChallenge = challenges[currentIndex];

  useEffect(() => {
    if (currentChallenge) {
      const shuffled = [...currentChallenge.correctParts].sort(() => Math.random() - 0.5);
      setShuffledParts(shuffled);
      setPlacedParts([]);
      setWrongPart(null);
      setShowSuccess(false);
      slotRefs.current = Array(currentChallenge.correctParts.length).fill(null);

      setTimeout(() => {
        speak(`Hãy lắp ráp ${currentChallenge.signName}!`);
      }, 500);
    }
  }, [currentChallenge, speak]);

  const nextExpectedIndex = placedParts.length;

  const toViewport = useCallback((point: { x: number; y: number }) => ({
    x: point.x - window.scrollX,
    y: point.y - window.scrollY,
  }), []);

  const findSlotAtPoint = useCallback((x: number, y: number): number | null => {
    const tolerance = 15;
    for (const { index, rect } of cachedSlotRects.current) {
      if (
        x >= rect.left - tolerance &&
        x <= rect.right + tolerance &&
        y >= rect.top - tolerance &&
        y <= rect.bottom + tolerance
      ) {
        return index;
      }
    }
    return null;
  }, []);

  const handleDragStart = useCallback(
    (partId: string) => {
      if (showSuccess) return;
      setDraggedPart(partId);
      playButtonSound();

      cachedSlotRects.current = slotRefs.current
        .map((ref, index) => ({
          index,
          rect: ref?.getBoundingClientRect() || ({} as DOMRect),
        }))
        .filter((item) => item.index >= nextExpectedIndex);
    },
    [showSuccess, nextExpectedIndex],
  );

  const handleDragUpdate = useCallback(
    (info: { point: { x: number; y: number } }) => {
      const vp = toViewport(info.point);
      const foundSlot = findSlotAtPoint(vp.x, vp.y);
      hoveredSlotRef.current = foundSlot;
      setHoveredSlot(foundSlot);
    },
    [findSlotAtPoint, toViewport],
  );

  const handleDragEnd = useCallback(
    (partId: string, info: { point: { x: number; y: number } }) => {
      const vp = toViewport(info.point);

      let slotIndex = hoveredSlotRef.current;
      if (slotIndex === null) {
        slotIndex = findSlotAtPoint(vp.x, vp.y);
      }

      if (slotIndex === null) {
        const freshRects = slotRefs.current
          .map((ref, index) => ({
            index,
            rect: ref?.getBoundingClientRect() || ({} as DOMRect),
          }))
          .filter((item) => item.index >= nextExpectedIndex);

        const tolerance = 20;
        for (const { index, rect } of freshRects) {
          if (
            vp.x >= rect.left - tolerance &&
            vp.x <= rect.right + tolerance &&
            vp.y >= rect.top - tolerance &&
            vp.y <= rect.bottom + tolerance
          ) {
            slotIndex = index;
            break;
          }
        }
      }

      setHoveredSlot(null);
      setDraggedPart(null);
      hoveredSlotRef.current = null;
      cachedSlotRects.current = [];

      if (slotIndex === null) return;

      const expectedPart = currentChallenge.correctParts[nextExpectedIndex];
      if (partId === expectedPart.id && slotIndex === nextExpectedIndex) {
        playButtonSound();
        const part = currentChallenge.correctParts.find((p) => p.id === partId)!;
        speak(part.label);
        const newPlaced = [...placedParts, part];
        setPlacedParts(newPlaced);

        if (newPlaced.length === currentChallenge.correctParts.length) {
          setShowSuccess(true);
          playWinEffect(500);
          speak(currentChallenge.description);

          setTimeout(() => {
            if (currentIndex < challenges.length - 1) {
              setCurrentIndex(currentIndex + 1);
            } else {
              onComplete();
            }
          }, 2500);
        }
      } else {
        setWrongPart(partId);
        speak("Chưa đúng! Thử lại nhé!");

        setTimeout(() => {
          setWrongPart(null);
        }, 1000);
      }
    },
    [
      toViewport,
      findSlotAtPoint,
      currentChallenge,
      nextExpectedIndex,
      placedParts,
      speak,
      currentIndex,
      challenges.length,
      onComplete,
    ],
  );

  if (!currentChallenge) return <div>Đang tải...</div>;

  const totalParts = currentChallenge.correctParts.length;

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-6 w-full max-w-4xl px-4 select-none">
      {/* Reference sign image */}
      <div className="flex flex-col items-center gap-3">
        <div
          onClick={() => speak(`Hãy lắp ráp ${currentChallenge.signName}!`)}
          className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden shadow-lg border-4 border-white"
        >
          <Image
            src={currentChallenge.signImage}
            alt={currentChallenge.signName}
            fill
            className="object-contain"
            sizes="144px"
          />
        </div>
        <h2 className="text-xl md:text-2xl font-black text-gray-700">🧩 Lắp {currentChallenge.signName}</h2>
      </div>

      {/* Building area */}
      <div className="flex flex-col-reverse gap-2 w-full max-w-sm">
        {Array.from({ length: totalParts }).map((_, index) => {
          const isPlaced = index < placedParts.length;
          const isNext = index === nextExpectedIndex;
          const isHovered = hoveredSlot === index;
          const part = isPlaced ? placedParts[index] : currentChallenge.correctParts[index];

          const colors = ["bg-red-100", "bg-amber-100", "bg-blue-100"];
          const borderColors = ["border-red-400", "border-amber-400", "border-blue-400"];
          const bgColor = isPlaced ? colors[index % colors.length] : "bg-gray-50";
          const borderColor = isPlaced ? borderColors[index % borderColors.length] : "border-gray-300";

          return (
            <div
              key={`slot-${index}`}
              ref={(el) => { slotRefs.current[index] = el; }}
              className={`
                relative flex items-center justify-center h-16 md:h-20 rounded-xl border-3 transition-all duration-300
                ${isPlaced ? `${bgColor} ${borderColor} border-solid shadow-md` : ""}
                ${isNext && !isPlaced ? "border-dashed border-blue-400 bg-blue-50/50 animate-pulse" : ""}
                ${!isNext && !isPlaced ? "border-dashed border-gray-200 bg-gray-50/30" : ""}
                ${isHovered ? "border-blue-500 bg-blue-100 scale-105 border-solid shadow-lg" : ""}
              `}
            >
              {isPlaced ? (
                <div className="flex items-center gap-3 animate-fade-in">
                  <span className="text-3xl">{part.emoji}</span>
                  <span className="font-bold text-gray-700 text-sm md:text-base">{part.label}</span>
                  <span className="text-green-500 text-lg">✓</span>
                </div>
              ) : isNext ? (
                <div className="flex items-center gap-2 text-blue-400">
                  <span className="text-2xl">⬇️</span>
                  <span className="font-medium text-sm">Kéo phần tiếp theo vào đây</span>
                </div>
              ) : (
                <span className="text-gray-300 text-sm">Phần {index + 1}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Available parts */}
      <AnimatePresence>
        {!showSuccess && (
          <div className="w-full mt-6">
            <div className="flex flex-wrap justify-center gap-4">
              {shuffledParts.map((part) => {
                const isPlaced = placedParts.some((p) => p.id === part.id);
                const isWrong = wrongPart === part.id;

                if (isPlaced) return null;

                return (
                  <motion.div
                    key={part.id}
                    drag
                    dragSnapToOrigin
                    onDragStart={() => handleDragStart(part.id)}
                    onDrag={(_, info) => handleDragUpdate(info)}
                    onDragEnd={(_, info) => handleDragEnd(part.id, info)}
                    className={`
                      flex flex-col items-center justify-center w-28 h-24 md:w-36 md:h-28
                      bg-white rounded-2xl shadow-lg border-3 cursor-grab active:cursor-grabbing
                      hover:-translate-y-1 hover:shadow-xl transition-all
                      ${isWrong ? "border-red-400 animate-shake bg-red-50" : "border-gray-200 hover:border-blue-300"}
                    `}
                    onClick={() => speak(part.label)}
                  >
                    <span className="text-4xl mb-1 pointer-events-none">{part.emoji}</span>
                    <span className="text-xs font-bold text-gray-600 pointer-events-none">{part.label}</span>
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
