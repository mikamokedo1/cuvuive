import { StaticImageData } from "next/image";

// Import group logos
import LogoGroup1 from "@/assets/games/learn-food/group1.png";
import LogoGroup2 from "@/assets/games/learn-food/group2.png";
import LogoGroup3 from "@/assets/games/learn-food/group3.png";

// Import Breakfast Items (Group 1)
import BanhMi from "@/assets/games/learn-food/banh_mi.png";
import Pho from "@/assets/games/learn-food/pho.png";
import TrungOpLa from "@/assets/games/learn-food/trung_op_la.png";
import SuaTuoi from "@/assets/games/learn-food/sua_tuoi.png";
import NguCoc from "@/assets/games/learn-food/ngu_coc.png";
import XucXich from "@/assets/games/learn-food/xuc_xich.png";

// Import Main Dishes (Group 2)
import ComTrang from "@/assets/games/learn-food/com_trang.png";
import Canh from "@/assets/games/learn-food/canh.png";
import GaRan from "@/assets/games/learn-food/ga_ran.png";
import Pizza from "@/assets/games/learn-food/pizza.png";
import Hamburger from "@/assets/games/learn-food/hamburger.png";
import MiY from "@/assets/games/learn-food/mi_y.png";

// Import Desserts (Group 3)
import Kem from "@/assets/games/learn-food/kem.png";
import BanhNgot from "@/assets/games/learn-food/banh_ngot.png";
import NuocCam from "@/assets/games/learn-food/nuoc_cam.png";
import SuaChua from "@/assets/games/learn-food/sua_chua.png";
import BanhVong from "@/assets/games/learn-food/banh_vong.png";
import BanhQuy from "@/assets/games/learn-food/banh_quy.png";

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
  { id: "pizza", name: "Pizza", image: Pizza, category: "main_dish" },
  { id: "hamburger", name: "Hamburger", image: Hamburger, category: "main_dish" },
  { id: "mi_y", name: "Mì Ý", image: MiY, category: "main_dish" },

  // Desserts (Group 3)
  { id: "kem", name: "Kem", image: Kem, category: "dessert" },
  { id: "banh_ngot", name: "Bánh ngọt", image: BanhNgot, category: "dessert" },
  { id: "nuoc_cam", name: "Nước cam", image: NuocCam, category: "dessert" },
  { id: "sua_chua", name: "Sữa chua", image: SuaChua, category: "dessert" },
  { id: "banh_vong", name: "Bánh vòng", image: BanhVong, category: "dessert" },
  { id: "banh_quy", name: "Bánh quy", image: BanhQuy, category: "dessert" },
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
    foods: ["kem", "banh_ngot", "nuoc_cam", "sua_chua", "banh_vong", "banh_quy"],
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
