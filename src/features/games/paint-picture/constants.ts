import { StaticImageData } from "next/image";
const LogoGroup1 = "https://assets.cuthongminh.com/games/paint-picture/group1.webp";
const LogoGroup2 = "https://assets.cuthongminh.com/games/paint-picture/group2.webp";
const LogoGroup3 = "https://assets.cuthongminh.com/games/paint-picture/group3.webp";

export interface ColorRegion {
  id: string;
  label: string;
  guideColor: string;
}

export interface ColoringImage {
  id: string;
  name: string;
  svgPath: string;
  regions: ColorRegion[];
}

// ============================================
// Group 1: Animals
// ============================================
const ANIMAL_IMAGES: ColoringImage[] = [
  {
    id: "fish",
    name: "Con Cá",
    svgPath: "https://assets.cuthongminh.com/games/paint-picture/svg/fish.svg",
    regions: [
      { id: "body", label: "Thân cá", guideColor: "#FF6B35" },
      { id: "tail", label: "Đuôi cá", guideColor: "#FFD700" },
      { id: "top-fin", label: "Vây trên", guideColor: "#FF4444" },
      { id: "bottom-fin", label: "Vây dưới", guideColor: "#FF4444" },
      { id: "eye", label: "Mắt", guideColor: "#FFFFFF" },
    ],
  },
  {
    id: "butterfly",
    name: "Con Bướm",
    svgPath: "https://assets.cuthongminh.com/games/paint-picture/svg/butterfly.svg",
    regions: [
      { id: "body", label: "Thân bướm", guideColor: "#8B4513" },
      { id: "head", label: "Đầu", guideColor: "#A0522D" },
      { id: "left-top-wing", label: "Cánh trái trên", guideColor: "#FF69B4" },
      { id: "right-top-wing", label: "Cánh phải trên", guideColor: "#FF69B4" },
      { id: "left-bottom-wing", label: "Cánh trái dưới", guideColor: "#DDA0DD" },
      { id: "right-bottom-wing", label: "Cánh phải dưới", guideColor: "#DDA0DD" },
    ],
  },
  {
    id: "cat",
    name: "Con Mèo",
    svgPath: "https://assets.cuthongminh.com/games/paint-picture/svg/cat.svg",
    regions: [
      { id: "body", label: "Thân mèo", guideColor: "#FFA500" },
      { id: "head", label: "Đầu", guideColor: "#FFA500" },
      { id: "left-ear", label: "Tai trái", guideColor: "#FF8C00" },
      { id: "right-ear", label: "Tai phải", guideColor: "#FF8C00" },
      { id: "tail", label: "Đuôi", guideColor: "#FF8C00" },
    ],
  },
];

// ============================================
// Group 2: Nature
// ============================================
const NATURE_IMAGES: ColoringImage[] = [
  {
    id: "flower",
    name: "Bông Hoa",
    svgPath: "https://assets.cuthongminh.com/games/paint-picture/svg/flower.svg",
    regions: [
      { id: "center", label: "Nhụy hoa", guideColor: "#FFD700" },
      { id: "petal-top", label: "Cánh trên", guideColor: "#FF6347" },
      { id: "petal-right", label: "Cánh phải", guideColor: "#FF4500" },
      { id: "petal-bottom-right", label: "Cánh dưới phải", guideColor: "#FF6347" },
      { id: "petal-bottom-left", label: "Cánh dưới trái", guideColor: "#FF4500" },
      { id: "petal-left", label: "Cánh trái", guideColor: "#FF6347" },
      { id: "left-leaf", label: "Lá trái", guideColor: "#32CD32" },
      { id: "right-leaf", label: "Lá phải", guideColor: "#32CD32" },
    ],
  },
  {
    id: "tree",
    name: "Cái Cây",
    svgPath: "https://assets.cuthongminh.com/games/paint-picture/svg/tree.svg",
    regions: [
      { id: "trunk", label: "Thân cây", guideColor: "#8B4513" },
      { id: "crown", label: "Tán cây", guideColor: "#228B22" },
      { id: "top-leaves", label: "Lá trên", guideColor: "#32CD32" },
      { id: "left-leaves", label: "Lá trái", guideColor: "#2E8B57" },
      { id: "right-leaves", label: "Lá phải", guideColor: "#2E8B57" },
      { id: "ground", label: "Mặt đất", guideColor: "#DEB887" },
    ],
  },
  {
    id: "sun",
    name: "Mặt Trời",
    svgPath: "https://assets.cuthongminh.com/games/paint-picture/svg/sun.svg",
    regions: [
      { id: "sun-body", label: "Mặt trời", guideColor: "#FFD700" },
      { id: "ray-top", label: "Tia sáng", guideColor: "#FFA500" },
      { id: "ray-top-right", label: "Tia sáng", guideColor: "#FFA500" },
      { id: "ray-right", label: "Tia sáng", guideColor: "#FFA500" },
      { id: "ray-bottom-right", label: "Tia sáng", guideColor: "#FFA500" },
      { id: "ray-bottom", label: "Tia sáng", guideColor: "#FFA500" },
      { id: "ray-bottom-left", label: "Tia sáng", guideColor: "#FFA500" },
      { id: "ray-left", label: "Tia sáng", guideColor: "#FFA500" },
      { id: "ray-top-left", label: "Tia sáng", guideColor: "#FFA500" },
    ],
  },
];

// ============================================
// Group 3: Toys
// ============================================
const TOY_IMAGES: ColoringImage[] = [
  {
    id: "car",
    name: "Xe Ô Tô",
    svgPath: "https://assets.cuthongminh.com/games/paint-picture/svg/car.svg",
    regions: [
      { id: "car-body", label: "Thân xe", guideColor: "#FF0000" },
      { id: "car-top", label: "Nóc xe", guideColor: "#CC0000" },
      { id: "window-left", label: "Cửa sổ trái", guideColor: "#87CEEB" },
      { id: "window-right", label: "Cửa sổ phải", guideColor: "#87CEEB" },
      { id: "wheel-left", label: "Bánh xe trái", guideColor: "#333333" },
      { id: "wheel-right", label: "Bánh xe phải", guideColor: "#333333" },
    ],
  },
  {
    id: "robot",
    name: "Rô Bốt",
    svgPath: "https://assets.cuthongminh.com/games/paint-picture/svg/robot.svg",
    regions: [
      { id: "body", label: "Thân", guideColor: "#4169E1" },
      { id: "head", label: "Đầu", guideColor: "#6495ED" },
      { id: "left-arm", label: "Tay trái", guideColor: "#4682B4" },
      { id: "right-arm", label: "Tay phải", guideColor: "#4682B4" },
      { id: "left-leg", label: "Chân trái", guideColor: "#1E90FF" },
      { id: "right-leg", label: "Chân phải", guideColor: "#1E90FF" },
    ],
  },
  {
    id: "teddy",
    name: "Gấu Bông",
    svgPath: "https://assets.cuthongminh.com/games/paint-picture/svg/teddy.svg",
    regions: [
      { id: "body", label: "Thân gấu", guideColor: "#D2691E" },
      { id: "belly", label: "Bụng", guideColor: "#FFDEAD" },
      { id: "head", label: "Đầu", guideColor: "#D2691E" },
      { id: "left-ear", label: "Tai trái", guideColor: "#CD853F" },
      { id: "right-ear", label: "Tai phải", guideColor: "#CD853F" },
      { id: "left-arm", label: "Tay trái", guideColor: "#A0522D" },
      { id: "right-arm", label: "Tay phải", guideColor: "#A0522D" },
    ],
  },
];

export const ALL_IMAGES: Record<string, ColoringImage[]> = {
  group1: ANIMAL_IMAGES,
  group2: NATURE_IMAGES,
  group3: TOY_IMAGES,
};

export const AI_BACKGROUNDS: Record<string, string> = {
  group1: "https://assets.cuthongminh.com/games/paint-picture/ai/animal.webp",
  group2: "https://assets.cuthongminh.com/games/paint-picture/ai/nature.webp",
  group3: "https://assets.cuthongminh.com/games/paint-picture/ai/toys.webp",
};

export interface GroupData {
  id: string;
  title: string;
  description: string;
  logo: string | StaticImageData;
  variant: "green" | "blue" | "purple" | "orange";
}

export const GROUPS: GroupData[] = [
  {
    id: "group1",
    title: "Động vật",
    description: "Tô màu các con vật dễ thương",
    logo: LogoGroup1,
    variant: "orange" as const,
  },
  {
    id: "group2",
    title: "Thiên nhiên",
    description: "Tô màu cây cối và thiên nhiên",
    logo: LogoGroup2,
    variant: "green" as const,
  },
  {
    id: "group3",
    title: "Đồ chơi",
    description: "Tô màu đồ chơi vui nhộn",
    logo: LogoGroup3,
    variant: "purple" as const,
  },
];

// Color palette for kids to pick from
export const COLOR_PALETTE = [
  { name: "Đỏ", hex: "#FF0000" },
  { name: "Cam", hex: "#FFA500" },
  { name: "Vàng", hex: "#FFD700" },
  { name: "Xanh lá", hex: "#32CD32" },
  { name: "Xanh dương", hex: "#1E90FF" },
  { name: "Tím", hex: "#9370DB" },
  { name: "Hồng", hex: "#FF69B4" },
  { name: "Nâu", hex: "#8B4513" },
  { name: "Trắng", hex: "#FFFFFF" },
  { name: "Đen", hex: "#333333" },
  { name: "Xám", hex: "#808080" },
  { name: "Xanh ngọc", hex: "#40E0D0" },
];
