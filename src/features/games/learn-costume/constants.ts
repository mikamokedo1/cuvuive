import { StaticImageData } from "next/image";

// Import group logos
const LogoGroup1 = "https://assets.cuthongminh.com/games/learn-costume/group1.webp"; // Asia
const LogoGroup2 = "https://assets.cuthongminh.com/games/learn-costume/group2.webp"; // Europe
const LogoGroup3 = "https://assets.cuthongminh.com/games/learn-costume/group3.webp"; // Americas & Others

// Import flags
const FlagVietnam = "https://assets.cuthongminh.com/games/learn-flag/vietnam.webp";
const FlagJapan = "https://assets.cuthongminh.com/games/learn-flag/japan.webp";
const FlagSouthKorea = "https://assets.cuthongminh.com/games/learn-flag/southkorea.webp";
const FlagIndia = "https://assets.cuthongminh.com/games/learn-flag/india.webp";
const FlagChina = "https://assets.cuthongminh.com/games/learn-flag/china.webp";
const FlagIndonesia = "https://assets.cuthongminh.com/games/learn-flag/thailand.webp"; // Using thailand as placeholder for Indonesia or we can just omit flag if not found
const FlagScotland = "https://assets.cuthongminh.com/games/learn-flag/uk.webp"; // Using UK for Scotland
const FlagGermany = "https://assets.cuthongminh.com/games/learn-flag/germany.webp";
const FlagSpain = "https://assets.cuthongminh.com/games/learn-flag/spain.webp";
const FlagRussia = "https://assets.cuthongminh.com/games/learn-flag/russia.webp";
const FlagNetherlands = "https://assets.cuthongminh.com/games/learn-flag/france.webp"; // Using france as placeholder
const FlagGreece = "https://assets.cuthongminh.com/games/learn-flag/italy.webp"; // Using italy as placeholder
const FlagMexico = "https://assets.cuthongminh.com/games/learn-flag/mexico.webp";
const FlagBrazil = "https://assets.cuthongminh.com/games/learn-flag/brazil.webp";
const FlagPeru = "https://assets.cuthongminh.com/games/learn-flag/colombia.webp"; // Using colombia as placeholder
const FlagNigeria = "https://assets.cuthongminh.com/games/learn-flag/nigeria.webp";
const FlagEgypt = "https://assets.cuthongminh.com/games/learn-flag/egypt.webp";
const FlagSaudiArabia = "https://assets.cuthongminh.com/games/learn-flag/morocco.webp"; // Using morocco as placeholder

const PlaceholderCharacter = "https://assets.cuthongminh.com/games/learn-costume/character.webp";

// Import Asia Costumes
const ImgAoDai = "https://assets.cuthongminh.com/games/learn-costume/aodai.webp";
const WornAoDai = "https://assets.cuthongminh.com/games/learn-costume/character_aodai.webp";
const ImgBatik = "https://assets.cuthongminh.com/games/learn-costume/batik.webp";
const WornBatik = "https://assets.cuthongminh.com/games/learn-costume/character_batik.webp";
const ImgKimono = "https://assets.cuthongminh.com/games/learn-costume/kimono.webp";
const WornKimono = "https://assets.cuthongminh.com/games/learn-costume/character_kimono.webp";
const ImgHanbok = "https://assets.cuthongminh.com/games/learn-costume/hanbok.webp";
const WornHanbok = "https://assets.cuthongminh.com/games/learn-costume/character_hanbok.webp";
const ImgSari = "https://assets.cuthongminh.com/games/learn-costume/sari.webp";
const WornSari = "https://assets.cuthongminh.com/games/learn-costume/character_sari.webp";
const ImgSuongxam = "https://assets.cuthongminh.com/games/learn-costume/suongxam.webp";
const WornSuongxam = "https://assets.cuthongminh.com/games/learn-costume/character_suongxam.webp";

// Placeholders for Groups 2 & 3
const PlaceholderCostume = "https://assets.cuthongminh.com/games/learn-costume/character.webp";

// Import Europe Costumes (Partial due to quota)
const ImgKilt = "https://assets.cuthongminh.com/games/learn-costume/kilt.webp";
const WornKilt = "https://assets.cuthongminh.com/games/learn-costume/character_kilt.webp";
const ImgDirndl = "https://assets.cuthongminh.com/games/learn-costume/dirndl.webp";
const WornDirndl = "https://assets.cuthongminh.com/games/learn-costume/character_dirndl.webp";
const ImgFlamenco = "https://assets.cuthongminh.com/games/learn-costume/flamenco.webp";
const ImgSarafan = "https://assets.cuthongminh.com/games/learn-costume/sarafan.webp";
const WornSarafan = "https://assets.cuthongminh.com/games/learn-costume/character_sarafan.webp";
const ImgKlompen = "https://assets.cuthongminh.com/games/learn-costume/klompen.webp";
const WornKlompen = "https://assets.cuthongminh.com/games/learn-costume/character_klompen.webp";
const ImgFustanella = "https://assets.cuthongminh.com/games/learn-costume/fustanella.webp";
const WornFustanella = "https://assets.cuthongminh.com/games/learn-costume/character_fustanella.webp";
const WornFlamenco = "https://assets.cuthongminh.com/games/learn-costume/character_flamenco.webp";
const ImgPoncho = "https://assets.cuthongminh.com/games/learn-costume/poncho.webp";
const WornPoncho = "https://assets.cuthongminh.com/games/learn-costume/character_poncho.webp";
const ImgSamba = "https://assets.cuthongminh.com/games/learn-costume/samba.webp";
const WornSamba = "https://assets.cuthongminh.com/games/learn-costume/character_samba.webp";
const ImgChullo = "https://assets.cuthongminh.com/games/learn-costume/chullo.webp";
const WornChullo = "https://assets.cuthongminh.com/games/learn-costume/character_chullo.webp";
const ImgDashiki = "https://assets.cuthongminh.com/games/learn-costume/dashiki.webp";
const WornDashiki = "https://assets.cuthongminh.com/games/learn-costume/character_dashiki.webp";
const ImgGalabeya = "https://assets.cuthongminh.com/games/learn-costume/galabeya.webp";
const WornGalabeya = "https://assets.cuthongminh.com/games/learn-costume/character_galabeya.webp";
const ImgThobe = "https://assets.cuthongminh.com/games/learn-costume/thobe.webp";
const WornThobe = "https://assets.cuthongminh.com/games/learn-costume/character_thobe.webp";

import { EntityData } from "@/types/game";

export interface CostumeData extends EntityData {
  wornImage?: string | StaticImageData; // Image of the character wearing the costume
  flag?: string | StaticImageData; // Country flag image
}

export const COSTUMES: CostumeData[] = [
  // Châu Á (Asia)
  { id: "aodai", name: "Áo Dài", image: ImgAoDai, wornImage: WornAoDai, category: "Vietnam", flag: FlagVietnam },
  { id: "kimono", name: "Kimono", image: ImgKimono, wornImage: WornKimono, category: "Nhật Bản", flag: FlagJapan },
  { id: "hanbok", name: "Hanbok", image: ImgHanbok, wornImage: WornHanbok, category: "Hàn Quốc", flag: FlagSouthKorea },
  { id: "sari", name: "Sari", image: ImgSari, wornImage: WornSari, category: "Ấn Độ", flag: FlagIndia },
  {
    id: "suongxam",
    name: "Sường Xám",
    image: ImgSuongxam,
    wornImage: WornSuongxam,
    category: "Trung Quốc",
    flag: FlagChina,
  },
  { id: "batik", name: "Batik", image: ImgBatik, wornImage: WornBatik, category: "Indonesia", flag: FlagIndonesia },

  // Châu Âu (Europe)
  { id: "kilt", name: "Kilt", image: ImgKilt, wornImage: WornKilt, category: "Scotland", flag: FlagScotland },
  { id: "dirndl", name: "Dirndl", image: ImgDirndl, wornImage: WornDirndl, category: "Đức", flag: FlagGermany },
  {
    id: "flamenco",
    name: "Flamenco",
    image: ImgFlamenco,
    wornImage: WornFlamenco,
    category: "Tây Ban Nha",
    flag: FlagSpain,
  },
  { id: "sarafan", name: "Sarafan", image: ImgSarafan, wornImage: WornSarafan, category: "Nga", flag: FlagRussia },
  {
    id: "klompen",
    name: "Klompen",
    image: ImgKlompen,
    wornImage: WornKlompen,
    category: "Hà Lan",
    flag: FlagNetherlands,
  },
  {
    id: "fustanella",
    name: "Fustanella",
    image: ImgFustanella,
    wornImage: WornFustanella,
    category: "Hy Lạp",
    flag: FlagGreece,
  },

  // Châu Mỹ & Khác (Americas & Others)
  { id: "poncho", name: "Poncho", image: ImgPoncho, wornImage: WornPoncho, category: "Mexico", flag: FlagMexico },
  { id: "samba", name: "Samba", image: ImgSamba, wornImage: WornSamba, category: "Brazil", flag: FlagBrazil },
  { id: "chullo", name: "Chullo", image: ImgChullo, wornImage: WornChullo, category: "Peru", flag: FlagPeru },
  { id: "dashiki", name: "Dashiki", image: ImgDashiki, wornImage: WornDashiki, category: "Nigeria", flag: FlagNigeria },
  {
    id: "galabeya",
    name: "Galabeya",
    image: ImgGalabeya,
    wornImage: WornGalabeya,
    category: "Ai Cập",
    flag: FlagEgypt,
  },
  { id: "thobe", name: "Thobe", image: ImgThobe, wornImage: WornThobe, category: "Ả Rập Saudi", flag: FlagSaudiArabia },
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
