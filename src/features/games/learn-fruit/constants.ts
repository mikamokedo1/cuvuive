import { StaticImageData } from "next/image";

// Import group logos
const LogoGroup1 = "https://assets.cuthongminh.com/games/learn-fruit/group1.webp";
const LogoGroup2 = "https://assets.cuthongminh.com/games/learn-fruit/group2.webp";
const LogoGroup3 = "https://assets.cuthongminh.com/games/learn-fruit/group3.webp";

// Import Tropical Fruits (Group 1)
const Banana = "https://assets.cuthongminh.com/games/learn-fruit/banana.webp";
const Mango = "https://assets.cuthongminh.com/games/learn-fruit/mango.webp";
const Pineapple = "https://assets.cuthongminh.com/games/learn-fruit/pineapple.webp";
const Coconut = "https://assets.cuthongminh.com/games/learn-fruit/coconut.webp";
const Papaya = "https://assets.cuthongminh.com/games/learn-fruit/papaya.webp";
const DragonFruit = "https://assets.cuthongminh.com/games/learn-fruit/dragonfruit.webp";

// Import Common Fruits (Group 2)
const Apple = "https://assets.cuthongminh.com/games/learn-fruit/apple.webp";
const Orange = "https://assets.cuthongminh.com/games/learn-fruit/orange.webp";
const Grape = "https://assets.cuthongminh.com/games/learn-fruit/grape.webp";
const Strawberry = "https://assets.cuthongminh.com/games/learn-fruit/strawberry.webp";
const Watermelon = "https://assets.cuthongminh.com/games/learn-fruit/watermelon.webp";
const Pear = "https://assets.cuthongminh.com/games/learn-fruit/pear.webp";

// Import Special Fruits (Group 3)
const Durian = "https://assets.cuthongminh.com/games/learn-fruit/durian.webp";
const Mangosteen = "https://assets.cuthongminh.com/games/learn-fruit/mangosteen.webp";
const Pomelo = "https://assets.cuthongminh.com/games/learn-fruit/pomelo.webp";
const Lychee = "https://assets.cuthongminh.com/games/learn-fruit/lychee.webp";
const Lemon = "https://assets.cuthongminh.com/games/learn-fruit/lemon.webp";
const Kiwi = "https://assets.cuthongminh.com/games/learn-fruit/kiwi.webp";
import { EntityData } from "@/types/game";

export const FRUITS: EntityData[] = [
  // Tropical Fruits (Group 1)
  { id: "banana", name: "Chuối", image: Banana, category: "tropical" },
  { id: "mango", name: "Xoài", image: Mango, category: "tropical" },
  { id: "pineapple", name: "Dứa", image: Pineapple, category: "tropical" },
  { id: "coconut", name: "Dừa", image: Coconut, category: "tropical" },
  { id: "papaya", name: "Đu Đủ", image: Papaya, category: "tropical" },
  { id: "dragonfruit", name: "Thanh Long", image: DragonFruit, category: "tropical" },

  // Common Fruits (Group 2)
  { id: "apple", name: "Táo", image: Apple, category: "common" },
  { id: "orange", name: "Cam", image: Orange, category: "common" },
  { id: "grape", name: "Nho", image: Grape, category: "common" },
  { id: "strawberry", name: "Dâu Tây", image: Strawberry, category: "common" },
  { id: "watermelon", name: "Dưa Hấu", image: Watermelon, category: "common" },
  { id: "pear", name: "Lê", image: Pear, category: "common" },

  // Special Fruits (Group 3)
  { id: "durian", name: "Sầu Riêng", image: Durian, category: "special" },
  { id: "mangosteen", name: "Măng Cụt", image: Mangosteen, category: "special" },
  { id: "pomelo", name: "Bưởi", image: Pomelo, category: "special" },
  { id: "lychee", name: "Vải", image: Lychee, category: "special" },
  { id: "lemon", name: "Chanh", image: Lemon, category: "special" },
  { id: "kiwi", name: "Kiwi", image: Kiwi, category: "special" },
];

export const GROUPS = [
  {
    id: "group1",
    title: "Trái cây nhiệt đới",
    description: "Học các loại trái cây nhiệt đới",
    fruits: ["banana", "mango", "pineapple", "coconut", "papaya", "dragonfruit"],
    logo: LogoGroup1,
    variant: "green" as const,
    lessonCount: 3,
  },
  {
    id: "group2",
    title: "Trái cây thường gặp",
    description: "Học các loại trái cây thường gặp",
    fruits: ["apple", "orange", "grape", "strawberry", "watermelon", "pear"],
    logo: LogoGroup2,
    variant: "orange" as const,
    lessonCount: 3,
  },
  {
    id: "group3",
    title: "Trái cây đặc biệt",
    description: "Học các loại trái cây đặc biệt",
    fruits: ["durian", "mangosteen", "pomelo", "lychee", "lemon", "kiwi"],
    logo: LogoGroup3,
    variant: "purple" as const,
    lessonCount: 3,
  },
];

export function getFruitsForGroup(groupId: string): EntityData[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return group.fruits.map((fruitId) => FRUITS.find((f) => f.id === fruitId)).filter(Boolean) as EntityData[];
}

export function getAllFruits(): EntityData[] {
  return FRUITS;
}

// ──── Fruit Descriptions (for explore lesson) ────
export const FRUIT_DESCRIPTIONS: Record<string, string> = {
  banana: "Chuối có vỏ vàng và ruột ngọt mềm. Chuối giàu kali, giúp xương chắc khỏe!",
  mango: "Xoài chín vàng ươm, ngọt lịm và thơm lừng. Xoài là vua của các loại trái cây nhiệt đới!",
  pineapple: "Dứa có vỏ sần sùi nhưng ruột vàng ngọt. Dứa ăn nhiều sẽ bị rát lưỡi",
  coconut: "Dừa có nước ngọt mát bên trong. Cây dừa mọc rất cao và thường ở gần biển!",
  papaya: "Đu đủ chín có ruột cam ngọt lịm. Đu đủ tốt cho tiêu hóa!",
  dragonfruit: "Thanh long có vỏ hồng đẹp như rồng. Ruột trắng hoặc đỏ với hạt đen nhỏ li ti!",
  apple: "Táo có vị giòn ngọt, rất tốt cho sức khỏe. 'Mỗi ngày một quả táo, bác sĩ xa ta!'",
  orange: "Cam có múi ngọt mọng nước. Cam giàu vitamin Xê giúp pé khỏe mạnh!",
  grape: "Nho mọc thành chùm, có nho xanh và nho tím. Nho dùng làm nước ép rất ngon!",
  strawberry: "Dâu tây đỏ tươi, có nhiều hạt nhỏ bên ngoài. Dâu tây thơm ngon và bổ dưỡng!",
  watermelon: "Dưa hấu to tròn, ruột đỏ mọng nước. Mùa hè ăn dưa hấu mát lắm!",
  pear: "Lê có vị ngọt thanh mát. Lê giúp giải nhiệt rất tốt!",
  durian: "Sầu riêng có gai nhọn và mùi rất đặc biệt. Ai thích thì rất thích, ai sợ thì rất sợ!",
  mangosteen: "Măng cụt có vỏ tím sậm, ruột trắng ngọt. Măng cụt được gọi là 'nữ hoàng trái cây'!",
  pomelo: "Bưởi to tròn, múi ngọt hoặc chua nhẹ. Ngày Tết, người ta hay mua bưởi để trưng!",
  lychee: "Vải có vỏ đỏ sần sùi, ruột trắng trong ngọt lịm. Vải chín vào mùa hè!",
  lemon: "Chanh có vị chua, dùng để pha nước giải khát.",
  kiwi: "Kiwi có vỏ nâu xù xì, ruột xanh với hạt đen nhỏ.",
};
