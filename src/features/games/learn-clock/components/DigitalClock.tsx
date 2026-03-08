"use client";

import React from "react";

interface DigitalClockProps {
  hours: number;
  minutes: number;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

export function DigitalClock({ hours, minutes, size = "md", onClick }: DigitalClockProps) {
  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  const sizeClasses = {
    sm: "text-4xl px-4 py-2 border-4",
    md: "text-6xl px-6 py-3 border-8",
    lg: "text-8xl px-8 py-4 border-8 lg:text-[7rem] lg:px-12 lg:py-6",
  };

  return (
    <div
      onClick={onClick}
      className={`font-mono font-bold text-gray-800 bg-gray-100 border-gray-800 rounded-2xl shadow-inner flex items-center justify-center tracking-wider cursor-pointer hover:shadow-md transition-shadow ${sizeClasses[size]}`}
    >
      <span>{formatNumber(hours)}</span>
      <span className="mx-2 animate-pulse text-gray-500">:</span>
      <span>{formatNumber(minutes)}</span>
    </div>
  );
}
