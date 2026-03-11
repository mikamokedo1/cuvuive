"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { LINE_CONNECT_LEVELS, LineConnectLevel, generateLineConnectLevel } from "./constants";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { playButtonSound, playCorrectSound, playWrongSound } from "@/libs/utils/playSound";

interface LineConnectBoardProps {
  onComplete: () => void;
  lessonId: string;
}

type Point = [number, number]; // [r, c]

export function LineConnectBoard({ onComplete, lessonId }: LineConnectBoardProps) {
  const { speak } = useTextToSpeech();
  const [levelIndex, setLevelIndex] = useState(0);
  const [level, setLevel] = useState<LineConnectLevel | null>(null);
  const [lines, setLines] = useState<{ [color: string]: Point[] }>({});
  const [drawingColor, setDrawingColor] = useState<string | null>(null);
  const [isWinning, setIsWinning] = useState(false);
  const [currentLine, setCurrentLine] = useState<Point[]>([]);
  const boardRef = useRef<HTMLDivElement>(null);

  const getDifficulty = useCallback((index: number) => {
    if (index < 3) return { rows: 4, cols: 4, dots: 3 + Math.floor(index / 1.5) };
    if (index < 6) return { rows: 5, cols: 5, dots: 4 + (index % 2) };
    if (index < 10) return { rows: 6, cols: 6, dots: 5 + Math.floor((index - 6) / 2) };
    if (index < 15) return { rows: 7, cols: 7, dots: 6 + Math.floor((index - 10) / 2) };
    return { rows: 8, cols: 8, dots: 7 + Math.min(3, Math.floor((index - 15) / 3)) };
  }, []);

  useEffect(() => {
    const lessonOffset = lessonId === "lesson1" ? 0 : lessonId === "lesson2" ? 6 : 10;
    const effectiveIndex = levelIndex + lessonOffset;
    
    const diff = getDifficulty(effectiveIndex);
    const newLevel = generateLineConnectLevel(diff.rows, diff.cols, diff.dots);
    setLevel(newLevel);
    setLines({});
    setDrawingColor(null);
    setCurrentLine([]);
    setIsWinning(false);
    
    const introText = levelIndex === 0 
      ? (lessonId === "lesson1" ? "Hãy nối các cặp màu giống nhau nhé!" : "Thử thách khó hơn cho bạn đây!")
      : "Tiếp tục nào!";
    speak(introText);
  }, [levelIndex, lessonId, speak, getDifficulty]);

  const getCellFromEvent = (e: React.PointerEvent | PointerEvent) => {
    if (!boardRef.current || !level) return null;
    const rect = boardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cellSize = rect.width / level.cols;
    const c = Math.floor(x / cellSize);
    const r = Math.floor(y / cellSize);
    if (r >= 0 && r < level.rows && c >= 0 && c < level.cols) {
      return [r, c] as Point;
    }
    return null;
  };

  const isDotAt = (r: number, c: number) => {
    if (!level) return null;
    return level.dots.find((d) => d.positions.some((p) => p[0] === r && p[1] === c));
  };

  const getDrawingLineColor = (r: number, c: number) => {
    const dot = isDotAt(r, c);
    return dot ? dot.color : null;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isWinning) return;
    const cell = getCellFromEvent(e);
    if (!cell) return;
    const [r, c] = cell;

    const color = getDrawingLineColor(r, c);
    if (color) {
      setDrawingColor(color);
      setCurrentLine([cell]);
      // Clear existing line of this color
      setLines((prev) => {
        const next = { ...prev };
        delete next[color];
        return next;
      });
      playButtonSound();
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!drawingColor || isWinning) return;
    const cell = getCellFromEvent(e);
    if (!cell) return;
    const [r, c] = cell;
    const last = currentLine[currentLine.length - 1];

    // If same as last, ignore
    if (last[0] === r && last[1] === c) return;

    // Check if neighbor
    const isNeighbor = Math.abs(last[0] - r) + Math.abs(last[1] - c) === 1;
    if (!isNeighbor) return;

    // Check if occupied by another color
    const occupiedColor = Object.entries(lines).find(([clr, pts]) => 
      pts.some(p => p[0] === r && p[1] === c)
    )?.[0];
    
    if (occupiedColor && occupiedColor !== drawingColor) return;

    // If it's the dot of another color
    const otherDot = level?.dots.find(d => 
      d.color !== drawingColor && d.positions.some(p => p[0] === r && p[1] === c)
    );
    if (otherDot) return;

    // Handle backtrack
    if (currentLine.length > 1) {
      const secondLast = currentLine[currentLine.length - 2];
      if (secondLast[0] === r && secondLast[1] === c) {
        setCurrentLine(prev => prev.slice(0, -1));
        return;
      }
    }

    // If hitting own line (cross/loop)
    if (currentLine.some(p => p[0] === r && p[1] === c)) {
      const idx = currentLine.findIndex(p => p[0] === r && p[1] === c);
      setCurrentLine(prev => prev.slice(0, idx + 1));
      return;
    }

    // Check if hitting the end dot of the same color
    const dot = isDotAt(r, c);
    if (dot && dot.color === drawingColor) {
      const startDot = currentLine[0];
      if (r !== startDot[0] || c !== startDot[1]) {
        const newLine = [...currentLine, cell];
        setCurrentLine(newLine);
        setLines(prev => ({ ...prev, [drawingColor]: newLine }));
        setDrawingColor(null);
        playCorrectSound();
        return;
      }
    }

    // Normal move
    setCurrentLine(prev => [...prev, cell]);
  };

  useEffect(() => {
    const onPointerUp = () => {
      setDrawingColor(null);
      setCurrentLine([]);
    };

    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  // Check win condition
  useEffect(() => {
    if (isWinning || !level) return;
    const allConnected = level.dots.every(d => lines[d.color]);
    if (allConnected && level.dots.length > 0) {
      setIsWinning(true);
      setTimeout(() => {
        if (levelIndex < LINE_CONNECT_LEVELS.length - 1) {
          setLevelIndex(prev => prev + 1);
        } else {
          playWinEffect(500);
          speak("Tuyệt vời! Bạn đã hoàn thành tất cả thử thách!");
          onComplete();
        }
      }, 1000);
    }
  }, [lines, level, levelIndex, onComplete, speak, isWinning]);

  if (!level) return <div className="text-orange-500 font-bold">Đang tạo thử thách...</div>;

  const cellSize = level.cols <= 4 ? 70 : level.cols <= 5 ? 60 : level.cols <= 6 ? 50 : 40;
  const boardWidth = level.cols * cellSize;
  const boardHeight = level.rows * cellSize;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg px-4">
      <div 
        ref={boardRef}
        className="relative bg-white/90 rounded-3xl shadow-xl border-4 border-white backdrop-blur-sm touch-none overflow-hidden"
        style={{ width: boardWidth, height: boardHeight }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      >
        {/* Grid Background */}
        <div 
          className="absolute inset-0 grid"
          style={{ 
            gridTemplateColumns: `repeat(${level.cols}, 1fr)`,
            gridTemplateRows: `repeat(${level.rows}, 1fr)`
          }}
        >
          {Array.from({ length: level.rows * level.cols }).map((_, i) => (
            <div key={i} className="border border-gray-100" />
          ))}
        </div>

        {/* Lines Overlay */}
        <svg 
          className="absolute inset-0 pointer-events-none"
          width={boardWidth}
          height={boardHeight}
        >
          {Object.entries(lines).map(([color, pts]) => (
            <polyline
              key={color}
              points={pts.map(p => `${p[1] * cellSize + cellSize/2},${p[0] * cellSize + cellSize/2}`).join(" ")}
              fill="none"
              stroke={color}
              strokeWidth={cellSize * 0.4}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.8}
            />
          ))}
          {drawingColor && currentLine.length > 0 && (
            <polyline
              points={currentLine.map(p => `${p[1] * cellSize + cellSize/2},${p[0] * cellSize + cellSize/2}`).join(" ")}
              fill="none"
              stroke={drawingColor}
              strokeWidth={cellSize * 0.4}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.6}
            />
          )}
        </svg>

        {/* Dots */}
        {level.dots.map((dot) => (
          dot.positions.map((pos, i) => (
            <div
              key={`${dot.color}-${i}`}
              className="absolute flex items-center justify-center p-1"
              style={{
                width: cellSize,
                height: cellSize,
                left: pos[1] * cellSize,
                top: pos[0] * cellSize,
              }}
            >
              <div 
                className="w-4/5 h-4/5 rounded-full shadow-inner border-4 border-white/50"
                style={{ backgroundColor: dot.color }}
              />
            </div>
          ))
        ))}
      </div>
      
      <div className="text-xl font-bold text-indigo-600 bg-white/80 px-4 py-2 rounded-full shadow-sm">
        Level {levelIndex + 1} / {LINE_CONNECT_LEVELS.length}
      </div>
    </div>
  );
}
