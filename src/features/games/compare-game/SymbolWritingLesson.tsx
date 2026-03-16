"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { SYMBOL_PATHS, SYMBOL_NAMES_VI } from "@/libs/constants/symbolPaths";
import Image from "next/image";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { playButtonSound, playSound } from "@/libs/utils/playSound";
import { NextLessonButton } from "@/components/games/NextLessonButton";
import { MAP_COMPARE_SIGN_SOUND } from "./VisualCompareLesson";
import { LoudSpeaker, Eraser as Easer, Pen } from "@/libs/constants/game-assets";

interface SymbolWritingLessonProps {
  comparisonType: "greater" | "less" | "equal";
  onComplete: () => void;
}

interface Point {
  x: number;
  y: number;
}

const TYPE_TO_SYMBOL: Record<string, string> = {
  greater: ">",
  less: "<",
  equal: "=",
};

export function SymbolWritingLesson({ comparisonType, onComplete }: SymbolWritingLessonProps) {
  const symbol = TYPE_TO_SYMBOL[comparisonType];
  const symbolData = SYMBOL_PATHS[symbol];

  const [isDrawing, setIsDrawing] = useState(false);
  const [completedStrokes, setCompletedStrokes] = useState<Point[][]>([]);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursorPos, setCursorPos] = useState<Point | null>(null);
  const [pathSamples, setPathSamples] = useState<Point[]>([]);

  // Initialize path samples when symbol changes
  useEffect(() => {
    const extractPoints = () => {
      if (!svgRef.current) return [];
      const pathElement = svgRef.current.querySelector("path[stroke-dasharray]") as SVGPathElement;
      if (!pathElement) return [];

      const points: Point[] = [];
      const totalLength = pathElement.getTotalLength();
      const step = 5;

      for (let i = 0; i <= totalLength; i += step) {
        const pt = pathElement.getPointAtLength(i);
        points.push({ x: pt.x, y: pt.y });
      }
      return points;
    };

    let points = extractPoints();
    if (points.length > 0) {
      setPathSamples(points);
    } else {
      const timer = setTimeout(() => {
        points = extractPoints();
        setPathSamples(points);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [symbol]);

  const isPointNearPath = useCallback(
    (point: Point, tolerance: number = 25): boolean => {
      if (pathSamples.length === 0) return true;

      for (const pathPoint of pathSamples) {
        const dx = point.x - pathPoint.x;
        const dy = point.y - pathPoint.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance <= tolerance) {
          return true;
        }
      }
      return false;
    },
    [pathSamples],
  );

  const getPointerPosition = useCallback((e: React.PointerEvent): Point | null => {
    if (!svgRef.current) return null;
    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 260;
    const y = ((e.clientY - rect.top) / rect.height) * 320;
    return { x, y };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isSuccess) return;
    e.preventDefault();

    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });

    const point = getPointerPosition(e);
    if (point && isPointNearPath(point)) {
      setIsDrawing(true);
      setCurrentStroke([point]);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    e.preventDefault();

    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });

    if (!isDrawing || isSuccess) return;
    const point = getPointerPosition(e);
    if (point && isPointNearPath(point)) {
      setCurrentStroke((prev) => [...prev, point]);
    }
  };

  const handlePointerUp = () => {
    if (!isDrawing || isSuccess) return;
    setIsDrawing(false);

    if (currentStroke.length > 0) {
      const newCompleted = [...completedStrokes, currentStroke];
      setCompletedStrokes(newCompleted);
      setCurrentStroke([]);
      validateDrawing(newCompleted);
    }
  };

  const handlePointerLeave = () => {
    handlePointerUp();
    setCursorPos(null);
  };

  const validateDrawing = (allStrokes: Point[][]) => {
    if (pathSamples.length === 0) return;

    const allUserPoints = allStrokes.flat();
    let coveredCount = 0;
    const coverageTolerance = 35;

    pathSamples.forEach((pathPoint) => {
      const isCovered = allUserPoints.some((userPoint) => {
        const dx = userPoint.x - pathPoint.x;
        const dy = userPoint.y - pathPoint.y;
        return dx * dx + dy * dy <= coverageTolerance * coverageTolerance;
      });
      if (isCovered) coveredCount++;
    });

    const coverageRatio = coveredCount / pathSamples.length;

    if (coverageRatio >= 0.85) {
      triggerSuccess();
    }
  };

  const triggerSuccess = () => {
    setIsSuccess(true);
    setShowSparkle(true);
    playWinEffect(500);
    setTimeout(() => setShowSparkle(false), 1500);
  };

  const clearDrawing = () => {
    playButtonSound();
    setCompletedStrokes([]);
    setCurrentStroke([]);
    setIsSuccess(false);
  };

  const handleComplete = () => {
    onComplete();
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md px-4 scale-90 sm:scale-100 origin-top">
      {/* Writing Card */}
      <div
        className={`relative bg-white rounded-3xl shadow-xl border-4 border-blue-100 overflow-hidden transition-transform`}
        style={{ width: 280, height: 380 }}
      >
        {/* SVG Canvas */}
        <svg
          ref={svgRef}
          viewBox={symbolData.viewBox}
          className="w-full h-full touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          style={{ cursor: "none" }}
        >
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="26" height="32" patternUnits="userSpaceOnUse">
              <path d="M 26 0 L 0 0 0 32" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Symbol path (dashed guide) */}
          <path
            d={symbolData.path}
            fill="none"
            stroke="#93c5fd"
            strokeWidth="28"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="8 16"
            opacity="0.6"
          />

          {/* Start dot */}
          <circle
            cx={symbolData.startPoint.x}
            cy={symbolData.startPoint.y}
            r="14"
            fill="#3b82f6"
            opacity={completedStrokes.length > 0 || currentStroke.length > 0 ? 0 : 0.9}
          >
            <animate attributeName="r" values="12;16;12" dur="1.5s" repeatCount="indefinite" />
          </circle>

          {/* User strokes */}
          {completedStrokes.map((s, i) => (
            <path
              key={i}
              d={
                `M ${s[0].x} ${s[0].y} ` +
                s
                  .slice(1)
                  .map((p) => `L ${p.x} ${p.y}`)
                  .join(" ")
              }
              fill="none"
              stroke={isSuccess ? "#22c55e" : "#3b82f6"}
              strokeWidth="20"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-colors duration-300"
            />
          ))}

          {/* Current stroke */}
          {currentStroke.length > 0 && (
            <path
              d={
                `M ${currentStroke[0].x} ${currentStroke[0].y} ` +
                currentStroke
                  .slice(1)
                  .map((p) => `L ${p.x} ${p.y}`)
                  .join(" ")
              }
              fill="none"
              stroke={isSuccess ? "#22c55e" : "#3b82f6"}
              strokeWidth="20"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-colors duration-300"
            />
          )}
        </svg>

        {/* Custom Pen Cursor */}
        {cursorPos && !isSuccess && (
          <div
            className="absolute pointer-events-none transition-transform duration-75 will-change-transform"
            style={{
              left: 0,
              top: 0,
              transform: `translate(${cursorPos.x}px, ${cursorPos.y - 48}px)`,
              zIndex: 20,
            }}
          >
            <Image src={Pen} alt="Pen" width={48} height={48} className="drop-shadow-lg" />
          </div>
        )}

        {/* Sparkle overlay */}
        {showSparkle && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-8xl animate-bounce">✨</div>
          </div>
        )}

        {/* Eraser button */}
        {completedStrokes.length > 0 && (
          <button
            className="absolute bottom-2 right-2 cursor-pointer hover:scale-105 transition-all"
            onClick={clearDrawing}
            onMouseEnter={playButtonSound}
          >
            <Image width={48} height={48} src={Easer} alt="Eraser" className="w-12 h-12" />
          </button>
        )}

        <button
          className="absolute top-2 left-2 cursor-pointer hover:scale-105 transition-all"
          onClick={() => playSound(MAP_COMPARE_SIGN_SOUND[symbol as keyof typeof MAP_COMPARE_SIGN_SOUND])}
          onMouseEnter={playButtonSound}
        >
          <Image width={48} height={40} src={LoudSpeaker} alt="Eraser" className="w-12 h-10" />
        </button>
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center gap-6">
        <NextLessonButton onClick={handleComplete} isLast={true} disabled={!isSuccess} />
      </div>
    </div>
  );
}
