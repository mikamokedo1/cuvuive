"use client";

import { useState, useCallback, useRef } from "react";
import { EntityData } from "@/types/game";
import Image from "next/image";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playButtonSound } from "@/libs/utils/playSound";
import { BackLessonButton } from "@/components/games/BackLessonButton";
import { NextLessonButton } from "@/components/games/NextLessonButton";

const DESCRIBE_DELAY_MS = 3000; // 3 seconds to let child listen to description

interface ExploreLessonProps {
  terrains: EntityData[];
  descriptions: Record<string, string>;
  onComplete: () => void;
  additionText?: string;
  /** Custom class for the image container, e.g. "aspect-[3/2]" for flags. Default: "aspect-square" */
  containerClassName?: string;
  /** Custom class for the <Image>, e.g. "object-contain" for flags. Default: "object-cover" */
  imageClassName?: string;
}

export function ExploreLesson({
  terrains,
  descriptions,
  onComplete,
  additionText,
  containerClassName = "aspect-square",
  imageClassName = "object-cover",
}: ExploreLessonProps) {
  const { speak } = useTextToSpeech();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [discoveredIds, setDiscoveredIds] = useState<Set<string>>(new Set());
  const [activeTerrainId, setActiveTerrainId] = useState<string | null>(null);
  const [showAllDone, setShowAllDone] = useState(false);
  const [isDescribing, setIsDescribing] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const describeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentTerrain = terrains[currentIndex];
  const isLast = currentIndex === terrains.length - 1 && discoveredIds.size >= terrains.length;

  // Get adjacent terrains for preloading
  const prevTerrain = currentIndex > 0 ? terrains[currentIndex - 1] : null;
  const nextTerrain = currentIndex < terrains.length - 1 ? terrains[currentIndex + 1] : null;

  const handleDiscover = useCallback(
    (terrain: EntityData) => {
      playButtonSound();
      setActiveTerrainId(terrain.id);

      // Disable next button while describing
      setIsDescribing(true);
      if (describeTimerRef.current) clearTimeout(describeTimerRef.current);
      describeTimerRef.current = setTimeout(() => {
        setIsDescribing(false);
      }, DESCRIBE_DELAY_MS);

      // Speak name + description
      const desc = descriptions[terrain.id] || `Đây là ${terrain.name}`;
      speak(`${terrain.name}. ${desc}`);

      // Mark as discovered
      setDiscoveredIds((prev) => {
        const next = new Set(prev);
        next.add(terrain.id);
        return next;
      });
    },
    [descriptions, speak],
  );

  const handlePrev = () => {
    if (currentIndex > 0) {
      playButtonSound();
      setIsImageLoaded(false);
      setCurrentIndex(currentIndex - 1);
      setActiveTerrainId(null);
    }
  };

  const handleNext = useCallback(() => {
    playButtonSound();
    if (currentIndex < terrains.length - 1) {
      setIsImageLoaded(false);
      setCurrentIndex(currentIndex + 1);
      setActiveTerrainId(null);
      setIsDescribing(false);
      if (describeTimerRef.current) clearTimeout(describeTimerRef.current);
    } else if (discoveredIds.size >= terrains.length) {
      // All done
      setShowAllDone(true);
      playWinEffect(500);
      speak(`Tuyệt vời! Pé đã khám phá hết tất cả ${additionText} rồi!`);
      setTimeout(() => {
        onComplete();
      }, 2500);
    }
  }, [currentIndex, terrains.length, discoveredIds.size, speak, onComplete]);

  if (showAllDone) {
    return (
      <div className="flex flex-col items-center gap-6 w-full max-w-4xl animate-bounce-in">
        <div className="text-6xl">🎉</div>
        <h2 className="text-2xl font-bold text-green-600">Khám phá hoàn tất!</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl px-4">
      {/* Main terrain card */}
      <div
        className={`relative w-full max-w-md ${containerClassName} rounded-3xl overflow-hidden shadow-2xl border-4 cursor-pointer
          transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]
          ${activeTerrainId === currentTerrain.id ? "border-green-500 ring-4 ring-green-200" : "border-white"}`}
        onClick={() => handleDiscover(currentTerrain)}
      >
        {/* Loading skeleton */}
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse flex items-center justify-center z-10">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
          </div>
        )}

        {/* Current image — key forces remount so old image doesn't flash */}
        <Image
          key={currentTerrain.id}
          src={currentTerrain.image}
          alt={currentTerrain.name}
          fill
          priority
          className={`${imageClassName} transition-opacity duration-300 ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
          sizes="(max-width: 640px) 100vw, 448px"
          onLoad={() => setIsImageLoaded(true)}
        />

        {/* Preload adjacent images (hidden) */}
        {prevTerrain && (
          <Image
            key={`preload-prev-${prevTerrain.id}`}
            src={prevTerrain.image}
            alt=""
            fill
            className="opacity-0 pointer-events-none absolute"
            sizes="1px"
            aria-hidden="true"
          />
        )}
        {nextTerrain && (
          <Image
            key={`preload-next-${nextTerrain.id}`}
            src={nextTerrain.image}
            alt=""
            fill
            className="opacity-0 pointer-events-none absolute"
            sizes="1px"
            aria-hidden="true"
          />
        )}

        {/* Overlay with terrain info - shown after discover */}
        {/* {activeTerrainId === currentTerrain.id && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-black text-white drop-shadow-lg mb-2">{currentTerrain.name}</h2>
            <p className="text-sm md:text-base text-white/90 leading-relaxed">
              {descriptions[currentTerrain.id] || ""}
            </p>
          </div>
        )} */}

        {/* Tap to discover hint */}
        {activeTerrainId !== currentTerrain.id && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg animate-pulse">
              <span className="text-lg font-bold text-gray-700">👆 Chạm để khám phá!</span>
            </div>
          </div>
        )}
      </div>
      {/* Navigation */}
      <div className="flex items-center gap-6 mt-4">
        <BackLessonButton onClick={handlePrev} disabled={currentIndex === 0 || isDescribing} />
        <NextLessonButton
          onClick={handleNext}
          isLast={isLast}
          disabled={!discoveredIds.has(currentTerrain.id) || isDescribing}
        />
      </div>
    </div>
  );
}
