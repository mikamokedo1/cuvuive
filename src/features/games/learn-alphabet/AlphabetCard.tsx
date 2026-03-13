"use client";

import { LetterData } from "./constants";
import Image from "next/image";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useEffect } from "react";

interface AlphabetCardProps {
  letter: LetterData;
  active?: boolean;
  showName?: boolean;
  onClick?: () => void;
}

export function AlphabetCard({ letter, active = false, showName = true, onClick }: AlphabetCardProps) {
  const { speak } = useTextToSpeech();

  useEffect(() => {
    if (active && showName) {
      const timeout = setTimeout(() => {
        speak(`${letter.name}, ${letter.word}`);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [active, letter.name, letter.word, showName, speak]);

  const handleClick = () => {
    speak(`${letter.name}`);
    onClick?.();
  };

  return (
    <div
      className={`
        relative flex flex-col items-center gap-4 p-6 rounded-3xl cursor-pointer
        transition-all duration-300 transform
        ${active ? "scale-100 opacity-100" : "scale-90 opacity-60"}
      `}
    >
      {/* Large Letter Display */}
      <div
        className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 drop-shadow-lg select-none leading-none"
        onClick={handleClick}
      >
        {letter.id}
      </div>

      {/* Representative image */}
      <div className="relative w-40 h-40 md:w-48 md:h-48" onClick={() => speak(`${letter.word}`)}>
        <Image src={letter.image} alt={letter.word} fill className="object-contain drop-shadow-lg" sizes="(max-width: 768px) 160px, 192px" />
      </div>
    </div>
  );
}
