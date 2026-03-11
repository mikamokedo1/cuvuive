import { StaticImageData } from "next/image";

// Import group logos
import LogoGroup1 from "@/assets/games/learn-flag/group1.webp"; // Asia
import LogoGroup2 from "@/assets/games/learn-flag/group2.webp"; // Europe
import LogoGroup3 from "@/assets/games/learn-flag/group3.webp"; // Americas
import LogoGroup4 from "@/assets/games/learn-flag/group4.webp"; // Africa & Oceania

// Import Asia
import Vietnam from "@/assets/games/learn-flag/vietnam.webp";
import Japan from "@/assets/games/learn-flag/japan.webp";
import SouthKorea from "@/assets/games/learn-flag/southkorea.webp";
import China from "@/assets/games/learn-flag/china.webp";
import Thailand from "@/assets/games/learn-flag/thailand.webp";
import India from "@/assets/games/learn-flag/india.webp";

// Import Europe
import UK from "@/assets/games/learn-flag/uk.webp";
import France from "@/assets/games/learn-flag/france.webp";
import Germany from "@/assets/games/learn-flag/germany.webp";
import Italy from "@/assets/games/learn-flag/italy.webp";
import Spain from "@/assets/games/learn-flag/spain.webp";
import Russia from "@/assets/games/learn-flag/russia.webp";

// Import Americas
import USA from "@/assets/games/learn-flag/usa.webp";
import Canada from "@/assets/games/learn-flag/canada.webp";
import Brazil from "@/assets/games/learn-flag/brazil.webp";
import Argentina from "@/assets/games/learn-flag/argentina.webp";
import Mexico from "@/assets/games/learn-flag/mexico.webp";
import Colombia from "@/assets/games/learn-flag/colombia.webp";

// Import Africa & Oceania
import SouthAfrica from "@/assets/games/learn-flag/southafrica.webp";
import Egypt from "@/assets/games/learn-flag/egypt.webp";
import Australia from "@/assets/games/learn-flag/australia.webp";
import Nigeria from "@/assets/games/learn-flag/nigeria.webp";
import Morocco from "@/assets/games/learn-flag/morocco.webp";
import Kenya from "@/assets/games/learn-flag/kenya.webp";

import { EntityData } from "@/types/game";

export const FLAGS: EntityData[] = [
  // Asia
  { id: "vietnam", name: "Việt Nam", image: Vietnam, category: "asia" },
  { id: "japan", name: "Nhật Bản", image: Japan, category: "asia" },
  { id: "southkorea", name: "Hàn Quốc", image: SouthKorea, category: "asia" },
  { id: "china", name: "Trung Quốc", image: China, category: "asia" },
  { id: "thailand", name: "Thái Lan", image: Thailand, category: "asia" },
  { id: "india", name: "Ấn Độ", image: India, category: "asia" },

  // Europe
  { id: "uk", name: "Vương Quốc Anh", image: UK, category: "europe" },
  { id: "france", name: "Pháp", image: France, category: "europe" },
  { id: "germany", name: "Đức", image: Germany, category: "europe" },
  { id: "italy", name: "Ý", image: Italy, category: "europe" },
  { id: "spain", name: "Tây Ban Nha", image: Spain, category: "europe" },
  { id: "russia", name: "Nga", image: Russia, category: "europe" },

  // Americas
  { id: "usa", name: "Mỹ", image: USA, category: "americas" },
  { id: "canada", name: "Canada", image: Canada, category: "americas" },
  { id: "brazil", name: "Brazil", image: Brazil, category: "americas" },
  { id: "argentina", name: "Argentina", image: Argentina, category: "americas" },
  { id: "mexico", name: "Mexico", image: Mexico, category: "americas" },
  { id: "colombia", name: "Colombia", image: Colombia, category: "americas" },

  // Africa & Oceania
  { id: "southafrica", name: "Nam Phi", image: SouthAfrica, category: "afroceania" },
  { id: "egypt", name: "Ai Cập", image: Egypt, category: "afroceania" },
  { id: "australia", name: "Úc", image: Australia, category: "afroceania" },
  { id: "nigeria", name: "Nigeria", image: Nigeria, category: "afroceania" },
  { id: "morocco", name: "Ma-rốc", image: Morocco, category: "afroceania" },
  { id: "kenya", name: "Kenya", image: Kenya, category: "afroceania" },
];

export const GROUPS = [
  {
    id: "group1",
    title: "Châu Á",
    description: "Học các quốc kỳ Châu Á",
    animals: ["vietnam", "japan", "southkorea", "china", "thailand", "india"],
    logo: LogoGroup1,
    variant: "purple" as const,
  },
  {
    id: "group2",
    title: "Châu Âu",
    description: "Học các quốc kỳ Châu Âu",
    animals: ["uk", "france", "germany", "italy", "spain", "russia"],
    logo: LogoGroup2,
    variant: "blue" as const,
  },
  {
    id: "group3",
    title: "Châu Mỹ",
    description: "Học các quốc kỳ Châu Mỹ",
    animals: ["usa", "canada", "brazil", "argentina", "mexico", "colombia"],
    logo: LogoGroup3,
    variant: "green" as const,
  },
  {
    id: "group4",
    title: "Khác",
    description: "Học các quốc kỳ Châu Phi & Đại Dương",
    animals: ["southafrica", "egypt", "australia", "nigeria", "morocco", "kenya"],
    logo: LogoGroup4,
    variant: "orange" as const,
  },
];

export function getFlagsForGroup(groupId: string): EntityData[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return FLAGS.filter((flag) => group.animals.includes(flag.id));
}
