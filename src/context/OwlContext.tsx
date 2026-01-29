"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import HomeSound from "@/assets/pages-sounds/home.mp3";
//learn numbers
import LearnNumbersGroup1Lesson1Sound from "@/assets/pages-sounds/learn-numbers/learn-numbers-group1-lesson-lesson1.mp3";
import LearnNumbersGroup2Lesson1Sound from "@/assets/pages-sounds/learn-numbers/learn-numbers-group2-lesson-lesson1.mp3";
import LearnNumbersGroup3Lesson1Sound from "@/assets/pages-sounds/learn-numbers/learn-numbers-group3-lesson-lesson1.mp3";
import LearnNumbersGroupLesson2Sound from "@/assets/pages-sounds/learn-numbers/learn-numbers-group-lesson-lesson2.mp3";
import LearnNumbersGroupLesson3Sound from "@/assets/pages-sounds/learn-numbers/learn-numbers-group-lesson-lesson3.mp3";
import LearnNumbersGroupLesson4Sound from "@/assets/pages-sounds/learn-numbers/learn-numbers-group-lesson-lesson4.mp3";
//auth
import LoginSound from "@/assets/pages-sounds/auth/auth-login.mp3";
import SignupSound from "@/assets/pages-sounds/auth/auth-signup.mp3";
import ForgotPasswordSound from "@/assets/pages-sounds/auth/auth-forgot-password.mp3";
import SignupSuccsessSound from "@/assets/pages-sounds/auth/auth-login.mp3";
//upgrade
import UpgradeSound from "@/assets/pages-sounds/upgrade.mp3";
//compare quantity
import CompareQuantityGroup1Lesson1Sound from "@/assets/pages-sounds/compare-quantity/compare-quantity-group1-lesson-lesson1.mp3";
import CompareQuantityGroup2Lesson1Sound from "@/assets/pages-sounds/compare-quantity/compare-quantity-group2-lesson-lesson1.mp3";
import CompareQuantityGroup3Lesson1Sound from "@/assets/pages-sounds/compare-quantity/compare-quantity-group3-lesson-lesson1.mp3";
import CompareQuantityGroup1Lesson2Sound from "@/assets/pages-sounds/compare-quantity/compare-quantity-group1-lesson-lesson2.mp3";
import CompareQuantityGroup2Lesson2Sound from "@/assets/pages-sounds/compare-quantity/compare-quantity-group2-lesson-lesson2.mp3";
import CompareQuantityGroup3Lesson2Sound from "@/assets/pages-sounds/compare-quantity/compare-quantity-group3-lesson-lesson2.mp3";

import { usePathname } from "next/navigation";

const MAP_PATHNAME_TO_SOUND = {
  "/": HomeSound,
  "/games/learn-numbers": HomeSound,
  "/games/learn-numbers/group1": HomeSound,
  "/games/learn-numbers/group2": HomeSound,
  "/games/learn-numbers/group3": HomeSound,
  "/games/learn-numbers/group1/lesson/lesson1": LearnNumbersGroup1Lesson1Sound,
  "/games/learn-numbers/group2/lesson/lesson1": LearnNumbersGroup2Lesson1Sound,
  "/games/learn-numbers/group3/lesson/lesson1": LearnNumbersGroup3Lesson1Sound,
  "/games/learn-numbers/group1/lesson/lesson2": LearnNumbersGroupLesson2Sound,
  "/games/learn-numbers/group2/lesson/lesson2": LearnNumbersGroupLesson2Sound,
  "/games/learn-numbers/group3/lesson/lesson2": LearnNumbersGroupLesson2Sound,
  "/games/learn-numbers/group1/lesson/lesson3": LearnNumbersGroupLesson3Sound,
  "/games/learn-numbers/group2/lesson/lesson3": LearnNumbersGroupLesson3Sound,
  "/games/learn-numbers/group3/lesson/lesson3": LearnNumbersGroupLesson3Sound,
  "/games/learn-numbers/group1/lesson/lesson4": LearnNumbersGroupLesson4Sound,
  "/games/learn-numbers/group2/lesson/lesson4": LearnNumbersGroupLesson4Sound,
  "/games/learn-numbers/group3/lesson/lesson4": LearnNumbersGroupLesson4Sound,
  "/auth/login": LoginSound,
  "/auth/sign-up": SignupSound,
  "/auth/forgot-password": ForgotPasswordSound,
  "/auth/sign-up-success": SignupSuccsessSound,
  "/upgrade": UpgradeSound,
  "/games/compare-quantity/group1/lesson/lesson1": CompareQuantityGroup1Lesson1Sound,
  "/games/compare-quantity/group2/lesson/lesson1": CompareQuantityGroup2Lesson1Sound,
  "/games/compare-quantity/group3/lesson/lesson1": CompareQuantityGroup3Lesson1Sound,
  "/games/compare-quantity/group1/lesson/lesson2": CompareQuantityGroup1Lesson2Sound,
  "/games/compare-quantity/group2/lesson/lesson2": CompareQuantityGroup2Lesson2Sound,
  "/games/compare-quantity/group3/lesson/lesson2": CompareQuantityGroup3Lesson2Sound,
};

interface OwlContextType {
  sound: string;
  setSound: (sound: string) => void;
  isHappy: boolean;
  setIsHappy: (happy: boolean) => void;
}

const OwlContext = createContext<OwlContextType | undefined>(undefined);

export const OwlProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [sound, setSound] = useState<string>(HomeSound);
  const [isHappy, setIsHappy] = useState<boolean>(true);

  useEffect(() => {
    const sound = MAP_PATHNAME_TO_SOUND[pathname as keyof typeof MAP_PATHNAME_TO_SOUND];
    if (sound) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSound(sound);
    } else {
      setSound(HomeSound);
    }
  }, [pathname]);

  return <OwlContext.Provider value={{ sound, setSound, isHappy, setIsHappy }}>{children}</OwlContext.Provider>;
};

export const useOwl = () => {
  const context = useContext(OwlContext);
  if (!context) {
    throw new Error("useOwl must be used within an OwlProvider");
  }
  return context;
};
