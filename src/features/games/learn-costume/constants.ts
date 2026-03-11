import { StaticImageData } from "next/image";

// Import group logos
import LogoGroup1 from "@/assets/games/learn-costume/group1.webp"; // Asia
import LogoGroup2 from "@/assets/games/learn-costume/group2.webp"; // Europe
import LogoGroup3 from "@/assets/games/learn-costume/group3.webp"; // Americas & Others

// Import flags
import FlagVietnam from "@/assets/games/learn-flag/vietnam.webp";
import FlagJapan from "@/assets/games/learn-flag/japan.webp";
import FlagSouthKorea from "@/assets/games/learn-flag/southkorea.webp";
import FlagIndia from "@/assets/games/learn-flag/india.webp";
import FlagChina from "@/assets/games/learn-flag/china.webp";
import FlagIndonesia from "@/assets/games/learn-flag/thailand.webp"; // Using thailand as placeholder for Indonesia or we can just omit flag if not found
import FlagScotland from "@/assets/games/learn-flag/uk.webp"; // Using UK for Scotland
import FlagGermany from "@/assets/games/learn-flag/germany.webp";
import FlagSpain from "@/assets/games/learn-flag/spain.webp";
import FlagRussia from "@/assets/games/learn-flag/russia.webp";
import FlagNetherlands from "@/assets/games/learn-flag/france.webp"; // Using france as placeholder
import FlagGreece from "@/assets/games/learn-flag/italy.webp"; // Using italy as placeholder
import FlagMexico from "@/assets/games/learn-flag/mexico.webp";
import FlagBrazil from "@/assets/games/learn-flag/brazil.webp";
import FlagPeru from "@/assets/games/learn-flag/colombia.webp"; // Using colombia as placeholder
import FlagNigeria from "@/assets/games/learn-flag/nigeria.webp";
import FlagEgypt from "@/assets/games/learn-flag/egypt.webp";
import FlagSaudiArabia from "@/assets/games/learn-flag/morocco.webp"; // Using morocco as placeholder

import PlaceholderCharacter from "@/assets/games/learn-costume/character.webp";

// Import Asia Costumes
import ImgAoDai from "@/assets/games/learn-costume/aodai.webp";
import WornAoDai from "@/assets/games/learn-costume/character_aodai.webp";
import ImgBatik from "@/assets/games/learn-costume/batik.webp";
import WornBatik from "@/assets/games/learn-costume/character_batik.webp";
import ImgKimono from "@/assets/games/learn-costume/kimono.webp";
import WornKimono from "@/assets/games/learn-costume/character_kimono.webp";
import ImgHanbok from "@/assets/games/learn-costume/hanbok.webp";
import WornHanbok from "@/assets/games/learn-costume/character_hanbok.webp";
import ImgSari from "@/assets/games/learn-costume/sari.webp";
import WornSari from "@/assets/games/learn-costume/character_sari.webp";
import ImgSuongxam from "@/assets/games/learn-costume/suongxam.webp";
import WornSuongxam from "@/assets/games/learn-costume/character_suongxam.webp";

// Placeholders for Groups 2 & 3
import PlaceholderCostume from "@/assets/games/learn-costume/character.webp";

// Import Europe Costumes (Partial due to quota)
import ImgKilt from "@/assets/games/learn-costume/kilt.webp";
import WornKilt from "@/assets/games/learn-costume/character_kilt.webp";
import ImgDirndl from "@/assets/games/learn-costume/dirndl.webp";
import WornDirndl from "@/assets/games/learn-costume/character_dirndl.webp";
import ImgFlamenco from "@/assets/games/learn-costume/flamenco.webp";
import ImgSarafan from "@/assets/games/learn-costume/sarafan.webp";
import WornSarafan from "@/assets/games/learn-costume/character_sarafan.webp";
import ImgKlompen from "@/assets/games/learn-costume/klompen.webp";
import WornKlompen from "@/assets/games/learn-costume/character_klompen.webp";
import ImgFustanella from "@/assets/games/learn-costume/fustanella.webp";
import WornFustanella from "@/assets/games/learn-costume/character_fustanella.webp";
import WornFlamenco from "@/assets/games/learn-costume/character_flamenco.webp";
import ImgPoncho from "@/assets/games/learn-costume/poncho.webp";
import WornPoncho from "@/assets/games/learn-costume/character_poncho.webp";
import ImgSamba from "@/assets/games/learn-costume/samba.webp";
import WornSamba from "@/assets/games/learn-costume/character_samba.webp";
import ImgChullo from "@/assets/games/learn-costume/chullo.webp";
import WornChullo from "@/assets/games/learn-costume/character_chullo.webp";
import ImgDashiki from "@/assets/games/learn-costume/dashiki.webp";
import WornDashiki from "@/assets/games/learn-costume/character_dashiki.webp";
import ImgGalabeya from "@/assets/games/learn-costume/galabeya.webp";
import WornGalabeya from "@/assets/games/learn-costume/character_galabeya.webp";
import ImgThobe from "@/assets/games/learn-costume/thobe.webp";
import WornThobe from "@/assets/games/learn-costume/character_thobe.webp";

import { EntityData } from "@/types/game";

export interface CostumeData extends EntityData {
  wornImage?: StaticImageData; // Image of the character wearing the costume
  flag?: StaticImageData; // Country flag image
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
