"use client";

import { useState, useCallback } from "react";
import { Ruler, Weight, Baby, Calculator, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  getDataset,
  getPercentileBand,
  interpolate,
  formatAge,
  type Gender,
} from "@/libs/data/who-growth-standards";
import { GrowthChart } from "./GrowthChart";

interface Result {
  ageMonths: number;
  gender: Gender;
  weight: number | null;
  height: number | null;
  bmi: number | null;
  weightBand: ReturnType<typeof getPercentileBand> | null;
  heightBand: ReturnType<typeof getPercentileBand> | null;
  bmiBand: ReturnType<typeof getPercentileBand> | null;
  weightP50: number | null;
  heightP50: number | null;
}

const COLOR_MAP: Record<string, string> = {
  green: "bg-emerald-50 border-emerald-200 text-emerald-800",
  orange: "bg-amber-50 border-amber-200 text-amber-800",
  red: "bg-red-50 border-red-200 text-red-800",
  gray: "bg-slate-50 border-slate-200 text-slate-600",
};

const ICON_COLOR_MAP: Record<string, string> = {
  green: "text-emerald-500",
  orange: "text-amber-500",
  red: "text-red-500",
  gray: "text-slate-400",
};

export function GrowthCalculator() {
  const [gender, setGender] = useState<Gender>("boy");
  const [ageYears, setAgeYears] = useState("");
  const [ageMonths, setAgeMonths] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [activeTab, setActiveTab] = useState<"weight" | "height">("weight");

  const calculate = useCallback(() => {
    const years = parseInt(ageYears) || 0;
    const months = parseInt(ageMonths) || 0;
    const totalMonths = years * 12 + months;
    const w = parseFloat(weight) || null;
    const h = parseFloat(height) || null;

    if (totalMonths < 0 || totalMonths > 96) {
      return;
    }

    const weightData = getDataset("weight", gender);
    const heightData = getDataset("height", gender);

    let bmiValue: number | null = null;
    if (w && h && h > 0 && totalMonths >= 24) {
      const hMeters = h / 100;
      bmiValue = Number((w / (hMeters * hMeters)).toFixed(1));
    }

    const bmiData = getDataset("bmi", gender);

    setResult({
      ageMonths: totalMonths,
      gender,
      weight: w,
      height: h,
      bmi: bmiValue,
      weightBand: w ? getPercentileBand(weightData, totalMonths, w) : null,
      heightBand: h ? getPercentileBand(heightData, totalMonths, h) : null,
      bmiBand: bmiValue && totalMonths >= 24 ? getPercentileBand(bmiData, totalMonths, bmiValue) : null,
      weightP50: interpolate(weightData, totalMonths, "p50"),
      heightP50: interpolate(heightData, totalMonths, "p50"),
    });
  }, [gender, ageYears, ageMonths, weight, height]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculate();
  };

  const totalMonths = (parseInt(ageYears) || 0) * 12 + (parseInt(ageMonths) || 0);
  const isValid = totalMonths >= 0 && totalMonths <= 96 && (weight || height);

  return (
    <div className="space-y-8">
      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
        {/* Gender Selection */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3">Giới tính của bé</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setGender("boy")}
              className={`flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 border-2 ${
                gender === "boy"
                  ? "bg-blue-50 border-blue-400 text-blue-700 shadow-sm"
                  : "bg-white border-slate-200 text-slate-500 hover:border-blue-200"
              }`}
            >
              <span className="text-lg">👦</span> Bé trai
            </button>
            <button
              type="button"
              onClick={() => setGender("girl")}
              className={`flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 border-2 ${
                gender === "girl"
                  ? "bg-pink-50 border-pink-400 text-pink-700 shadow-sm"
                  : "bg-white border-slate-200 text-slate-500 hover:border-pink-200"
              }`}
            >
              <span className="text-lg">👧</span> Bé gái
            </button>
          </div>
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3">
            <Baby className="w-4 h-4 inline-block mr-1 text-orange-500" />
            Tuổi của bé
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <input
                type="number"
                min="0"
                max="8"
                value={ageYears}
                onChange={(e) => setAgeYears(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-center text-lg font-bold text-slate-900 placeholder:text-slate-300"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium">năm</span>
            </div>
            <div className="relative">
              <input
                type="number"
                min="0"
                max="11"
                value={ageMonths}
                onChange={(e) => setAgeMonths(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-center text-lg font-bold text-slate-900 placeholder:text-slate-300"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium">tháng</span>
            </div>
          </div>
        </div>

        {/* Weight & Height */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">
              <Weight className="w-4 h-4 inline-block mr-1 text-orange-500" />
              Cân nặng
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                min="0"
                max="60"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="0.0"
                className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-center text-lg font-bold text-slate-900 placeholder:text-slate-300"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium">kg</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">
              <Ruler className="w-4 h-4 inline-block mr-1 text-orange-500" />
              Chiều cao
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                min="0"
                max="160"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="0.0"
                className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-center text-lg font-bold text-slate-900 placeholder:text-slate-300"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium">cm</span>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isValid}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-slate-300 disabled:to-slate-300 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-200 disabled:cursor-not-allowed"
        >
          <Calculator className="w-5 h-5" />
          Tra cứu ngay
        </button>
      </form>

      {/* Results */}
      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Age display */}
          <div className="text-center">
            <p className="text-sm text-slate-500 font-medium">Kết quả cho</p>
            <p className="text-2xl font-bold text-slate-900 font-[family-name:var(--font-baloo-2)]">
              {result.gender === "boy" ? "👦" : "👧"} Bé {result.gender === "boy" ? "trai" : "gái"} — {formatAge(result.ageMonths)}
            </p>
          </div>

          {/* Result Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {result.weightBand && result.weight && (
              <div className={`rounded-2xl border-2 p-5 ${COLOR_MAP[result.weightBand.color]}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Weight className={`w-5 h-5 ${ICON_COLOR_MAP[result.weightBand.color]}`} />
                  <span className="text-sm font-bold uppercase tracking-wide">Cân nặng</span>
                </div>
                <p className="text-3xl font-extrabold font-[family-name:var(--font-baloo-2)]">
                  {result.weight} kg
                </p>
                <p className="text-sm font-bold mt-1">{result.weightBand.label}</p>
                <p className="text-xs mt-1 opacity-80">{result.weightBand.description}</p>
                {result.weightP50 && (
                  <p className="text-xs mt-2 opacity-60">
                    Trung bình WHO: {result.weightP50} kg
                  </p>
                )}
              </div>
            )}

            {result.heightBand && result.height && (
              <div className={`rounded-2xl border-2 p-5 ${COLOR_MAP[result.heightBand.color]}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Ruler className={`w-5 h-5 ${ICON_COLOR_MAP[result.heightBand.color]}`} />
                  <span className="text-sm font-bold uppercase tracking-wide">Chiều cao</span>
                </div>
                <p className="text-3xl font-extrabold font-[family-name:var(--font-baloo-2)]">
                  {result.height} cm
                </p>
                <p className="text-sm font-bold mt-1">{result.heightBand.label}</p>
                <p className="text-xs mt-1 opacity-80">{result.heightBand.description}</p>
                {result.heightP50 && (
                  <p className="text-xs mt-2 opacity-60">
                    Trung bình WHO: {result.heightP50} cm
                  </p>
                )}
              </div>
            )}

            {result.bmiBand && result.bmi && (
              <div className={`rounded-2xl border-2 p-5 sm:col-span-2 ${COLOR_MAP[result.bmiBand.color]}`}>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className={`w-5 h-5 ${ICON_COLOR_MAP[result.bmiBand.color]}`} />
                  <span className="text-sm font-bold uppercase tracking-wide">BMI theo tuổi</span>
                </div>
                <p className="text-3xl font-extrabold font-[family-name:var(--font-baloo-2)]">
                  {result.bmi}
                </p>
                <p className="text-sm font-bold mt-1">{result.bmiBand.label}</p>
                <p className="text-xs mt-1 opacity-80">{result.bmiBand.description}</p>
              </div>
            )}
          </div>

          {/* Chart tabs */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <button
                onClick={() => setActiveTab("weight")}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  activeTab === "weight"
                    ? "bg-orange-100 text-orange-700"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                📊 Cân nặng
              </button>
              <button
                onClick={() => setActiveTab("height")}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  activeTab === "height"
                    ? "bg-orange-100 text-orange-700"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                📏 Chiều cao
              </button>
            </div>

            {activeTab === "weight" && result.weight && (
              <GrowthChart
                data={getDataset("weight", result.gender)}
                childMonth={result.ageMonths}
                childValue={result.weight}
                metric="weight"
                gender={result.gender}
              />
            )}
            {activeTab === "height" && result.height && (
              <GrowthChart
                data={getDataset("height", result.gender)}
                childMonth={result.ageMonths}
                childValue={result.height}
                metric="height"
                gender={result.gender}
              />
            )}

            {activeTab === "weight" && !result.weight && (
              <p className="text-center text-slate-400 py-8">Nhập cân nặng để xem biểu đồ</p>
            )}
            {activeTab === "height" && !result.height && (
              <p className="text-center text-slate-400 py-8">Nhập chiều cao để xem biểu đồ</p>
            )}
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-3xl border border-orange-100 p-6 md:p-8 text-center">
            <p className="text-lg font-bold text-slate-900 mb-2 font-[family-name:var(--font-baloo-2)]">
              🦉 Bé phát triển tốt rồi! Cho bé chơi trò chơi trí tuệ nhé!
            </p>
            <p className="text-sm text-slate-500 mb-4">
              Trò chơi giáo dục Cú Thông Minh giúp bé phát triển tư duy toàn diện
            </p>
            <Link
              href="/games"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-colors shadow-md hover:shadow-lg"
            >
              Khám phá trò chơi <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
