"use client";

import { LetterData } from "./constants";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import Image from "next/image";

interface LetterSelectorProps {
  letters: LetterData[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

export function LetterSelector({ letters, currentIndex, onSelect }: LetterSelectorProps) {
  const { speak } = useTextToSpeech();

  return (
    <div className="w-full max-w-lg px-2">
      <div className="flex flex-wrap justify-center gap-2">
        {letters.map((letter, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={letter.id}
              onClick={() => {
                onSelect(index);
              }}
              className={`
                relative w-12 h-12 rounded-xl font-bold text-lg cursor-pointer
                transition-all duration-200 transform active:scale-95
                ${
                  isActive
                    ? "bg-gradient-to-br from-orange-400 to-pink-500 text-white scale-110 shadow-lg shadow-orange-200"
                    : "bg-white border-2 border-gray-200 text-gray-700 hover:border-orange-300 hover:scale-105"
                }
              `}
            >
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <span className="text-base leading-none">{letter.id}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
