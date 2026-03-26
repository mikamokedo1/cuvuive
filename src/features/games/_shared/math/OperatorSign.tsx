"use client";

import { useTextToSpeech } from "@/hooks/useTextToSpeech";

interface OperatorSignProps {
  symbol: "×" | "÷" | "+" | "−" | "=";
  speakText: string;
  className?: string;
}

export function OperatorSign({ symbol, speakText, className = "" }: OperatorSignProps) {
  const { speak } = useTextToSpeech();

  return (
    <span
      className={`text-5xl md:text-6xl font-black drop-shadow-lg text-emerald-500 cursor-pointer hover:scale-110 transition-all ${className}`}
      onClick={() => speak(speakText)}
    >
      {symbol}
    </span>
  );
}
