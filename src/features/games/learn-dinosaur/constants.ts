import { StaticImageData } from "next/image";

// Import group logos
import LogoGroup1 from "@/assets/games/learn-dinosaur/group1.png";
import LogoGroup2 from "@/assets/games/learn-dinosaur/group2.png";
import LogoGroup3 from "@/assets/games/learn-dinosaur/group3.png";

// Import Herbivores (Group 1)
import Triceratops from "@/assets/games/learn-dinosaur/triceratops.png";
import Stegosaurus from "@/assets/games/learn-dinosaur/stegosaurus.png";
import Brachiosaurus from "@/assets/games/learn-dinosaur/brachiosaurus.png";
import Ankylosaurus from "@/assets/games/learn-dinosaur/ankylosaurus.png";
import Parasaurolophus from "@/assets/games/learn-dinosaur/parasaurolophus.png";
import Diplodocus from "@/assets/games/learn-dinosaur/diplodocus.png";

// Import Carnivores (Group 2)
import TRex from "@/assets/games/learn-dinosaur/trex.png";
import Velociraptor from "@/assets/games/learn-dinosaur/velociraptor.png";
import Spinosaurus from "@/assets/games/learn-dinosaur/spinosaurus.png";
import Allosaurus from "@/assets/games/learn-dinosaur/allosaurus.png";
import Carnotaurus from "@/assets/games/learn-dinosaur/carnotaurus.png";
import Dilophosaurus from "@/assets/games/learn-dinosaur/dilophosaurus.png";

// Import Flying & Sea (Group 3)
import Pteranodon from "@/assets/games/learn-dinosaur/pteranodon.png";
import Plesiosaurus from "@/assets/games/learn-dinosaur/plesiosaurus.png";
import Mosasaurus from "@/assets/games/learn-dinosaur/mosasaurus.png";
import Ichthyosaurus from "@/assets/games/learn-dinosaur/ichthyosaurus.png";
import Quetzalcoatlus from "@/assets/games/learn-dinosaur/quetzalcoatlus.png";
import Archelon from "@/assets/games/learn-dinosaur/archelon.png";

export type DinosaurCategory = "herbivore" | "carnivore" | "flying_sea";

export interface DinosaurData {
  id: string;
  name: string;
  image: StaticImageData;
  category: DinosaurCategory;
}

export const DINOSAURS: DinosaurData[] = [
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

export function getDinosaursForGroup(groupId: string): DinosaurData[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return DINOSAURS.filter((dino) => group.dinosaurs.includes(dino.id));
}

export function getAllDinosaurs(): DinosaurData[] {
  return DINOSAURS;
}
