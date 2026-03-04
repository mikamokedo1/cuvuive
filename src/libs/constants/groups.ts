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
  icon: StaticImageData;
}

export const GROUPS: Group[] = [
  { id: "logic", title: "Tư Duy", icon: LogicLogo },
  { id: "art", title: "Mỹ Thuật", icon: ArtLogo },
  { id: "life-skill", title: "Kỹ Năng Sống", icon: LifeSkillLogo },
  { id: "geography", title: "Địa Lý Tự Nhiên", icon: GeographyLogo },
  { id: "music", title: "Âm Nhạc", icon: MusicLogo },
  { id: "science", title: "Khoa Học", icon: ScienceLogo },
  // { id: "history", title: "Lịch Sử", icon: HistoryLogo },
  { id: "language", title: "Ngôn Ngữ", icon: LanguageLogo },
  { id: "math", title: "Toán Học", icon: MathLogo },
];
