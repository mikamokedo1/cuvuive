"use client";

import { useEffect, useRef, useMemo } from "react";
import Chart from "chart.js/auto";
import type { DailyDataPoint } from "@/libs/actions/dashboard";

interface ProgressChartProps {
  data: DailyDataPoint[];
  period: "today" | "yesterday" | "week" | "month";
}

export function ProgressChart({ data, period }: ProgressChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const isEmpty = useMemo(() => {
    return data.every((d) => d.lessons === 0 && d.minutes === 0);
  }, [data]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // Create linear gradients for area fills
    const orangeGradient = ctx.createLinearGradient(0, 0, 0, 160);
    orangeGradient.addColorStop(0, "rgba(249, 115, 22, 0.25)");
    orangeGradient.addColorStop(1, "rgba(249, 115, 22, 0.01)");

    const blueGradient = ctx.createLinearGradient(0, 0, 0, 160);
    blueGradient.addColorStop(0, "rgba(59, 130, 246, 0.2)");
    blueGradient.addColorStop(1, "rgba(59, 130, 246, 0.01)");

    // Determine max values scaled to multiples of 4
    const rawMaxL = Math.max(...data.map((d) => d.lessons), 0);
    const maxL = rawMaxL === 0 ? 4 : Math.ceil(rawMaxL / 4) * 4;

    const rawMaxM = Math.max(...data.map((d) => d.minutes), 0);
    const maxM = rawMaxM === 0 ? 4 : Math.ceil(rawMaxM / 4) * 4;

    const labels = data.map((d) => d.date);

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Bài học",
            data: data.map((d) => d.lessons),
            borderColor: "#f97316",
            borderWidth: 2.5,
            backgroundColor: orangeGradient,
            fill: true,
            tension: 0.35, // Smooth curves
            pointBackgroundColor: "#ffffff",
            pointBorderColor: "#f97316",
            pointBorderWidth: 1.5,
            pointRadius: data.length === 1 ? 4 : 2.5,
            pointHoverRadius: 5,
            yAxisID: "yLessons",
          },
          {
            label: "Phút học",
            data: data.map((d) => d.minutes),
            borderColor: "#3b82f6",
            borderWidth: 2,
            borderDash: [4, 2], // Dashed line for minutes
            backgroundColor: blueGradient,
            fill: true,
            tension: 0.35,
            pointBackgroundColor: "#ffffff",
            pointBorderColor: "#3b82f6",
            pointBorderWidth: 1.5,
            pointRadius: data.length === 1 ? 4 : 2.5,
            pointHoverRadius: 5,
            yAxisID: "yMinutes",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false, // Custom legend rendered in React below
          },
          tooltip: {
            backgroundColor: "rgba(15, 23, 42, 0.95)", // Elegant slate-900 background
            titleColor: "#94a3b8",
            titleFont: { family: "var(--font-baloo-2)", size: 11, weight: "bold" },
            bodyColor: "#ffffff",
            bodyFont: { size: 12, weight: 600 },
            padding: 10,
            cornerRadius: 8,
            displayColors: true,
            boxWidth: 6,
            boxHeight: 6,
            boxPadding: 4,
            callbacks: {
              label: (context) => {
                const label = context.dataset.label || "";
                const val = context.raw;
                const unit = label === "Bài học" ? " bài" : " phút";
                return ` ${label}: ${val}${unit}`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#94a3b8",
              font: { size: 9, weight: 600 },
            },
          },
          yLessons: {
            type: "linear",
            position: "left",
            min: 0,
            max: maxL,
            ticks: {
              stepSize: maxL / 4,
              color: "#f97316",
              font: { size: 9, weight: 700 },
            },
            grid: {
              color: "#f1f5f9",
            },
          },
          yMinutes: {
            type: "linear",
            position: "right",
            min: 0,
            max: maxM,
            ticks: {
              stepSize: maxM / 4,
              color: "#3b82f6",
              font: { size: 9, weight: 700 },
            },
            grid: {
              drawOnChartArea: false, // Don't overlay grid lines from both axes
            },
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [data, period]);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900 font-[family-name:var(--font-baloo-2)]">
          📈 Biểu đồ tiến trình
        </h2>
        <div className="flex items-center gap-4 text-sm font-semibold">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-orange-500" />
            Bài học
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-500" />
            Phút học
          </span>
        </div>
      </div>

      <div className="relative flex-1 min-h-[180px] w-full">
        <canvas ref={canvasRef} />

        {/* Empty state overlay */}
        {isEmpty && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-2xl">
            <p className="text-slate-400 font-medium text-center text-sm md:text-base">
              Chưa có dữ liệu học tập trong giai đoạn này.<br />
              Hãy cho bé bắt đầu học nhé! 🦉
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
