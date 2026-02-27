"use client";

import { EntityData } from "@/types/game";
import Image from "next/image";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useEffect } from "react";

interface DinosaurCardProps {
  dinosaur: EntityData;
  active?: boolean;
  showName?: boolean;
  onClick?: () => void;
}

export function DinosaurCard({ dinosaur, active = false, showName = true, onClick }: DinosaurCardProps) {
  const { speak } = useTextToSpeech();

  useEffect(() => {
    if (active && showName) {
      const timeout = setTimeout(() => {
        speak(dinosaur.name);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [active, dinosaur.name, showName, speak]);

  const handleClick = () => {
    speak(dinosaur.name);
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
      {/* Dinosaur Image */}
      <div className="relative w-48 h-48 md:w-64 md:h-64">
        <Image src={dinosaur.image} alt={dinosaur.name} fill className="object-contain drop-shadow-lg" priority />
      </div>
    </div>
  );
}
