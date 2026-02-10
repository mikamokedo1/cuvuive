import { StaticImageData } from "next/image";

// Import images
import RedApple from "@/assets/games/learn-color/red-apple.png";
import BlueDolphin from "@/assets/games/learn-color/blue-whale.webp";
import YellowBanana from "@/assets/games/learn-color/yellow-banana.png";
import GreenFrog from "@/assets/games/learn-color/green-frog.webp";
import OrangeFruit from "@/assets/games/learn-color/orange-fruit.png";
import PurpleGrape from "@/assets/games/learn-color/purple-grape.png";
import PinkPig from "@/assets/games/learn-color/pink-pig.png";
import BrownBear from "@/assets/games/learn-color/brown-bear.png";
import BlackCat from "@/assets/games/learn-color/black-cat.png";
import WhiteCloud from "@/assets/games/learn-color/cloud.webp";
import LogoLesson1 from "@/assets/games/learn-color/learn-color-logo-1.webp";
import LogoLesson2 from "@/assets/games/learn-color/learn-color-logo-2.webp";
import LogoLesson3 from "@/assets/games/learn-color/learn-color-logo-3.webp";

export interface ColorData {
  id: string;
  name: string;
  hex: string;
  audio?: string;
  isBasic: boolean;
  image: StaticImageData; // Changed to StaticImageData
  imageName: string; // e.g. "Quả táo", "Cá voi"
}

export const COLORS: ColorData[] = [
  // Basic Colors
  { id: "red", name: "Màu Đỏ", hex: "#FF0000", isBasic: true, image: RedApple, imageName: "Quả Táo" },
  { id: "blue", name: "Màu Xanh Dương", hex: "#2BC0FF", isBasic: true, image: BlueDolphin, imageName: "Cá Heo" },
  { id: "yellow", name: "Màu Vàng", hex: "#FFFF00", isBasic: true, image: YellowBanana, imageName: "Quả Chuối" },
  { id: "green", name: "Màu Xanh Lá", hex: "#009000", isBasic: true, image: GreenFrog, imageName: "Con Ếch" },

  // Advanced/Secondary Colors
  { id: "orange", name: "Màu Cam", hex: "#FFA500", isBasic: false, image: OrangeFruit, imageName: "Quả Cam" },
  { id: "purple", name: "Màu Tím", hex: "#800080", isBasic: false, image: PurpleGrape, imageName: "Chùm Nho" },
  { id: "pink", name: "Màu Hồng", hex: "#FFC0CB", isBasic: false, image: PinkPig, imageName: "Con Heo" },
  { id: "brown", name: "Màu Nâu", hex: "#A52A2A", isBasic: false, image: BrownBear, imageName: "Gấu Bông" },
  { id: "black", name: "Màu Đen", hex: "#000000", isBasic: false, image: BlackCat, imageName: "Con Mèo" },
  { id: "white", name: "Màu Trắng", hex: "#FFFFFF", isBasic: false, image: WhiteCloud, imageName: "Đám Mây" },
];

export const GROUPS = [
  {
    id: "group1",
    title: "Màu cơ bản",
    description: "Học các màu sắc cơ bản",
    colors: ["red", "blue", "yellow", "green"],
    logo: LogoLesson1,
    variant: "green" as const,
  },
  {
    id: "group2",
    title: "Màu nâng cao",
    description: "Học thêm nhiều màu sắc khác",
    colors: ["orange", "purple", "pink", "brown", "black", "white"],
    logo: LogoLesson2,
    variant: "orange" as const,
  },
  {
    id: "group3",
    title: "Luyện tập",
    description: "Ôn tập tất cả các màu",
    colors: COLORS.map((c) => c.id),
    logo: LogoLesson3,
    variant: "purple" as const,
  },
];
