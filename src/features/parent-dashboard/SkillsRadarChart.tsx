"use client";

import { useEffect, useRef, useMemo } from "react";
import Chart from "chart.js/auto";
import type { CategoryStat } from "@/libs/actions/dashboard";

interface SkillsRadarChartProps {
  categories: CategoryStat[];
}

export function SkillsRadarChart({ categories }: SkillsRadarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const radarData = useMemo(() => {
    const logicCats = ["logic"];
    const mathCats = ["math"];
    const langCats = ["language", "english"];
    const artCats = ["art", "music"];

    let logicTotal = 0, logicCompleted = 0;
    let mathTotal = 0, mathCompleted = 0;
    let langTotal = 0, langCompleted = 0;
    let artTotal = 0, artCompleted = 0;
    let lifeTotal = 0, lifeCompleted = 0;

    categories.forEach((c) => {
      if (logicCats.includes(c.category)) {
        logicTotal += c.totalLessons;
        logicCompleted += c.completedLessons;
      } else if (mathCats.includes(c.category)) {
        mathTotal += c.totalLessons;
        mathCompleted += c.completedLessons;
      } else if (langCats.includes(c.category)) {
        langTotal += c.totalLessons;
        langCompleted += c.completedLessons;
      } else if (artCats.includes(c.category)) {
        artTotal += c.totalLessons;
        artCompleted += c.completedLessons;
      } else {
        // life-skill, science, geography, history
        lifeTotal += c.totalLessons;
        lifeCompleted += c.completedLessons;
      }
    });

    const getScore = (completed: number, total: number) => {
      return total > 0 ? Math.round((completed / total) * 100) : 0;
    };

    return [
      { name: "Tư duy", score: getScore(logicCompleted, logicTotal) },
      { name: "Toán học", score: getScore(mathCompleted, mathTotal) },
      { name: "Ngôn ngữ", score: getScore(langCompleted, langTotal) },
      { name: "Nghệ thuật", score: getScore(artCompleted, artTotal) },
      { name: "Kỹ năng sống", score: getScore(lifeCompleted, lifeTotal) },
    ];
  }, [categories]);

  const isEmpty = useMemo(() => {
    return radarData.every((d) => d.score === 0);
  }, [radarData]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: "radar",
      data: {
        labels: radarData.map((d) => d.name),
        datasets: [
          {
            label: "Thế mạnh của bé",
            data: radarData.map((d) => d.score),
            backgroundColor: "rgba(249, 115, 22, 0.2)", // Translucent orange
            borderColor: "#f97316", // Solid orange
            borderWidth: 2,
            pointBackgroundColor: "#ffffff",
            pointBorderColor: "#f97316",
            pointBorderWidth: 1.5,
            pointRadius: 3.5,
            pointHoverRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            titleColor: "#94a3b8",
            titleFont: { family: "var(--font-baloo-2)", size: 11, weight: "bold" },
            bodyColor: "#ffffff",
            bodyFont: { size: 12, weight: 600 },
            padding: 8,
            cornerRadius: 8,
            callbacks: {
              label: (context) => {
                return ` ${context.label}: ${context.raw}/100 điểm`;
              },
            },
          },
        },
        scales: {
          r: {
            angleLines: {
              color: "#f1f5f9",
            },
            grid: {
              color: "#f1f5f9",
            },
            pointLabels: {
              color: "#475569",
              font: {
                family: "var(--font-baloo-2)",
                size: 11,
                weight: "bold",
              },
            },
            ticks: {
              display: false, // Clean UI without circular grid numbers
            },
            min: 0,
            max: 100,
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [radarData]);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative h-full flex flex-col">
      <h2 className="text-xl font-bold text-slate-900 font-[family-name:var(--font-baloo-2)] mb-4">
        🕸️ Bản đồ thế mạnh
      </h2>
      <div className="relative flex-1 min-h-[180px] w-full flex items-center justify-center">
        <canvas ref={canvasRef} />

        {/* Empty state overlay */}
        {isEmpty && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-2xl">
            <p className="text-slate-400 font-medium text-center text-sm">
              Chưa có dữ liệu thế mạnh.<br />
              Bé cần hoàn thành bài học để vẽ bản đồ! 🦉
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
