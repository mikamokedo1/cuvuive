import { StaticImageData } from "next/image";

// Import group logos
import LogoGroup1 from "@/assets/games/learn-costume/group1.png"; // Asia
import LogoGroup2 from "@/assets/games/learn-costume/group2.png"; // Europe
import LogoGroup3 from "@/assets/games/learn-costume/group3.png"; // Americas & Others

// Import flags
import FlagVietnam from "@/assets/games/learn-flag/vietnam.png";
import FlagJapan from "@/assets/games/learn-flag/japan.png";
import FlagSouthKorea from "@/assets/games/learn-flag/southkorea.png";
import FlagIndia from "@/assets/games/learn-flag/india.png";
import FlagChina from "@/assets/games/learn-flag/china.png";
import FlagIndonesia from "@/assets/games/learn-flag/thailand.png"; // Using thailand as placeholder for Indonesia or we can just omit flag if not found
import FlagScotland from "@/assets/games/learn-flag/uk.png"; // Using UK for Scotland
import FlagGermany from "@/assets/games/learn-flag/germany.png";
import FlagSpain from "@/assets/games/learn-flag/spain.png";
import FlagRussia from "@/assets/games/learn-flag/russia.png";
import FlagNetherlands from "@/assets/games/learn-flag/france.png"; // Using france as placeholder
import FlagGreece from "@/assets/games/learn-flag/italy.png"; // Using italy as placeholder
import FlagMexico from "@/assets/games/learn-flag/mexico.png";
import FlagBrazil from "@/assets/games/learn-flag/brazil.png";
import FlagPeru from "@/assets/games/learn-flag/colombia.png"; // Using colombia as placeholder
import FlagNigeria from "@/assets/games/learn-flag/nigeria.png";
import FlagEgypt from "@/assets/games/learn-flag/egypt.png";
import FlagSaudiArabia from "@/assets/games/learn-flag/morocco.png"; // Using morocco as placeholder

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
import WornKlompen from "@/assets/games/learn-costume/character_klompen.png";
import ImgFustanella from "@/assets/games/learn-costume/fustanella.png";
import WornFustanella from "@/assets/games/learn-costume/character_fustanella.png";
import WornFlamenco from "@/assets/games/learn-costume/character_flamenco.png";
import ImgPoncho from "@/assets/games/learn-costume/poncho.png";
import WornPoncho from "@/assets/games/learn-costume/character_poncho.png";
import ImgSamba from "@/assets/games/learn-costume/samba.png";
import WornSamba from "@/assets/games/learn-costume/character_samba.png";
import ImgChullo from "@/assets/games/learn-costume/chullo.png";
import WornChullo from "@/assets/games/learn-costume/character_chullo.png";
import ImgDashiki from "@/assets/games/learn-costume/dashiki.png";
import WornDashiki from "@/assets/games/learn-costume/character_dashiki.png";
import ImgGalabeya from "@/assets/games/learn-costume/galabeya.png";
import WornGalabeya from "@/assets/games/learn-costume/character_galabeya.png";
import ImgThobe from "@/assets/games/learn-costume/thobe.png";
import WornThobe from "@/assets/games/learn-costume/character_thobe.png";

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
