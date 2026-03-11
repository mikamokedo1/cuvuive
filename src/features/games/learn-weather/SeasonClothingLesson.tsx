"use client";

import { useState, useEffect, useRef } from "react";
import { EntityData } from "@/types/game";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { getRandomItem } from "@/libs/utils/randomQuestion";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import Image from "next/image";
const LoudSpeaker = "https://assets.cuthongminh.com/games/loud-speaker.webp";
import { FeedbackType } from "@/types/game";
import { CLOTHING_ITEMS } from "./constants";

interface SeasonClothingLessonProps {
  seasons: EntityData[];
  onComplete: () => void;
  requiredWins?: number;
}

export function SeasonClothingLesson({ seasons, onComplete, requiredWins = 8 }: SeasonClothingLessonProps) {
  const { speak } = useTextToSpeech();
  const [targetSeason, setTargetSeason] = useState<EntityData | null>(null);
  const prevTargetRef = useRef<EntityData | null>(null);
  const [options, setOptions] = useState<EntityData[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [selectedOption, setSelectedOption] = useState<EntityData | null>(null);

  // Generate new question
  const generateQuestion = () => {
    // Only pick seasons that have matching clothing (exclude ones without for safety)
    const validSeasons = seasons.filter((s) => CLOTHING_ITEMS.some((c) => c.category === s.id));
    if (validSeasons.length === 0) return;

    // Pick a random season
    const target = getRandomItem(validSeasons, prevTargetRef.current);
    prevTargetRef.current = target;

    // Get correct clothing items
    const correctClothes = CLOTHING_ITEMS.filter((c) => c.category === target.id);
    const correctOption = correctClothes[Math.floor(Math.random() * correctClothes.length)];

    // Get random distractors (clothing for OTHER seasons)
    let distractorPool = CLOTHING_ITEMS.filter((c) => c.category !== target.id);
    distractorPool = distractorPool.sort(() => Math.random() - 0.5);

    // Take 2 distractors
    const selectedDistractors = distractorPool.slice(0, 2);

    // Combine and shuffle options
    const newOptions = [correctOption, ...selectedDistractors].sort(() => Math.random() - 0.5);

    setTargetSeason(target);
    setOptions(newOptions);
    setFeedback(null);
    setSelectedOption(null);

    // Auto speak question
    setTimeout(() => {
      speak(`${target.name} nên mặc đồ gì?`);
    }, 1000);
  };

  useEffect(() => {
    generateQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seasons]);

  const handleOptionClick = (selected: EntityData) => {
    if (!targetSeason) return;
    if (feedback === "correct") return;

    setSelectedOption(selected);

    if (selected.category === targetSeason.id) {
      // Correct
      speak(`Đúng rồi, ${targetSeason.name} cần có ${selected.name}`);
      setFeedback("correct");
      playWinEffect(500);

      setTimeout(() => {
        const newScore = score + 1;
        setScore(newScore);
        if (newScore >= requiredWins) {
          onComplete();
        } else {
          generateQuestion();
        }
      }, 2000);
    } else {
      // Wrong
      speak("Chưa đúng, thử lại nhé");
      setFeedback("wrong");
      setTimeout(() => {
        setFeedback(null);
        setSelectedOption(null);
      }, 1000);
    }
  };

  if (!targetSeason) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
      {/* Target Season Display */}
      <div className="relative w-40 h-40 md:w-56 md:h-56 flex flex-col items-center justify-center">
        <Image src={targetSeason.image} alt={targetSeason.name} fill className="object-contain" />
      </div>

      <div className="flex flex-col items-center gap-4 text-center">
        <button
          onClick={() => speak(`${targetSeason.name} nên mặc đồ gì?`)}
          className="cursor-pointer hover:scale-105 transition-all"
        >
          <Image width={48} height={40} src={LoudSpeaker} alt="Speaker" className="w-12 h-10" />
        </button>
      </div>

      {/* Clothing Options */}
      <div className="grid grid-cols-3 gap-4 md:gap-8 w-full max-w-3xl justify-items-center mt-4">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => handleOptionClick(option)}
            className={`
              relative w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 rounded-3xl shadow-lg border-4 bg-white
              flex flex-col items-center justify-center p-2 md:p-4 cursor-pointer
              transform transition-all duration-200 hover:scale-105 active:scale-95
              ${feedback === "wrong" && selectedOption?.id === option.id ? "border-red-400 bg-red-50 animate-shake" : "border-white"}
              ${feedback === "correct" && option.category === targetSeason.id ? "border-green-500 scale-110 shadow-green-200 bg-green-50" : ""}
              ${feedback === "wrong" && selectedOption?.id !== option.id ? "opacity-50" : ""}
            `}
          >
            <div className="relative w-full h-3/4">
              <Image src={option.image} alt={option.name} fill className="object-contain" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
