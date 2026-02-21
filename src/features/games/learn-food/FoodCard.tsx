"use client";

import { useTextToSpeech } from "@/libs/hooks/useTextToSpeech";
import Image from "next/image";
import { useEffect } from "react";
import { FoodData } from "./constants";

interface FoodCardProps {
  food: FoodData;
  active?: boolean;
  showName?: boolean;
  onClick?: () => void;
}

export function FoodCard({ food, active = false, showName = true, onClick }: FoodCardProps) {
  const { speak } = useTextToSpeech();

  useEffect(() => {
    if (active && showName) {
      const timeout = setTimeout(() => {
        speak(food.name);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [active, food.name, showName, speak]);

  const handleClick = () => {
    speak(food.name);
    onClick?.();
  };

  return (
    <div
      onClick={handleClick}
      className={`
        relative flex flex-col items-center gap-4 p-6 rounded-3xl cursor-pointer
        transition-all duration-300 transform
        ${active ? "scale-100 opacity-100" : "scale-90 opacity-60"}
        hover:scale-105
        bg-white shadow-xl border-4 border-white
      `}
    >
      {/* Food Image */}
      <div className="relative w-48 h-48 md:w-64 md:h-64">
        <Image src={food.image} alt={food.name} fill className="object-contain drop-shadow-lg" priority />
      </div>

      {/* Name */}
      {showName && (
        <div className="text-2xl md:text-4xl font-bold text-center text-gray-800 bg-white/90 px-6 py-2 rounded-full shadow-sm">
          {food.name}
        </div>
      )}
    </div>
  );
}
