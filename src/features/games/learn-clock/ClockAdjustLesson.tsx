"use client";

import { useState, useEffect } from "react";
import { generateRandomTime, timeToText, TimeScenario } from "./constants";
import { AnalogClock } from "./components/AnalogClock";
import { playCorrectSound, playWrongSound } from "@/libs/utils/playSound";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import LoudSpeaker from "@/assets/games/loud-speaker.webp";
import Image from "next/image";

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
  };

  const handleCheck = () => {
    if (isChecking) return;
    setIsChecking(true);

    const q = questions[currentIndex];
    // Allow matching e.g. 12:00
    if (currentHours === q.hours && currentMinutes === q.minutes) {
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
    } else {
      playWrongSound();
      setTimeout(() => setIsChecking(false), 1000);
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
          <Image src={LoudSpeaker} alt="Speaker" className="w-12 h-10" />
        </button>
      </div>

      <div className="flex items-center justify-center bg-white/50 backdrop-blur-sm p-8 rounded-full shadow-lg">
        <AnalogClock
          hours={currentHours}
          minutes={currentMinutes}
          isInteractive={true}
          onChange={handleTimeChange}
          size={320}
          onClick={() => speak(timeToText(currentHours, currentMinutes))}
        />
      </div>

      <button
        onClick={handleCheck}
        disabled={isChecking}
        className={`px-12 py-5 bg-green-500 hover:bg-green-600 active:scale-95 active:shadow-none active:translate-y-2 transition-all text-white text-xl md:text-3xl font-extrabold rounded-3xl shadow-[0_8px_0_#15803d] border-b-4 border-green-700
          ${isChecking ? "opacity-70 cursor-not-allowed translate-y-2 shadow-none" : ""}
        `}
      >
        Kiểm tra
      </button>
    </div>
  );
}
