import { StaticImageData } from "next/image";
import { EntityData } from "@/types/game";

// Logos
import LogoGroup1 from "@/assets/games/learn-weather/group1.png";
import LogoGroup2 from "@/assets/games/learn-weather/group2.png";
import LogoGroup3 from "@/assets/games/learn-weather/group3.png";

// Group 1
import MatTroi from "@/assets/games/learn-weather/mat_troi.png";
import Mua from "@/assets/games/learn-weather/mua.png";
import May from "@/assets/games/learn-weather/may_2.png";
import Gio from "@/assets/games/learn-weather/gio.png";
import SamSet from "@/assets/games/learn-weather/sam_set.png";
import CauVong from "@/assets/games/learn-weather/cau_vong.png";

// Group 2
import Tuyet from "@/assets/games/learn-weather/tuyet.png";
import MuaDa from "@/assets/games/learn-weather/mua_da.png";
import SuongMu from "@/assets/games/learn-weather/suong_mu.png";
import Bao from "@/assets/games/learn-weather/bao.png";
import LocXoay from "@/assets/games/learn-weather/loc_xoay.png";
import SongThan from "@/assets/games/learn-weather/song_than.png";

// Group 3
import MuaXuan from "@/assets/games/learn-weather/mua_xuan.png";
import MuaHa from "@/assets/games/learn-weather/mua_ha.png";
import MuaThu from "@/assets/games/learn-weather/mua_thu.png";
import MuaDong from "@/assets/games/learn-weather/mua_dong.png";
import MuaKho from "@/assets/games/learn-weather/mua_kho.png";
import MuaMua from "@/assets/games/learn-weather/mua_mua.png";

// Clothing (Group 3 Special Lesson)
import AoAm from "@/assets/games/learn-weather/ao_am.png";
import KhanQuang from "@/assets/games/learn-weather/khan_quang.png";
import AoMua from "@/assets/games/learn-weather/ao_mua.png";
import ODu from "@/assets/games/learn-weather/o_du.png";
import KinhMat from "@/assets/games/learn-weather/kinh_mat.png";
import NonRong from "@/assets/games/learn-weather/non_rong.webp";
import AoDai from "@/assets/games/learn-weather/ao_dai.png";
import AoLen from "@/assets/games/learn-weather/ao_len.png";

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
