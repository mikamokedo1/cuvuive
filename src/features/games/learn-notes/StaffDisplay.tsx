"use client";

import { NoteData } from "./constants";

interface StaffDisplayProps {
  note?: NoteData | null;
  showLabel?: boolean;
  animated?: boolean;
  size?: "sm" | "md" | "lg";
  onClickLabel?: (note: NoteData) => void;
  clickNote?: (note?: NoteData | null) => void;
}

/**
 * Musical staff (khuông nhạc) with 5 lines.
 * Renders a note at the correct vertical position based on staffPosition.
 *
 * staffPosition mapping (bottom to top):
 * 0 = C (below staff, needs ledger line)
 * 1 = D (space below line 1)
 * 2 = E (line 1)
 * 3 = F (space between line 1-2)
 * 4 = G (line 2)
 * 5 = A (space between line 2-3)
 * 6 = B (line 3)
 * 7 = C2 (space between line 3-4)
 */
export default function StaffDisplay({
  note,
  showLabel = true,
  animated = true,
  size = "md",
  onClickLabel,
  clickNote,
}: StaffDisplayProps) {
  const sizeConfig = {
    sm: { width: 160, height: 120, noteSize: 20, fontSize: 12, lineGap: 16 },
    md: { width: 260, height: 180, noteSize: 30, fontSize: 16, lineGap: 22 },
    lg: { width: 340, height: 220, noteSize: 36, fontSize: 20, lineGap: 26 },
  };

  const config = sizeConfig[size];
  const { width, height, noteSize, fontSize, lineGap } = config;

  // Staff starts from the bottom. 5 lines, evenly spaced from the center.
  // The staff "base" (line 1) starts near the bottom of the SVG.
  const staffTop = height * 0.2;
  const totalStaffHeight = lineGap * 4; // 4 gaps between 5 lines

  // Y position for each line (line 1 = bottom, line 5 = top)
  const lineYs = Array.from({ length: 5 }, (_, i) => staffTop + totalStaffHeight - i * lineGap);

  // Note Y position based on staffPosition
  // staffPosition 0 (C) = one step below line 1
  // staffPosition 2 (E) = line 1
  // each staffPosition step = half a lineGap
  const halfGap = lineGap / 2;
  const getNoteY = (pos: number) => {
    // Line 1 (E) is at lineYs[0], which corresponds to staffPosition 2
    return lineYs[0] + (2 - pos) * halfGap;
  };

  const noteY = note ? getNoteY(note.staffPosition) : 0;
  const noteX = width / 2;

  // Determine if note needs a ledger line (C below staff)
  const needsLedgerLine = note && note.staffPosition === 0;

  // Determine the color in hex for SVG
  const colorMap: Record<string, string> = {
    "bg-red-500": "#ef4444",
    "bg-orange-500": "#f97316",
    "bg-yellow-500": "#eab308",
    "bg-green-500": "#22c55e",
    "bg-blue-500": "#3b82f6",
    "bg-indigo-500": "#6366f1",
    "bg-purple-500": "#a855f7",
    "bg-pink-500": "#ec4899",
  };

  const noteColor = note ? colorMap[note.color] || "#3b82f6" : "#3b82f6";

  return (
    <div className={`relative inline-flex flex-col items-center ${animated && note ? "animate-fade-in" : ""}`}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="drop-shadow-lg"
        onClick={() => clickNote && clickNote(note)}
      >
        {/* Background */}
        <rect x="0" y="0" width={width} height={height} rx="16" fill="white" fillOpacity="0.9" />

        {/* 5 Staff Lines */}
        {lineYs.map((y, i) => (
          <line key={i} x1={20} y1={y} x2={width - 20} y2={y} stroke="#94a3b8" strokeWidth={1.5} />
        ))}

        {/* Ledger line for C (below staff) */}
        {needsLedgerLine && (
          <line
            x1={noteX - noteSize * 0.8}
            y1={getNoteY(0)}
            x2={noteX + noteSize * 0.8}
            y2={getNoteY(0)}
            stroke="#94a3b8"
            strokeWidth={1.5}
          />
        )}

        {/* Note */}
        {note && (
          <g className={animated ? "animate-note-appear" : ""}>
            {/* Note circle (oval shape like a real note) */}
            <ellipse
              cx={noteX}
              cy={noteY}
              rx={noteSize * 0.55}
              ry={noteSize * 0.4}
              fill={noteColor}
              stroke="white"
              strokeWidth={2}
              className="drop-shadow-md"
            />

            {/* Note stem */}
            <line
              x1={noteX + noteSize * 0.5}
              y1={noteY}
              x2={noteX + noteSize * 0.5}
              y2={noteY - noteSize * 1.8}
              stroke={noteColor}
              strokeWidth={2.5}
              strokeLinecap="round"
            />
          </g>
        )}
      </svg>

      {/* Label below the staff */}
      {showLabel && note && (
        <div
          className={`mt-2 px-4 py-1.5 rounded-full font-black text-white text-base sm:text-lg shadow-md ${note.color}`}
          onClick={() => note && onClickLabel && onClickLabel(note)}
        >
          {note.label} ({note.note})
        </div>
      )}

      {/* Custom animation styles */}
      <style jsx>{`
        @keyframes noteAppear {
          0% {
            opacity: 0;
            transform: translateY(-20px) scale(0.5);
          }
          60% {
            transform: translateY(5px) scale(1.1);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-note-appear {
          animation: noteAppear 0.5s ease-out forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
