"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="vi">
      <body>
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-100 flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            {/* Owl illustration */}
            <div className="text-8xl mb-6 animate-bounce-subtle">🦉</div>

            <h1 className="text-3xl font-display font-bold text-orange-600 mb-3">Ôi! Có lỗi xảy ra rồi!</h1>

            <p className="text-lg text-gray-600 mb-8 font-sans">Đừng lo, hãy thử lại nhé!</p>

            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xl font-bold text-white
                         bg-gradient-to-b from-orange-400 to-orange-600
                         shadow-[0_6px_0_#b45309,0_10px_20px_rgba(0,0,0,0.25)]
                         hover:-translate-y-0.5 hover:brightness-105
                         active:translate-y-1 active:brightness-95
                         transition-all duration-150 cursor-pointer"
            >
              Thử lại
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
