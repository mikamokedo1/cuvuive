"use client";

import React, { useRef, useState, useEffect } from "react";

interface AnalogClockProps {
  hours: number;
  minutes: number;
  isInteractive?: boolean;
  onChange?: (hours: number, minutes: number) => void;
  size?: number;
  onClick?: () => void;
}

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

  useEffect(() => {
    setInternalHours(hours);
    setInternalMinutes(minutes);
  }, [hours, minutes]);

  // Handle Drag logic
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isInteractive) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updateTimeFromEvent(e);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isInteractive || e.buttons !== 1) return;
    updateTimeFromEvent(e);
  };

  const updateTimeFromEvent = (e: React.PointerEvent) => {
    if (!clockRef.current) return;
    const rect = clockRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    let angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    if (angle < 0) angle += 360;

    const distance = Math.sqrt(dx * dx + dy * dy);
    const radius = rect.width / 2;

    // Determine which hand to snap based on distance from center
    // If clicking close to center, hour hand. Else, minute hand.
    if (distance < radius * 0.6) {
      let newHour = Math.round(angle / 30);
      if (newHour === 0) newHour = 12;
      setInternalHours(newHour);
      onChange?.(newHour, internalMinutes);
    } else {
      // Snap to 0, 15, 30, 45 or just nearest 5 mins?
      // Since kids learn half-past, we can just snap to nearest 15 mins for precision
      let newMinute = Math.round(angle / 6 / 5) * 5;
      if (newMinute >= 60) newMinute = 0;
      setInternalMinutes(newMinute);
      onChange?.(internalHours, newMinute);
    }
  };

  // The hour hand moves slightly depending on the minutes
  const hourAngle = (internalHours % 12) * 30 + internalMinutes * 0.5;
  const minuteAngle = internalMinutes * 6;

  return (
    <div
      ref={clockRef}
      className={`relative rounded-full bg-white border-8 border-orange-400 shadow-xl flex items-center justify-center ${
        isInteractive ? "cursor-pointer touch-none hover:shadow-orange-200 hover:shadow-2xl transition-shadow" : ""
      }`}
      style={{ width: size, height: size }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={(e) => {
        if (isInteractive) {
          (e.target as HTMLElement).releasePointerCapture(e.pointerId);
        }
      }}
      onClick={onClick}
    >
      {/* Clock Face Numbers */}
      {[...Array(12)].map((_, i) => {
        const num = i === 0 ? 12 : i;
        const angle = i * 30;
        const radius = size / 2 - size * 0.15; // Adjust distance from edge
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
        if (i % 5 === 0) return null; // skip hour marks
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
        className="absolute bg-red-500 rounded-full origin-bottom z-10 transition-transform duration-200 ease-out"
        style={{
          width: size * 0.04,
          height: size * 0.25,
          bottom: "50%",
          transform: `rotate(${hourAngle}deg)`,
          transformOrigin: "bottom center",
          boxShadow: isInteractive ? "0 4px 6px rgba(0,0,0,0.2)" : "none",
        }}
      >
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[12px] border-transparent border-b-red-500 -mt-2"></div>
      </div>

      {/* Minute Hand */}
      <div
        className="absolute bg-blue-500 rounded-full origin-bottom z-20 transition-transform duration-200 ease-out"
        style={{
          width: size * 0.03,
          height: size * 0.38,
          bottom: "50%",
          transform: `rotate(${minuteAngle}deg)`,
          transformOrigin: "bottom center",
          boxShadow: isInteractive ? "0 4px 6px rgba(0,0,0,0.2)" : "none",
        }}
      >
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[16px] border-transparent border-b-blue-500 -mt-3"></div>
      </div>
    </div>
  );
}
