"use client";

import { useEffect, useState, useCallback } from "react";
import { X, Download, Share } from "lucide-react";
import Image from "next/image";
import { useUser } from "@/context/UserContext";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const STORAGE_KEY = "a2hs_dismissed";
const MAX_DISMISSALS = 3;
const DISMISS_COOLDOWN_DAYS = 7;
const SHOW_DELAY_MS = 3000;

function shouldShowPrompt(): boolean {
  // Already in standalone mode (installed)
  if (
    typeof window !== "undefined" &&
    (window.matchMedia("(display-mode: standalone)").matches ||
      // @ts-expect-error – iOS Safari navigator property
      window.navigator.standalone === true)
  ) {
    return false;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return true;

    const data = JSON.parse(raw) as {
      count: number;
      lastDismissed: number;
    };

    if (data.count >= MAX_DISMISSALS) return false;

    const daysSince = (Date.now() - data.lastDismissed) / (1000 * 60 * 60 * 24);
    return daysSince >= DISMISS_COOLDOWN_DAYS;
  } catch {
    return true;
  }
}

function recordDismissal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const prev = raw ? (JSON.parse(raw) as { count: number; lastDismissed: number }) : { count: 0, lastDismissed: 0 };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        count: prev.count + 1,
        lastDismissed: Date.now(),
      }),
    );
  } catch {
    // localStorage not available
  }
}

function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

export function InstallPrompt() {
  const { user, isLoading } = useUser();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [visible, setVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  // Listen for the browser's install prompt event (Android / Chrome)
  useEffect(() => {
    if (isLoading || !user || !shouldShowPrompt()) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [user, isLoading]);

  // Detect iOS and show manual guide
  useEffect(() => {
    if (isLoading || !user || !shouldShowPrompt()) return;
    if (isIOS()) {
      setShowIOSGuide(true);
    }
  }, [user, isLoading]);

  // Delayed reveal
  useEffect(() => {
    if (!deferredPrompt && !showIOSGuide) return;

    const timer = setTimeout(() => {
      setVisible(true);
      // Trigger slide-up animation after mount
      requestAnimationFrame(() => setAnimateIn(true));
    }, SHOW_DELAY_MS);

    return () => clearTimeout(timer);
  }, [deferredPrompt, showIOSGuide]);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setVisible(false);
    } else {
      recordDismissal();
      setVisible(false);
    }
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  const handleDismiss = useCallback(() => {
    setAnimateIn(false);
    // Wait for slide-out animation
    setTimeout(() => {
      recordDismissal();
      setVisible(false);
    }, 300);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[90] flex justify-center p-4 pb-[max(env(safe-area-inset-bottom),16px)] transition-all duration-300 ease-out ${
        animateIn ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="w-full max-w-md rounded-2xl bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 pb-2">
          <Image
            src="/icons/android-chrome-192x192.png"
            alt="Cú Thông Minh"
            width={48}
            height={48}
            className="rounded-xl shadow-sm"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-gray-800 font-display leading-tight">Cú Thông Minh</h3>
            <p className="text-xs text-gray-500 truncate">cuthongminh.com</p>
          </div>
          <button
            onClick={handleDismiss}
            className="cursor-pointer flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-400 hover:text-gray-600"
            aria-label="Đóng"
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* Content */}
        <div className="px-4 pb-4">
          {showIOSGuide ? (
            /* iOS Guide */
            <>
              <p className="text-sm text-gray-600 mb-3">Thêm app vào Màn hình chính để truy cập nhanh hơn:</p>
              <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                  <Share size={20} className="text-blue-600" />
                </div>
                <div className="flex-1 text-sm">
                  <p className="font-semibold text-gray-800">Bước 1:</p>
                  <p className="text-gray-600 flex">
                    Nhấn nút{" "}
                    <div className="flex mx-1 gap-1">
                      <Share size={20} /> <strong>Chia sẻ</strong>
                    </div>{" "}
                    ở thanh dưới
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-green-50 rounded-xl p-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg text-xl">➕</div>
                <div className="flex-1 text-sm">
                  <p className="font-semibold text-gray-800">Bước 2:</p>
                  <p className="text-gray-600">
                    Chọn <strong>&quot;Thêm vào Màn Hình chính&quot;</strong>
                  </p>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="cursor-pointer w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
              >
                Đã hiểu! 👍
              </button>
            </>
          ) : (
            /* Android / Chrome */
            <>
              <p className="text-sm text-gray-600 mb-3">
                Thêm vào Màn hình chính để mở nhanh — không cần gõ trên trình duyệt!
              </p>
              <button
                onClick={handleInstall}
                className="cursor-pointer w-full py-3 rounded-xl bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Thêm vào Màn hình chính
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
