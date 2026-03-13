"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useOwl } from "@/context/OwlContext";
import ownLearningImg from "@/assets/own-learning.webp";
import { playSound } from "@/libs/utils/playSound";
import { usePathname } from "next/navigation";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { motion } from "framer-motion";

const DO_NOT_SHOW_PATHNAMES = ["/auth/update-password"];

export const OwlCompanion = () => {
  const pathname = usePathname();
  const { sound, textSpeak } = useOwl();
  const [isBouncing, setIsBouncing] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const { speak } = useTextToSpeech();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const owlRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      let timerId: NodeJS.Timeout;
      const handleResize = () => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
          setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        }, 300);
      };
      window.addEventListener("resize", handleResize);
      return () => {
        clearTimeout(timerId);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

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

  const leftConstraint = -10;
  const rightConstraint = windowSize.width ? windowSize.width - 128 - 16 : 0;
  const topConstraint = windowSize.height ? -(windowSize.height - 128 - 16) : 0;
  const bottomConstraint = 10;

  return (
    <motion.div
      ref={owlRef}
      drag
      dragConstraints={{
        left: leftConstraint,
        right: Math.max(0, rightConstraint),
        top: Math.min(0, topConstraint),
        bottom: bottomConstraint,
      }}
      dragElastic={0.1}
      dragMomentum={false}
      className="fixed bottom-4 left-4 z-50 cursor-grab active:cursor-grabbing"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`transition-transform duration-300 ${
          isBouncing ? "scale-110" : "scale-100"
        } ${isJumping ? "-translate-y-10" : "translate-y-0"}`}
      >
        <div className="relative w-20 h-20 md:w-32 md:h-32 drop-shadow-xl filter">
          <Image
            src={ownLearningImg}
            alt="Owl Companion"
            width={128}
            height={128}
            className="object-contain w-full h-full"
            draggable={false}
            priority
            sizes="(max-width: 768px) 80px, 128px"
          />
        </div>

        {/* Optional: Simple speech bubble or visual cue could go here if requested later */}
      </div>
    </motion.div>
  );
};
