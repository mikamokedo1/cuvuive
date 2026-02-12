"use client";

import { InstrumentData } from "./constants";
import Image from "next/image";
import { useTextToSpeech } from "@/libs/hooks/useTextToSpeech";
import { useEffect } from "react";

interface InstrumentCardProps {
  instrument: InstrumentData;
  active?: boolean;
  showName?: boolean;
  onClick?: () => void;
}

export function InstrumentCard({ instrument, active = false, showName = true, onClick }: InstrumentCardProps) {
  const { speak } = useTextToSpeech();

  useEffect(() => {
    if (active && showName) {
      const timeout = setTimeout(() => {
        speak(instrument.name);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [active, instrument.name, showName, speak]);

  const handleClick = () => {
    speak(instrument.name);
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
      {/* Instrument Image */}
      <div className="relative w-48 h-48 md:w-64 md:h-64">
        <Image src={instrument.image} alt={instrument.name} fill className="object-contain drop-shadow-lg" priority />
      </div>
    </div>
  );
}
