"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { ThingImages } from "@/libs/constants/thingImages";
import { randomNum } from "@/libs/utils/randomNum";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { FeedbackType } from "@/types/game";

interface MixedPracticeLessonProps {
  onComplete: () => void;
}

type QuestionType = "visual" | "number";
type ComparisonType = "greater" | "less" | "equal";

const REQUIRED_WINS = 8;

export function MixedPracticeLesson({ onComplete }: MixedPracticeLessonProps) {
  const [leftNum, setLeftNum] = useState(0);
  const [rightNum, setRightNum] = useState(0);
  const [questionType, setQuestionType] = useState<QuestionType>("visual");
  const [targetComparison, setTargetComparison] = useState<ComparisonType>("greater");
  const [imageIndex, setImageIndex] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const prevQuestionRef = useRef<string>("");

  const generateQuestion = useCallback(() => {
    let left: number, right: number;
    let attempts = 0;

    // Random question type
    const newType: QuestionType = Math.random() > 0.5 ? "visual" : "number";

    // Random comparison type
    const compTypes: ComparisonType[] = ["greater", "less", "equal"];
    const newComparison = compTypes[Math.floor(Math.random() * compTypes.length)];

    do {
      if (newComparison === "greater") {
        left = randomNum(3, 8);
        right = randomNum(1, left - 1);
      } else if (newComparison === "less") {
        right = randomNum(3, 8);
        left = randomNum(1, right - 1);
      } else {
        const val = randomNum(2, 6);
        left = val;
        right = val;
      }
      attempts++;
    } while (`${left}-${right}-${newType}` === prevQuestionRef.current && attempts < 10);

    prevQuestionRef.current = `${left}-${right}-${newType}`;
    setLeftNum(left);
    setRightNum(right);
    setQuestionType(newType);
    setTargetComparison(newComparison);
    setImageIndex(randomNum(0, ThingImages.length - 1));
    setFeedback(null);
  }, []);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const handleChoice = (choice: "left" | "right") => {
    if (feedback) return;

    let isCorrect = false;

    if (targetComparison === "greater") {
      isCorrect = choice === "left";
    } else if (targetComparison === "less") {
      isCorrect = choice === "left";
    } else {
      isCorrect = true;
    }

    if (isCorrect) {
      setFeedback("correct");
      const newCount = correctCount + 1;
      setCorrectCount(newCount);

      if (newCount >= REQUIRED_WINS) {
        playWinEffect(500);
        setTimeout(onComplete, 1200);
      } else {
        setTimeout(generateQuestion, 800);
      }
    } else {
      setFeedback("wrong");
      setTimeout(() => setFeedback(null), 600);
    }
  };

  const questionText = {
    greater: "Chọn bên NHIỀU HƠN",
    less: "Chọn bên ÍT HƠN",
    equal: "Hai bên BẰNG nhau",
  }[targetComparison];

  const symbolDisplay = {
    greater: ">",
    less: "<",
    equal: "=",
  }[targetComparison];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl">
      {/* Question */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-orange-600">{questionText}</h2>
        <span className="text-5xl font-black text-purple-500">{symbolDisplay}</span>
      </div>

      {/* Comparison area */}
      <div
        className={`bg-white/90 rounded-3xl p-4 md:p-6 shadow-xl border-4 w-full transition-all ${
          feedback === "correct"
            ? "border-green-400 bg-green-50"
            : feedback === "wrong"
              ? "border-red-400 bg-red-50 animate-shake"
              : "border-yellow-200"
        }`}
      >
        <div className="flex items-center justify-around gap-4">
          {/* Left Side */}
          <button
            onClick={() => handleChoice("left")}
            className="flex flex-col items-center gap-2 p-2 md:p-4 rounded-2xl hover:bg-yellow-50 transition-colors cursor-pointer w-[45%] min-h-[120px] md:min-h-[150px]"
            disabled={!!feedback}
          >
            {questionType === "visual" ? (
              <div className="flex flex-wrap justify-center gap-2">
                {Array.from({ length: leftNum }).map((_, i) => (
                  <div key={`left-${i}`} className="w-10 h-10 md:w-12 md:h-12 relative">
                    <Image
                      src={ThingImages[imageIndex].icon}
                      alt="item"
                      fill
                      className="object-contain drop-shadow-md"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                <span className="text-4xl md:text-5xl font-black text-white">{leftNum}</span>
              </div>
            )}
          </button>

          {/* Divider */}
          <div className="text-4xl font-black text-slate-300">?</div>

          {/* Right Side */}
          <button
            onClick={() => handleChoice("right")}
            className="flex flex-col items-center gap-2 p-2 md:p-4 rounded-2xl hover:bg-yellow-50 transition-colors cursor-pointer w-[45%] min-h-[120px] md:min-h-[150px]"
            disabled={!!feedback}
          >
            {questionType === "visual" ? (
              <div className="flex flex-wrap justify-center gap-2">
                {Array.from({ length: rightNum }).map((_, i) => (
                  <div key={`right-${i}`} className="w-10 h-10 md:w-12 md:h-12 relative">
                    <Image
                      src={ThingImages[(imageIndex + 1) % ThingImages.length].icon}
                      alt="item"
                      fill
                      className="object-contain drop-shadow-md"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-b from-purple-400 to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-4xl md:text-5xl font-black text-white">{rightNum}</span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 flex-wrap justify-center">
        {Array.from({ length: REQUIRED_WINS }).map((_, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-full transition-all ${
              i < correctCount ? "bg-green-500 scale-110" : "bg-slate-300"
            }`}
          />
        ))}
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`text-3xl font-black ${feedback === "correct" ? "text-green-500" : "text-red-500"}`}>
          {feedback === "correct" ? "Đúng rồi! 🎉" : "Thử lại nhé! 💪"}
        </div>
      )}
    </div>
  );
}
