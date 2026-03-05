import { StaticImageData } from "next/image";

// Import group logos
import LogoGroup1 from "@/assets/games/learn-landmark/group1.png"; // Asia
import LogoGroup2 from "@/assets/games/learn-landmark/group2.png"; // Europe
import LogoGroup3 from "@/assets/games/learn-landmark/group3.png"; // Americas & Others

// Group 1: Asia
import ImgGreatWall from "@/assets/games/learn-landmark/greatwall.png";
import ImgAngkorWat from "@/assets/games/learn-landmark/angkorwat.png";
import ImgTajMahal from "@/assets/games/learn-landmark/tajmahal.png";
import ImgMtFuji from "@/assets/games/learn-landmark/mtfuji.png";
import ImgHaLongBay from "@/assets/games/learn-landmark/halongbay.png";
import ImgPhuket from "@/assets/games/learn-landmark/phuket.png";

// Group 2: Europe
import ImgEiffelTower from "@/assets/games/learn-landmark/eiffeltower.png";
import ImgColosseum from "@/assets/games/learn-landmark/colosseum.png";
import ImgBigBen from "@/assets/games/learn-landmark/bigben.png";
import ImgLeaningTower from "@/assets/games/learn-landmark/leaningtower.png";
import ImgWindmills from "@/assets/games/learn-landmark/windmills.png";
import ImgSagradaFamilia from "@/assets/games/learn-landmark/sagradafamilia.png";

// Group 3: Americas & Others
import ImgStatueOfLiberty from "@/assets/games/learn-landmark/statueofliberty.png";
import ImgChristTheRedeemer from "@/assets/games/learn-landmark/christtheredeemer.png";
import ImgChichenItza from "@/assets/games/learn-landmark/chichenitza.png";
// Placeholders for the remaining 3 that hit rate limit
import Placeholder16 from "@/assets/games/learn-flag/egypt.png";
import Placeholder17 from "@/assets/games/learn-flag/australia.png";
import Placeholder18 from "@/assets/games/learn-flag/southafrica.png";

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
