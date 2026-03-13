"use client";

import { EntityData } from "@/types/game";
import Image from "next/image";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useEffect } from "react";

interface FlowerCardProps {
  flower: EntityData;
  active?: boolean;
  showName?: boolean;
  onClick?: () => void;
}

export function FlowerCard({ flower, active = false, showName = true, onClick }: FlowerCardProps) {
  const { speak } = useTextToSpeech();

  useEffect(() => {
    if (active && showName) {
      const timeout = setTimeout(() => {
        speak(flower.name);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [active, flower.name, showName, speak]);

  const handleClick = () => {
    speak(flower.name);
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
      {/* Flower Image */}
      <div className="relative w-48 h-48 md:w-64 md:h-64">
        <Image src={flower.image} alt={flower.name} fill className="object-contain drop-shadow-lg" sizes="(max-width: 768px) 192px, 256px" />
      </div>
    </div>
  );
}
