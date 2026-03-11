"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { playButtonSound } from "@/libs/utils/playSound";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { NextLessonButton } from "@/components/games/NextLessonButton";
import { ToneWord } from "./constants";
import { TONE_PATHS } from "@/libs/constants/tonePaths";
import Easer from "@/assets/games/common/earser.webp";
import Pen from "@/assets/games/pen.webp";
import LoudSpeaker from "@/assets/games/loud-speaker.webp";
import Loading from "@/components/common/Loading";
import { getRandomItem } from "@/libs/utils/randomQuestion";

interface ToneWritingLessonProps {
  words: ToneWord[];
  onComplete: () => void;
  requiredWins?: number;
}

interface Point {
  x: number;
  y: number;
}

export function ToneWritingLesson({ words, onComplete, requiredWins = 4 }: ToneWritingLessonProps) {
  const { speak } = useTextToSpeech();
  const [targetWord, setTargetWord] = useState<ToneWord | null>(null);
  const prevTargetRef = useRef<ToneWord | null>(null);
  const [wins, setWins] = useState(0);

  const [isDrawing, setIsDrawing] = useState(false);
  const [completedStrokes, setCompletedStrokes] = useState<Point[][]>([]);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursorPos, setCursorPos] = useState<Point | null>(null);

  const generateQuestion = useCallback(() => {
    if (words.length === 0) return;
    const target = getRandomItem(words, prevTargetRef.current);
    prevTargetRef.current = target;
    setTargetWord(target);

    // reset drawing state
    setCompletedStrokes([]);
    setCurrentStroke([]);
    setIsSuccess(false);

    const toneNames: Record<string, string> = {
      ngang: "ngang",
      sac: "sắc",
      huyen: "huyền",
      hoi: "hỏi",
      nga: "ngã",
      nang: "nặng",
    };
    const toneTargetName = toneNames[target.tone] || target.tone;
    setTimeout(() => {
      speak(`Pé tập viết dấu ${toneTargetName}`);
    }, 500);
  }, [words, speak]);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const getPointerPosition = useCallback((e: React.PointerEvent): Point | null => {
    if (!svgRef.current) return null;
    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 260;
    const y = ((e.clientY - rect.top) / rect.height) * 320;
    return { x, y };
  }, []);

  // --- SVG path sampling for accurate tracing validation ---
  const [pathSamples, setPathSamples] = useState<Point[]>([]);

  useEffect(() => {
    // Reset path samples when target word changes to trigger re-extraction
    setPathSamples([]);

    if (!targetWord || targetWord.tone === "ngang") return;

    const extractPoints = () => {
      if (!svgRef.current) return [];
      const pathElement = svgRef.current.querySelector("path.template-path") as SVGPathElement;
      if (!pathElement) return [];

      const points: Point[] = [];
      const totalLength = pathElement.getTotalLength();
      const step = 5;

      // Extract points along the path
      for (let i = 0; i <= totalLength; i += step) {
        const pt = pathElement.getPointAtLength(i);
        points.push({ x: pt.x, y: pt.y });
      }
      return points;
    };

    // Need a small delay to ensure path is rendered before measuring
    const timer = setTimeout(() => {
      const points = extractPoints();
      if (points.length > 0) {
        setPathSamples(points);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [targetWord]);

  const isPointNearPath = useCallback(
    (point: Point, tolerance: number = 30): boolean => {
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
    if (pathSamples.length === 0 || !targetWord) return;

    const allUserPoints = allStrokes.flat();
    let coveredCount = 0;
    const coverageTolerance = 35; // How close a drawn point must be to a path sample

    pathSamples.forEach((pathPoint) => {
      const isCovered = allUserPoints.some((userPoint) => {
        const dx = userPoint.x - pathPoint.x;
        const dy = userPoint.y - pathPoint.y;
        return dx * dx + dy * dy <= coverageTolerance * coverageTolerance;
      });
      if (isCovered) coveredCount++;
    });

    const coverageRatio = coveredCount / pathSamples.length;

    // At least 85% of the template path must be covered by drawn strokes
    if (coverageRatio >= 0.85) {
      triggerSuccess();
    }
  };

  const triggerSuccess = () => {
    setIsSuccess(true);
    setShowSparkle(true);
    playWinEffect(500);
    speak(`Giỏi quá!`);
    setTimeout(() => setShowSparkle(false), 1500);
  };

  const clearDrawing = () => {
    playButtonSound();
    setCompletedStrokes([]);
    setCurrentStroke([]);
    setIsSuccess(false);
  };

  const handleNext = () => {
    if (wins + 1 >= requiredWins) {
      onComplete();
    } else {
      setWins((w) => w + 1);
      generateQuestion();
    }
  };

  const handleSpeakInstruction = () => {
    playButtonSound();
    if (!targetWord) return;
    const toneNames: Record<string, string> = {
      ngang: "ngang",
      sac: "sắc",
      huyen: "huyền",
      hoi: "hỏi",
      nga: "ngã",
      nang: "nặng",
    };
    speak(`Pé tập viết dấu ${toneNames[targetWord.tone]}`);
  };

  if (!targetWord) return <Loading />;

  const color = "#f97316";

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
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="26" height="32" patternUnits="userSpaceOnUse">
              <path d="M 26 0 L 0 0 0 32" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Symbol path (dashed guide) */}
          {targetWord.tone !== "ngang" && TONE_PATHS[targetWord.tone] && (
            <>
              <path
                className="template-path"
                d={TONE_PATHS[targetWord.tone].path}
                fill="none"
                stroke="#fed7aa"
                strokeWidth="28"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="8 16"
                opacity="0.6"
              />
              {/* Start dot */}
              <circle
                cx={TONE_PATHS[targetWord.tone].startPoint.x}
                cy={TONE_PATHS[targetWord.tone].startPoint.y}
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
              stroke={isSuccess ? "#22c55e" : color}
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
            className="absolute bottom-2 right-2 cursor-pointer hover:scale-105 transition-all outline-none"
            onClick={clearDrawing}
            onMouseEnter={playButtonSound}
          >
            <Image src={Easer} alt="Eraser" className="w-12 h-12" />
          </button>
        )}

        {/* Speaker button */}
        <button
          className="absolute top-2 left-2 cursor-pointer hover:scale-105 transition-all outline-none"
          onClick={handleSpeakInstruction}
          onMouseEnter={playButtonSound}
        >
          <Image src={LoudSpeaker} alt="Speaker" className="w-12 h-10" />
        </button>
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center gap-6 mt-2">
        <NextLessonButton onClick={handleNext} disabled={!isSuccess} />
      </div>
    </div>
  );
}
