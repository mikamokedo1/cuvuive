import { StaticImageData } from "next/image";

// Import group logos
import LogoGroup1 from "@/assets/games/learn-hygiene/group1.png";
import LogoGroup2 from "@/assets/games/learn-hygiene/group2.png";
import LogoGroup3 from "@/assets/games/learn-hygiene/group3.png";

// Import Daily Hygiene (Group 1)
import BrushTeeth from "@/assets/games/learn-hygiene/brush-teeth.png";
import WashHands from "@/assets/games/learn-hygiene/wash-hands.png";
import WashFace from "@/assets/games/learn-hygiene/wash-face.png";
import TakeBath from "@/assets/games/learn-hygiene/take-bath.png";
import BrushHair from "@/assets/games/learn-hygiene/brush-hair.png";
import TrimNails from "@/assets/games/learn-hygiene/trim-nails.png";

// Import Staying Healthy (Group 2)
import DrinkWater from "@/assets/games/learn-hygiene/drink-water.png";
import EatVegetables from "@/assets/games/learn-hygiene/eat-vegetables.png";
import SleepOnTime from "@/assets/games/learn-hygiene/sleep-on-time.png";
import WashFruit from "@/assets/games/learn-hygiene/wash-fruit.png";
import CoverMouth from "@/assets/games/learn-hygiene/cover-mouth.png";
import WearMask from "@/assets/games/learn-hygiene/wear-mask.png";

// Import Clean & Tidy (Group 3)
import FoldClothes from "@/assets/games/learn-hygiene/fold-clothes.png";
import TidyToys from "@/assets/games/learn-hygiene/tidy-toys.png";
import MessedToys from "@/assets/games/learn-hygiene/messed_toy.webp";
import DirtyClothes from "@/assets/games/learn-hygiene/dirty_clothes.webp";
import ThrowTrashWrong from "@/assets/games/learn-hygiene/throw-trash-wrong.webp";
import ThrowTrash from "@/assets/games/learn-hygiene/throw-trash.png";
import WipeTable from "@/assets/games/learn-hygiene/wipe-table.png";
import WearShoes from "@/assets/games/learn-hygiene/wear-shoes.png";
import CleanClothes from "@/assets/games/learn-hygiene/clean-clothes.png";

// lesson 3
import dontBath from "@/assets/games/learn-hygiene/dont_bath.png";
import compettionTollBrush from "@/assets/games/learn-hygiene/compettion-toothbrush.png";
import washHandsWC from "@/assets/games/learn-hygiene/wash_hands_wc.png";
import playPhoneLate from "@/assets/games/learn-hygiene/play_phone_late.png";
import eatCandy from "@/assets/games/learn-hygiene/eat_candy.png";

// lesson 4 - sequence images
import SeqBrushTeeth1 from "@/assets/games/learn-hygiene/seq_brush_teeth_1.png";
import SeqBrushTeeth2 from "@/assets/games/learn-hygiene/seq_brush_teeth_2.png";
import SeqBrushTeeth3 from "@/assets/games/learn-hygiene/seq_brush_teeth_3.png";
import SeqBrushTeeth4 from "@/assets/games/learn-hygiene/seq_brush_teeth_4.png";

import SeqWashHands1 from "@/assets/games/learn-hygiene/seq_wash_hands_1.png";
import SeqWashHands2 from "@/assets/games/learn-hygiene/seq_wash_hands_2.png";
import SeqWashHands3 from "@/assets/games/learn-hygiene/seq_wash_hands_3.png";
import SeqWashHands4 from "@/assets/games/learn-hygiene/seq_wash_hands_4.png";

import SeqTakeBath1 from "@/assets/games/learn-hygiene/seq_take_bath_1.png";
import SeqTakeBath2 from "@/assets/games/learn-hygiene/seq_take_bath_2.png";
import SeqTakeBath3 from "@/assets/games/learn-hygiene/seq_take_bath_3.png";
import SeqTakeBath4 from "@/assets/games/learn-hygiene/seq_take_bath_4.png";

import SeqWashFruit1 from "@/assets/games/learn-hygiene/seq_wash_fruit_1.webp";
import SeqWashFruit2 from "@/assets/games/learn-hygiene/seq_wash_fruit_2.webp";
import SeqWashFruit3 from "@/assets/games/learn-hygiene/seq_wash_fruit_3.webp";
import SeqWashFruit4 from "@/assets/games/learn-hygiene/seq_wash_fruit_4.webp";

import SeqCoverMouth1 from "@/assets/games/learn-hygiene/seq_cover_mouth_1.webp";
import SeqCoverMouth2 from "@/assets/games/learn-hygiene/seq_cover_mouth_2.webp";
import SeqCoverMouth3 from "@/assets/games/learn-hygiene/seq_cover_mouth_3.webp";
import SeqCoverMouth4 from "@/assets/games/learn-hygiene/seq_cover_mouth_4.webp";

import SeqWearMask1 from "@/assets/games/learn-hygiene/seq_wear_mask_1.webp";
import SeqWearMask2 from "@/assets/games/learn-hygiene/seq_wear_mask_2.webp";
import SeqWearMask3 from "@/assets/games/learn-hygiene/seq_wear_mask_3.webp";
import SeqWearMask4 from "@/assets/games/learn-hygiene/seq_wear_mask_4.webp";

import SeqFoldClothes1 from "@/assets/games/learn-hygiene/seq_fold_clothes_1.webp";
import SeqFoldClothes2 from "@/assets/games/learn-hygiene/seq_fold_clothes_2.webp";
import SeqFoldClothes3 from "@/assets/games/learn-hygiene/seq_fold_clothes_3.webp";
import SeqFoldClothes4 from "@/assets/games/learn-hygiene/seq_fold_clothes_4.webp";

import SeqThrowTrash1 from "@/assets/games/learn-hygiene/seq_throw_trash_1.png";
import SeqThrowTrash2 from "@/assets/games/learn-hygiene/seq_throw_trash_2.png";
import SeqThrowTrash3 from "@/assets/games/learn-hygiene/seq_throw_trash_3.png";
import SeqThrowTrash4 from "@/assets/games/learn-hygiene/seq_throw_trash_4.png";

import SeqTidyToys1 from "@/assets/games/learn-hygiene/seq_tidy_toys_1.webp";
import SeqTidyToys2 from "@/assets/games/learn-hygiene/seq_tidy_toys_2.webp";
import SeqTidyToys3 from "@/assets/games/learn-hygiene/seq_tidy_toys_3.webp";
import SeqTidyToys4 from "@/assets/games/learn-hygiene/seq_tidy_toys_4.webp";

import { EntityData } from "@/types/game";

export const HYGIENE_ITEMS: EntityData[] = [
  // Daily Hygiene (Group 1)
  { id: "brush_teeth", name: "Đánh Răng", image: BrushTeeth, category: "daily" },
  { id: "wash_hands", name: "Rửa Tay", image: WashHands, category: "daily" },
  { id: "wash_face", name: "Rửa Mặt", image: WashFace, category: "daily" },
  { id: "take_bath", name: "Tắm", image: TakeBath, category: "daily" },
  { id: "brush_hair", name: "Chải Tóc", image: BrushHair, category: "daily" },
  { id: "trim_nails", name: "Cắt Móng Tay", image: TrimNails, category: "daily" },

  // Staying Healthy (Group 2)
  { id: "drink_water", name: "Uống Nước", image: DrinkWater, category: "healthy" },
  { id: "eat_vegetables", name: "Ăn Rau Củ", image: EatVegetables, category: "healthy" },
  { id: "sleep_on_time", name: "Ngủ Đúng Giờ", image: SleepOnTime, category: "healthy" },
  { id: "wash_fruit", name: "Rửa Trái Cây", image: WashFruit, category: "healthy" },
  { id: "cover_mouth", name: "Che Miệng Khi Ho", image: CoverMouth, category: "healthy" },
  { id: "wear_mask", name: "Đeo Khẩu Trang", image: WearMask, category: "healthy" },

  // Clean & Tidy (Group 3)
  { id: "fold_clothes", name: "Gấp Quần Áo", image: FoldClothes, category: "tidy" },
  { id: "tidy_toys", name: "Dọn Đồ Chơi", image: TidyToys, category: "tidy" },
  { id: "throw_trash", name: "Bỏ Rác Đúng Nơi", image: ThrowTrash, category: "tidy" },
  { id: "wipe_table", name: "Lau Bàn", image: WipeTable, category: "tidy" },
  { id: "wear_shoes", name: "Đi Giày Dép", image: WearShoes, category: "tidy" },
  { id: "clean_clothes", name: "Mặc Quần Áo Sạch", image: CleanClothes, category: "tidy" },
];

export const GROUPS = [
  {
    id: "group1",
    title: "Vệ sinh hàng ngày",
    description: "Học các thói quen vệ sinh hàng ngày",
    items: ["brush_teeth", "wash_hands", "wash_face", "take_bath", "brush_hair", "trim_nails"],
    logo: LogoGroup1,
    variant: "green" as const,
  },
  {
    id: "group2",
    title: "Giữ gìn sức khoẻ",
    description: "Học cách giữ gìn sức khoẻ",
    items: ["drink_water", "eat_vegetables", "sleep_on_time", "wash_fruit", "cover_mouth", "wear_mask"],
    logo: LogoGroup2,
    variant: "orange" as const,
  },
  {
    id: "group3",
    title: "Sạch sẽ gọn gàng",
    description: "Học cách giữ gìn sạch sẽ gọn gàng",
    items: ["fold_clothes", "tidy_toys", "throw_trash", "wipe_table", "wear_shoes", "clean_clothes"],
    logo: LogoGroup3,
    variant: "blue" as const,
  },
];

// Helper to get items for a specific group
export function getHygieneForGroup(groupId: string): EntityData[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return HYGIENE_ITEMS.filter((item) => group.items.includes(item.id));
}

// ============ RIGHT OR WRONG SCENARIOS ============

export interface RightWrongScenario {
  id: string;
  text: string;
  image: StaticImageData;
  isCorrect: boolean;
  category: string;
}

export const RIGHT_WRONG_SCENARIOS: RightWrongScenario[] = [
  // Group 1 — Vệ sinh hàng ngày
  { id: "rw_daily_1", text: "Pé đánh răng mỗi sáng và tối", image: BrushTeeth, isCorrect: true, category: "daily" },
  { id: "rw_daily_2", text: "Pé rửa tay trước khi ăn", image: WashHands, isCorrect: true, category: "daily" },
  {
    id: "rw_daily_3",
    text: "Pé chải tóc gọn gàng trước khi đi học",
    image: BrushHair,
    isCorrect: true,
    category: "daily",
  },
  {
    id: "rw_daily_4",
    text: "Pé không rửa tay sau khi đi vệ sinh",
    image: washHandsWC,
    isCorrect: false,
    category: "daily",
  },
  {
    id: "rw_daily_5",
    text: "Pé dùng chung bàn chải đánh răng với bạn",
    image: compettionTollBrush,
    isCorrect: false,
    category: "daily",
  },
  { id: "rw_daily_6", text: "Pé ba ngày mới tắm một lần", image: dontBath, isCorrect: false, category: "daily" },

  // Group 2 — Giữ gìn sức khoẻ
  { id: "rw_healthy_1", text: "Pé uống nhiều nước mỗi ngày", image: DrinkWater, isCorrect: true, category: "healthy" },
  {
    id: "rw_healthy_2",
    text: "Pé ăn rau củ trong bữa cơm",
    image: EatVegetables,
    isCorrect: true,
    category: "healthy",
  },
  { id: "rw_healthy_3", text: "Pé rửa trái cây trước khi ăn", image: WashFruit, isCorrect: true, category: "healthy" },
  {
    id: "rw_healthy_4",
    text: "Pé thức khuya chơi điện thoại",
    image: playPhoneLate,
    isCorrect: false,
    category: "healthy",
  },
  { id: "rw_healthy_5", text: "Pé ho mà không che miệng", image: CoverMouth, isCorrect: false, category: "healthy" },
  { id: "rw_healthy_6", text: "Pé ăn kẹo thay cơm", image: eatCandy, isCorrect: false, category: "healthy" },

  // Group 3 — Sạch sẽ gọn gàng
  { id: "rw_tidy_1", text: "Pé gấp quần áo sau khi phơi khô", image: FoldClothes, isCorrect: true, category: "tidy" },
  { id: "rw_tidy_2", text: "Pé bỏ rác vào thùng rác", image: ThrowTrash, isCorrect: true, category: "tidy" },
  { id: "rw_tidy_3", text: "Pé dọn đồ chơi sau khi chơi xong", image: TidyToys, isCorrect: true, category: "tidy" },
  { id: "rw_tidy_4", text: "Pé vứt rác xuống sàn nhà", image: ThrowTrashWrong, isCorrect: false, category: "tidy" },
  { id: "rw_tidy_5", text: "Pé mặc quần áo bẩn đi chơi", image: DirtyClothes, isCorrect: false, category: "tidy" },
  { id: "rw_tidy_6", text: "Pé để đồ chơi bừa bãi khắp nơi", image: MessedToys, isCorrect: false, category: "tidy" },
];

// Get scenarios for a specific group
export function getScenariosForGroup(groupId: string): RightWrongScenario[] {
  const categoryMap: Record<string, string> = {
    group1: "daily",
    group2: "healthy",
    group3: "tidy",
  };
  const category = categoryMap[groupId];
  if (!category) return [];
  return RIGHT_WRONG_SCENARIOS.filter((s) => s.category === category);
}

// ============ SEQUENCING DATA ============

export interface SequenceActivity {
  id: string;
  title: string;
  steps: string[];
  stepImages?: import("next/image").StaticImageData[];
  category: string;
}

export const SEQUENCE_ACTIVITIES: SequenceActivity[] = [
  // Group 1 — Vệ sinh hàng ngày
  {
    id: "seq_brush_teeth",
    title: "Đánh răng",
    steps: ["Lấy bàn chải", "Bôi kem đánh răng", "Đánh răng", "Súc miệng"],
    stepImages: [SeqBrushTeeth1, SeqBrushTeeth2, SeqBrushTeeth3, SeqBrushTeeth4],
    category: "daily",
  },
  {
    id: "seq_wash_hands",
    title: "Rửa tay",
    steps: ["Mở vòi nước", "Xát xà phòng", "Chà tay", "Rửa sạch"],
    stepImages: [SeqWashHands1, SeqWashHands2, SeqWashHands3, SeqWashHands4],
    category: "daily",
  },
  {
    id: "seq_take_bath",
    title: "Tắm",
    steps: ["Cởi quần áo", "Xả nước", "Kỳ cọ", "Rửa sạch"],
    stepImages: [SeqTakeBath1, SeqTakeBath2, SeqTakeBath3, SeqTakeBath4],
    category: "daily",
  },

  // Group 2 — Giữ gìn sức khoẻ
  {
    id: "seq_wash_fruit",
    title: "Rửa trái cây",
    steps: ["Lấy trái cây", "Mở vòi nước", "Rửa sạch", "Lau khô"],
    stepImages: [SeqWashFruit1, SeqWashFruit2, SeqWashFruit3, SeqWashFruit4],
    category: "healthy",
  },
  {
    id: "seq_cover_mouth",
    title: "Che miệng khi ho",
    steps: ["Cảm thấy muốn ho", "Lấy tay che miệng", "Ho", "Rửa tay"],
    stepImages: [SeqCoverMouth1, SeqCoverMouth2, SeqCoverMouth3, SeqCoverMouth4],
    category: "healthy",
  },
  {
    id: "seq_wear_mask",
    title: "Đeo khẩu trang",
    steps: ["Lấy khẩu trang", "Đeo lên mặt", "Che kín mũi miệng", "Móc dây tai"],
    stepImages: [SeqWearMask1, SeqWearMask2, SeqWearMask3, SeqWearMask4],
    category: "healthy",
  },

  // Group 3 — Sạch sẽ gọn gàng
  {
    id: "seq_fold_clothes",
    title: "Gấp quần áo",
    steps: ["Lấy quần áo", "Trải phẳng", "Gấp đôi", "Cất vào tủ"],
    stepImages: [SeqFoldClothes1, SeqFoldClothes2, SeqFoldClothes3, SeqFoldClothes4],
    category: "tidy",
  },
  {
    id: "seq_throw_trash",
    title: "Bỏ rác đúng nơi",
    steps: ["Cầm rác", "Tìm thùng rác", "Bỏ rác vào thùng", "Rửa tay"],
    stepImages: [SeqThrowTrash1, SeqThrowTrash2, SeqThrowTrash3, SeqThrowTrash4],
    category: "tidy",
  },
  {
    id: "seq_tidy_toys",
    title: "Dọn đồ chơi",
    steps: ["Nhặt đồ chơi", "Phân loại đồ", "Cất vào hộp", "Lau sàn"],
    stepImages: [SeqTidyToys1, SeqTidyToys2, SeqTidyToys3, SeqTidyToys4],
    category: "tidy",
  },
];

// Get sequence activities for a specific group
export function getSequencesForGroup(groupId: string): SequenceActivity[] {
  const categoryMap: Record<string, string> = {
    group1: "daily",
    group2: "healthy",
    group3: "tidy",
  };
  const category = categoryMap[groupId];
  if (!category) return [];
  return SEQUENCE_ACTIVITIES.filter((s) => s.category === category);
}
