"use client";

import Image from "next/image";
import { useState } from "react";
import { BillDef } from "./constants";

interface BillCardProps {
  bill: BillDef;
  size?: "sm" | "md" | "lg";
  side?: "front" | "back";
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  showLabel?: boolean;
}

/**
 * Reusable Vietnamese bill card component.
 * - `side="back"` (default): shows imageBack — used for quizzes/games
 * - `side="front"`: shows imageFront — used for Explain lesson
 * Falls back to a styled CSS card if image fails to load.
 */
export function BillCard({
  bill,
  size = "md",
  side = "back",
  selected = false,
  disabled = false,
  onClick,
  showLabel = false,
}: BillCardProps) {
  const [imgError, setImgError] = useState(false);

  const imageSrc = side === "front" ? bill.imageFront : bill.imageBack;
  // Aspect ratio: 908 x 440 ≈ 2.06:1
  const sizeClasses = {
    sm: "w-[144px] h-[70px] sm:w-[176px] sm:h-[86px] text-lg",
    md: "w-[200px] h-[97px] sm:w-[260px] sm:h-[126px] text-2xl sm:text-3xl",
    lg: "w-[280px] h-[136px] sm:w-[340px] sm:h-[165px] text-3xl sm:text-4xl",
  };

  const borderClass = selected
    ? "ring-4 ring-blue-400 ring-offset-2 scale-105"
    : disabled
      ? "opacity-40 grayscale"
      : "";

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`
          relative rounded-xl overflow-hidden shadow-lg
          cursor-pointer transform transition-all duration-200
          hover:scale-105 active:scale-95
          ${sizeClasses[size]}
          ${borderClass}
          ${!onClick ? "cursor-default" : ""}
        `}
      >
        {!imgError ? (
          <Image
            src={imageSrc}
            alt={bill.labelFull}
            fill
            className="object-cover"
            onError={() => setImgError(true)}
            sizes="(max-width: 640px) 160px, 288px"
          />
        ) : (
          /* CSS Fallback when image not available */
          <div className={`w-full h-full ${bill.color} flex flex-col items-center justify-center gap-0.5 px-2`}>
            <span
              className={`font-black ${bill.textColor} drop-shadow-sm leading-tight ${sizeClasses[size].split(" ").pop()}`}
            >
              {bill.label}
            </span>
            <span className={`text-xs font-medium ${bill.textColor} opacity-70`}>VNĐ</span>
          </div>
        )}
      </button>

      {showLabel && <span className="text-sm font-semibold text-gray-600 mt-1">{bill.label}</span>}
    </div>
  );
}
