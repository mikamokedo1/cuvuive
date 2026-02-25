import { StaticImageData } from "next/image";

// Import group logos
import LogoGroup1 from "@/assets/games/learn-food/group1.webp";
import LogoGroup2 from "@/assets/games/learn-food/group2.webp";
import LogoGroup3 from "@/assets/games/learn-food/group3.webp";

// Import Breakfast Items (Group 1)
import BanhMi from "@/assets/games/learn-food/banh_mi.webp";
import Pho from "@/assets/games/learn-food/pho.webp";
import TrungOpLa from "@/assets/games/learn-food/trung_op_la.webp";
import SuaTuoi from "@/assets/games/learn-food/sua_tuoi.webp";
import NguCoc from "@/assets/games/learn-food/ngu_coc.webp";
import XucXich from "@/assets/games/learn-food/xuc_xich.webp";

// Import Main Dishes (Group 2)
import ComTrang from "@/assets/games/learn-food/com_trang.webp";
import Canh from "@/assets/games/learn-food/canh.webp";
import GaRan from "@/assets/games/learn-food/ga_ran.webp";
import Pizza from "@/assets/games/learn-food/pizza.webp";
import Hamburger from "@/assets/games/learn-food/hamburger.webp";
import MiY from "@/assets/games/learn-food/mi_y.webp";

// Import Desserts (Group 3)
import Kem from "@/assets/games/learn-food/kem.webp";
import BanhNgot from "@/assets/games/learn-food/banh_ngot.webp";
import NuocCam from "@/assets/games/learn-food/nuoc_cam.webp";
import SuaChua from "@/assets/games/learn-food/sua_chua.webp";
import BanhVong from "@/assets/games/learn-food/banh_vong.webp";
import BanhQuy from "@/assets/games/learn-food/banh_quy.webp";
import Traicay from "@/assets/games/learn-food/trai_cay.webp";

export type FoodCategory = "breakfast" | "main_dish" | "dessert";

export interface FoodData {
  id: string;
  name: string;
  image: StaticImageData;
  category: FoodCategory;
}

export const FOODS: FoodData[] = [
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

export function getFoodsForGroup(groupId: string): FoodData[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return FOODS.filter((food) => group.foods.includes(food.id));
}

export function getAllFoods(): FoodData[] {
  return FOODS;
}
