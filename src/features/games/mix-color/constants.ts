import { StaticImageData } from "next/image";
import LogoGroup1 from "@/assets/games/mix-color/group1.png";
import LogoGroup2 from "@/assets/games/mix-color/group2.png";
import LogoGroup3 from "@/assets/games/mix-color/group3.webp";

export interface ColorMix {
  name: string;
  hex: string;
}

export interface MixingRule {
  id: string;
  color1: ColorMix;
  color2: ColorMix;
  result: ColorMix;
}

export const MIXING_RULES: MixingRule[] = [
  // Primary to Secondary
  {
    id: "red_yellow",
    color1: { name: "Đỏ", hex: "#FF0000" },
    color2: { name: "Vàng", hex: "#FFFF00" },
    result: { name: "Cam", hex: "#FFA500" },
  },
  {
    id: "red_blue",
    color1: { name: "Đỏ", hex: "#FF0000" },
    color2: { name: "Xanh dương", hex: "#2BC0FF" },
    result: { name: "Tím", hex: "#800080" },
  },
  {
    id: "blue_yellow",
    color1: { name: "Xanh dương", hex: "#2BC0FF" },
    color2: { name: "Vàng", hex: "#FFFF00" },
    result: { name: "Xanh lá", hex: "#009000" },
  },

  // Advanced / Tints
  {
    id: "red_white",
    color1: { name: "Đỏ", hex: "#FF0000" },
    color2: { name: "Trắng", hex: "#FFFFFF" },
    result: { name: "Hồng", hex: "#FFC0CB" },
  },
  {
    id: "black_white",
    color1: { name: "Đen", hex: "#000000" },
    color2: { name: "Trắng", hex: "#FFFFFF" },
    result: { name: "Xám", hex: "#808080" },
  },
  {
    id: "red_green",
    color1: { name: "Đỏ", hex: "#FF0000" },
    color2: { name: "Xanh lá", hex: "#009000" },
    result: { name: "Nâu", hex: "#8B4513" },
  },
];

export interface GroupData {
  id: string;
  title: string;
  description: string;
  logo: StaticImageData;
  variant: "green" | "blue" | "purple" | "orange";
  rules: string[];
}

export const GROUPS: GroupData[] = [
  {
    id: "group1",
    title: "Màu cơ bản",
    description: "Học cách pha màu cơ bản",
    rules: ["red_yellow", "red_blue", "blue_yellow"],
    logo: LogoGroup1,
    variant: "orange" as const,
  },
  {
    id: "group2",
    title: "Màu nâng cao",
    description: "Học cách pha thêm các màu khác",
    rules: ["red_white", "black_white", "red_green"],
    logo: LogoGroup2,
    variant: "purple" as const,
  },
  {
    id: "group3",
    title: "Luyện tập",
    description: "Ôn tập tất cả các cách pha màu",
    rules: ["red_yellow", "red_blue", "blue_yellow", "red_white", "black_white", "red_green"],
    logo: LogoGroup3,
    variant: "green" as const,
  },
];
