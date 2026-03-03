import { StaticImageData } from "next/image";
import LogoGroup1 from "@/assets/games/find-pattern/group1.png";
import LogoGroup2 from "@/assets/games/find-pattern/group2.png";
import ImgRoom from "@/assets/games/find-differences/lesson1-room.png";
import ImgRoomModified from "@/assets/games/find-differences/lesson1-room-modified.png";
import ImgGarden from "@/assets/games/find-differences/lesson2-garden.png";
import ImgGardenModified from "@/assets/games/find-differences/lesson2-garden-modified.png";
import ImgBeach from "@/assets/games/find-differences/lesson3-beach.png";
import ImgBeachModified from "@/assets/games/find-differences/lesson3-beach-modified.png";
import ImgKitchen from "@/assets/games/find-differences/lesson4-kitchen.png";
import ImgKitchenModified from "@/assets/games/find-differences/lesson4-kitchen-modified.png";
import ImgPlayground from "@/assets/games/find-differences/lesson5-playground.png";
import ImgPlaygroundModified from "@/assets/games/find-differences/lesson5-playground-modified.png";

import ImgNight from "@/assets/games/find-differences/lesson3-night.png";
import ImgNightModified from "@/assets/games/find-differences/lesson3-night-modified.png";
import ImgSpace from "@/assets/games/find-differences/lesson2-space.png";
import ImgSpaceModified from "@/assets/games/find-differences/lesson2-space-modified.png";
import ImgUnderwater from "@/assets/games/find-differences/lesson3-underwater.png";
import ImgUnderwaterModified from "@/assets/games/find-differences/lesson3-underwater-modified.png";
import ImgForest from "@/assets/games/find-differences/lesson4-forest.png";
import ImgForestModified from "@/assets/games/find-differences/lesson4-forest-modified.png";
import ImgCity from "@/assets/games/find-differences/lesson5-city.png";
import ImgCityModified from "@/assets/games/find-differences/lesson5-city-modified.png";

export interface PointConfig {
  x: number; // Percentage from 0-100 horizontally
  y: number; // Percentage from 0-100 vertically
  radius: number; // Relative radius percentage
}

export interface FDLesson {
  id: string;
  title: string;
  originalImage: string | StaticImageData;
  modifiedImage: string | StaticImageData;
  differences: PointConfig[];
  instructionAudio?: string;
}

export interface FDGroup {
  id: string;
  title: string;
  description: string;
  logo: StaticImageData;
  variant: "green" | "blue" | "orange" | "purple";
  lessons: FDLesson[];
}

export const FIND_DIFFERENCES_DATA: FDGroup[] = [
  {
    id: "group1",
    title: "Dễ",
    description: "Cấp độ dễ với 3 điểm khác biệt rõ ràng",
    logo: LogoGroup1,
    variant: "green",
    lessons: [
      {
        id: "lesson1",
        title: "Phòng khách vui nhộn",
        originalImage: ImgRoom,
        modifiedImage: ImgRoomModified,
        differences: [
          { x: 23, y: 33, radius: 8 }, // Đồng hồ bị mất (X = 30% thay vì 12.3%)
          { x: 54, y: 62.1, radius: 8 }, // Gối đổi màu
          { x: 60, y: 89, radius: 6 }, // Quả bóng đỏ trên sàn
        ],
      },
      {
        id: "lesson2",
        title: "Khu vườn thú vị",
        originalImage: ImgGarden,
        modifiedImage: ImgGardenModified,
        differences: [
          { x: 56, y: 47, radius: 6 }, // Mất con bướm trên bầu trời
          { x: 66, y: 11, radius: 6 }, // Mất mặt trời
          { x: 65, y: 91, radius: 6 }, // Xuất hiện con ốc sên trên đường đi
        ],
      },
      {
        id: "lesson3",
        title: "Bãi biển đầy nắng",
        originalImage: ImgBeach,
        modifiedImage: ImgBeachModified,
        differences: [
          { x: 76, y: 13, radius: 7 },
          { x: 74, y: 42, radius: 8 },
          { x: 58, y: 90, radius: 7 },
        ],
      },
      {
        id: "lesson4",
        title: "Căn bếp ấm cúng",
        originalImage: ImgKitchen,
        modifiedImage: ImgKitchenModified,
        differences: [
          { x: 79, y: 92, radius: 6 },
          { x: 62, y: 57, radius: 7 },
          { x: 82, y: 14, radius: 6 },
        ],
      },
      {
        id: "lesson5",
        title: "Sân chơi nhộn nhịp",
        originalImage: ImgPlayground,
        modifiedImage: ImgPlaygroundModified,
        differences: [
          { x: 63, y: 16, radius: 5 },
          { x: 76, y: 60, radius: 6 },
          { x: 60, y: 64, radius: 10 },
        ],
      },
    ],
  },
  {
    id: "group2",
    title: "Trung bình",
    description: "Cấp độ trung bình với nhiều điểm khác biệt nhỏ",
    logo: LogoGroup2,
    variant: "blue",
    lessons: [
      {
        id: "lesson1",
        title: "Bầu trời đêm",
        originalImage: ImgNight,
        modifiedImage: ImgNightModified,
        differences: [
          { x: 65, y: 32, radius: 10 }, // Mặt trăng màu khuyết đổi từ Vàng sang Xanh lơ
          { x: 42, y: 20, radius: 6 }, // Tàu vũ trụ xuất hiện vút bay trong bầu trời
          { x: 75, y: 14, radius: 6 }, // 1 ngôi sao góc trên cùng bên trái bị mất
          { x: 19, y: 61, radius: 5 }, // Cú vọc cây đổi lông từ nâu sang trắng
          { x: 79, y: 91, radius: 5 }, //
        ],
      },
      {
        id: "lesson2",
        title: "Thám hiểm vũ trụ",
        originalImage: ImgSpace,
        modifiedImage: ImgSpaceModified,
        differences: [
          { x: 32, y: 63, radius: 4 },
          { x: 41, y: 35, radius: 4 },
          { x: 49, y: 31, radius: 5 },
          { x: 55, y: 78, radius: 5 },
          { x: 66, y: 30, radius: 5 },
        ],
      },
      {
        id: "lesson3",
        title: "Đại dương sâu thẳm",
        originalImage: ImgUnderwater,
        modifiedImage: ImgUnderwaterModified,
        differences: [
          { x: 56, y: 80, radius: 5 },
          { x: 59, y: 60, radius: 4 },
          { x: 34, y: 70, radius: 5 },
          { x: 34, y: 40, radius: 6 },
          { x: 42, y: 96, radius: 4 },
        ],
      },
      {
        id: "lesson4",
        title: "Khu rừng bí ẩn",
        originalImage: ImgForest,
        modifiedImage: ImgForestModified,
        differences: [
          { x: 65, y: 30, radius: 4 },
          { x: 36, y: 34, radius: 5 },
          { x: 63, y: 62, radius: 5 },
          { x: 75, y: 69, radius: 5 },
          { x: 50, y: 87, radius: 4 },
        ],
      },
      {
        id: "lesson5",
        title: "Thành phố tấp nập",
        originalImage: ImgCity,
        modifiedImage: ImgCityModified,
        differences: [
          { x: 40, y: 62, radius: 5 },
          { x: 35, y: 40, radius: 5 },
          { x: 75, y: 66, radius: 5 },
          { x: 69, y: 57, radius: 6 },
          { x: 83, y: 85, radius: 6 },
        ],
      },
    ],
  },
];
