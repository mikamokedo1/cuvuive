import { StaticImageData } from "next/image";

// Import group logos
const LogoGroup1 = "https://assets.cuthongminh.com/games/learn-animal/group1.webp";
const LogoGroup2 = "https://assets.cuthongminh.com/games/learn-animal/group2.webp";
const LogoGroup3 = "https://assets.cuthongminh.com/games/learn-animal/group3.webp";

// Import Farm Animals (Group 1)
const Chicken = "https://assets.cuthongminh.com/games/learn-animal/chicken.webp";
const Duck = "https://assets.cuthongminh.com/games/learn-animal/duck.webp";
const Cow = "https://assets.cuthongminh.com/games/learn-animal/cow.webp";
const Pig = "https://assets.cuthongminh.com/games/learn-animal/pig.webp";
const Dog = "https://assets.cuthongminh.com/games/learn-animal/dog.webp";
const Cat = "https://assets.cuthongminh.com/games/learn-animal/cat.webp";
//fish
const Fish = "https://assets.cuthongminh.com/games/learn-animal/fish.webp";
const Dolphin = "https://assets.cuthongminh.com/games/learn-animal/dolphin.webp";
const Shark = "https://assets.cuthongminh.com/games/learn-animal/shark.webp";
const SeaTurtle = "https://assets.cuthongminh.com/games/learn-animal/turtle.webp";
const Octopus = "https://assets.cuthongminh.com/games/learn-animal/octopus.webp";
const Starfish = "https://assets.cuthongminh.com/games/learn-animal/star.webp";
const Squid = "https://assets.cuthongminh.com/games/learn-animal/squid.webp";
const Crab = "https://assets.cuthongminh.com/games/learn-animal/crab.webp";
//wild
const Lion = "https://assets.cuthongminh.com/games/learn-animal/lion.webp";
const Elephant = "https://assets.cuthongminh.com/games/learn-animal/elephant.webp";
const Tiger = "https://assets.cuthongminh.com/games/learn-animal/tiger.webp";
const Monkey = "https://assets.cuthongminh.com/games/learn-animal/monkey.webp";
const Giraffe = "https://assets.cuthongminh.com/games/learn-animal/giraffe.webp";
const Bear = "https://assets.cuthongminh.com/games/learn-animal/bear.webp";
const Snake = "https://assets.cuthongminh.com/games/learn-animal/snake.webp";
import { EntityData } from "@/types/game";

export const ANIMALS: EntityData[] = [
  // Farm Animals (Group 1)
  { id: "chicken", name: "Con Gà", image: Chicken, category: "farm" },
  { id: "duck", name: "Con Vịt", image: Duck, category: "farm" },
  { id: "cow", name: "Con Bò", image: Cow, category: "farm" },
  { id: "pig", name: "Con Lợn", image: Pig, category: "farm" },
  { id: "dog", name: "Con Chó", image: Dog, category: "farm" },
  { id: "cat", name: "Con Mèo", image: Cat, category: "farm" },

  // Wild Animals (Group 2)
  { id: "lion", name: "Sư Tử", image: Lion, category: "wild" },
  { id: "elephant", name: "Con Voi", image: Elephant, category: "wild" },
  { id: "tiger", name: "Con Hổ", image: Tiger, category: "wild" },
  { id: "monkey", name: "Con Khỉ", image: Monkey, category: "wild" },
  { id: "giraffe", name: "Hươu Cao Cổ", image: Giraffe, category: "wild" },
  { id: "bear", name: "Con Gấu", image: Bear, category: "wild" },
  { id: "snake", name: "Con Rắn", image: Snake, category: "wild" },

  // Ocean Animals (Group 3)
  { id: "fish", name: "Con Cá", image: Fish, category: "ocean" },
  { id: "dolphin", name: "Cá Heo", image: Dolphin, category: "ocean" },
  { id: "shark", name: "Cá Mập", image: Shark, category: "ocean" },
  { id: "seaturtle", name: "Rùa Biển", image: SeaTurtle, category: "ocean" },
  { id: "octopus", name: "Bạch Tuộc", image: Octopus, category: "ocean" },
  { id: "starfish", name: "Sao Biển", image: Starfish, category: "ocean" },
  { id: "squid", name: "Con Mực", image: Squid, category: "ocean" },
  { id: "crab", name: "Con Cua", image: Crab, category: "ocean" },
];

export const GROUPS = [
  {
    id: "group1",
    title: "Động vật nuôi",
    description: "Học các con vật nuôi",
    animals: ["chicken", "duck", "cow", "pig", "dog", "cat"],
    logo: LogoGroup1,
    variant: "green" as const,
  },
  {
    id: "group2",
    title: "Động vật hoang dã",
    description: "Học các con vật trong rừng",
    animals: ["lion", "elephant", "tiger", "monkey", "giraffe", "bear"],
    logo: LogoGroup2,
    variant: "orange" as const,
  },
  {
    id: "group3",
    title: "Động vật biển",
    description: "Học các con vật biển",
    animals: ["fish", "dolphin", "shark", "seaturtle", "octopus", "starfish"],
    logo: LogoGroup3,
    variant: "blue" as const,
  },
];

// Helper to get animals for a specific group
export function getAnimalsForGroup(groupId: string): EntityData[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return ANIMALS.filter((animal) => group.animals.includes(animal.id));
}
