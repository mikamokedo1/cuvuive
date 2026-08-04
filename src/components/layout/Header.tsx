"use client";

import Image from "next/image";
import Link from "next/link";
import { ActionButton } from "@/components/common/ActionButton";
import { Crown, Route } from "lucide-react";

// Assets (Cloudflare R2)
const LogoLong = "https://assets.cuthongminh.com/assets/logo-long.webp";
const LogoShort = "https://assets.cuthongminh.com/assets/logo.webp";
const avatarBoy = "https://assets.cuthongminh.com/assets/avatar-boy.webp";
const avatarGirl = "https://assets.cuthongminh.com/assets/avatar-girl.webp";
import { usePathname } from "next/navigation";
import { SignoutIcon } from "../common/Icons";
import { useUser } from "@/context/UserContext";
import { Dropdown } from "@/components/common/Dropdown";
import { useAccess } from "@/context/AccessContext";
import { Settings, MessageSquare, Trophy, Banknote, LayoutDashboard, Medal } from "lucide-react";

const Header = () => {
  const pathname = usePathname();
  const { user, handleLogout, isPremium } = useUser();
  const { setPaywallState } = useAccess();

  return (
    <header className="w-full flex justify-between items-center mb-8 bg-[#F8EEDD] backdrop-blur-sm rounded-3xl shadow-xl px-6 border-4 border-white relative z-50">
      <Link href="/games" aria-label="Go to homepage">
        <span className="sr-only">Cú Thông Minh Kho Trò Chơi</span>
        <Image
          src={LogoShort}
          alt="Cú Thông Minh Logo"
          width={64}
          height={64}
          priority
          className="lg:hidden cursor-pointer object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
        />
        <Image
          src={LogoLong}
          alt="Cú Thông Minh Logo"
          width={256}
          height={56}
          priority
          className="hidden lg:block cursor-pointer drop-shadow-md transition-transform duration-300 hover:scale-105"
        />
      </Link>

      {/* Desktop Navigation Menu - hidden on mobile */}
      <nav className="hidden md:flex items-center gap-2" aria-label="Main navigation">
        {[
          { href: "/lo-trinh", icon: <Route size={16} />, label: "Lộ Trình" },
          { href: "/parent-dashboard", icon: <LayoutDashboard size={16} />, label: "Phụ huynh" },
          { href: "/earn", icon: <Banknote size={16} />, label: "Kiếm tiền" },
          { href: "/feedback", icon: <MessageSquare size={16} />, label: "Góp ý" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-orange-500 text-sm font-bold shadow-sm transition-all duration-200 hover:bg-orange-500 hover:text-white hover:shadow-md whitespace-nowrap"
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {user ? (
        <div className="relative">
          {/* Dropdown Menu */}
          <Dropdown
            trigger={
              <button
                className="flex items-center gap-2 focus:outline-none transition-transform hover:scale-105 appearance-none bg-transparent border-none p-0 cursor-pointer"
                aria-label="User menu"
              >
                <div className="relative">
                  <Image
                    width={56}
                    height={56}
                    src={user?.user_metadata?.sex === "female" ? avatarGirl : avatarBoy}
                    alt="User Avatar"
                    className="w-14 h-14 rounded-full border-4 border-white shadow-md bg-blue-200 object-cover"
                  />
                  {isPremium && (
                    <div
                      className={`absolute -bottom-1 -right-1 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white ${isPremium ? "bg-yellow-400" : "bg-green-500"}`}
                      title="Premium User"
                    >
                      <Crown className="w-3 h-3 text-white" fill="white" />
                    </div>
                  )}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-bold text-gray-700 leading-tight">
                    {user?.user_metadata.kidName ?? "Bé Yêu"}
                  </p>
                  <p className="text-xs text-blue-500 font-semibold">Cấp độ 1</p>
                </div>
              </button>
            }
          >
            <div className="p-2">
              {/* Mobile User Info */}
              <div className="md:hidden px-4 py-2 border-b border-gray-100 mb-2">
                <p className="text-sm font-bold text-gray-700 leading-tight">
                  {user?.user_metadata.kidName ?? "Bé Yêu"}
                </p>
                <p className="text-xs text-blue-500 font-semibold">Cấp độ 1</p>
              </div>

              <Link
                href="/lo-trinh"
                className="w-full text-left px-4 py-2 text-orange-700 hover:bg-orange-50 rounded-lg font-bold text-sm transition-colors flex items-center gap-2"
              >
                <Route size={18} />
                Lộ trình học tập
              </Link>
              <Link
                href="/parent-dashboard"
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg font-bold text-sm transition-colors flex items-center gap-2"
              >
                <Trophy size={18} />
                Tiến độ & Thống kê
              </Link>
              <Link
                href="/leaderboard"
                className="w-full text-left px-4 py-2 text-amber-700 hover:bg-amber-50 rounded-lg font-bold text-sm transition-colors flex items-center gap-2"
              >
                <Medal size={18} />
                Bảng xếp hạng
              </Link>
              <Link
                href="/parent-dashboard"
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg font-bold text-sm transition-colors flex items-center gap-2"
              >
                <LayoutDashboard size={18} />
                Góc phụ huynh
              </Link>
              <Link
                href="/earn"
                className="w-full text-left px-4 py-2 text-emerald-700 hover:bg-emerald-50 rounded-lg font-bold text-sm transition-colors flex items-center gap-2"
              >
                <Banknote size={18} />
                Kiếm tiền
              </Link>
              <Link
                href="/feedback"
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg font-bold text-sm transition-colors flex items-center gap-2"
              >
                <MessageSquare size={18} />
                Góp ý
              </Link>
              <Link
                href="/settings"
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg font-bold text-sm transition-colors flex items-center gap-2"
              >
                <Settings size={18} />
                Cài đặt
              </Link>

              <button
                onClick={handleLogout}
                className="cursor-pointer w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-bold text-sm transition-colors flex items-center gap-2"
              >
                <SignoutIcon />
                Đăng xuất
              </button>
            </div>{" "}
          </Dropdown>
        </div>
      ) : (
        /* Auth on the right */
        <Link href="/auth/login" onClick={() => setPaywallState({ isOpen: false, type: null, redirectUrl: pathname })}>
          <ActionButton
            variant="glossy"
            color="orange"
            size="auto"
            className="px-4 py-2 rounded-xl flex items-center gap-2"
            aria-label="Login"
          >
            Đăng nhập
          </ActionButton>
        </Link>
      )}
    </header>
  );
};

export default Header;
