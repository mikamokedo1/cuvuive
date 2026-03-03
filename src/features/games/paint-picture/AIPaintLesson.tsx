"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Eraser, RotateCcw } from "lucide-react";
import { AI_BACKGROUNDS, COLOR_PALETTE } from "./constants";

interface AIPaintLessonProps {
  groupId: string;
  onComplete: () => void;
}

export function AIPaintLesson({ groupId, onComplete }: AIPaintLessonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const bgImageRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedColor, setSelectedColor] = useState(COLOR_PALETTE[0].hex);
  const [isEraser, setIsEraser] = useState(false);
  const [lineWidth, setLineWidth] = useState(10);
  const [hasStartedDrawing, setHasStartedDrawing] = useState(false);

  const backgroundImage = AI_BACKGROUNDS[groupId];

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas resolution to match its display size exactly
    const container = containerRef.current;
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  // Set up drawing styles when color/eraser changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (isEraser) {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = lineWidth * 2; // eraser is thicker
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = lineWidth;
    }
  }, [selectedColor, isEraser, lineWidth]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();

    // Get correct coordinates
    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ("touches" in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasStartedDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault(); // prevent scrolling while drawing on touch devices

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ("touches" in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSavePhoto = () => {
    const originalCanvas = canvasRef.current;
    const imgElement = imgRef.current;

    if (!originalCanvas || !imgElement) return;

    // Create an offscreen canvas to combine background and drawing
    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = originalCanvas.width;
    exportCanvas.height = originalCanvas.height;

    const ctx = exportCanvas.getContext("2d");
    if (!ctx) return;

    // Fill with white background first in case image has transparency
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

    // Draw background image
    // Note: because we display the image using object-fit: contain, we need to replicate that exactly
    const imgRatio = imgElement.naturalWidth / imgElement.naturalHeight;
    const canvasRatio = exportCanvas.width / exportCanvas.height;

    let drawWidth = exportCanvas.width;
    let drawHeight = exportCanvas.height;
    let drawX = 0;
    let drawY = 0;

    if (imgRatio > canvasRatio) {
      drawHeight = exportCanvas.width / imgRatio;
      drawY = (exportCanvas.height - drawHeight) / 2;
    } else {
      drawWidth = exportCanvas.height * imgRatio;
      drawX = (exportCanvas.width - drawWidth) / 2;
    }

    ctx.drawImage(imgElement, drawX, drawY, drawWidth, drawHeight);

    // Draw user's strokes over image
    ctx.drawImage(originalCanvas, 0, 0);

    // Export
    const dataUrl = exportCanvas.toDataURL("image/jpeg", 0.9);

    const link = document.createElement("a");
    link.download = `Cuvuive-Tomau-${groupId}-${Date.now()}.jpg`;
    link.href = dataUrl;
    link.click();

    // Trigger completion if they took a photo
    setTimeout(onComplete, 1000);
  };

  if (!backgroundImage) {
    return <div className="text-center p-8 text-orange-500 font-bold text-xl">Không tìm thấy mẫu vẽ cho bài này!</div>;
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-4xl mx-auto px-4">
      {/* Tools Row */}
      <div className="w-full flex justify-between items-center bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-orange-100">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-500 hidden sm:block">Nét vẽ:</span>
          {[5, 10, 20].map((size) => (
            <button
              key={size}
              onClick={() => {
                setLineWidth(size);
                setIsEraser(false);
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                lineWidth === size && !isEraser
                  ? "bg-orange-100 ring-2 ring-orange-400"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <div className="bg-gray-800 rounded-full" style={{ width: size, height: size }} />
            </button>
          ))}
        </div>

        <button
          onClick={handleSavePhoto}
          className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-xl shadow-md hover:scale-105 transition-transform active:scale-95 font-bold"
        >
          <Camera className="w-5 h-5" />
          <span className="hidden sm:inline">Chụp Ảnh</span>
        </button>
      </div>

      {/* Canvas Area */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] md:aspect-video bg-white rounded-2xl shadow-lg border-4 border-orange-200 overflow-hidden touch-none"
      >
        {/* Background Image */}
        <img
          ref={imgRef}
          src={backgroundImage}
          alt="Coloring Base"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none opacity-50"
        />

        {/* Drawing Surface */}
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          onTouchCancel={stopDrawing}
          className="absolute inset-0 w-full h-full cursor-crosshair z-10"
        />

        {!hasStartedDrawing && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full text-orange-600 font-bold flex items-center gap-2 shadow-sm animate-pulse">
              <span>✍️ Bắt đầu vẽ nào!</span>
            </div>
          </div>
        )}
      </div>

      {/* Color Palette */}
      <div className="w-full bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border-2 border-orange-100">
        <div className="flex flex-wrap gap-2 md:gap-3 justify-center items-center">
          {COLOR_PALETTE.map((color) => (
            <button
              key={color.hex}
              onClick={() => {
                setSelectedColor(color.hex);
                setIsEraser(false);
              }}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-3 transition-all duration-200 hover:scale-110 active:scale-95 shadow-md ${
                selectedColor === color.hex && !isEraser
                  ? "border-gray-800 ring-4 ring-orange-300 scale-110"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}

          <div className="w-px h-10 bg-gray-300 mx-2" />

          {/* Eraser */}
          <button
            onClick={() => setIsEraser(true)}
            className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-3 transition-all duration-200 hover:scale-110 active:scale-95 shadow-md flex items-center justify-center bg-gray-100 ${
              isEraser ? "border-gray-800 ring-4 ring-orange-300 scale-110" : "border-gray-300"
            }`}
            title="Tẩy"
          >
            <Eraser className="w-5 h-5 text-gray-600" />
          </button>

          {/* Reset */}
          <button
            onClick={handleClear}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border-3 border-gray-300 transition-all duration-200 hover:scale-110 active:scale-95 shadow-md flex items-center justify-center bg-red-50 hover:bg-red-100"
            title="Xóa toàn bộ"
          >
            <RotateCcw className="w-5 h-5 text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
