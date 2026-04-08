"use client";

import { useEffect } from "react";
import { ActionButton } from "@/components/common/ActionButton";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
const BgImage = "https://assets.cuthongminh.com/assets/bg.webp";
import Header from "./Header";
import { LessonTitle } from "@/components/games/LessonTitle";
import { initGameSounds } from "@/libs/utils/playSound";

interface GameLayoutProps {
  children: React.ReactNode;
  title?: string;
  backTo?: string;
  showBackButton?: boolean;
}

export const GameLayout = ({ children, title, backTo, showBackButton = true }: GameLayoutProps) => {
  const router = useRouter();

  // Preload game sounds only when a game page is visited
  useEffect(() => {
    initGameSounds();
  }, []);
  return (
    <div className="min-h-screen relative flex flex-col py-6 px-4 overflow-hidden">
      <Header />
      {/* Background */}
      <Image src={BgImage} alt="Background" fill className="object-cover -z-10" />

      {/* Header / Nav */}
      {(showBackButton || title) && (
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between mb-10">
          {showBackButton && (
            backTo ? (
              <Link href={backTo}>
                <ActionButton
                  variant="glossy"
                  color="orange"
                  size="auto"
                  className="px-4 py-2 rounded-xl flex items-center gap-2"
                >
                  <ArrowLeft size={20} className="text-white" />
                  <span className="text-white font-bold hidden sm:block">Quay lại</span>
                </ActionButton>
              </Link>
            ) : (
              <ActionButton
                variant="glossy"
                color="orange"
                size="auto"
                className="px-4 py-2 rounded-xl flex items-center gap-2"
                onClick={() => router.back()}
              >
                <ArrowLeft size={20} className="text-white" />
                <span className="text-white font-bold hidden sm:block">Quay lại</span>
              </ActionButton>
            )
          )}

          {title && <LessonTitle>{title}</LessonTitle>}

          {/* Placeholder for settings/sound toggle */}
          <div className="w-16" />
        </div>
      )}

      <div className="flex-1 w-full max-w-6xl mx-auto flex flex-col items-center">{children}</div>
    </div>
  );
};
