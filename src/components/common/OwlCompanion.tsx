"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useOwl } from "@/context/OwlContext";
import ownLearningImg from "@/assets/own-learning.webp";
import { playSound } from "@/libs/utils/playSound";
import { usePathname } from "next/navigation";
import { useTextToSpeech } from "@/libs/hooks/useTextToSpeech";

const DO_NOT_SHOW_PATHNAMES = ["/auth/update-password"];

export const OwlCompanion = () => {
  const pathname = usePathname();
  const { sound, textSpeak } = useOwl();
  const [isBouncing, setIsBouncing] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const { speak } = useTextToSpeech();

  const handleClick = () => {
    setIsJumping(true);

    if (textSpeak) {
      speak(textSpeak);
    } else {
      playSound(sound);
    }

    setTimeout(() => setIsJumping(false), 500);
  };

  const handleMouseEnter = () => {
    setIsBouncing(true);
  };

  const handleMouseLeave = () => {
    setIsBouncing(false);
  };

  if (DO_NOT_SHOW_PATHNAMES.includes(pathname)) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 cursor-pointer transition-transform duration-300 ${
        isBouncing ? "scale-110" : "scale-100"
      } ${isJumping ? "-translate-y-10" : "translate-y-0"}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-24 h-24 md:w-32 md:h-32 drop-shadow-xl filter">
        <Image src={ownLearningImg} alt="Owl Companion" fill className="object-contain" priority />
      </div>

      {/* Optional: Simple speech bubble or visual cue could go here if requested later */}
    </div>
  );
};
