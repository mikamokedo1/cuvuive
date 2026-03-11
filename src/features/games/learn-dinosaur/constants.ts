import { StaticImageData } from "next/image";

// Import group logos
const LogoGroup1 = "https://assets.cuthongminh.com/games/learn-dinosaur/group1.webp";
const LogoGroup2 = "https://assets.cuthongminh.com/games/learn-dinosaur/group2.webp";
const LogoGroup3 = "https://assets.cuthongminh.com/games/learn-dinosaur/group3.webp";

// Import Herbivores (Group 1)
const Triceratops = "https://assets.cuthongminh.com/games/learn-dinosaur/triceratops.webp";
const Stegosaurus = "https://assets.cuthongminh.com/games/learn-dinosaur/stegosaurus.webp";
const Brachiosaurus = "https://assets.cuthongminh.com/games/learn-dinosaur/brachiosaurus.webp";
const Ankylosaurus = "https://assets.cuthongminh.com/games/learn-dinosaur/ankylosaurus.webp";
const Parasaurolophus = "https://assets.cuthongminh.com/games/learn-dinosaur/parasaurolophus.webp";
const Diplodocus = "https://assets.cuthongminh.com/games/learn-dinosaur/diplodocus.webp";

// Import Carnivores (Group 2)
const TRex = "https://assets.cuthongminh.com/games/learn-dinosaur/trex.webp";
const Velociraptor = "https://assets.cuthongminh.com/games/learn-dinosaur/velociraptor.webp";
const Spinosaurus = "https://assets.cuthongminh.com/games/learn-dinosaur/spinosaurus.webp";
const Allosaurus = "https://assets.cuthongminh.com/games/learn-dinosaur/allosaurus.webp";
const Carnotaurus = "https://assets.cuthongminh.com/games/learn-dinosaur/carnotaurus.webp";
const Dilophosaurus = "https://assets.cuthongminh.com/games/learn-dinosaur/dilophosaurus.webp";

// Import Flying & Sea (Group 3)
const Pteranodon = "https://assets.cuthongminh.com/games/learn-dinosaur/pteranodon.webp";
const Plesiosaurus = "https://assets.cuthongminh.com/games/learn-dinosaur/plesiosaurus.webp";
const Mosasaurus = "https://assets.cuthongminh.com/games/learn-dinosaur/mosasaurus.webp";
const Ichthyosaurus = "https://assets.cuthongminh.com/games/learn-dinosaur/ichthyosaurus.webp";
const Quetzalcoatlus = "https://assets.cuthongminh.com/games/learn-dinosaur/quetzalcoatlus.webp";
const Archelon = "https://assets.cuthongminh.com/games/learn-dinosaur/archelon.webp";
import { EntityData } from "@/types/game";

export type DinosaurCategory = "herbivore" | "carnivore" | "flying_sea";

export const DINOSAURS: EntityData[] = [
  // Herbivores (Group 1)
  { id: "triceratops", name: "Khủng long ba sừng", image: Triceratops, category: "herbivore" },
  { id: "stegosaurus", name: "Khủng long gai", image: Stegosaurus, category: "herbivore" },
  { id: "brachiosaurus", name: "Khủng long cổ dài", image: Brachiosaurus, category: "herbivore" },
  { id: "ankylosaurus", name: "Khủng long bọc giáp", image: Ankylosaurus, category: "herbivore" },
  { id: "parasaurolophus", name: "Khủng long mào", image: Parasaurolophus, category: "herbivore" },
  { id: "diplodocus", name: "Khủng long đuôi dài", image: Diplodocus, category: "herbivore" },

  // Carnivores (Group 2)
  { id: "trex", name: "Khủng long bạo chúa", image: TRex, category: "carnivore" },
  { id: "velociraptor", name: "Khủng long móng vuốt", image: Velociraptor, category: "carnivore" },
  { id: "spinosaurus", name: "Khủng long gai lưng", image: Spinosaurus, category: "carnivore" },
  { id: "allosaurus", name: "Khủng long săn mồi", image: Allosaurus, category: "carnivore" },
  { id: "carnotaurus", name: "Khủng long sừng bò", image: Carnotaurus, category: "carnivore" },
  { id: "dilophosaurus", name: "Khủng long mào đôi", image: Dilophosaurus, category: "carnivore" },

  // Flying & Sea (Group 3)
  { id: "pteranodon", name: "Thằn lằn bay", image: Pteranodon, category: "flying_sea" },
  { id: "plesiosaurus", name: "Thằn lằn biển", image: Plesiosaurus, category: "flying_sea" },
  { id: "mosasaurus", name: "Khủng long biển", image: Mosasaurus, category: "flying_sea" },
  { id: "ichthyosaurus", name: "Thằn lằn cá", image: Ichthyosaurus, category: "flying_sea" },
  { id: "quetzalcoatlus", name: "Bò sát bay khổng lồ", image: Quetzalcoatlus, category: "flying_sea" },
  { id: "archelon", name: "Rùa biển cổ đại", image: Archelon, category: "flying_sea" },
];

export const GROUPS = [
  {
    id: "group1",
    title: "Ăn cỏ",
    description: "Học các loài khủng long ăn cỏ",
    dinosaurs: ["triceratops", "stegosaurus", "brachiosaurus", "ankylosaurus", "parasaurolophus", "diplodocus"],
    logo: LogoGroup1,
    variant: "green" as const,
    lessonCount: 3,
  },
  {
    id: "group2",
    title: "Ăn thịt",
    description: "Học các loài khủng long ăn thịt",
    dinosaurs: ["trex", "velociraptor", "spinosaurus", "allosaurus", "carnotaurus", "dilophosaurus"],
    logo: LogoGroup2,
    variant: "orange" as const,
    lessonCount: 3,
  },
  {
    id: "group3",
    title: "Bay & Biển",
    description: "Học các loài khủng long bay và biển",
    dinosaurs: ["pteranodon", "plesiosaurus", "mosasaurus", "ichthyosaurus", "quetzalcoatlus", "archelon"],
    logo: LogoGroup3,
    variant: "blue" as const,
    lessonCount: 3,
  },
];

export function getDinosaursForGroup(groupId: string): EntityData[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return DINOSAURS.filter((dino) => group.dinosaurs.includes(dino.id));
}

export function getAllDinosaurs(): EntityData[] {
  return DINOSAURS;
}
