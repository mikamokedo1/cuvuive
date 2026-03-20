"use client";

import { useState } from "react";
import StaffDisplay from "./StaffDisplay";
import { NoteData, getGroupNotes } from "./constants";
import { playNoteSound } from "@/features/games/mini-piano/utils/audioUtils";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { Volume2 } from "lucide-react";
import { BackLessonButton } from "@/components/games/BackLessonButton";
import { NextLessonButton } from "@/components/games/NextLessonButton";

interface NoteLearnLessonProps {
  groupId: string;
  onComplete: () => void;
}

export default function NoteLearnLesson({ groupId, onComplete }: NoteLearnLessonProps) {
  const notes = getGroupNotes(groupId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { speak } = useTextToSpeech();
  const [isAnimating, setIsAnimating] = useState(false);

  const currentNote = notes[currentIndex];
  const isLast = currentIndex === notes.length - 1;
  const isFirst = currentIndex === 0;

  const playCurrentNote = (note: NoteData) => {
    speak(`Đây là nốt ${note.label} ký hiệu chữ ${note.note}`);
    setTimeout(() => playNoteSound(note.freq), 4000);
  };

  const handleNext = () => {
    if (isLast) {
      onComplete();
      return;
    }
    setIsAnimating(true);
    setTimeout(() => {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setIsAnimating(false);
      playCurrentNote(notes[nextIndex]);
    }, 200);
  };

  const handlePrev = () => {
    if (isFirst) return;
    setIsAnimating(true);
    setTimeout(() => {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setIsAnimating(false);
      playCurrentNote(notes[prevIndex]);
    }, 200);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Title */}
      <h2 className="text-2xl sm:text-4xl font-black text-green-600 mb-2 sm:mb-4">Học Nốt Nhạc 🎵</h2>

      {/* Note Card */}
      <div
        className={`bg-white rounded-3xl shadow-2xl border-4 p-6 sm:p-10 flex flex-col items-center cursor-pointer
          transition-all duration-300 hover:shadow-3xl active:scale-[0.98]
          ${isAnimating ? "opacity-0 scale-90" : "opacity-100 scale-100"}
          border-${currentNote.color.replace("bg-", "")}/30`}
      >
        {/* Staff */}
        <StaffDisplay
          note={currentNote}
          size="lg"
          onClickLabel={playCurrentNote}
          clickNote={() => playNoteSound(currentNote.freq)}
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-6 mt-8 sm:mt-12">
        <BackLessonButton onClick={handlePrev} disabled={isFirst} />
        <NextLessonButton onClick={handleNext} isLast={isLast} />
      </div>
    </div>
  );
}
