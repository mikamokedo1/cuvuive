import { StaticImageData } from "next/image";

// Import group logos
const LogoGroup1 = "https://assets.cuthongminh.com/games/learn-flower/group1.webp";
const LogoGroup2 = "https://assets.cuthongminh.com/games/learn-flower/group2.webp";
const LogoGroup3 = "https://assets.cuthongminh.com/games/learn-flower/group3.webp";

// Import Group 1: Hoa Phổ Biến (Common Vietnamese Flowers)
const HoaSen = "https://assets.cuthongminh.com/games/learn-flower/hoa_sen.webp";
const HoaMai = "https://assets.cuthongminh.com/games/learn-flower/hoa_mai.webp";
const HoaDao = "https://assets.cuthongminh.com/games/learn-flower/hoa_dao.webp";
const HoaCuc = "https://assets.cuthongminh.com/games/learn-flower/hoa_cuc.webp";
const HoaHong = "https://assets.cuthongminh.com/games/learn-flower/hoa_hong.webp";
const HoaLan = "https://assets.cuthongminh.com/games/learn-flower/hoa_lan.webp";

// Import Group 2: Hoa Tết & Hoa Trang Trí (Tết & Decorative Flowers)
const HoaLy = "https://assets.cuthongminh.com/games/learn-flower/hoa_ly.webp";
const HoaDongTien = "https://assets.cuthongminh.com/games/learn-flower/hoa_dong_tien.webp";
const HoaCatTuong = "https://assets.cuthongminh.com/games/learn-flower/hoa_cat_tuong.webp";
const HoaVanTho = "https://assets.cuthongminh.com/games/learn-flower/hoa_van_tho.webp";
const HoaGiay = "https://assets.cuthongminh.com/games/learn-flower/hoa_giay.webp";
const HoaPhuong = "https://assets.cuthongminh.com/games/learn-flower/hoa_phuong.webp";

// Import Group 3: Cây Ăn Quả (Fruit Trees)
const CayXoai = "https://assets.cuthongminh.com/games/learn-flower/cay_xoai.webp";
const CayDua = "https://assets.cuthongminh.com/games/learn-flower/cay_dua.webp";
const CayChuoi = "https://assets.cuthongminh.com/games/learn-flower/cay_chuoi.webp";
const CayBuoi = "https://assets.cuthongminh.com/games/learn-flower/cay_buoi.webp";
const CayNhan = "https://assets.cuthongminh.com/games/learn-flower/cay_nhan.webp";
const CayMit = "https://assets.cuthongminh.com/games/learn-flower/cay_mit.webp";
import { EntityData } from "@/types/game";

export const FLOWERS: EntityData[] = [
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
    title: "Hoa trang trí",
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

export function getFlowersForGroup(groupId: string): EntityData[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return group.flowers.map((flowerId) => FLOWERS.find((f) => f.id === flowerId)).filter(Boolean) as EntityData[];
}

export function getAllFlowers(): EntityData[] {
  return FLOWERS;
}

// ──── Flower Descriptions (for explore lesson) ────
export const FLOWER_DESCRIPTIONS: Record<string, string> = {
  // Common
  hoa_sen: "Hoa sen là quốc hoa Việt Nam. Sen mọc từ bùn nhưng hoa rất đẹp và thơm!",
  hoa_mai: "Hoa mai vàng nở vào dịp Tết, tượng trưng cho mùa xuân miền Nam Việt Nam!",
  hoa_dao: "Hoa đào hồng nở vào dịp Tết, là biểu tượng mùa xuân miền Bắc Việt Nam!",
  hoa_cuc: "Hoa cúc có nhiều cánh nhỏ xinh, tượng trưng cho sự trường thọ. Cúc có rất nhiều màu!",
  hoa_hong: "Hoa hồng là nữ hoàng của các loài hoa. Hoa hồng thường tặng cho người mình yêu thương!",
  hoa_lan: "Hoa lan rất quý và sang trọng. Lan có hàng ngàn loài khác nhau trên thế giới!",
  // Tet & Decorative
  hoa_ly: "Hoa ly trắng tinh khiết và thơm ngát. Hoa ly thường được cắm trên bàn thờ ngày Tết!",
  hoa_dong_tien: "Hoa đồng tiền tròn đẹp, tượng trưng cho sự giàu có. Ngày Tết hay mua hoa đồng tiền!",
  hoa_cat_tuong: "Hoa cát tường có nhiều cánh xếp lớp rất đẹp. Tên 'cát tường' nghĩa là may mắn!",
  hoa_van_tho: "Hoa vạn thọ vàng rực rỡ, tượng trưng cho sự sống lâu. Thường thấy trong ngày Tết!",
  hoa_giay: "Hoa giấy leo rất đẹp, có nhiều màu rực rỡ. Hoa giấy nở quanh năm và rất dễ trồng!",
  hoa_phuong: "Hoa phượng đỏ rực nở vào hè, gắn liền với mùa chia tay của học trò!",
  // Fruit Trees
  cay_xoai: "Cây xoài cho quả ngọt lịm. Mùa hè, xoài chín vàng ươm trên cây, thơm lừng!",
  cay_dua: "Cây dừa cao vút, cho nước dừa mát. Dừa mọc nhiều ở Bến Tre, gọi là 'xứ dừa'!",
  cay_chuoi: "Cây chuối có lá to xanh mướt. Chuối chín vàng ngọt, ai cũng thích ăn!",
  cay_buoi: "Cây bưởi cho quả to tròn. Bưởi Năm Roi và bưởi da xanh rất nổi tiếng ở Việt Nam!",
  cay_nhan: "Cây nhãn cho quả tròn nhỏ, ruột trong ngọt lịm. Nhãn lồng Hưng Yên rất nổi tiếng!",
  cay_mit: "Cây mít cho quả to, nhiều múi ngọt thơm. Mít được gọi là 'vua trái cây' vì quả rất to!",
};
