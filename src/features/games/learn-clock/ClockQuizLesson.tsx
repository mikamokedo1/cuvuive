"use client";

import { useState, useEffect } from "react";
import { generateRandomTime, generateOptions, timeToText, TimeScenario } from "./constants";
import { AnalogClock } from "./components/AnalogClock";
import { DigitalClock } from "./components/DigitalClock";
import { playCorrectSound, playWrongSound } from "@/libs/utils/playSound";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

interface ClockQuizLessonProps {
  type: "analog" | "digital";
  onComplete: () => void;
}

export function ClockQuizLesson({ type, onComplete }: ClockQuizLessonProps) {
  const [items, setItems] = useState<{ question: TimeScenario; options: TimeScenario[] }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<TimeScenario | null>(null);
  const { speak } = useTextToSpeech();

  useEffect(() => {
    // Generate 5 questions
    const newItems = Array.from({ length: 5 }, () => {
      const q = generateRandomTime();
      return { question: q, options: generateOptions(q, 3) };
    });
    setItems(newItems);
  }, []);

  const handleSelect = (option: TimeScenario) => {
    if (selectedOption !== null) return; // Prevent double click
    setSelectedOption(option);

    const currentQ = items[currentIndex].question;
    const isCorrect = option.hours === currentQ.hours && option.minutes === currentQ.minutes;

    if (isCorrect) {
      playCorrectSound();
      playWinEffect(0);
      setTimeout(() => {
        setSelectedOption(null);
        if (currentIndex < items.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          onComplete();
        }
      }, 1500);
    } else {
      playWrongSound();
      setTimeout(() => {
        setSelectedOption(null);
      }, 1000); // give them another chance after 1s
    }
  };

  if (items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl px-4">
      {/* Question Clock */}
      <div className="flex items-center justify-center p-8 bg-white/70 backdrop-blur-sm rounded-[2.5rem] shadow-xl border-4 border-orange-300 min-h-[300px] mb-4">
        {type === "analog" ? (
          <AnalogClock
            hours={currentItem.question.hours}
            minutes={currentItem.question.minutes}
            size={280}
            onClick={() => speak(timeToText(currentItem.question.hours, currentItem.question.minutes))}
          />
        ) : (
          <DigitalClock
            hours={currentItem.question.hours}
            minutes={currentItem.question.minutes}
            size="lg"
            onClick={() => speak(timeToText(currentItem.question.hours, currentItem.question.minutes))}
          />
        )}
      </div>

      {/* Options */}
      <div className="flex flex-wrap items-center justify-center gap-6 w-full">
        {currentItem.options.map((opt, i) => {
          const isSelected = selectedOption === opt;
          const isCorrect =
            isSelected && opt.hours === currentItem.question.hours && opt.minutes === currentItem.question.minutes;
          const isWrong = isSelected && !isCorrect;

          return (
            <button
              key={i}
              onClick={() => handleSelect(opt)}
              disabled={selectedOption !== null}
              className={`px-8 py-5 rounded-3xl text-2xl md:text-4xl font-extrabold transition-all duration-300 transform shadow-[0_8px_0_rgba(0,0,0,0.1)] active:shadow-[0_0px_0_rgba(0,0,0,0.1)] active:translate-y-2
                ${selectedOption === null ? "bg-white hover:bg-blue-50 hover:scale-[1.05] border-4 border-blue-300 text-blue-700" : ""}
                ${isCorrect ? "bg-green-400 text-white border-4 border-green-500 scale-110" : ""}
                ${isWrong ? "bg-red-400 text-white border-4 border-red-500 animate-shake" : ""}
                ${selectedOption !== null && selectedOption !== opt ? "bg-gray-100 text-gray-400 border-4 border-gray-200 opacity-50 translate-y-2 shadow-none" : ""}
              `}
            >
              {timeToText(opt.hours, opt.minutes)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
