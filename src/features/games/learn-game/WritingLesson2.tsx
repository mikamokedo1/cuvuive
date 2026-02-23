"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { DIGIT_PATHS, getDigits, NUMBER_NAMES_VI } from "@/libs/constants/numberPaths2";
import Image from "next/image";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import Easer from "@/assets/games/common/earser.webp";
import Pen from "@/assets/games/pen.webp";
import LoudSpeaker from "@/assets/games/loud-speaker.webp";
import { playButtonSound } from "@/libs/utils/playSound";
import { NextLessonButton } from "@/components/games/NextLessonButton";
import { useTextToSpeech } from "@/libs/hooks/useTextToSpeech";

interface WritingLesson2Props {
  numbers: number[];
  onComplete: () => void;
}

interface Point {
  x: number;
  y: number;
}

export function WritingLesson2({ numbers, onComplete }: WritingLesson2Props) {
  const { speak } = useTextToSpeech();
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentNumber = numbers[currentIndex];
  const digits = getDigits(currentNumber);
  const isMultiDigit = digits.length > 1;
  const totalDigits = digits.length;

  // Use ref for activeDigitIndex to avoid stale closures in event handlers
  const [activeDigitIndex, setActiveDigitIndex] = useState(0);
  const activeDigitIndexRef = useRef(0);

  // Keep ref in sync with state
  useEffect(() => {
    activeDigitIndexRef.current = activeDigitIndex;
  }, [activeDigitIndex]);

  const [isDrawing, setIsDrawing] = useState(false);
  const [completedStrokes, setCompletedStrokes] = useState<Point[][]>([]);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const isSuccessRef = useRef(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursorPos, setCursorPos] = useState<Point | null>(null);
  const [pathSamples, setPathSamples] = useState<Point[]>([]);
  // Track when digit transition is happening — block drawing during this time
  const [isTransitioning, setIsTransitioning] = useState(false);

  // ViewBox for the canvas
  const canvasWidth = isMultiDigit ? 520 : 260;
  const canvasHeight = 320;
  const viewBox = `0 0 ${canvasWidth} ${canvasHeight}`;

  // Reset state when number changes
  useEffect(() => {
    activeDigitIndexRef.current = 0;
    setActiveDigitIndex(0);
    setCompletedStrokes([]);
    setCurrentStroke([]);
    setIsSuccess(false);
    isSuccessRef.current = false;
    setShowSparkle(false);
    setPathSamples([]);
    setIsTransitioning(false);
  }, [currentIndex]);

  // Extract path samples for validation
  useEffect(() => {
    const extractPoints = () => {
      if (!svgRef.current) return [];
      const pathElement = svgRef.current.querySelector(
        `path[data-trace="digit-${activeDigitIndex}"]`,
      ) as SVGPathElement;
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

    // Clear old samples first
    setPathSamples([]);

    // Small delay to ensure SVG has re-rendered with new paths
    const timer = setTimeout(() => {
      const points = extractPoints();
      if (points.length > 0) {
        setPathSamples(points);
        setIsTransitioning(false);
      } else {
        // Retry once more
        const retryTimer = setTimeout(() => {
          const retryPoints = extractPoints();
          setPathSamples(retryPoints);
          setIsTransitioning(false);
        }, 100);
        return () => clearTimeout(retryTimer);
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [currentIndex, activeDigitIndex]);

  const isPointNearPath = useCallback(
    (point: Point, tolerance: number = 20): boolean => {
      // IMPORTANT: Do NOT allow drawing when pathSamples is empty
      if (pathSamples.length === 0) return false;
      for (const pathPoint of pathSamples) {
        const dx = point.x - pathPoint.x;
        const dy = point.y - pathPoint.y;
        if (Math.sqrt(dx * dx + dy * dy) <= tolerance) return true;
      }
      return false;
    },
    [pathSamples],
  );

  const getPointerPosition = useCallback(
    (e: React.PointerEvent): Point | null => {
      if (!svgRef.current) return null;
      const svg = svgRef.current;
      const rect = svg.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * canvasWidth;
      const y = ((e.clientY - rect.top) / rect.height) * canvasHeight;
      return { x, y };
    },
    [canvasWidth, canvasHeight],
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isSuccessRef.current || isTransitioning) return;
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

    if (!isDrawing || isSuccessRef.current || isTransitioning) return;
    const point = getPointerPosition(e);
    if (point && isPointNearPath(point)) {
      setCurrentStroke((prev) => [...prev, point]);
    }
  };

  const handlePointerUp = () => {
    if (!isDrawing || isSuccessRef.current || isTransitioning) return;
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
    const coverageTolerance = 30;

    pathSamples.forEach((pathPoint) => {
      const isCovered = allUserPoints.some((userPoint) => {
        const dx = userPoint.x - pathPoint.x;
        const dy = userPoint.y - pathPoint.y;
        return dx * dx + dy * dy <= coverageTolerance * coverageTolerance;
      });
      if (isCovered) coveredCount++;
    });

    const coverageRatio = coveredCount / pathSamples.length;

    if (coverageRatio >= 1) {
      // Use ref values to avoid stale closures
      const currentActiveIdx = activeDigitIndexRef.current;

      if (isMultiDigit && currentActiveIdx < totalDigits - 1) {
        // Move to next digit — trigger transition to block drawing
        playWinEffect(300);
        setIsTransitioning(true);
        setPathSamples([]); // Clear immediately
        const nextIdx = currentActiveIdx + 1;
        activeDigitIndexRef.current = nextIdx;
        setActiveDigitIndex(nextIdx);
        setCompletedStrokes([]);
        setCurrentStroke([]);
      } else {
        // All digits complete!
        triggerSuccess();
      }
    }
  };

  const triggerSuccess = () => {
    setIsSuccess(true);
    isSuccessRef.current = true;
    setShowSparkle(true);
    playWinEffect(500);
    setTimeout(() => setShowSparkle(false), 1500);
  };

  const clearDrawing = () => {
    playButtonSound();
    // Reset back to first digit for multi-digit numbers
    activeDigitIndexRef.current = 0;
    setActiveDigitIndex(0);
    setCompletedStrokes([]);
    setCurrentStroke([]);
    setIsSuccess(false);
    isSuccessRef.current = false;
    setPathSamples([]);
  };

  const handleNext = () => {
    if (currentIndex < numbers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  // Compute the x-offset for each digit in multi-digit mode
  const getDigitOffset = (digitIdx: number): number => {
    if (!isMultiDigit) return 0;
    return digitIdx * 260;
  };

  // Translate a digit's path by the offset
  // Properly parses SVG path data and shifts every X coordinate
  const translatePath = (pathD: string, offsetX: number): string => {
    if (offsetX === 0) return pathD;

    // Tokenize: split into commands and numbers
    const tokens = pathD.match(/[a-zA-Z]|[-+]?[\d]*\.?[\d]+/g);
    if (!tokens) return pathD;

    const result: string[] = [];
    let isX = true; // Alternates: true = X coord, false = Y coord

    for (const token of tokens) {
      if (/[a-zA-Z]/.test(token)) {
        result.push(token);
        isX = true;
      } else {
        const num = parseFloat(token);
        if (isX) {
          result.push(String(num + offsetX));
        } else {
          result.push(String(num));
        }
        isX = !isX;
      }
    }

    return result.join(" ");
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md px-4 scale-90 sm:scale-100 origin-top">
      {/* Writing Card */}
      <div
        className="relative bg-white rounded-3xl shadow-xl border-4 border-blue-100 overflow-hidden transition-transform"
        style={{ width: isMultiDigit ? 520 : 280, height: 380 }}
      >
        <svg
          ref={svgRef}
          viewBox={viewBox}
          className="w-full h-full touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          style={{ cursor: "none" }}
        >
          {/* Background grid */}
          <defs>
            <pattern id="grid2" width="26" height="32" patternUnits="userSpaceOnUse">
              <path d="M 26 0 L 0 0 0 32" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid2)" />

          {/* Separator line for multi-digit */}
          {isMultiDigit && (
            <line x1="260" y1="20" x2="260" y2="300" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="8 4" />
          )}

          {/* Render all digit guide paths */}
          {digits.map((digit, idx) => {
            const offset = getDigitOffset(idx);
            const dPath = DIGIT_PATHS[digit];
            if (!dPath) return null;

            const isActive = idx === activeDigitIndex && !isSuccess;
            const isCompleted = idx < activeDigitIndex || isSuccess;

            return (
              <g key={`digit-${idx}`}>
                {/* Guide path (dashed) */}
                <path
                  data-trace={`digit-${idx}`}
                  d={translatePath(dPath.path, offset)}
                  fill="none"
                  stroke={isCompleted ? "#86efac" : isActive ? "#93c5fd" : "#e2e8f0"}
                  strokeWidth="24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={isCompleted ? "none" : "8 16"}
                  opacity={isCompleted ? 0.8 : isActive ? 0.6 : 0.3}
                />

                {/* Checkmark for completed digits */}
                {isCompleted && !isSuccess && (
                  <text x={130 + offset} y="170" textAnchor="middle" fontSize="60" fill="#22c55e" opacity="0.7">
                    ✓
                  </text>
                )}

                {/* Start dot for active digit */}
                {isActive && completedStrokes.length === 0 && currentStroke.length === 0 && (
                  <circle cx={dPath.startPoint.x + offset} cy={dPath.startPoint.y} r="12" fill="#3b82f6" opacity={0.9}>
                    <animate attributeName="r" values="10;14;10" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>
            );
          })}

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

        {/* Eraser */}
        {completedStrokes.length > 0 && (
          <button
            className="absolute bottom-2 right-2 cursor-pointer hover:scale-105 transition-all"
            onClick={clearDrawing}
            onMouseEnter={playButtonSound}
          >
            <Image src={Easer} alt="Eraser" className="w-12 h-12" />
          </button>
        )}

        {/* Speaker */}
        <button
          className="absolute top-2 left-2 cursor-pointer hover:scale-105 transition-all"
          onClick={() => speak(`Số ${currentNumber}`)}
          onMouseEnter={playButtonSound}
        >
          <Image src={LoudSpeaker} alt="Speaker" className="w-12 h-10" />
        </button>
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center gap-6">
        <NextLessonButton onClick={handleNext} isLast={currentIndex === numbers.length - 1} disabled={!isSuccess} />
      </div>
    </div>
  );
}
