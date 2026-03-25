"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { COLOR_PALETTE, ColorRegion } from "./constants";
import { Eraser, RotateCcw, Camera } from "lucide-react";

interface ColoringCanvasProps {
  svgPath: string;
  regions: ColorRegion[];
  guideColors?: Record<string, string>;
  onComplete: () => void;
  showGuide?: boolean;
}

export function ColoringCanvas({ svgPath, regions, guideColors, onComplete, showGuide = false }: ColoringCanvasProps) {
  const svgWrapperRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>("");
  const [filledRegions, setFilledRegions] = useState<Record<string, string>>({});
  const [selectedColor, setSelectedColor] = useState<string>(COLOR_PALETTE[0].hex);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [isEraser, setIsEraser] = useState(false);
  const [feedback, setFeedback] = useState<Record<string, "correct" | "wrong">>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const regionIds = regions.map((r) => r.id);

  // Fetch SVG content
  useEffect(() => {
    fetch(svgPath)
      .then((res) => res.text())
      .then((text) => setSvgContent(text))
      .catch((err) => console.error("Failed to load SVG:", err));
  }, [svgPath]);

  // Check completion
  const checkCompletion = useCallback(() => {
    if (isCompleted) return;

    if (guideColors) {
      // Guide mode: all regions must match
      const allCorrect = regionIds.every((id) => {
        return filledRegions[id] && filledRegions[id].toUpperCase() === guideColors[id]?.toUpperCase();
      });
      if (allCorrect) {
        setIsCompleted(true);
        setTimeout(onComplete, 500);
      }
    } else {
      // Free mode: all regions must have a color
      const allFilled = regionIds.every((id) => filledRegions[id]);
      if (allFilled) {
        setIsCompleted(true);
        setTimeout(onComplete, 500);
      }
    }
  }, [filledRegions, guideColors, regionIds, onComplete, isCompleted]);

  useEffect(() => {
    checkCompletion();
  }, [checkCompletion]);

  const handleRegionClick = (regionId: string) => {
    if (isEraser) {
      // Erase the region
      setFilledRegions((prev) => {
        const next = { ...prev };
        delete next[regionId];
        return next;
      });
      setFeedback((prev) => {
        const next = { ...prev };
        delete next[regionId];
        return next;
      });
      setSelectedRegion(null);
      return;
    }

    // Fill with selected color
    setFilledRegions((prev) => ({ ...prev, [regionId]: selectedColor }));
    setSelectedRegion(regionId);

    // Check against guide
    if (guideColors && guideColors[regionId]) {
      if (selectedColor.toUpperCase() === guideColors[regionId].toUpperCase()) {
        setFeedback((prev) => ({ ...prev, [regionId]: "correct" }));
      } else {
        setFeedback((prev) => ({ ...prev, [regionId]: "wrong" }));
      }
    }
  };

  const handleReset = () => {
    setFilledRegions({});
    setFeedback({});
    setSelectedRegion(null);
    setIsCompleted(false);
  };

  const handleSavePhoto = async () => {
    const svgElement = svgWrapperRef.current?.querySelector("svg");
    if (!svgElement) return;

    // Get width and height to maintain aspect ratio
    const viewBox = svgElement.getAttribute("viewBox");
    let width = 800;
    let height = 600;

    if (viewBox) {
      const parts = viewBox.split(/[ ,\t]+/);
      if (parts.length === 4) {
        width = parseFloat(parts[2]);
        height = parseFloat(parts[3]);
      }
    } else {
      width = svgElement.clientWidth || 800;
      height = svgElement.clientHeight || 600;
    }

    // Clone the SVG element so we don't modify the DOM
    const clone = svgElement.cloneNode(true) as SVGElement;
    // Ensure width and height are set for the image conversion
    clone.setAttribute("width", width.toString());
    clone.setAttribute("height", height.toString());

    const svgData = new XMLSerializer().serializeToString(clone);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = async () => {
      const canvas = document.createElement("canvas");
      // Scale up for better quality
      const scale = 2;
      canvas.width = width * scale;
      canvas.height = height * scale;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // White background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);

      const fileName = `Cuthongminh-Tomau-${Date.now()}.jpg`;

      // Use canvas.toBlob for better mobile compatibility
      canvas.toBlob(
        async (blob) => {
          if (!blob) return;

          // Try Web Share API first (works great on iOS Safari)
          if (navigator.share && navigator.canShare) {
            try {
              const file = new File([blob], fileName, { type: "image/jpeg" });
              if (navigator.canShare({ files: [file] })) {
                await navigator.share({
                  files: [file],
                  title: "Cú Thông Minh - Tô màu",
                });
                return;
              }
            } catch (err) {
              // User cancelled share or share failed — fall through
              if ((err as DOMException)?.name === "AbortError") return;
            }
          }

          // Fallback: create a blob URL and use <a download>
          const blobUrl = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = blobUrl;
          link.download = fileName;

          // For Safari: open in new tab if download attribute isn't supported
          const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
          if (isSafari) {
            link.target = "_blank";
            link.rel = "noopener noreferrer";
          }

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
        },
        "image/jpeg",
        0.9
      );
    };
    img.src = url;
  };

  // Process SVG to add interactivity
  const processedSvg = svgContent
    ? (() => {
        let processed = svgContent;

        regionIds.forEach((id) => {
          const color = filledRegions[id] || "#f0f0f0";
          // Replace fill color for the region
          const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          const regex = new RegExp(`(id="${escapedId}"[^>]*?)fill="[^"]*"`, "g");
          processed = processed.replace(regex, `$1fill="${color}"`);
        });

        return processed;
      })()
    : "";

  const filledCount = Object.keys(filledRegions).length;
  const totalRegions = regionIds.length;
  const progress = Math.round((filledCount / totalRegions) * 100);

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-2xl mx-auto px-4">
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Guide preview */}
      {showGuide && guideColors && (
        <div className="bg-white/80 rounded-xl p-3 border-2 border-dashed border-orange-300">
          <p className="text-xs text-center font-bold text-orange-500 mb-2">🎨 Mẫu tham khảo</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {regions.map((region) => (
              <div key={region.id} className="flex items-center gap-1">
                <div
                  className="w-5 h-5 rounded-full border-2 border-gray-300 shadow-sm"
                  style={{ backgroundColor: guideColors[region.id] }}
                />
                <span className="text-xs text-gray-600">{region.label}</span>
                {feedback[region.id] === "correct" && <span className="text-green-500 text-xs">✓</span>}
                {feedback[region.id] === "wrong" && <span className="text-red-500 text-xs">✗</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SVG Canvas */}
      <div
        ref={svgWrapperRef}
        className="relative bg-white rounded-2xl shadow-lg border-4 border-orange-200 p-4 w-full aspect-[4/3] flex items-center justify-center overflow-hidden cursor-pointer"
        onClick={(e) => {
          const target = e.target as SVGElement;
          const id = target.id || target.closest("[id]")?.id;
          if (id && regionIds.includes(id)) {
            handleRegionClick(id);
          }
        }}
      >
        {processedSvg ? (
          <div
            className="w-full h-full flex items-center justify-center [&_svg]:w-full [&_svg]:h-full [&_svg]:max-w-full [&_svg]:max-h-full"
            dangerouslySetInnerHTML={{ __html: processedSvg }}
          />
        ) : (
          <div className="flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Color Palette */}
      <div className="w-full bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border-2 border-orange-100">
        <div className="flex flex-wrap gap-3 justify-center items-center">
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

          {/* Eraser */}
          <button
            onClick={() => setIsEraser(!isEraser)}
            className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-3 transition-all duration-200 hover:scale-110 active:scale-95 shadow-md flex items-center justify-center bg-gray-100 ${
              isEraser ? "border-gray-800 ring-4 ring-orange-300 scale-110" : "border-gray-300"
            }`}
            title="Tẩy"
          >
            <Eraser className="w-5 h-5 text-gray-600" />
          </button>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border-3 border-gray-300 transition-all duration-200 hover:scale-110 active:scale-95 shadow-md flex items-center justify-center bg-red-50 hover:bg-red-100"
            title="Làm lại"
          >
            <RotateCcw className="w-5 h-5 text-red-500" />
          </button>

          <div className="w-px h-10 bg-gray-300 mx-1 md:mx-2" />

          {/* Chụp Ảnh */}
          <button
            onClick={handleSavePhoto}
            className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 md:px-4 py-2 rounded-xl shadow-md hover:scale-105 transition-transform active:scale-95 font-bold h-10 md:h-12"
          >
            <Camera className="w-5 h-5" />
            <span className="hidden sm:inline">Chụp Ảnh</span>
          </button>
        </div>
      </div>
    </div>
  );
}
