import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Info } from "lucide-react";
import { CostumeData } from "./constants";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { playButtonSound } from "@/libs/utils/playSound";

interface CostumeDressUpLessonProps {
  costumes: CostumeData[];
  onComplete: () => void;
}

export function CostumeDressUpLesson({ costumes, onComplete }: CostumeDressUpLessonProps) {
  const [currentRound, setCurrentRound] = useState(0);
  const [options, setOptions] = useState<CostumeData[]>([]);
  // We determine full completion by finishing all costumes in the group
  const totalRounds = costumes.length;
  const currentTarget = costumes[currentRound];

  const [isDragging, setIsDragging] = useState(false);
  const [draggedCostumeId, setDraggedCostumeId] = useState<string | null>(null);
  const [isMatched, setIsMatched] = useState(false);

  // Track mouse/touch position
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const [dropError, setDropError] = useState(false);

  useEffect(() => {
    if (currentRound >= totalRounds) return;

    // Choose 3 options including the correct one
    const target = costumes[currentRound];
    const others = costumes.filter((c) => c.id !== target.id);
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random()).slice(0, 2);

    const roundOptions = [target, ...shuffledOthers].sort(() => 0.5 - Math.random());
    setOptions(roundOptions);
    setIsMatched(false);
    setDropError(false);
  }, [currentRound, costumes, totalRounds]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent, costumeId: string) => {
    if (isMatched) return;
    setIsDragging(true);
    setDraggedCostumeId(costumeId);
    setDropError(false);

    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    setDragPos({ x: clientX, y: clientY });
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    // Prevent scrolling while dragging on touch devices
    if ("touches" in e && e.cancelable) {
      e.preventDefault();
    }

    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    setDragPos({ x: clientX, y: clientY });
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;

    let clientX, clientY;
    if ("changedTouches" in e) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    // Check if dropped on character
    if (characterRef.current) {
      const charRect = characterRef.current.getBoundingClientRect();
      const padding = 20; // Forgive area

      const droppedOnCharacter =
        clientX >= charRect.left - padding &&
        clientX <= charRect.right + padding &&
        clientY >= charRect.top - padding &&
        clientY <= charRect.bottom + padding;

      if (droppedOnCharacter) {
        if (draggedCostumeId === currentTarget.id) {
          // Success
          setIsMatched(true);
          playWinEffect(0);

          setTimeout(() => {
            if (currentRound + 1 >= totalRounds) {
              onComplete();
            } else {
              setCurrentRound((r) => r + 1);
            }
          }, 2000);
        } else {
          // Wrong
          playButtonSound();
          setDropError(true);
          setTimeout(() => setDropError(false), 500);
        }
      }
    }

    setIsDragging(false);
    setDraggedCostumeId(null);
  };

  if (!currentTarget || currentRound >= totalRounds) return null;

  return (
    <div
      className="flex flex-col items-center justify-between max-w-4xl mx-auto w-full px-4 h-full py-6 select-none"
      ref={containerRef}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
      onMouseLeave={handleDragEnd}
    >
      {/* Character Area */}
      <div className="flex-1 w-full flex items-center justify-center relative mb-8">
        <div
          ref={characterRef}
          className={`relative w-48 h-72 md:w-64 md:h-96 transition-transform ${dropError ? "animate-[shake_0.5s_ease-in-out]" : ""}`}
        >
          {/* Base Character (always visible if not matched, or hide/swap if your design prefers) */}
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${isMatched ? "opacity-0" : "opacity-100"}`}
          >
            <div className="w-full h-full bg-slate-200 rounded-[3rem] flex flex-col items-center justify-center border-4 border-slate-300 overflow-hidden relative">
              {/* Fallback base character visualization if no real base image */}
              <div className="w-24 h-24 bg-rose-200 rounded-full mb-2"></div>
              <div className="w-20 h-32 bg-sky-200 rounded-2xl"></div>
              <div className="absolute top-4 right-4 text-slate-400">
                <Info className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Worn Costume (visible when matched) */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${isMatched ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            {currentTarget.wornImage && (
              <Image
                src={currentTarget.wornImage}
                alt={currentTarget.name}
                fill
                className="object-contain drop-shadow-xl"
              />
            )}
          </div>

          {/* Drop target highlight */}
          {isDragging && !isMatched && (
            <div className="absolute inset-[-10px] rounded-[3rem] border-4 border-dashed border-indigo-400 opacity-50 animate-pulse pointer-events-none"></div>
          )}
        </div>
      </div>

      {/* Options Tray */}
      <div
        className={`w-full max-w-2xl bg-slate-100 p-4 rounded-3xl md:rounded-[2rem] border-4 border-white shadow-[0_-10px_20px_rgba(0,0,0,0.05)] transition-opacity duration-300 ${isMatched ? "opacity-50 pointer-events-none" : "opacity-100"}`}
      >
        <div className="flex justify-center gap-4 md:gap-8">
          {options.map((costume) => (
            <div
              key={costume.id}
              className={`relative w-20 h-20 md:w-28 md:h-28 
                ${isDragging && draggedCostumeId === costume.id ? "opacity-0" : "opacity-100"} 
                transition-opacity duration-200 cursor-grab active:cursor-grabbing`}
              onMouseDown={(e) => handleDragStart(e, costume.id)}
              onTouchStart={(e) => handleDragStart(e, costume.id)}
            >
              <div className="absolute inset-0 bg-white rounded-2xl shadow-sm border-2 border-indigo-50 p-2 pointer-events-none flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src={costume.image}
                    alt={costume.name}
                    fill
                    className="object-contain drop-shadow-sm"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dragging Overlay (The item being dragged) */}
      {isDragging && draggedCostumeId && (
        <div
          className="fixed pointer-events-none z-50 w-24 h-24 md:w-32 md:h-32 drop-shadow-2xl"
          style={{
            left: dragPos.x,
            top: dragPos.y,
            transform: "translate(-50%, -50%) scale(1.1)",
          }}
        >
          {costumes.find((c) => c.id === draggedCostumeId) && (
            <div className="absolute inset-0 bg-white rounded-2xl shadow-lg border-2 border-indigo-200 p-2">
              <div className="relative w-full h-full">
                <Image
                  src={costumes.find((c) => c.id === draggedCostumeId)!.image}
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Global CSS for shake animation if not defined elsewhere */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px) rotate(-2deg); }
          50% { transform: translateX(10px) rotate(2deg); }
          75% { transform: translateX(-10px) rotate(-2deg); }
        }
      `,
        }}
      />
    </div>
  );
}
