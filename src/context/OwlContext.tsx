"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";

// Use string paths to public directory instead of static imports.
// This avoids bundling all MP3 files into the JS bundle on every route.
const HOME_SOUND = "/sounds/home.mp3";

const MAP_PATHNAME_TO_SOUND: Record<string, string> = {
  "/": HOME_SOUND,
  "/games/learn-numbers": HOME_SOUND,
  "/games/learn-numbers/group1": HOME_SOUND,
  "/games/learn-numbers/group2": HOME_SOUND,
  "/games/learn-numbers/group3": HOME_SOUND,
  "/games/learn-numbers/group1/lesson/lesson1": "/sounds/learn-numbers/learn-numbers-group1-lesson-lesson1.mp3",
  "/games/learn-numbers/group2/lesson/lesson1": "/sounds/learn-numbers/learn-numbers-group2-lesson-lesson1.mp3",
  "/games/learn-numbers/group3/lesson/lesson1": "/sounds/learn-numbers/learn-numbers-group3-lesson-lesson1.mp3",
  "/games/learn-numbers/group1/lesson/lesson2": "/sounds/learn-numbers/learn-numbers-group-lesson-lesson2.mp3",
  "/games/learn-numbers/group2/lesson/lesson2": "/sounds/learn-numbers/learn-numbers-group-lesson-lesson2.mp3",
  "/games/learn-numbers/group3/lesson/lesson2": "/sounds/learn-numbers/learn-numbers-group-lesson-lesson2.mp3",
  "/games/learn-numbers/group1/lesson/lesson3": "/sounds/learn-numbers/learn-numbers-group-lesson-lesson3.mp3",
  "/games/learn-numbers/group2/lesson/lesson3": "/sounds/learn-numbers/learn-numbers-group-lesson-lesson3.mp3",
  "/games/learn-numbers/group3/lesson/lesson3": "/sounds/learn-numbers/learn-numbers-group-lesson-lesson3.mp3",
  "/games/learn-numbers/group1/lesson/lesson4": "/sounds/learn-numbers/learn-numbers-group-lesson-lesson4.mp3",
  "/games/learn-numbers/group2/lesson/lesson4": "/sounds/learn-numbers/learn-numbers-group-lesson-lesson4.mp3",
  "/games/learn-numbers/group3/lesson/lesson4": "/sounds/learn-numbers/learn-numbers-group-lesson-lesson4.mp3",
  "/auth/login": "/sounds/auth/auth-login.mp3",
  "/auth/sign-up": "/sounds/auth/auth-signup.mp3",
  "/auth/forgot-password": "/sounds/auth/auth-forgot-password.mp3",
  "/auth/sign-up-success": "/sounds/auth/auth-login.mp3",
  "/upgrade": "/sounds/upgrade.mp3",
  "/games/compare-quantity/group1/lesson/lesson1":
    "/sounds/compare-quantity/compare-quantity-group1-lesson-lesson1.mp3",
  "/games/compare-quantity/group2/lesson/lesson1":
    "/sounds/compare-quantity/compare-quantity-group2-lesson-lesson1.mp3",
  "/games/compare-quantity/group3/lesson/lesson1":
    "/sounds/compare-quantity/compare-quantity-group3-lesson-lesson1.mp3",
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
  "/games/learn-vehicle/group1/lesson/lesson1": "Pé học các phương tiện đường bộ",
  "/games/learn-vehicle/group1/lesson/lesson2": "Pé chọn phương tiện đang bị ẩn nhé",
  "/games/learn-vehicle/group1/lesson/lesson3": "Pé ghép đôi cho các phương tiện đi nào",
  "/games/learn-vehicle/group2/lesson/lesson1": "Pé học các phương tiện đường thủy",
  "/games/learn-vehicle/group2/lesson/lesson2": "Pé chọn phương tiện đang bị ẩn nhé",
  "/games/learn-vehicle/group2/lesson/lesson3": "Pé ghép đôi cho các phương tiện đi nào",
  "/games/learn-vehicle/group3/lesson/lesson1": "Pé học các phương tiện đường không",
  "/games/learn-vehicle/group3/lesson/lesson2": "Pé chọn phương tiện đang bị ẩn nhé",
  "/games/learn-vehicle/group3/lesson/lesson3": "Pé ghép đôi cho các phương tiện đi nào",
  "/games/learn-vehicle/group4/lesson/lesson1": "Pé chọn phương tiện đang bị ẩn nhé",
  "/games/learn-vehicle/group4/lesson/lesson2": "Pé ghép đôi cho các phương tiện đi nào",
  "/games/learn-vehicle/group4/lesson/lesson3": "Pé chọn môi trường phù hợp cho các phương tiện hoạt động",
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
  const [sound, setSound] = useState<string>(HOME_SOUND);
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
      setSound(HOME_SOUND);
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
