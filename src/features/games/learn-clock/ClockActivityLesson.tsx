"use client";

import { useState, useEffect, useMemo } from "react";
import { AnalogClock } from "./components/AnalogClock";
import { playCorrectSound, playWrongSound } from "@/libs/utils/playSound";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { timeToText } from "./constants";

// ============================================================
// Activity Schedule Data
// ============================================================

interface ActivityScenario {
  hours: number;
  minutes: number;
  period: "morning" | "evening";
  activity: string;
  emoji: string;
}

const DAILY_ACTIVITIES: ActivityScenario[] = [
  { hours: 6, minutes: 0, period: "morning", activity: "Thức dậy", emoji: "🌅" },
  { hours: 6, minutes: 30, period: "morning", activity: "Ăn sáng", emoji: "🍚" },
  { hours: 7, minutes: 0, period: "morning", activity: "Đi học", emoji: "🎒" },
  { hours: 12, minutes: 0, period: "morning", activity: "Ăn trưa", emoji: "🍲" },
  { hours: 6, minutes: 0, period: "evening", activity: "Đi tắm", emoji: "🛁" },
  { hours: 6, minutes: 30, period: "evening", activity: "Ăn tối", emoji: "🍜" },
  { hours: 7, minutes: 0, period: "evening", activity: "Học bài", emoji: "📖" },
  { hours: 9, minutes: 0, period: "evening", activity: "Đi ngủ", emoji: "😴" },
];

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function generateActivityQuestion(correct: ActivityScenario) {
  // Pick 2 wrong answers from other activities
  const wrongPool = DAILY_ACTIVITIES.filter(
    (a) => a.activity !== correct.activity,
  );
  const wrongAnswers = shuffleArray(wrongPool).slice(0, 2);
  const options = shuffleArray([correct, ...wrongAnswers]);
  return { correct, options };
}

// ============================================================
// Component
// ============================================================

interface ClockActivityLessonProps {
  onComplete: () => void;
}

export function ClockActivityLesson({ onComplete }: ClockActivityLessonProps) {
  const [questions, setQuestions] = useState<
    { correct: ActivityScenario; options: ActivityScenario[] }[]
  >([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<ActivityScenario | null>(null);
  const { speak } = useTextToSpeech();

  // Generate 6 random questions from the 8 activities
  useEffect(() => {
    const shuffled = shuffleArray(DAILY_ACTIVITIES).slice(0, 6);
    const qs = shuffled.map((a) => generateActivityQuestion(a));
    setQuestions(qs);
  }, []);

  // Speak the prompt when question changes
  useEffect(() => {
    if (questions.length === 0) return;
    const q = questions[currentIndex];
    const periodText = q.correct.period === "morning" ? "buổi sáng" : "buổi tối";
    speak(
      `${timeToText(q.correct.hours, q.correct.minutes)} ${periodText}. nên làm gì?`,
    );
  }, [currentIndex, questions]);

  const handleSelect = (option: ActivityScenario) => {
    if (selectedOption !== null) return;
    setSelectedOption(option);
    speak(option.activity);

    setTimeout(() => {
      const isCorrect = option.activity === questions[currentIndex].correct.activity;

      if (isCorrect) {
        speak(`Đúng rồi!`);
        playCorrectSound();
        playWinEffect(0);
        setTimeout(() => {
          setSelectedOption(null);
          if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
          } else {
            onComplete();
          }
        }, 1500);
      } else {
        playWrongSound();
        setTimeout(() => {
          setSelectedOption(null);
        }, 1000);
      }
    }, 800);
  };

  const periodIcon = useMemo(() => {
    if (questions.length === 0) return null;
    return questions[currentIndex].correct.period === "morning" ? "☀️" : "🌙";
  }, [currentIndex, questions]);

  const periodLabel = useMemo(() => {
    if (questions.length === 0) return "";
    return questions[currentIndex].correct.period === "morning"
      ? "Buổi sáng"
      : "Buổi tối";
  }, [currentIndex, questions]);

  if (questions.length === 0) return null;

  const currentQ = questions[currentIndex];

  return (
    <div className="flex flex-col items-center gap-6 md:gap-8 w-full max-w-4xl px-4">
      {/* Period Indicator */}
      <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-orange-300 shadow-md">
        <span className="text-3xl">{periodIcon}</span>
        <span className="text-xl md:text-2xl font-bold text-orange-700">
          {periodLabel}
        </span>
      </div>

      {/* Clock Display */}
      <div className="p-6 bg-white/50 backdrop-blur-sm rounded-full shadow-lg">
        <AnalogClock
          hours={currentQ.correct.hours}
          minutes={currentQ.correct.minutes}
          size={260}
          onClick={() => {
            const pText = currentQ.correct.period === "morning" ? "buổi sáng" : "buổi tối";
            speak(
              `${timeToText(currentQ.correct.hours, currentQ.correct.minutes)} ${pText}`,
            );
          }}
        />
      </div>

      {/* Question */}
      <p className="text-xl md:text-2xl font-bold text-gray-700 text-center">
        Bé đang làm gì? 🤔
      </p>

      {/* Activity Options */}
      <div className="flex flex-wrap items-center justify-center gap-4 w-full">
        {currentQ.options.map((opt, i) => {
          const isSelected = selectedOption?.activity === opt.activity;
          const isCorrect = isSelected && opt.activity === currentQ.correct.activity;
          const isWrong = isSelected && !isCorrect;

          return (
            <button
              key={i}
              onClick={() => handleSelect(opt)}
              disabled={selectedOption !== null}
              className={`flex items-center gap-3 px-6 py-4 rounded-3xl text-xl md:text-2xl font-extrabold transition-all duration-300 transform shadow-[0_6px_0_rgba(0,0,0,0.1)] active:shadow-[0_0px_0_rgba(0,0,0,0.1)] active:translate-y-1.5 min-w-[180px] justify-center
                ${selectedOption === null ? "bg-white hover:bg-blue-50 hover:scale-[1.05] border-4 border-blue-300 text-blue-700" : ""}
                ${isCorrect ? "bg-green-400 text-white border-4 border-green-500 scale-110" : ""}
                ${isWrong ? "bg-red-400 text-white border-4 border-red-500 animate-shake" : ""}
                ${selectedOption !== null && !isSelected ? "bg-gray-100 text-gray-400 border-4 border-gray-200 opacity-50 translate-y-1.5 shadow-none" : ""}
              `}
            >
              <span className="text-3xl">{opt.emoji}</span>
              <span>{opt.activity}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
