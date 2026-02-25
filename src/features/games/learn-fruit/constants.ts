import { StaticImageData } from "next/image";

// Import group logos
import LogoGroup1 from "@/assets/games/learn-fruit/group1.webp";
import LogoGroup2 from "@/assets/games/learn-fruit/group2.webp";
import LogoGroup3 from "@/assets/games/learn-fruit/group3.webp";

// Import Tropical Fruits (Group 1)
import Banana from "@/assets/games/learn-fruit/banana.webp";
import Mango from "@/assets/games/learn-fruit/mango.webp";
import Pineapple from "@/assets/games/learn-fruit/pineapple.webp";
import Coconut from "@/assets/games/learn-fruit/coconut.webp";
import Papaya from "@/assets/games/learn-fruit/papaya.webp";
import DragonFruit from "@/assets/games/learn-fruit/dragonfruit.webp";

// Import Common Fruits (Group 2)
import Apple from "@/assets/games/learn-fruit/apple.webp";
import Orange from "@/assets/games/learn-fruit/orange.webp";
import Grape from "@/assets/games/learn-fruit/grape.webp";
import Strawberry from "@/assets/games/learn-fruit/strawberry.webp";
import Watermelon from "@/assets/games/learn-fruit/watermelon.webp";
import Pear from "@/assets/games/learn-fruit/pear.webp";

// Import Special Fruits (Group 3)
import Durian from "@/assets/games/learn-fruit/durian.webp";
import Mangosteen from "@/assets/games/learn-fruit/mangosteen.webp";
import Pomelo from "@/assets/games/learn-fruit/pomelo.webp";
import Lychee from "@/assets/games/learn-fruit/lychee.webp";
import Lemon from "@/assets/games/learn-fruit/lemon.webp";
import Kiwi from "@/assets/games/learn-fruit/kiwi.webp";
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
