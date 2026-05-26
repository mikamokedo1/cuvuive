"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { WordData } from "./constants";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { getRandomItem } from "@/libs/utils/randomQuestion";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playButtonSound } from "@/libs/utils/playSound";
import Loading from "@/components/common/Loading";

interface WordSpellingLessonProps {
  words: WordData[];
  onComplete: () => void;
  requiredWins?: number;
}

export function WordSpellingLesson({ words, onComplete, requiredWins = 15 }: WordSpellingLessonProps) {
  const { speak } = useTextToSpeech();
  const [target, setTarget] = useState<WordData | null>(null);
  const prevTargetRef = useRef<WordData | null>(null);
  const [shuffledSyllables, setShuffledSyllables] = useState<{ id: number; text: string }[]>([]);
  const [placedCount, setPlacedCount] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongId, setWrongId] = useState<number | null>(null);

  const generateQuestion = () => {
    if (!words || words.length === 0) return;

    // Pick a word that has >= 1 syllables, but ideally > 1. All of ours are defined so it's fine.
    const validWords = words.filter((w) => w.syllables.length > 0);
    if (validWords.length === 0) return;

    const newTarget = getRandomItem(validWords, prevTargetRef.current);
    prevTargetRef.current = newTarget;

    // Shuffle the syllables but keep an ID to track instances
    const shuffled = newTarget.syllables.map((text, idx) => ({ id: idx, text })).sort(() => Math.random() - 0.5);

    setTarget(newTarget);
    setShuffledSyllables(shuffled);
    setPlacedCount(0);
    setWrongId(null);

    setTimeout(() => {
      speak(`Pé hãy ghép chữ ${newTarget.name} nhé`);
    }, 1000);
  };

  useEffect(() => {
    generateQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words]);

  const handleSyllableClick = (syllable: { id: number; text: string }) => {
    if (!target) return;
    if (placedCount >= target.syllables.length) return; // already won

    const expectedText = target.syllables[placedCount];
    speak(syllable.text === "bé" ? "pé" : syllable.text);

    if (syllable.text === expectedText) {
      const newPlacedCount = placedCount + 1;
      setPlacedCount(newPlacedCount);

      if (newPlacedCount === target.syllables.length) {
        // WIN
        speak(target.name);
        playWinEffect(500);
        setTimeout(() => {
          const newScore = score + 1;
          setScore(newScore);
          if (newScore >= requiredWins) {
            onComplete();
          } else {
            generateQuestion();
          }
        }, 1500);
      }
    } else {
      // WRONG
      setWrongId(syllable.id);
      setTimeout(() => setWrongId(null), 500);
    }
  };

  if (!target) return <Loading />;

  // placed list (completed parts vs empty parts)
  const placedList = target.syllables.slice(0, placedCount);

  // available list (only those not yet placed)
  const getAvailableSyllables = () => {
    const available = [...shuffledSyllables];
    for (const pText of placedList) {
      const idx = available.findIndex((s) => s.text === pText);
      if (idx !== -1) available.splice(idx, 1);
    }
    return available;
  };
  const availableSyllables = getAvailableSyllables();

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl px-4">
      <div
        onClick={() => speak(target.name)}
        className="relative w-48 h-48 md:w-64 md:h-64 flex flex-col items-center justify-center p-6 bg-white rounded-[3rem] border-4 shadow-xl border-blue-400 cursor-pointer transition-transform hover:scale-105"
      >
        <div className="relative w-32 h-32 md:w-48 md:h-48">
          {target.image ? <Image src={target.image} alt={target.name} fill className="object-contain" /> : null}
        </div>
        {placedCount === target.syllables.length && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-full animate-ping rounded-[3rem] bg-emerald-100 opacity-30" />
          </div>
        )}
      </div>

      {/* Target slots */}
      <div className="flex flex-wrap gap-2 md:gap-4 justify-center items-center mt-4 min-h-[4rem]">
        {target.syllables.map((syllable, idx) => (
          <div
            key={idx}
            className={`
              flex items-center justify-center min-w-[3rem] h-12 md:min-w-[4rem] md:h-16 px-4
              rounded-2xl border-4 text-2xl md:text-4xl font-black
              ${
                idx < placedCount
                  ? "bg-emerald-50 border-emerald-400 text-emerald-600 shadow-md transform scale-105"
                  : "bg-gray-50 border-gray-200 border-dashed text-transparent"
              }
              transition-all duration-300
            `}
          >
            {idx < placedCount ? syllable : "?"}
          </div>
        ))}
      </div>

      {/* Available syllables */}
      <div className="flex flex-wrap gap-3 md:gap-6 justify-center items-center mt-8 min-h-[5rem]">
        {availableSyllables.map((syllable) => (
          <button
            key={syllable.id}
            onClick={() => handleSyllableClick(syllable)}
            className={`
              flex justify-center items-center min-w-[4rem] h-16 md:min-w-[6rem] md:h-20 px-6
              bg-white rounded-2xl border-4 border-blue-200 shadow-lg
              text-3xl md:text-5xl font-black text-blue-500
              hover:bg-blue-50 hover:scale-110 active:scale-95 transition-all
              ${wrongId === syllable.id ? "border-orange-400 text-orange-500 bg-orange-50 animate-shake" : ""}
            `}
          >
            {syllable.text}
          </button>
        ))}
      </div>
    </div>
  );
}
