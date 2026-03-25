"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { generateSudokuPuzzle, getLessonConfig, SudokuPuzzle } from "./constants";
import { SudokuCell } from "./SudokuCell";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { playButtonSound, playWrongSound } from "@/libs/utils/playSound";
import { FeedbackType } from "@/types/game";

interface SudokuBoardProps {
  groupId: string;
  lessonId: string;
  onComplete: () => void;
}

export function SudokuBoard({ groupId, lessonId, onComplete }: SudokuBoardProps) {
  const { speak } = useTextToSpeech();
  const config = getLessonConfig(groupId, lessonId);

  const [puzzle, setPuzzle] = useState<SudokuPuzzle | null>(null);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [feedbackCell, setFeedbackCell] = useState<{ row: number; col: number } | null>(null);
  const [score, setScore] = useState(0);
  const [currentBlankIdx, setCurrentBlankIdx] = useState(0);
  const hintTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const preparePuzzle = useCallback(() => {
    const newPuzzle = generateSudokuPuzzle(config.size, config.blanks, config.emojiSet);
    setPuzzle(newPuzzle);
    setSelectedCell(null);
    setFeedback(null);
    setFeedbackCell(null);
    setCurrentBlankIdx(0);

    // Auto-select first blank cell
    if (newPuzzle.answers.length > 0) {
      const first = newPuzzle.answers[0];
      setTimeout(() => {
        setSelectedCell({ row: first.row, col: first.col });
      }, 300);
    }
  }, [config.size, config.blanks, config.emojiSet]);

  useEffect(() => {
    preparePuzzle();
    setTimeout(() => {
      speak(score === 0 ? "Pé hãy điền hình vào ô trống nhé!" : "Tiếp tục nào!");
    }, 500);

    return () => {
      if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId, lessonId]);

  const handleCellClick = (row: number, col: number) => {
    if (!puzzle) return;
    const cell = puzzle.grid[row][col];
    if (cell.isGiven || cell.value !== null) return;
    if (feedback === "correct") return;

    playButtonSound();
    setSelectedCell({ row, col });
  };

  const handleAnswerSelect = (emoji: string) => {
    if (!puzzle || !selectedCell || feedback === "correct") return;

    const currentAnswer = puzzle.answers[currentBlankIdx];
    if (!currentAnswer) return;

    // Only allow filling the current blank
    if (selectedCell.row !== currentAnswer.row || selectedCell.col !== currentAnswer.col) {
      // User clicked a different blank — guide them
      speak("Hãy điền ô đang nhấp nháy nhé!");
      return;
    }

    if (emoji === currentAnswer.value) {
      // ✅ Correct
      playButtonSound();
      setFeedback("correct");
      setFeedbackCell({ ...selectedCell });

      // Fill the cell
      const newGrid = puzzle.grid.map((row) => row.map((cell) => ({ ...cell })));
      newGrid[selectedCell.row][selectedCell.col] = { value: emoji, isGiven: false };
      setPuzzle({ ...puzzle, grid: newGrid });

      const nextBlankIdx = currentBlankIdx + 1;

      if (nextBlankIdx < puzzle.answers.length) {
        // More blanks to fill in this puzzle
        speak("Đúng rồi!");
        setTimeout(() => {
          setCurrentBlankIdx(nextBlankIdx);
          const next = puzzle.answers[nextBlankIdx];
          setSelectedCell({ row: next.row, col: next.col });
          setFeedback(null);
          setFeedbackCell(null);
        }, 1000);
      } else {
        // All blanks filled — puzzle complete
        speak("Giỏi lắm!");
        playWinEffect(500);

        setTimeout(() => {
          const newScore = score + 1;
          setScore(newScore);
          if (newScore >= config.rounds) {
            onComplete();
          } else {
            setFeedback(null);
            setFeedbackCell(null);
            preparePuzzle();
            setTimeout(() => speak("Tiếp tục nào!"), 300);
          }
        }, 1500);
      }
    } else {
      // ❌ Wrong
      playWrongSound();
      speak("Chưa đúng, thử lại nhé!");
      setFeedback("wrong");
      setFeedbackCell({ ...selectedCell });
      setTimeout(() => {
        setFeedback(null);
        setFeedbackCell(null);
      }, 800);
    }
  };

  if (!puzzle) return <div>Loading...</div>;

  // Available emoji options (all symbols used in this puzzle)
  const availableEmojis = config.emojiSet.slice(0, config.size);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl px-4">
      {/* Sudoku Grid */}
      <div className="bg-white/90 rounded-[2rem] shadow-xl border-4 border-amber-200 p-4 sm:p-6 md:p-8 backdrop-blur-sm">
        <div
          className="grid gap-2 sm:gap-3 md:gap-4 place-items-center"
          style={{
            gridTemplateColumns: `repeat(${puzzle.size}, 1fr)`,
          }}
        >
          {puzzle.grid.map((row, r) =>
            row.map((cell, c) => {
              const isSelected = selectedCell?.row === r && selectedCell?.col === c;
              const isFeedbackCell = feedbackCell?.row === r && feedbackCell?.col === c;
              const cellFeedback: boolean | null = isFeedbackCell
                ? feedback === "correct"
                  ? true
                  : feedback === "wrong"
                    ? false
                    : null
                : null;

              return (
                <SudokuCell
                  key={`${r}-${c}`}
                  cell={cell}
                  size={puzzle.size}
                  isSelected={isSelected}
                  isCorrect={cellFeedback}
                  onClick={() => handleCellClick(r, c)}
                />
              );
            }),
          )}
        </div>
      </div>

      {/* Answer Options */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-lg font-bold text-gray-600">Chọn đáp án:</p>
        <div className="flex gap-3 sm:gap-4">
          {availableEmojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleAnswerSelect(emoji)}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24
                bg-white rounded-2xl border-3 border-purple-200
                shadow-lg hover:shadow-xl
                flex items-center justify-center
                text-3xl sm:text-4xl md:text-5xl
                transition-all duration-200 hover:scale-110 active:scale-95
                cursor-pointer hover:border-purple-400 hover:bg-purple-50"
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
