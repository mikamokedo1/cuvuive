"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { WordData } from "./constants";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playButtonSound } from "@/libs/utils/playSound";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { BackLessonButton } from "@/components/games/BackLessonButton";
import { NextLessonButton } from "@/components/games/NextLessonButton";

interface WordLearnLessonProps {
  words: WordData[];
  onComplete: () => void;
  isReviewMode?: boolean;
}

export function WordLearnLesson({ words, onComplete }: WordLearnLessonProps) {
  const { speak } = useTextToSpeech();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewedIds, setViewedIds] = useState<Set<string>>(new Set());
  const [showAllDone, setShowAllDone] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speakTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentWord = words[currentIndex];
  const isLast = currentIndex === words.length - 1 && viewedIds.size >= words.length;

  // Preload adjacent images
  const prevWord = currentIndex > 0 ? words[currentIndex - 1] : null;
  const nextWord = currentIndex < words.length - 1 ? words[currentIndex + 1] : null;

  const handleTapWord = useCallback(() => {
    speak(currentWord.pronounce ?? currentWord.name);

    // Brief speaking lock
    setIsSpeaking(true);
    if (speakTimerRef.current) clearTimeout(speakTimerRef.current);
    speakTimerRef.current = setTimeout(() => setIsSpeaking(false), 1500);

    // Mark as viewed
    setViewedIds((prev) => {
      const next = new Set(prev);
      next.add(currentWord.id);
      return next;
    });
  }, [currentWord, speak]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      playButtonSound();
      setIsImageLoaded(false);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = useCallback(() => {
    playButtonSound();
    if (currentIndex < words.length - 1) {
      setIsImageLoaded(false);
      setCurrentIndex(currentIndex + 1);
      setIsSpeaking(false);
      if (speakTimerRef.current) clearTimeout(speakTimerRef.current);
    } else if (viewedIds.size >= words.length) {
      setShowAllDone(true);
      playWinEffect(500);
      speak("Tuyệt vời! Pé đã học hết tất cả từ vựng rồi!");
      setTimeout(() => {
        onComplete();
      }, 2500);
    }
  }, [currentIndex, words.length, viewedIds.size, speak, onComplete]);

  if (showAllDone) {
    return (
      <div className="flex flex-col items-center gap-6 w-full max-w-4xl animate-bounce-in">
        <div className="text-6xl">🎉</div>
        <h2 className="text-2xl font-bold text-green-600">Học từ vựng hoàn tất!</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-4xl px-4">
      {/* Image card */}
      <div
        className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white cursor-pointer
          transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        onClick={handleTapWord}
      >
        {/* Loading skeleton */}
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse flex items-center justify-center z-10">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
          </div>
        )}

        {/* Current image */}
        <Image
          key={currentWord.id}
          src={currentWord.image}
          alt={currentWord.name}
          fill
          priority
          className={`object-cover transition-opacity duration-300 ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
          sizes="(max-width: 640px) 100vw, 448px"
          onLoad={() => setIsImageLoaded(true)}
        />

        {/* Preload adjacent images */}
        {prevWord && (
          <Image
            key={`preload-prev-${prevWord.id}`}
            src={prevWord.image}
            alt=""
            fill
            className="opacity-0 pointer-events-none absolute"
            sizes="1px"
            aria-hidden="true"
          />
        )}
        {nextWord && (
          <Image
            key={`preload-next-${nextWord.id}`}
            src={nextWord.image}
            alt=""
            fill
            className="opacity-0 pointer-events-none absolute"
            sizes="1px"
            aria-hidden="true"
          />
        )}

        {/* Tap hint for unviewed words */}
        {!viewedIds.has(currentWord.id) && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg animate-pulse">
              <span className="text-lg font-bold text-gray-700">🔊 Chạm để nghe!</span>
            </div>
          </div>
        )}
      </div>

      {/* Vocabulary word below */}
      <div
        className="bg-white rounded-2xl px-8 py-4 shadow-lg border-4 border-blue-100 cursor-pointer
          hover:scale-105 active:scale-95 transition-transform duration-200"
        onClick={handleTapWord}
      >
        <span className="text-4xl md:text-5xl font-extrabold text-[#38BDF8] capitalize select-none">
          {currentWord.name}
        </span>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-6 mt-2">
        <BackLessonButton onClick={handlePrev} disabled={currentIndex === 0 || isSpeaking} />
        <NextLessonButton
          onClick={handleNext}
          isLast={isLast}
          disabled={!viewedIds.has(currentWord.id) || isSpeaking}
        />
      </div>
    </div>
  );
}
