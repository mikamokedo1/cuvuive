"use client";

import { EntityData } from "@/types/game";
import Image from "next/image";
import { useTextToSpeech } from "@/libs/hooks/useTextToSpeech";
import { useEffect } from "react";

interface VehicleCardProps {
  vehicle: EntityData;
  active?: boolean;
  showName?: boolean;
  onClick?: () => void;
}

export function VehicleCard({ vehicle, active = false, showName = true, onClick }: VehicleCardProps) {
  const { speak } = useTextToSpeech();

  useEffect(() => {
    if (active && showName) {
      // Auto-speak when card becomes active
      const timeout = setTimeout(() => {
        speak(vehicle.name);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [active, vehicle.name, showName, speak]);

  const handleClick = () => {
    speak(vehicle.name);
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
      {/* Vehicle Image */}
      <div className="relative w-48 h-48 md:w-64 md:h-64">
        <Image src={vehicle.image} alt={vehicle.name} fill className="object-contain drop-shadow-lg" priority />
      </div>
    </div>
  );
}
