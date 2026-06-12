"use client";

import { useEffect, useState } from "react";
import { ActionButton } from "@/components/common/ActionButton";
import Image from "next/image";
import Link from "next/link";
import { getRedirectUrl, clearRedirectUrl } from "@/context/AccessContext";

const owlHi = "https://assets.cuthongminh.com/games/common/owl-say-hi.webp";

export default function Page() {
  const [targetHref, setTargetHref] = useState("/lo-trinh");

  useEffect(() => {
    // Ưu tiên 1: redirect URL từ paywall (AccessContext sessionStorage)
    const paywallRedirect = getRedirectUrl();
    if (paywallRedirect && !paywallRedirect.includes("/auth/")) {
      clearRedirectUrl();
      setTargetHref(paywallRedirect);
      return;
    }

    // Ưu tiên 2: lộ trình đã chọn từ popup tuổi
    const preferredRoadmap = localStorage.getItem("owl_preferred_roadmap");
    if (preferredRoadmap) {
      setTargetHref(`/lo-trinh/${preferredRoadmap}`);
      return;
    }

    // Fallback: danh sách lộ trình
    setTargetHref("/lo-trinh");
  }, []);

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4 bg-[url('/bg-pattern.png')]">
      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full border-4 border-white/50 backdrop-blur-sm">
        {/* Left Side - Illustration */}
        <div className="md:w-1/2 bg-green-100 relative p-8 flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('/assets/bg.jpg')] bg-cover opacity-10"></div>
          <div className="relative z-10 text-center">
            <Image
              src={owlHi}
              alt="Owl Companion"
              width={280}
              height={280}
              className="drop-shadow-2xl animate-bounce-subtle mx-auto transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white relative text-center">
          <div className="mb-8">
            <div className="text-5xl mb-4">🎉</div>
            <h1 className="text-4xl text-green-600 font-display mb-3 drop-shadow-sm">Chào mừng bé!</h1>
            <p className="text-gray-500 font-medium text-lg">
              Tài khoản đã được tạo thành công. Bắt đầu hành trình học cùng Cú Thông Minh nhé!
            </p>
          </div>

          <Link href={targetHref} className="w-full block">
            <ActionButton
              variant="glossy"
              color="green"
              className="w-full py-4 text-xl uppercase tracking-wider shadow-lg hover:shadow-xl"
            >
              🚀 Bắt đầu học ngay
            </ActionButton>
          </Link>

          <p className="text-xs text-gray-400 mt-4 font-medium">
            Bé sẽ được đưa tới lộ trình phù hợp với độ tuổi
          </p>
        </div>
      </div>
    </div>
  );
}
