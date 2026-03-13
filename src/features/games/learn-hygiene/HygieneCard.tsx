"use client";

import { EntityData } from "@/types/game";
import Image from "next/image";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useEffect } from "react";

interface HygieneCardProps {
  item: EntityData;
  active?: boolean;
  showName?: boolean;
  onClick?: () => void;
}

export function HygieneCard({ item, active = false, showName = true, onClick }: HygieneCardProps) {
  const { speak } = useTextToSpeech();

  useEffect(() => {
    if (active && showName) {
      const timeout = setTimeout(() => {
        speak(item.name);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [active, item.name, showName, speak]);

  const handleClick = () => {
    speak(item.name);
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
      {/* Item Image */}
      <div className="relative w-48 h-48 md:w-64 md:h-64">
        <Image src={item.image} alt={item.name} fill className="object-contain drop-shadow-lg" sizes="(max-width: 768px) 192px, 256px" />
      </div>
    </div>
  );
}
