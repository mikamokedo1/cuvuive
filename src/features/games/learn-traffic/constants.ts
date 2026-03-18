import { StaticImageData } from "next/image";
import { EntityData } from "@/types/game";

// ═══════════════════════════════════════════
// IMAGES
// ═══════════════════════════════════════════

// Logos
const LogoMain = "https://assets.cuthongminh.com/games/learn-traffic/logo.webp";
const LogoGroup1 = "https://assets.cuthongminh.com/games/learn-traffic/group1.webp";
const LogoGroup2 = "https://assets.cuthongminh.com/games/learn-traffic/group2.webp";
const LogoGroup3 = "https://assets.cuthongminh.com/games/learn-traffic/group3.webp";

// Group 1 — Đèn & Biển Báo
const RedLight = "https://assets.cuthongminh.com/games/learn-traffic/red-light.webp";
const YellowLight = "https://assets.cuthongminh.com/games/learn-traffic/yellow-light.webp";
const GreenLight = "https://assets.cuthongminh.com/games/learn-traffic/green-light.webp";
const StopSign = "https://assets.cuthongminh.com/games/learn-traffic/stop-sign.webp";
const CrosswalkSign = "https://assets.cuthongminh.com/games/learn-traffic/crosswalk-sign.webp";
const NoEntry = "https://assets.cuthongminh.com/games/learn-traffic/no-entry.webp";

// Group 2 — Đi Bộ An Toàn
const UseCrosswalk = "https://assets.cuthongminh.com/games/learn-traffic/use-crosswalk.webp";
const LookBothWays = "https://assets.cuthongminh.com/games/learn-traffic/look-both-ways.webp";
const WalkSidewalk = "https://assets.cuthongminh.com/games/learn-traffic/walk-sidewalk.webp";
const HoldHand = "https://assets.cuthongminh.com/games/learn-traffic/hold-hand.webp";
const WaitGreen = "https://assets.cuthongminh.com/games/learn-traffic/wait-green.webp";
const NoPlayRoad = "https://assets.cuthongminh.com/games/learn-traffic/no-play-road.webp";

// Group 3 — Đi Xe An Toàn
const WearHelmet = "https://assets.cuthongminh.com/games/learn-traffic/wear-helmet.webp";
const Seatbelt = "https://assets.cuthongminh.com/games/learn-traffic/seatbelt.webp";
const SitBack = "https://assets.cuthongminh.com/games/learn-traffic/sit-back.webp";
const NoLeanOut = "https://assets.cuthongminh.com/games/learn-traffic/no-lean-out.webp";
const RideRight = "https://assets.cuthongminh.com/games/learn-traffic/ride-right.webp";
const FollowSignal = "https://assets.cuthongminh.com/games/learn-traffic/follow-signal.webp";

// ═══════════════════════════════════════════
// ENTITY DATA
// ═══════════════════════════════════════════

export const TRAFFIC_ITEMS: EntityData[] = [
  // Group 1 — Đèn & Biển Báo
  { id: "red_light", name: "Đèn Đỏ", image: RedLight, category: "signs" },
  { id: "yellow_light", name: "Đèn Vàng", image: YellowLight, category: "signs" },
  { id: "green_light", name: "Đèn Xanh", image: GreenLight, category: "signs" },
  { id: "stop_sign", name: "Biển Dừng Lại", image: StopSign, category: "signs" },
  { id: "crosswalk_sign", name: "Biển Sang Đường", image: CrosswalkSign, category: "signs" },
  { id: "no_entry", name: "Biển Cấm Đi", image: NoEntry, category: "signs" },

  // Group 2 — Đi Bộ An Toàn
  { id: "use_crosswalk", name: "Đi Vạch Kẻ", image: UseCrosswalk, category: "walking" },
  { id: "look_both_ways", name: "Nhìn Trái Phải", image: LookBothWays, category: "walking" },
  { id: "walk_sidewalk", name: "Đi Vỉa Hè", image: WalkSidewalk, category: "walking" },
  { id: "hold_hand", name: "Nắm Tay Người Lớn", image: HoldHand, category: "walking" },
  { id: "wait_green", name: "Đợi Đèn Xanh", image: WaitGreen, category: "walking" },
  { id: "no_play_road", name: "Không Chơi Trên Đường", image: NoPlayRoad, category: "walking" },

  // Group 3 — Đi Xe An Toàn
  { id: "wear_helmet", name: "Đội Mũ Bảo Hiểm", image: WearHelmet, category: "riding" },
  { id: "seatbelt", name: "Thắt Dây An Toàn", image: Seatbelt, category: "riding" },
  { id: "sit_back", name: "Ngồi Ghế Sau", image: SitBack, category: "riding" },
  { id: "no_lean_out", name: "Không Thò Đầu Ra", image: NoLeanOut, category: "riding" },
  { id: "ride_right", name: "Đi Bên Phải", image: RideRight, category: "riding" },
  { id: "follow_signal", name: "Tuân Thủ Đèn Tín Hiệu", image: FollowSignal, category: "riding" },
];

// ═══════════════════════════════════════════
// GROUPS
// ═══════════════════════════════════════════

export const GROUPS = [
  {
    id: "group1",
    title: "Đèn & Biển Báo",
    description: "Học nhận biết đèn tín hiệu và biển báo giao thông",
    items: ["red_light", "yellow_light", "green_light", "stop_sign", "crosswalk_sign", "no_entry"],
    logo: LogoGroup1,
    variant: "orange" as const,
  },
  {
    id: "group2",
    title: "Đi Bộ An Toàn",
    description: "Học cách đi bộ an toàn trên đường phố",
    items: ["use_crosswalk", "look_both_ways", "walk_sidewalk", "hold_hand", "wait_green", "no_play_road"],
    logo: LogoGroup2,
    variant: "green" as const,
  },
  {
    id: "group3",
    title: "Đi Xe An Toàn",
    description: "Học cách đi xe và ngồi xe an toàn",
    items: ["wear_helmet", "seatbelt", "sit_back", "no_lean_out", "ride_right", "follow_signal"],
    logo: LogoGroup3,
    variant: "blue" as const,
  },
];

// Helper to get items for a specific group
export function getTrafficForGroup(groupId: string): EntityData[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return TRAFFIC_ITEMS.filter((item) => group.items.includes(item.id));
}

// ═══════════════════════════════════════════
// DESCRIPTIONS (for ExploreLesson)
// ═══════════════════════════════════════════

export const TRAFFIC_DESCRIPTIONS: Record<string, string> = {
  // Signs
  red_light: "Đèn đỏ có nghĩa là DỪNG LẠI. Không được đi khi đèn đỏ nhé pé!",
  yellow_light: "Đèn vàng là HÃY CHÚ Ý. Chuẩn bị dừng lại, không chạy vội!",
  green_light: "Đèn xanh là ĐƯỢC ĐI. Nhưng nhớ nhìn trái phải trước khi đi nhé!",
  stop_sign: "Gặp biển STOP phải dừng lại hoàn toàn. Nhìn kỹ rồi mới đi tiếp!",
  crosswalk_sign: "Biển này chỉ nơi an toàn để sang đường. Hãy sang đường ở đây nhé!",
  no_entry: "Biển tròn đỏ nghĩa là KHÔNG ĐƯỢC ĐI vào đường này. Rất nguy hiểm!",
  // Walking
  use_crosswalk: "Sang đường phải đi trên vạch kẻ trắng. Đây là nơi an toàn nhất!",
  look_both_ways: "Trước khi qua đường, nhìn trái rồi nhìn phải. Không có xe mới đi nhé!",
  walk_sidewalk: "Đi bộ phải đi trên vỉa hè, không đi dưới lòng đường vì rất nguy hiểm!",
  hold_hand: "Qua đường phải nắm tay bố mẹ hoặc người lớn. An toàn hơn nhiều!",
  wait_green: "Chờ đèn xanh cho người đi bộ rồi mới qua đường. Kiên nhẫn nhé!",
  no_play_road: "Không được chạy nhảy, chơi đùa dưới lòng đường. Hãy chơi ở công viên!",
  // Riding
  wear_helmet: "Ngồi xe máy phải đội mũ bảo hiểm. Mũ bảo hiểm bảo vệ đầu pé!",
  seatbelt: "Ngồi ô tô phải thắt dây an toàn. Dây an toàn giữ pé không bị ngã!",
  sit_back: "Pé phải ngồi ghế sau ô tô, không ngồi phía trước. Ghế sau an toàn hơn!",
  no_lean_out: "Không thò tay, đầu ra ngoài cửa xe. Rất dễ bị va chạm!",
  ride_right: "Xe đạp đi sát lề bên phải đường. Để nhường đường cho xe lớn!",
  follow_signal: "Dù đi xe đạp cũng phải dừng khi đèn đỏ. Luật giao thông cho tất cả!",
};

// ═══════════════════════════════════════════
// STREET EXPLORER (Adventure quiz)
// ═══════════════════════════════════════════

export interface AdventureStep {
  id: string;
  question: string;
  options: string[]; // entity IDs
  correctId: string;
  explanation: string;
  category: string;
}

export const ADVENTURE_STEPS: AdventureStep[] = [
  // Group 1 — Đèn & Biển Báo
  {
    id: "adv_signs_1",
    question: "Cú và pé đến ngã tư. Đèn nào bảo mình DỪNG LẠI?",
    options: ["red_light", "yellow_light", "green_light"],
    correctId: "red_light",
    explanation: "Đúng rồi! Đèn đỏ là phải dừng lại!",
    category: "signs",
  },
  {
    id: "adv_signs_2",
    question: "Đèn nào cho phép mình ĐI TIẾP?",
    options: ["red_light", "green_light", "yellow_light"],
    correctId: "green_light",
    explanation: "Giỏi lắm! Đèn xanh là được đi!",
    category: "signs",
  },
  {
    id: "adv_signs_3",
    question: "Cú thấy mọi người dừng lại trước biển màu đỏ có chữ trắng",
    options: ["stop_sign", "crosswalk_sign", "no_entry"],
    correctId: "stop_sign",
    explanation: "Chính xác! Biển STOP là phải dừng lại!",
    category: "signs",
  },
  {
    id: "adv_signs_4",
    question: "Đèn VÀNG bật lên. Mình nên làm gì?",
    options: ["green_light", "yellow_light", "red_light"],
    correctId: "yellow_light",
    explanation: "Đèn vàng là chú ý, chuẩn bị dừng!",
    category: "signs",
  },
  {
    id: "adv_signs_5",
    question: "Biển tròn đỏ có vạch trắng ngang nghĩa là gì?",
    options: ["no_entry", "stop_sign", "crosswalk_sign"],
    correctId: "no_entry",
    explanation: "Đúng! Biển cấm đi vào đường này!",
    category: "signs",
  },
  {
    id: "adv_signs_6",
    question: "Biển nào chỉ nơi cho NGƯỜI ĐI BỘ sang đường?",
    options: ["crosswalk_sign", "stop_sign", "no_entry"],
    correctId: "crosswalk_sign",
    explanation: "Tuyệt vời! Biển sang đường cho người đi bộ!",
    category: "signs",
  },

  // Group 2 — Đi Bộ An Toàn
  {
    id: "adv_walk_1",
    question: "Pé muốn qua đường. Nên đi ở đâu?",
    options: ["use_crosswalk", "no_play_road", "walk_sidewalk"],
    correctId: "use_crosswalk",
    explanation: "Đúng! Đi trên vạch kẻ trắng là an toàn nhất!",
    category: "walking",
  },
  {
    id: "adv_walk_2",
    question: "Trước khi sang đường, pé nên làm gì đầu tiên?",
    options: ["look_both_ways", "use_crosswalk", "hold_hand"],
    correctId: "look_both_ways",
    explanation: "Giỏi lắm! Nhìn trái phải trước khi đi!",
    category: "walking",
  },
  {
    id: "adv_walk_3",
    question: "Đi bộ trên đường, pé nên đi ở đâu?",
    options: ["walk_sidewalk", "use_crosswalk", "no_play_road"],
    correctId: "walk_sidewalk",
    explanation: "Chính xác! Đi trên vỉa hè cho an toàn!",
    category: "walking",
  },
  {
    id: "adv_walk_4",
    question: "Pé nhỏ qua đường nên làm gì?",
    options: ["hold_hand", "look_both_ways", "wait_green"],
    correctId: "hold_hand",
    explanation: "Đúng rồi! Nắm tay người lớn khi qua đường!",
    category: "walking",
  },
  {
    id: "adv_walk_5",
    question: "Đèn đỏ cho người đi bộ. Pé phải làm gì?",
    options: ["wait_green", "use_crosswalk", "look_both_ways"],
    correctId: "wait_green",
    explanation: "Giỏi lắm! Đợi đèn xanh rồi mới đi!",
    category: "walking",
  },
  {
    id: "adv_walk_6",
    question: "Chơi đá bóng ở đâu cho an toàn?",
    options: ["no_play_road", "walk_sidewalk", "use_crosswalk"],
    correctId: "no_play_road",
    explanation: "Đúng! Chơi ở công viên, không chơi trên đường!",
    category: "walking",
  },

  // Group 3 — Đi Xe An Toàn
  {
    id: "adv_ride_1",
    question: "Ngồi xe máy cùng mẹ, pé cần gì?",
    options: ["wear_helmet", "seatbelt", "ride_right"],
    correctId: "wear_helmet",
    explanation: "Đúng rồi! Đội mũ bảo hiểm khi đi xe máy!",
    category: "riding",
  },
  {
    id: "adv_ride_2",
    question: "Ngồi ô tô, pé phải làm gì?",
    options: ["seatbelt", "wear_helmet", "sit_back"],
    correctId: "seatbelt",
    explanation: "Giỏi lắm! Thắt dây an toàn khi ngồi ô tô!",
    category: "riding",
  },
  {
    id: "adv_ride_3",
    question: "Pé nên ngồi ở đâu trong ô tô?",
    options: ["sit_back", "seatbelt", "no_lean_out"],
    correctId: "sit_back",
    explanation: "Chính xác! Pé ngồi ghế sau an toàn hơn!",
    category: "riding",
  },
  {
    id: "adv_ride_4",
    question: "Đi xe đạp, pé nên đi ở phần đường nào?",
    options: ["ride_right", "follow_signal", "wear_helmet"],
    correctId: "ride_right",
    explanation: "Đúng! Đi sát lề bên phải đường!",
    category: "riding",
  },
  {
    id: "adv_ride_5",
    question: "Đi xe đạp gặp đèn đỏ, pé nên làm gì?",
    options: ["follow_signal", "ride_right", "wear_helmet"],
    correctId: "follow_signal",
    explanation: "Giỏi lắm! Dừng lại khi đèn đỏ, dù đi xe đạp!",
    category: "riding",
  },
  {
    id: "adv_ride_6",
    question: "Khi ngồi trong xe, pé KHÔNG nên làm gì?",
    options: ["no_lean_out", "seatbelt", "sit_back"],
    correctId: "no_lean_out",
    explanation: "Đúng! Không thò tay đầu ra ngoài cửa xe!",
    category: "riding",
  },
];

export function getAdventureForGroup(groupId: string): AdventureStep[] {
  const categoryMap: Record<string, string> = {
    group1: "signs",
    group2: "walking",
    group3: "riding",
  };
  const category = categoryMap[groupId];
  if (!category) return [];
  return ADVENTURE_STEPS.filter((s) => s.category === category);
}

// ═══════════════════════════════════════════
// SCENARIO SPOTTER (Situation-based choice)
// ═══════════════════════════════════════════

export interface ScenarioQuestion {
  id: string;
  situationText: string;
  image: string | StaticImageData;
  options: { id: string; text: string; emoji: string }[];
  correctOptionId: string;
  explanation: string;
  category: string;
}

export const SCENARIO_QUESTIONS: ScenarioQuestion[] = [
  // Group 1
  {
    id: "sc_signs_1",
    situationText: "Pé đang đi bộ và gặp đèn đỏ. Pé nên làm gì?",
    image: RedLight,
    options: [
      { id: "a", text: "Dừng lại chờ", emoji: "🛑" },
      { id: "b", text: "Chạy nhanh qua", emoji: "🏃" },
      { id: "c", text: "Đi chậm qua", emoji: "🚶" },
    ],
    correctOptionId: "a",
    explanation: "Đèn đỏ là phải dừng lại và chờ đèn xanh!",
    category: "signs",
  },
  {
    id: "sc_signs_2",
    situationText: "Pé thấy biển STOP ở ngã tư. Pé nên làm gì?",
    image: StopSign,
    options: [
      { id: "a", text: "Dừng hẳn, nhìn kỹ", emoji: "👁️" },
      { id: "b", text: "Đi tiếp luôn", emoji: "➡️" },
      { id: "c", text: "Quay đầu lại", emoji: "🔄" },
    ],
    correctOptionId: "a",
    explanation: "Gặp biển STOP phải dừng, nhìn kỹ rồi mới đi!",
    category: "signs",
  },
  {
    id: "sc_signs_3",
    situationText: "Đèn vàng vừa bật lên khi pé đang đi. Làm gì bây giờ?",
    image: YellowLight,
    options: [
      { id: "a", text: "Chạy nhanh hơn", emoji: "🏃" },
      { id: "b", text: "Chú ý, chuẩn bị dừng", emoji: "⚠️" },
      { id: "c", text: "Không cần quan tâm", emoji: "🤷" },
    ],
    correctOptionId: "b",
    explanation: "Đèn vàng là chú ý, chuẩn bị dừng lại!",
    category: "signs",
  },

  // Group 2
  {
    id: "sc_walk_1",
    situationText: "Pé muốn sang bên kia đường. Nên đi bằng cách nào?",
    image: UseCrosswalk,
    options: [
      { id: "a", text: "Chạy giữa đường", emoji: "🏃" },
      { id: "b", text: "Đi trên vạch kẻ trắng", emoji: "☰" },
      { id: "c", text: "Len qua giữa các xe", emoji: "🚗" },
    ],
    correctOptionId: "b",
    explanation: "Sang đường phải đi trên vạch kẻ trắng!",
    category: "walking",
  },
  {
    id: "sc_walk_2",
    situationText: "Pé cùng bạn muốn đá bóng. Nên chơi ở đâu?",
    image: NoPlayRoad,
    options: [
      { id: "a", text: "Trên đường phố", emoji: "🛣️" },
      { id: "b", text: "Trong công viên", emoji: "🌳" },
      { id: "c", text: "Trên vỉa hè", emoji: "❯❯❯❯❯" },
    ],
    correctOptionId: "b",
    explanation: "Chơi trong công viên hoặc sân chơi cho an toàn!",
    category: "walking",
  },
  {
    id: "sc_walk_3",
    situationText: "Pé muốn qua đường nhưng không có người lớn. Nên làm gì?",
    image: HoldHand,
    options: [
      { id: "a", text: "Tự đi qua nhanh", emoji: "🏃" },
      { id: "b", text: "Đợi người lớn đến", emoji: "👨‍👧" },
      { id: "c", text: "Nhờ bạn cùng qua", emoji: "👫" },
    ],
    correctOptionId: "b",
    explanation: "Pé nhỏ nên đợi người lớn dẫn qua đường!",
    category: "walking",
  },

  // Group 3
  {
    id: "sc_ride_1",
    situationText: "Mẹ chở pé đi xe máy. Trước khi lên xe, pé cần gì?",
    image: WearHelmet,
    options: [
      { id: "a", text: "Đội mũ bảo hiểm", emoji: "⛑️" },
      { id: "b", text: "Mang theo đồ chơi", emoji: "🧸" },
      { id: "c", text: "Leo lên ngay", emoji: "🏍️" },
    ],
    correctOptionId: "a",
    explanation: "Luôn đội mũ bảo hiểm trước khi lên xe máy!",
    category: "riding",
  },
  {
    id: "sc_ride_2",
    situationText: "Pé ngồi trong ô tô. Việc đầu tiên phải làm là gì?",
    image: Seatbelt,
    options: [
      { id: "a", text: "Mở cửa sổ", emoji: "🪟" },
      { id: "b", text: "Thắt dây an toàn", emoji: "🔒" },
      { id: "c", text: "Chơi điện thoại", emoji: "📱" },
    ],
    correctOptionId: "b",
    explanation: "Thắt dây an toàn ngay khi ngồi vào xe!",
    category: "riding",
  },
  {
    id: "sc_ride_3",
    situationText: "Pé đang đi xe đạp và gặp đèn đỏ. Làm gì?",
    image: FollowSignal,
    options: [
      { id: "a", text: "Đi tiếp vì xe đạp nhỏ", emoji: "🚲" },
      { id: "b", text: "Dừng lại chờ đèn xanh", emoji: "🛑" },
      { id: "c", text: "Đi lên vỉa hè", emoji: "⬆️" },
    ],
    correctOptionId: "b",
    explanation: "Dù đi xe đạp cũng phải dừng khi đèn đỏ!",
    category: "riding",
  },
];

export function getScenariosForGroup(groupId: string): ScenarioQuestion[] {
  const categoryMap: Record<string, string> = {
    group1: "signs",
    group2: "walking",
    group3: "riding",
  };
  const category = categoryMap[groupId];
  if (!category) return [];
  return SCENARIO_QUESTIONS.filter((s) => s.category === category);
}

// ═══════════════════════════════════════════
// TRAFFIC NAVIGATOR (Street grid maps)
// ═══════════════════════════════════════════

export type CellType = "road" | "sidewalk" | "crosswalk" | "building" | "park";

export interface StreetCell {
  type: CellType;
  emoji?: string;
  trafficLight?: "red" | "green";
  hasSign?: string; // "stop" | "no_entry"
}

export interface StreetMap {
  id: string;
  title: string;
  grid: StreetCell[][];
  playerStart: [number, number];
  goal: [number, number];
  rules: string[];
  category: string;
}

const BLDG = (emoji = "🏠"): StreetCell => ({ type: "building", emoji });
const ROAD = (): StreetCell => ({ type: "road" });
const SWLK = (): StreetCell => ({ type: "sidewalk" });
const XWLK = (): StreetCell => ({ type: "crosswalk" });
const PARK = (emoji = "🌳"): StreetCell => ({ type: "park", emoji });
const RRED = (): StreetCell => ({ type: "road", trafficLight: "red" });
const RGRN = (): StreetCell => ({ type: "road", trafficLight: "green" });
const RSTP = (): StreetCell => ({ type: "road", hasSign: "stop" });

export const STREET_MAPS: StreetMap[] = [
  // Group 1 — Learn traffic lights
  {
    id: "map_signs_1",
    title: "Đi qua ngã tư",
    grid: [
      [BLDG("🏫"), SWLK(), ROAD(), SWLK(), BLDG("🏪")],
      [SWLK(), SWLK(), RRED(), SWLK(), SWLK()],
      [ROAD(), XWLK(), ROAD(), XWLK(), ROAD()],
      [SWLK(), SWLK(), RGRN(), SWLK(), SWLK()],
      [BLDG("🏠"), SWLK(), ROAD(), SWLK(), PARK()],
    ],
    playerStart: [4, 1],
    goal: [0, 1],
    rules: ["Phải dừng khi đèn đỏ", "Đi trên vạch kẻ hoặc vỉa hè"],
    category: "signs",
  },
  {
    id: "map_signs_2",
    title: "Tìm đường đến trường",
    grid: [
      [BLDG("🏫"), SWLK(), RSTP(), SWLK(), BLDG()],
      [SWLK(), SWLK(), ROAD(), SWLK(), SWLK()],
      [ROAD(), XWLK(), ROAD(), XWLK(), ROAD()],
      [SWLK(), SWLK(), ROAD(), SWLK(), SWLK()],
      [PARK(), SWLK(), ROAD(), SWLK(), BLDG("🏠")],
    ],
    playerStart: [4, 3],
    goal: [0, 1],
    rules: ["Dừng ở biển STOP", "Sang đường ở vạch kẻ"],
    category: "signs",
  },

  // Group 2 — Walking safety
  {
    id: "map_walk_1",
    title: "Qua đường an toàn",
    grid: [
      [PARK(), SWLK(), ROAD(), SWLK(), BLDG("🏪")],
      [SWLK(), SWLK(), XWLK(), SWLK(), SWLK()],
      [ROAD(), XWLK(), ROAD(), ROAD(), ROAD()],
      [SWLK(), SWLK(), ROAD(), SWLK(), SWLK()],
      [BLDG("🏠"), SWLK(), ROAD(), SWLK(), BLDG("🏫")],
    ],
    playerStart: [4, 1],
    goal: [0, 1],
    rules: ["Đi trên vỉa hè", "Qua đường ở vạch kẻ"],
    category: "walking",
  },

  // Group 3 — Riding safety
  {
    id: "map_ride_1",
    title: "Đi xe đúng luật",
    grid: [
      [BLDG(), SWLK(), ROAD(), SWLK(), BLDG("🏫")],
      [SWLK(), SWLK(), RRED(), SWLK(), SWLK()],
      [ROAD(), ROAD(), ROAD(), ROAD(), ROAD()],
      [SWLK(), SWLK(), RGRN(), SWLK(), SWLK()],
      [PARK(), SWLK(), ROAD(), SWLK(), BLDG("🏠")],
    ],
    playerStart: [4, 3],
    goal: [0, 3],
    rules: ["Dừng khi đèn đỏ", "Đi bên phải đường"],
    category: "riding",
  },
];

export function getStreetMapForGroup(groupId: string): StreetMap | undefined {
  const categoryMap: Record<string, string> = {
    group1: "signs",
    group2: "walking",
    group3: "riding",
  };
  const category = categoryMap[groupId];
  if (!category) return undefined;
  const maps = STREET_MAPS.filter((m) => m.category === category);
  return maps[0]; // return first map for each group
}

// ═══════════════════════════════════════════
// SIGN BUILDER (Drag-and-drop assembly)
// ═══════════════════════════════════════════

export interface SignPart {
  id: string;
  label: string;
  emoji: string;
}

export interface SignChallenge {
  id: string;
  signName: string;
  signImage: string | StaticImageData;
  correctParts: SignPart[];
  description: string;
  category: string;
}

export const SIGN_CHALLENGES: SignChallenge[] = [
  // Group 1
  {
    id: "build_stop",
    signName: "Biển Dừng Lại",
    signImage: StopSign,
    correctParts: [
      { id: "shape_oct", label: "Hình bát giác", emoji: "⬡" },
      { id: "color_red", label: "Màu đỏ", emoji: "🔴" },
      { id: "text_stop", label: "Chữ STOP", emoji: "🅰️" },
    ],
    description: "Biển STOP bảo tất cả phải dừng lại ở ngã tư!",
    category: "signs",
  },
  {
    id: "build_red_light",
    signName: "Đèn Đỏ",
    signImage: RedLight,
    correctParts: [
      { id: "pole", label: "Cột trụ", emoji: "🔩" },
      { id: "box_light", label: "Hộp đèn", emoji: "📦" },
      { id: "circle_red", label: "Đèn đỏ", emoji: "🔴" },
    ],
    description: "Đèn đỏ nghĩa là DỪNG LẠI, không được đi!",
    category: "signs",
  },
  {
    id: "build_crosswalk",
    signName: "Biển Sang Đường",
    signImage: CrosswalkSign,
    correctParts: [
      { id: "shape_sq", label: "Hình vuông", emoji: "🟦" },
      { id: "triangle", label: "Tam giác trắng", emoji: "△" },
      { id: "person", label: "Người đi bộ", emoji: "🚶" },
    ],
    description: "Biển này chỉ nơi an toàn để sang đường!",
    category: "signs",
  },

  // Group 2
  {
    id: "build_pedestrian",
    signName: "Biển Người Đi Bộ",
    signImage: CrosswalkSign,
    correctParts: [
      { id: "bg_blue", label: "Nền xanh", emoji: "🟦" },
      { id: "person_walk", label: "Người đang đi", emoji: "🚶" },
      { id: "stripes", label: "Vạch kẻ đường", emoji: "☰" },
    ],
    description: "Biển này báo có lối đi cho người đi bộ!",
    category: "walking",
  },
  {
    id: "build_school",
    signName: "Biển Trường Học",
    signImage: LookBothWays,
    correctParts: [
      { id: "triangle_warn", label: "Hình tam giác", emoji: "⚠️" },
      { id: "children", label: "Hình trẻ em", emoji: "👫" },
      { id: "border_red", label: "Viền đỏ cảnh báo", emoji: "🔴" },
    ],
    description: "Biển cảnh báo gần trường học, phải đi chậm!",
    category: "walking",
  },

  // Group 3
  {
    id: "build_no_entry",
    signName: "Biển Cấm Đi Vào",
    signImage: NoEntry,
    correctParts: [
      { id: "circle", label: "Hình tròn", emoji: "⭕" },
      { id: "bg_red", label: "Nền đỏ", emoji: "🔴" },
      { id: "bar_white", label: "Vạch trắng ngang", emoji: "➖" },
    ],
    description: "Biển cấm không được đi vào đường này!",
    category: "riding",
  },
  {
    id: "build_green_light",
    signName: "Đèn Xanh",
    signImage: GreenLight,
    correctParts: [
      { id: "pole2", label: "Cột trụ", emoji: "🔩" },

      { id: "box_light2", label: "Hộp đèn", emoji: "📦" },
      { id: "circle_green", label: "Đèn xanh sáng", emoji: "🟢" },
    ],
    description: "Đèn xanh là được đi, nhưng nhìn kỹ nhé!",
    category: "riding",
  },
];

export function getSignChallengesForGroup(groupId: string): SignChallenge[] {
  const categoryMap: Record<string, string> = {
    group1: "signs",
    group2: "walking",
    group3: "riding",
  };
  const category = categoryMap[groupId];
  if (!category) return [];
  return SIGN_CHALLENGES.filter((s) => s.category === category);
}

// ═══════════════════════════════════════════
// SAFE RIDER (Multi-select correct actions)
// ═══════════════════════════════════════════

export interface SafeAction {
  id: string;
  text: string;
  emoji: string;
  isCorrect: boolean;
}

export interface SafeRideActivity {
  id: string;
  situationText: string;
  image: string | StaticImageData;
  actions: SafeAction[];
  category: string;
}

export const SAFE_RIDE_ACTIVITIES: SafeRideActivity[] = [
  // Group 1
  {
    id: "safe_signs_1",
    situationText: "Pé đến ngã tư có đèn giao thông. Pé cần làm gì?",
    image: RedLight,
    actions: [
      { id: "a1", text: "Nhìn đèn tín hiệu", emoji: "👁️", isCorrect: true },
      { id: "a2", text: "Đợi đèn xanh", emoji: "🟢", isCorrect: true },
      { id: "a3", text: "Chạy nhanh qua", emoji: "🏃", isCorrect: false },
      { id: "a4", text: "Nhìn trái phải", emoji: "👀", isCorrect: true },
      { id: "a5", text: "Nhắm mắt đi qua", emoji: "🙈", isCorrect: false },
    ],
    category: "signs",
  },
  {
    id: "safe_signs_2",
    situationText: "Pé muốn đi vào con đường có biển cấm. Nên làm gì?",
    image: NoEntry,
    actions: [
      { id: "b1", text: "Không đi vào", emoji: "🚫", isCorrect: true },
      { id: "b2", text: "Tìm đường khác", emoji: "🗺️", isCorrect: true },
      { id: "b3", text: "Đi vào vì gần hơn", emoji: "➡️", isCorrect: false },
      { id: "b4", text: "Hỏi người lớn", emoji: "👨‍👧", isCorrect: true },
      { id: "b5", text: "Chạy nhanh vào", emoji: "🏃", isCorrect: false },
    ],
    category: "signs",
  },

  // Group 2
  {
    id: "safe_walk_1",
    situationText: "Pé muốn sang đường. Cần làm những gì?",
    image: UseCrosswalk,
    actions: [
      { id: "c1", text: "Đi vạch kẻ trắng", emoji: "☰", isCorrect: true },
      { id: "c2", text: "Nhìn trái phải", emoji: "👀", isCorrect: true },
      { id: "c3", text: "Nắm tay người lớn", emoji: "👫", isCorrect: true },
      { id: "c4", text: "Chạy thật nhanh", emoji: "🏃", isCorrect: false },
      { id: "c5", text: "Vừa đi vừa xem điện thoại", emoji: "📱", isCorrect: false },
    ],
    category: "walking",
  },
  {
    id: "safe_walk_2",
    situationText: "Pé đi bộ trên đường. Nên làm gì cho an toàn?",
    image: WalkSidewalk,
    actions: [
      { id: "d1", text: "Đi trên vỉa hè", emoji: "❯❯❯❯❯", isCorrect: true },
      { id: "d2", text: "Không chơi đùa", emoji: "🚫", isCorrect: true },
      { id: "d3", text: "Đi dưới lòng đường", emoji: "🛣️", isCorrect: false },
      { id: "d4", text: "Chú ý quan sát", emoji: "👁️", isCorrect: true },
      { id: "d5", text: "Đeo tai nghe to", emoji: "🎧", isCorrect: false },
    ],
    category: "walking",
  },

  // Group 3
  {
    id: "safe_ride_1",
    situationText: "Mẹ chở pé đi xe máy. Pé cần chuẩn bị gì?",
    image: WearHelmet,
    actions: [
      { id: "e1", text: "Đội mũ bảo hiểm", emoji: "⛑️", isCorrect: true },
      { id: "e2", text: "Cài quai mũ", emoji: "🔒", isCorrect: true },
      { id: "e4", text: "Thò chân ra ngoài", emoji: "🦶", isCorrect: false },
      { id: "e6", text: "Đứng trên xe", emoji: "🧍", isCorrect: false },
    ],
    category: "riding",
  },
  {
    id: "safe_ride_2",
    situationText: "Pé ngồi ô tô đi chơi. Cần làm gì cho an toàn?",
    image: Seatbelt,
    actions: [
      { id: "f1", text: "Thắt dây an toàn", emoji: "🔒", isCorrect: true },
      { id: "f2", text: "Ngồi ghế sau", emoji: "🪑", isCorrect: true },
      { id: "f3", text: "Thò đầu ra cửa sổ", emoji: "🤸", isCorrect: false },
      { id: "f5", text: "Mở cửa xe khi đang chạy", emoji: "🚪", isCorrect: false },
    ],
    category: "riding",
  },
];

export function getSafeRideForGroup(groupId: string): SafeRideActivity[] {
  const categoryMap: Record<string, string> = {
    group1: "signs",
    group2: "walking",
    group3: "riding",
  };
  const category = categoryMap[groupId];
  if (!category) return [];
  return SAFE_RIDE_ACTIVITIES.filter((s) => s.category === category);
}
