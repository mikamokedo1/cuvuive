"use client";

import { useState, useEffect } from "react";
import StaffDisplay from "./StaffDisplay";
import { NoteData, getGroupNotes, shuffleArray } from "./constants";
import { playNoteSound } from "@/features/games/mini-piano/utils/audioUtils";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playCorrectSound, playWrongSound } from "@/libs/utils/playSound";
import { Volume2 } from "lucide-react";

interface NoteListenQuizProps {
  groupId: string;
  onComplete: () => void;
}

const ROUNDS_TO_WIN = 5;

export default function NoteListenQuiz({ groupId, onComplete }: NoteListenQuizProps) {
  const notes = getGroupNotes(groupId);
  const [targetNote, setTargetNote] = useState<NoteData | null>(null);
  const [options, setOptions] = useState<NoteData[]>([]);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const { speak } = useTextToSpeech();

  const generateQuestion = () => {
    const target = notes[Math.floor(Math.random() * notes.length)];
    setTargetNote(target);
    setFeedback(null);
    setSelectedNote(null);

    // Create 4 options including the correct answer
    const otherNotes = notes.filter((n) => n.note !== target.note);
    const shuffledOthers = shuffleArray(otherNotes).slice(0, 3);
    const allOptions = shuffleArray([target, ...shuffledOthers]);
    setOptions(allOptions);

    // Play the note sound after a brief delay
    setTimeout(() => {
      speak("Nghe nốt nhạc và chọn đáp án đúng nào!");
      setTimeout(() => playNoteSound(target.freq), 2000);
    }, 300);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleSelect = (note: NoteData) => {
    if (feedback === "correct") return;

    setSelectedNote(note.note);

    if (note.note === targetNote?.note) {
      setFeedback("correct");
      playCorrectSound();
      speak(`Giỏi lắm! Đó là nốt ${note.label}!`);

      setTimeout(() => {
        const newScore = score + 1;
        setScore(newScore);
        if (newScore >= ROUNDS_TO_WIN) {
          onComplete();
        } else {
          generateQuestion();
        }
      }, 2000);
    } else {
      setFeedback("wrong");
      playWrongSound();
      speak("Chưa đúng, thử lại nhé!");
      setTimeout(() => {
        setFeedback(null);
        setSelectedNote(null);
      }, 1000);
    }
  };

  const replayNote = () => {
    if (targetNote) {
      playNoteSound(targetNote.freq);
    }
  };

  if (!targetNote) return null;

  return (
    <div className="w-full flex flex-col items-center">
      {/* Title */}
      <h2 className="text-2xl sm:text-4xl font-black text-blue-600 mb-3 sm:mb-4">
        Nghe Và Chọn 🎧
      </h2>

      {/* Score + Replay */}
      <div className="flex justify-center items-center gap-2 sm:gap-4 mb-6 sm:mb-10">
        <div className="bg-white px-4 sm:px-8 py-2 sm:py-4 rounded-2xl sm:rounded-3xl shadow-lg border-2 sm:border-4 border-blue-200">
          <span className="text-lg sm:text-2xl font-bold text-blue-800">
            Điểm: {score}/{ROUNDS_TO_WIN}
          </span>
        </div>

        <button
          onClick={replayNote}
          className="flex items-center gap-1.5 sm:gap-2 bg-white px-4 sm:px-6 py-2 sm:py-4 rounded-2xl sm:rounded-3xl shadow-lg border-2 sm:border-4 border-blue-200 text-blue-600 transition-all hover:scale-105 active:scale-95 hover:bg-blue-50"
        >
          <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-lg sm:text-xl font-bold">Nghe lại</span>
        </button>
      </div>

      {/* Options grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-5 w-full max-w-xl">
        {options.map((note) => {
          const isSelected = selectedNote === note.note;
          const isCorrectAnswer = note.note === targetNote.note;
          const showCorrect = feedback === "correct" && isCorrectAnswer;
          const showWrong = feedback === "wrong" && isSelected;

          return (
            <button
              key={note.note}
              onClick={() => handleSelect(note)}
              disabled={feedback === "correct"}
              className={`
                relative p-3 sm:p-4 rounded-2xl sm:rounded-3xl border-4 transition-all duration-300
                flex flex-col items-center
                ${showCorrect
                  ? "border-green-400 bg-green-50 scale-105 ring-4 ring-green-300"
                  : showWrong
                    ? "border-red-400 bg-red-50 scale-95 animate-shake"
                    : "border-gray-200 bg-white hover:border-blue-300 hover:scale-105 active:scale-95 shadow-lg"
                }
              `}
            >
              <StaffDisplay note={note} showLabel={true} animated={false} size="sm" />
            </button>
          );
        })}
      </div>

      {/* Shake animation */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}

