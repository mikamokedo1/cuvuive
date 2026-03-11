import { StaticImageData } from "next/image";
const LogoGroup1 = "https://assets.cuthongminh.com/games/find-pattern/group1.webp";
const LogoGroup2 = "https://assets.cuthongminh.com/games/find-pattern/group2.webp";
const ImgRoom = "https://assets.cuthongminh.com/games/find-differences/lesson1-room.webp";
const ImgRoomModified = "https://assets.cuthongminh.com/games/find-differences/lesson1-room-modified.webp";
const ImgGarden = "https://assets.cuthongminh.com/games/find-differences/lesson2-garden.webp";
const ImgGardenModified = "https://assets.cuthongminh.com/games/find-differences/lesson2-garden-modified.webp";
const ImgBeach = "https://assets.cuthongminh.com/games/find-differences/lesson3-beach.webp";
const ImgBeachModified = "https://assets.cuthongminh.com/games/find-differences/lesson3-beach-modified.webp";
const ImgKitchen = "https://assets.cuthongminh.com/games/find-differences/lesson4-kitchen.webp";
const ImgKitchenModified = "https://assets.cuthongminh.com/games/find-differences/lesson4-kitchen-modified.webp";
const ImgPlayground = "https://assets.cuthongminh.com/games/find-differences/lesson5-playground.webp";
const ImgPlaygroundModified = "https://assets.cuthongminh.com/games/find-differences/lesson5-playground-modified.webp";

const ImgNight = "https://assets.cuthongminh.com/games/find-differences/lesson3-night.webp";
const ImgNightModified = "https://assets.cuthongminh.com/games/find-differences/lesson3-night-modified.webp";
const ImgSpace = "https://assets.cuthongminh.com/games/find-differences/lesson2-space.webp";
const ImgSpaceModified = "https://assets.cuthongminh.com/games/find-differences/lesson2-space-modified.webp";
const ImgUnderwater = "https://assets.cuthongminh.com/games/find-differences/lesson3-underwater.webp";
const ImgUnderwaterModified = "https://assets.cuthongminh.com/games/find-differences/lesson3-underwater-modified.webp";
const ImgForest = "https://assets.cuthongminh.com/games/find-differences/lesson4-forest.webp";
const ImgForestModified = "https://assets.cuthongminh.com/games/find-differences/lesson4-forest-modified.webp";
const ImgCity = "https://assets.cuthongminh.com/games/find-differences/lesson5-city.webp";
const ImgCityModified = "https://assets.cuthongminh.com/games/find-differences/lesson5-city-modified.webp";

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
  logo: string | StaticImageData;
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
