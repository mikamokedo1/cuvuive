"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { playButtonSound } from "@/libs/utils/playSound";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { NextLessonButton } from "@/components/games/NextLessonButton";
import { LetterData } from "./constants";
import { LetterSelector } from "./LetterSelector";
const Easer = "https://assets.cuthongminh.com/games/common/earser.webp";
const Pen = "https://assets.cuthongminh.com/games/pen.webp";
const LoudSpeaker = "https://assets.cuthongminh.com/games/loud-speaker.webp";

interface AlphabetWritingLessonProps {
  letters: LetterData[];
  onComplete: () => void;
  isReviewMode?: boolean;
}

interface Point {
  x: number;
  y: number;
}

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
  const [letterPathSamples, setLetterPathSamples] = useState<Point[]>([]);

  const currentLetter = letters[currentIndex];

  // Generate zone grid from guide text bounding box for validation
  const [letterBBox, setLetterBBox] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const timer = setTimeout(() => {
      if (!svgRef.current) return;
      const textElement = svgRef.current.querySelector("#guide-text") as SVGTextElement;
      if (!textElement) return;
      const bbox = textElement.getBBox();
      setLetterBBox({ x: bbox.x, y: bbox.y, width: bbox.width, height: bbox.height });
    }, 100);
    return () => clearTimeout(timer);
  }, [currentIndex, currentLetter]);

  // Speak letter name when it changes
  useEffect(() => {
    if (currentLetter) {
      speak(`Pé tập viết chữ ${currentLetter.letter}`);
    }
  }, [currentIndex]);

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
    if (point) {
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
    if (point) {
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
    if (!letterBBox) return;

    const allUserPoints = allStrokes.flat();

    // Require minimum total drawn points (ensures enough drawing effort)
    if (allUserPoints.length < 60) return;

    // Divide the letter bounding box into a 5x6 grid of zones
    const COLS = 5;
    const ROWS = 6;
    const zoneW = letterBBox.width / COLS;
    const zoneH = letterBBox.height / ROWS;
    const coveredZones = new Set<string>();

    for (const point of allUserPoints) {
      // Check if point falls within the letter bounding box
      if (
        point.x >= letterBBox.x &&
        point.x <= letterBBox.x + letterBBox.width &&
        point.y >= letterBBox.y &&
        point.y <= letterBBox.y + letterBBox.height
      ) {
        const col = Math.floor((point.x - letterBBox.x) / zoneW);
        const row = Math.floor((point.y - letterBBox.y) / zoneH);
        const clampedCol = Math.min(col, COLS - 1);
        const clampedRow = Math.min(row, ROWS - 1);
        coveredZones.add(`${clampedCol}-${clampedRow}`);
      }
    }

    const totalZones = COLS * ROWS;
    const coverageRatio = coveredZones.size / totalZones;

    // Require at least 35% zone coverage
    if (coverageRatio >= 0.45) {
      triggerSuccess();
    }
  };

  const triggerSuccess = () => {
    setIsSuccess(true);
    setShowSparkle(true);
    playWinEffect(500);
    speak(`Giỏi lắm! Chữ ${currentLetter.letter}`);
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
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="26" height="32" patternUnits="userSpaceOnUse">
              <path d="M 26 0 L 0 0 0 32" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Guide letter (dashed outline) */}
          <text
            id="guide-text"
            x="130"
            y="180"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="200"
            fontWeight="100"
            fontFamily="sans-serif"
            fill="none"
            stroke="#fed7aa"
            strokeWidth="2"
            strokeDasharray="6 10"
            opacity="0.8"
          >
            {currentLetter.id}
          </text>

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
              strokeWidth="10"
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
              strokeWidth="10"
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
          onClick={() => speak(`chữ ${currentLetter.letter}`)}
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
