"use client";

import { type GrowthDataPoint } from "@/libs/data/who-growth-standards";

interface GrowthChartProps {
  data: GrowthDataPoint[];
  childMonth: number;
  childValue: number;
  metric: "weight" | "height" | "bmi";
  gender: "boy" | "girl";
}

const CHART_WIDTH = 600;
const CHART_HEIGHT = 360;
const PADDING = { top: 30, right: 30, bottom: 50, left: 55 };
const INNER_W = CHART_WIDTH - PADDING.left - PADDING.right;
const INNER_H = CHART_HEIGHT - PADDING.top - PADDING.bottom;

const PERCENTILE_COLORS = {
  p97: "#ef4444",
  p85: "#f97316",
  p50: "#22c55e",
  p15: "#f97316",
  p3: "#ef4444",
};

const BAND_FILLS = [
  "rgba(239,68,68,0.08)", // below p3
  "rgba(249,115,22,0.08)", // p3-p15
  "rgba(34,197,94,0.10)", // p15-p85 (normal)
  "rgba(249,115,22,0.08)", // p85-p97
  "rgba(239,68,68,0.08)", // above p97
];

const METRIC_LABELS: Record<string, string> = {
  weight: "Cân nặng (kg)",
  height: "Chiều cao (cm)",
  bmi: "BMI (kg/m²)",
};

function scaleX(month: number, minMonth: number, maxMonth: number): number {
  return PADDING.left + ((month - minMonth) / (maxMonth - minMonth)) * INNER_W;
}

function scaleY(value: number, minVal: number, maxVal: number): number {
  return PADDING.top + INNER_H - ((value - minVal) / (maxVal - minVal)) * INNER_H;
}

function buildPath(
  data: GrowthDataPoint[],
  key: "p3" | "p15" | "p50" | "p85" | "p97",
  minMonth: number,
  maxMonth: number,
  minVal: number,
  maxVal: number,
): string {
  return data
    .map((d, i) => {
      const x = scaleX(d.month, minMonth, maxMonth);
      const y = scaleY(d[key], minVal, maxVal);
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
}

function buildAreaPath(
  data: GrowthDataPoint[],
  upperKey: "p3" | "p15" | "p50" | "p85" | "p97",
  lowerKey: "p3" | "p15" | "p50" | "p85" | "p97",
  minMonth: number,
  maxMonth: number,
  minVal: number,
  maxVal: number,
): string {
  const upper = data.map((d) => ({
    x: scaleX(d.month, minMonth, maxMonth),
    y: scaleY(d[upperKey], minVal, maxVal),
  }));
  const lower = data.map((d) => ({
    x: scaleX(d.month, minMonth, maxMonth),
    y: scaleY(d[lowerKey], minVal, maxVal),
  }));

  const forwardPath = upper.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const reversePath = [...lower].reverse().map((p) => `L${p.x},${p.y}`).join(" ");

  return `${forwardPath} ${reversePath} Z`;
}

export function GrowthChart({ data, childMonth, childValue, metric }: GrowthChartProps) {
  const minMonth = data[0].month;
  const maxMonth = data[data.length - 1].month;

  // Calculate Y-axis range with padding
  const allValues = data.flatMap((d) => [d.p3, d.p97]);
  allValues.push(childValue);
  const dataMin = Math.min(...allValues);
  const dataMax = Math.max(...allValues);
  const yPadding = (dataMax - dataMin) * 0.1;
  const minVal = Math.max(0, Math.floor(dataMin - yPadding));
  const maxVal = Math.ceil(dataMax + yPadding);

  // Child point
  const cx = scaleX(childMonth, minMonth, maxMonth);
  const cy = scaleY(childValue, minVal, maxVal);

  // X-axis ticks (every 12 months)
  const xTicks: number[] = [];
  for (let m = minMonth; m <= maxMonth; m += 12) {
    xTicks.push(m);
  }
  if (xTicks[xTicks.length - 1] !== maxMonth && maxMonth % 12 !== 0) {
    xTicks.push(maxMonth);
  }

  // Y-axis ticks
  const yRange = maxVal - minVal;
  const yStep = yRange <= 20 ? 2 : yRange <= 50 ? 5 : 10;
  const yTicks: number[] = [];
  for (let v = Math.ceil(minVal / yStep) * yStep; v <= maxVal; v += yStep) {
    yTicks.push(v);
  }

  const percentiles = ["p97", "p85", "p50", "p15", "p3"] as const;
  const bandPairs: [typeof percentiles[number], typeof percentiles[number]][] = [
    ["p85", "p97"],
    ["p50", "p85"],
    ["p15", "p50"],
    ["p3", "p15"],
  ];

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        className="w-full max-w-[600px] mx-auto"
        role="img"
        aria-label={`Biểu đồ ${METRIC_LABELS[metric]} theo chuẩn WHO`}
      >
        {/* Background */}
        <rect x={PADDING.left} y={PADDING.top} width={INNER_W} height={INNER_H} fill="#fafafa" rx="4" />

        {/* Grid lines */}
        {yTicks.map((v) => (
          <line
            key={`grid-${v}`}
            x1={PADDING.left}
            x2={PADDING.left + INNER_W}
            y1={scaleY(v, minVal, maxVal)}
            y2={scaleY(v, minVal, maxVal)}
            stroke="#e5e7eb"
            strokeWidth="0.5"
          />
        ))}

        {/* Percentile band fills */}
        {bandPairs.map(([lower, upper], i) => (
          <path
            key={`band-${i}`}
            d={buildAreaPath(data, upper, lower, minMonth, maxMonth, minVal, maxVal)}
            fill={BAND_FILLS[i]}
          />
        ))}

        {/* Normal zone highlight (p15-p85) */}
        <path
          d={buildAreaPath(data, "p85", "p15", minMonth, maxMonth, minVal, maxVal)}
          fill="rgba(34,197,94,0.06)"
        />

        {/* Percentile lines */}
        {percentiles.map((p) => (
          <path
            key={p}
            d={buildPath(data, p, minMonth, maxMonth, minVal, maxVal)}
            fill="none"
            stroke={PERCENTILE_COLORS[p]}
            strokeWidth={p === "p50" ? 2.5 : 1.5}
            strokeDasharray={p === "p50" ? "none" : "4 3"}
            opacity={p === "p50" ? 1 : 0.7}
          />
        ))}

        {/* Percentile labels */}
        {percentiles.map((p) => {
          const lastPoint = data[data.length - 1];
          const x = scaleX(lastPoint.month, minMonth, maxMonth) + 4;
          const y = scaleY(lastPoint[p], minVal, maxVal);
          const label = p.replace("p", "");
          return (
            <text
              key={`label-${p}`}
              x={x}
              y={y + 3}
              fontSize="9"
              fill={PERCENTILE_COLORS[p]}
              fontWeight="600"
            >
              {label}%
            </text>
          );
        })}

        {/* Child point */}
        {cx >= PADDING.left && cx <= PADDING.left + INNER_W && (
          <>
            {/* Crosshair lines */}
            <line x1={cx} x2={cx} y1={PADDING.top} y2={cy - 8} stroke="#6366f1" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.5" />
            <line x1={PADDING.left} x2={cx - 8} y1={cy} y2={cy} stroke="#6366f1" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.5" />

            {/* Glow */}
            <circle cx={cx} cy={cy} r="10" fill="#6366f1" opacity="0.15" />
            <circle cx={cx} cy={cy} r="6" fill="white" stroke="#6366f1" strokeWidth="2.5" />
            <circle cx={cx} cy={cy} r="2.5" fill="#6366f1" />

            {/* Value label */}
            <g>
              <rect x={cx - 22} y={cy - 26} width="44" height="18" rx="4" fill="#6366f1" />
              <text x={cx} y={cy - 14} textAnchor="middle" fontSize="10" fill="white" fontWeight="700">
                {childValue}
              </text>
            </g>
          </>
        )}

        {/* X-axis */}
        <line
          x1={PADDING.left}
          x2={PADDING.left + INNER_W}
          y1={PADDING.top + INNER_H}
          y2={PADDING.top + INNER_H}
          stroke="#d1d5db"
          strokeWidth="1"
        />
        {xTicks.map((m) => (
          <g key={`x-${m}`}>
            <line
              x1={scaleX(m, minMonth, maxMonth)}
              x2={scaleX(m, minMonth, maxMonth)}
              y1={PADDING.top + INNER_H}
              y2={PADDING.top + INNER_H + 5}
              stroke="#9ca3af"
              strokeWidth="1"
            />
            <text
              x={scaleX(m, minMonth, maxMonth)}
              y={PADDING.top + INNER_H + 18}
              textAnchor="middle"
              fontSize="10"
              fill="#6b7280"
            >
              {m < 12 ? `${m}th` : `${Math.floor(m / 12)} tuổi`}
            </text>
          </g>
        ))}

        {/* X-axis label */}
        <text
          x={PADDING.left + INNER_W / 2}
          y={CHART_HEIGHT - 5}
          textAnchor="middle"
          fontSize="11"
          fill="#9ca3af"
          fontWeight="600"
        >
          Tháng tuổi
        </text>

        {/* Y-axis */}
        <line
          x1={PADDING.left}
          x2={PADDING.left}
          y1={PADDING.top}
          y2={PADDING.top + INNER_H}
          stroke="#d1d5db"
          strokeWidth="1"
        />
        {yTicks.map((v) => (
          <text
            key={`y-${v}`}
            x={PADDING.left - 8}
            y={scaleY(v, minVal, maxVal) + 3}
            textAnchor="end"
            fontSize="10"
            fill="#6b7280"
          >
            {v}
          </text>
        ))}

        {/* Y-axis label */}
        <text
          x={14}
          y={PADDING.top + INNER_H / 2}
          textAnchor="middle"
          fontSize="11"
          fill="#9ca3af"
          fontWeight="600"
          transform={`rotate(-90, 14, ${PADDING.top + INNER_H / 2})`}
        >
          {METRIC_LABELS[metric]}
        </text>
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs font-medium text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-green-500 rounded-full inline-block" /> P50 (Trung bình)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-orange-500 rounded-full inline-block border-dashed" /> P15 / P85
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-red-500 rounded-full inline-block" /> P3 / P97
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-indigo-500 inline-block" /> Bé của bạn
        </span>
      </div>
    </div>
  );
}
