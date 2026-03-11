"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { getMaze, MazeData, MazeCell } from "./constants";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { playButtonSound, playSound, playWrongSound } from "@/libs/utils/playSound";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
const phoMaiImg = "https://assets.cuthongminh.com/games/maze-runner/pho_mai.webp";

interface MazeBoardProps {
  groupId: string;
  onComplete: () => void;
}

type Direction = "up" | "down" | "left" | "right";

export function MazeBoard({ groupId, onComplete }: MazeBoardProps) {
  const { speak } = useTextToSpeech();
  const [score, setScore] = useState(0);
  const [maze, setMaze] = useState<MazeData | null>(null);
  const [playerPos, setPlayerPos] = useState<[number, number]>([0, 0]);
  const [won, setWon] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const hintTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [showHint, setShowHint] = useState(false);
  const mazeRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const requiredWins = 5;

  const loadMaze = useCallback(
    (index: number) => {
      const m = getMaze(groupId, index);
      setMaze(m);
      setPlayerPos([...m.start]);
      setWon(false);
      setMoveCount(0);
      setShowHint(false);

      if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
      hintTimeoutRef.current = setTimeout(() => setShowHint(true), 8000);

      setTimeout(() => {
        speak(index === 0 ? "Hãy tìm đường đến miếng phô mai nhé!" : "Tiếp tục nào!");
      }, 500);
    },
    [groupId, speak],
  );

  useEffect(() => {
    loadMaze(0);
    return () => {
      if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId]);

  const canMove = useCallback(
    (dir: Direction): boolean => {
      if (!maze || won) return false;
      const [r, c] = playerPos;
      const cell = maze.grid[r][c];

      switch (dir) {
        case "up":
          return !cell.top && r > 0;
        case "down":
          return !cell.bottom && r < maze.rows - 1;
        case "left":
          return !cell.left && c > 0;
        case "right":
          return !cell.right && c < maze.cols - 1;
      }
    },
    [maze, playerPos, won],
  );

  const move = useCallback(
    (dir: Direction) => {
      if (!canMove(dir) || !maze) {
        playWrongSound();
        return;
      }

      playButtonSound();

      if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
      setShowHint(false);

      const [r, c] = playerPos;
      let newR = r,
        newC = c;

      switch (dir) {
        case "up":
          newR = r - 1;
          break;
        case "down":
          newR = r + 1;
          break;
        case "left":
          newC = c - 1;
          break;
        case "right":
          newC = c + 1;
          break;
      }

      setPlayerPos([newR, newC]);
      setMoveCount((prev) => prev + 1);

      // Check win
      if (newR === maze.goal[0] && newC === maze.goal[1]) {
        setWon(true);
        speak("Đúng rồi! Giỏi lắm!");
        playWinEffect(500);

        setTimeout(() => {
          const newScore = score + 1;
          setScore(newScore);
          if (newScore >= requiredWins) {
            onComplete();
          } else {
            loadMaze(newScore);
          }
        }, 1800);
      } else {
        // Reset hint timer
        hintTimeoutRef.current = setTimeout(() => setShowHint(true), 8000);
      }
    },
    [canMove, maze, playerPos, score, requiredWins, onComplete, loadMaze, speak],
  );

  // Swipe support
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchStartRef.current.x;
      const dy = touch.clientY - touchStartRef.current.y;
      touchStartRef.current = null;

      const minSwipe = 30;
      if (Math.abs(dx) < minSwipe && Math.abs(dy) < minSwipe) return;

      if (Math.abs(dx) > Math.abs(dy)) {
        move(dx > 0 ? "right" : "left");
      } else {
        move(dy > 0 ? "down" : "up");
      }
    },
    [move],
  );

  // Keyboard support
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          move("up");
          break;
        case "ArrowDown":
          move("down");
          break;
        case "ArrowLeft":
          move("left");
          break;
        case "ArrowRight":
          move("right");
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [move]);

  if (!maze) return <div>Loading...</div>;

  const cellSize = maze.cols <= 5 ? 56 : maze.cols <= 6 ? 48 : 42;
  const wallWidth = 3;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg px-4">
      {/* Maze Grid */}
      <div
        ref={mazeRef}
        className="bg-white/90 rounded-3xl shadow-xl border-4 border-white p-4 backdrop-blur-sm touch-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="relative"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${maze.cols}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${maze.rows}, ${cellSize}px)`,
          }}
        >
          {maze.grid.map((row, r) =>
            row.map((cell, c) => {
              const isPlayer = playerPos[0] === r && playerPos[1] === c;
              const isGoal = maze.goal[0] === r && maze.goal[1] === c;
              const isStart = maze.start[0] === r && maze.start[1] === c;

              return (
                <div
                  key={`${r}-${c}`}
                  className="relative"
                  style={{
                    width: cellSize,
                    height: cellSize,
                    borderTop: cell.top ? `${wallWidth}px solid #4338ca` : `${wallWidth}px solid transparent`,
                    borderRight: cell.right ? `${wallWidth}px solid #4338ca` : `${wallWidth}px solid transparent`,
                    borderBottom: cell.bottom ? `${wallWidth}px solid #4338ca` : `${wallWidth}px solid transparent`,
                    borderLeft: cell.left ? `${wallWidth}px solid #4338ca` : `${wallWidth}px solid transparent`,
                    backgroundColor: isStart && !isPlayer ? "#e0f2fe" : isGoal ? "#fef9c3" : "#f8fafc",
                  }}
                >
                  {/* Goal cheese */}
                  {isGoal && !isPlayer && (
                    <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                      <Image width={32} height={32} src={phoMaiImg} alt="Phô mai" className="w-8 h-8 object-contain drop-shadow-sm" />
                    </div>
                  )}

                  {/* Player character */}
                  {isPlayer && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 transition-all duration-300">
                      <div
                        className={`text-2xl ${won ? "animate-bounce scale-125" : ""}`}
                        role="img"
                        aria-label="player"
                      >
                        🐭
                      </div>
                    </div>
                  )}
                </div>
              );
            }),
          )}
        </div>
      </div>

      {/* Direction buttons */}
      <div className="grid grid-cols-3 gap-2 w-fit">
        {/* Top row – up */}
        <div />
        <DirectionButton dir="up" canMove={canMove("up")} onClick={() => move("up")} highlight={showHint} won={won}>
          <ArrowUp className="w-8 h-8" />
        </DirectionButton>
        <div />

        {/* Middle row – left, down, right */}
        <DirectionButton
          dir="left"
          canMove={canMove("left")}
          onClick={() => move("left")}
          highlight={showHint}
          won={won}
        >
          <ArrowLeft className="w-8 h-8" />
        </DirectionButton>
        <DirectionButton
          dir="down"
          canMove={canMove("down")}
          onClick={() => move("down")}
          highlight={showHint}
          won={won}
        >
          <ArrowDown className="w-8 h-8" />
        </DirectionButton>
        <DirectionButton
          dir="right"
          canMove={canMove("right")}
          onClick={() => move("right")}
          highlight={showHint}
          won={won}
        >
          <ArrowRight className="w-8 h-8" />
        </DirectionButton>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// Direction Button
// ═══════════════════════════════════════════

function DirectionButton({
  dir,
  canMove,
  onClick,
  children,
  highlight,
  won,
}: {
  dir: Direction;
  canMove: boolean;
  onClick: () => void;
  children: React.ReactNode;
  highlight: boolean;
  won: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={!canMove || won}
      className={`
        w-16 h-16 rounded-2xl flex items-center justify-center
        border-3 shadow-lg transition-all duration-200
        active:scale-90 cursor-pointer
        ${
          canMove && !won
            ? "bg-indigo-500 border-indigo-600 text-white hover:bg-indigo-600 hover:scale-105"
            : "bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed"
        }
        ${highlight && canMove ? "animate-pulse ring-4 ring-yellow-300" : ""}
      `}
    >
      {children}
    </button>
  );
}
