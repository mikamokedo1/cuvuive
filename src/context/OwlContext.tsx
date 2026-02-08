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
};

export const MAP_PATHNAME_TO_TEXT = {
  "/games/compare-quantity/group1/lesson/lesson2": "Bên trái nhiều đồ vật hơn bên phải, Pé chọn dấu lớn nhé",
  "/games/compare-quantity/group2/lesson/lesson2": "Bên trái ít đồ vật hơn bên phải, Pé chọn dấu Pé nhé",
  "/games/compare-quantity/group3/lesson/lesson2": "Bên trái và bên phải có số đồ vật bằng nhau, Pé chọn dấu bằng nhé",
  "/games/compare-quantity/group1/lesson/lesson3": "Số bên trái lớn hơn bên phải, Pé chọn dấu lớn nhé",
  "/games/compare-quantity/group2/lesson/lesson3": "Số bên trái nhỏ hơn bên phải, Pé chọn dấu Pé nhé",
  "/games/compare-quantity/group3/lesson/lesson3": "Số bên trái và bên phải bằng nhau, Pé chọn dấu bằng nhé",
  "/games/compare-quantity/group1/lesson/lesson4": "Pé tập viết dấu lớn",
  "/games/compare-quantity/group2/lesson/lesson4": "Pé tập viết dấu Pé",
  "/games/compare-quantity/group3/lesson/lesson4": "Pé tập viết dấu bằng",
  "/games/compare-quantity/group4/lesson/lesson1": "So sánh đồ vật và chọn dấu lớn, Pé hoặc bằng nhé",
  "/games/compare-quantity/group4/lesson/lesson2": "So sánh số và chọn dấu lớn, Pé hoặc bằng nhé",
  "/games/learn-color/group1/lesson/lesson1": "Pé học màu đỏ, màu xanh dương, màu vàng và màu xanh lá",
  "/games/learn-color/group1/lesson/lesson2": "Pé chọn màu phía dưới giống phía trên nhé",
  "/games/learn-color/group1/lesson/lesson3": "Hình phía trên có màu gì?",
  "/games/learn-color/group2/lesson/lesson1": "Pé học màu cam, màu tím, màu hồng, màu nâu, màu đen và màu trắng",
  "/games/learn-color/group2/lesson/lesson2": "Pé chọn màu phía dưới giống phía trên nhé",
  "/games/learn-color/group2/lesson/lesson3": "Hình phía trên có màu gì?",
  "/games/learn-color/group3/lesson/lesson1": "Pé ôn lại các màu đã học",
  "/games/learn-color/group3/lesson/lesson2": "Pé chọn màu phía dưới giống phía trên nhé",
  "/games/learn-color/group3/lesson/lesson3": "Hình phía trên có màu gì?",
  "/games/learn-shape/group1/lesson/lesson1": "Pé học hình vuông, tròn, tam giác, chữ nhật",
  "/games/learn-shape/group1/lesson/lesson2": "Chọn hình bị thiếu",
  "/games/learn-shape/group1/lesson/lesson3": "Chọn hình dạng của đồ vật",
  "/games/learn-shape/group1/lesson/lesson4": "Pé tập vẻ hình",
  "/games/learn-shape/group2/lesson/lesson1": "Pé học hình lục giác, ngôi sao, hình thoi, bầu dục và hình thang",
  "/games/learn-shape/group2/lesson/lesson2": "Chọn hình bị thiếu",
  "/games/learn-shape/group2/lesson/lesson3": "Chọn hình dạng của đồ vật",
  "/games/learn-shape/group2/lesson/lesson4": "Pé tập vẻ hình",
  "/games/learn-animal/group1/lesson/lesson1": "Pé học các con vật được nuôi trong nhà",
  "/games/learn-animal/group1/lesson/lesson2": "Pé chọn con vật đang bị ẩn nhé",
  "/games/learn-animal/group1/lesson/lesson3": "Pé ghép đôi cho các con vật đi nào",
  "/games/learn-animal/group2/lesson/lesson1": "Pé học các con vật sống trong rừng",
  "/games/learn-animal/group2/lesson/lesson2": "Pé chọn con vật đang bị ẩn nhé",
  "/games/learn-animal/group2/lesson/lesson3": "Pé ghép đôi cho các con vật đi nào",
  "/games/learn-animal/group3/lesson/lesson1": "Pé học các con vật sống dưới nước",
  "/games/learn-animal/group3/lesson/lesson2": "Pé chọn con vật đang bị ẩn nhé",
  "/games/learn-animal/group3/lesson/lesson3": "Pé ghép đôi cho các con vật đi nào",
};

interface OwlContextType {
  sound: string;
  setSound: (sound: string) => void;
  isHappy: boolean;
  setIsHappy: (happy: boolean) => void;
  textSpeak: string;
  setTextSpeak: (textSpeak: string) => void;
}

const OwlContext = createContext<OwlContextType | undefined>(undefined);

export const OwlProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [sound, setSound] = useState<string>(HomeSound);
  const [textSpeak, setTextSpeak] = useState<string>(
    MAP_PATHNAME_TO_TEXT[pathname as keyof typeof MAP_PATHNAME_TO_TEXT],
  );
  const [isHappy, setIsHappy] = useState<boolean>(true);

  useEffect(() => {
    const sound = MAP_PATHNAME_TO_SOUND[pathname as keyof typeof MAP_PATHNAME_TO_SOUND];
    if (sound) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSound(sound);
    } else {
      setSound(HomeSound);
    }

    const text = MAP_PATHNAME_TO_TEXT[pathname as keyof typeof MAP_PATHNAME_TO_TEXT];
    if (text) {
      setTextSpeak(text);
    } else {
      setTextSpeak("");
    }
  }, [pathname]);

  return (
    <OwlContext.Provider value={{ sound, setSound, isHappy, setIsHappy, textSpeak, setTextSpeak }}>
      {children}
    </OwlContext.Provider>
  );
};

export const useOwl = () => {
  const context = useContext(OwlContext);
  if (!context) {
    throw new Error("useOwl must be used within an OwlProvider");
  }
  return context;
};
