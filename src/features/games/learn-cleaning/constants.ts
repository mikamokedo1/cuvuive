import { StaticImageData } from "next/image";

// Group logos
const LogoGroup1 = "https://assets.cuthongminh.com/games/learn-cleaning/group1.webp";
const LogoGroup2 = "https://assets.cuthongminh.com/games/learn-cleaning/group2.webp";
const LogoGroup3 = "https://assets.cuthongminh.com/games/learn-cleaning/group3.webp";

// Dọn Phòng (Group 1)
const TidyBed = "https://assets.cuthongminh.com/games/learn-cleaning/tidy-bed.webp";
const SweepFloor = "https://assets.cuthongminh.com/games/learn-cleaning/sweep-floor.webp";
const TidyToys = "https://assets.cuthongminh.com/games/learn-cleaning/tidy-toys.webp";
const FoldBlanket = "https://assets.cuthongminh.com/games/learn-cleaning/fold-blanket.webp";
const ArrangeBooks = "https://assets.cuthongminh.com/games/learn-cleaning/arrange-books.webp";
const WipeWindow = "https://assets.cuthongminh.com/games/learn-cleaning/wipe-window.webp";

// Dọn Bếp (Group 2)
const WashDishes = "https://assets.cuthongminh.com/games/learn-cleaning/wash-dishes.webp";
const WipeTable = "https://assets.cuthongminh.com/games/learn-cleaning/wipe-table.webp";
const SweepKitchen = "https://assets.cuthongminh.com/games/learn-cleaning/sweep-kitchen.webp";
const ArrangeUtensils = "https://assets.cuthongminh.com/games/learn-cleaning/arrange-utensils.webp";
const CleanSink = "https://assets.cuthongminh.com/games/learn-cleaning/clean-sink.webp";
const CoverFood = "https://assets.cuthongminh.com/games/learn-cleaning/cover-food.webp";

// Phân Loại Rác (Group 3)
const RecyclePaper = "https://assets.cuthongminh.com/games/learn-cleaning/recycle-paper.webp";
const RecyclePlastic = "https://assets.cuthongminh.com/games/learn-cleaning/recycle-plastic.webp";
const OrganicTrash = "https://assets.cuthongminh.com/games/learn-cleaning/organic-trash.webp";
const ThrowTrashCorrect = "https://assets.cuthongminh.com/games/learn-cleaning/throw-trash-correct.webp";
const SortTrash = "https://assets.cuthongminh.com/games/learn-cleaning/sort-trash.webp";
const CleanEnvironment = "https://assets.cuthongminh.com/games/learn-cleaning/clean-environment.webp";

// Lesson 3 - Right/Wrong images
const MessyRoom = "https://assets.cuthongminh.com/games/learn-cleaning/messy-room.webp";
const TrashOnFloor = "https://assets.cuthongminh.com/games/learn-cleaning/trash-on-floor.webp";
const DirtyDishes = "https://assets.cuthongminh.com/games/learn-cleaning/dirty-dishes.webp";
const MixedTrash = "https://assets.cuthongminh.com/games/learn-cleaning/mixed-trash.webp";
const LitterOutside = "https://assets.cuthongminh.com/games/learn-cleaning/litter-outside.webp";

// Lesson 4 - Sequence images
const SeqTidyBed1 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_tidy_bed_1.webp";
const SeqTidyBed2 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_tidy_bed_2.webp";
const SeqTidyBed3 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_tidy_bed_3.webp";
const SeqTidyBed4 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_tidy_bed_4.webp";

const SeqSweepFloor1 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_sweep_floor_1.webp";
const SeqSweepFloor2 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_sweep_floor_2.webp";
const SeqSweepFloor3 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_sweep_floor_3.webp";
const SeqSweepFloor4 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_sweep_floor_4.webp";

const SeqTidyToys1 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_tidy_toys_1.webp";
const SeqTidyToys2 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_tidy_toys_2.webp";
const SeqTidyToys3 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_tidy_toys_3.webp";
const SeqTidyToys4 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_tidy_toys_4.webp";

const SeqWashDishes1 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_wash_dishes_1.webp";
const SeqWashDishes2 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_wash_dishes_2.webp";
const SeqWashDishes3 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_wash_dishes_3.webp";
const SeqWashDishes4 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_wash_dishes_4.webp";

const SeqWipeTable1 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_wipe_table_1.webp";
const SeqWipeTable2 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_wipe_table_2.webp";
const SeqWipeTable3 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_wipe_table_3.webp";
const SeqWipeTable4 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_wipe_table_4.webp";

const SeqSweepKitchen1 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_sweep_kitchen_1.webp";
const SeqSweepKitchen2 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_sweep_kitchen_2.webp";
const SeqSweepKitchen3 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_sweep_kitchen_3.webp";
const SeqSweepKitchen4 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_sweep_kitchen_4.webp";

const SeqSortTrash1 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_sort_trash_1.webp";
const SeqSortTrash2 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_sort_trash_2.webp";
const SeqSortTrash3 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_sort_trash_3.webp";
const SeqSortTrash4 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_sort_trash_4.webp";

const SeqRecyclePaper1 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_recycle_paper_1.webp";
const SeqRecyclePaper2 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_recycle_paper_2.webp";
const SeqRecyclePaper3 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_recycle_paper_3.webp";
const SeqRecyclePaper4 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_recycle_paper_4.webp";

const SeqRecyclePlastic1 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_recycle_plastic_1.webp";
const SeqRecyclePlastic2 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_recycle_plastic_2.webp";
const SeqRecyclePlastic3 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_recycle_plastic_3.webp";
const SeqRecyclePlastic4 = "https://assets.cuthongminh.com/games/learn-cleaning/seq_recycle_plastic_4.webp";

import { EntityData } from "@/types/game";

export const CLEANING_ITEMS: EntityData[] = [
  // Dọn Phòng (Group 1)
  { id: "tidy_bed", name: "Dọn Giường", image: TidyBed, category: "room" },
  { id: "sweep_floor", name: "Quét Nhà", image: SweepFloor, category: "room" },
  { id: "tidy_toys", name: "Dọn Đồ Chơi", image: TidyToys, category: "room" },
  { id: "fold_blanket", name: "Gấp Chăn Mền", image: FoldBlanket, category: "room" },
  { id: "arrange_books", name: "Xếp Sách", image: ArrangeBooks, category: "room" },
  { id: "wipe_window", name: "Lau Cửa Sổ", image: WipeWindow, category: "room" },

  // Dọn Bếp (Group 2)
  { id: "wash_dishes", name: "Rửa Chén", image: WashDishes, category: "kitchen" },
  { id: "wipe_table", name: "Lau Bàn Ăn", image: WipeTable, category: "kitchen" },
  { id: "sweep_kitchen", name: "Quét Bếp", image: SweepKitchen, category: "kitchen" },
  { id: "arrange_utensils", name: "Xếp Dụng Cụ", image: ArrangeUtensils, category: "kitchen" },
  { id: "clean_sink", name: "Rửa Bồn Rửa", image: CleanSink, category: "kitchen" },
  { id: "cover_food", name: "Đậy Thức Ăn", image: CoverFood, category: "kitchen" },

  // Phân Loại Rác (Group 3)
  { id: "recycle_paper", name: "Tái Chế Giấy", image: RecyclePaper, category: "trash" },
  { id: "recycle_plastic", name: "Tái Chế Nhựa", image: RecyclePlastic, category: "trash" },
  { id: "organic_trash", name: "Rác Hữu Cơ", image: OrganicTrash, category: "trash" },
  { id: "throw_trash_correct", name: "Bỏ Rác Đúng Nơi", image: ThrowTrashCorrect, category: "trash" },
  { id: "sort_trash", name: "Phân Loại Rác", image: SortTrash, category: "trash" },
  { id: "clean_environment", name: "Giữ Sạch Môi Trường", image: CleanEnvironment, category: "trash" },
];

export const GROUPS = [
  {
    id: "group1",
    title: "Dọn phòng",
    description: "Bé học cách dọn dẹp phòng ngủ và phòng khách",
    items: ["tidy_bed", "sweep_floor", "tidy_toys", "fold_blanket", "arrange_books", "wipe_window"],
    logo: LogoGroup1,
    variant: "green" as const,
  },
  {
    id: "group2",
    title: "Dọn bếp",
    description: "Bé học cách giữ gìn nhà bếp sạch sẽ",
    items: ["wash_dishes", "wipe_table", "sweep_kitchen", "arrange_utensils", "clean_sink", "cover_food"],
    logo: LogoGroup2,
    variant: "orange" as const,
  },
  {
    id: "group3",
    title: "Phân loại rác",
    description: "Bé học cách phân loại và xử lý rác đúng cách",
    items: ["recycle_paper", "recycle_plastic", "organic_trash", "throw_trash_correct", "sort_trash", "clean_environment"],
    logo: LogoGroup3,
    variant: "blue" as const,
  },
];

// Helper to get items for a specific group
export function getCleaningForGroup(groupId: string): EntityData[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return CLEANING_ITEMS.filter((item) => group.items.includes(item.id));
}

// ──── Cleaning Descriptions (for explore lesson) ────
export const CLEANING_DESCRIPTIONS: Record<string, string> = {
  // Dọn Phòng
  tidy_bed: "Dọn giường mỗi sáng giúp phòng ngủ gọn gàng. Gấp chăn, xếp gối thật ngay ngắn nhé!",
  sweep_floor: "Quét nhà mỗi ngày giúp sàn nhà sạch sẽ. Quét từ trong ra ngoài cho sạch hết bụi!",
  tidy_toys: "Dọn đồ chơi sau khi chơi xong. Cất đồ chơi vào hộp để phòng gọn gàng hơn!",
  fold_blanket: "Gấp chăn mền gọn gàng khi thức dậy. Chăn gấp đẹp giúp giường trông ngăn nắp!",
  arrange_books: "Xếp sách lên kệ theo thứ tự. Sách xếp gọn giúp pé dễ tìm khi cần đọc!",
  wipe_window: "Lau cửa sổ cho sạch bụi. Cửa sổ sạch giúp ánh sáng chiếu vào phòng!",
  // Dọn Bếp
  wash_dishes: "Rửa chén bát sau khi ăn xong. Chén sạch giúp bữa ăn sau ngon hơn!",
  wipe_table: "Lau bàn ăn sạch sẽ trước và sau khi ăn. Bàn sạch giúp bữa ăn vệ sinh hơn!",
  sweep_kitchen: "Quét bếp sạch sẽ sau khi nấu ăn. Bếp sạch giúp nấu ăn an toàn hơn!",
  arrange_utensils: "Xếp dụng cụ bếp gọn gàng vào đúng nơi. Dụng cụ xếp gọn dễ tìm khi cần!",
  clean_sink: "Rửa bồn rửa chén sạch sẽ. Bồn rửa sạch giúp ngăn ngừa vi khuẩn!",
  cover_food: "Đậy thức ăn khi không ăn. Đậy thức ăn giúp giữ vệ sinh và chống ruồi!",
  // Phân Loại Rác
  recycle_paper: "Giấy cũ có thể tái chế thành giấy mới. Bỏ giấy vào thùng tái chế nhé!",
  recycle_plastic: "Chai nhựa, túi nhựa có thể tái chế. Rửa sạch rồi bỏ vào thùng tái chế!",
  organic_trash: "Rác hữu cơ là vỏ trái cây, rau thừa. Rác hữu cơ có thể làm phân bón!",
  throw_trash_correct: "Bỏ rác đúng thùng rác quy định. Không vứt rác bừa bãi ra đường!",
  sort_trash: "Phân loại rác trước khi bỏ. Chia rác thành tái chế, hữu cơ và rác khác!",
  clean_environment: "Giữ sạch môi trường xung quanh. Nhặt rác khi thấy để bảo vệ trái đất!",
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
  // Group 1 — Dọn phòng
  { id: "rw_room_1", text: "Pé dọn giường mỗi sáng khi thức dậy", image: TidyBed, isCorrect: true, category: "room" },
  { id: "rw_room_2", text: "Pé quét nhà giúp mẹ", image: SweepFloor, isCorrect: true, category: "room" },
  { id: "rw_room_3", text: "Pé cất đồ chơi vào hộp sau khi chơi", image: TidyToys, isCorrect: true, category: "room" },
  { id: "rw_room_4", text: "Pé để phòng bừa bãi không dọn dẹp", image: MessyRoom, isCorrect: false, category: "room" },
  { id: "rw_room_5", text: "Pé vứt đồ chơi khắp nhà", image: MessyRoom, isCorrect: false, category: "room" },
  { id: "rw_room_6", text: "Pé không gấp chăn khi thức dậy", image: MessyRoom, isCorrect: false, category: "room" },

  // Group 2 — Dọn bếp
  { id: "rw_kitchen_1", text: "Pé rửa chén bát sau khi ăn xong", image: WashDishes, isCorrect: true, category: "kitchen" },
  { id: "rw_kitchen_2", text: "Pé lau bàn ăn sạch sẽ", image: WipeTable, isCorrect: true, category: "kitchen" },
  { id: "rw_kitchen_3", text: "Pé đậy thức ăn khi không ăn", image: CoverFood, isCorrect: true, category: "kitchen" },
  { id: "rw_kitchen_4", text: "Pé để chén bát bẩn không rửa", image: DirtyDishes, isCorrect: false, category: "kitchen" },
  { id: "rw_kitchen_5", text: "Pé vứt thức ăn thừa xuống sàn", image: TrashOnFloor, isCorrect: false, category: "kitchen" },
  { id: "rw_kitchen_6", text: "Pé không lau bàn sau khi ăn", image: DirtyDishes, isCorrect: false, category: "kitchen" },

  // Group 3 — Phân loại rác
  { id: "rw_trash_1", text: "Pé bỏ giấy cũ vào thùng tái chế", image: RecyclePaper, isCorrect: true, category: "trash" },
  { id: "rw_trash_2", text: "Pé phân loại rác trước khi bỏ", image: SortTrash, isCorrect: true, category: "trash" },
  { id: "rw_trash_3", text: "Pé nhặt rác khi thấy trên đường", image: CleanEnvironment, isCorrect: true, category: "trash" },
  { id: "rw_trash_4", text: "Pé trộn lẫn tất cả rác vào một thùng", image: MixedTrash, isCorrect: false, category: "trash" },
  { id: "rw_trash_5", text: "Pé vứt rác bừa bãi ngoài đường", image: LitterOutside, isCorrect: false, category: "trash" },
  { id: "rw_trash_6", text: "Pé không phân loại rác tái chế", image: MixedTrash, isCorrect: false, category: "trash" },
];

// Get scenarios for a specific group
export function getScenariosForGroup(groupId: string): RightWrongScenario[] {
  const categoryMap: Record<string, string> = {
    group1: "room",
    group2: "kitchen",
    group3: "trash",
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
  // Group 1 — Dọn phòng
  {
    id: "seq_tidy_bed",
    title: "Dọn giường",
    steps: ["Gấp chăn", "Xếp gối", "Trải ga giường", "Đặt gối lên"],
    stepImages: [SeqTidyBed1, SeqTidyBed2, SeqTidyBed3, SeqTidyBed4],
    category: "room",
  },
  {
    id: "seq_sweep_floor",
    title: "Quét nhà",
    steps: ["Lấy chổi", "Quét từ trong ra", "Hốt rác", "Bỏ rác vào thùng"],
    stepImages: [SeqSweepFloor1, SeqSweepFloor2, SeqSweepFloor3, SeqSweepFloor4],
    category: "room",
  },
  {
    id: "seq_tidy_toys",
    title: "Dọn đồ chơi",
    steps: ["Nhặt đồ chơi", "Phân loại đồ", "Cất vào hộp", "Lau sàn"],
    stepImages: [SeqTidyToys1, SeqTidyToys2, SeqTidyToys3, SeqTidyToys4],
    category: "room",
  },

  // Group 2 — Dọn bếp
  {
    id: "seq_wash_dishes",
    title: "Rửa chén",
    steps: ["Xếp chén vào bồn", "Xả nước và xà phòng", "Rửa sạch chén", "Úp chén cho ráo"],
    stepImages: [SeqWashDishes1, SeqWashDishes2, SeqWashDishes3, SeqWashDishes4],
    category: "kitchen",
  },
  {
    id: "seq_wipe_table",
    title: "Lau bàn ăn",
    steps: ["Lấy khăn ướt", "Lau mặt bàn", "Lau chân bàn", "Vắt khăn phơi"],
    stepImages: [SeqWipeTable1, SeqWipeTable2, SeqWipeTable3, SeqWipeTable4],
    category: "kitchen",
  },
  {
    id: "seq_sweep_kitchen",
    title: "Quét bếp",
    steps: ["Dọn đồ trên sàn", "Lấy chổi quét", "Hốt rác bếp", "Bỏ rác vào thùng"],
    stepImages: [SeqSweepKitchen1, SeqSweepKitchen2, SeqSweepKitchen3, SeqSweepKitchen4],
    category: "kitchen",
  },

  // Group 3 — Phân loại rác
  {
    id: "seq_sort_trash",
    title: "Phân loại rác",
    steps: ["Nhìn loại rác", "Chọn thùng đúng", "Bỏ rác vào thùng", "Đóng nắp thùng"],
    stepImages: [SeqSortTrash1, SeqSortTrash2, SeqSortTrash3, SeqSortTrash4],
    category: "trash",
  },
  {
    id: "seq_recycle_paper",
    title: "Tái chế giấy",
    steps: ["Gom giấy cũ", "Phân loại giấy", "Bỏ vào thùng tái chế", "Mang đi tái chế"],
    stepImages: [SeqRecyclePaper1, SeqRecyclePaper2, SeqRecyclePaper3, SeqRecyclePaper4],
    category: "trash",
  },
  {
    id: "seq_recycle_plastic",
    title: "Tái chế nhựa",
    steps: ["Gom chai nhựa", "Rửa sạch chai", "Bỏ vào thùng tái chế", "Mang đi tái chế"],
    stepImages: [SeqRecyclePlastic1, SeqRecyclePlastic2, SeqRecyclePlastic3, SeqRecyclePlastic4],
    category: "trash",
  },
];

// Get sequence activities for a specific group
export function getSequencesForGroup(groupId: string): SequenceActivity[] {
  const categoryMap: Record<string, string> = {
    group1: "room",
    group2: "kitchen",
    group3: "trash",
  };
  const category = categoryMap[groupId];
  if (!category) return [];
  return SEQUENCE_ACTIVITIES.filter((s) => s.category === category);
}
