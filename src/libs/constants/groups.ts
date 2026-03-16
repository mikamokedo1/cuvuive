import { StaticImageData } from "next/image";

//group logo
const MusicLogo = "https://assets.cuthongminh.com/games/home/am_nhac.webp";
const GeographyLogo = "https://assets.cuthongminh.com/games/home/dia_ly.webp";
const ScienceLogo = "https://assets.cuthongminh.com/games/home/khoa_hoc.webp";
const LifeSkillLogo = "https://assets.cuthongminh.com/games/home/ky_nang_song.webp";
// const HistoryLogo = "https://assets.cuthongminh.com/games/home/lich_su.webp";
const LanguageLogo = "https://assets.cuthongminh.com/games/home/ngon_ngu.webp";
const MathLogo = "https://assets.cuthongminh.com/games/home/toan.webp";
const LogicLogo = "https://assets.cuthongminh.com/games/home/tu_duy.webp";
const ArtLogo = "https://assets.cuthongminh.com/games/home/ve.webp";

export type GameGroupType =
  | "math"
  | "life-skill"
  | "geography"
  | "music"
  | "science"
  | "history"
  | "language"
  | "art"
  | "logic";

export interface Group {
  id: GameGroupType;
  title: string;
  slug: string;
  icon: string | StaticImageData;
}

export const GROUPS: Group[] = [
  { id: "logic", title: "Tư Duy", slug: "tro-choi-tu-duy", icon: LogicLogo },
  { id: "art", title: "Mỹ Thuật", slug: "tro-choi-my-thuat", icon: ArtLogo },
  { id: "life-skill", title: "Kỹ Năng Sống", slug: "ky-nang-song", icon: LifeSkillLogo },
  { id: "geography", title: "Địa Lý Tự Nhiên", slug: "dia-ly-tu-nhien", icon: GeographyLogo },
  { id: "music", title: "Âm Nhạc", slug: "am-nhac", icon: MusicLogo },
  { id: "science", title: "Khoa Học", slug: "khoa-hoc", icon: ScienceLogo },
  // { id: "history", title: "Lịch Sử", icon: HistoryLogo },
  { id: "language", title: "Ngôn Ngữ", slug: "hoc-tieng-viet-cho-be", icon: LanguageLogo },
  { id: "math", title: "Toán Học", slug: "tro-choi-toan-hoc", icon: MathLogo },
];
