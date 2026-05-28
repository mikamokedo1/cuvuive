"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useCallback } from "react";
import { ActionButton } from "@/components/common/ActionButton";

const owlSayHi = "https://assets.cuthongminh.com/games/common/owl-say-hi.webp";

export interface VoiceChatNotifyModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Primary emoji/icon displayed above the title */
  icon?: string;
  /** Modal title */
  title: string;
  /** Modal description text */
  description: string;
  /** Primary action button config */
  primaryAction?: {
    label: string;
    onClick: () => void;
    color?: "green" | "orange" | "purple" | "blue";
  };
  /** Secondary action button config */
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Reusable notification modal for voice chat events.
 * Matches the project's kawaii modal design (CompletionModal / WelcomeBackModal style).
 *
 * Usage examples:
 * - Idle timeout (30s no activity → auto disconnect)
 * - Session expired (10 min premium limit)
 */
export function VoiceChatNotifyModal({
  isOpen,
  onClose,
  icon = "⏰",
  title,
  description,
  primaryAction,
  secondaryAction,
}: VoiceChatNotifyModalProps) {
  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative w-full max-w-md animate-in fade-in zoom-in duration-300">
        <div className="bg-[#FFF4E0] rounded-3xl border-4 border-yellow-300 p-8 shadow-xl flex flex-col items-center text-center relative overflow-visible">
          {/* Close button */}
          <button
            onClick={onClose}
            className="cursor-pointer absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors text-gray-500 hover:text-gray-700"
            aria-label="Đóng"
          >
            <X size={18} strokeWidth={3} />
          </button>

          {/* Icon */}
          <div className="text-[64px] leading-none mb-2 drop-shadow-lg">{icon}</div>

          {/* Title */}
          <h2 className="text-2xl font-black text-gray-800 font-display mb-2">{title}</h2>

          {/* Description */}
          <p className="text-gray-500 font-medium mb-6 max-w-[280px] leading-relaxed">{description}</p>

          {/* Actions */}
          <div className="flex flex-col gap-3 w-full max-w-[260px]">
            {primaryAction && (
              <ActionButton
                variant="glossy"
                color={primaryAction.color ?? "green"}
                className="w-full text-lg py-5"
                onClick={primaryAction.onClick}
              >
                {primaryAction.label}
              </ActionButton>
            )}
            {secondaryAction && (
              <button
                onClick={secondaryAction.onClick}
                className="mt-1 text-slate-400 text-sm font-medium hover:text-slate-600 transition-colors cursor-pointer"
              >
                {secondaryAction.label}
              </button>
            )}
          </div>

          {/* Bottom Owl */}
          <div className="absolute -bottom-8 -right-4 w-20 h-20">
            <Image src={owlSayHi} alt="Cú Thông Minh" fill className="object-contain drop-shadow-lg" sizes="80px" />
          </div>
        </div>
      </div>
    </div>
  );
}
