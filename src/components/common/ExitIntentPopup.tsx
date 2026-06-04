"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { X, Gift } from "lucide-react";

const SESSION_KEY = "exit_intent_shown";

export function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);

  const showPopup = useCallback(() => {
    if (typeof window === "undefined") return;
    // Only show once per session
    if (sessionStorage.getItem(SESSION_KEY)) return;
    sessionStorage.setItem(SESSION_KEY, "1");
    setVisible(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    // Desktop: detect when mouse leaves viewport from the top
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        showPopup();
      }
    };

    // Only add exit-intent on desktop (pointer devices)
    const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (isDesktop) {
      // Delay attaching so it doesn't fire immediately on page load
      const timer = setTimeout(() => {
        document.addEventListener("mouseleave", handleMouseLeave);
      }, 5000);

      return () => {
        clearTimeout(timer);
        document.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [showPopup]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Header gradient */}
        <div className="bg-gradient-to-br from-orange-400 to-red-500 px-8 pt-8 pb-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/patterns/cubes.png')] opacity-10" />
          <button
            onClick={() => setVisible(false)}
            className="cursor-pointer absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
            aria-label="Đóng"
          >
            <X size={18} strokeWidth={3} />
          </button>
          <div className="relative z-10">
            <div className="text-5xl mb-3">🎁</div>
            <h2 className="text-2xl font-extrabold font-[family-name:var(--font-baloo-2)] mb-2 drop-shadow-sm">
              Đừng bỏ lỡ!
            </h2>
            <p className="text-white/90 font-medium">Cho bé trải nghiệm 20+ trò chơi giáo dục hoàn toàn miễn phí</p>
          </div>
        </div>

        {/* Body */}
        <div className="bg-white px-8 py-6 text-center">
          <div className="flex items-center justify-center gap-6 mb-6 text-sm font-semibold text-slate-600">
            <span className="flex items-center gap-1.5">✅ Miễn phí</span>
            <span className="flex items-center gap-1.5">🔒 An toàn</span>
            <span className="flex items-center gap-1.5">🚫 Không QC</span>
          </div>
          <Link
            href="/games"
            onClick={() => setVisible(false)}
            className="flex items-center justify-center gap-2 w-full py-4 bg-[#FF9C01] hover:bg-orange-500 text-slate-900 font-bold rounded-full text-lg shadow-[0_8px_30px_rgb(255,156,1,0.3)] hover:shadow-[0_8px_30px_rgb(255,156,1,0.4)] active:scale-[0.98] transition-all"
          >
            <Gift className="w-5 h-5" />
            Trải nghiệm ngay — Miễn phí!
          </Link>
        </div>
      </div>
    </div>
  );
}
