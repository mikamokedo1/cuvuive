"use client";

import { useState, useEffect } from "react";
import { EntityData } from "@/types/game";
import Image from "next/image";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/libs/hooks/useTextToSpeech";
import { playButtonSound } from "@/libs/utils/playSound";
import Loading from "../common/Loading";

interface PuzzleLessonProps {
  dataItems: EntityData[];
  onComplete: () => void;
  titleItem?: string;
}

// A simple 2x2 grid puzzle
const PIECE_COUNT = 4;

export function PuzzleLesson({ dataItems, onComplete, titleItem }: PuzzleLessonProps) {
  const { speak } = useTextToSpeech();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pieces, setPieces] = useState<{ id: number; position: number }[]>([]);
  const [placedPieces, setPlacedPieces] = useState<number[]>([]); // holds indices of correctly placed pieces
  const [draggedPiece, setDraggedPiece] = useState<number | null>(null);
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);

  const generatePuzzle = () => {
    if (dataItems.length === 0 || currentIndex >= dataItems.length) return;
    setPlacedPieces([]);
    setIsCompleting(false);

    // Create pieces [0, 1, 2, 3] and shuffle their initial display positions
    const initialPieces = [0, 1, 2, 3].map((i) => ({ id: i, position: Math.random() }));
    setPieces(initialPieces.sort((a, b) => a.position - b.position));

    setTimeout(() => {
      speak(`Xếp hình ${titleItem ?? ""} ${dataItems[currentIndex].name}`);
    }, 500);
  };

  useEffect(() => {
    generatePuzzle();
  }, [dataItems, currentIndex]);

  const handleDragStart = (e: React.DragEvent, id: number) => {
    setDraggedPiece(id);
    playButtonSound();
  };

  const handleDragOver = (e: React.DragEvent, slotId: number) => {
    e.preventDefault(); // Necessary to allow dropping
    if (hoveredSlot !== slotId && !placedPieces.includes(slotId)) {
      setHoveredSlot(slotId);
    }
  };

  const handleDragLeave = () => {
    setHoveredSlot(null);
  };

  const handleDrop = (e: React.DragEvent, slotId: number) => {
    e.preventDefault();
    setHoveredSlot(null);
    if (draggedPiece === null) return;

    if (draggedPiece === slotId) {
      // Correct placement
      playButtonSound();
      const newPlaced = [...placedPieces, slotId];
      setPlacedPieces(newPlaced);

      if (newPlaced.length === PIECE_COUNT) {
        // Puzzle complete
        setIsCompleting(true);
        speak("Tuyệt vời!");
        playWinEffect(500);
        setTimeout(() => {
          setIsCompleting(false);
          const nextIndex = currentIndex + 1;
          if (nextIndex >= dataItems.length) {
            onComplete();
          } else {
            setCurrentIndex(nextIndex);
          }
        }, 2000); // 2 second delay to let animation finish fully
      }
    } else {
      // Wrong placement
      speak("Chưa đúng chỗ rồi!");
    }
    setDraggedPiece(null);
  };

  const targetItem = dataItems[currentIndex];

  if (!targetItem) return <Loading />;

  const bgUrl = typeof targetItem.image === "string" ? targetItem.image : targetItem.image.src;

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl px-4 overflow-hidden">
      {/* Target Preview */}
      <div className="flex flex-col items-center z-10">
        <div
          className={`relative w-32 h-32 md:w-40 md:h-40 cursor-pointer transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            isCompleting ? "scale-[1.3] md:scale-150 opacity-100 drop-shadow-2xl" : "opacity-50"
          }`}
          onClick={() => speak(targetItem.name)}
        >
          <Image src={targetItem.image} alt={targetItem.name} fill className="object-contain" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-12 items-center justify-center w-full relative z-0">
        {/* Available Pieces */}
        <div
          className={`flex flex-wrap gap-4 justify-center md:w-1/2 transition-all duration-700 ${isCompleting ? "opacity-0 scale-75 pointer-events-none" : "opacity-100 scale-100"}`}
        >
          {pieces.map((piece) => {
            if (placedPieces.includes(piece.id))
              return (
                <div key={`empty-${piece.id}`} className="w-[120px] h-[80px] md:w-[150px] md:h-[100px] opacity-0" />
              );
            return (
              <div
                key={piece.id}
                draggable
                onDragStart={(e) => handleDragStart(e, piece.id)}
                onDragEnd={() => {
                  setDraggedPiece(null);
                  setHoveredSlot(null);
                }}
                className="relative w-[120px] h-[80px] md:w-[150px] md:h-[100px] cursor-pointer hover:scale-105 transition-transform bg-white rounded-lg shadow-md border-2 border-gray-200 overflow-hidden bg-no-repeat"
                style={{
                  backgroundImage: `url(${bgUrl})`,
                  backgroundSize: "200% 200%",
                  backgroundPosition: `${(piece.id % 2) * 100}% ${Math.floor(piece.id / 2) * 100}%`,
                }}
              />
            );
          })}
        </div>

        {/* Puzzle Board */}
        <div
          className={`grid grid-cols-2 gap-1 bg-gray-200 p-2 border-4 border-gray-300 rounded-xl shadow-inner shrink-0 h-fit transition-all duration-1000 ease-in-out ${
            isCompleting
              ? "opacity-0 scale-50 -translate-y-32 md:-translate-y-48 pointer-events-none rotate-12"
              : "opacity-100 scale-100 translate-y-0"
          }`}
        >
          {[0, 1, 2, 3].map((slot) => {
            const isHovered = hoveredSlot === slot;
            return (
              <div
                key={slot}
                onDragOver={(e) => handleDragOver(e, slot)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, slot)}
                className={`relative w-[120px] h-[80px] md:w-[150px] md:h-[100px] border-2 transition-all duration-200 rounded overflow-hidden ${
                  isHovered
                    ? "border-blue-500 bg-blue-100 scale-105 shadow-md z-10 border-solid"
                    : "border-dashed border-gray-400"
                }`}
              >
                {placedPieces.includes(slot) ? (
                  <div
                    className="w-full h-full bg-white bg-no-repeat border-2 border-transparent"
                    style={{
                      backgroundImage: `url(${bgUrl})`,
                      backgroundSize: "200% 200%",
                      backgroundPosition: `${(slot % 2) * 100}% ${Math.floor(slot / 2) * 100}%`,
                    }}
                  />
                ) : (
                  <div
                    className={`w-full h-full flex items-center justify-center text-2xl font-bold transition-colors ${isHovered ? "text-blue-500" : "text-gray-400 bg-gray-100"}`}
                  >
                    {slot + 1}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
