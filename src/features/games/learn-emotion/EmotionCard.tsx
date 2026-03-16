"use client";

import Image from "next/image";
import { EntityData } from "@/types/game";
import { playButtonSound } from "@/libs/utils/playSound";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

interface EmotionCardProps {
  item: EntityData;
  active?: boolean;
  onClick?: (item: EntityData) => void;
  showName?: boolean;
}

export function EmotionCard({ item, active = false, onClick, showName = true }: EmotionCardProps) {
  const { speak } = useTextToSpeech();

  const handleClick = () => {
    playButtonSound();
    if (showName) {
      speak(item.name);
    }
    onClick?.(item);
  };

  return (
    <div
      onClick={handleClick}
      className={`
        relative flex flex-col items-center justify-center p-6
        rounded-[2rem] border-4 transition-all duration-300 w-full max-w-[280px]
        ${active ? "bg-blue-50 border-blue-400 scale-105 shadow-xl" : "bg-white border-blue-100 hover:border-blue-300 hover:scale-105 shadow-md cursor-pointer"}
        ${onClick ? "cursor-pointer" : ""}
      `}
    >
      <div className="relative w-48 h-48 md:w-56 md:h-56">
        <Image src={item.image} alt={item.name} fill className="object-contain drop-shadow-md" sizes="(max-width: 768px) 192px, 256px" />
      </div>
    </div>
  );
}
