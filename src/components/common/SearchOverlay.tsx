"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, Gamepad2, BookOpen, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  searchItems,
  getGameSearchItems,
  type SearchItem,
} from "@/libs/utils/search-data";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  blogItems?: SearchItem[];
}

export function SearchOverlay({ isOpen, onClose, blogItems = [] }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Build combined search index
  const allItems = useCallback(() => {
    const games = getGameSearchItems();
    return [...games, ...blogItems];
  }, [blogItems]);

  // Search results
  const results = query.trim()
    ? searchItems(query, allItems())
    : [];

  const gameResults = results.filter((r) => r.type === "game").slice(0, 5);
  const blogResults = results.filter((r) => r.type === "blog").slice(0, 5);
  const hasResults = gameResults.length > 0 || blogResults.length > 0;

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      // Small delay to allow animation
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Tìm kiếm"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-[fadeIn_200ms_ease-out]"
        onClick={onClose}
      />

      {/* Search Panel */}
      <div className="relative z-10 w-full max-w-2xl mx-auto mt-[10vh] px-4 animate-[slideDown_300ms_ease-out]">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm trò chơi, bài viết..."
              className="flex-1 text-lg text-slate-800 placeholder:text-slate-400 outline-none bg-transparent font-medium font-[family-name:var(--font-nunito-sans)]"
              autoComplete="off"
              id="search-input"
            />
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
              aria-label="Đóng tìm kiếm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {query.trim() && !hasResults && (
              <div className="px-5 py-10 text-center">
                <p className="text-slate-400 font-medium">
                  Không tìm thấy kết quả cho &ldquo;{query}&rdquo;
                </p>
                <p className="text-sm text-slate-300 mt-1">
                  Thử tìm với từ khóa khác
                </p>
              </div>
            )}

            {/* Game Results */}
            {gameResults.length > 0 && (
              <div className="px-3 py-3">
                <div className="px-2 py-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <Gamepad2 className="w-3.5 h-3.5" />
                  Trò chơi
                </div>
                {gameResults.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-orange-50 transition-colors group"
                  >
                    {item.icon && (
                      <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden group-hover:border-orange-200 transition-colors">
                        <Image
                          src={item.icon}
                          alt=""
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-700 group-hover:text-orange-600 transition-colors truncate">
                        {item.title}
                      </p>
                      {item.category && (
                        <p className="text-xs text-slate-400 truncate">
                          {item.category}
                        </p>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-orange-400 shrink-0 transition-colors" />
                  </Link>
                ))}
              </div>
            )}

            {/* Blog Results */}
            {blogResults.length > 0 && (
              <div className="px-3 py-3 border-t border-slate-50">
                <div className="px-2 py-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <BookOpen className="w-3.5 h-3.5" />
                  Bài viết
                </div>
                {blogResults.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-orange-50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 group-hover:bg-orange-100 transition-colors">
                      <BookOpen className="w-5 h-5 text-orange-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-700 group-hover:text-orange-600 transition-colors truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        {item.description}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-orange-400 shrink-0 transition-colors" />
                  </Link>
                ))}
              </div>
            )}

            {/* Empty state — no query */}
            {!query.trim() && (
              <div className="px-5 py-8 text-center">
                <p className="text-slate-400 font-medium text-sm">
                  Nhập từ khóa để tìm trò chơi hoặc bài viết
                </p>
                <div className="flex items-center justify-center gap-2 mt-3 text-xs text-slate-300">
                  <kbd className="px-2 py-0.5 rounded bg-slate-100 text-slate-500 font-mono font-bold">
                    ESC
                  </kbd>
                  <span>để đóng</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
