import { StaticImageData } from "next/image";

// Import group logos
import LogoGroup1 from "@/assets/games/learn-animal/group1.webp";
import LogoGroup2 from "@/assets/games/learn-animal/group2.webp";
import LogoGroup3 from "@/assets/games/learn-animal/group3.webp";

// Import Farm Animals (Group 1)
import Chicken from "@/assets/games/learn-animal/chicken.webp";
import Duck from "@/assets/games/learn-animal/duck.webp";
import Cow from "@/assets/games/learn-animal/cow.webp";
import Pig from "@/assets/games/learn-animal/pig.webp";
import Dog from "@/assets/games/learn-animal/dog.webp";
import Cat from "@/assets/games/learn-animal/cat.webp";
//fish
import Fish from "@/assets/games/learn-animal/fish.webp";
import Dolphin from "@/assets/games/learn-animal/dolphin.webp";
import Shark from "@/assets/games/learn-animal/shark.webp";
import SeaTurtle from "@/assets/games/learn-animal/turtle.webp";
import Octopus from "@/assets/games/learn-animal/octopus.webp";
import Starfish from "@/assets/games/learn-animal/star.webp";
import Squid from "@/assets/games/learn-animal/squid.webp";
import Crab from "@/assets/games/learn-animal/crab.webp";
//wild
import Lion from "@/assets/games/learn-animal/lion.webp";
import Elephant from "@/assets/games/learn-animal/elephant.webp";
import Tiger from "@/assets/games/learn-animal/tiger.webp";
import Monkey from "@/assets/games/learn-animal/monkey.webp";
import Giraffe from "@/assets/games/learn-animal/giraffe.webp";
import Bear from "@/assets/games/learn-animal/bear.webp";
import Snake from "@/assets/games/learn-animal/snake.webp";

export interface AnimalData {
  id: string;
  name: string;
  image: StaticImageData;
  category: "farm" | "wild" | "ocean";
}

export const ANIMALS: AnimalData[] = [
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
export function getAnimalsForGroup(groupId: string): AnimalData[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return ANIMALS.filter((animal) => group.animals.includes(animal.id));
}
