"use client";

import { useState, useEffect } from "react";
import StaffDisplay from "./StaffDisplay";
import { NoteData, getGroupNotes, shuffleArray } from "./constants";
import { playNoteSound } from "@/features/games/mini-piano/utils/audioUtils";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playCorrectSound, playWrongSound } from "@/libs/utils/playSound";

interface NoteStaffQuizProps {
  groupId: string;
  onComplete: () => void;
}

const ROUNDS_TO_WIN = 5;

export default function NoteStaffQuiz({ groupId, onComplete }: NoteStaffQuizProps) {
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

    // Create 4 options
    const otherNotes = notes.filter((n) => n.note !== target.note);
    const shuffledOthers = shuffleArray(otherNotes).slice(0, 3);
    const allOptions = shuffleArray([target, ...shuffledOthers]);
    setOptions(allOptions);

    setTimeout(() => {
      speak("Nốt trên khuông nhạc là nốt gì?");
    }, 300);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleSelect = (note: NoteData) => {
    if (feedback === "correct") return;

    setSelectedNote(note.note);
    playNoteSound(note.freq);

    if (note.note === targetNote?.note) {
      setFeedback("correct");
      playCorrectSound();
      speak(`Đúng rồi! Đó là nốt ${note.label}!`);

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
      setTimeout(() => {
        setFeedback(null);
        setSelectedNote(null);
      }, 1000);
    }
  };

  if (!targetNote) return null;

  return (
    <div className="w-full flex flex-col items-center">
      {/* Title */}
      <h2 className="text-2xl sm:text-4xl font-black text-purple-600 mb-3 sm:mb-4">Nốt Nào Đúng? 🎼</h2>

      {/* Score */}
      <div className="bg-white px-4 sm:px-8 py-2 sm:py-4 rounded-2xl sm:rounded-3xl shadow-lg border-2 sm:border-4 border-purple-200 mb-6 sm:mb-10">
        <span className="text-lg sm:text-2xl font-bold text-purple-800">
          Điểm: {score}/{ROUNDS_TO_WIN}
        </span>
      </div>

      {/* Staff display showing the note without label */}
      <div className="bg-gradient-to-b from-purple-50 to-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-purple-100 mb-6 sm:mb-10">
        <StaffDisplay note={targetNote} showLabel={false} size="lg" clickNote={() => playNoteSound(targetNote.freq)} />
        <p className="text-center text-purple-400 text-sm mt-3">Đây là nốt gì?</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3 sm:gap-5 w-full max-w-md">
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
                relative py-3 sm:py-5 px-4 sm:px-6 rounded-2xl sm:rounded-3xl border-4 transition-all duration-300
                flex items-center justify-center gap-2 sm:gap-3 font-black text-lg sm:text-2xl
                ${
                  showCorrect
                    ? "border-green-400 bg-green-50 scale-105 ring-4 ring-green-300"
                    : showWrong
                      ? "border-red-400 bg-red-50 scale-95"
                      : "border-gray-200 bg-white hover:border-purple-300 hover:scale-105 active:scale-95 shadow-lg"
                }
              `}
            >
              <span className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full ${note.color}`} />
              <span className={showCorrect ? "text-green-600" : showWrong ? "text-red-500" : "text-gray-700"}>
                {note.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
