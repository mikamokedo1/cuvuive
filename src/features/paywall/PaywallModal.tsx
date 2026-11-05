"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ActionButton } from "@/components/common/ActionButton";
const owlHi = "https://assets.cuthongminh.com/games/common/owl-say-hi.webp";
import { Crown, X, Sparkles, BookOpen, Star, Loader2, Lock, Check, Mic } from "lucide-react";
import { GoogleIcon } from "@/components/common/Icons";
import { useAccess } from "@/context/AccessContext";
import { createClient } from "@/libs/supabase/client";
import { PREMIUM_LIST_PRICE, PREMIUM_PRICE } from "@/libs/constants/pricing";
import { useProgress } from "@/context/ProgressContext";
import { savePaywallSource, trackEvent } from "@/libs/analytics";
import { buildPaywallPitch, TOTAL_GAMES, TOTAL_LESSONS, type PaywallPitch } from "./paywallPitch";

const MAX_GROUP_CHIPS = 4;

interface PaywallModalProps {
  isOpen: boolean;
  type: "login" | "premium" | null;
  onClose: () => void;
}

export function PaywallModal({ isOpen, type, onClose }: PaywallModalProps) {
  const { paywallState, setPaywallState } = useAccess();
  const { getCourseProgress } = useProgress();
  const [oauthLoading, setOauthLoading] = useState(false);

  const pitch = buildPaywallPitch(paywallState.redirectUrl);
  const completedCount = pitch
    ? Object.values(getCourseProgress(pitch.courseId).completedLessons).reduce((sum, ids) => sum + ids.length, 0)
    : 0;

  useEffect(() => {
    if (!isOpen || !type) return;
    trackEvent("paywall_view", {
      paywall_type: type,
      course_id: pitch?.courseId ?? "none",
      group_id: pitch?.groupId ?? "none",
    });
    // Fire once per opening, not on every progress refresh.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, type, paywallState.redirectUrl]);

  if (!isOpen || !type) return null;

  const handleUpgradeClick = () => {
    trackEvent("paywall_click", { course_id: pitch?.courseId ?? "none" });
    savePaywallSource(pitch?.courseId ?? null);
    onClose();
  };

  const loginHref = "/auth/login";
  const signupHref = "/auth/sign-up";
  const upgradeHref = paywallState.redirectUrl
    ? `/upgrade?next=${encodeURIComponent(paywallState.redirectUrl)}`
    : "/upgrade";

  const handleNavigateToAuth = () => {
    // Keep redirectUrl in context and sessionStorage so LoginForm/SignupForm can redirect back
    setPaywallState({ ...paywallState, isOpen: false });
  };

  const handleGoogleQuickLogin = async () => {
    try {
      setOauthLoading(true);
      const supabase = createClient();
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
    } catch {
      setOauthLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-x-hidden overflow-y-auto max-h-[92vh] max-w-md w-full border-4 border-white/50 animate-scale-in relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {type === "login" ? (
          // Login Paywall
          <div className="p-8 flex flex-col items-center bg-gradient-to-b from-purple-50 to-white">
            <div className="flex justify-center mb-4">
              <Image src={owlHi} alt="Owl Companion" width={120} height={120} className="drop-shadow-lg" />
            </div>
            <h2 className="text-2xl text-purple-600 font-display mb-2 text-center">Đăng nhập để tiếp tục</h2>
            <p className="text-gray-500 font-medium text-sm text-center mb-5">
              Tạo tài khoản miễn phí trong 3 giây để lưu tiến độ học tập của bé nhé!
            </p>

            <div className="flex flex-col gap-3 w-full">
              <button
                type="button"
                onClick={handleGoogleQuickLogin}
                disabled={oauthLoading}
                className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 active:scale-[0.99] border-2 border-slate-200 shadow-md flex items-center justify-center gap-3 font-extrabold text-slate-700 text-base transition-all cursor-pointer disabled:opacity-60"
              >
                {oauthLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
                ) : (
                  <GoogleIcon className="w-6 h-6" />
                )}
                <span>Tiếp tục nhanh bằng Google</span>
              </button>

              <div className="flex items-center gap-3 my-1">
                <div className="h-px bg-slate-200 flex-1" />
                <span className="text-xs font-bold text-slate-400 uppercase">Hoặc</span>
                <div className="h-px bg-slate-200 flex-1" />
              </div>

              <Link href={loginHref} onClick={handleNavigateToAuth}>
                <ActionButton variant="glossy" color="purple" className="w-full py-3.5 text-lg">
                  Đăng nhập bằng Email
                </ActionButton>
              </Link>
              <Link href={signupHref} onClick={handleNavigateToAuth}>
                <ActionButton variant="glossy" color="green" className="w-full py-3.5 text-lg">
                  Đăng ký miễn phí
                </ActionButton>
              </Link>
            </div>
          </div>
        ) : (
          // Premium Paywall
          <PremiumPitch pitch={pitch} completedCount={completedCount} upgradeHref={upgradeHref} onUpgradeClick={handleUpgradeClick} />
        )}
      </div>
    </div>
  );
}

interface PremiumPitchProps {
  pitch: PaywallPitch | null;
  completedCount: number;
  upgradeHref: string;
  onUpgradeClick: () => void;
}

function PremiumPitch({ pitch, completedCount, upgradeHref, onUpgradeClick }: PremiumPitchProps) {
  const otherGames = pitch ? TOTAL_GAMES - 1 : TOTAL_GAMES;
  const lessonsRounded = Math.floor(TOTAL_LESSONS / 100) * 100;
  const shownGroups = pitch?.lockedGroupTitles.slice(0, MAX_GROUP_CHIPS) ?? [];
  const hiddenGroups = (pitch?.lockedGroupTitles.length ?? 0) - shownGroups.length;

  return (
    <div className="p-6 sm:p-8 flex flex-col items-center bg-gradient-to-b from-amber-50 to-white">
      <div className="flex justify-center mb-3 relative">
        <Image src={owlHi} alt="Cú Thông Minh" width={88} height={88} className="drop-shadow-lg" />
        <div className="absolute -top-2 -right-2 w-11 h-11 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
          <Crown className="w-5 h-5 text-white" />
        </div>
      </div>

      {pitch ? (
        <>
          <h2 className="text-2xl text-amber-600 font-display mb-1 text-center">
            {completedCount > 0 ? `🎉 Bé đã hoàn thành ${completedCount} bài!` : `Mở khóa "${pitch.courseTitle}"`}
          </h2>
          <p className="text-gray-500 font-medium text-sm text-center mb-4">
            {completedCount > 0
              ? `Bé đang học rất tốt trò chơi "${pitch.courseTitle}". Mở khóa để bé học tiếp nhé!`
              : `Còn ${pitch.lockedLessonCount} bài học đang chờ bé trong trò chơi này.`}
          </p>

          {shownGroups.length > 0 && (
            <div className="w-full mb-4">
              <p className="text-sm font-bold text-gray-700 mb-2">Tiếp theo bé sẽ học:</p>
              <div className="flex flex-wrap gap-2">
                {shownGroups.map((title) => (
                  <span
                    key={title}
                    className="inline-flex items-center gap-1 rounded-full bg-white border-2 border-amber-200 px-3 py-1 text-sm font-semibold text-amber-700"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    {title}
                  </span>
                ))}
                {hiddenGroups > 0 && (
                  <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
                    +{hiddenGroups} nhóm
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="w-full bg-amber-50 rounded-2xl p-4 mb-4 space-y-2.5">
            {pitch.highlights.map((line) => (
              <div key={line} className="flex items-start gap-2.5">
                <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span className="text-gray-700 font-medium text-sm">{line}</span>
              </div>
            ))}
            <div className="flex items-start gap-2.5">
              <BookOpen className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <span className="text-gray-700 font-medium text-sm">
                Mở khóa thêm {otherGames} trò chơi khác, {lessonsRounded}+ bài học
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <Mic className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
              <span className="text-gray-700 font-medium text-sm">Trò chuyện với Cú bằng giọng nói</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl text-amber-600 font-display mb-2 text-center">Nâng cấp Premium</h2>
          <p className="text-gray-500 font-medium text-sm text-center mb-5">
            Mở khóa toàn bộ {TOTAL_GAMES} trò chơi và tất cả bài học trọn đời.
          </p>
          <div className="w-full bg-amber-50 rounded-2xl p-4 mb-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-gray-700 font-medium">Mở khóa tất cả {lessonsRounded}+ bài học</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <Star className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-gray-700 font-medium">Theo dõi tiến độ & AI Cú nói chuyện</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-gray-700 font-medium">Dùng không giới hạn thiết bị, không quảng cáo</span>
            </div>
          </div>
        </>
      )}

      <div className="flex items-baseline justify-center gap-3 mb-4">
        <span className="text-lg text-gray-400 line-through">{PREMIUM_LIST_PRICE.toLocaleString("vi-VN")}đ</span>
        <span className="text-3xl font-display text-orange-600">{PREMIUM_PRICE.toLocaleString("vi-VN")}đ</span>
        <span className="text-sm font-semibold text-gray-500">trọn đời</span>
      </div>

      <Link href={upgradeHref} onClick={onUpgradeClick} className="w-full">
        <ActionButton variant="glossy" color="orange" className="w-full py-4 text-lg">
          <Crown className="w-5 h-5 mr-2" />
          {pitch ? "Mở khóa cho bé" : "Nâng cấp ngay"}
        </ActionButton>
      </Link>
    </div>
  );
}
