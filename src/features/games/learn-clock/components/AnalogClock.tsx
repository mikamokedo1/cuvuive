"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";

interface AnalogClockProps {
  hours: number;
  minutes: number;
  isInteractive?: boolean;
  onChange?: (hours: number, minutes: number) => void;
  size?: number;
  onClick?: () => void;
}

type SelectedHand = "hour" | "minute" | null;

export function AnalogClock({
  hours,
  minutes,
  isInteractive = false,
  onChange,
  size = 280,
  onClick,
}: AnalogClockProps) {
  const clockRef = useRef<HTMLDivElement>(null);
  const [internalHours, setInternalHours] = useState(hours);
  const [internalMinutes, setInternalMinutes] = useState(minutes);
  const [selectedHand, setSelectedHand] = useState<SelectedHand>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    setInternalHours(hours);
    setInternalMinutes(minutes);
  }, [hours, minutes]);

  // The hour hand moves slightly depending on the minutes
  const hourAngle = (internalHours % 12) * 30 + internalMinutes * 0.5;
  const minuteAngle = internalMinutes * 6;

  // Check if a point (px, py) is close to a hand defined by its angle and length
  const isPointNearHand = useCallback(
    (px: number, py: number, angle: number, handLength: number, threshold: number): boolean => {
      const rad = ((angle - 90) * Math.PI) / 180;
      // Sample N points along the hand and check distance
      const steps = 8;
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const hx = Math.cos(rad) * handLength * t;
        const hy = Math.sin(rad) * handLength * t;
        const dist = Math.sqrt((px - hx) ** 2 + (py - hy) ** 2);
        if (dist < threshold) return true;
      }
      return false;
    },
    [],
  );

  const getRelativeCoords = useCallback((e: React.PointerEvent) => {
    if (!clockRef.current) return { dx: 0, dy: 0 };
    const rect = clockRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return { dx: e.clientX - centerX, dy: e.clientY - centerY };
  }, []);

  const angleFromCoords = (dx: number, dy: number): number => {
    let angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    if (angle < 0) angle += 360;
    return angle;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isInteractive) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    const { dx, dy } = getRelativeCoords(e);
    const radius = size / 2;
    const hourHandLen = radius * 0.5; // match visual length (size * 0.25 from center)
    const minuteHandLen = radius * 0.76; // match visual length (size * 0.38 from center)
    const hitThreshold = Math.max(30, size * 0.12); // generous touch target

    // Check minute hand first (it's on top visually, z-20)
    const nearMinute = isPointNearHand(dx, dy, minuteAngle, minuteHandLen, hitThreshold);
    const nearHour = isPointNearHand(dx, dy, hourAngle, hourHandLen, hitThreshold);

    if (nearMinute) {
      setSelectedHand("minute");
      isDragging.current = true;
    } else if (nearHour) {
      setSelectedHand("hour");
      isDragging.current = true;
    } else {
      // Tap on empty area — deselect
      setSelectedHand(null);
      isDragging.current = false;
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isInteractive || !isDragging.current || !selectedHand) return;

    const { dx, dy } = getRelativeCoords(e);
    const angle = angleFromCoords(dx, dy);

    if (selectedHand === "hour") {
      let newHour = Math.round(angle / 30);
      if (newHour === 0) newHour = 12;
      setInternalHours(newHour);
      onChange?.(newHour, internalMinutes);
    } else {
      let newMinute = Math.round(angle / 6 / 5) * 5;
      if (newMinute >= 60) newMinute = 0;
      setInternalMinutes(newMinute);
      onChange?.(internalHours, newMinute);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isInteractive) {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      isDragging.current = false;
    }
  };

  // Style helpers for selected state
  const hourHandSelected = selectedHand === "hour";
  const minuteHandSelected = selectedHand === "minute";

  return (
    <div
      ref={clockRef}
      className={`relative rounded-full bg-white border-8 border-orange-400 shadow-xl flex items-center justify-center ${
        isInteractive ? "cursor-pointer touch-none hover:shadow-orange-200 hover:shadow-2xl transition-shadow" : ""
      }`}
      style={{ width: size, height: size }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClick={onClick}
    >
      {/* Clock Face Numbers */}
      {[...Array(12)].map((_, i) => {
        const num = i === 0 ? 12 : i;
        const angle = i * 30;
        const radius = size / 2 - size * 0.15;
        const x = Math.sin((angle * Math.PI) / 180) * radius;
        const y = -Math.cos((angle * Math.PI) / 180) * radius;
        return (
          <div
            key={i}
            className="absolute text-3xl font-extrabold text-gray-800 select-none flex items-center justify-center w-10 h-10"
            style={{ transform: `translate(${x}px, ${y}px)` }}
          >
            {num}
          </div>
        );
      })}

      {/* Ticks for minutes */}
      {[...Array(60)].map((_, i) => {
        if (i % 5 === 0) return null;
        const angle = i * 6;
        const radius = size / 2 - 10;
        const x = Math.sin((angle * Math.PI) / 180) * radius;
        const y = -Math.cos((angle * Math.PI) / 180) * radius;
        return (
          <div
            key={`tick-${i}`}
            className="absolute bg-gray-300 rounded-full w-1 h-1"
            style={{ transform: `translate(${x}px, ${y}px)` }}
          />
        );
      })}

      {/* Center Dot */}
      <div className="absolute w-5 h-5 rounded-full bg-gray-900 z-30 ring-4 ring-white shadow-sm"></div>

      {/* Hour Hand */}
      <div
        className={`absolute rounded-full origin-bottom z-10 transition-all duration-200 ease-out ${
          hourHandSelected ? "bg-red-600 scale-110" : "bg-red-500"
        }`}
        style={{
          width: hourHandSelected ? size * 0.055 : size * 0.04,
          height: size * 0.25,
          bottom: "50%",
          transform: `rotate(${hourAngle}deg)`,
          transformOrigin: "bottom center",
          boxShadow: hourHandSelected
            ? "0 0 16px 4px rgba(239,68,68,0.5)"
            : isInteractive
              ? "0 4px 6px rgba(0,0,0,0.2)"
              : "none",
          filter: hourHandSelected ? "brightness(1.1)" : "none",
        }}
      >
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[12px] border-transparent border-b-red-500 -mt-2"></div>
      </div>

      {/* Minute Hand */}
      <div
        className={`absolute rounded-full origin-bottom z-20 transition-all duration-200 ease-out ${
          minuteHandSelected ? "bg-blue-600 scale-105" : "bg-blue-500"
        }`}
        style={{
          width: minuteHandSelected ? size * 0.045 : size * 0.03,
          height: size * 0.38,
          bottom: "50%",
          transform: `rotate(${minuteAngle}deg)`,
          transformOrigin: "bottom center",
          boxShadow: minuteHandSelected
            ? "0 0 16px 4px rgba(59,130,246,0.5)"
            : isInteractive
              ? "0 4px 6px rgba(0,0,0,0.2)"
              : "none",
          filter: minuteHandSelected ? "brightness(1.1)" : "none",
        }}
      >
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[16px] border-transparent border-b-blue-500 -mt-3"></div>
      </div>
    </div>
  );
}
