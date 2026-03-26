"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

const LogoLong = "https://assets.cuthongminh.com/assets/logo-long.webp";
const LogoShort = "https://assets.cuthongminh.com/assets/logo.webp";

export const HeaderHome = () => {
  const [scrolled, setScrolled] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll(); // check initial position
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.08)] py-3"
          : "bg-transparent py-4 pt-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/">
          <Image className="md:block hidden" src={LogoLong} alt="Cú Thông Minh - Nền tảng học và chơi cho bé" width={256} height={56} priority />
          <Image className="md:hidden" src={LogoShort} alt="Cú Thông Minh Logo" width={56} height={56} priority />
        </Link>
        <div className="flex items-center gap-3">
          {user ? (
            <Link
              href="/games"
              className="px-6 py-3 bg-[#FF9C01] hover:bg-orange-500 text-slate-900 font-bold rounded-full shadow-[0_4px_14px_0_rgba(255,156,1,0.39)] hover:shadow-[0_6px_20px_rgba(255,156,1,0.23)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Bắt đầu học
            </Link>
          ) : (
            <>
              <Link
                href="/auth/login"
                className={`hidden sm:inline-flex px-5 py-2.5 font-bold rounded-full transition-colors duration-200 text-sm ${
                  scrolled ? "text-slate-600 hover:bg-slate-100" : "text-slate-700 hover:bg-white/20"
                }`}
              >
                Đăng nhập
              </Link>
              <Link
                href="/auth/sign-up"
                className="px-6 py-3 bg-[#FF9C01] hover:bg-orange-500 text-slate-900 font-bold rounded-full shadow-[0_4px_14px_0_rgba(255,156,1,0.39)] hover:shadow-[0_6px_20px_rgba(255,156,1,0.23)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Đăng ký miễn phí
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
