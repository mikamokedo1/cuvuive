import { StaticImageData } from "next/image";

// Import group logos
const LogoGroup1 = "https://assets.cuthongminh.com/games/learn-flag/group1.webp"; // Asia
const LogoGroup2 = "https://assets.cuthongminh.com/games/learn-flag/group2.webp"; // Europe
const LogoGroup3 = "https://assets.cuthongminh.com/games/learn-flag/group3.webp"; // Americas
const LogoGroup4 = "https://assets.cuthongminh.com/games/learn-flag/group4.webp"; // Africa & Oceania

// Import Asia
const Vietnam = "https://assets.cuthongminh.com/games/learn-flag/vietnam.webp";
const Japan = "https://assets.cuthongminh.com/games/learn-flag/japan.webp";
const SouthKorea = "https://assets.cuthongminh.com/games/learn-flag/southkorea.webp";
const China = "https://assets.cuthongminh.com/games/learn-flag/china.webp";
const Thailand = "https://assets.cuthongminh.com/games/learn-flag/thailand.webp";
const India = "https://assets.cuthongminh.com/games/learn-flag/india.webp";

// Import Europe
const UK = "https://assets.cuthongminh.com/games/learn-flag/uk.webp";
const France = "https://assets.cuthongminh.com/games/learn-flag/france.webp";
const Germany = "https://assets.cuthongminh.com/games/learn-flag/germany.webp";
const Italy = "https://assets.cuthongminh.com/games/learn-flag/italy.webp";
const Spain = "https://assets.cuthongminh.com/games/learn-flag/spain.webp";
const Russia = "https://assets.cuthongminh.com/games/learn-flag/russia.webp";

// Import Americas
const USA = "https://assets.cuthongminh.com/games/learn-flag/usa.webp";
const Canada = "https://assets.cuthongminh.com/games/learn-flag/canada.webp";
const Brazil = "https://assets.cuthongminh.com/games/learn-flag/brazil.webp";
const Argentina = "https://assets.cuthongminh.com/games/learn-flag/argentina.webp";
const Mexico = "https://assets.cuthongminh.com/games/learn-flag/mexico.webp";
const Colombia = "https://assets.cuthongminh.com/games/learn-flag/colombia.webp";

// Import Africa & Oceania
const SouthAfrica = "https://assets.cuthongminh.com/games/learn-flag/southafrica.webp";
const Egypt = "https://assets.cuthongminh.com/games/learn-flag/egypt.webp";
const Australia = "https://assets.cuthongminh.com/games/learn-flag/australia.webp";
const Nigeria = "https://assets.cuthongminh.com/games/learn-flag/nigeria.webp";
const Morocco = "https://assets.cuthongminh.com/games/learn-flag/morocco.webp";
const Kenya = "https://assets.cuthongminh.com/games/learn-flag/kenya.webp";

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
