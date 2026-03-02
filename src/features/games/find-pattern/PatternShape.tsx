"use client";

import { PatternShapeType } from "./constants";

interface PatternShapeProps {
  shape: PatternShapeType;
  color: string;
  size?: number;
  className?: string;
  isPlaceholder?: boolean;
  onClick?: () => void;
}

/**
 * Renders a colorful SVG shape used in pattern sequences.
 */
export function PatternShape({
  shape,
  color,
  size = 48,
  className = "",
  isPlaceholder = false,
  onClick,
}: PatternShapeProps) {
  const fill = isPlaceholder ? "#E5E7EB" : color;
  const stroke = isPlaceholder ? "#D1D5DB" : darkenColor(color, 20);
  const strokeWidth = 2;

  const renderShape = () => {
    switch (shape) {
      case "circle":
        return (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - strokeWidth}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        );
      case "square":
        return (
          <rect
            x={strokeWidth}
            y={strokeWidth}
            width={size - strokeWidth * 2}
            height={size - strokeWidth * 2}
            rx={4}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        );
      case "triangle":
        return (
          <polygon
            points={`${size / 2},${strokeWidth} ${size - strokeWidth},${size - strokeWidth} ${strokeWidth},${size - strokeWidth}`}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
        );
      case "star": {
        const cx = size / 2;
        const cy = size / 2;
        const outerR = size / 2 - strokeWidth;
        const innerR = outerR * 0.4;
        const points = [];
        for (let i = 0; i < 5; i++) {
          const outerAngle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
          const innerAngle = outerAngle + Math.PI / 5;
          points.push(`${cx + Math.cos(outerAngle) * outerR},${cy + Math.sin(outerAngle) * outerR}`);
          points.push(`${cx + Math.cos(innerAngle) * innerR},${cy + Math.sin(innerAngle) * innerR}`);
        }
        return (
          <polygon
            points={points.join(" ")}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
        );
      }
      case "hexagon": {
        const cx = size / 2;
        const cy = size / 2;
        const r = size / 2 - strokeWidth;
        const pts = [];
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI * 2 * i) / 6 - Math.PI / 6;
          pts.push(`${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`);
        }
        return (
          <polygon
            points={pts.join(" ")}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
        );
      }
      case "diamond":
        return (
          <polygon
            points={`${size / 2},${strokeWidth} ${size - strokeWidth},${size / 2} ${size / 2},${size - strokeWidth} ${strokeWidth},${size / 2}`}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
        );
      default:
        return null;
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`inline-block drop-shadow-md ${className} ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      {!isPlaceholder && renderShape()}
      {/* Shine effect */}
      {!isPlaceholder && (
        <ellipse cx={size * 0.38} cy={size * 0.35} rx={size * 0.12} ry={size * 0.08} fill="white" opacity={0.4} />
      )}
      {/* Question mark for placeholder */}
      {isPlaceholder && (
        <text x={size / 2} y={size} textAnchor="middle" fontSize={size} fontWeight="bold" fill="#9CA3AF">
          ?
        </text>
      )}
    </svg>
  );
}

/**
 * Darken a hex color by a percentage
 */
function darkenColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, (num >> 16) - Math.round(255 * (percent / 100)));
  const g = Math.max(0, ((num >> 8) & 0x00ff) - Math.round(255 * (percent / 100)));
  const b = Math.max(0, (num & 0x0000ff) - Math.round(255 * (percent / 100)));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
