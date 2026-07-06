"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ActionButton } from "@/components/common/ActionButton";
import { ChevronRight } from "lucide-react";
import { NUMBER_PATHS } from "@/libs/constants/numberPaths";
import Image from "next/image";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { playButtonSound, playSound } from "@/libs/utils/playSound";
import { NextLessonButton } from "@/components/games/NextLessonButton";
import { LoudSpeaker, Eraser as Easer, Pen } from "@/libs/constants/game-assets";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

interface WritingLessonProps {
  range: [number, number];
  onComplete: () => void;
}

interface Point {
  x: number;
  y: number;
}

export function WritingLesson({ range, onComplete }: WritingLessonProps) {
  const { speak } = useTextToSpeech();
  const [start, end] = range;
  const [currentNumber, setCurrentNumber] = useState(start);
  const [isDrawing, setIsDrawing] = useState(false);
  const [completedStrokes, setCompletedStrokes] = useState<Point[][]>([]);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursorPos, setCursorPos] = useState<Point | null>(null);

  const numberData = NUMBER_PATHS[currentNumber];

  const [pathSamples, setPathSamples] = useState<Point[]>([]);

  // Initialize path samples when number changes
  useEffect(() => {
    const extractPoints = () => {
      if (!svgRef.current) return [];
      const pathElement = svgRef.current.querySelector("path[stroke-dasharray]") as SVGPathElement;
      if (!pathElement) return [];

      const points: Point[] = [];
      const totalLength = pathElement.getTotalLength();
      const step = 5; // Sample every 5 units

      for (let i = 0; i <= totalLength; i += step) {
        const pt = pathElement.getPointAtLength(i);
        points.push({ x: pt.x, y: pt.y });
      }
      return points;
    };

    // Attempt to extract immediately, retry once if needed (rendering timing)
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
  }, [currentNumber]);

  useEffect(() => {
    speak(`Bé hãy tập viết số ${currentNumber} nhé`);
  }, [currentNumber, speak]);

  // Check if a point is near the path (within tolerance)
  const isPointNearPath = useCallback(
    (point: Point, tolerance: number = 20): boolean => {
      // Use cached samples
      if (pathSamples.length === 0) return true; // Fallback

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

  // Convert pointer coordinates to SVG coordinates
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

    // Update custom cursor position
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

    // Update custom cursor position
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

  // Validate coverage: Check per-point coverage along the reference path
  const validateDrawing = (allStrokes: Point[][]) => {
    if (pathSamples.length === 0) return;

    // Flatten all user points
    const allUserPoints = allStrokes.flat();

    // Check coverage: detailed check of how many path sample points are covered
    let coveredCount = 0;
    const coverageTolerance = 30; // Distance to consider a path point "covered"

    pathSamples.forEach((pathPoint) => {
      // Check if this path point is covered by ANY user point
      const isCovered = allUserPoints.some((userPoint) => {
        const dx = userPoint.x - pathPoint.x;
        const dy = userPoint.y - pathPoint.y;
        return dx * dx + dy * dy <= coverageTolerance * coverageTolerance;
      });
      if (isCovered) coveredCount++;
    });

    const coverageRatio = coveredCount / pathSamples.length;

    // Required coverage: ~95% of path points must be visited
    if (coverageRatio >= 1) {
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

  const handleNext = () => {
    if (currentNumber < end) {
      setCurrentNumber((prev) => prev + 1);
      clearDrawing();
    } else {
      // All numbers completed
      onComplete();
    }
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
          viewBox={numberData.viewBox}
          className="w-full h-full touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          style={{ cursor: "none" }}
        >
          {/* Background grid (subtle) */}
          <defs>
            <pattern id="grid" width="26" height="32" patternUnits="userSpaceOnUse">
              <path d="M 26 0 L 0 0 0 32" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Number path (dashed guide) */}
          <path
            d={numberData.path}
            fill="none"
            stroke="#93c5fd"
            strokeWidth="24"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="8 16"
            opacity="0.6"
          />

          {/* Start dot */}
          <circle
            cx={numberData.startPoint.x}
            cy={numberData.startPoint.y}
            r="12"
            fill="#3b82f6"
            opacity={completedStrokes.length > 0 || currentStroke.length > 0 ? 0 : 0.9}
          >
            <animate attributeName="r" values="10;14;10" dur="1.5s" repeatCount="indefinite" />
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
              strokeWidth="16"
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
              strokeWidth="16"
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
              transform: `translate(${cursorPos.x}px, ${cursorPos.y - 48}px)`, // Offset to make pen tip match cursor
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
          onClick={() => speak(`số ${currentNumber}`)}
          onMouseEnter={playButtonSound}
        >
          <Image width={48} height={40} src={LoudSpeaker} alt="Eraser" className="w-12 h-10" />
        </button>
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center gap-6">
        <NextLessonButton onClick={handleNext} isLast={currentNumber === end} disabled={!isSuccess} />
      </div>
    </div>
  );
}
