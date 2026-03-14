"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { EntityData } from "@/types/game";
import { BodyHotspot, BODY_ITEMS } from "./constants";
import Image from "next/image";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { playWrongSound } from "@/libs/utils/playSound";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { LoudSpeaker } from "@/libs/constants/game-assets";

interface BodyTouchLessonProps {
  items: EntityData[];
  hotspots: BodyHotspot[];
  characterImage: string;
  onComplete: () => void;
}

export function BodyTouchLesson({ items, hotspots, characterImage, onComplete }: BodyTouchLessonProps) {
  const { speak } = useTextToSpeech();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledItems, setShuffledItems] = useState<EntityData[]>([]);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [tappedHotspot, setTappedHotspot] = useState<string | null>(null);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showSparkle, setShowSparkle] = useState<{ x: number; y: number } | null>(null);
  const hasSpokenRef = useRef(false);

  // Shuffle items on mount — only include items that have a hotspot
  useEffect(() => {
    const hotspotIds = new Set(hotspots.map((h) => h.bodyId));
    const filtered = items.filter((item) => hotspotIds.has(item.id));
    const shuffled = filtered.sort(() => Math.random() - 0.5);
    setShuffledItems(shuffled);
  }, [items, hotspots]);

  const currentItem = shuffledItems[currentIndex];

  // Auto-speak the prompt for each item
  useEffect(() => {
    if (currentItem && !feedback && !hasSpokenRef.current) {
      hasSpokenRef.current = true;
      const timeout = setTimeout(() => {
        speak(`Chạm vào ${currentItem.name} nào!`);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [currentItem, feedback, speak]);

  const handleReplay = useCallback(() => {
    if (currentItem) {
      speak(`Chạm vào ${currentItem.name} nào!`);
    }
  }, [currentItem, speak]);

  const handleHotspotClick = useCallback(
    (hotspot: BodyHotspot) => {
      if (feedback || !currentItem) return;

      setTappedHotspot(hotspot.bodyId);
      const tappedBodyPart = BODY_ITEMS.find((b) => b.id === hotspot.bodyId);

      if (hotspot.bodyId === currentItem.id) {
        // Correct!
        setFeedback("correct");
        setShowSparkle({ x: hotspot.x, y: hotspot.y });
        setCompletedItems((prev) => [...prev, hotspot.bodyId]);
        playWinEffect(0);
        speak(`Đúng rồi! Đây là ${currentItem.name}!`);

        setTimeout(() => {
          setFeedback(null);
          setTappedHotspot(null);
          setShowSparkle(null);

          if (currentIndex + 1 >= shuffledItems.length) {
            onComplete();
          } else {
            hasSpokenRef.current = false;
            setCurrentIndex((prev) => prev + 1);
          }
        }, 2000);
      } else {
        // Wrong
        setFeedback("wrong");
        playWrongSound();
        speak(`Đây là ${tappedBodyPart?.name ?? ""}, thử lại nhé!`);

        setTimeout(() => {
          setFeedback(null);
          setTappedHotspot(null);
        }, 1500);
      }
    },
    [feedback, currentItem, currentIndex, shuffledItems.length, onComplete, speak],
  );

  if (!currentItem) return null;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl px-4">
      {/* Prompt */}
      <div
        className="flex items-center gap-3 bg-blue-50 border-4 border-blue-200 rounded-2xl px-6 py-4 shadow-lg cursor-pointer hover:bg-blue-100 transition-colors"
        onClick={handleReplay}
      >
        <Image width={40} height={32} src={LoudSpeaker} alt="Nghe lại" className="w-10 h-8 shrink-0" />
        <p className="text-lg md:text-xl font-bold text-blue-800">Chạm vào {currentItem.name} nào!</p>
      </div>

      {/* Character with hotspots */}
      <div className="relative aspect-square w-full max-w-xs md:max-w-sm mx-auto">
        {/* Character image */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-b from-sky-100 to-sky-50 border-4 border-sky-200 shadow-xl">
          <Image src={characterImage} alt="Nhân vật" fill className="object-contain" />
        </div>

        {/* Hotspot buttons */}
        {hotspots.map((hotspot) => {
          const isCompleted = completedItems.includes(hotspot.bodyId);
          const isTapped = tappedHotspot === hotspot.bodyId;
          const isCorrectTap = isTapped && feedback === "correct";
          const isWrongTap = isTapped && feedback === "wrong";

          return (
            <button
              key={hotspot.bodyId}
              onClick={() => handleHotspotClick(hotspot)}
              disabled={feedback !== null || isCompleted}
              className={`absolute rounded-full transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 ${
                isCompleted
                  ? "bg-green-400/40 border-2 border-green-500 scale-110"
                  : isCorrectTap
                    ? "bg-green-400/60 border-4 border-green-500 scale-125 animate-pulse"
                    : isWrongTap
                      ? "bg-red-400/60 border-4 border-red-500 animate-shake"
                      : "bg-white/30 border-2 border-white/50 hover:bg-white/50 hover:scale-110 hover:border-blue-400 active:scale-95"
              }`}
              style={{
                left: `${hotspot.x}%`,
                top: `${hotspot.y}%`,
                width: `${hotspot.radius * 2}%`,
                height: `${hotspot.radius * 2}%`,
                minWidth: "36px",
                minHeight: "36px",
              }}
            ></button>
          );
        })}

        {/* Sparkle effect */}
        {showSparkle && (
          <div
            className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 text-3xl animate-bounce"
            style={{ left: `${showSparkle.x}%`, top: `${showSparkle.y}%` }}
          >
            ✨
          </div>
        )}
      </div>
    </div>
  );
}
