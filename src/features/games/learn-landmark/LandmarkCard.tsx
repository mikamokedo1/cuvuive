"use client";

import { EntityData } from "@/types/game";
import Image from "next/image";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useEffect } from "react";

interface LandmarkCardProps {
  landmark: EntityData;
  active?: boolean;
  onClick?: () => void;
}

export function LandmarkCard({ landmark, active = false, onClick }: LandmarkCardProps) {
  const { speak } = useTextToSpeech();

  useEffect(() => {
    if (active) {
      // Auto-speak when card becomes active
      const timeout = setTimeout(() => {
        speak(landmark.name);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [active, landmark.name, speak]);

  const handleClick = () => {
    speak(landmark.name);
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
      {/* Landmark Image */}
      <div className="relative w-48 h-48 md:w-64 md:h-64">
        <Image src={landmark.image} alt={landmark.name} fill className="object-contain drop-shadow-lg" priority />
      </div>

      {/* Landmark Name */}
    </div>
  );
}
