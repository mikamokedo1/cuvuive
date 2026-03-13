import { EntityData } from "@/types/game";

// ──── Game & Group Logos ────
const GameTerrainLogo = "https://assets.cuthongminh.com/games/learn-terrain/logo.webp";
const LogoGroup1 = "https://assets.cuthongminh.com/games/learn-terrain/group1.webp"; // Trên cạn
const LogoGroup2 = "https://assets.cuthongminh.com/games/learn-terrain/group2.webp"; // Nước
const LogoGroup3 = "https://assets.cuthongminh.com/games/learn-terrain/group3.webp"; // Đặc biệt

// ──── Entity Images ────
// Group 1 — Địa hình trên cạn
const ImgMountain = "https://assets.cuthongminh.com/games/learn-terrain/mountain.webp";
const ImgHill = "https://assets.cuthongminh.com/games/learn-terrain/hill.webp";
const ImgPlain = "https://assets.cuthongminh.com/games/learn-terrain/plain.webp";
const ImgPlateau = "https://assets.cuthongminh.com/games/learn-terrain/plateau.webp";
const ImgValley = "https://assets.cuthongminh.com/games/learn-terrain/valley.webp";
const ImgDesert = "https://assets.cuthongminh.com/games/learn-terrain/desert.webp";

// Group 2 — Địa hình nước
const ImgOcean = "https://assets.cuthongminh.com/games/learn-terrain/ocean.webp";
const ImgRiver = "https://assets.cuthongminh.com/games/learn-terrain/river.webp";
const ImgLake = "https://assets.cuthongminh.com/games/learn-terrain/lake.webp";
const ImgWaterfall = "https://assets.cuthongminh.com/games/learn-terrain/waterfall.webp";
const ImgIsland = "https://assets.cuthongminh.com/games/learn-terrain/island.webp";
const ImgSwamp = "https://assets.cuthongminh.com/games/learn-terrain/swamp.webp";

// Group 3 — Địa hình đặc biệt
const ImgVolcano = "https://assets.cuthongminh.com/games/learn-terrain/volcano.webp";
const ImgGlacier = "https://assets.cuthongminh.com/games/learn-terrain/glacier.webp";
const ImgCave = "https://assets.cuthongminh.com/games/learn-terrain/cave.webp";
const ImgCanyon = "https://assets.cuthongminh.com/games/learn-terrain/canyon.webp";
const ImgForest = "https://assets.cuthongminh.com/games/learn-terrain/forest.webp";
const ImgBeach = "https://assets.cuthongminh.com/games/learn-terrain/beach.webp";

// ──── Entities ────
export const TERRAINS: EntityData[] = [
  // Group 1 — Trên cạn
  { id: "mountain", name: "Núi", image: ImgMountain, category: "land" },
  { id: "hill", name: "Đồi", image: ImgHill, category: "land" },
  { id: "plain", name: "Đồng Bằng", image: ImgPlain, category: "land" },
  { id: "plateau", name: "Cao Nguyên", image: ImgPlateau, category: "land" },
  { id: "valley", name: "Thung Lũng", image: ImgValley, category: "land" },
  { id: "desert", name: "Sa Mạc", image: ImgDesert, category: "land" },

  // Group 2 — Nước
  { id: "ocean", name: "Đại Dương", image: ImgOcean, category: "water" },
  { id: "river", name: "Sông", image: ImgRiver, category: "water" },
  { id: "lake", name: "Hồ", image: ImgLake, category: "water" },
  { id: "waterfall", name: "Thác Nước", image: ImgWaterfall, category: "water" },
  { id: "island", name: "Đảo", image: ImgIsland, category: "water" },
  { id: "swamp", name: "Đầm Lầy", image: ImgSwamp, category: "water" },

  // Group 3 — Đặc biệt
  { id: "volcano", name: "Núi Lửa", image: ImgVolcano, category: "special" },
  { id: "glacier", name: "Sông Băng", image: ImgGlacier, category: "special" },
  { id: "cave", name: "Hang Động", image: ImgCave, category: "special" },
  { id: "canyon", name: "Hẻm Núi", image: ImgCanyon, category: "special" },
  { id: "forest", name: "Rừng", image: ImgForest, category: "special" },
  { id: "beach", name: "Bãi Biển", image: ImgBeach, category: "special" },
];

// ──── Groups ────
export const GROUPS = [
  {
    id: "group1",
    title: "Trên cạn",
    description: "Khám phá núi, đồi, đồng bằng và nhiều hơn",
    items: ["mountain", "hill", "plain", "plateau", "valley", "desert"],
    logo: LogoGroup1,
    variant: "green" as const,
  },
  {
    id: "group2",
    title: "Dưới nước",
    description: "Tìm hiểu đại dương, sông, hồ và thác nước",
    items: ["ocean", "river", "lake", "waterfall", "island", "swamp"],
    logo: LogoGroup2,
    variant: "blue" as const,
  },
  {
    id: "group3",
    title: "Đặc biệt",
    description: "Núi lửa, sông băng, hang động và nhiều hơn",
    items: ["volcano", "glacier", "cave", "canyon", "forest", "beach"],
    logo: LogoGroup3,
    variant: "orange" as const,
  },
];

export function getTerrainsForGroup(groupId: string): EntityData[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return TERRAINS.filter((terrain) => group.items.includes(terrain.id));
}

// ──── Terrain Descriptions (for explore/adventure lessons) ────
export const TERRAIN_DESCRIPTIONS: Record<string, string> = {
  mountain: "Núi là địa hình rất cao, có đỉnh nhọn. Trên đỉnh núi cao thường có tuyết phủ trắng.",
  hill: "Đồi giống như núi nhỏ, không quá cao. Đồi thường có cỏ xanh và cây cối.",
  plain: "Đồng bằng là vùng đất rộng lớn, bằng phẳng. Người ta thường trồng lúa ở đây.",
  plateau: "Cao nguyên là vùng đất cao nhưng bằng phẳng ở trên. Giống như chiếc bàn khổng lồ!",
  valley: "Thung lũng nằm giữa hai ngọn núi. Nơi đây thường có sông chảy qua.",
  desert: "Sa mạc rất nóng và khô, toàn cát vàng. Lạc đà là bạn thân của sa mạc.",
  ocean: "Đại dương là vùng nước mặn rộng lớn nhất. Cá voi và cá heo sống ở đây.",
  river: "Sông là dòng nước chảy dài từ núi ra biển. Nước sông ngọt, không mặn.",
  lake: "Hồ là vùng nước tĩnh lặng được đất bao quanh. Hồ có thể rất lớn!",
  waterfall: "Thác nước là nơi nước rơi từ trên cao xuống. Rất đẹp và hùng vĩ!",
  island: "Đảo là vùng đất nhỏ nằm giữa biển. Có thể đi thuyền ra đảo chơi.",
  swamp: "Đầm lầy là vùng đất ướt sũng nước. Có nhiều loài ếch và cá sấu sống ở đây.",
  volcano: "Núi lửa có thể phun ra magma nóng đỏ từ trong lòng đất! Rất ngoạn mục.",
  glacier: "Sông băng là khối băng khổng lồ di chuyển rất chậm. Lạnh cóng luôn!",
  cave: "Hang động là khoảng trống bên trong đá. Dơi thích sống trong hang động.",
  canyon: "Hẻm núi là khe sâu do sông bào mòn qua hàng triệu năm. Rất sâu và đẹp!",
  forest: "Rừng là nơi có rất nhiều cây cối mọc san sát. Là nhà của rất nhiều động vật.",
  beach: "Bãi biển là nơi cát gặp biển. Pé thích xây lâu đài cát ở bãi biển chứ?",
};

// ──── Habitat Data (for HabitatMatchLesson) ────
export interface HabitatAnimal {
  id: string;
  name: string;
  emoji: string;
}

// Animals/creatures that live in each terrain
export const HABITAT_MAP: Record<string, HabitatAnimal[]> = {
  mountain: [
    { id: "eagle", name: "Đại Bàng", emoji: "🦅" },
    { id: "goat", name: "Dê Núi", emoji: "🐐" },
    { id: "snow_leopard", name: "Báo Tuyết", emoji: "🐆" },
  ],
  hill: [
    { id: "rabbit", name: "Thỏ", emoji: "🐇" },
    { id: "deer", name: "Hươu", emoji: "🦌" },
    { id: "fox", name: "Cáo", emoji: "🦊" },
  ],
  plain: [
    { id: "horse", name: "Ngựa", emoji: "🐴" },
    { id: "cow", name: "Bò", emoji: "🐄" },
    { id: "buffalo", name: "Trâu", emoji: "🐃" },
  ],
  plateau: [
    { id: "yak", name: "Bò Tây Tạng", emoji: "🐂" },
    { id: "llama", name: "Lạc Đà Không Bướu", emoji: "🦙" },
    { id: "hawk", name: "Diều Hâu", emoji: "🦅" },
  ],
  valley: [
    { id: "bear", name: "Gấu", emoji: "🐻" },
    { id: "squirrel", name: "Sóc", emoji: "🐿️" },
    { id: "butterfly", name: "Bướm", emoji: "🦋" },
  ],
  desert: [
    { id: "camel", name: "Lạc Đà", emoji: "🐫" },
    { id: "scorpion", name: "Bọ Cạp", emoji: "🦂" },
    { id: "lizard", name: "Thằn Lằn", emoji: "🦎" },
  ],
  ocean: [
    { id: "whale", name: "Cá Voi", emoji: "🐋" },
    { id: "dolphin", name: "Cá Heo", emoji: "🐬" },
    { id: "shark", name: "Cá Mập", emoji: "🦈" },
  ],
  river: [
    { id: "fish", name: "Cá", emoji: "🐟" },
    { id: "otter", name: "Rái Cá", emoji: "🦦" },
    { id: "duck", name: "Vịt", emoji: "🦆" },
  ],
  lake: [
    { id: "swan", name: "Thiên Nga", emoji: "🦢" },
    { id: "frog", name: "Ếch", emoji: "🐸" },
    { id: "turtle", name: "Rùa", emoji: "🐢" },
  ],
  waterfall: [{ id: "salmon", name: "Cá Hồi", emoji: "🐟" }],
  island: [
    { id: "parrot", name: "Vẹt", emoji: "🦜" },
    { id: "sea_turtle", name: "Rùa Biển", emoji: "🐢" },
    { id: "crab", name: "Cua", emoji: "🦀" },
  ],
  swamp: [
    { id: "crocodile", name: "Cá Sấu", emoji: "🐊" },
    { id: "heron", name: "Diệc", emoji: "🦩" },
    { id: "frog2", name: "Ếch Xanh", emoji: "🐸" },
  ],
  volcano: [
    { id: "snails", name: "Ốc sên", emoji: "🐌" },
    { id: "gecko", name: "Tắc Kè", emoji: "🦎" },
  ],
  glacier: [
    { id: "polar_bear", name: "Gấu Bắc Cực", emoji: "🐻‍❄️" },
    { id: "penguin", name: "Chim Cánh Cụt", emoji: "🐧" },
    { id: "seal", name: "Hải Cẩu", emoji: "🦭" },
  ],
  cave: [
    { id: "bat2", name: "Dơi", emoji: "🦇" },
    { id: "spider", name: "Nhện", emoji: "🕷️" },
    { id: "rattlesnake", name: "Rắn", emoji: "🐍" },
  ],
  canyon: [
    { id: "condor", name: "Kền Kền", emoji: "🦅" },
    { id: "rattlesnake", name: "Rắn", emoji: "🐍" },
    { id: "coyote", name: "Sói Xám", emoji: "🐺" },
  ],
  forest: [
    { id: "tiger", name: "Hổ", emoji: "🐯" },
    { id: "monkey2", name: "Khỉ", emoji: "🐒" },
    { id: "elephant", name: "Voi", emoji: "🐘" },
  ],
  beach: [
    { id: "seagull", name: "Hải Âu", emoji: "🐦" },
    { id: "hermit_crab", name: "Ốc", emoji: "🐚" },
    { id: "starfish", name: "Sao Biển", emoji: "⭐" },
  ],
};

// ──── Adventure Data (for TerrainAdventureLesson) ────
export interface AdventureStep {
  question: string;
  correctTerrainId: string;
  options: string[]; // terrain IDs
}

export const ADVENTURES: Record<string, AdventureStep[]> = {
  group1: [
    {
      question: "Cú muốn leo lên chỗ cao nhất! Đi đường nào?",
      correctTerrainId: "mountain",
      options: ["mountain", "plain", "desert"],
    },
    {
      question: "Cú muốn thấy cánh đồng lúa vàng! Đi đâu?",
      correctTerrainId: "plain",
      options: ["mountain", "plain", "valley"],
    },
    { question: "Cú muốn tìm lạc đà! Đi đến đâu?", correctTerrainId: "desert", options: ["desert", "hill", "plateau"] },
    {
      question: "Cú nghe tiếng suối chảy giữa hai ngọn núi! Đây là đâu?",
      correctTerrainId: "valley",
      options: ["valley", "plain", "desert"],
    },
    {
      question: "Cú thấy vùng đất cao nhưng bằng phẳng! Đây là gì?",
      correctTerrainId: "plateau",
      options: ["plateau", "hill", "mountain"],
    },
    {
      question: "Cú thấy ngọn đồi nhỏ điểm xanh! Đây là đâu?",
      correctTerrainId: "hill",
      options: ["hill", "mountain", "plain"],
    },
  ],
  group2: [
    { question: "Cú muốn gặp cá voi! Phải đến đâu?", correctTerrainId: "ocean", options: ["ocean", "river", "lake"] },
    {
      question: "Cú nghe tiếng nước rơi ầm ầm! Đây là gì?",
      correctTerrainId: "waterfall",
      options: ["waterfall", "river", "ocean"],
    },
    {
      question: "Cú muốn ra vùng đất giữa biển! Đi đâu?",
      correctTerrainId: "island",
      options: ["island", "beach", "lake"],
    },
    {
      question: "Cú thấy dòng nước chảy dài! Đây là gì?",
      correctTerrainId: "river",
      options: ["river", "lake", "swamp"],
    },
    {
      question: "Cú thấy vùng nước yên tĩnh xung quanh toàn đất! Đây là đâu?",
      correctTerrainId: "lake",
      options: ["lake", "ocean", "swamp"],
    },
    {
      question: "Cú thấy đất ướt lầy lội, có cá sấu! Cẩn thận!",
      correctTerrainId: "swamp",
      options: ["swamp", "lake", "river"],
    },
  ],
  group3: [
    {
      question: "Cú thấy núi đang phun lửa! Đây là gì?",
      correctTerrainId: "volcano",
      options: ["volcano", "mountain", "canyon"],
    },
    {
      question: "Cú lạnh run! Toàn băng trắng di chuyển chậm!",
      correctTerrainId: "glacier",
      options: ["glacier", "cave", "beach"],
    },
    {
      question: "Cú bước vào khoảng trống tối trong đá! Đây là đâu?",
      correctTerrainId: "cave",
      options: ["cave", "canyon", "forest"],
    },
    {
      question: "Cú nhìn xuống khe sâu hun hút! Đáng sợ quá!",
      correctTerrainId: "canyon",
      options: ["canyon", "valley", "volcano"],
    },
    {
      question: "Cú nghe chim hót, cây rậm rạp xung quanh! Đây là đâu?",
      correctTerrainId: "forest",
      options: ["forest", "hill", "island"],
    },
    {
      question: "Cú thấy cát trắng và sóng biển! Thích quá!",
      correctTerrainId: "beach",
      options: ["beach", "island", "desert"],
    },
  ],
};

// ──── Builder Layers (for TerrainBuilderLesson) ────
export interface BuilderLayer {
  id: string;
  label: string;
  emoji: string;
}

export interface BuilderChallenge {
  terrainId: string;
  terrainName: string;
  /** Layers in correct order from bottom to top */
  correctLayers: BuilderLayer[];
}

export const BUILDER_CHALLENGES: Record<string, BuilderChallenge[]> = {
  group1: [
    {
      terrainId: "mountain",
      terrainName: "Núi Tuyết",
      correctLayers: [
        { id: "ground", label: "Mặt đất", emoji: "🟤" },
        { id: "rock", label: "Đá núi", emoji: "🪨" },
        { id: "trees", label: "Rừng cây", emoji: "🌲🌲" },
        { id: "snow", label: "Tuyết phủ", emoji: "❄️" },
      ],
    },
    {
      terrainId: "desert",
      terrainName: "Sa Mạc Nóng",
      correctLayers: [
        { id: "rock_base", label: "Đá nền", emoji: "🪨" },
        { id: "sand", label: "Cát vàng", emoji: "🏜️" },
        { id: "cactus", label: "Xương rồng", emoji: "🌵" },
        { id: "sun", label: "Mặt trời nóng", emoji: "☀️" },
      ],
    },
  ],
  group2: [
    {
      terrainId: "ocean",
      terrainName: "Đại Dương Sâu",
      correctLayers: [
        { id: "deep_sea", label: "Đáy biển", emoji: "🪸" },
        { id: "seaweed", label: "Rong biển", emoji: "🌿" },
        { id: "fish_layer", label: "Đàn cá", emoji: "🐠" },
        { id: "waves", label: "Sóng biển", emoji: "🌊" },
      ],
    },
    {
      terrainId: "waterfall",
      terrainName: "Thác Nước Hùng Vĩ",
      correctLayers: [
        { id: "river_bed", label: "Lòng suối", emoji: "🪨" },
        { id: "cliff", label: "Vách đá", emoji: "⛰️" },
        { id: "water_flow", label: "Dòng nước", emoji: "💧" },
        { id: "rainbow", label: "Cầu vồng", emoji: "🌈" },
      ],
    },
  ],
  group3: [
    {
      terrainId: "volcano",
      terrainName: "Núi Lửa Phun Trào",
      correctLayers: [
        { id: "magma", label: "Magma nóng", emoji: "🔥" },
        { id: "rock_mountain", label: "Núi đá", emoji: "⛰️" },
        { id: "lava", label: "Dung nham", emoji: "🌋" },
        { id: "smoke", label: "Khói bụi", emoji: "💨" },
      ],
    },
    {
      terrainId: "glacier",
      terrainName: "Sông Băng Lạnh Giá",
      correctLayers: [
        { id: "frozen_ground", label: "Đất đóng băng", emoji: "🧊" },
        { id: "ice_mass", label: "Khối băng", emoji: "🏔️" },
        { id: "snow_layer", label: "Tuyết rơi", emoji: "❄️" },
        { id: "aurora", label: "Cực quang", emoji: "🌌" },
      ],
    },
  ],
};

export { GameTerrainLogo };
