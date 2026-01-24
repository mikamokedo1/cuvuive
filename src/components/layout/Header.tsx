"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/libs/supabase/client";
import { User } from "@supabase/supabase-js";
import { ActionButton } from "@/components/common/ActionButton";

// Assets
import LogoLong from "@/assets/logo-long.png";
import avatarBoy from "@/assets/avatar-boy.png";
import { useRouter } from "next/navigation";
import { SignoutIcon } from "../common/Icons";

const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const supabase = createClient();
  console.log(user);
  useEffect(() => {
    // Check active session - use getSession for more reliable cookie-based check
    const checkUser = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Header - Session check error:", error);
          setUser(null);
        } else {
          console.log("Header Check - User:", session?.user?.id || "No user");
          setUser(session?.user ?? null);
        }
      } catch (err) {
        console.error("Header - Failed to check session:", err);
        setUser(null);
      }
    };

    checkUser();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Header - Auth state changed:", _event, session?.user?.id || "No user");
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsMenuOpen(false);
  };

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
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 focus:outline-none transition-transform hover:scale-105"
          >
            <div className="relative">
              <Image
                src={avatarBoy}
                alt="Avatar"
                className="w-14 h-14 rounded-full border-4 border-white shadow-md bg-blue-200 object-cover"
              />
              {/* <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                ✓
              </div> */}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-bold text-gray-700 leading-tight">Bé Yêu</p>
              <p className="text-xs text-blue-500 font-semibold">Cấp độ 1</p>
            </div>
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border-2 border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-5">
              <div className="p-2">
                <button
                  onClick={handleLogout}
                  className="cursor-pointer w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-bold text-sm transition-colors flex items-center gap-2"
                >
                  <SignoutIcon />
                  Đăng xuất
                </button>
              </div>
            </div>
          )}
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
