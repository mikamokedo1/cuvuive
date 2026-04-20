"use client";

import { useState, useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { PointConfig } from "@/features/games/find-differences/constans";

interface DifferenceBoardProps {
  originalImage: string | StaticImageData;
  modifiedImage: string | StaticImageData;
  differences: PointConfig[];
  onFoundDifference?: (index: number) => void;
  onWrongClick?: () => void;
  onAllFound?: () => void;
}

export function DifferenceBoard({
  originalImage,
  modifiedImage,
  differences,
  onFoundDifference,
  onWrongClick,
  onAllFound,
}: DifferenceBoardProps) {
  const [foundIndices, setFoundIndices] = useState<number[]>([]);
  const [clickEffect, setClickEffect] = useState<{ x: number; y: number; isCorrect: boolean } | null>(null);

  useEffect(() => {
    // Reset state when differences change (e.g. next level)
    setFoundIndices([]);
  }, [differences]);

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Show temporary click effect
    setClickEffect({ x, y, isCorrect: false });
    setTimeout(() => setClickEffect(null), 500);

    // Find if clicked near any difference
    const foundIndex = differences.findIndex((diff, index) => {
      if (foundIndices.includes(index)) return false;
      const dx = diff.x - x;
      const dy = diff.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance <= diff.radius;
    });

    if (foundIndex !== -1) {
      setClickEffect((prev) => (prev ? { ...prev, isCorrect: true } : null));
      const newFound = [...foundIndices, foundIndex];
      setFoundIndices(newFound);
      onFoundDifference?.(foundIndex);

      if (newFound.length === differences.length) {
        setTimeout(() => {
          onAllFound?.();
        }, 1000);
      }
    } else {
      onWrongClick?.();
    }
  };

  return (
    <div className="flex flex-col w-full h-full max-h-full justify-center items-center gap-3">
      {/* Difference Counter */}
      <div className="flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2.5 rounded-full shadow-lg">
        <span className="text-lg">🔍</span>
        <div className="flex items-center gap-1.5">
          {differences.map((_, index) => (
            <span
              key={index}
              className={`text-xl transition-all duration-300 ${
                foundIndices.includes(index)
                  ? "scale-125 drop-shadow-[0_0_6px_rgba(255,255,0,0.8)]"
                  : "opacity-40 grayscale"
              }`}
            >
              ⭐
            </span>
          ))}
        </div>
        <span className="font-bold text-base ml-1">
          {foundIndices.length}/{differences.length}
        </span>
      </div>

      {/* Images Row */}
      <div className="flex flex-col md:flex-row gap-4 w-full flex-1 max-h-full justify-center items-center">
      {/* Original Image */}
      <div
        className="relative w-full aspect-[4/3] md:w-1/2 max-h-[45vh] md:max-h-[70vh] rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-gray-200 cursor-crosshair transform transition duration-300 hover:scale-[1.02]"
        onClick={handleImageClick}
      >
        <Image src={originalImage} alt="Bản gốc" fill className="object-contain" />
        {/* Render Found Differences */}
        {foundIndices.map((index) => {
          const diff = differences[index];
          return (
            <div
              key={`orig-${index}`}
              className="absolute border-4 border-green-500 rounded-full animate-bounce-in"
              style={{
                left: `${diff.x}%`,
                top: `${diff.y}%`,
                width: `${diff.radius * 2}%`,
                height: `${diff.radius * 2}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          );
        })}
        {/* Render Click Effect */}
        {clickEffect && !clickEffect.isCorrect && (
          <div
            className="absolute text-red-500 font-bold text-4xl animate-ping"
            style={{
              left: `${clickEffect.x}%`,
              top: `${clickEffect.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            ✗
          </div>
        )}
      </div>

      {/* Modified Image */}
      <div
        className="relative w-full aspect-[4/3] md:w-1/2 max-h-[45vh] md:max-h-[70vh] rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-gray-200 cursor-crosshair transform transition duration-300 hover:scale-[1.02]"
        onClick={handleImageClick}
      >
        <Image src={modifiedImage} alt="Bản có điểm khác biệt" fill className="object-contain" />
        {/* Render Found Differences */}
        {foundIndices.map((index) => {
          const diff = differences[index];
          return (
            <div
              key={`mod-${index}`}
              className="absolute border-4 border-green-500 rounded-full animate-bounce-in"
              style={{
                left: `${diff.x}%`,
                top: `${diff.y}%`,
                width: `${diff.radius * 2}%`,
                height: `${diff.radius * 2}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          );
        })}
        {/* Render Click Effect */}
        {clickEffect && !clickEffect.isCorrect && (
          <div
            className="absolute text-red-500 font-bold text-4xl animate-ping"
            style={{
              left: `${clickEffect.x}%`,
              top: `${clickEffect.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            ✗
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
