"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ActionButton } from "@/components/common/ActionButton";
const owlHi = "https://assets.cuthongminh.com/games/common/owl-say-hi.webp";
import { Crown, X, Sparkles, BookOpen, Star, Loader2 } from "lucide-react";
import { GoogleIcon } from "@/components/common/Icons";
import { useAccess } from "@/context/AccessContext";
import { createClient } from "@/libs/supabase/client";

interface PaywallModalProps {
  isOpen: boolean;
  type: "login" | "premium" | null;
  onClose: () => void;
}

export function PaywallModal({ isOpen, type, onClose }: PaywallModalProps) {
  const { paywallState, setPaywallState } = useAccess();
  const [oauthLoading, setOauthLoading] = useState(false);

  if (!isOpen || !type) return null;

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
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-md w-full border-4 border-white/50 animate-scale-in relative">
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
          <div className="p-8 flex flex-col items-center bg-gradient-to-b from-amber-50 to-white">
            <div className="flex justify-center mb-4 relative">
              <Image src={owlHi} alt="Owl Companion" width={100} height={100} className="drop-shadow-lg" />
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Crown className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-2xl text-amber-600 font-display mb-2 text-center">Nâng cấp Premium</h2>
            <p className="text-gray-500 font-medium text-sm text-center mb-6">
              Mở khóa toàn bộ 48+ trò chơi và tất cả bài học chỉ từ 60.000đ!
            </p>

            {/* Benefits List */}
            <div className="w-full bg-amber-50 rounded-2xl p-4 mb-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium">Mở khóa tất cả 600+ bài học</span>
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

            <Link href={upgradeHref} onClick={onClose} className="w-full">
              <ActionButton variant="glossy" color="orange" className="w-full py-4 text-lg">
                <Crown className="w-5 h-5 mr-2" />
                Nâng cấp ngay
              </ActionButton>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
