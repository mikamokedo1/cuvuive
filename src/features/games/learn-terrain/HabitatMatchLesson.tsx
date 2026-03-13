"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { EntityData } from "@/types/game";
import { HabitatAnimal } from "./constants";
import Image from "next/image";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playButtonSound } from "@/libs/utils/playSound";
import { getRandomItem } from "@/libs/utils/randomQuestion";

interface HabitatMatchLessonProps {
  terrains: EntityData[];
  habitatMap: Record<string, HabitatAnimal[]>;
  onComplete: () => void;
  requiredWins?: number;
}

interface AnimalOption extends HabitatAnimal {
  belongsHere: boolean;
}

export function HabitatMatchLesson({ terrains, habitatMap, onComplete, requiredWins = 6 }: HabitatMatchLessonProps) {
  const { speak } = useTextToSpeech();
  const [target, setTarget] = useState<EntityData | null>(null);
  const prevTargetRef = useRef<EntityData | null>(null);
  const [options, setOptions] = useState<AnimalOption[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [correctIds, setCorrectIds] = useState<Set<string>>(new Set());
  const [wrongIds, setWrongIds] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [arrivedIds, setArrivedIds] = useState<Set<string>>(new Set());

  const generateQuestion = useCallback(() => {
    const newTarget = getRandomItem(terrains, prevTargetRef.current);
    prevTargetRef.current = newTarget;

    // Get correct animals for this terrain
    const correctAnimals = (habitatMap[newTarget.id] || []).map((a) => ({ ...a, belongsHere: true }));

    // Get random wrong animals from other terrains
    // Number of distractors adapts to the number of correct animals (at least 1, max equal to correct count)
    const distractorCount = Math.max(1, Math.min(correctAnimals.length, 3));
    const otherAnimals = Object.entries(habitatMap)
      .filter(([key]) => key !== newTarget.id)
      .flatMap(([, animals]) => animals)
      .sort(() => Math.random() - 0.5)
      .slice(0, distractorCount)
      .map((a) => ({ ...a, belongsHere: false }));

    const allOptions = [...correctAnimals, ...otherAnimals].sort(() => Math.random() - 0.5);

    setTarget(newTarget);
    setOptions(allOptions);
    setSelectedIds(new Set());
    setCorrectIds(new Set());
    setWrongIds(new Set());
    setShowResult(false);
    setArrivedIds(new Set());

    setTimeout(() => {
      speak(`Ai sống ở ${newTarget.name}? Chọn tất cả bạn đúng nhé!`);
    }, 800);
  }, [terrains, habitatMap, speak]);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const handleAnimalClick = (animal: AnimalOption) => {
    if (showResult || selectedIds.has(animal.id)) return;

    playButtonSound();
    const newSelected = new Set(selectedIds);
    newSelected.add(animal.id);
    setSelectedIds(newSelected);

    if (animal.belongsHere) {
      // Correct
      const newCorrect = new Set(correctIds);
      newCorrect.add(animal.id);
      setCorrectIds(newCorrect);

      speak(`Đúng rồi! ${animal.name} sống ở ${target?.name}!`);

      // Animate arriving
      setTimeout(() => {
        setArrivedIds((prev) => {
          const next = new Set(prev);
          next.add(animal.id);
          return next;
        });
      }, 500);

      // Check if all correct animals found
      const totalCorrect = options.filter((o) => o.belongsHere).length;
      if (newCorrect.size >= totalCorrect) {
        setShowResult(true);
        playWinEffect(500);
        speak("Tuyệt vời! Pé tìm đúng hết rồi!");

        setTimeout(() => {
          const newScore = score + 1;
          setScore(newScore);
          if (newScore >= requiredWins) {
            onComplete();
          } else {
            generateQuestion();
          }
        }, 2500);
      }
    } else {
      // Wrong
      const newWrong = new Set(wrongIds);
      newWrong.add(animal.id);
      setWrongIds(newWrong);

      speak(`${animal.name} không sống ở ${target?.name} đâu!`);

      setTimeout(() => {
        setWrongIds((prev) => {
          const next = new Set(prev);
          next.delete(animal.id);
          return next;
        });
        setSelectedIds((prev) => {
          const next = new Set(prev);
          next.delete(animal.id);
          return next;
        });
      }, 1500);
    }
  };

  if (!target) return <div>Đang tải...</div>;

  const totalCorrect = options.filter((o) => o.belongsHere).length;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl px-4">
      {/* Target terrain */}
      <div className="relative w-full max-w-md aspect-[16/10] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
        <Image
          onClick={() => speak(`Ai sống ở ${target.name}`)}
          src={target.image}
          alt={target.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 448px"
        />

        {/* Terrain name overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h2 className="text-2xl md:text-3xl font-black text-white text-center drop-shadow-lg">{target.name}</h2>
        </div>

        {/* Arrived animals floating on terrain */}
        <div className="absolute top-2 right-2 flex flex-wrap gap-1 max-w-[120px]">
          {[...arrivedIds].map((id) => {
            const animal = options.find((o) => o.id === id);
            if (!animal) return null;
            return (
              <div key={id} className="text-2xl animate-bounce-in">
                {animal.emoji}
              </div>
            );
          })}
        </div>
      </div>

      {/* Animal options */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 md:gap-4 w-full max-w-2xl">
        {options.map((animal) => {
          const isCorrect = correctIds.has(animal.id);
          const isWrong = wrongIds.has(animal.id);
          const isArrived = arrivedIds.has(animal.id);

          let cardClass = "border-gray-200 bg-white hover:border-blue-400 hover:scale-105 cursor-pointer";
          if (isCorrect) {
            cardClass = "border-green-500 bg-green-50 scale-105 shadow-green-200";
          }
          if (isWrong) {
            cardClass = "border-red-400 bg-red-50 animate-shake";
          }
          if (isArrived) {
            cardClass = "border-green-500 bg-green-50 opacity-50 scale-95";
          }

          return (
            <button
              key={animal.id}
              onClick={() => handleAnimalClick(animal)}
              disabled={isCorrect || showResult}
              className={`flex flex-col items-center gap-1 p-3 md:p-4 rounded-2xl border-3 shadow-md transition-all duration-300 active:scale-95 ${cardClass}`}
            >
              <span className="text-3xl md:text-4xl">{animal.emoji}</span>
              <span className="font-bold text-xs md:text-sm text-gray-700">{animal.name}</span>

              {isCorrect && <span className="text-green-500 text-sm">✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
