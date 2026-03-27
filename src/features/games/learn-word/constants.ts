import { StaticImageData } from "next/image";
import { EntityData } from "@/types/game";

export interface WordData extends EntityData {
  syllables: string[];
}

export const WORDS: WordData[] = [
  // Group 1: Gia Đình
  { id: "bo", name: "Bố", image: "https://assets.cuthongminh.com/games/learn-word/bo.webp", category: "group1", syllables: ["b", "ố"] },
  { id: "me", name: "Mẹ", image: "https://assets.cuthongminh.com/games/learn-word/me.webp", category: "group1", syllables: ["m", "ẹ"] },
  { id: "anh", name: "Anh", image: "https://assets.cuthongminh.com/games/learn-word/anh.webp", category: "group1", syllables: ["a", "nh"] },
  { id: "chi", name: "Chị", image: "https://assets.cuthongminh.com/games/learn-word/chi.webp", category: "group1", syllables: ["ch", "ị"] },
  { id: "em-be", name: "Em Pé", image: "https://assets.cuthongminh.com/games/learn-word/em-be.webp", category: "group1", syllables: ["Em", "bé"] },
  { id: "ong-ba", name: "Ông bà", image: "https://assets.cuthongminh.com/games/learn-word/ong-ba.webp", category: "group1", syllables: ["Ông", "bà"] },

  // Group 2: Trường Học
  {
    id: "but-chi",
    name: "Bút chì",
    image: "https://assets.cuthongminh.com/games/learn-word/but-chi.webp",
    category: "group2",
    syllables: ["Bút", "chì"],
  },
  {
    id: "cuc-tay",
    name: "Cục tẩy",
    image: "https://assets.cuthongminh.com/games/learn-word/cuc-tay.webp",
    category: "group2",
    syllables: ["Cục", "tẩy"],
  },
  {
    id: "thuoc-ke",
    name: "Thước kẻ",
    image: "https://assets.cuthongminh.com/games/learn-word/thuoc-ke.webp",
    category: "group2",
    syllables: ["Thước", "kẻ"],
  },
  { id: "sach", name: "Sách", image: "https://assets.cuthongminh.com/games/learn-word/sach.webp", category: "group2", syllables: ["s", "ách"] },
  {
    id: "cap-sach",
    name: "Cặp sách",
    image: "https://assets.cuthongminh.com/games/learn-word/cap-sach.webp",
    category: "group2",
    syllables: ["Cặp", "sách"],
  },
  { id: "bang", name: "Bảng", image: "https://assets.cuthongminh.com/games/learn-word/bang.webp", category: "group2", syllables: ["b", "ảng"] },

  // Group 3: Thiên Nhiên
  {
    id: "mat-troi",
    name: "Mặt trời",
    image: "https://assets.cuthongminh.com/games/learn-word/mat-troi.webp",
    category: "group3",
    syllables: ["Mặt", "trời"],
  },
  {
    id: "mat-trang",
    name: "Mặt trăng",
    image: "https://assets.cuthongminh.com/games/learn-word/mat-trang.webp",
    category: "group3",
    syllables: ["Mặt", "trăng"],
  },
  {
    id: "ngoi-sao",
    name: "Ngôi sao",
    image: "https://assets.cuthongminh.com/games/learn-word/ngoi-sao.webp",
    category: "group3",
    syllables: ["Ngôi", "sao"],
  },
  {
    id: "dam-may",
    name: "Đám mây",
    image: "https://assets.cuthongminh.com/games/learn-word/dam-may.webp",
    category: "group3",
    syllables: ["Đám", "mây"],
  },
  { id: "cay", name: "Cây", image: "https://assets.cuthongminh.com/games/learn-word/cay.webp", category: "group3", syllables: ["c", "ây"] },
  { id: "nui", name: "Núi", image: "https://assets.cuthongminh.com/games/learn-word/nui.webp", category: "group3", syllables: ["n", "úi"] },

  // Group 4: Đồ Dùng Trong Nhà
  { id: "ban", name: "Bàn", image: "https://assets.cuthongminh.com/games/learn-word/ban.webp", category: "group4", syllables: ["b", "àn"] },
  { id: "ghe", name: "Ghế", image: "https://assets.cuthongminh.com/games/learn-word/ghe.webp", category: "group4", syllables: ["gh", "ế"] },
  { id: "tu", name: "Tủ", image: "https://assets.cuthongminh.com/games/learn-word/tu.webp", category: "group4", syllables: ["t", "ủ"] },
  {
    id: "giuong",
    name: "Giường",
    image: "https://assets.cuthongminh.com/games/learn-word/giuong.webp",
    category: "group4",
    syllables: ["gi", "ường"],
  },
  { id: "cua", name: "Cửa", image: "https://assets.cuthongminh.com/games/learn-word/cua.webp", category: "group4", syllables: ["c", "ửa"] },
  { id: "den", name: "Đèn", image: "https://assets.cuthongminh.com/games/learn-word/den.webp", category: "group4", syllables: ["đ", "èn"] },

  // Group 5: Quần Áo
  { id: "ao", name: "Áo", image: "https://assets.cuthongminh.com/games/learn-word/ao.webp", category: "group5", syllables: ["á", "o"] },
  { id: "quan", name: "Quần", image: "https://assets.cuthongminh.com/games/learn-word/quan.webp", category: "group5", syllables: ["qu", "ần"] },
  { id: "giay", name: "Giày", image: "https://assets.cuthongminh.com/games/learn-word/giay.webp", category: "group5", syllables: ["gi", "ày"] },
  { id: "mu", name: "Mũ", image: "https://assets.cuthongminh.com/games/learn-word/mu.webp", category: "group5", syllables: ["m", "ũ"] },
  { id: "vay", name: "Váy", image: "https://assets.cuthongminh.com/games/learn-word/vay.webp", category: "group5", syllables: ["v", "áy"] },
  { id: "dep", name: "Dép", image: "https://assets.cuthongminh.com/games/learn-word/dep.webp", category: "group5", syllables: ["d", "ép"] },
];

export interface GroupData {
  id: string;
  title: string;
  description: string;
  logo: string | StaticImageData;
  variant: "green" | "blue" | "purple" | "orange";
  words: string[];
}

export const GROUPS: GroupData[] = [
  {
    id: "group1",
    title: "Gia Đình",
    description: "Học từ vựng về các thành viên trong gia đình",
    logo: "https://assets.cuthongminh.com/games/learn-word/group1.webp",
    variant: "green",
    words: ["bo", "me", "anh", "chi", "em-be", "ong-ba"],
  },
  {
    id: "group2",
    title: "Trường Học",
    description: "Học từ vựng về đồ dùng học tập",
    logo: "https://assets.cuthongminh.com/games/learn-word/group2.webp",
    variant: "blue",
    words: ["but-chi", "cuc-tay", "thuoc-ke", "sach", "cap-sach", "bang"],
  },
  {
    id: "group3",
    title: "Thiên Nhiên",
    description: "Học từ vựng về sự vật trong thiên nhiên",
    logo: "https://assets.cuthongminh.com/games/learn-word/group3.webp",
    variant: "orange",
    words: ["mat-troi", "mat-trang", "ngoi-sao", "dam-may", "cay", "nui"],
  },
  {
    id: "group4",
    title: "Đồ Dùng",
    description: "Học từ vựng về đồ dùng trong gia đình",
    logo: "https://assets.cuthongminh.com/games/learn-word/group4.webp",
    variant: "purple",
    words: ["ban", "ghe", "tu", "giuong", "cua", "den"],
  },
  {
    id: "group5",
    title: "Quần Áo",
    description: "Học từ vựng về trang phục hàng ngày",
    logo: "https://assets.cuthongminh.com/games/learn-word/group5.webp",
    variant: "green",
    words: ["ao", "quan", "giay", "mu", "vay", "dep"],
  },
];

export const WORD_DESCRIPTIONS: Record<string, string> = {
  bo: "Đây là Bố. Bố rất yêu thương gia đình.",
  me: "Đây là Mẹ. Mẹ chăm sóc cho cả nhà.",
  anh: "Đây là Anh trai. Anh hay chơi cùng em.",
  chi: "Đây là Chị gái. Chị rất xinh xắn.",
  "em-be": "Đây là Em pé. Em pé ngoan ơi là ngoan.",
  "ong-ba": "Đây là Ông bà. Ông bà rất hiền từ.",

  "but-chi": "Đây là chiếc bút chì. Bút chì dùng để viết bài.",
  "cuc-tay": "Đây là cục tẩy. Cục tẩy dùng để xóa vết bút.",
  "thuoc-ke": "Đây là thước kẻ. Thước dùng để kẻ đường thẳng.",
  sach: "Đây là quyển sách. Sách có nhiều chữ và hình vẽ đẹp.",
  "cap-sach": "Đây là chiếc cặp sách. Cặp dùng để đựng sách vở.",
  bang: "Đây là cái bảng. Bảng màu xanh dùng để viết phấn.",

  "mat-troi": "Đây là ông mặt trời. Mặt trời tỏa nắng ấm áp.",
  "mat-trang": "Đây là mặt trăng. Mặt trăng có hình cong như lưỡi liềm.",
  "ngoi-sao": "Đây là ngôi sao. Ngôi sao sáng lấp lánh trên trời.",
  "dam-may": "Đây là đám mây. Đám mây trắng trôi bồng bềnh.",
  cay: "Đây là cái cây. Cái cây có nhiều lá xanh.",
  nui: "Đây là quả núi. Núi rất cao và to.",

  ban: "Đây là cái bàn. Bé ngồi học ở bàn.",
  ghe: "Đây là cái ghế. Ghế dùng để ngồi.",
  tu: "Đây là cái tủ. Tủ dùng để cất quần áo.",
  giuong: "Đây là cái giường. Bé ngủ ngoan trên giường.",
  cua: "Đây là cánh cửa. Cửa để ra vào nhà.",
  den: "Đây là cái đèn. Đèn sáng giúp bé học bài.",

  ao: "Đây là cái áo. Bé mặc áo rất đẹp.",
  quan: "Đây là cái quần. Quần màu xanh dễ thương.",
  giay: "Đây là đôi giày. Bé đi giày để bảo vệ chân.",
  mu: "Đây là cái mũ. Mũ dùng để đội che nắng.",
  vay: "Đây là cái váy. Bé gái mặc váy rất xinh.",
  dep: "Đây là đôi dép. Đôi dép màu sắc sặc sỡ.",
};

export function getWordsForGroup(groupId: string): WordData[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return WORDS.filter((w) => group.words.includes(w.id));
}
