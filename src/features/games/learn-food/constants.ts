import { StaticImageData } from "next/image";

// Import group logos
const LogoGroup1 = "https://assets.cuthongminh.com/games/learn-food/group1.webp";
const LogoGroup2 = "https://assets.cuthongminh.com/games/learn-food/group2.webp";
const LogoGroup3 = "https://assets.cuthongminh.com/games/learn-food/group3.webp";

// Import Breakfast Items (Group 1)
const BanhMi = "https://assets.cuthongminh.com/games/learn-food/banh_mi.webp";
const Pho = "https://assets.cuthongminh.com/games/learn-food/pho.webp";
const TrungOpLa = "https://assets.cuthongminh.com/games/learn-food/trung_op_la.webp";
const SuaTuoi = "https://assets.cuthongminh.com/games/learn-food/sua_tuoi.webp";
const NguCoc = "https://assets.cuthongminh.com/games/learn-food/ngu_coc.webp";
const XucXich = "https://assets.cuthongminh.com/games/learn-food/xuc_xich.webp";

// Import Main Dishes (Group 2)
const ComTrang = "https://assets.cuthongminh.com/games/learn-food/com_trang.webp";
const Canh = "https://assets.cuthongminh.com/games/learn-food/canh.webp";
const GaRan = "https://assets.cuthongminh.com/games/learn-food/ga_ran.webp";
const Pizza = "https://assets.cuthongminh.com/games/learn-food/pizza.webp";
const Hamburger = "https://assets.cuthongminh.com/games/learn-food/hamburger.webp";
const MiY = "https://assets.cuthongminh.com/games/learn-food/mi_y.webp";

// Import Desserts (Group 3)
const Kem = "https://assets.cuthongminh.com/games/learn-food/kem.webp";
const BanhNgot = "https://assets.cuthongminh.com/games/learn-food/banh_ngot.webp";
const NuocCam = "https://assets.cuthongminh.com/games/learn-food/nuoc_cam.webp";
const SuaChua = "https://assets.cuthongminh.com/games/learn-food/sua_chua.webp";
const BanhVong = "https://assets.cuthongminh.com/games/learn-food/banh_vong.webp";
const BanhQuy = "https://assets.cuthongminh.com/games/learn-food/banh_quy.webp";
const Traicay = "https://assets.cuthongminh.com/games/learn-food/trai_cay.webp";
import { EntityData } from "@/types/game";

export const FOODS: EntityData[] = [
  // Breakfast (Group 1)
  { id: "banh_mi", name: "Bánh mì", image: BanhMi, category: "breakfast" },
  { id: "pho", name: "Phở", image: Pho, category: "breakfast" },
  { id: "trung_op_la", name: "Trứng ốp la", image: TrungOpLa, category: "breakfast" },
  { id: "sua_tuoi", name: "Sữa tươi", image: SuaTuoi, category: "breakfast" },
  { id: "ngu_coc", name: "Ngũ cốc", image: NguCoc, category: "breakfast" },
  { id: "xuc_xich", name: "Xúc xích", image: XucXich, category: "breakfast" },

  // Main Dishes (Group 2)
  { id: "com_trang", name: "Cơm trắng", image: ComTrang, category: "main_dish" },
  { id: "canh", name: "Canh", image: Canh, category: "main_dish" },
  { id: "ga_ran", name: "Gà rán", image: GaRan, category: "main_dish" },
  { id: "pizza", name: "Pi da", image: Pizza, category: "main_dish" },
  { id: "hamburger", name: "ham bơ gơ", image: Hamburger, category: "main_dish" },
  { id: "mi_y", name: "Mì Ý", image: MiY, category: "main_dish" },

  // Desserts (Group 3)
  { id: "kem", name: "Kem", image: Kem, category: "dessert" },
  { id: "banh_ngot", name: "Bánh ngọt", image: BanhNgot, category: "dessert" },
  { id: "nuoc_cam", name: "Nước cam", image: NuocCam, category: "dessert" },
  { id: "sua_chua", name: "Sữa chua", image: SuaChua, category: "dessert" },
  { id: "banh_vong", name: "Bánh vòng", image: BanhVong, category: "dessert" },
  { id: "banh_quy", name: "Bánh qui", image: BanhQuy, category: "dessert" },
  { id: "trai_cay", name: "Trái cây", image: Traicay, category: "dessert" },
];

export const GROUPS = [
  {
    id: "group1",
    title: "Bữa sáng",
    description: "Học các món ăn sáng",
    foods: ["banh_mi", "pho", "trung_op_la", "sua_tuoi", "ngu_coc", "xuc_xich"],
    logo: LogoGroup1,
    color: "bg-orange-100 text-orange-600",
    variant: "orange" as const,
    lessonCount: 3,
  },
  {
    id: "group2",
    title: "Món chính",
    description: "Học các món ăn chính",
    foods: ["com_trang", "canh", "ga_ran", "pizza", "hamburger", "mi_y"],
    logo: LogoGroup2,
    color: "bg-green-100 text-green-600",
    variant: "green" as const,
    lessonCount: 3,
  },
  {
    id: "group3",
    title: "Tráng miệng",
    description: "Học các món tráng miệng",
    foods: ["kem", "banh_ngot", "nuoc_cam", "sua_chua", "banh_vong", "banh_quy", "trai_cay"],
    logo: LogoGroup3,
    color: "bg-purple-100 text-purple-600",
    variant: "purple" as const,
    lessonCount: 3,
  },
];

export function getFoodsForGroup(groupId: string): EntityData[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return FOODS.filter((food) => group.foods.includes(food.id));
}

export function getAllFoods(): EntityData[] {
  return FOODS;
}

// ──── Food Descriptions (for explore lesson) ────
export const FOOD_DESCRIPTIONS: Record<string, string> = {
  // Breakfast
  banh_mi: "Bánh mì giòn rụm, nhân thịt và rau. Bánh mì Việt Nam nổi tiếng khắp thế giới!",
  pho: "Phở có nước lèo thơm ngon, kèm bánh phở và thịt. Phở là món ăn đặc trưng của Việt Nam!",
  trung_op_la: "Trứng ốp la chiên vàng giòn, lòng đỏ béo ngậy. Ăn kèm cơm hoặc bánh mì rất ngon!",
  sua_tuoi: "Sữa tươi trắng ngon, rất tốt cho xương và răng. Uống sữa mỗi ngày giúp pé lớn nhanh!",
  ngu_coc: "Ngũ cốc ăn với sữa, giòn giòn ngọt ngọt. Ngũ cốc giàu chất xơ, tốt cho bụng!",
  xuc_xich: "Xúc xích nướng thơm lừng, ăn rất vui miệng. Xúc xích thường ăn kèm tương cà!",
  // Main Dishes
  com_trang: "Cơm trắng là món chính trong bữa ăn Việt Nam. Cơm ăn kèm canh và thịt rất ngon!",
  canh: "Canh nóng hổi, có rau và thịt. Ăn canh giúp bổ sung nước và rau xanh cho cơ thể!",
  ga_ran: "Gà rán giòn rụm bên ngoài, mềm ngọt bên trong. Gà rán là món trẻ em rất yêu thích!",
  pizza: "Pi da tròn to, phủ phô mai và nhân. Pi da là món ăn nổi tiếng từ nước Ý!",
  hamburger: "Ham bơ gơ có thịt bò, rau xà lách và sốt. Ham bơ gơ là món ăn nhanh phổ biến!",
  mi_y: "Mì Ý có sốt cà chua và thịt bò băm. Mì Ý là món ăn ngon từ nước Ý!",
  // Desserts
  kem: "Kem lạnh ngọt, có nhiều hương vị. Mùa hè ăn kem mát lịm, ai cũng thích!",
  banh_ngot: "Bánh ngọt mềm xốp, phủ kem bên trên. Bánh sinh nhật là loại bánh ngọt đặc biệt!",
  nuoc_cam: "Nước cam tươi mát, giàu vitamin Xê. Uống nước cam giúp pé khỏe mạnh!",
  sua_chua: "Sữa chua mát lạnh, vị chua ngọt dễ ăn. Sữa chua tốt cho hệ tiêu hóa!",
  banh_vong: "Bánh vòng tròn xinh có phủ đường. Bánh vòng còn gọi là donut, rất ngon!",
  banh_quy: "Bánh qui giòn tan, có nhiều hình dáng đáng yêu. Ăn bánh qui kèm sữa rất ngon!",
  trai_cay: "Trái cây tươi có nhiều vitamin. Ăn nhiều trái cây giúp pé da đẹp và khỏe mạnh!",
};
