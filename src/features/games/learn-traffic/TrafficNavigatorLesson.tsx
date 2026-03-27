"use client";

import { useState, useEffect, useCallback } from "react";
import { StreetMap, CellType } from "./constants";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { playButtonSound, playWrongSound } from "@/libs/utils/playSound";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

interface TrafficNavigatorLessonProps {
  streetMap: StreetMap;
  onComplete: () => void;
}

type Direction = "up" | "down" | "left" | "right";

const CELL_COLORS: Record<CellType, string> = {
  road: "bg-gray-400",
  sidewalk: "bg-amber-100",
  crosswalk: "bg-white border-2 border-gray-400",
  building: "bg-orange-200",
  park: "bg-green-200",
};

export function TrafficNavigatorLesson({ streetMap, onComplete }: TrafficNavigatorLessonProps) {
  const { speak } = useTextToSpeech();
  const [playerPos, setPlayerPos] = useState<[number, number]>([...streetMap.playerStart]);
  const [won, setWon] = useState(false);
  const [warning, setWarning] = useState<string | null>(null);
  const [moveCount, setMoveCount] = useState(0);
  const touchStartRef = { current: null as { x: number; y: number } | null };

  const grid = streetMap.grid;
  const rows = grid.length;
  const cols = grid[0].length;

  useEffect(() => {
    speak(`${streetMap.title}! Hãy dẫn Pé đến đích nhé!`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isSafeCell = useCallback(
    (r: number, c: number): boolean => {
      const cell = grid[r][c];
      // Can walk on sidewalk, crosswalk, park
      if (cell.type === "sidewalk" || cell.type === "crosswalk" || cell.type === "park") return true;
      // Can walk on road if it has green light
      if (cell.type === "road" && cell.trafficLight === "green") return true;
      // Regular road — show warning but allow
      if (cell.type === "road") return true;
      // Buildings — can't walk
      if (cell.type === "building") return false;
      return true;
    },
    [grid],
  );

  const checkViolation = useCallback(
    (r: number, c: number): string | null => {
      const cell = grid[r][c];
      if (cell.trafficLight === "red") return "Đèn đỏ! Phải dừng lại, không được đi!";
      if (cell.hasSign === "stop") return "Biển STOP! Phải dừng lại nhìn kỹ!";
      if (cell.type === "building") return "Đây là tòa nhà, không đi được!";
      return null;
    },
    [grid],
  );

  const move = useCallback(
    (dir: Direction) => {
      if (won) return;

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

      // Bounds check
      if (newR < 0 || newR >= rows || newC < 0 || newC >= cols) {
        playWrongSound();
        return;
      }

      const violation = checkViolation(newR, newC);
      if (violation) {
        playWrongSound();
        setWarning(violation);
        speak(violation);
        setTimeout(() => setWarning(null), 2000);
        return;
      }

      if (!isSafeCell(newR, newC)) {
        playWrongSound();
        return;
      }

      playButtonSound();
      setPlayerPos([newR, newC]);
      setMoveCount((prev) => prev + 1);

      // Check win
      if (newR === streetMap.goal[0] && newC === streetMap.goal[1]) {
        setWon(true);
        speak("Tuyệt vời! Pé đã đến đích an toàn!");
        playWinEffect(500);
        setTimeout(() => {
          onComplete();
        }, 2500);
      }
    },
    [won, playerPos, rows, cols, checkViolation, isSafeCell, speak, streetMap.goal, onComplete],
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

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
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
  };

  const cellSize = 56;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg px-4">
      {/* Warning banner */}
      {warning && (
        <div className="w-full bg-red-100 border-2 border-red-400 rounded-xl p-3 text-center text-red-700 font-bold animate-shake">
          ⚠️ {warning}
        </div>
      )}

      {/* Grid */}
      <div
        className="bg-white/90 rounded-3xl shadow-xl border-4 border-white p-4 backdrop-blur-sm touch-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="relative"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
          }}
        >
          {grid.map((row, r) =>
            row.map((cell, c) => {
              const isPlayer = playerPos[0] === r && playerPos[1] === c;
              const isGoal = streetMap.goal[0] === r && streetMap.goal[1] === c;

              return (
                <div
                  key={`${r}-${c}`}
                  className={`relative flex items-center justify-center ${CELL_COLORS[cell.type]} border border-gray-200`}
                  style={{ width: cellSize, height: cellSize }}
                >
                  {/* Cell content */}
                  {cell.emoji && !isPlayer && <span className="text-xl">{cell.emoji}</span>}

                  {/* Traffic light */}
                  {cell.trafficLight && (
                    <span className={`absolute top-0.5 right-0.5 text-sm ${cell.trafficLight === "red" ? "" : ""}`}>
                      {cell.trafficLight === "red" ? "🔴" : "🟢"}
                    </span>
                  )}

                  {/* Stop sign */}
                  {cell.hasSign === "stop" && <span className="absolute top-0.5 left-0.5 text-xs">🛑</span>}

                  {/* Crosswalk stripes */}
                  {cell.type === "crosswalk" && !isPlayer && (
                    <div className="absolute inset-1 flex flex-col justify-evenly">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-1 bg-gray-300 rounded" />
                      ))}
                    </div>
                  )}

                  {/* Goal */}
                  {isGoal && !isPlayer && (
                    <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                      <span className="text-2xl">🏫</span>
                    </div>
                  )}

                  {/* Player */}
                  {isPlayer && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 transition-all duration-300">
                      <div className={`text-2xl ${won ? "animate-bounce scale-125" : ""}`}>🧒</div>
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
        <div />
        <DirButton onClick={() => move("up")} won={won}>
          <ArrowUp className="w-8 h-8" />
        </DirButton>
        <div />
        <DirButton onClick={() => move("left")} won={won}>
          <ArrowLeft className="w-8 h-8" />
        </DirButton>
        <DirButton onClick={() => move("down")} won={won}>
          <ArrowDown className="w-8 h-8" />
        </DirButton>
        <DirButton onClick={() => move("right")} won={won}>
          <ArrowRight className="w-8 h-8" />
        </DirButton>
      </div>
    </div>
  );
}

function DirButton({ onClick, children, won }: { onClick: () => void; children: React.ReactNode; won: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={won}
      className={`
        w-16 h-16 rounded-2xl flex items-center justify-center
        border-3 shadow-lg transition-all duration-200
        active:scale-90 cursor-pointer
        ${
          won
            ? "bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed"
            : "bg-indigo-500 border-indigo-600 text-white hover:bg-indigo-600 hover:scale-105"
        }
      `}
    >
      {children}
    </button>
  );
}
