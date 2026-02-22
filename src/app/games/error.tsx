"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GamesError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Game error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* Sleeping owl */}
        <div className="text-8xl mb-6">😴🦉</div>

        <h1 className="text-3xl font-display font-bold text-blue-600 mb-3">Trò chơi bị lỗi rồi!</h1>

        <p className="text-lg text-gray-600 mb-8 font-sans">Cú con đang sửa lỗi, bạn hãy thử lại nhé!</p>

        <div className="flex flex-col gap-4 items-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xl font-bold text-white
                       bg-gradient-to-b from-cyan-400 to-blue-600
                       shadow-[0_6px_0_#0284c7,0_10px_20px_rgba(0,0,0,0.25)]
                       hover:-translate-y-0.5 hover:brightness-105
                       active:translate-y-1 active:brightness-95
                       transition-all duration-150 cursor-pointer"
          >
            🔄 Thử lại
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xl font-bold text-white
                       bg-gradient-to-b from-lime-400 to-green-600
                       shadow-[0_6px_0_#2f7d32,0_10px_20px_rgba(0,0,0,0.25)]
                       hover:-translate-y-0.5 hover:brightness-105
                       active:translate-y-1 active:brightness-95
                       transition-all duration-150"
          >
            🏠 Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
