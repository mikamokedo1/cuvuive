"use client";

import { SudokuCell as SudokuCellType } from "./constants";

interface SudokuCellProps {
  cell: SudokuCellType;
  size: number;
  isSelected: boolean;
  isCorrect: boolean | null; // null = no feedback, true = correct, false = wrong
  onClick: () => void;
}

export function SudokuCell({ cell, size, isSelected, isCorrect, onClick }: SudokuCellProps) {
  const is2x2 = size === 2;
  const cellSize = is2x2
    ? "w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40"
    : "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28";
  const emojiSize = is2x2 ? "text-5xl sm:text-6xl md:text-7xl" : "text-3xl sm:text-4xl md:text-5xl";

  const isBlank = !cell.isGiven && cell.value === null;
  const isFilled = !cell.isGiven && cell.value !== null;

  let borderClass = "border-3 border-amber-200";
  let bgClass = "bg-white";
  let extraClass = "";

  if (cell.isGiven) {
    bgClass = "bg-amber-50";
    borderClass = "border-3 border-amber-300";
  } else if (isSelected) {
    borderClass = "border-3 border-blue-400 ring-4 ring-blue-200";
    bgClass = "bg-blue-50";
  } else if (isBlank) {
    borderClass = "border-3 border-dashed border-gray-300";
    bgClass = "bg-gray-50/50";
  }

  if (isCorrect === true) {
    borderClass = "border-3 border-green-400 ring-4 ring-green-200";
    bgClass = "bg-green-50";
    extraClass = "animate-bounce-in";
  } else if (isCorrect === false) {
    borderClass = "border-3 border-red-400 ring-4 ring-red-200";
    bgClass = "bg-red-50";
    extraClass = "animate-shake";
  }

  return (
    <button
      onClick={onClick}
      disabled={cell.isGiven || isFilled}
      className={`
        relative flex items-center justify-center
        ${cellSize} ${borderClass} ${bgClass}
        rounded-2xl shadow-md
        transition-all duration-200
        ${!cell.isGiven && !isFilled ? "cursor-pointer hover:scale-105 active:scale-95" : "cursor-default"}
        ${extraClass}
      `}
    >
      {cell.value ? (
        <span className={`${emojiSize} select-none drop-shadow-sm`}>{cell.value}</span>
      ) : (
        <span className="text-3xl text-gray-300 select-none">?</span>
      )}
    </button>
  );
}
