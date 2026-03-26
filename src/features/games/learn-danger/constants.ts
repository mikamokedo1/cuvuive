import { StaticImageData } from "next/image";
import { EntityData } from "@/types/game";

// ═══════════════════════════════════════════
// IMAGES (Cloudflare R2 CDN)
// ═══════════════════════════════════════════
const CDN = "https://assets.cuthongminh.com/games/learn-danger";

// Logos
const LogoGroup1 = `${CDN}/group1.webp`;
const LogoGroup2 = `${CDN}/group2.webp`;
const LogoGroup3 = `${CDN}/group3.webp`;

// Group 1 — Trong bếp
const Knife = `${CDN}/knife.webp`;
const Scissors = `${CDN}/scissors.webp`;
const HotPot = `${CDN}/hot-pot.webp`;
const GasStove = `${CDN}/gas-stove.webp`;
const BoilingWater = `${CDN}/boiling-water.webp`;
const Lighter = `${CDN}/lighter.webp`;

// Group 2 — Phòng tắm & xung quanh
const Medicine = `${CDN}/medicine.webp`;
const SharpTool = `${CDN}/sharp-tool.webp`;
const WetFloor = `${CDN}/wet-floor.webp`;
const Balcony = `${CDN}/balcony.webp`;
const Detergent = `${CDN}/detergent.webp`;
const Razor = `${CDN}/razor.webp`;

// Group 3 — Đồ điện
const PowerSocket = `${CDN}/power-socket.webp`;
const HotIron = `${CDN}/hot-iron.webp`;
const HairDryer = `${CDN}/hair-dryer.webp`;
const ExposedWire = `${CDN}/exposed-wire.webp`;
const Fan = `${CDN}/fan.webp`;
const Microwave = `${CDN}/microwave.webp`;

// Scenario images (additional)
const KidReachStove = `${CDN}/kid-reach-stove.webp`;
const KidPlayKnife = `${CDN}/kid-play-knife.webp`;
const KidDrinkDetergent = `${CDN}/kid-drink-detergent.webp`;
const KidClimbBalcony = `${CDN}/kid-climb-balcony.webp`;
const KidTouchSocket = `${CDN}/kid-touch-socket.webp`;
const KidTouchIron = `${CDN}/kid-touch-iron.webp`;
const KidWetFloor = `${CDN}/kid-wet-floor.webp`;
const KidPlayLighter = `${CDN}/kid-play-lighter.webp`;
const KidTouchWire = `${CDN}/kid-touch-wire.webp`;

// ═══════════════════════════════════════════
// ENTITY DATA
// ═══════════════════════════════════════════

export const DANGER_ITEMS: EntityData[] = [
  // Group 1 — Trong bếp
  { id: "knife", name: "Dao", image: Knife, category: "kitchen" },
  { id: "scissors", name: "Kéo", image: Scissors, category: "kitchen" },
  { id: "hot_pot", name: "Nồi Nóng", image: HotPot, category: "kitchen" },
  { id: "gas_stove", name: "Bếp Gas", image: GasStove, category: "kitchen" },
  { id: "boiling_water", name: "Nước Sôi", image: BoilingWater, category: "kitchen" },
  { id: "lighter", name: "Bật Lửa", image: Lighter, category: "kitchen" },

  // Group 2 — Phòng tắm & xung quanh
  { id: "medicine", name: "Thuốc", image: Medicine, category: "bathroom" },
  { id: "sharp_tool", name: "Dụng Cụ Sắc Nhọn", image: SharpTool, category: "bathroom" },
  { id: "wet_floor", name: "Sàn Ướt Trơn", image: WetFloor, category: "bathroom" },
  { id: "balcony", name: "Lan Can", image: Balcony, category: "bathroom" },
  { id: "detergent", name: "Chất Tẩy Rửa", image: Detergent, category: "bathroom" },
  { id: "razor", name: "Dao Cạo", image: Razor, category: "bathroom" },

  // Group 3 — Đồ điện
  { id: "power_socket", name: "Ổ Cắm Điện", image: PowerSocket, category: "electrical" },
  { id: "hot_iron", name: "Bàn Ủi Nóng", image: HotIron, category: "electrical" },
  { id: "hair_dryer", name: "Máy Sấy Tóc", image: HairDryer, category: "electrical" },
  { id: "exposed_wire", name: "Dây Điện Hở", image: ExposedWire, category: "electrical" },
  { id: "fan", name: "Quạt Điện", image: Fan, category: "electrical" },
  { id: "microwave", name: "Lò Vi Sóng", image: Microwave, category: "electrical" },
];

// ═══════════════════════════════════════════
// GROUPS
// ═══════════════════════════════════════════

export const GROUPS = [
  {
    id: "group1",
    title: "Trong bếp",
    description: "Nhận biết đồ vật nguy hiểm trong nhà bếp",
    items: ["knife", "scissors", "hot_pot", "gas_stove", "boiling_water", "lighter"],
    logo: LogoGroup1,
    variant: "orange" as const,
  },
  {
    id: "group2",
    title: "Phòng tắm & xung quanh",
    description: "Nhận biết đồ nguy hiểm ở phòng tắm và xung quanh nhà",
    items: ["medicine", "sharp_tool", "wet_floor", "balcony", "detergent", "razor"],
    logo: LogoGroup2,
    variant: "green" as const,
  },
  {
    id: "group3",
    title: "Đồ điện",
    description: "Nhận biết thiết bị điện nguy hiểm",
    items: ["power_socket", "hot_iron", "hair_dryer", "exposed_wire", "fan", "microwave"],
    logo: LogoGroup3,
    variant: "blue" as const,
  },
];

// Helper to get items for a specific group
export function getDangerForGroup(groupId: string): EntityData[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return DANGER_ITEMS.filter((item) => group.items.includes(item.id));
}

// ═══════════════════════════════════════════
// DESCRIPTIONS (for ExploreLesson)
// ═══════════════════════════════════════════

export const DANGER_DESCRIPTIONS: Record<string, string> = {
  // Kitchen
  knife: "Dao rất sắc, có thể cắt đứt tay. Chỉ người lớn mới được dùng dao nhé pé!",
  scissors: "Kéo có lưỡi sắc nhọn. Pé không được chạy nhảy khi cầm kéo, dễ bị đâm lắm!",
  hot_pot: "Nồi đang nấu rất nóng, chạm vào bị bỏng ngay! Tránh xa bếp khi đang nấu nhé!",
  gas_stove: "Bếp gas có lửa rất nóng. Pé tuyệt đối không được tự bật bếp gas!",
  boiling_water: "Nước sôi 100 độ rất nguy hiểm. Pé bị bỏng nặng nếu nước sôi đổ vào người!",
  lighter: "Bật lửa tạo ra lửa, có thể gây cháy nhà. Pé không được nghịch bật lửa!",
  // Bathroom
  medicine: "Thuốc chỉ được uống khi bố mẹ cho. Uống nhầm thuốc rất nguy hiểm, có thể bị ngộ độc!",
  sharp_tool: "Đinh, búa, tua vít rất sắc nhọn. Pé có thể bị đâm, bị đập nếu nghịch!",
  wet_floor: "Sàn ướt rất trơn trượt. Pé có thể bị ngã đập đầu nếu chạy trên sàn ướt!",
  balcony: "Lan can ban công rất nguy hiểm. Pé tuyệt đối không leo trèo lan can nhé!",
  detergent: "Chất tẩy rửa có hóa chất độc hại. Pé không được uống hay chạm vào mắt!",
  razor: "Dao cạo rất sắc, cắt da dễ dàng. Pé không được nghịch dao cạo của bố mẹ!",
  // Electrical
  power_socket: "Ổ cắm điện có dòng điện mạnh. Pé tuyệt đối không chọc tay hay vật gì vào ổ điện!",
  hot_iron: "Bàn ủi nóng hàng trăm độ. Chạm vào sẽ bị bỏng rất nặng!",
  hair_dryer: "Máy sấy tóc nóng và có điện. Không dùng khi tay ướt, dễ bị giật điện!",
  exposed_wire: "Dây điện hở rất nguy hiểm! Chạm vào bị giật điện có thể chết! Báo người lớn ngay!",
  fan: "Cánh quạt quay rất nhanh. Pé không thò tay vào quạt đang chạy, bị cắt đứt tay!",
  microwave: "Lò vi sóng rất nóng khi hoạt động. Pé không tự bật lò và đồ lấy ra rất nóng!",
};

// ═══════════════════════════════════════════
// HOUSE EXPLORER (Adventure quiz — lesson 2)
// ═══════════════════════════════════════════

export interface AdventureStep {
  id: string;
  question: string;
  options: string[]; // entity IDs
  correctId: string;
  explanation: string;
  category: string;
}

export const HOUSE_EXPLORER_STEPS: AdventureStep[] = [
  // Group 1 — Trong bếp
  {
    id: "exp_kitchen_1",
    question: "Cú và pé vào bếp. Đồ vật nào CẮT ĐỨT TAY nếu pé cầm?",
    options: ["knife", "hot_pot", "gas_stove"],
    correctId: "knife",
    explanation: "Đúng rồi! Dao rất sắc, chỉ người lớn mới được dùng!",
    category: "kitchen",
  },
  {
    id: "exp_kitchen_3",
    question: "Vật nào Có thể tạo ra LỬA?",
    options: ["lighter", "knife", "boiling_water"],
    correctId: "lighter",
    explanation: "Chính xác! Bật lửa tạo ra lửa, gây cháy rất nguy hiểm!",
    category: "kitchen",
  },
  {
    id: "exp_kitchen_4",
    question: "Bếp nào có khí gas dễ NỔ nếu bật sai cách?",
    options: ["gas_stove", "hot_pot", "scissors"],
    correctId: "gas_stove",
    explanation: "Đúng! Bếp gas rất nguy hiểm nếu bật không đúng cách!",
    category: "kitchen",
  },
  {
    id: "exp_kitchen_5",
    question: "Cái gì đang BỐC HƠI, chạm vào sẽ bỏng?",
    options: ["boiling_water", "knife", "gas_stove"],
    correctId: "boiling_water",
    explanation: "Tuyệt vời! Nước sôi rất nóng, tránh xa nhé!",
    category: "kitchen",
  },
  {
    id: "exp_kitchen_6",
    question: "Vật nào có lưỡi SẮC NHỌN giống dao nhưng nhỏ hơn?",
    options: ["scissors", "lighter", "hot_pot"],
    correctId: "scissors",
    explanation: "Đúng rồi! Kéo sắc nhọn, không nên chạy khi cầm kéo!",
    category: "kitchen",
  },

  // Group 2 — Phòng tắm & xung quanh
  {
    id: "exp_bath_1",
    question: "Cú đi vào phòng tắm. Sàn nhà thế nào thì NGUY HIỂM?",
    options: ["wet_floor", "medicine", "balcony"],
    correctId: "wet_floor",
    explanation: "Đúng! Sàn ướt rất trơn, dễ ngã đập đầu!",
    category: "bathroom",
  },
  {
    id: "exp_bath_2",
    question: "Lọ nào trông giống nước ngọt nhưng là CHẤT ĐỘC?",
    options: ["detergent", "wet_floor", "razor"],
    correctId: "detergent",
    explanation: "Giỏi lắm! Chất tẩy rửa rất độc, không được uống!",
    category: "bathroom",
  },
  {
    id: "exp_bath_3",
    question: "Viên nào nhìn giống kẹo nhưng là rất nguy hiểm?",
    options: ["medicine", "sharp_tool", "detergent"],
    correctId: "medicine",
    explanation: "Chính xác! Thuốc không phải kẹo, chỉ uống khi bố mẹ cho!",
    category: "bathroom",
  },
  {
    id: "exp_bath_4",
    question: "Chỗ nào trong nhà pé KHÔNG ĐƯỢC LEO TRÈO?",
    options: ["balcony", "wet_floor", "medicine"],
    correctId: "balcony",
    explanation: "Đúng! Lan can ban công rất nguy hiểm, không leo!",
    category: "bathroom",
  },
  {
    id: "exp_bath_5",
    question: "Vật nào có lưỡi SẮC MỎNG dùng để cạo râu?",
    options: ["razor", "sharp_tool", "wet_floor"],
    correctId: "razor",
    explanation: "Tuyệt! Dao cạo rất sắc, cắt da dễ dàng!",
    category: "bathroom",
  },
  {
    id: "exp_bath_6",
    question: "Loại dụng cụ nào bố thường dùng SỬA ĐỒ, có đầu nhọn?",
    options: ["sharp_tool", "balcony", "medicine"],
    correctId: "sharp_tool",
    explanation: "Đúng rồi! Tua vít, búa, đinh rất sắc nhọn!",
    category: "bathroom",
  },

  // Group 3 — Đồ điện
  {
    id: "exp_elec_1",
    question: "Cú thấy những cái lỗ nhỏ trên tường. Đó là gì?",
    options: ["power_socket", "hot_iron", "fan"],
    correctId: "power_socket",
    explanation: "Đúng! Ổ cắm điện rất nguy hiểm, không chọc tay vào!",
    category: "electrical",
  },
  {
    id: "exp_elec_2",
    question: "Vật nào mẹ dùng để ỦI QUẦN ÁO phẳng, rất nóng?",
    options: ["hot_iron", "hair_dryer", "microwave"],
    correctId: "hot_iron",
    explanation: "Giỏi lắm! Bàn ủi nóng hàng trăm độ, đừng chạm!",
    category: "electrical",
  },
  {
    id: "exp_elec_3",
    question: "Sợi dây nào bị TRÓC VỎ, thấy ruột bên trong rất nguy hiểm?",
    options: ["exposed_wire", "power_socket", "fan"],
    correctId: "exposed_wire",
    explanation: "Chính xác! Dây điện hở giật chết người! Báo ngay bố mẹ!",
    category: "electrical",
  },
  {
    id: "exp_elec_4",
    question: "Máy nào dùng HƠI NÓNG để sấy khô tóc?",
    options: ["hair_dryer", "hot_iron", "microwave"],
    correctId: "hair_dryer",
    explanation: "Đúng! Máy sấy tóc nóng, không dùng khi tay ướt!",
    category: "electrical",
  },
  {
    id: "exp_elec_5",
    question: "Cái gì có CÁNH QUAY thổi gió mát, nhưng không được thò tay vào?",
    options: ["fan", "exposed_wire", "hot_iron"],
    correctId: "fan",
    explanation: "Tuyệt! Cánh quạt quay nhanh, thò tay vào bị cắt!",
    category: "electrical",
  },
  {
    id: "exp_elec_6",
    question: "Máy nào dùng SÓNG để hâm nóng thức ăn?",
    options: ["microwave", "hair_dryer", "power_socket"],
    correctId: "microwave",
    explanation: "Đúng rồi! Lò vi sóng nóng, pé không tự bật!",
    category: "electrical",
  },
];

export function getExplorerForGroup(groupId: string): AdventureStep[] {
  const categoryMap: Record<string, string> = {
    group1: "kitchen",
    group2: "bathroom",
    group3: "electrical",
  };
  const category = categoryMap[groupId];
  if (!category) return [];
  return HOUSE_EXPLORER_STEPS.filter((s) => s.category === category);
}

// ═══════════════════════════════════════════
// SCENARIO QUIZ (Situation-based choice — lesson 3)
// ═══════════════════════════════════════════

// Re-export shared type for backward compatibility
import { ScenarioQuestion } from "@/types/game";
export type { ScenarioQuestion } from "@/types/game";

export const DANGER_SCENARIOS: ScenarioQuestion[] = [
  // Group 1 — Trong bếp
  {
    id: "sc_kitchen_1",
    situationText: "Pé thấy dao trên bàn bếp. Pé nên làm gì?",
    image: KidPlayKnife,
    options: [
      { id: "a", text: "Không chạm vào", emoji: "🚫" },
      { id: "b", text: "Cầm chơi thử", emoji: "✋" },
      { id: "c", text: "Ném xuống đất", emoji: "⬇️" },
    ],
    correctOptionId: "a",
    explanation: "Đúng rồi! Không chạm vào dao, nhờ người lớn cất!",
    category: "kitchen",
  },
  {
    id: "sc_kitchen_2",
    situationText: "Pé muốn lấy bánh trên bếp đang nấu. Nên làm gì?",
    image: KidReachStove,
    options: [
      { id: "a", text: "Tự lấy luôn", emoji: "✋" },
      { id: "b", text: "Nhờ bố mẹ lấy", emoji: "👨‍👧" },
      { id: "c", text: "Leo ghế với lấy", emoji: "🪜" },
    ],
    correctOptionId: "b",
    explanation: "Giỏi lắm! Nhờ người lớn lấy, không tự với lấy trên bếp!",
    category: "kitchen",
  },
  {
    id: "sc_kitchen_3",
    situationText: "Pé thấy bật lửa của bố trên bàn. Pé nên làm gì?",
    image: KidPlayLighter,
    options: [
      { id: "a", text: "Bật thử xem", emoji: "🔥" },
      { id: "b", text: "Cho bạn xem", emoji: "👫" },
      { id: "c", text: "Báo bố cất đi", emoji: "🗣️" },
    ],
    correctOptionId: "c",
    explanation: "Chính xác! Báo bố mẹ cất bật lửa, không nghịch lửa!",
    category: "kitchen",
  },

  // Group 2 — Phòng tắm & xung quanh
  {
    id: "sc_bath_1",
    situationText: "Pé thấy lọ nước ngọt đẹp ở phòng tắm. Nên làm gì?",
    image: KidDrinkDetergent,
    options: [
      { id: "a", text: "Uống thử xem", emoji: "🥤" },
      { id: "b", text: "Không uống, hỏi mẹ", emoji: "🙋" },
      { id: "c", text: "Ngửi xem thơm không", emoji: "👃" },
    ],
    correctOptionId: "b",
    explanation: "Đúng! Lọ ở phòng tắm có thể là hóa chất, không được uống!",
    category: "bathroom",
  },
  {
    id: "sc_bath_2",
    situationText: "Pé muốn nhìn xuống từ ban công tầng cao. Nên làm gì?",
    image: KidClimbBalcony,
    options: [
      { id: "a", text: "Leo lên lan can nhìn", emoji: "🧗" },
      { id: "b", text: "Đứng xa lan can", emoji: "🧍" },
      { id: "c", text: "Thò đầu qua khe", emoji: "👀" },
    ],
    correctOptionId: "b",
    explanation: "Giỏi lắm! Đứng xa lan can, không leo trèo!",
    category: "bathroom",
  },
  {
    id: "sc_bath_3",
    situationText: "Sàn phòng tắm bị ướt. Pé nên làm gì?",
    image: KidWetFloor,
    options: [
      { id: "a", text: "Chạy nhanh qua", emoji: "🏃" },
      { id: "b", text: "Đi chậm, bám tường", emoji: "🐢" },
      { id: "c", text: "Trượt chơi cho vui", emoji: "⛸️" },
    ],
    correctOptionId: "b",
    explanation: "Chính xác! Đi chậm trên sàn ướt để không bị ngã!",
    category: "bathroom",
  },

  // Group 3 — Đồ điện
  {
    id: "sc_elec_1",
    situationText: "Pé thấy ổ cắm điện trên tường. Nên làm gì?",
    image: KidTouchSocket,
    options: [
      { id: "a", text: "Chọc que vào xem", emoji: "📌" },
      { id: "b", text: "Không chạm vào", emoji: "🚫" },
      { id: "c", text: "Bỏ đồ chơi vào", emoji: "🧸" },
    ],
    correctOptionId: "b",
    explanation: "Đúng! Không chọc bất cứ gì vào ổ điện, bị giật chết!",
    category: "electrical",
  },
  {
    id: "sc_elec_2",
    situationText: "Mẹ vừa ủi xong, bàn ủi còn nóng. Pé nên làm gì?",
    image: KidTouchIron,
    options: [
      { id: "a", text: "Sờ thử xem nóng không", emoji: "✋" },
      { id: "b", text: "Tránh xa, đợi nguội", emoji: "⏳" },
      { id: "c", text: "Kéo dây ủi chơi", emoji: "🔌" },
    ],
    correctOptionId: "b",
    explanation: "Giỏi lắm! Bàn ủi rất nóng, đợi nguội mới chạm!",
    category: "electrical",
  },
  {
    id: "sc_elec_3",
    situationText: "Pé thấy dây điện bị tróc vỏ. Nên làm gì?",
    image: KidTouchWire,
    options: [
      { id: "a", text: "Dùng tay dính lại", emoji: "🤲" },
      { id: "b", text: "Không chạm, báo bố mẹ", emoji: "🗣️" },
      { id: "c", text: "Kéo ra xem thử", emoji: "🤏" },
    ],
    correctOptionId: "b",
    explanation: "Chính xác! Dây điện hở rất nguy hiểm, báo người lớn ngay!",
    category: "electrical",
  },
];

export function getScenariosForGroup(groupId: string): ScenarioQuestion[] {
  const categoryMap: Record<string, string> = {
    group1: "kitchen",
    group2: "bathroom",
    group3: "electrical",
  };
  const category = categoryMap[groupId];
  if (!category) return [];
  return DANGER_SCENARIOS.filter((s) => s.category === category);
}

// ═══════════════════════════════════════════
// SAFE ACTIONS (Multi-select — lesson 4)
// ═══════════════════════════════════════════

export interface SafeAction {
  id: string;
  text: string;
  emoji: string;
  isCorrect: boolean;
}

export interface SafeActionActivity {
  id: string;
  situationText: string;
  image: string | StaticImageData;
  actions: SafeAction[];
  category: string;
}

export const SAFE_ACTION_ACTIVITIES: SafeActionActivity[] = [
  // Group 1 — Trong bếp
  {
    id: "safe_kitchen_1",
    situationText: "Pé ở trong bếp một mình. Pé cần làm gì cho AN TOÀN?",
    image: GasStove,
    actions: [
      { id: "a1", text: "Không bật bếp gas", emoji: "🚫", isCorrect: true },
      { id: "a2", text: "Không cầm dao", emoji: "🔪", isCorrect: true },
      { id: "a3", text: "Tự nấu ăn luôn", emoji: "👨‍🍳", isCorrect: false },
      { id: "a4", text: "Gọi bố mẹ đến", emoji: "🗣️", isCorrect: true },
      { id: "a5", text: "Nghịch bật lửa", emoji: "🔥", isCorrect: false },
    ],
    category: "kitchen",
  },
  {
    id: "safe_kitchen_2",
    situationText: "Mẹ đang nấu nước sôi. Pé nên làm gì?",
    image: BoilingWater,
    actions: [
      { id: "b1", text: "Đứng xa bếp", emoji: "🧍", isCorrect: true },
      { id: "b3", text: "Chạy quanh bếp", emoji: "🏃", isCorrect: false },
      { id: "b4", text: "Đợi mẹ nấu xong", emoji: "⏳", isCorrect: true },
      { id: "b5", text: "Tự mở nắp nồi", emoji: "🫕", isCorrect: false },
    ],
    category: "kitchen",
  },

  // Group 2 — Phòng tắm & xung quanh
  {
    id: "safe_bath_1",
    situationText: "Pé thấy nhiều lọ thuốc và hóa chất. Pé cần làm gì?",
    image: Medicine,
    actions: [
      { id: "c1", text: "Không mở nắp", emoji: "🚫", isCorrect: true },
      { id: "c2", text: "Không uống thử", emoji: "🙅", isCorrect: true },
      { id: "c3", text: "Nếm thử xem gì", emoji: "👅", isCorrect: false },
      { id: "c4", text: "Báo bố mẹ cất", emoji: "🗣️", isCorrect: true },
      { id: "c5", text: "Đổ ra chơi", emoji: "💧", isCorrect: false },
    ],
    category: "bathroom",
  },
  {
    id: "safe_bath_2",
    situationText: "Pé chơi trên ban công. Cần chú ý gì?",
    image: Balcony,
    actions: [
      { id: "d1", text: "Không leo lan can", emoji: "🚫", isCorrect: true },
      { id: "d2", text: "Chơi xa lan can", emoji: "🧍", isCorrect: true },
      { id: "d3", text: "Trèo lên nhìn xuống", emoji: "🧗", isCorrect: false },
      { id: "d4", text: "Ném đồ xuống dưới", emoji: "⬇️", isCorrect: false },
      { id: "d5", text: "Có người lớn đi cùng", emoji: "👨‍👧", isCorrect: true },
    ],
    category: "bathroom",
  },

  // Group 3 — Đồ điện
  {
    id: "safe_elec_1",
    situationText: "Pé ở phòng có nhiều ổ cắm điện. Cần làm gì cho an toàn?",
    image: PowerSocket,
    actions: [
      { id: "e1", text: "Không chọc tay vào", emoji: "🚫", isCorrect: true },
      { id: "e2", text: "Không dùng tay ướt", emoji: "💧", isCorrect: true },
      { id: "e3", text: "Chọc que vào xem", emoji: "📌", isCorrect: false },
      { id: "e4", text: "Nhờ bố mẹ cắm", emoji: "👨‍👧", isCorrect: true },
      { id: "e5", text: "Tự cắm phích điện", emoji: "🔌", isCorrect: false },
    ],
    category: "electrical",
  },
  {
    id: "safe_elec_2",
    situationText: "Pé thấy dây điện hở trong nhà. Pé nên làm gì?",
    image: ExposedWire,
    actions: [
      { id: "f1", text: "Không chạm vào", emoji: "🚫", isCorrect: true },
      { id: "f2", text: "Báo người lớn ngay", emoji: "🗣️", isCorrect: true },
      { id: "f3", text: "Tự dùng keo dán", emoji: "📎", isCorrect: false },
      { id: "f4", text: "Tránh xa khu vực đó", emoji: "🧍", isCorrect: true },
      { id: "f5", text: "Kéo thử xem sao", emoji: "🤏", isCorrect: false },
    ],
    category: "electrical",
  },
];

export function getSafeActionsForGroup(groupId: string): SafeActionActivity[] {
  const categoryMap: Record<string, string> = {
    group1: "kitchen",
    group2: "bathroom",
    group3: "electrical",
  };
  const category = categoryMap[groupId];
  if (!category) return [];
  return SAFE_ACTION_ACTIVITIES.filter((s) => s.category === category);
}

// ═══════════════════════════════════════════
// TRUE / FALSE (Đúng hay Sai? — lesson 5)
// ═══════════════════════════════════════════

export interface TrueFalseStatement {
  id: string;
  statement: string;
  image: string | StaticImageData;
  isTrue: boolean;
  explanation: string;
  category: string;
}

export const TRUE_FALSE_STATEMENTS: TrueFalseStatement[] = [
  // Group 1 — Trong bếp
  {
    id: "tf_kitchen_1",
    statement: "Dao rất sắc, chỉ người lớn mới được dùng dao.",
    image: Knife,
    isTrue: true,
    explanation: "Đúng rồi! Dao rất nguy hiểm, chỉ người lớn mới dùng!",
    category: "kitchen",
  },
  {
    id: "tf_kitchen_2",
    statement: "Pé có thể tự bật bếp gas để nấu mì.",
    image: GasStove,
    isTrue: false,
    explanation: "Sai! Bếp gas rất nguy hiểm, pé tuyệt đối không tự bật bếp!",
    category: "kitchen",
  },
  {
    id: "tf_kitchen_3",
    statement: "Nước sôi an toàn, pé có thể tự rót nước uống.",
    image: BoilingWater,
    isTrue: false,
    explanation: "Sai! Nước sôi rất nóng, bỏng da ngay! Nhờ bố mẹ rót nhé!",
    category: "kitchen",
  },
  {
    id: "tf_kitchen_4",
    statement: "Thấy bật lửa trên bàn, pé nên báo bố mẹ cất đi.",
    image: Lighter,
    isTrue: true,
    explanation: "Đúng! Bật lửa rất nguy hiểm, báo bố mẹ cất ngay!",
    category: "kitchen",
  },
  {
    id: "tf_kitchen_5",
    statement: "Pé có thể cầm kéo chạy nhảy chơi.",
    image: Scissors,
    isTrue: false,
    explanation: "Sai! Cầm kéo chạy rất nguy hiểm, dễ bị đâm!",
    category: "kitchen",
  },
  {
    id: "tf_kitchen_6",
    statement: "Không nên chạy nhảy gần bếp khi đang nấu ăn.",
    image: KidReachStove,
    isTrue: true,
    explanation: "Đúng! Chạy gần bếp dễ va nồi nóng, rất nguy hiểm!",
    category: "kitchen",
  },

  // Group 2 — Phòng tắm & xung quanh
  {
    id: "tf_bath_1",
    statement: "Thuốc trông giống kẹo nên pé có thể ăn thử.",
    image: Medicine,
    isTrue: false,
    explanation: "Sai! Thuốc không phải kẹo, uống nhầm rất nguy hiểm!",
    category: "bathroom",
  },
  {
    id: "tf_bath_2",
    statement: "Sàn ướt cần đi chậm và bám tường để không ngã.",
    image: KidWetFloor,
    isTrue: true,
    explanation: "Đúng! Đi chậm trên sàn ướt giúp pé không bị ngã!",
    category: "bathroom",
  },
  {
    id: "tf_bath_3",
    statement: "Pé có thể leo lan can ban công để nhìn xuống.",
    image: KidClimbBalcony,
    isTrue: false,
    explanation: "Sai! Leo lan can rất nguy hiểm, pé có thể rơi xuống!",
    category: "bathroom",
  },
  {
    id: "tf_bath_4",
    statement: "Chất tẩy rửa rất độc, pé không được uống.",
    image: KidDrinkDetergent,
    isTrue: true,
    explanation: "Đúng! Chất tẩy rửa có hóa chất độc, tuyệt đối không uống!",
    category: "bathroom",
  },
  {
    id: "tf_bath_5",
    statement: "Dao cạo nhỏ nên an toàn cho pé nghịch.",
    image: Razor,
    isTrue: false,
    explanation: "Sai! Dao cạo rất sắc dù nhỏ, cắt da dễ dàng!",
    category: "bathroom",
  },
  {
    id: "tf_bath_6",
    statement: "Thấy chai lạ trong nhà, nên hỏi bố mẹ trước khi chạm.",
    image: Detergent,
    isTrue: true,
    explanation: "Đúng! Chai lạ có thể chứa hóa chất, hỏi bố mẹ trước!",
    category: "bathroom",
  },

  // Group 3 — Đồ điện
  {
    id: "tf_elec_1",
    statement: "Pé có thể chọc que vào ổ điện để xem bên trong.",
    image: KidTouchSocket,
    isTrue: false,
    explanation: "Sai! Chọc vào ổ điện bị giật điện, rất nguy hiểm!",
    category: "electrical",
  },
  {
    id: "tf_elec_2",
    statement: "Bàn ủi vừa dùng xong rất nóng, pé cần tránh xa.",
    image: KidTouchIron,
    isTrue: true,
    explanation: "Đúng! Bàn ủi nóng hàng trăm độ, đợi nguội mới chạm!",
    category: "electrical",
  },
  {
    id: "tf_elec_3",
    statement: "Dây điện bị tróc vỏ vẫn an toàn nếu pé không chạm lâu.",
    image: KidTouchWire,
    isTrue: false,
    explanation: "Sai! Dây điện hở luôn nguy hiểm, chạm vào là bị giật ngay!",
    category: "electrical",
  },
  {
    id: "tf_elec_4",
    statement: "Không dùng máy sấy tóc khi tay ướt vì dễ bị giật.",
    image: HairDryer,
    isTrue: true,
    explanation: "Đúng! Tay ướt + điện = giật điện! Rất nguy hiểm!",
    category: "electrical",
  },
  {
    id: "tf_elec_5",
    statement: "Cánh quạt quay chậm nên pé thò tay vào được.",
    image: Fan,
    isTrue: false,
    explanation: "Sai! Cánh quạt quay rất nhanh, thò tay vào bị cắt đứt!",
    category: "electrical",
  },
  {
    id: "tf_elec_6",
    statement: "Thấy dây điện hở, pé nên báo bố mẹ ngay lập tức.",
    image: ExposedWire,
    isTrue: true,
    explanation: "Đúng! Báo người lớn ngay để sửa chữa, không tự chạm vào!",
    category: "electrical",
  },
];

export function getTrueFalseForGroup(groupId: string): TrueFalseStatement[] {
  const categoryMap: Record<string, string> = {
    group1: "kitchen",
    group2: "bathroom",
    group3: "electrical",
  };
  const category = categoryMap[groupId];
  if (!category) return [];
  return TRUE_FALSE_STATEMENTS.filter((s) => s.category === category);
}
