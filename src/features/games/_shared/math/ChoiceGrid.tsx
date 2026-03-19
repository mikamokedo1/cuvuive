"use client";

import { FeedbackType } from "@/types/game";

interface ChoiceGridProps {
  choices: number[];
  correctAnswer: number;
  feedback: FeedbackType;
  onChoice: (choice: number) => void;
}

export function ChoiceGrid({ choices, correctAnswer, feedback, onChoice }: ChoiceGridProps) {
  return (
    <div className="grid grid-cols-3 gap-4 md:gap-8 w-full max-w-2xl justify-items-center mt-2">
      {choices.map((choice) => (
        <div
          key={choice}
          onClick={() => onChoice(choice)}
          className={`
            w-24 h-24 sm:w-32 sm:h-32 rounded-2xl shadow-lg border-4 bg-white
            flex items-center justify-center cursor-pointer
            transform transition-all duration-200 hover:scale-110 active:scale-95
            ${feedback === "wrong" && "opacity-30 grayscale"}
            ${feedback === "correct" && choice === correctAnswer ? "border-green-500 scale-110 shadow-green-200" : "border-white"}
          `}
        >
          <span className="text-4xl sm:text-5xl font-black text-orange-500">{choice}</span>
        </div>
      ))}
    </div>
  );
}
