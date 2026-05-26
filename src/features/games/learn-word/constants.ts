import { StaticImageData } from "next/image";
import { EntityData } from "@/types/game";

export interface WordData extends EntityData {
  syllables: string[];
}

const emojiSvg = (emoji: string, bg: string = "E0F7FA") =>
  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23${bg}" rx="20"/><text x="50" y="50" font-size="50" text-anchor="middle" dominant-baseline="central">${encodeURIComponent(emoji)}</text></svg>`;

export const WORDS: WordData[] = [
  // Group 1: Gia Đình
  {
    id: "bo",
    name: "Bố",
    image: "https://assets.cuthongminh.com/games/learn-word/bo.webp",
    category: "group1",
    syllables: ["b", "ố"],
  },
  {
    id: "me",
    name: "Mẹ",
    image: "https://assets.cuthongminh.com/games/learn-word/me.webp",
    category: "group1",
    syllables: ["m", "ẹ"],
  },
  {
    id: "anh",
    name: "Anh",
    image: "https://assets.cuthongminh.com/games/learn-word/anh.webp",
    category: "group1",
    syllables: ["a", "nh"],
  },
  {
    id: "chi",
    name: "Chị",
    image: "https://assets.cuthongminh.com/games/learn-word/chi.webp",
    category: "group1",
    syllables: ["ch", "ị"],
  },
  {
    id: "em-be",
    name: "Em Bé",
    pronounce: "Em Pé",
    image: "https://assets.cuthongminh.com/games/learn-word/em-be.webp",
    category: "group1",
    syllables: ["Em", "bé"],
  },
  {
    id: "ong-ba",
    name: "Ông bà",
    image: "https://assets.cuthongminh.com/games/learn-word/ong-ba.webp",
    category: "group1",
    syllables: ["Ông", "bà"],
  },

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
  {
    id: "sach",
    name: "Sách",
    image: "https://assets.cuthongminh.com/games/learn-word/sach.webp",
    category: "group2",
    syllables: ["s", "ách"],
  },
  {
    id: "cap-sach",
    name: "Cặp sách",
    image: "https://assets.cuthongminh.com/games/learn-word/cap-sach.webp",
    category: "group2",
    syllables: ["Cặp", "sách"],
  },
  {
    id: "bang",
    name: "Bảng",
    image: "https://assets.cuthongminh.com/games/learn-word/bang.webp",
    category: "group2",
    syllables: ["b", "ảng"],
  },

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
  {
    id: "cay",
    name: "Cây",
    image: "https://assets.cuthongminh.com/games/learn-word/cay.webp",
    category: "group3",
    syllables: ["c", "ây"],
  },
  {
    id: "nui",
    name: "Núi",
    image: "https://assets.cuthongminh.com/games/learn-word/nui.webp",
    category: "group3",
    syllables: ["n", "úi"],
  },

  // Group 4: Đồ Dùng Trong Nhà
  {
    id: "ban",
    name: "Bàn",
    image: "https://assets.cuthongminh.com/games/learn-word/ban.webp",
    category: "group4",
    syllables: ["b", "àn"],
  },
  {
    id: "ghe",
    name: "Ghế",
    image: "https://assets.cuthongminh.com/games/learn-word/ghe.webp",
    category: "group4",
    syllables: ["gh", "ế"],
  },
  {
    id: "tu",
    name: "Tủ",
    image: "https://assets.cuthongminh.com/games/learn-word/tu.webp",
    category: "group4",
    syllables: ["t", "ủ"],
  },
  {
    id: "giuong",
    name: "Giường",
    image: "https://assets.cuthongminh.com/games/learn-word/giuong.webp",
    category: "group4",
    syllables: ["gi", "ường"],
  },
  {
    id: "cua",
    name: "Cửa",
    image: "https://assets.cuthongminh.com/games/learn-word/cua.webp",
    category: "group4",
    syllables: ["c", "ửa"],
  },
  {
    id: "den",
    name: "Đèn",
    image: "https://assets.cuthongminh.com/games/learn-word/den.webp",
    category: "group4",
    syllables: ["đ", "èn"],
  },

  // Group 5: Quần Áo
  {
    id: "ao",
    name: "Áo",
    image: "https://assets.cuthongminh.com/games/learn-word/ao.webp",
    category: "group5",
    syllables: ["á", "o"],
  },
  {
    id: "quan",
    name: "Quần",
    image: "https://assets.cuthongminh.com/games/learn-word/quan.webp",
    category: "group5",
    syllables: ["qu", "ần"],
  },
  {
    id: "giay",
    name: "Giày",
    image: "https://assets.cuthongminh.com/games/learn-word/giay.webp",
    category: "group5",
    syllables: ["gi", "ày"],
  },
  {
    id: "mu",
    name: "Mũ",
    image: "https://assets.cuthongminh.com/games/learn-word/mu.webp",
    category: "group5",
    syllables: ["m", "ũ"],
  },
  {
    id: "vay",
    name: "Váy",
    image: "https://assets.cuthongminh.com/games/learn-word/vay.webp",
    category: "group5",
    syllables: ["v", "áy"],
  },
  {
    id: "dep",
    name: "Dép",
    image: "https://assets.cuthongminh.com/games/learn-word/dep.webp",
    category: "group5",
    syllables: ["d", "ép"],
  },

  // Gia Đình (Group 1) - additional
  { id: "chu", name: "Chú", image: emojiSvg("👨", "E3F2FD"), category: "group1", syllables: ["ch", "ú"] },
  { id: "di", name: "Dì", image: emojiSvg("👩", "FCE4EC"), category: "group1", syllables: ["d", "ì"] },
  { id: "cau", name: "Cậu", image: emojiSvg("👨", "E8F5E9"), category: "group1", syllables: ["c", "ậu"] },
  { id: "mo", name: "Mợ", image: emojiSvg("👩", "FFF3E0"), category: "group1", syllables: ["m", "ợ"] },
  { id: "bac", name: "Bác", image: emojiSvg("🧑", "E0F7FA"), category: "group1", syllables: ["b", "ác"] },
  { id: "co", name: "Cô", image: emojiSvg("👩", "F3E5F5"), category: "group1", syllables: ["c", "ô"] },
  { id: "chau", name: "Cháu", image: emojiSvg("🧒", "ECEFF1"), category: "group1", syllables: ["ch", "áu"] },
  { id: "vo", name: "Vợ", image: emojiSvg("👰", "FFEBEE"), category: "group1", syllables: ["v", "ợ"] },
  { id: "chong", name: "Chồng", image: emojiSvg("🤵", "E8F5E9"), category: "group1", syllables: ["ch", "ồng"] },

  // Trường Học (Group 2) - additional
  { id: "but-muc", name: "Bút mực", image: emojiSvg("🖋️", "E3F2FD"), category: "group2", syllables: ["Bút", "mực"] },
  { id: "phan", name: "Phấn", image: emojiSvg("🖍️", "FCE4EC"), category: "group2", syllables: ["ph", "ấn"] },
  { id: "vo-hoc", name: "Vở", image: emojiSvg("📓", "E8F5E9"), category: "group2", syllables: ["v", "ở"] },
  { id: "muc", name: "Mực", image: emojiSvg("🫙", "FFF3E0"), category: "group2", syllables: ["m", "ực"] },
  { id: "hop-but", name: "Hộp bút", image: emojiSvg("👝", "E0F7FA"), category: "group2", syllables: ["Hộp", "bút"] },
  { id: "keo", name: "Kéo", image: emojiSvg("✂️", "F3E5F5"), category: "group2", syllables: ["k", "éo"] },
  { id: "ho-dan", name: "Hồ dán", image: emojiSvg("🧴", "ECEFF1"), category: "group2", syllables: ["Hồ", "dán"] },
  { id: "mau-ve", name: "Màu vẽ", image: emojiSvg("🎨", "FFEBEE"), category: "group2", syllables: ["Màu", "vẽ"] },
  { id: "ghe-go", name: "Ghế gỗ", image: emojiSvg("🪑", "E8F5E9"), category: "group2", syllables: ["Ghế", "gỗ"] },

  // Thiên Nhiên (Group 3) - additional
  { id: "song", name: "Sông", image: emojiSvg("🏞️", "E3F2FD"), category: "group3", syllables: ["s", "ông"] },
  { id: "mua", name: "Mưa", image: emojiSvg("🌧️", "FCE4EC"), category: "group3", syllables: ["m", "ưa"] },
  { id: "bien", name: "Biển", image: emojiSvg("🌊", "E8F5E9"), category: "group3", syllables: ["b", "iển"] },
  { id: "dao", name: "Đảo", image: emojiSvg("🏝️", "FFF3E0"), category: "group3", syllables: ["đ", "ảo"] },
  { id: "dat", name: "Đất", image: emojiSvg("🟤", "E0F7FA"), category: "group3", syllables: ["đ", "ất"] },
  { id: "da", name: "Đá", image: emojiSvg("🪨", "F3E5F5"), category: "group3", syllables: ["đ", "á"] },
  { id: "hoa", name: "Hoa", image: emojiSvg("🌸", "ECEFF1"), category: "group3", syllables: ["h", "oa"] },
  { id: "co-cay", name: "Cỏ", image: emojiSvg("🌿", "FFEBEE"), category: "group3", syllables: ["c", "ỏ"] },
  { id: "rung", name: "Rừng", image: emojiSvg("🌲", "E8F5E9"), category: "group3", syllables: ["r", "ừng"] },

  // Đồ Dùng (Group 4) - additional
  { id: "tivi", name: "Ti vi", image: emojiSvg("📺", "E3F2FD"), category: "group4", syllables: ["Ti", "vi"] },
  { id: "quat", name: "Quạt", image: emojiSvg("🪭", "FCE4EC"), category: "group4", syllables: ["qu", "ạt"] },
  { id: "coc", name: "Cốc", image: emojiSvg("🥛", "E8F5E9"), category: "group4", syllables: ["c", "ốc"] },
  { id: "bat", name: "Bát", image: emojiSvg("🥣", "FFF3E0"), category: "group4", syllables: ["b", "át"] },
  { id: "dua", name: "Đũa", image: emojiSvg("🥢", "E0F7FA"), category: "group4", syllables: ["đ", "ũa"] },
  { id: "thia", name: "Thìa", image: emojiSvg("🥄", "F3E5F5"), category: "group4", syllables: ["th", "ìa"] },
  { id: "noi", name: "Nồi", image: emojiSvg("🍲", "ECEFF1"), category: "group4", syllables: ["n", "ồi"] },
  { id: "chao", name: "Chảo", image: emojiSvg("🍳", "FFEBEE"), category: "group4", syllables: ["ch", "ảo"] },
  { id: "guong", name: "Gương", image: emojiSvg("🪞", "E8F5E9"), category: "group4", syllables: ["g", "ương"] },

  // Quần Áo (Group 5) - additional
  { id: "tat", name: "Tất", image: emojiSvg("🧦", "E3F2FD"), category: "group5", syllables: ["t", "ất"] },
  { id: "khan", name: "Khăn", image: emojiSvg("🧣", "FCE4EC"), category: "group5", syllables: ["kh", "ăn"] },
  { id: "gang-tay", name: "Găng tay", image: emojiSvg("🧤", "E8F5E9"), category: "group5", syllables: ["Găng", "tay"] },
  { id: "that-lung", name: "Thắt lưng", image: emojiSvg("🥋", "FFF3E0"), category: "group5", syllables: ["Thắt", "lưng"] },
  { id: "ao-khoac", name: "Áo khoác", image: emojiSvg("🧥", "E0F7FA"), category: "group5", syllables: ["Áo", "khoác"] },
  { id: "quan-dui", name: "Quần đùi", image: emojiSvg("🩳", "F3E5F5"), category: "group5", syllables: ["Quần", "đùi"] },
  { id: "kinh", name: "Kính", image: emojiSvg("👓", "ECEFF1"), category: "group5", syllables: ["k", "ính"] },
  { id: "nhan", name: "Nhẫn", image: emojiSvg("💍", "FFEBEE"), category: "group5", syllables: ["nh", "ẫn"] },
  { id: "vong", name: "Vòng", image: emojiSvg("📿", "E8F5E9"), category: "group5", syllables: ["v", "òng"] },
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
    words: ["bo", "me", "anh", "chi", "em-be", "ong-ba", "chu", "di", "cau", "mo", "bac", "co", "chau", "vo", "chong"],
  },
  {
    id: "group2",
    title: "Trường Học",
    description: "Học từ vựng về đồ dùng học tập",
    logo: "https://assets.cuthongminh.com/games/learn-word/group2.webp",
    variant: "blue",
    words: ["but-chi", "cuc-tay", "thuoc-ke", "sach", "cap-sach", "bang", "but-muc", "phan", "vo-hoc", "muc", "hop-but", "keo", "ho-dan", "mau-ve", "ghe-go"],
  },
  {
    id: "group3",
    title: "Thiên Nhiên",
    description: "Học từ vựng về sự vật trong thiên nhiên",
    logo: "https://assets.cuthongminh.com/games/learn-word/group3.webp",
    variant: "orange",
    words: ["mat-troi", "mat-trang", "ngoi-sao", "dam-may", "cay", "nui", "song", "mua", "bien", "dao", "dat", "da", "hoa", "co-cay", "rung"],
  },
  {
    id: "group4",
    title: "Đồ Dùng",
    description: "Học từ vựng về đồ dùng trong gia đình",
    logo: "https://assets.cuthongminh.com/games/learn-word/group4.webp",
    variant: "purple",
    words: ["ban", "ghe", "tu", "giuong", "cua", "den", "tivi", "quat", "coc", "bat", "dua", "thia", "noi", "chao", "guong"],
  },
  {
    id: "group5",
    title: "Quần Áo",
    description: "Học từ vựng về trang phục hàng ngày",
    logo: "https://assets.cuthongminh.com/games/learn-word/group5.webp",
    variant: "green",
    words: ["ao", "quan", "giay", "mu", "vay", "dep", "tat", "khan", "gang-tay", "that-lung", "ao-khoac", "quan-dui", "kinh", "nhan", "vong"],
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

  // Gia đình
  chu: "Đây là Chú. Chú là em trai của bố.",
  di: "Đây là Dì. Dì là chị em gái của mẹ.",
  cau: "Đây là Cậu. Cậu là anh em trai của mẹ.",
  mo: "Đây là Mợ. Mợ là vợ của cậu.",
  bac: "Đây là Bác. Bác là anh chị của bố mẹ.",
  co: "Đây là Cô. Cô là chị em gái của bố.",
  chau: "Đây là Cháu. Cháu rất ngoan ngoãn.",
  vo: "Đây là Vợ. Vợ chăm sóc cho gia đình.",
  chong: "Đây là Chồng. Chồng làm việc chăm chỉ.",

  // Trường học
  "but-muc": "Đây là chiếc bút mực. Dùng để viết chữ rất đẹp.",
  phan: "Đây là viên phấn. Phấn dùng để viết lên bảng.",
  "vo-hoc": "Đây là quyển vở. Bé viết bài vào vở.",
  muc: "Đây là lọ mực. Mực dùng để bơm vào bút.",
  "hop-but": "Đây là hộp bút. Hộp đựng các loại bút gọn gàng.",
  keo: "Đây là cái kéo. Kéo dùng để cắt giấy.",
  "ho-dan": "Đây là lọ hồ dán. Dùng để dán giấy.",
  "mau-ve": "Đây là hộp màu vẽ. Dùng để tô màu bức tranh.",
  "ghe-go": "Đây là chiếc ghế gỗ. Ghế gỗ để ngồi học.",

  // Thiên nhiên
  song: "Đây là con sông. Sông có nước chảy dài.",
  mua: "Đây là cơn mưa. Mưa tưới mát cho cây cối.",
  bien: "Đây là bãi biển. Biển có cát trắng và sóng xanh.",
  dao: "Đây là hòn đảo. Hòn đảo nằm giữa biển xanh.",
  dat: "Đây là mặt đất. Đất để trồng cây xanh.",
  da: "Đây là hòn đá. Hòn đá rất cứng.",
  hoa: "Đây là bông hoa. Bông hoa nở rất đẹp.",
  "co-cay": "Đây là cây cỏ. Cỏ mọc xanh tươi.",
  rung: "Đây là khu rừng. Rừng có rất nhiều cây.",

  // Đồ dùng
  tivi: "Đây là cái ti vi. Ti vi có nhiều chương trình hay.",
  quat: "Đây là cái quạt. Quạt quay cho gió mát.",
  coc: "Đây là cái cốc. Cốc dùng để uống nước.",
  bat: "Đây là cái bát. Bát dùng để ăn cơm.",
  dua: "Đây là đôi đũa. Đũa dùng để gắp thức ăn.",
  thia: "Đây là cái thìa. Thìa dùng để xúc cơm.",
  noi: "Đây là cái nồi. Nồi dùng để nấu canh.",
  chao: "Đây là cái chảo. Chảo dùng để rán trứng.",
  guong: "Đây là cái gương. Gương dùng để soi mặt.",

  // Quần áo
  tat: "Đây là đôi tất. Tất giữ ấm cho đôi chân.",
  khan: "Đây là chiếc khăn. Khăn quàng cổ cho ấm.",
  "gang-tay": "Đây là đôi găng tay. Găng tay giữ ấm đôi bàn tay.",
  "that-lung": "Đây là chiếc thắt lưng. Dùng để giữ chặt quần.",
  "ao-khoac": "Đây là chiếc áo khoác. Mặc áo khoác khi trời lạnh.",
  "quan-dui": "Đây là chiếc quần đùi. Quần đùi mặc rất mát mẻ.",
  kinh: "Đây là chiếc kính. Đeo kính bảo vệ đôi mắt.",
  nhan: "Đây là chiếc nhẫn. Nhẫn đeo trên ngón tay.",
  vong: "Đây là chiếc vòng. Vòng đeo trên cổ tay rất đẹp.",
};

export function getWordsForGroup(groupId: string): WordData[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return WORDS.filter((w) => group.words.includes(w.id));
}
