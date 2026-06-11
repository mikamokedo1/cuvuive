"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { useUser } from "@/context/UserContext";
import { Search, Menu, X, Gamepad2, BookOpen, Wrench, Users, Crown, Trophy } from "lucide-react";
import { SearchOverlay } from "@/components/common/SearchOverlay";
import { type SearchItem } from "@/libs/utils/search-data";

const LogoLong = "https://assets.cuthongminh.com/assets/logo-long.webp";
const LogoShort = "https://assets.cuthongminh.com/assets/logo.webp";

const NAV_ITEMS = [
  { href: "/games", label: "Trò chơi", icon: Gamepad2 },
  { href: "/blogs", label: "Blog", icon: BookOpen },
  { href: "/cong-cu", label: "Công cụ", icon: Wrench },
  { href: "/leaderboard", label: "Bảng xếp hạng", icon: Trophy },
  { href: "/about-us", label: "Giới thiệu", icon: Users },
  { href: "/upgrade", label: "Bảng giá", icon: Crown },
];

interface HeaderHomeProps {
  blogSearchItems?: SearchItem[];
}

export const HeaderHome = ({ blogSearchItems }: HeaderHomeProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll(); // check initial position
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cmd+K / Ctrl+K shortcut to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/85 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.08)] py-3"
            : "bg-transparent py-4 pt-6"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <span className="sr-only">Trang chủ Cú Thông Minh</span>
            <Image
              className="lg:block hidden"
              src={LogoLong}
              alt="Cú Thông Minh - Nền tảng học và chơi cho bé"
              width={200}
              height={44}
              priority
            />
            <Image className="lg:hidden" src={LogoShort} alt="Cú Thông Minh Logo" width={48} height={48} priority />
          </Link>

          {/* Desktop Navigation — centered */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm xl:text-base px-4 py-2 rounded-full font-bold transition-all duration-200 ${
                  scrolled
                    ? "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    : "text-slate-700 hover:bg-white/20 hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className={`p-2.5 rounded-full transition-colors duration-200 ${
                scrolled
                  ? "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                  : "text-slate-600 hover:bg-white/20 hover:text-slate-800"
              }`}
              aria-label="Tìm kiếm (Ctrl+K)"
              title="Tìm kiếm (Ctrl+K)"
              id="search-toggle"
            >
              <Search className="w-5 h-5" />
            </button>

            {user ? (
              <Link
                href="/games"
                className="px-6 py-3 bg-[#FF9C01] hover:bg-orange-500 text-slate-900 font-bold rounded-full shadow-[0_4px_14px_0_rgba(255,156,1,0.39)] hover:shadow-[0_6px_20px_rgba(255,156,1,0.23)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm"
              >
                Tất cả bài học
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
                  className="hidden sm:inline-flex px-6 py-3 bg-[#FF9C01] hover:bg-orange-500 text-slate-900 font-bold rounded-full shadow-[0_4px_14px_0_rgba(255,156,1,0.39)] hover:shadow-[0_6px_20px_rgba(255,156,1,0.23)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm"
                >
                  Đăng ký miễn phí
                </Link>
              </>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2.5 rounded-full transition-colors duration-200 ${
                scrolled ? "text-slate-600 hover:bg-slate-100" : "text-slate-700 hover:bg-white/20"
              }`}
              aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
              aria-expanded={mobileMenuOpen}
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeMobileMenu} aria-hidden="true" />

        {/* Slide-in Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <Image src={LogoShort} alt="Cú Thông Minh" width={40} height={40} />
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
              aria-label="Đóng menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Items */}
          <div className="p-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-base transition-all duration-200 text-slate-700 hover:bg-slate-50"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-slate-100 text-slate-500"
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Divider */}
          <div className="mx-6 border-t border-slate-100" />

          {/* Auth Buttons (mobile) */}
          <div className="p-4 flex flex-col gap-3">
            {user ? (
              <Link
                href="/games"
                onClick={closeMobileMenu}
                className="w-full px-6 py-4 bg-[#FF9C01] hover:bg-orange-500 text-slate-900 font-bold rounded-2xl text-center shadow-[0_4px_14px_0_rgba(255,156,1,0.39)] transition-all duration-200 text-base"
              >
                Tất cả bài học
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/sign-up"
                  onClick={closeMobileMenu}
                  className="w-full px-6 py-4 bg-[#FF9C01] hover:bg-orange-500 text-slate-900 font-bold rounded-2xl text-center shadow-[0_4px_14px_0_rgba(255,156,1,0.39)] transition-all duration-200 text-base"
                >
                  Đăng ký miễn phí
                </Link>
                <Link
                  href="/auth/login"
                  onClick={closeMobileMenu}
                  className="w-full px-6 py-4 border-2 border-slate-200 text-slate-700 font-bold rounded-2xl text-center hover:bg-slate-50 transition-all duration-200 text-base"
                >
                  Đăng nhập
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} blogItems={blogSearchItems} />
    </>
  );
};
