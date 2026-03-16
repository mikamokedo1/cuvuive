"use client";

import { useState, useEffect, useCallback } from "react";
import { EntityData } from "@/types/game";
import { AdventureStep } from "./constants";
import Image from "next/image";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playButtonSound, playWrongSound } from "@/libs/utils/playSound";

interface TerrainAdventureLessonProps {
  steps: AdventureStep[];
  terrains: EntityData[];
  onComplete: () => void;
}

export function TerrainAdventureLesson({ steps, terrains, onComplete }: TerrainAdventureLessonProps) {
  const { speak } = useTextToSpeech();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stars, setStars] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [owlPosition, setOwlPosition] = useState(0); // percentage of progress
  const [showCelebration, setShowCelebration] = useState(false);

  const currentStep = steps[currentStepIndex];
  const totalSteps = steps.length;

  // Auto-speak question
  useEffect(() => {
    if (currentStep && !feedback) {
      const timeout = setTimeout(() => {
        speak(currentStep.question);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [currentStep, feedback, speak]);

  // Update owl position
  useEffect(() => {
    setOwlPosition((currentStepIndex / totalSteps) * 100);
  }, [currentStepIndex, totalSteps]);

  const getTerrainById = useCallback(
    (id: string) => {
      return terrains.find((t) => t.id === id);
    },
    [terrains],
  );

  const handleOptionClick = (terrainId: string) => {
    if (feedback) return;

    setSelectedOption(terrainId);

    if (terrainId === currentStep.correctTerrainId) {
      setFeedback("correct");
      setStars((prev) => prev + 1);

      playWinEffect(300);
      const terrain = getTerrainById(terrainId);
      speak(terrain?.name || "");

      setTimeout(() => {
        if (currentStepIndex < totalSteps - 1) {
          setCurrentStepIndex((prev) => prev + 1);
          setFeedback(null);
          setSelectedOption(null);
        } else {
          // Adventure complete
          setShowCelebration(true);
          speak(`Phiêu lưu hoàn tất! Cú đã thu thập ${stars + 1} ngôi sao!`);
          playWinEffect(500);
          setTimeout(() => {
            onComplete();
          }, 3000);
        }
      }, 2000);
    } else {
      playWrongSound();
      setFeedback("wrong");
      setTimeout(() => {
        setFeedback(null);
        setSelectedOption(null);
      }, 2000);
    }
  };

  if (showCelebration) {
    return (
      <div className="flex flex-col items-center gap-6 w-full max-w-4xl animate-bounce-in">
        <div className="text-7xl">🦉</div>
        <h2 className="text-3xl font-black text-green-600">Phiêu lưu hoàn tất!</h2>
        <div className="flex gap-1">
          {Array.from({ length: stars }).map((_, i) => (
            <span key={i} className="text-3xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
              ⭐
            </span>
          ))}
        </div>
        <p className="text-lg text-gray-600">Cú đã khám phá xong tất cả!</p>
      </div>
    );
  }

  if (!currentStep) return <div>Đang tải...</div>;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl px-4">
      {/* Progress path */}
      <div className="w-full max-w-md relative h-12 mb-2">
        {/* Path line */}
        <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-200 rounded-full -translate-y-1/2">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${owlPosition}%` }}
          />
        </div>

        {/* Step markers */}
        {steps.map((_, i) => (
          <div
            key={i}
            className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-all ${
              i < currentStepIndex
                ? "bg-green-500 border-green-600"
                : i === currentStepIndex
                  ? "bg-blue-500 border-blue-600 scale-125"
                  : "bg-gray-200 border-gray-300"
            }`}
            style={{ left: `${(i / totalSteps) * 100}%` }}
          >
            {i < currentStepIndex && (
              <span className="absolute inset-0 flex items-center justify-center text-white text-[8px]">✓</span>
            )}
          </div>
        ))}

        {/* Finish marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 right-0 text-xl"
          style={{ transform: "translateY(-50%) translateX(50%)" }}
        >
          🏁
        </div>

        {/* Owl character */}
        <div
          className="absolute top-0 -translate-x-1/2 transition-all duration-1000 ease-out"
          style={{ left: `${owlPosition}%` }}
        >
          <div className="text-2xl animate-bounce">🦉</div>
        </div>
      </div>

      {/* Stars collected */}
      <div className="flex items-center gap-2">
        {Array.from({ length: stars }).map((_, i) => (
          <span key={i} className="text-xl">
            ⭐
          </span>
        ))}
        {Array.from({ length: totalSteps - stars }).map((_, i) => (
          <span key={i} className="text-xl opacity-20">
            ⭐
          </span>
        ))}
      </div>

      {/* Question bubble */}
      <div
        className="w-full max-w-md bg-blue-50 border-4 border-blue-200 rounded-3xl p-6 shadow-lg cursor-pointer hover:bg-blue-100 transition-colors relative"
        onClick={() => speak(currentStep.question)}
      >
        {/* Speech bubble tail */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-blue-50 border-l-4 border-t-4 border-blue-200 rotate-45" />

        <div className="flex items-center gap-4">
          <span className="text-4xl shrink-0">🦉</span>
          <p className="text-base md:text-lg font-bold text-blue-800 leading-relaxed">{currentStep.question}</p>
        </div>
      </div>

      {/* Terrain options - The paths to choose */}
      <div className="grid grid-cols-3 gap-4 md:gap-6 w-full max-w-2xl mt-4">
        {currentStep.options.map((terrainId) => {
          const terrain = getTerrainById(terrainId);
          if (!terrain) return null;

          const isSelected = selectedOption === terrainId;
          const isCorrect = terrainId === currentStep.correctTerrainId;

          let cardClass = "border-white hover:border-orange-400 hover:scale-105";
          if (feedback === "correct" && isCorrect) {
            cardClass = "border-green-500 scale-110 ring-4 ring-green-200 shadow-green-200";
          } else if (feedback === "wrong" && isSelected) {
            cardClass = "border-red-400 animate-shake";
          } else if (feedback === "wrong" && !isSelected) {
            cardClass = "opacity-40";
          }

          return (
            <button
              key={terrainId}
              onClick={() => handleOptionClick(terrainId)}
              disabled={feedback !== null}
              className={`relative flex flex-col items-center gap-2 p-3 rounded-3xl bg-white shadow-xl border-4 cursor-pointer transition-all duration-300 active:scale-95 ${cardClass}`}
            >
              {/* Path arrow */}

              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden">
                <Image
                  src={terrain.image}
                  alt={terrain.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 80px, 112px"
                />
              </div>

              {/* Correct star */}
              {feedback === "correct" && isCorrect && (
                <div className="absolute -top-3 -right-3 text-2xl animate-bounce">⭐</div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
