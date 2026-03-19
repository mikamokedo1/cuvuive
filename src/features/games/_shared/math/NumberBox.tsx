"use client";

import { useTextToSpeech } from "@/hooks/useTextToSpeech";

type Gradient = "purple" | "blue" | "emerald" | "green" | "slate" | "orange" | "pink";

const GRADIENT_MAP: Record<Gradient, string> = {
  purple: "from-purple-400 to-purple-600",
  blue: "from-blue-400 to-blue-600",
  emerald: "from-emerald-400 to-emerald-600",
  green: "from-green-400 to-green-600",
  slate: "from-slate-300 to-slate-400",
  orange: "from-orange-400 to-orange-600",
  pink: "from-pink-400 to-pink-600",
};

interface NumberBoxProps {
  value: number | string;
  gradient?: Gradient;
  speakText?: string;
  pulse?: boolean;
  className?: string;
}

export function NumberBox({ value, gradient = "purple", speakText, pulse, className = "" }: NumberBoxProps) {
  const { speak } = useTextToSpeech();
  const grad = GRADIENT_MAP[gradient] || GRADIENT_MAP.purple;

  return (
    <div
      className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-b ${grad} flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-all active:scale-95 ${pulse ? "animate-pulse" : ""} ${className}`}
      onClick={() => speakText && speak(speakText)}
    >
      <span className="text-4xl md:text-5xl font-black text-white">{value}</span>
    </div>
  );
}
