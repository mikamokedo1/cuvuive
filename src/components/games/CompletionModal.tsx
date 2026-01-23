import Image from "next/image";
import { ActionButton } from "@/components/common/ActionButton";
import owlSayHi from "@/assets/games/common/owl-say-hi.webp";
import star from "@/assets/games/star.png";
import { useEffect } from "react";
import { playSound } from "@/libs/utils/playSound";
import WinSound from "@/assets/games/common/sounds/win.mp3";

interface CompletionModalProps {
  isOpen: boolean;
  onNext: () => void;
  currentLessonNum: number | string;
  nextLessonNum?: number | string;
  isGroupComplete?: boolean;
}

export function CompletionModal({
  isOpen,
  onNext,
  currentLessonNum,
  nextLessonNum,
  isGroupComplete,
}: CompletionModalProps) {
  useEffect(() => {
    if (isOpen) {
      playSound(WinSound);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal Content */}
      <div className="relative w-full max-w-md animate-in fade-in zoom-in duration-300">
        {/* Main Card */}
        <div className="bg-white rounded-[32px] border-[8px] border-[#FFD057] p-8 shadow-[0_0_40px_rgba(255,208,87,0.6)] flex flex-col items-center text-center relative overflow-visible">
          {/* Top Star Decoration */}
          <div className="absolute -top-6 -right-6 w-16 h-16 animate-pulse">
            <Image src={star} alt="Star" width={64} height={64} className="object-contain" />
          </div>

          {/* Title */}
          <h2 className="text-3xl font-extrabold text-[#FF6B00] mb-4 font-nunito drop-shadow-sm">
            {isGroupComplete ? "Hoàn thành nhóm!" : "Hoàn thành bài học!"}
          </h2>

          {/* Character Image */}
          <div className="relative w-48 h-48 my-2">
            <Image src={owlSayHi} alt="Great Job!" fill className="object-contain drop-shadow-xl" />
          </div>

          {/* Message Body */}
          <div className="my-6 text-slate-600 text-lg font-medium space-y-2">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span>Bạn đã hoàn thành</span>
              <span className="bg-yellow-400 text-white px-3 py-1 rounded-lg font-bold shadow-sm">
                {isGroupComplete ? "Nhóm" : "Bài"} {currentLessonNum}
              </span>
              <span>!</span>
            </div>

            {nextLessonNum && (
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <span>Chuyển sang</span>
                <span className="bg-green-500 text-white px-3 py-1 rounded-lg font-bold shadow-sm">
                  {isGroupComplete ? "Nhóm" : "Bài"} {nextLessonNum}
                </span>
                <span>thôi nào!</span>
              </div>
            )}
          </div>

          {/* Action Button */}
          <ActionButton
            onClick={onNext}
            color="orange"
            variant="glossy"
            className="w-full max-w-[240px] animate-bounce-subtle"
          >
            {isGroupComplete ? "Tiếp tục" : "Chuyển tiếp"}
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
