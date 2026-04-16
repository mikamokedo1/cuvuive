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
const EnglishLogo = "https://assets.cuthongminh.com/games/home/tieng_anh.webp";

export type GameGroupType =
  | "math"
  | "life-skill"
  | "geography"
  | "music"
  | "science"
  | "history"
  | "language"
  | "art"
  | "logic"
  | "english";

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
  { id: "english", title: "Tiếng Anh", slug: "hoc-tieng-anh", icon: EnglishLogo },
];

export const GROUP_DESCRIPTIONS: Record<GameGroupType, string> = {
  math: "Trò chơi Toán Học tương tác giúp bé 3-8 tuổi học đếm số, phép cộng trừ nhân chia, so sánh số lượng. Phương pháp học mà chơi hiệu quả trên Cú Thông Minh.",
  logic: "Rèn luyện tư duy logic cho bé qua trò chơi tìm quy luật, mê cung, nối điểm, tìm điểm khác biệt. Phát triển trí tuệ toàn diện cho trẻ 3-8 tuổi.",
  language: "Bé học tiếng Việt online: bảng chữ cái, dấu thanh, ghép vần qua trò chơi tương tác sinh động. Nền tảng ngôn ngữ vững chắc cho trẻ mầm non.",
  science: "Khám phá thế giới khoa học cùng bé: động vật, trái cây, khủng long, thời tiết, cơ thể người. Trò chơi giáo dục tương tác cho trẻ 3-8 tuổi.",
  "life-skill": "Dạy bé kỹ năng sống thiết yếu: an toàn giao thông, vệ sinh cá nhân, nghề nghiệp, quản lý cảm xúc qua trò chơi tương tác vui nhộn trên Cú Thông Minh.",
  geography: "Bé khám phá thế giới: quốc kỳ các nước, địa danh nổi tiếng, trang phục truyền thống, địa hình tự nhiên qua trò chơi giáo dục tương tác.",
  music: "Bé học âm nhạc vui: nhạc cụ, nốt nhạc, chơi đàn piano qua trò chơi tương tác. Phát triển thính giác và cảm thụ nghệ thuật cho trẻ mầm non.",
  art: "Bé học mỹ thuật sáng tạo: nhận biết màu sắc, pha màu, tô tranh, vẽ tự do. Phát triển thẩm mỹ và khả năng sáng tạo cho trẻ 3-8 tuổi.",
  history: "",
  english: "Bé học tiếng Anh qua trò chơi tương tác: từ vựng, phát âm, ghép từ với hình ảnh sinh động. Nền tảng ngoại ngữ vững chắc cho trẻ 3-8 tuổi trên Cú Thông Minh.",
};
