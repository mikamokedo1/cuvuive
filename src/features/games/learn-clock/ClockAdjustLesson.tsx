"use client";

import { useState, useEffect } from "react";
import { generateRandomTime, timeToText, TimeScenario } from "./constants";
import { AnalogClock } from "./components/AnalogClock";
import { playCorrectSound } from "@/libs/utils/playSound";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import Image from "next/image";
import { LoudSpeaker } from "@/libs/constants/game-assets";

interface ClockAdjustLessonProps {
  onComplete: () => void;
}

export function ClockAdjustLesson({ onComplete }: ClockAdjustLessonProps) {
  const [questions, setQuestions] = useState<TimeScenario[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentHours, setCurrentHours] = useState(12);
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const { speak } = useTextToSpeech();

  useEffect(() => {
    const newItems = Array.from({ length: 5 }, () => generateRandomTime());
    setQuestions(newItems);
  }, []);
  useEffect(() => {
    if (questions.length === 0) return;
    const currentQ = questions[currentIndex];

    speak(`Chỉnh đồng hồ thành ${timeToText(currentQ.hours, currentQ.minutes)}`);
  }, [currentIndex, questions]);

  const handleTimeChange = (h: number, m: number) => {
    if (isChecking) return;
    setCurrentHours(h);
    setCurrentMinutes(m);

    // Auto-check when time matches
    const q = questions[currentIndex];
    if (h === q.hours && m === q.minutes) {
      setIsChecking(true);
      playCorrectSound();
      playWinEffect(0);
      setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setCurrentHours(12);
          setCurrentMinutes(0);
        } else {
          onComplete();
        }
        setIsChecking(false);
      }, 1500);
    }
  };

  if (questions.length === 0) return null;

  const currentQ = questions[currentIndex];

  return (
    <div className="flex flex-col items-center gap-6 md:gap-10 w-full max-w-4xl px-4 pb-10">
      <div className="flex flex-col items-center gap-4 text-center">
        <button
          onClick={() => speak(`Chỉnh đồng hồ thành ${timeToText(currentQ.hours, currentQ.minutes)}`)}
          className="cursor-pointer hover:scale-105 transition-all"
        >
          <Image width={48} height={40} src={LoudSpeaker} alt="Speaker" className="w-12 h-10" />
        </button>
      </div>

      <div className="flex items-center justify-center bg-white/50 backdrop-blur-sm p-8 rounded-full shadow-lg">
        <AnalogClock
          hours={currentHours}
          minutes={currentMinutes}
          isInteractive={!isChecking}
          onChange={handleTimeChange}
          size={320}
          onClick={() => speak(timeToText(currentHours, currentMinutes))}
        />
      </div>
    </div>
  );
}
