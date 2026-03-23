"use client";

interface TrueFalseButtonsProps {
  onAnswer: (answer: boolean) => void;
  feedback: "correct" | "wrong" | null;
  correctAnswer?: boolean;
  selectedAnswer?: boolean | null;
}

export function TrueFalseButtons({ onAnswer, feedback, correctAnswer, selectedAnswer }: TrueFalseButtonsProps) {
  const isDisabled = feedback !== null;

  const getButtonClass = (isTrue: boolean) => {
    const isSelected = selectedAnswer === isTrue;
    const isCorrectChoice = correctAnswer === isTrue;

    if (feedback === "correct" && isCorrectChoice) {
      return "bg-green-500 text-white scale-110 ring-4 ring-green-200";
    }
    if (feedback === "correct" && !isCorrectChoice) {
      return "opacity-40 bg-gray-100 text-gray-400 cursor-not-allowed";
    }
    if (feedback === "wrong" && isSelected) {
      return "bg-red-500 text-white animate-shake";
    }
    if (feedback === "wrong" && !isSelected) {
      return "opacity-40 bg-gray-100 text-gray-400 cursor-not-allowed";
    }

    // Default (no feedback)
    return isTrue
      ? "bg-green-500 text-white hover:bg-green-600 hover:scale-105 cursor-pointer"
      : "bg-red-500 text-white hover:bg-red-600 hover:scale-105 cursor-pointer";
  };

  return (
    <div className="flex gap-6 w-full max-w-md">
      <button
        onClick={() => onAnswer(true)}
        disabled={isDisabled}
        className={`flex-1 py-6 rounded-2xl text-2xl font-bold shadow-lg transform transition-all duration-200 active:scale-95 ${getButtonClass(true)}`}
      >
        ✅ Đúng
      </button>

      <button
        onClick={() => onAnswer(false)}
        disabled={isDisabled}
        className={`flex-1 py-6 rounded-2xl text-2xl font-bold shadow-lg transform transition-all duration-200 active:scale-95 ${getButtonClass(false)}`}
      >
        ❌ Sai
      </button>
    </div>
  );
}
