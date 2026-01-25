"use client";

import Image from "next/image";
import Link from "next/link";
import { ActionButton } from "@/components/common/ActionButton";
import { Crown } from "lucide-react";

// Assets
import LogoLong from "@/assets/logo-long.png";
import avatarBoy from "@/assets/avatar-boy.png";
import avatarGirl from "@/assets/avatar-girl.webp";
import { useRouter } from "next/navigation";
import { SignoutIcon } from "../common/Icons";
import { useUser } from "@/context/UserContext";
import { Dropdown } from "@/components/common/Dropdown";

const Header = () => {
  const router = useRouter();
  const { user, handleLogout, isPremium } = useUser();

  console.log(user);
  return (
    <header className="w-full flex justify-between items-center relative mb-8 bg-[#F8EEDD] backdrop-blur-sm rounded-3xl shadow-xl px-6 border-4 border-white relative z-50">
      <Link href="/">
        <Image
          src={LogoLong}
          alt="Thong Minh"
          className="cursor-pointer h-16 md:h-20 w-auto object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
        />
      </Link>

      {user ? (
        <div className="relative">
          {/* Dropdown Menu */}
          <Dropdown
            trigger={
              <div className="flex items-center gap-2 focus:outline-none transition-transform hover:scale-105">
                <div className="relative">
                  <Image
                    src={user?.user_metadata?.sex === "female" ? avatarGirl : avatarBoy}
                    alt="Avatar"
                    className="w-14 h-14 rounded-full border-4 border-white shadow-md bg-blue-200 object-cover"
                  />
                  {isPremium && (
                    <div
                      className={`absolute -bottom-1 -right-1 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white ${isPremium ? "bg-yellow-400" : "bg-green-500"}`}
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
              </div>
            }
          >
            <div className="p-2">
              <button
                onClick={handleLogout}
                className="cursor-pointer w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-bold text-sm transition-colors flex items-center gap-2"
              >
                <SignoutIcon />
                Đăng xuất
              </button>
            </div>
          </Dropdown>
        </div>
      ) : (
        /* Auth on the right */
        <ActionButton
          variant="glossy"
          color="orange"
          size="auto"
          className="px-4 py-2 rounded-xl flex items-center gap-2"
          onClick={() => router.push("/auth/login")}
        >
          Đăng nhập
        </ActionButton>
      )}
    </header>
  );
};

export default Header;
