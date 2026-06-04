import { StaticImageData } from "next/image";
import { EntityData } from "@/types/game";

// Logos
const LogoGroup1 = "https://assets.cuthongminh.com/games/learn-weather/group1.webp";
const LogoGroup2 = "https://assets.cuthongminh.com/games/learn-weather/group2.webp";
const LogoGroup3 = "https://assets.cuthongminh.com/games/learn-weather/group3.webp";

// Group 1
const MatTroi = "https://assets.cuthongminh.com/games/learn-weather/mat_troi.webp";
const Mua = "https://assets.cuthongminh.com/games/learn-weather/mua.webp";
const May = "https://assets.cuthongminh.com/games/learn-weather/may_2.webp";
const Gio = "https://assets.cuthongminh.com/games/learn-weather/gio.webp";
const SamSet = "https://assets.cuthongminh.com/games/learn-weather/sam_set.webp";
const CauVong = "https://assets.cuthongminh.com/games/learn-weather/cau_vong.webp";

// Group 2
const Tuyet = "https://assets.cuthongminh.com/games/learn-weather/tuyet.webp";
const MuaDa = "https://assets.cuthongminh.com/games/learn-weather/mua_da.webp";
const SuongMu = "https://assets.cuthongminh.com/games/learn-weather/suong_mu.webp";
const Bao = "https://assets.cuthongminh.com/games/learn-weather/bao.webp";
const LocXoay = "https://assets.cuthongminh.com/games/learn-weather/loc_xoay.webp";
const SongThan = "https://assets.cuthongminh.com/games/learn-weather/song_than.webp";

// Group 3
const MuaXuan = "https://assets.cuthongminh.com/games/learn-weather/mua_xuan.webp";
const MuaHa = "https://assets.cuthongminh.com/games/learn-weather/mua_ha.webp";
const MuaThu = "https://assets.cuthongminh.com/games/learn-weather/mua_thu.webp";
const MuaDong = "https://assets.cuthongminh.com/games/learn-weather/mua_dong.webp";
const MuaKho = "https://assets.cuthongminh.com/games/learn-weather/mua_kho.webp";
const MuaMua = "https://assets.cuthongminh.com/games/learn-weather/mua_mua.webp";

// Clothing (Group 3 Special Lesson)
const AoAm = "https://assets.cuthongminh.com/games/learn-word/ao-khoac.webp";
const KhanQuang = "https://assets.cuthongminh.com/games/learn-weather/khan_quang.webp";
const AoMua = "https://assets.cuthongminh.com/games/learn-weather/ao_mua.webp";
const ODu = "https://assets.cuthongminh.com/games/learn-weather/o_du.webp";
const KinhMat = "https://assets.cuthongminh.com/games/learn-weather/kinh_mat.webp";
const NonRong = "https://assets.cuthongminh.com/games/learn-weather/non_rong.webp";
const AoDai = "https://assets.cuthongminh.com/games/learn-weather/ao_dai.webp";
const AoLen = "https://assets.cuthongminh.com/games/learn-weather/ao_len.webp";

export const WEATHER_ITEMS: EntityData[] = [
  // Group 1
  { id: "mat_troi", name: "Mặt Trời", image: MatTroi, category: "basic" },
  { id: "mua", name: "Mưa", image: Mua, category: "basic" },
  { id: "may", name: "Mây", image: May, category: "basic" },
  { id: "gio", name: "Gió", image: Gio, category: "basic" },
  { id: "sam_set", name: "Sấm Sét", image: SamSet, category: "basic" },
  { id: "cau_vong", name: "Cầu Vồng", image: CauVong, category: "basic" },

  // Group 2
  { id: "tuyet", name: "Tuyết", image: Tuyet, category: "special" },
  { id: "mua_da", name: "Mưa Đá", image: MuaDa, category: "special" },
  { id: "suong_mu", name: "Sương Mù", image: SuongMu, category: "special" },
  { id: "bao", name: "Bão", image: Bao, category: "special" },
  { id: "loc_xoay", name: "Lốc Xoáy", image: LocXoay, category: "special" },
  { id: "song_than", name: "Sóng Thần", image: SongThan, category: "special" },

  // Group 3
  { id: "mua_xuan", name: "Mùa Xuân", image: MuaXuan, category: "season" },
  { id: "mua_ha", name: "Mùa Hè", image: MuaHa, category: "season" },
  { id: "mua_thu", name: "Mùa Thu", image: MuaThu, category: "season" },
  { id: "mua_dong", name: "Mùa Đông", image: MuaDong, category: "season" },
  { id: "mua_kho", name: "Mùa Khô", image: MuaKho, category: "season" },
  { id: "mua_mua", name: "Mùa Mưa", image: MuaMua, category: "season" },
];

export const GROUPS = [
  {
    id: "group1",
    title: "Thời tiết cơ bản",
    description: "Học các hiện tượng thời tiết quen thuộc",
    items: ["mat_troi", "mua", "may", "gio", "sam_set", "cau_vong"],
    logo: LogoGroup1,
    variant: "blue" as const,
    lessonCount: 4,
  },
  {
    id: "group2",
    title: "Thời tiết đặc biệt",
    description: "Khám phá các hiện tượng thời tiết đặc biệt",
    items: ["tuyet", "mua_da", "suong_mu", "bao", "loc_xoay", "song_than"],
    logo: LogoGroup2,
    variant: "purple" as const,
    lessonCount: 4,
  },
  {
    id: "group3",
    title: "Mùa và khí hậu",
    description: "Nhận biết các mùa trong năm",
    items: ["mua_xuan", "mua_ha", "mua_thu", "mua_dong", "mua_kho", "mua_mua"],
    logo: LogoGroup3,
    variant: "orange" as const,
    lessonCount: 5,
  },
];

export const CLOTHING_ITEMS: EntityData[] = [
  { id: "ao_am", name: "Áo ấm", image: AoAm, category: "mua_dong" },
  { id: "khan_quang", name: "Khăn quàng", image: KhanQuang, category: "mua_dong" },
  { id: "ao_mua", name: "Áo mưa", image: AoMua, category: "mua_mua" },
  { id: "o_du", name: "Ô dù", image: ODu, category: "mua_mua" },
  { id: "kinh_mat", name: "Kính mát", image: KinhMat, category: "mua_ha" },
  { id: "non_rong", name: "Nón rộng", image: NonRong, category: "mua_kho" },
  { id: "ao_dai", name: "Áo dài", image: AoDai, category: "mua_xuan" },
  { id: "ao_len", name: "Áo len", image: AoLen, category: "mua_thu" },
  // Map seasonal items back to specific seasons for the game logic
];

export function getItemsForGroup(groupId: string): EntityData[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return group.items.map((itemId) => WEATHER_ITEMS.find((f) => f.id === itemId)).filter(Boolean) as EntityData[];
}

export function getAllItems(): EntityData[] {
  return WEATHER_ITEMS;
}

// ──── Weather Descriptions (for explore lesson) ────
export const WEATHER_DESCRIPTIONS: Record<string, string> = {
  // Basic
  mat_troi: "Mặt trời tỏa sáng và sưởi ấm trái đất. Nhờ mặt trời, cây cối mới mọc và chúng ta mới có ánh sáng!",
  mua: "Mưa là nước từ mây rơi xuống đất. Mưa giúp cây cối lớn lên và cho chúng ta nước uống!",
  may: "Mây trắng bồng bềnh trên trời. Mây được tạo thành từ những giọt nước nhỏ li ti!",
  gio: "Gió là không khí chuyển động. Gió mát thổi vào mùa hè mát lắm!",
  sam_set: "Sấm sét xảy ra khi trời mưa to. Tia sét rất sáng và tiếng sấm rất lớn!",
  cau_vong: "Cầu vồng có bảy màu sắc đẹp, xuất hiện sau cơn mưa khi có nắng. Cầu vồng rất kỳ diệu!",
  // Special
  tuyet: "Tuyết trắng rơi xuống khi trời rất lạnh. Trẻ em thích nặn người tuyết và chơi ném bóng tuyết!",
  mua_da: "Mưa đá là những viên đá nhỏ rơi từ mây. Mưa đá xảy ra khi thời tiết rất bất thường!",
  suong_mu: "Sương mù làm mờ tầm nhìn vào sáng sớm. Sương mù là mây ở rất thấp gần mặt đất!",
  bao: "Bão là gió rất mạnh kèm mưa to. Khi có bão, mọi người phải ở trong nhà an toàn!",
  loc_xoay: "Lốc xoáy là cơn gió xoáy tròn rất mạnh. Lốc xoáy có thể cuốn bay mọi thứ!",
  song_than: "Sóng thần là đợt sóng khổng lồ trên biển. Sóng thần rất nguy hiểm!",
  // Season
  mua_xuan: "Mùa xuân ấm áp, cây cối đâm chồi nảy lộc. Mùa xuân là mùa của Tết Nguyên Đán!",
  mua_ha: "Mùa hè nóng bức, được nghỉ học và đi biển. Mùa hè ăn kem và bơi lội thật vui!",
  mua_thu: "Mùa thu mát mẻ, lá cây chuyển vàng rất đẹp. Mùa thu có Tết Trung Thu rước đèn!",
  mua_dong: "Mùa đông lạnh, mặc áo ấm và uống trà nóng. Miền Bắc Việt Nam mùa đông rất lạnh!",
  mua_kho: "Mùa khô trời nắng ráo, ít mưa. Miền Nam Việt Nam có hai mùa: mùa mưa và mùa khô!",
  mua_mua: "Mùa mưa có nhiều cơn mưa rào, trời mát hơn. Nhớ mang ô khi đi ra ngoài nhé!",
};
