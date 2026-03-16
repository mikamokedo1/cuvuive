import { EntityData } from "@/types/game";

// Logos
const LogoGroup1 = "https://assets.cuthongminh.com/games/learn-body/group1.webp";
const LogoGroup2 = "https://assets.cuthongminh.com/games/learn-body/group2.webp";
const LogoGroup3 = "https://assets.cuthongminh.com/games/learn-body/group3.webp";

// Group 1 — Đầu & Mặt
const Mat = "https://assets.cuthongminh.com/games/learn-body/mat.webp";
const Mui = "https://assets.cuthongminh.com/games/learn-body/mui.webp";
const Mieng = "https://assets.cuthongminh.com/games/learn-body/mieng.webp";
const Tai = "https://assets.cuthongminh.com/games/learn-body/tai.webp";
const Toc = "https://assets.cuthongminh.com/games/learn-body/toc.webp";
const Rang = "https://assets.cuthongminh.com/games/learn-body/rang.webp";

// Group 2 — Thân Mình
const Tay = "https://assets.cuthongminh.com/games/learn-body/tay.webp";
const Chan = "https://assets.cuthongminh.com/games/learn-body/chan.webp";
const Bung = "https://assets.cuthongminh.com/games/learn-body/bung.webp";
const Lung = "https://assets.cuthongminh.com/games/learn-body/lung.webp";
const Vai = "https://assets.cuthongminh.com/games/learn-body/vai.webp";
const Dau = "https://assets.cuthongminh.com/games/learn-body/dau.webp";

// Group 3 — Bàn Tay & Bàn Chân
const NgonTay = "https://assets.cuthongminh.com/games/learn-body/ngon_tay.webp";
const NgonChan = "https://assets.cuthongminh.com/games/learn-body/ngon_chan.webp";
const LongBanTay = "https://assets.cuthongminh.com/games/learn-body/long_ban_tay.webp";
const DauGoi = "https://assets.cuthongminh.com/games/learn-body/dau_goi.webp";
const KhuuTay = "https://assets.cuthongminh.com/games/learn-body/khuu_tay.webp";
const Got = "https://assets.cuthongminh.com/games/learn-body/got.webp";

// Character images for BodyTouchLesson
export const CHARACTER_IMAGES = {
  group1: "https://assets.cuthongminh.com/games/learn-body/character_face.webp",
  group2: "https://assets.cuthongminh.com/games/learn-body/character_body.webp",
  group3: "https://assets.cuthongminh.com/games/learn-body/character_limbs.webp",
};

export const BODY_ITEMS: EntityData[] = [
  // Group 1 — Đầu & Mặt
  { id: "mat", name: "Đôi Mắt", image: Mat, category: "head" },
  { id: "mui", name: "Cái Mũi", image: Mui, category: "head" },
  { id: "mieng", name: "Cái Miệng", image: Mieng, category: "head" },
  { id: "tai", name: "Đôi Tai", acceptedAnswers: ["đôi tai", "đôi tay"], image: Tai, category: "head" },
  { id: "toc", name: "Mái Tóc", image: Toc, category: "head" },
  { id: "rang", name: "Hàm Răng", image: Rang, category: "head" },

  // Group 2 — Thân Mình
  { id: "tay", name: "Cánh Tay", image: Tay, category: "body" },
  { id: "chan", name: "Đôi Chân", image: Chan, category: "body" },
  { id: "bung", name: "Cái Bụng", image: Bung, category: "body" },
  {
    id: "lung",
    name: "Cái Lưng",
    acceptedAnswers: ["cái lưng", "cãi lương", "cái lộn"],
    image: Lung,
    category: "body",
  },
  { id: "vai", name: "Đôi Vai", image: Vai, category: "body" },
  { id: "dau", name: "Cái Đầu", image: Dau, category: "body" },

  // Group 3 — Bàn Tay & Bàn Chân
  { id: "ngon_tay", name: "Ngón Tay", image: NgonTay, category: "limbs" },
  { id: "ngon_chan", name: "Ngón Chân", image: NgonChan, category: "limbs" },
  { id: "long_ban_tay", name: "Lòng Bàn Tay", image: LongBanTay, category: "limbs" },
  { id: "dau_goi", name: "Đầu Gối", image: DauGoi, category: "limbs" },
  { id: "khuu_tay", name: "Khuỷu Tay", image: KhuuTay, category: "limbs" },
  { id: "got", name: "Gót Chân", image: Got, category: "limbs" },
];

export const GROUPS = [
  {
    id: "group1",
    title: "Đầu & Mặt",
    description: "Học các bộ phận trên đầu và khuôn mặt",
    items: ["mat", "mui", "mieng", "tai", "toc", "rang"],
    logo: LogoGroup1,
    variant: "green" as const,
  },
  {
    id: "group2",
    title: "Thân Mình",
    description: "Học các bộ phận trên thân mình",
    items: ["tay", "chan", "bung", "lung", "vai", "dau"],
    logo: LogoGroup2,
    variant: "orange" as const,
  },
  {
    id: "group3",
    title: "Bàn Tay & Bàn Chân",
    description: "Học các bộ phận nhỏ trên tay và chân",
    items: ["ngon_tay", "ngon_chan", "long_ban_tay", "dau_goi", "khuu_tay", "got"],
    logo: LogoGroup3,
    variant: "blue" as const,
  },
];

export function getItemsForGroup(groupId: string): EntityData[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return group.items.map((itemId) => BODY_ITEMS.find((b) => b.id === itemId)).filter(Boolean) as EntityData[];
}

// ──── Body Part Descriptions (for explore lesson) ────
export const BODY_DESCRIPTIONS: Record<string, string> = {
  // Đầu & Mặt
  mat: "Đôi mắt giúp pé nhìn thấy mọi thứ xung quanh. Mắt có thể nhắm lại khi ngủ và mở to khi ngạc nhiên!",
  mui: "Cái mũi giúp pé ngửi mùi hoa thơm và đồ ăn ngon. Mũi cũng giúp pé thở nữa đấy!",
  mieng: "Cái miệng giúp pé ăn uống, nói chuyện và cười. Nhớ giữ miệng sạch sẽ nhé!",
  tai: "Đôi tai giúp pé nghe nhạc và nghe bố mẹ nói. Tai nằm hai bên đầu của pé!",
  toc: "Mái tóc mọc trên đầu và bảo vệ đầu khỏi nắng nóng. pé nhớ chải tóc gọn gàng nhé!",
  rang: "Hàm răng giúp pé nhai thức ăn. pé nhớ đánh răng mỗi ngày để răng trắng sạch!",
  // Thân Mình
  tay: "Cánh tay giúp pé cầm nắm đồ vật, ôm bố mẹ và vẫy chào bạn bè!",
  chan: "Đôi chân giúp pé đi, chạy, nhảy và đá bóng. Chân rất khoẻ luôn đấy!",
  bung: "Cái bụng chứa dạ dày giúp pé tiêu hoá thức ăn. Khi đói bụng sẽ kêu ó ó!",
  lung: "Cái lưng ở phía sau giúp pé đứng thẳng. Nhớ ngồi thẳng lưng để khoẻ mạnh nhé!",
  vai: "Đôi vai nằm hai bên cổ, giúp pé mang cặp sách đi học. Vai rất khoẻ!",
  dau: "Cái đầu chứa bộ não thông minh giúp pé suy nghĩ và học hỏi mỗi ngày!",
  // Bàn Tay & Bàn Chân
  ngon_tay: "Mỗi bàn tay có năm ngón tay. Ngón tay giúp pé viết chữ, vẽ tranh và chơi đàn!",
  ngon_chan: "Mỗi bàn chân có năm ngón chân. Ngón chân giúp pé giữ thăng bằng khi đi và chạy!",
  long_ban_tay: "Lòng bàn tay mềm mại, có nhiều đường vân. pé dùng lòng bàn tay để vỗ tay!",
  dau_goi: "Đầu gối giúp pé gập chân lại khi ngồi và nhảy. Nhớ bảo vệ đầu gối khi chơi nhé!",
  khuu_tay: "Khuỷu tay giúp pé gập cánh tay lại. Khuỷu tay ở giữa cánh tay!",
  got: "Gót chân ở phía sau bàn chân. Gót chân chạm đất đầu tiên khi pé đi bộ!",
};

// ──── Body Hotspots (for BodyTouchLesson) ────
export interface BodyHotspot {
  bodyId: string;
  x: number; // percentage from left (0-100)
  y: number; // percentage from top (0-100)
  radius: number; // hit area radius in %
}

export const GROUP_HOTSPOTS: Record<string, BodyHotspot[]> = {
  group1: [
    { bodyId: "toc", x: 50, y: 20, radius: 14 },
    { bodyId: "mat", x: 36, y: 58, radius: 7 },
    { bodyId: "mat", x: 64, y: 58, radius: 7 },
    { bodyId: "tai", x: 15, y: 62, radius: 8 },
    { bodyId: "tai", x: 85, y: 62, radius: 8 },
    { bodyId: "mui", x: 50, y: 61, radius: 6 },
    { bodyId: "mieng", x: 50, y: 76, radius: 6 },
  ],
  group2: [
    { bodyId: "dau", x: 50, y: 22, radius: 10 },
    { bodyId: "vai", x: 36, y: 38, radius: 6 },
    { bodyId: "vai", x: 60, y: 38, radius: 6 },
    { bodyId: "tay", x: 24, y: 38, radius: 5 },
    { bodyId: "tay", x: 76, y: 38, radius: 5 },
    { bodyId: "bung", x: 50, y: 50, radius: 8 },
    { bodyId: "chan", x: 44, y: 75, radius: 5 },
    { bodyId: "chan", x: 56, y: 75, radius: 5 },
  ],
  group3: [
    { bodyId: "ngon_tay", x: 30, y: 16, radius: 8 },
    { bodyId: "ngon_tay", x: 66, y: 16, radius: 8 },
    { bodyId: "long_ban_tay", x: 30, y: 29, radius: 6 },
    { bodyId: "long_ban_tay", x: 68, y: 29, radius: 6 },
    { bodyId: "khuu_tay", x: 21, y: 48, radius: 6 },
    { bodyId: "khuu_tay", x: 80, y: 48, radius: 6 },
    { bodyId: "dau_goi", x: 36, y: 62, radius: 6 },
    { bodyId: "dau_goi", x: 64, y: 62, radius: 6 },
    { bodyId: "ngon_chan", x: 38, y: 90, radius: 6 },
    { bodyId: "ngon_chan", x: 62, y: 90, radius: 6 },
  ],
};

// ──── Body Actions (for BodyActionLesson) ────
export interface BodyAction {
  question: string;
  correctBodyId: string;
  options: string[]; // 3 body part IDs
}

export const BODY_ACTIONS: Record<string, BodyAction[]> = {
  group1: [
    { question: "Pé dùng gì để nhìn thấy?", correctBodyId: "mat", options: ["mat", "tai", "mui"] },
    { question: "Pé dùng gì để ngửi hoa thơm?", correctBodyId: "mui", options: ["mui", "mieng", "tai"] },
    { question: "Pé dùng gì để ăn cơm?", correctBodyId: "mieng", options: ["mieng", "mat", "toc"] },
    { question: "Pé dùng gì để nghe nhạc?", correctBodyId: "tai", options: ["tai", "mat", "mui"] },
    { question: "Pé chải gì mỗi sáng?", correctBodyId: "toc", options: ["toc", "tai", "rang"] },
    { question: "Pé dùng gì để nhai thức ăn?", correctBodyId: "rang", options: ["rang", "mieng", "mui"] },
    { question: "Pé nhắm gì lại khi ngủ?", correctBodyId: "mat", options: ["mat", "mieng", "tai"] },
    { question: "Pé mỉm cười bằng gì?", correctBodyId: "mieng", options: ["mieng", "mat", "toc"] },
  ],
  group2: [
    { question: "Pé dùng gì để viết bài?", correctBodyId: "tay", options: ["tay", "chan", "vai"] },
    { question: "Pé dùng gì để chạy?", correctBodyId: "chan", options: ["chan", "tay", "bung"] },
    { question: "Pé dùng gì để mang cặp sách?", correctBodyId: "vai", options: ["vai", "lung", "dau"] },
    { question: "Pé dùng gì để suy nghĩ?", correctBodyId: "dau", options: ["dau", "bung", "vai"] },
    { question: "Pé dùng gì để đứng thẳng?", correctBodyId: "lung", options: ["lung", "chan", "bung"] },
    { question: "Thức ăn vào đâu?", correctBodyId: "bung", options: ["bung", "dau", "lung"] },
    { question: "Pé ôm bố mẹ bằng gì?", correctBodyId: "tay", options: ["tay", "vai", "chan"] },
    { question: "Pé đá bóng bằng gì?", correctBodyId: "chan", options: ["chan", "tay", "bung"] },
  ],
  group3: [
    {
      question: "Pé dùng gì để cầm bút?",
      correctBodyId: "ngon_tay",
      options: ["ngon_tay", "long_ban_tay", "khuu_tay"],
    },
    {
      question: "Pé dùng gì để vỗ tay?",
      correctBodyId: "long_ban_tay",
      options: ["long_ban_tay", "ngon_tay", "khuu_tay"],
    },
    { question: "Pé gập chân bằng gì?", correctBodyId: "dau_goi", options: ["dau_goi", "got", "ngon_chan"] },
    { question: "Pé dùng gì để nhảy lên?", correctBodyId: "dau_goi", options: ["dau_goi", "ngon_chan", "got"] },
    { question: "Pé gập tay bằng gì?", correctBodyId: "khuu_tay", options: ["khuu_tay", "ngon_tay", "long_ban_tay"] },
    { question: "Pé giữ thăng bằng bằng gì?", correctBodyId: "ngon_chan", options: ["ngon_chan", "ngon_tay", "got"] },
    {
      question: "Pé đếm ngón trên tay bằng gì?",
      correctBodyId: "ngon_tay",
      options: ["ngon_tay", "ngon_chan", "long_ban_tay"],
    },
    { question: "Chạm đất đầu tiên khi đi?", correctBodyId: "got", options: ["got", "ngon_chan", "dau_goi"] },
  ],
};
