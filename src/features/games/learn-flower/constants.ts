import { StaticImageData } from "next/image";

// Import group logos
import LogoGroup1 from "@/assets/games/learn-flower/group1.webp";
import LogoGroup2 from "@/assets/games/learn-flower/group2.webp";
import LogoGroup3 from "@/assets/games/learn-flower/group3.webp";

// Import Group 1: Hoa Phổ Biến (Common Vietnamese Flowers)
import HoaSen from "@/assets/games/learn-flower/hoa_sen.webp";
import HoaMai from "@/assets/games/learn-flower/hoa_mai.webp";
import HoaDao from "@/assets/games/learn-flower/hoa_dao.webp";
import HoaCuc from "@/assets/games/learn-flower/hoa_cuc.webp";
import HoaHong from "@/assets/games/learn-flower/hoa_hong.webp";
import HoaLan from "@/assets/games/learn-flower/hoa_lan.webp";

// Import Group 2: Hoa Tết & Hoa Trang Trí (Tết & Decorative Flowers)
import HoaLy from "@/assets/games/learn-flower/hoa_ly.webp";
import HoaDongTien from "@/assets/games/learn-flower/hoa_dong_tien.webp";
import HoaCatTuong from "@/assets/games/learn-flower/hoa_cat_tuong.webp";
import HoaVanTho from "@/assets/games/learn-flower/hoa_van_tho.webp";
import HoaGiay from "@/assets/games/learn-flower/hoa_giay.webp";
import HoaPhuong from "@/assets/games/learn-flower/hoa_phuong.webp";

// Import Group 3: Cây Ăn Quả (Fruit Trees)
import CayXoai from "@/assets/games/learn-flower/cay_xoai.webp";
import CayDua from "@/assets/games/learn-flower/cay_dua.webp";
import CayChuoi from "@/assets/games/learn-flower/cay_chuoi.webp";
import CayBuoi from "@/assets/games/learn-flower/cay_buoi.webp";
import CayNhan from "@/assets/games/learn-flower/cay_nhan.webp";
import CayMit from "@/assets/games/learn-flower/cay_mit.webp";

export type FlowerCategory = "common" | "tet" | "tree";

export interface FlowerData {
  id: string;
  name: string;
  image: StaticImageData;
  category: FlowerCategory;
}

export const FLOWERS: FlowerData[] = [
  // Group 1: Hoa Phổ Biến
  { id: "hoa_sen", name: "Hoa Sen", image: HoaSen, category: "common" },
  { id: "hoa_mai", name: "Hoa Mai", image: HoaMai, category: "common" },
  { id: "hoa_dao", name: "Hoa Đào", image: HoaDao, category: "common" },
  { id: "hoa_cuc", name: "Hoa Cúc", image: HoaCuc, category: "common" },
  { id: "hoa_hong", name: "Hoa Hồng", image: HoaHong, category: "common" },
  { id: "hoa_lan", name: "Hoa Lan", image: HoaLan, category: "common" },

  // Group 2: Hoa Tết & Hoa Trang Trí
  { id: "hoa_ly", name: "Hoa Ly", image: HoaLy, category: "tet" },
  { id: "hoa_dong_tien", name: "Hoa Đồng Tiền", image: HoaDongTien, category: "tet" },
  { id: "hoa_cat_tuong", name: "Hoa Cát Tường", image: HoaCatTuong, category: "tet" },
  { id: "hoa_van_tho", name: "Hoa Vạn Thọ", image: HoaVanTho, category: "tet" },
  { id: "hoa_giay", name: "Hoa Giấy", image: HoaGiay, category: "tet" },
  { id: "hoa_phuong", name: "Hoa Phượng", image: HoaPhuong, category: "tet" },

  // Group 3: Cây Ăn Quả
  { id: "cay_xoai", name: "Cây Xoài", image: CayXoai, category: "tree" },
  { id: "cay_dua", name: "Cây Dừa", image: CayDua, category: "tree" },
  { id: "cay_chuoi", name: "Cây Chuối", image: CayChuoi, category: "tree" },
  { id: "cay_buoi", name: "Cây Bưởi", image: CayBuoi, category: "tree" },
  { id: "cay_nhan", name: "Cây Nhãn", image: CayNhan, category: "tree" },
  { id: "cay_mit", name: "Cây Mít", image: CayMit, category: "tree" },
];

export const GROUPS = [
  {
    id: "group1",
    title: "Hoa phổ biến",
    description: "Học các loại hoa quen thuộc ở Việt Nam",
    flowers: ["hoa_sen", "hoa_mai", "hoa_dao", "hoa_cuc", "hoa_hong", "hoa_lan"],
    logo: LogoGroup1,
    variant: "green" as const,
    lessonCount: 3,
  },
  {
    id: "group2",
    title: "Hoa Tết & Trang trí",
    description: "Học các loại hoa thường thấy dịp Tết",
    flowers: ["hoa_ly", "hoa_dong_tien", "hoa_cat_tuong", "hoa_van_tho", "hoa_giay", "hoa_phuong"],
    logo: LogoGroup2,
    variant: "orange" as const,
    lessonCount: 3,
  },
  {
    id: "group3",
    title: "Cây ăn quả",
    description: "Học các loại cây ăn quả Việt Nam",
    flowers: ["cay_xoai", "cay_dua", "cay_chuoi", "cay_buoi", "cay_nhan", "cay_mit"],
    logo: LogoGroup3,
    variant: "purple" as const,
    lessonCount: 3,
  },
];

export function getFlowersForGroup(groupId: string): FlowerData[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return group.flowers.map((flowerId) => FLOWERS.find((f) => f.id === flowerId)).filter(Boolean) as FlowerData[];
}

export function getAllFlowers(): FlowerData[] {
  return FLOWERS;
}
