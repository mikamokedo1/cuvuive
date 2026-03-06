import { StaticImageData } from "next/image";

// Import group logos
import LogoGroup1 from "@/assets/games/learn-costume/group1.png"; // Asia
import LogoGroup2 from "@/assets/games/learn-costume/group2.png"; // Europe
import LogoGroup3 from "@/assets/games/learn-costume/group3.png"; // Americas & Others

import PlaceholderCharacter from "@/assets/games/learn-costume/character.png";

// Import Asia Costumes
import ImgAoDai from "@/assets/games/learn-costume/aodai.png";
import WornAoDai from "@/assets/games/learn-costume/character_aodai.png";
import ImgBatik from "@/assets/games/learn-costume/batik.png";
import WornBatik from "@/assets/games/learn-costume/character_batik.png";
import ImgKimono from "@/assets/games/learn-costume/kimono.png";
import WornKimono from "@/assets/games/learn-costume/character_kimono.png";
import ImgHanbok from "@/assets/games/learn-costume/hanbok.png";
import WornHanbok from "@/assets/games/learn-costume/character_hanbok.png";
import ImgSari from "@/assets/games/learn-costume/sari.png";
import WornSari from "@/assets/games/learn-costume/character_sari.png";
import ImgSuongxam from "@/assets/games/learn-costume/suongxam.png";
import WornSuongxam from "@/assets/games/learn-costume/character_suongxam.png";

// Placeholders for Groups 2 & 3
import PlaceholderCostume from "@/assets/games/learn-costume/character.png";

// Import Europe Costumes (Partial due to quota)
import ImgKilt from "@/assets/games/learn-costume/kilt.png";
import WornKilt from "@/assets/games/learn-costume/character_kilt.png";
import ImgDirndl from "@/assets/games/learn-costume/dirndl.png";
import WornDirndl from "@/assets/games/learn-costume/character_dirndl.png";
import ImgFlamenco from "@/assets/games/learn-costume/flamenco.png";
import ImgSarafan from "@/assets/games/learn-costume/sarafan.png";
import WornSarafan from "@/assets/games/learn-costume/character_sarafan.png";
import ImgKlompen from "@/assets/games/learn-costume/klompen.png";

import { EntityData } from "@/types/game";

export interface CostumeData extends EntityData {
  wornImage?: StaticImageData; // Image of the character wearing the costume
}

export const COSTUMES: CostumeData[] = [
  // Châu Á (Asia)
  { id: "aodai", name: "Áo Dài", image: ImgAoDai, wornImage: WornAoDai, category: "Vietnam" },
  { id: "kimono", name: "Kimono", image: ImgKimono, wornImage: WornKimono, category: "Nhật Bản" },
  { id: "hanbok", name: "Hanbok", image: ImgHanbok, wornImage: WornHanbok, category: "Hàn Quốc" },
  { id: "sari", name: "Sari", image: ImgSari, wornImage: WornSari, category: "Ấn Độ" },
  {
    id: "suongxam",
    name: "Sường Xám",
    image: ImgSuongxam,
    wornImage: WornSuongxam,
    category: "Trung Quốc",
  },
  { id: "batik", name: "Batik", image: ImgBatik, wornImage: WornBatik, category: "Indonesia" },

  // Châu Âu (Europe)
  { id: "kilt", name: "Kilt", image: ImgKilt, wornImage: WornKilt, category: "Scotland" },
  { id: "dirndl", name: "Dirndl", image: ImgDirndl, wornImage: WornDirndl, category: "Đức" },
  {
    id: "flamenco",
    name: "Flamenco",
    image: ImgFlamenco,
    wornImage: PlaceholderCharacter, // Missing due to quota
    category: "Tây Ban Nha",
  },
  { id: "sarafan", name: "Sarafan", image: ImgSarafan, wornImage: WornSarafan, category: "Nga" },
  { id: "klompen", name: "Klompen", image: ImgKlompen, wornImage: PlaceholderCharacter, category: "Hà Lan" },
  {
    id: "fustanella",
    name: "Fustanella",
    image: PlaceholderCostume,
    wornImage: PlaceholderCharacter,
    category: "Hy Lạp",
  },

  // Châu Mỹ & Khác (Americas & Others)
  { id: "poncho", name: "Poncho", image: PlaceholderCostume, wornImage: PlaceholderCharacter, category: "Mexico" },
  { id: "samba", name: "Samba", image: PlaceholderCostume, wornImage: PlaceholderCharacter, category: "Brazil" },
  { id: "chullo", name: "Chullo", image: PlaceholderCostume, wornImage: PlaceholderCharacter, category: "Peru" },
  { id: "dashiki", name: "Dashiki", image: PlaceholderCostume, wornImage: PlaceholderCharacter, category: "Nigeria" },
  { id: "galabeya", name: "Galabeya", image: PlaceholderCostume, wornImage: PlaceholderCharacter, category: "Ai Cập" },
  { id: "thobe", name: "Thobe", image: PlaceholderCostume, wornImage: PlaceholderCharacter, category: "Ả Rập Saudi" },
];

export const GROUPS = [
  {
    id: "group1",
    title: "Châu Á",
    description: "Khám phá trang phục Châu Á",
    items: ["aodai", "kimono", "hanbok", "sari", "suongxam", "batik"],
    logo: LogoGroup1,
    variant: "purple" as const,
  },
  {
    id: "group2",
    title: "Châu Âu",
    description: "Khám phá trang phục Châu Âu",
    items: ["kilt", "dirndl", "flamenco", "sarafan", "klompen", "fustanella"],
    logo: LogoGroup2,
    variant: "blue" as const,
  },
  {
    id: "group3",
    title: "Châu Mỹ & Khác",
    description: "Khám phá trang phục Châu Mỹ & Châu Phi",
    items: ["poncho", "samba", "chullo", "dashiki", "galabeya", "thobe"],
    logo: LogoGroup3,
    variant: "green" as const,
  },
];

export function getCostumesForGroup(groupId: string): CostumeData[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return COSTUMES.filter((costume) => group.items.includes(costume.id));
}
