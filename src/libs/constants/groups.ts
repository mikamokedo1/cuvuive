import { StaticImageData } from "next/image";

//group logo
import MusicLogo from "@/assets/games/home/am_nhac.webp";
import GeographyLogo from "@/assets/games/home/dia_ly.webp";
import ScienceLogo from "@/assets/games/home/khoa_hoc.webp";
import LifeSkillLogo from "@/assets/games/home/ky_nang_song.webp";
// import HistoryLogo from "@/assets/games/home/lich_su.webp";
import LanguageLogo from "@/assets/games/home/ngon_ngu.webp";
import MathLogo from "@/assets/games/home/toan.webp";
import LogicLogo from "@/assets/games/home/tu_duy.webp";
import ArtLogo from "@/assets/games/home/ve.webp";

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
  icon: StaticImageData;
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
