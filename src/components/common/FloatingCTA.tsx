"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create a sentinel element at the hero section bottom
    const sentinel = document.getElementById("hero-sentinel");
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show floating CTA when hero is NOT visible (user scrolled past)
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[80] md:hidden p-3 pb-[max(env(safe-area-inset-bottom),12px)] bg-white/90 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] animate-in slide-in-from-bottom duration-300">
      <Link
        href="/auth/sign-up"
        className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#FF9C01] hover:bg-orange-500 text-slate-900 font-bold rounded-full text-base shadow-[0_4px_14px_0_rgba(255,156,1,0.39)] active:scale-[0.98] transition-all"
      >
        Trải nghiệm ngay
        <ArrowRight className="w-5 h-5" />
      </Link>
    </div>
  );
}
