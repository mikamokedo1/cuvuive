import Image from "next/image";
import { CostumeData } from "./constants";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useEffect } from "react";

interface CostumeCardProps {
  costume: CostumeData;
  active?: boolean;
  showName?: boolean;
}

export function CostumeCard({ costume, active = false, showName = true }: CostumeCardProps) {
  const { speak } = useTextToSpeech();

  useEffect(() => {
    if (active && showName) {
      // Auto-speak when card becomes active
      const timeout = setTimeout(() => {
        speak(costume.name);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [active, costume.name, showName, speak]);

  const handleClick = () => {
    speak(costume.name);
  };

  return (
    <div
      onClick={handleClick}
      className={`
        relative flex flex-col items-center gap-4 p-6 rounded-3xl cursor-pointer
        transition-all duration-300 transform
        hover:scale-105
      `}
    >
      {/* Animal Image */}
      <div className="relative w-48 h-48 md:w-64 md:h-64">
        <Image src={costume.image} alt={costume.name} fill className="object-contain drop-shadow-lg" priority />
      </div>
    </div>
  );
}
