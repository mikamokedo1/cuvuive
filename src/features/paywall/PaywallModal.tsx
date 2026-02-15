"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ActionButton } from "@/components/common/ActionButton";
import owlHi from "@/assets/games/common/owl-say-hi.webp";
import { Crown, X, Sparkles, BookOpen, Star, Zap } from "lucide-react";
import { useAccess } from "@/context/AccessContext";

interface PaywallModalProps {
  isOpen: boolean;
  type: "login" | "premium" | null;
  onClose: () => void;
}

export function PaywallModal({ isOpen, type, onClose }: PaywallModalProps) {
  const router = useRouter();
  const { paywallState } = useAccess();

  if (!isOpen || !type) return null;

  const handleLogin = () => {
    // paywallState.redirectUrl is already set by showPaywall() and synced to sessionStorage
    // After login, LoginForm will read it from context (or sessionStorage for OAuth)
    router.push("/auth/login");
    onClose();
  };

  const handleSignup = () => {
    // Same as login — paywallState.redirectUrl already set
    router.push("/auth/sign-up");
    onClose();
  };

  const handleUpgrade = () => {
    // For premium paywall, pass redirectUrl as ?next= to the upgrade page
    let nextParam = "";
    if (paywallState.redirectUrl) {
      nextParam = `?next=${encodeURIComponent(paywallState.redirectUrl)}`;
    }
    router.push(`/upgrade${nextParam}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-md w-full border-4 border-white/50 animate-scale-in relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10"
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
            <p className="text-gray-500 font-medium text-sm text-center mb-6">
              Tạo tài khoản miễn phí để theo dõi tiến độ học tập của bé nhé!
            </p>

            <div className="flex flex-col gap-3 w-full">
              <ActionButton onClick={handleLogin} variant="glossy" color="purple" className="w-full py-4 text-lg">
                Đăng nhập
              </ActionButton>
              <ActionButton onClick={handleSignup} variant="glossy" color="green" className="w-full py-4 text-lg">
                Đăng ký miễn phí
              </ActionButton>
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
              Mở khóa toàn bộ bài học và tính năng đặc biệt!
            </p>

            {/* Benefits List */}
            <div className="w-full bg-amber-50 rounded-2xl p-4 mb-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium">Mở khóa tất cả bài học</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Star className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-gray-700 font-medium">Theo dõi tiến độ chi tiết</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-gray-700 font-medium">Nội dung cập nhật liên tục</span>
              </div>
            </div>

            <ActionButton onClick={handleUpgrade} variant="glossy" color="orange" className="w-full py-4 text-lg">
              <Crown className="w-5 h-5 mr-2" />
              Nâng cấp ngay
            </ActionButton>
          </div>
        )}
      </div>
    </div>
  );
}
