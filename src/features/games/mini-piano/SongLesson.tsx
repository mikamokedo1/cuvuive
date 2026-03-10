"use client";

import { useState, useEffect } from "react";
import PianoKey from "./PianoKey";
import { PIANO_NOTES, SONGS } from "./constants";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playWrongSound } from "@/libs/utils/playSound";

interface SongLessonProps {
  songId: string;
  onComplete: () => void;
}

export default function SongLesson({ songId, onComplete }: SongLessonProps) {
  const song = (SONGS as any)[songId];
  const [currentIndex, setCurrentIndex] = useState(0);
  const { speak } = useTextToSpeech();

  useEffect(() => {
    if (song) {
      speak(`Hãy chơi bài hát ${song.title}`);
    }
  }, [song, speak]);

  const handleKeyTap = (note: string) => {
    if (note === song.notes[currentIndex]) {
      if (currentIndex === song.notes.length - 1) {
        playWinEffect(500);
        setTimeout(() => {
          onComplete();
        }, 1000);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    } else {
      playWrongSound();
    }
  };

  return (
    <div className="w-full">
      <div className="mb-4 sm:mb-8 text-center bg-white/60 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-xl border border-white">
        <h2 className="text-2xl sm:text-3xl font-bold text-purple-700 mb-1 sm:mb-2">{song.title}</h2>
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-4">
          {song.notes.map((n: string, i: number) => (
            <div
              key={i}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base text-white transition-all
                ${i < currentIndex ? "bg-green-500 scale-90" : i === currentIndex ? "bg-purple-600 scale-110 ring-4 ring-purple-200" : "bg-gray-300"}
              `}
            >
              {PIANO_NOTES.find((pn) => pn.note === n)?.label}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#4a4a4a] p-2 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl border-t-[6px] sm:border-t-[10px] border-[#333]">
        <div className="flex justify-center gap-0.5 sm:gap-2">
          {PIANO_NOTES.map((note) => (
            <PianoKey
              key={note.note}
              {...note}
              isHighlighted={note.note === song.notes[currentIndex]}
              onClick={handleKeyTap}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
