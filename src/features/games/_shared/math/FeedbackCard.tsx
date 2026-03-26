"use client";

import { FeedbackType } from "@/types/game";

interface FeedbackCardProps {
  feedback: FeedbackType;
  children: React.ReactNode;
  className?: string;
}

export function FeedbackCard({ feedback, children, className = "" }: FeedbackCardProps) {
  return (
    <div
      className={`bg-white/90 rounded-3xl p-6 md:p-8 shadow-xl border-4 w-full transition-all ${
        feedback === "correct"
          ? "border-green-400 bg-green-50"
          : feedback === "wrong"
            ? "border-red-400 bg-red-50 animate-shake"
            : "border-purple-200"
      } ${className}`}
    >
      {children}
    </div>
  );
}
