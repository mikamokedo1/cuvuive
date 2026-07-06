"use client";

import { useState, useEffect } from "react";
import { BackLessonButton } from "@/components/games/BackLessonButton";
import { NextLessonButton } from "@/components/games/NextLessonButton";
import { useSwipe } from "@/hooks/useSwipe";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { AnalogClock } from "./components/AnalogClock";
import { DigitalClock } from "./components/DigitalClock";
import { generateRandomTime, timeToText, TimeScenario } from "./constants";
import { usePathname } from "next/navigation";
import { MAP_PATHNAME_TO_TEXT } from "@/context/owlMaps";

interface ClockLearnLessonProps {
  type: "analog" | "digital";
  onComplete: () => void;
}

export function ClockLearnLesson({ type, onComplete }: ClockLearnLessonProps) {
  const [items, setItems] = useState<TimeScenario[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { speak } = useTextToSpeech();
  const pathname = usePathname();

  useEffect(() => {
    // Generate 5 random times for learning
    const newItems: TimeScenario[] = [];
    while (newItems.length < 5) {
      const time = generateRandomTime(newItems[newItems.length - 1]);
      newItems.push(time);
    }
    setItems(newItems);
  }, []);

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    const currentItem = items[currentIndex];
    if (currentItem) {
      if (currentIndex === 0) {
        const text = MAP_PATHNAME_TO_TEXT[pathname as keyof typeof MAP_PATHNAME_TO_TEXT];
        if (text) {
          speak(`${text}. ${timeToText(currentItem.hours, currentItem.minutes)}`);
        } else {
          speak(timeToText(currentItem.hours, currentItem.minutes));
        }
      } else {
        speak(timeToText(currentItem.hours, currentItem.minutes));
      }
    }
  }, [currentIndex, items, pathname, speak]);

  const swipeRef = useSwipe({ onSwipeLeft: handleNext, onSwipeRight: handlePrev });

  if (items.length === 0) return null;

  const isLast = currentIndex === items.length - 1;
  const currentItem = items[currentIndex];

  return (
    <div ref={swipeRef} className="flex flex-col items-center gap-6 md:gap-8 w-full max-w-4xl px-4">
      {/* Clock Display */}
      <div className="flex flex-col items-center justify-center w-full min-h-[350px] gap-10">
        <div className="p-6 bg-white/50 backdrop-blur-sm rounded-full shadow-lg">
          {type === "analog" ? (
            <AnalogClock
              hours={currentItem.hours}
              minutes={currentItem.minutes}
              size={280}
              onClick={() => speak(timeToText(currentItem.hours, currentItem.minutes))}
            />
          ) : (
            <DigitalClock
              hours={currentItem.hours}
              minutes={currentItem.minutes}
              size="md"
              onClick={() => speak(timeToText(currentItem.hours, currentItem.minutes))}
            />
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 mt-4">
        <BackLessonButton onClick={handlePrev} disabled={currentIndex === 0} />
        <NextLessonButton onClick={handleNext} isLast={isLast} />
      </div>
    </div>
  );
}
