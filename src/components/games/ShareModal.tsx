"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { ActionButton } from "@/components/common/ActionButton";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { COURSES } from "@/libs/constants/courses";
import { useUser } from "@/context/UserContext";

const owlSayHi = "https://assets.cuthongminh.com/games/common/owl-say-hi.webp";
const star = "https://assets.cuthongminh.com/games/star.webp";

const BASE_URL = "https://cuthongminh.com";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameSlug: string;
}

export function ShareModal({ isOpen, onClose, gameSlug }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const { user } = useUser();

  const course = COURSES.find((c) => c.id === gameSlug);
  const gameTitle = course?.title || "Trò chơi";
  const seoData = GAME_SEO[gameSlug];
  const logoUrl = seoData?.ogImage || "";
  const kidName = (user?.user_metadata?.kidName as string) || "";
  const gameUrl = `${BASE_URL}/games/${gameSlug}`;
  const shareUrl = kidName
    ? `${BASE_URL}/share/${gameSlug}?name=${encodeURIComponent(kidName)}`
    : `${BASE_URL}/share/${gameSlug}`;
  const displayName = kidName ? `Bé ${kidName}` : "Bé";
  const congratsMessage = `🎉 Chúc mừng ${displayName} đã hoàn thành khóa học "${gameTitle}" trên Cú Thông Minh! 🦉\n\nCùng bé khám phá ngay nhé:`;

  const handleShareNative = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: gameTitle,
          text: congratsMessage,
          url: shareUrl,
        });
      } catch {
        // User cancelled or share failed - ignore
      }
    }
  }, [gameTitle, congratsMessage, shareUrl]);

  const handleCopyLink = useCallback(async () => {
    const textToCopy = `${congratsMessage}\n${shareUrl}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = textToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [congratsMessage, shareUrl]);

  const canNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative w-full max-w-md animate-in fade-in zoom-in duration-300">
        <div className="bg-white rounded-[32px] border-[8px] border-[#FFD057] p-6 shadow-[0_0_40px_rgba(255,208,87,0.6)] flex flex-col items-center text-center relative overflow-visible">
          {/* Star Decoration */}
          <div className="absolute -top-6 -right-6 w-16 h-16 animate-pulse">
            <Image src={star} alt="Star" width={64} height={64} className="object-contain" sizes="64px" />
          </div>
          <div className="absolute -top-5 -left-5 w-12 h-12 animate-pulse delay-300">
            <Image src={star} alt="Star" width={48} height={48} className="object-contain" sizes="48px" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-extrabold text-[#FF6B00] mb-2 font-nunito drop-shadow-sm">
            Chia sẻ thành tích! 🎉
          </h2>

          {/* Game Logo */}
          {logoUrl && (
            <div className="relative w-28 h-28 my-2">
              <Image src={logoUrl} alt={gameTitle} fill className="object-contain drop-shadow-xl" sizes="112px" />
            </div>
          )}

          {/* Congrats Message */}
          <p className="text-slate-600 text-base font-medium my-3 leading-relaxed">
            Chúc mừng bé đã hoàn thành khóa học <br />
            <span className="bg-yellow-400 text-white px-2 py-0.5 rounded-lg font-bold shadow-sm">{gameTitle}</span>!
            Chia sẻ niềm vui với mọi người nhé!
          </p>

          {/* Share Buttons */}
          <div className="flex flex-col gap-3 w-full max-w-[280px] mt-2">
            {/* Native Share (mobile - sends text + URL) */}
            {canNativeShare && (
              <button
                onClick={handleShareNative}
                className="flex items-center justify-center gap-3 w-full py-3 px-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-base shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                Chia sẻ ngay
              </button>
            )}

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-3 w-full py-3 px-5 rounded-full bg-emerald-500 text-white font-bold text-base shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
              {copied ? "✅ Đã copy!" : "Copy nội dung"}
            </button>
          </div>

          {/* Skip Button */}
          <button
            onClick={onClose}
            className="mt-4 text-slate-400 text-sm font-medium hover:text-slate-600 transition-colors cursor-pointer"
          >
            Bỏ qua
          </button>

          {/* Bottom Owl */}
          <div className="absolute -bottom-8 -right-4 w-20 h-20">
            <Image src={owlSayHi} alt="Owl" fill className="object-contain drop-shadow-lg" sizes="80px" />
          </div>
        </div>
      </div>
    </div>
  );
}
