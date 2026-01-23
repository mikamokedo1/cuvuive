"use client";

import { ActionButton } from "@/components/common/ActionButton";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BgImage from "@/assets/bg.jpg";
import Header from "./Header";

interface GameLayoutProps {
  children: React.ReactNode;
  title?: string;
  backTo?: string;
  showBackButton?: boolean;
}

export const GameLayout = ({ children, title, backTo, showBackButton = true }: GameLayoutProps) => {
  const router = useRouter();

  return (
    <div className="min-h-screen relative flex flex-col py-6 px-4 overflow-hidden">
      <Header />
      {/* Background */}
      <Image src={BgImage} alt="Background" fill className="object-cover -z-10" priority />

      {/* Header / Nav */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between mb-6">
        {showBackButton && (
          <ActionButton
            variant="glossy"
            color="orange"
            size="auto"
            className="px-4 py-2 rounded-xl flex items-center gap-2"
            onClick={() => (backTo ? router.push(backTo) : router.back())}
          >
            <ArrowLeft size={20} className="text-white" />
            <span className="text-white font-bold">Quay lại</span>
          </ActionButton>
        )}

        {title && (
          <span className="text-3xl md:text-6xl text-orange-500 font-display font-bold text-center drop-shadow-sm">
            {title}
          </span>
        )}

        {/* Placeholder for settings/sound toggle */}
        <div className="w-16" />
      </div>

      <div className="flex-1 w-full max-w-6xl mx-auto flex flex-col items-center justify-center">{children}</div>
    </div>
  );
};
