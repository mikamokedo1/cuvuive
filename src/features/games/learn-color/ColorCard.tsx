import { useEffect, useRef } from "react";
import { ColorData } from "./constants";
import Image from "next/image";
import { useTextToSpeech } from "@/libs/hooks/useTextToSpeech";

interface ColorCardProps {
  color: ColorData;
  active?: boolean;
  onClick?: () => void;
  showName?: boolean;
}

export function ColorCard({ color, active = false, onClick, showName = true }: ColorCardProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { speak } = useTextToSpeech();

  useEffect(() => {
    if (active && color.audio) {
      playSound();
    }
  }, [active, color.id]);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((e) => console.log("Audio play failed", e));
    }
  };

  return (
    <div
      onClick={() => {
        playSound();
        onClick?.();
      }}
      className={`
        relative flex flex-col items-center justify-center gap-6
        transform transition-all duration-300
        ${active ? "scale-110" : "scale-100 hover:scale-105"}
        cursor-pointer
      `}
    >
      {/* Main Container - Side by Side on Tablet+ */}
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Color Blob */}
        <div
          className="w-40 h-40 sm:w-52 sm:h-52 rounded-full shadow-lg border-4 border-white flex items-center justify-center transition-transform relative overflow-hidden hover:scale-105"
          style={{ backgroundColor: color.hex }}
          onClick={() => speak(color.name)}
        >
          {/* Shine effect */}
          <div className="absolute top-4 right-8 w-8 h-8 bg-white/30 rounded-full blur-sm" />
        </div>

        {/* Association Image */}
        <div className="flex flex-col items-center gap-2">
          <div
            onClick={() => speak(color.imageName)}
            className="relative w-40 h-40 sm:w-52 sm:h-52 drop-shadow-xl bg-white rounded-3xl p-4 border-4 border-orange-100  hover:scale-105"
          >
            <Image src={color.image} alt={color.imageName} fill className="object-contain p-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
