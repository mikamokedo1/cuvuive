"use client";

import Image from "next/image";
import Link from "next/link";
import { ActionButton } from "@/components/common/ActionButton";
import { Crown } from "lucide-react";

// Assets
import LogoLong from "@/assets/logo-long.webp";
import LogoShort from "@/assets/logo.png";
import avatarBoy from "@/assets/avatar-boy.webp";
import avatarGirl from "@/assets/avatar-girl.webp";
import { usePathname } from "next/navigation";
import { SignoutIcon } from "../common/Icons";
import { useUser } from "@/context/UserContext";
import { Dropdown } from "@/components/common/Dropdown";
import { useAccess } from "@/context/AccessContext";
import { User, Settings, MessageSquare, Trophy } from "lucide-react";
import { useResponsive } from "@/hooks/useResponsive";

const Header = () => {
  const pathname = usePathname();
  const { user, handleLogout, isPremium } = useUser();
  const { setPaywallState } = useAccess();
  const { isMobile } = useResponsive();



  return (
    <header className="w-full flex justify-between items-center mb-8 bg-[#F8EEDD] backdrop-blur-sm rounded-3xl shadow-xl px-6 border-4 border-white relative z-50">
      <Link href="/games" aria-label="Go to homepage">
        <Image
          src={isMobile ? LogoShort : LogoLong}
          alt="Cú Thông Minh Logo"
          className="cursor-pointer h-16 md:h-20 w-auto object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
        />
      </Link>

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
                  <Image width={56} height={56} src={user?.user_metadata?.sex === "female" ? avatarGirl : avatarBoy}
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
                href="/learn-progress"
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg font-bold text-sm transition-colors flex items-center gap-2"
              >
                <Trophy size={18} />
                Tiến độ học tập
              </Link>
              <Link
                href="/settings"
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg font-bold text-sm transition-colors flex items-center gap-2"
              >
                <Settings size={18} />
                Cài đặt
              </Link>
              <Link
                href="/feedback"
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg font-bold text-sm transition-colors flex items-center gap-2"
              >
                <MessageSquare size={18} />
                Góp ý
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
