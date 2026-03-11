import { StaticImageData } from "next/image";

// Import group logos
const LogoGroup1 = "https://assets.cuthongminh.com/games/learn-landmark/group1.webp"; // Asia
const LogoGroup2 = "https://assets.cuthongminh.com/games/learn-landmark/group2.webp"; // Europe
const LogoGroup3 = "https://assets.cuthongminh.com/games/learn-landmark/group3.webp"; // Americas & Others

// Group 1: Asia
const ImgGreatWall = "https://assets.cuthongminh.com/games/learn-landmark/greatwall.webp";
const ImgAngkorWat = "https://assets.cuthongminh.com/games/learn-landmark/angkorwat.webp";
const ImgTajMahal = "https://assets.cuthongminh.com/games/learn-landmark/tajmahal.webp";
const ImgMtFuji = "https://assets.cuthongminh.com/games/learn-landmark/mtfuji.webp";
const ImgHaLongBay = "https://assets.cuthongminh.com/games/learn-landmark/halongbay.webp";
const ImgPhuket = "https://assets.cuthongminh.com/games/learn-landmark/phuket.webp";

// Group 2: Europe
const ImgEiffelTower = "https://assets.cuthongminh.com/games/learn-landmark/eiffeltower.webp";
const ImgColosseum = "https://assets.cuthongminh.com/games/learn-landmark/colosseum.webp";
const ImgBigBen = "https://assets.cuthongminh.com/games/learn-landmark/bigben.webp";
const ImgLeaningTower = "https://assets.cuthongminh.com/games/learn-landmark/leaningtower.webp";
const ImgWindmills = "https://assets.cuthongminh.com/games/learn-landmark/windmills.webp";
const ImgSagradaFamilia = "https://assets.cuthongminh.com/games/learn-landmark/sagradafamilia.webp";

// Group 3: Americas & Others
const ImgStatueOfLiberty = "https://assets.cuthongminh.com/games/learn-landmark/statueofliberty.webp";
const ImgChristTheRedeemer = "https://assets.cuthongminh.com/games/learn-landmark/christtheredeemer.webp";
const ImgChichenItza = "https://assets.cuthongminh.com/games/learn-landmark/chichenitza.webp";
// Placeholders for the remaining 3 that hit rate limit
const Placeholder16 = "https://assets.cuthongminh.com/games/learn-flag/egypt.webp";
const Placeholder17 = "https://assets.cuthongminh.com/games/learn-flag/australia.webp";
const Placeholder18 = "https://assets.cuthongminh.com/games/learn-flag/southafrica.webp";

import { EntityData } from "@/types/game";

export const LANDMARKS: EntityData[] = [
  // Asia
  { id: "greatwall", name: "Vạn Lý Trường Thành", image: ImgGreatWall, category: "asia" },
  { id: "angkorwat", name: "Angkor Wat", image: ImgAngkorWat, category: "asia" },
  { id: "tajmahal", name: "Taj Mahal", image: ImgTajMahal, category: "asia" },
  { id: "mtfuji", name: "Núi Phú Sĩ", image: ImgMtFuji, category: "asia" },
  { id: "halongbay", name: "Vịnh Hạ Long", image: ImgHaLongBay, category: "asia" },
  { id: "phuket", name: "Voi Đá Phuket", image: ImgPhuket, category: "asia" },

  // Europe
  { id: "eiffeltower", name: "Tháp Eiffel", image: ImgEiffelTower, category: "europe" },
  { id: "colosseum", name: "Đấu Trường La Mã", image: ImgColosseum, category: "europe" },
  { id: "bigben", name: "Tháp Big Ben", image: ImgBigBen, category: "europe" },
  { id: "leaningtower", name: "Tháp Nghiêng Pisa", image: ImgLeaningTower, category: "europe" },
  { id: "windmills", name: "Cối Xay Gió", image: ImgWindmills, category: "europe" },
  { id: "sagradafamilia", name: "Sagrada Familia", image: ImgSagradaFamilia, category: "europe" },

  // Americas & Others
  { id: "statueofliberty", name: "Nữ Thần Tự Do", image: ImgStatueOfLiberty, category: "americas" },
  { id: "chichenitza", name: "Chichen Itza", image: ImgChichenItza, category: "americas" },
  { id: "christtheredeemer", name: "Chúa Cứu Thế", image: ImgChristTheRedeemer, category: "americas" },
  { id: "machupicchu", name: "Machu Picchu", image: Placeholder16, category: "americas" },
  { id: "sydneyoperahouse", name: "Nhà Hát Sydney", image: Placeholder17, category: "americas" },
  { id: "moai", name: "Tượng Moai", image: Placeholder18, category: "americas" },
];

export const GROUPS = [
  {
    id: "group1",
    title: "Châu Á",
    description: "Khám phá các địa danh Châu Á",
    items: ["greatwall", "angkorwat", "tajmahal", "mtfuji", "halongbay", "phuket"],
    logo: LogoGroup1,
    variant: "purple" as const,
  },
  {
    id: "group2",
    title: "Châu Âu",
    description: "Khám phá các địa danh Châu Âu",
    items: ["eiffeltower", "colosseum", "bigben", "leaningtower", "windmills", "sagradafamilia"],
    logo: LogoGroup2,
    variant: "blue" as const,
  },
  {
    id: "group3",
    title: "Châu Mỹ & Khác",
    description: "Khám phá các địa danh Châu Mỹ & Khác",
    items: ["statueofliberty", "chichenitza", "christtheredeemer", "machupicchu", "sydneyoperahouse", "moai"],
    logo: LogoGroup3,
    variant: "green" as const,
  },
];

export function getLandmarksForGroup(groupId: string): EntityData[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return LANDMARKS.filter((landmark) => group.items.includes(landmark.id));
}
