"use client";

import { useTextToSpeech } from "@/hooks/useTextToSpeech";

interface BlankBoxProps {
  answered: boolean;
  answerValue: number;
  onClickBlank?: () => void;
  className?: string;
}

export function BlankBox({ answered, answerValue, onClickBlank, className = "" }: BlankBoxProps) {
  const { speak } = useTextToSpeech();

  if (answered) {
    return (
      <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-b from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-200 animate-scale ${className}`}>
        <span className="text-4xl md:text-5xl font-black text-white">{answerValue}</span>
      </div>
    );
  }

  return (
    <div
      className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl border-4 border-dashed border-orange-400 bg-orange-50 flex items-center justify-center shadow-lg animate-pulse cursor-pointer hover:scale-110 transition-all ${className}`}
      onClick={() => {
        if (onClickBlank) onClickBlank();
        else speak("mấy?");
      }}
    >
      <span className="text-4xl md:text-5xl font-black text-orange-400">?</span>
    </div>
  );
}
