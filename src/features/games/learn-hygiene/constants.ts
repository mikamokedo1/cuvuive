import { StaticImageData } from "next/image";

// Import group logos
const LogoGroup1 = "https://assets.cuthongminh.com/games/learn-hygiene/group1.webp";
const LogoGroup2 = "https://assets.cuthongminh.com/games/learn-hygiene/group2.webp";
const LogoGroup3 = "https://assets.cuthongminh.com/games/learn-hygiene/group3.webp";

// Import Daily Hygiene (Group 1)
const BrushTeeth = "https://assets.cuthongminh.com/games/learn-hygiene/brush-teeth.webp";
const WashHands = "https://assets.cuthongminh.com/games/learn-hygiene/wash-hands.webp";
const WashFace = "https://assets.cuthongminh.com/games/learn-hygiene/wash-face.webp";
const TakeBath = "https://assets.cuthongminh.com/games/learn-hygiene/take-bath.webp";
const BrushHair = "https://assets.cuthongminh.com/games/learn-hygiene/brush-hair.webp";
const TrimNails = "https://assets.cuthongminh.com/games/learn-hygiene/trim-nails.webp";

// Import Staying Healthy (Group 2)
const DrinkWater = "https://assets.cuthongminh.com/games/learn-hygiene/drink-water.webp";
const EatVegetables = "https://assets.cuthongminh.com/games/learn-hygiene/eat-vegetables.webp";
const SleepOnTime = "https://assets.cuthongminh.com/games/learn-hygiene/sleep-on-time.webp";
const WashFruit = "https://assets.cuthongminh.com/games/learn-hygiene/wash-fruit.webp";
const CoverMouth = "https://assets.cuthongminh.com/games/learn-hygiene/cover-mouth.webp";
const WearMask = "https://assets.cuthongminh.com/games/learn-hygiene/wear-mask.webp";

// Import Clean & Tidy (Group 3)
const FoldClothes = "https://assets.cuthongminh.com/games/learn-hygiene/fold-clothes.webp";
const TidyToys = "https://assets.cuthongminh.com/games/learn-hygiene/tidy-toys.webp";
const MessedToys = "https://assets.cuthongminh.com/games/learn-hygiene/messed_toy.webp";
const DirtyClothes = "https://assets.cuthongminh.com/games/learn-hygiene/dirty_clothes.webp";
const ThrowTrashWrong = "https://assets.cuthongminh.com/games/learn-hygiene/throw-trash-wrong.webp";
const ThrowTrash = "https://assets.cuthongminh.com/games/learn-hygiene/throw-trash.webp";
const WipeTable = "https://assets.cuthongminh.com/games/learn-hygiene/wipe-table.webp";
const WearShoes = "https://assets.cuthongminh.com/games/learn-hygiene/wear-shoes.webp";
const CleanClothes = "https://assets.cuthongminh.com/games/learn-hygiene/clean-clothes.webp";

// lesson 3
const dontBath = "https://assets.cuthongminh.com/games/learn-hygiene/dont_bath.webp";
const compettionTollBrush = "https://assets.cuthongminh.com/games/learn-hygiene/compettion-toothbrush.webp";
const washHandsWC = "https://assets.cuthongminh.com/games/learn-hygiene/wash_hands_wc.webp";
const playPhoneLate = "https://assets.cuthongminh.com/games/learn-hygiene/play_phone_late.webp";
const eatCandy = "https://assets.cuthongminh.com/games/learn-hygiene/eat_candy.webp";

// lesson 4 - sequence images
const SeqBrushTeeth1 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_brush_teeth_1.webp";
const SeqBrushTeeth2 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_brush_teeth_2.webp";
const SeqBrushTeeth3 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_brush_teeth_3.webp";
const SeqBrushTeeth4 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_brush_teeth_4.webp";

const SeqWashHands1 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_wash_hands_1.webp";
const SeqWashHands2 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_wash_hands_2.webp";
const SeqWashHands3 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_wash_hands_3.webp";
const SeqWashHands4 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_wash_hands_4.webp";

const SeqTakeBath1 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_take_bath_1.webp";
const SeqTakeBath2 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_take_bath_2.webp";
const SeqTakeBath3 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_take_bath_3.webp";
const SeqTakeBath4 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_take_bath_4.webp";

const SeqWashFruit1 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_wash_fruit_1.webp";
const SeqWashFruit2 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_wash_fruit_2.webp";
const SeqWashFruit3 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_wash_fruit_3.webp";
const SeqWashFruit4 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_wash_fruit_4.webp";

const SeqCoverMouth1 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_cover_mouth_1.webp";
const SeqCoverMouth2 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_cover_mouth_2.webp";
const SeqCoverMouth3 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_cover_mouth_3.webp";
const SeqCoverMouth4 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_cover_mouth_4.webp";

const SeqWearMask1 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_wear_mask_1.webp";
const SeqWearMask2 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_wear_mask_2.webp";
const SeqWearMask3 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_wear_mask_3.webp";
const SeqWearMask4 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_wear_mask_4.webp";

const SeqFoldClothes1 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_fold_clothes_1.webp";
const SeqFoldClothes2 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_fold_clothes_2.webp";
const SeqFoldClothes3 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_fold_clothes_3.webp";
const SeqFoldClothes4 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_fold_clothes_4.webp";

const SeqThrowTrash1 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_throw_trash_1.webp";
const SeqThrowTrash2 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_throw_trash_2.webp";
const SeqThrowTrash3 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_throw_trash_3.webp";
const SeqThrowTrash4 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_throw_trash_4.webp";

const SeqTidyToys1 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_tidy_toys_1.webp";
const SeqTidyToys2 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_tidy_toys_2.webp";
const SeqTidyToys3 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_tidy_toys_3.webp";
const SeqTidyToys4 = "https://assets.cuthongminh.com/games/learn-hygiene/seq_tidy_toys_4.webp";

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

// ──── Hygiene Descriptions (for explore lesson) ────
export const HYGIENE_DESCRIPTIONS: Record<string, string> = {
  // Daily
  brush_teeth: "Đánh răng sáng và tối giúp răng sạch sẽ, không bị sâu. Nhớ đánh ít nhất 2 phút nhé!",
  wash_hands: "Rửa tay bằng xà phòng trước khi ăn và sau khi chơi. Rửa tay giúp diệt vi trùng!",
  wash_face: "Rửa mặt mỗi sáng giúp mặt sạch sẽ và tươi tắn. Dùng nước mát rửa mặt thật sảng khoái!",
  take_bath: "Tắm mỗi ngày giúp cơ thể sạch sẽ và thơm tho. Tắm xong pé thấy mát mẻ lắm!",
  brush_hair: "Chải tóc gọn gàng trước khi đi học. Tóc sạch đẹp giúp pé trông tự tin hơn!",
  trim_nails: "Cắt móng tay thường xuyên để giữ sạch sẽ. Móng tay dài dễ bị bẩn và gãy!",
  // Healthy
  drink_water: "Uống đủ nước mỗi ngày giúp cơ thể khỏe mạnh. Nước giúp pé tỉnh táo và vui vẻ!",
  eat_vegetables: "Ăn rau củ giúp pé khỏe mạnh và thông minh. Rau xanh có rất nhiều vitamin!",
  sleep_on_time: "Ngủ đúng giờ giúp pé lớn nhanh và học giỏi. Pé nên ngủ trước 9 giờ tối!",
  wash_fruit: "Rửa trái cây trước khi ăn để loại bỏ bụi bẩn. Trái cây sạch ăn mới an toàn!",
  cover_mouth: "Che miệng khi ho hoặc hắt hơi để không lây bệnh cho người khác. Đây là thói quen tốt!",
  wear_mask: "Đeo khẩu trang nơi đông người để bảo vệ sức khỏe. Khẩu trang ngăn vi trùng xâm nhập!",
  // Tidy
  fold_clothes: "Gấp quần áo gọn gàng cất vào tủ. Quần áo gấp đẹp dễ tìm khi cần mặc!",
  tidy_toys: "Dọn đồ chơi sau khi chơi xong. Phòng gọn gàng trông sạch đẹp hơn!",
  throw_trash: "Bỏ rác đúng nơi quy định. Giữ sạch môi trường là bảo vệ trái đất!",
  wipe_table: "Lau bàn sạch sẽ trước và sau khi ăn. Bàn sạch giúp bữa ăn ngon hơn!",
  wear_shoes: "Đi giày dép khi ra ngoài để bảo vệ chân. Đi chân trần dễ bị đau và bẩn!",
  clean_clothes: "Mặc quần áo sạch mỗi ngày. Quần áo sạch giúp pé thơm tho và tự tin!",
};

// ============ RIGHT OR WRONG SCENARIOS ============

export interface RightWrongScenario {
  id: string;
  text: string;
  image: string | StaticImageData;
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
  stepImages?: Array<string | import("next/image").StaticImageData>;
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
    steps: ["Lấy khẩu trang", "Đeo lên mặt", "Móc dây tai", "Che kín mũi miệng"],
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
