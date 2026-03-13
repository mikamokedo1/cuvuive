"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { BuilderChallenge, BuilderLayer, TERRAINS } from "./constants";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playButtonSound } from "@/libs/utils/playSound";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface TerrainBuilderLessonProps {
  challenges: BuilderChallenge[];
  onComplete: () => void;
}

export function TerrainBuilderLesson({ challenges, onComplete }: TerrainBuilderLessonProps) {
  const { speak } = useTextToSpeech();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [placedLayers, setPlacedLayers] = useState<BuilderLayer[]>([]);
  const [shuffledLayers, setShuffledLayers] = useState<BuilderLayer[]>([]);
  const [wrongLayer, setWrongLayer] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cachedSlotRects = useRef<{ index: number; rect: DOMRect }[]>([]);
  const [draggedLayer, setDraggedLayer] = useState<string | null>(null);
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);
  const lastDragPoint = useRef<{ x: number; y: number } | null>(null);

  const currentChallenge = challenges[currentIndex];

  // Initialize and shuffle layers
  useEffect(() => {
    if (currentChallenge) {
      const shuffled = [...currentChallenge.correctLayers].sort(() => Math.random() - 0.5);
      setShuffledLayers(shuffled);
      setPlacedLayers([]);
      setWrongLayer(null);
      setShowSuccess(false);
      slotRefs.current = Array(currentChallenge.correctLayers.length).fill(null);

      setTimeout(() => {
        speak(`Hãy xếp các lớp để tạo ${currentChallenge.terrainName}!`);
      }, 500);
    }
  }, [currentChallenge, speak]);

  const nextExpectedIndex = placedLayers.length;

  const handleDragStart = useCallback(
    (layerId: string) => {
      if (showSuccess) return;
      setDraggedLayer(layerId);
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
      if (!draggedLayer) return;

      // Store last known position for reliable mobile drop detection
      lastDragPoint.current = { x: info.point.x, y: info.point.y };

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
    },
    [draggedLayer, hoveredSlot],
  );

  const handleDragEnd = useCallback(
    (info: { point: { x: number; y: number } }, layerId: string) => {
      // Use last known drag position as fallback (fixes mobile where onDragEnd point can be stale)
      const dropPoint = lastDragPoint.current || info.point;

      let slotIndex: number | null = null;
      for (const { index, rect } of cachedSlotRects.current) {
        if (
          dropPoint.x >= rect.left &&
          dropPoint.x <= rect.right &&
          dropPoint.y >= rect.top &&
          dropPoint.y <= rect.bottom
        ) {
          slotIndex = index;
          break;
        }
      }

      setHoveredSlot(null);
      setDraggedLayer(null);
      lastDragPoint.current = null;
      cachedSlotRects.current = [];

      if (slotIndex === null) return;

      // Check if this is the correct layer for the next slot
      const expectedLayer = currentChallenge.correctLayers[nextExpectedIndex];
      if (layerId === expectedLayer.id && slotIndex === nextExpectedIndex) {
        // Correct
        playButtonSound();
        const layer = currentChallenge.correctLayers.find((l) => l.id === layerId)!;
        speak(layer.label);
        const newPlaced = [...placedLayers, layer];
        setPlacedLayers(newPlaced);

        if (newPlaced.length === currentChallenge.correctLayers.length) {
          setShowSuccess(true);
          playWinEffect(500);
          speak(`Tuyệt vời! Pé đã tạo ${currentChallenge.terrainName} thành công!`);

          setTimeout(() => {
            if (currentIndex < challenges.length - 1) {
              setCurrentIndex(currentIndex + 1);
            } else {
              onComplete();
            }
          }, 2500);
        }
      } else {
        // Wrong
        setWrongLayer(layerId);
        speak("Chưa đúng lớp rồi! Thử lại nhé!");

        setTimeout(() => {
          setWrongLayer(null);
        }, 1000);
      }
    },
    [currentChallenge, nextExpectedIndex, placedLayers, speak, currentIndex, challenges.length, onComplete],
  );

  if (!currentChallenge) return <div>Đang tải...</div>;

  const totalLayers = currentChallenge.correctLayers.length;

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-6 w-full max-w-4xl px-4 select-none">
      {/* Terrain reference image + title */}
      <div className="flex flex-col items-center gap-3">
        {(() => {
          const terrain = TERRAINS.find((t) => t.id === currentChallenge.terrainId);
          return terrain ? (
            <div
              onClick={() => speak(`Hãy xếp các lớp để tạo ${currentChallenge.terrainName}!`)}
              className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden shadow-lg border-4 border-white"
            >
              <Image
                src={terrain.image}
                alt={currentChallenge.terrainName}
                fill
                className="object-cover"
                sizes="144px"
              />
            </div>
          ) : null;
        })()}
        <h2 className="text-xl md:text-2xl font-black text-gray-700">🏗️ Xây {currentChallenge.terrainName}</h2>
      </div>

      {/* Building area - Slots */}
      <div className="flex flex-col-reverse gap-2 w-full max-w-sm">
        {Array.from({ length: totalLayers }).map((_, index) => {
          const isPlaced = index < placedLayers.length;
          const isNext = index === nextExpectedIndex;
          const isHovered = hoveredSlot === index;
          const layer = isPlaced ? placedLayers[index] : currentChallenge.correctLayers[index];

          // Color gradient from earth tones (bottom) to sky (top)
          const colors = ["bg-amber-100", "bg-emerald-100", "bg-sky-100", "bg-indigo-100"];
          const borderColors = ["border-amber-400", "border-emerald-400", "border-sky-400", "border-indigo-400"];
          const bgColor = isPlaced ? colors[index % colors.length] : "bg-gray-50";
          const borderColor = isPlaced ? borderColors[index % borderColors.length] : "border-gray-300";

          return (
            <div
              key={`slot-${index}`}
              ref={(el) => {
                slotRefs.current[index] = el;
              }}
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
                  <span className="text-3xl">{layer.emoji}</span>
                  <span className="font-bold text-gray-700 text-sm md:text-base">{layer.label}</span>
                  <span className="text-green-500 text-lg">✓</span>
                </div>
              ) : isNext ? (
                <div className="flex items-center gap-2 text-blue-400">
                  <span className="text-2xl">⬇️</span>
                  <span className="font-medium text-sm">Kéo lớp tiếp theo vào đây</span>
                </div>
              ) : (
                <span className="text-gray-300 text-sm">Lớp {index + 1}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Available layers to drag */}
      <AnimatePresence>
        {!showSuccess && (
          <div className="w-full mt-6">
            <div className="flex flex-wrap justify-center gap-4">
              {shuffledLayers.map((layer) => {
                const isPlaced = placedLayers.some((p) => p.id === layer.id);
                const isWrong = wrongLayer === layer.id;

                if (isPlaced) return null;

                return (
                  <motion.div
                    key={layer.id}
                    drag
                    dragSnapToOrigin
                    dragMomentum={false}
                    dragElastic={0}
                    onDragStart={() => handleDragStart(layer.id)}
                    onDrag={(_, info) => handleDragUpdate(info)}
                    onDragEnd={(_, info) => handleDragEnd(info, layer.id)}
                    className={`
                      flex flex-col items-center justify-center w-28 h-24 md:w-36 md:h-28
                      bg-white rounded-2xl shadow-lg border-3 cursor-grab active:cursor-grabbing
                      hover:-translate-y-1 hover:shadow-xl transition-all
                      ${isWrong ? "border-red-400 animate-shake bg-red-50" : "border-gray-200 hover:border-blue-300"}
                    `}
                    onClick={() => speak(layer.label)}
                  >
                    <span className="text-4xl mb-1 pointer-events-none">{layer.emoji}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Success overlay */}
      {showSuccess && (
        <div className="flex flex-col items-center gap-4 animate-bounce-in mt-4">
          <div className="text-6xl">🎉</div>
          <h3 className="text-2xl font-black text-green-600">{currentChallenge.terrainName}</h3>
          <p className="text-gray-600">Bé đã xếp đúng tất cả các lớp!</p>
        </div>
      )}
    </div>
  );
}
