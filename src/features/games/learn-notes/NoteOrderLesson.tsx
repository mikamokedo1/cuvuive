"use client";

import { useState, useEffect } from "react";
import StaffDisplay from "./StaffDisplay";
import { NoteData, getGroupNotes, shuffleArray } from "./constants";
import { playNoteSound } from "@/features/games/mini-piano/utils/audioUtils";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playCorrectSound, playWrongSound } from "@/libs/utils/playSound";

interface NoteOrderLessonProps {
  groupId: string;
  onComplete: () => void;
}

const ROUNDS_TO_WIN = 5;

/**
 * "Fill the Gap" lesson — a sequence of notes is shown with one missing.
 * The child picks the correct note to fill the gap.
 * Example: Đồ — ? — Mi — Fa → answer: Rê
 */
export default function NoteOrderLesson({ groupId, onComplete }: NoteOrderLessonProps) {
  const notes = getGroupNotes(groupId);
  const [sequence, setSequence] = useState<(NoteData | null)[]>([]);
  const [missingNote, setMissingNote] = useState<NoteData | null>(null);
  const [options, setOptions] = useState<NoteData[]>([]);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const { speak } = useTextToSpeech();

  const generateQuestion = () => {
    setFeedback(null);
    setSelectedNote(null);

    // Pick a random contiguous subsequence of 3-4 notes
    const seqLength = Math.min(3 + Math.floor(score / 2), notes.length); // increase length as score grows
    const maxStart = notes.length - seqLength;
    const startIdx = Math.floor(Math.random() * (maxStart + 1));
    const subSequence = notes.slice(startIdx, startIdx + seqLength);

    // Remove one random note from the subsequence
    const gapIdx = Math.floor(Math.random() * subSequence.length);
    const missing = subSequence[gapIdx];
    setMissingNote(missing);

    // Build display sequence with null for the gap
    const displaySeq = subSequence.map((n, i) => (i === gapIdx ? null : n));
    setSequence(displaySeq);

    // Build 3-4 options including the correct answer
    const otherNotes = notes.filter((n) => n.note !== missing.note);
    const wrongOptions = shuffleArray(otherNotes).slice(0, 3);
    setOptions(shuffleArray([missing, ...wrongOptions]));

    setTimeout(() => {
      speak("Nốt nào đang bị thiếu?");
    }, 300);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleSelect = (note: NoteData) => {
    if (feedback === "correct") return;

    setSelectedNote(note.note);
    playNoteSound(note.freq);

    if (note.note === missingNote?.note) {
      setFeedback("correct");
      playCorrectSound();
      speak(`Đúng rồi! Nốt ${note.label}!`);

      // Play the full sequence after correct answer
      setTimeout(() => {
        const fullSeq = sequence.map((n) => (n === null ? note : n));
        fullSeq.forEach((n, i) => {
          setTimeout(() => playNoteSound(n!.freq), i * 400);
        });
      }, 1500);

      setTimeout(() => {
        const newScore = score + 1;
        setScore(newScore);
        if (newScore >= ROUNDS_TO_WIN) {
          onComplete();
        } else {
          generateQuestion();
        }
      }, 3000);
    } else {
      setFeedback("wrong");
      playWrongSound();
      setTimeout(() => {
        setFeedback(null);
        setSelectedNote(null);
      }, 800);
    }
  };

  if (!missingNote) return null;

  return (
    <div className="w-full flex flex-col items-center">
      {/* Title */}
      <h2 className="text-2xl sm:text-4xl font-black text-orange-600 mb-3 sm:mb-4">Điền Nốt Thiếu 🎶</h2>

      {/* Score */}
      <div className="bg-white px-4 sm:px-8 py-2 sm:py-4 rounded-2xl sm:rounded-3xl shadow-lg border-2 sm:border-4 border-orange-200 mb-6 sm:mb-8">
        <span className="text-lg sm:text-2xl font-bold text-orange-800">
          Điểm: {score}/{ROUNDS_TO_WIN}
        </span>
      </div>

      {/* Sequence display */}
      <div className="flex items-center gap-2 sm:gap-4 mb-8 sm:mb-10 flex-wrap justify-center">
        {sequence.map((note, i) => (
          <div key={i} className="flex items-center gap-1 sm:gap-2">
            {note ? (
              <div className="transition-all duration-300">
                <StaffDisplay
                  clickNote={() => playNoteSound(note.freq)}
                  note={note}
                  showLabel={true}
                  animated={false}
                  size="sm"
                />
              </div>
            ) : (
              /* The gap — shown as a question mark card */
              <div
                className={`
                  w-[160px] h-[155px] sm:w-[160px] sm:h-[155px] rounded-2xl border-4 border-dashed flex flex-col items-center justify-center
                  transition-all duration-500
                  ${
                    feedback === "correct"
                      ? "border-green-400 bg-green-50"
                      : "border-orange-400 bg-orange-50 animate-pulse"
                  }
                `}
              >
                {feedback === "correct" && missingNote ? (
                  <StaffDisplay note={missingNote} showLabel={true} animated={true} size="sm" />
                ) : (
                  <>
                    <span className="text-4xl sm:text-5xl font-black text-orange-400">?</span>
                    <span className="text-xs sm:text-sm text-orange-400 font-bold mt-1">Nốt gì?</span>
                  </>
                )}
              </div>
            )}

            {/* Arrow between notes */}
            {i < sequence.length - 1 && (
              <span className="text-gray-300 text-xl sm:text-2xl font-bold hidden sm:block">→</span>
            )}
          </div>
        ))}
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-md">
        {options.map((note) => {
          const isSelected = selectedNote === note.note;
          const isCorrectAnswer = note.note === missingNote.note;
          const showCorrect = feedback === "correct" && isCorrectAnswer;
          const showWrong = feedback === "wrong" && isSelected;

          return (
            <button
              key={note.note}
              onClick={() => handleSelect(note)}
              disabled={feedback === "correct"}
              className={`
                py-3 sm:py-4 px-4 sm:px-6 rounded-2xl sm:rounded-3xl border-4 transition-all duration-300
                flex items-center justify-center gap-2 sm:gap-3 font-black text-lg sm:text-2xl
                ${
                  showCorrect
                    ? "border-green-400 bg-green-50 scale-105 ring-4 ring-green-300"
                    : showWrong
                      ? "border-red-400 bg-red-50 scale-95"
                      : "border-gray-200 bg-white hover:border-orange-300 hover:scale-105 active:scale-95 shadow-lg"
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
