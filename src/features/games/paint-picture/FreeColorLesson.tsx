"use client";

import { useState } from "react";
import { ColoringCanvas } from "./ColoringCanvas";
import { ColoringImage, ALL_IMAGES } from "./constants";
import { ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";

interface FreeColorLessonProps {
  groupId: string;
  onComplete: () => void;
}

export function FreeColorLesson({ groupId, onComplete }: FreeColorLessonProps) {
  const images = ALL_IMAGES[groupId] || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedImages, setCompletedImages] = useState<Set<number>>(new Set());

  const currentImage: ColoringImage | undefined = images[currentIndex];

  if (!currentImage) {
    return <div className="text-center text-red-500 font-bold">Không tìm thấy hình vẽ</div>;
  }

  const handleImageComplete = () => {
    if (completedImages.has(currentIndex)) return;

    const newCompleted = new Set(completedImages);
    newCompleted.add(currentIndex);
    setCompletedImages(newCompleted);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full pb-8">
      {/* Image navigation */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className="p-2 rounded-full bg-orange-100 disabled:opacity-30 hover:bg-orange-200 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-orange-600" />
        </button>

        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setCurrentIndex(i)}
              className={`px-3 py-1.5 rounded-full text-sm font-bold transition-all ${
                i === currentIndex
                  ? "bg-orange-500 text-white shadow-md scale-105"
                  : completedImages.has(i)
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {completedImages.has(i) ? "✓" : i + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            currentIndex === images.length - 1
              ? onComplete()
              : setCurrentIndex(Math.min(images.length - 1, currentIndex + 1));
          }}
          className="p-2 rounded-full bg-orange-100 disabled:opacity-30 hover:bg-orange-200 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-orange-600" />
        </button>
      </div>

      {/* Canvas */}
      <ColoringCanvas
        key={currentImage.id}
        svgPath={currentImage.svgPath}
        regions={currentImage.regions}
        onComplete={handleImageComplete}
      />

      {completedImages.size === images.length && (
        <button
          onClick={onComplete}
          className="mt-4 flex items-center justify-center gap-2 w-full max-w-sm px-6 py-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold rounded-3xl shadow-xl hover:scale-105 active:scale-95 transition-all text-xl mx-auto animate-bounce"
        >
          <CheckCircle2 className="w-8 h-8" />
          <span>Hoàn Thành Bài Tập</span>
        </button>
      )}
    </div>
  );
}
