"use client";

import { useState, useCallback, useMemo } from "react";
import { Search, Shuffle, Heart, ArrowRight, Volume2 } from "lucide-react";
import Link from "next/link";
import {
  ENGLISH_NAMES,
  searchNames,
  getRandomNames,
  TIER_LABELS,
  GENDER_LABELS,
  type EnglishName,
} from "@/libs/data/english-names";

type GenderFilter = "all" | "boy" | "girl";

function NameCard({ name, isFavorite, onToggleFavorite }: { name: EnglishName; isFavorite: boolean; onToggleFavorite: () => void }) {
  const tierInfo = TIER_LABELS[name.tier];
  const genderInfo = GENDER_LABELS[name.gender];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 p-5 relative group">
      {/* Favorite button */}
      <button
        onClick={onToggleFavorite}
        className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-pink-50 transition-colors"
        aria-label={isFavorite ? "Bỏ yêu thích" : "Yêu thích"}
      >
        <Heart className={`w-4 h-4 transition-colors ${isFavorite ? "fill-pink-500 text-pink-500" : "text-slate-300 group-hover:text-slate-400"}`} />
      </button>

      {/* Name */}
      <div className="mb-3">
        <h3 className="text-2xl font-extrabold text-slate-900 font-[family-name:var(--font-baloo-2)]">
          {name.name}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-slate-400 font-medium flex items-center gap-1">
            <Volume2 className="w-3 h-3" /> /{name.phonetic}/
          </span>
          <span className={`text-xs ${genderInfo.color} font-bold`}>
            {genderInfo.icon} {genderInfo.label}
          </span>
        </div>
      </div>

      {/* Meaning */}
      <p className="text-sm text-slate-600 font-medium mb-3">
        <span className="text-orange-500 font-bold">Nghĩa:</span> {name.meaning}
      </p>

      {/* Vietnamese equivalents */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {name.vietnameseMatch.map((v) => (
          <span key={v} className="px-2 py-0.5 bg-orange-50 text-orange-700 text-xs font-bold rounded-full border border-orange-100">
            {v}
          </span>
        ))}
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-2 text-xs">
        <span className={`px-2 py-0.5 rounded-full font-bold ${tierInfo.color}`}>
          {tierInfo.label}
        </span>
        <span className="text-slate-400">•</span>
        <span className="text-slate-400 font-medium">{name.origin}</span>
      </div>

      {/* Note */}
      {name.note && (
        <p className="text-xs text-slate-400 mt-2 italic">💡 {name.note}</p>
      )}
    </div>
  );
}

export function NameFinder() {
  const [query, setQuery] = useState("");
  const [gender, setGender] = useState<GenderFilter>("all");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [randomSeed, setRandomSeed] = useState(0);

  const results = useMemo(() => {
    if (showFavoritesOnly) {
      let faves = ENGLISH_NAMES.filter((n) => favorites.has(n.name));
      if (gender !== "all") {
        faves = faves.filter((n) => n.gender === gender || n.gender === "unisex");
      }
      return faves;
    }

    if (query.trim()) {
      return searchNames(query, gender === "all" ? "all" : gender);
    }

    // No query — show random featured names
    return getRandomNames(12, gender === "all" ? "all" : gender);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, gender, showFavoritesOnly, favorites, randomSeed]);

  const toggleFavorite = useCallback((name: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }, []);

  const shuffle = useCallback(() => {
    setQuery("");
    setShowFavoritesOnly(false);
    setRandomSeed((s) => s + 1);
  }, []);

  // Quick suggestions
  const suggestions = ["Minh", "Ngọc", "Hải", "Phúc", "Dũng", "Xuân", "An", "Duyên"];

  return (
    <div className="space-y-6">
      {/* Search form */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-5">
        {/* Gender filter */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3">Giới tính của bé</label>
          <div className="grid grid-cols-3 gap-2">
            {(["all", "boy", "girl"] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGender(g)}
                className={`px-4 py-3 rounded-2xl font-bold text-sm transition-all duration-200 border-2 ${
                  gender === g
                    ? g === "boy"
                      ? "bg-blue-50 border-blue-400 text-blue-700"
                      : g === "girl"
                        ? "bg-pink-50 border-pink-400 text-pink-700"
                        : "bg-orange-50 border-orange-400 text-orange-700"
                    : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
              >
                {g === "all" ? "🌟 Tất cả" : g === "boy" ? "👦 Bé trai" : "👧 Bé gái"}
              </button>
            ))}
          </div>
        </div>

        {/* Search input */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3">
            <Search className="w-4 h-4 inline-block mr-1 text-orange-500" />
            Nhập tên tiếng Việt hoặc ý nghĩa
          </label>
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setShowFavoritesOnly(false); }}
              placeholder="VD: Minh, Ngọc, dũng cảm, ánh sáng..."
              className="w-full px-5 py-4 rounded-2xl border-2 border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-lg font-medium text-slate-900 placeholder:text-slate-300 pr-12"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
          </div>
        </div>

        {/* Quick suggestions */}
        <div>
          <p className="text-xs font-bold text-slate-400 mb-2">Gợi ý nhanh:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => { setQuery(s); setShowFavoritesOnly(false); }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  query === s
                    ? "bg-orange-100 text-orange-700 border-orange-200"
                    : "bg-slate-50 text-slate-500 border-slate-100 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={shuffle}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition-all text-sm"
          >
            <Shuffle className="w-4 h-4" /> Gợi ý ngẫu nhiên
          </button>
          {favorites.size > 0 && (
            <button
              onClick={() => { setShowFavoritesOnly(!showFavoritesOnly); setQuery(""); }}
              className={`flex items-center gap-2 px-5 py-3 font-bold rounded-2xl transition-all text-sm border-2 ${
                showFavoritesOnly
                  ? "bg-pink-50 border-pink-300 text-pink-700"
                  : "bg-white border-slate-200 text-slate-500 hover:border-pink-200"
              }`}
            >
              <Heart className={`w-4 h-4 ${showFavoritesOnly ? "fill-pink-500" : ""}`} />
              Yêu thích ({favorites.size})
            </button>
          )}
        </div>
      </div>

      {/* Results header */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-slate-500">
          {showFavoritesOnly
            ? `❤️ ${results.length} tên yêu thích`
            : query
              ? `🔍 ${results.length} kết quả cho "${query}"`
              : `✨ ${results.length} gợi ý cho bé`}
        </p>
      </div>

      {/* Results grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((name) => (
            <NameCard
              key={name.name}
              name={name}
              isFavorite={favorites.has(name.name)}
              onToggleFavorite={() => toggleFavorite(name.name)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-6xl mb-4">🤔</p>
          <p className="text-lg font-bold text-slate-700 mb-2">Không tìm thấy kết quả</p>
          <p className="text-sm text-slate-400">
            Thử tìm bằng từ khóa khác hoặc bấm &quot;Gợi ý ngẫu nhiên&quot;
          </p>
        </div>
      )}

      {/* CTA */}
      <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-3xl border border-orange-100 p-6 md:p-8 text-center">
        <p className="text-lg font-bold text-slate-900 mb-2 font-[family-name:var(--font-baloo-2)]">
          🦉 Bé đã có tên đẹp rồi! Cho bé học chữ cái nhé!
        </p>
        <p className="text-sm text-slate-500 mb-4">
          Cú Thông Minh giúp bé 3-8 tuổi học chữ cái tiếng Việt và tiếng Anh qua trò chơi tương tác
        </p>
        <Link
          href="/hoc-tieng-viet-cho-be"
          className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-colors shadow-md hover:shadow-lg"
        >
          Học chữ cái cùng Cú <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
