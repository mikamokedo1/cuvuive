"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { X } from "lucide-react";
import { getRoadmapForAge } from "@/libs/constants/roadmaps";

const SESSION_KEY = "exit_intent_shown";

const OWL_LOGO = "https://assets.cuthongminh.com/assets/logo.webp";

const AGE_OPTIONS = [
  {
    age: 3,
    label: "3 tuổi",
    img: "https://assets.cuthongminh.com/assets/upgrade/seed.webp",
    bg: "from-green-50 to-emerald-50",
    border: "border-green-200",
    activeBorder: "border-green-400",
    activeBg: "bg-green-50",
    labelColor: "text-green-700",
  },
  {
    age: 4,
    label: "4 tuổi",
    img: "https://assets.cuthongminh.com/assets/upgrade/leaf.webp",
    bg: "from-lime-50 to-green-50",
    border: "border-lime-200",
    activeBorder: "border-lime-400",
    activeBg: "bg-lime-50",
    labelColor: "text-lime-700",
  },
  {
    age: 5,
    label: "5 tuổi",
    img: "https://assets.cuthongminh.com/assets/upgrade/buff.webp",
    bg: "from-yellow-50 to-amber-50",
    border: "border-yellow-200",
    activeBorder: "border-yellow-400",
    activeBg: "bg-yellow-50",
    labelColor: "text-yellow-700",
  },
  {
    age: 6,
    label: "6 tuổi",
    img: "https://vnlppyavpkuerviyszxg.supabase.co/storage/v1/object/public/blog-images/hero_chuan-bi-vao-lop-1-toan-dien-1780659661318.webp",
    bg: "from-pink-50 to-rose-50",
    border: "border-pink-200",
    activeBorder: "border-pink-400",
    activeBg: "bg-pink-50",
    labelColor: "text-pink-700",
  },
  {
    age: 7,
    label: "7+ tuổi",
    img: "https://assets.cuthongminh.com/assets/boy-school.webp",
    bg: "from-blue-50 to-sky-50",
    border: "border-blue-200",
    activeBorder: "border-blue-400",
    activeBg: "bg-blue-50",
    labelColor: "text-blue-700",
  },
];

export function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [hoveredAge, setHoveredAge] = useState<number | null>(null);
  const router = useRouter();

  const showPopup = useCallback(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;
    sessionStorage.setItem(SESSION_KEY, "1");
    setVisible(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (isDesktop) {
      // Desktop: exit-intent — khi chuột ra khỏi viewport từ phía trên
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) showPopup();
      };
      const timer = setTimeout(() => {
        document.addEventListener("mouseleave", handleMouseLeave);
      }, 8000); // attach sau 8s để tránh fire ngay khi vào trang
      return () => {
        clearTimeout(timer);
        document.removeEventListener("mouseleave", handleMouseLeave);
      };
    } else {
      // Mobile/tablet: hiện sau 10 giây ở lại trang
      const timer = setTimeout(() => {
        showPopup();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  const handleAgeSelect = (age: number) => {
    setVisible(false);
    const roadmap = getRoadmapForAge(age);
    // Lưu lại để sign-up-success, login biết redirect đúng lộ trình
    if (typeof window !== "undefined") {
      localStorage.setItem("owl_preferred_roadmap", roadmap.slug);
    }
    router.push(`/lo-trinh/${roadmap.slug}`);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-br from-orange-400 to-amber-500 px-6 pt-6 pb-10 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/patterns/cubes.png')] opacity-10" />

          <button
            onClick={() => setVisible(false)}
            className="cursor-pointer absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
            aria-label="Đóng"
          >
            <X size={18} strokeWidth={3} />
          </button>

          <div className="relative z-10">
            {/* Owl logo */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 border-2 border-white/30 mb-3 shadow-lg">
              <Image
                src={OWL_LOGO}
                alt="Cú Thông Minh"
                width={48}
                height={48}
                className="object-contain drop-shadow-md"
              />
            </div>
            <h2 className="text-xl font-extrabold font-[family-name:var(--font-baloo-2)] mb-1">Bé nhà bạn mấy tuổi?</h2>
            <p className="text-white/85 text-sm font-medium">Cú sẽ chọn lộ trình học phù hợp nhất!</p>
          </div>
        </div>

        {/* Age picker cards */}
        <div className="bg-white px-5 pt-4 pb-6">
          <div className="grid grid-cols-5 gap-2">
            {AGE_OPTIONS.map(({ age, label, img, border, activeBorder, activeBg, labelColor }) => {
              const isHovered = hoveredAge === age;
              return (
                <button
                  key={age}
                  onClick={() => handleAgeSelect(age)}
                  onMouseEnter={() => setHoveredAge(age)}
                  onMouseLeave={() => setHoveredAge(null)}
                  className={`group flex flex-col items-center gap-1.5 pt-3 pb-2.5 px-1 rounded-2xl border-2 transition-all duration-150 active:scale-95 cursor-pointer
                    ${isHovered ? `${activeBorder} ${activeBg}` : `${border} bg-white`}`}
                >
                  <div className="relative w-12 h-12">
                    <Image
                      src={img}
                      alt={label}
                      fill
                      className={`object-contain transition-transform duration-200 ${isHovered ? "scale-110" : ""} drop-shadow-sm`}
                      sizes="48px"
                    />
                  </div>
                  <span
                    className={`text-[11px] font-extrabold leading-tight text-center transition-colors ${isHovered ? labelColor : "text-slate-500"}`}
                  >
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
