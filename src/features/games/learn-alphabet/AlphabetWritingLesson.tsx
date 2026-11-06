"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { playButtonSound } from "@/libs/utils/playSound";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { NextLessonButton } from "@/components/games/NextLessonButton";
import { LetterData } from "./constants";
import { LetterSelector } from "./LetterSelector";
import { LETTER_PATHS } from "@/libs/constants/letterPaths";
import { checkTracing, splitSubpaths } from "./tracingCheck";
import { LoudSpeaker, Eraser as Easer, Pen } from "@/libs/constants/game-assets";

interface AlphabetWritingLessonProps {
  letters: LetterData[];
  onComplete: () => void;
  isReviewMode?: boolean;
}

import type { Point } from "./tracingCheck";

export function AlphabetWritingLesson({ letters, onComplete, isReviewMode = false }: AlphabetWritingLessonProps) {
  const { speak } = useTextToSpeech();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [completedStrokes, setCompletedStrokes] = useState<Point[][]>([]);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursorPos, setCursorPos] = useState<Point | null>(null);
  /** Samples per template stroke (each stroke is checked on its own), tagged with their letter */
  const [samples, setSamples] = useState<{ letterId: string; strokes: Point[][] } | null>(null);

  const currentLetter = letters[currentIndex];
  const letterPath = LETTER_PATHS[currentLetter.id];
  // Samples of the previous letter are ignored until the new ones are measured
  const strokeSamples = samples?.letterId === currentLetter.id ? samples.strokes : [];
  const pathSamples = strokeSamples.flat();

  // Sample points along each template stroke (hidden path.template-sub elements) for validation
  useEffect(() => {
    if (!letterPath) return;
    const letterId = currentLetter.id;

    const extractStrokes = (): Point[][] => {
      if (!svgRef.current) return [];
      const elements = Array.from(svgRef.current.querySelectorAll("path.template-sub")) as SVGPathElement[];
      const step = 5;
      return elements.map((el) => {
        const points: Point[] = [];
        const totalLength = el.getTotalLength();
        for (let i = 0; i <= totalLength; i += step) {
          const pt = el.getPointAtLength(i);
          points.push({ x: pt.x, y: pt.y });
        }
        const end = el.getPointAtLength(totalLength);
        points.push({ x: end.x, y: end.y }); // always include the very end (e.g. the tail of "a")
        return points;
      });
    };

    const timer = setTimeout(() => {
      const strokes = extractStrokes();
      if (strokes.length > 0) setSamples({ letterId, strokes });
    }, 100);

    return () => clearTimeout(timer);
  }, [currentIndex, letterPath, currentLetter.id]);

  // Speak letter name when it changes
  useEffect(() => {
    if (currentLetter) {
      speak(`Pé tập viết ${currentLetter.name}`);
    }
  }, [currentIndex]);

  // Check if a point is near the template path (constrains drawing)
  const isPointNearPath = useCallback(
    (point: Point, tolerance: number = 28): boolean => {
      if (pathSamples.length === 0) return true;

      for (const pathPoint of pathSamples) {
        const dx = point.x - pathPoint.x;
        const dy = point.y - pathPoint.y;
        if (dx * dx + dy * dy <= tolerance * tolerance) {
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

  // Every stroke must be traced end to end (see tracingCheck.ts), not just most of the letter
  const validateDrawing = (allStrokes: Point[][]) => {
    if (strokeSamples.length === 0) return;
    if (checkTracing(strokeSamples, allStrokes).passed) {
      triggerSuccess();
    }
  };

  const triggerSuccess = () => {
    setIsSuccess(true);
    setShowSparkle(true);
    playWinEffect(500);
    speak(`Giỏi lắm! ${currentLetter.name}`);
    setTimeout(() => setShowSparkle(false), 1500);
  };

  const clearDrawing = () => {
    playButtonSound();
    setCompletedStrokes([]);
    setCurrentStroke([]);
    setIsSuccess(false);
  };

  const handleNext = () => {
    if (currentIndex < letters.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      clearDrawing();
    } else {
      onComplete();
    }
  };

  const handleSelectLetter = (index: number) => {
    setCurrentIndex(index);
    clearDrawing();
  };

  const color = "#f97316"; // Orange for letter strokes

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md px-4 scale-90 sm:scale-100 origin-top">
      {/* Drawing Card */}
      <div
        className="relative bg-white rounded-3xl shadow-xl border-4 border-orange-100 overflow-hidden transition-transform"
        style={{ width: 280, height: 380 }}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 260 320"
          className="w-full h-full touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          style={{ cursor: "none" }}
        >
          {/* Writing lines like a grade-1 exercise book: baseline, x-line, ascender and descender lines */}
          {letterPath && (
            <g pointerEvents="none">
              {[
                { y: letterPath.guides.ascender, stroke: "#e2e8f0", width: 1.5 },
                { y: letterPath.guides.xLine, stroke: "#93c5fd", width: 2 },
                { y: letterPath.guides.baseline, stroke: "#f87171", width: 2.5 },
                { y: letterPath.guides.descender, stroke: "#e2e8f0", width: 1.5 },
              ]
                .filter((line) => line.y > 0 && line.y < 320)
                .map((line) => (
                  <line key={line.y} x1="0" x2="260" y1={line.y} y2={line.y} stroke={line.stroke} strokeWidth={line.width} />
                ))}
            </g>
          )}

          {/* Guide letter (dashed path template) */}
          {letterPath && (
            <>
              <path
                className="template-path"
                d={letterPath.path}
                fill="none"
                stroke="#e9e8eeff"
                strokeWidth="20"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="8 16"
                opacity="0.6"
              />
              {/* One invisible path per stroke, only used to sample each stroke for the check */}
              {splitSubpaths(letterPath.path).map((d, i) => (
                <path key={i} className="template-sub" d={d} fill="none" stroke="none" />
              ))}
              {/* Start dot */}
              <circle
                cx={letterPath.startPoint.x}
                cy={letterPath.startPoint.y}
                r="14"
                fill="#f97316"
                opacity={completedStrokes.length > 0 || currentStroke.length > 0 ? 0 : 0.9}
              >
                <animate attributeName="r" values="12;16;12" dur="1.5s" repeatCount="indefinite" />
              </circle>
            </>
          )}

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
              stroke={isSuccess ? "#22c55e" : color}
              strokeWidth="14"
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
              stroke={isSuccess ? "#22c55e" : color}
              strokeWidth="14"
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

        {/* Speaker button */}
        <button
          className="absolute top-2 left-2 cursor-pointer hover:scale-105 transition-all"
          onClick={() => speak(` ${currentLetter.name}`)}
          onMouseEnter={playButtonSound}
        >
          <Image width={48} height={40} src={LoudSpeaker} alt="Speaker" className="w-12 h-10" />
        </button>
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center gap-6">
        <NextLessonButton onClick={handleNext} isLast={currentIndex === letters.length - 1} disabled={!isSuccess} />
      </div>

      {/* Letter selector - shown when revisiting a completed lesson */}
      {isReviewMode && <LetterSelector letters={letters} currentIndex={currentIndex} onSelect={handleSelectLetter} />}
    </div>
  );
}
