"use client";

import { useTextToSpeech } from "@/libs/hooks/useTextToSpeech";
import Image from "next/image";
import { useEffect } from "react";
import { EntityData } from "@/types/game";

interface FoodCardProps {
  food: EntityData;
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
        `}
    >
      <div className="relative w-48 h-48 md:w-64 md:h-64">
        <Image src={food.image} alt={food.name} fill className="object-contain drop-shadow-lg" priority />
      </div>
    </div>
  );
}
