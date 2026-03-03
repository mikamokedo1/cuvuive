import { StaticImageData } from "next/image";
import { GroupData } from "@/features/games/learn-vehicle/constants";

// Import group logos
import LogoGroup1 from "@/assets/games/odd-one-out/group1.png";
import LogoGroup2 from "@/assets/games/odd-one-out/group2.png";
import LogoGroup3 from "@/assets/games/odd-one-out/group3.png";

// Reusing shapes and colors from Find Pattern constants
import { PATTERN_COLORS, PATTERN_SHAPES, PatternItem } from "@/features/games/find-pattern/constants";

export { PATTERN_COLORS, PATTERN_SHAPES };
export type { PatternItem };

export interface OddOneOutPuzzle {
  items: PatternItem[];
  oddIndex: number;
}

export interface ImageItem {
  id: string;
  image: StaticImageData;
}

export interface OddOneOutImagePuzzle {
  items: ImageItem[];
  oddIndex: number;
}

// Function to get a random element from an array
function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Generates a puzzle where items have the same color, but 1 has a different color (same shape for all)
export function generateColorPuzzle(itemCount: number = 4): OddOneOutPuzzle {
  const shape = getRandom(PATTERN_SHAPES);

  // Pick a base color for the normal items
  const baseColor = getRandom(PATTERN_COLORS);

  // Pick a different color for the odd one
  const differentColors = PATTERN_COLORS.filter((c) => c.code !== baseColor.code);
  const oddColor = getRandom(differentColors);

  const items: PatternItem[] = [];
  const oddIndex = Math.floor(Math.random() * itemCount);

  for (let i = 0; i < itemCount; i++) {
    if (i === oddIndex) {
      items.push({ shape, color: oddColor });
    } else {
      items.push({ shape, color: baseColor });
    }
  }

  return { items, oddIndex };
}

// Generates a puzzle where items have the same shape, but 1 has a different shape (same color for all)
export function generateShapePuzzle(itemCount: number = 4): OddOneOutPuzzle {
  const color = getRandom(PATTERN_COLORS);

  // Pick a base shape for the normal items
  const baseShape = getRandom(PATTERN_SHAPES);

  // Pick a different shape for the odd one
  const differentShapes = PATTERN_SHAPES.filter((s) => s !== baseShape);
  const oddShape = getRandom(differentShapes);

  const items: PatternItem[] = [];
  const oddIndex = Math.floor(Math.random() * itemCount);

  for (let i = 0; i < itemCount; i++) {
    if (i === oddIndex) {
      items.push({ shape: oddShape, color });
    } else {
      items.push({ shape: baseShape, color });
    }
  }

  return { items, oddIndex };
}

// Helper safely pick a random element
function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// We dynamically pull images from existing game constants to form 10 logic puzzles
import { VEHICLES } from "@/features/games/learn-vehicle/constants";
import { ANIMALS } from "@/features/games/learn-animal/constants";
import { FRUITS } from "@/features/games/learn-fruit/constants";
import { OCCUPATIONS } from "@/features/games/learn-occupation/constants";
import { INSTRUMENTS } from "@/features/games/learn-instrument/constants";

// Helper to grab specific items by ID
const getVehicle = (id: string) => ({ id, image: VEHICLES.find((v) => v.id === id)!.image });
const getAnimal = (id: string) => ({ id, image: ANIMALS.find((a) => a.id === id)!.image });
const getFruit = (id: string) => ({ id, image: FRUITS.find((f) => f.id === id)!.image });
const getOccupation = (id: string) => ({ id, image: OCCUPATIONS.find((o) => o.id === id)!.image });
const getInstrument = (id: string) => ({ id, image: INSTRUMENTS.find((i) => i.id === id)!.image });

export const IMAGE_PUZZLES: OddOneOutImagePuzzle[] = [
  // 1: 3 land vehicles, 1 air (airplane flies)
  {
    items: [getVehicle("car"), getVehicle("motorbike"), getVehicle("bicycle"), getVehicle("airplane")],
    oddIndex: 3,
  },
  // 2: 3 farm animals, 1 wild (lion)
  {
    items: [getAnimal("chicken"), getAnimal("pig"), getAnimal("cow"), getAnimal("lion")],
    oddIndex: 3,
  },
  // 3: 3 fruits, 1 vegetable/other (actually grabbing a chicken instead of fruit)
  {
    items: [getFruit("apple"), getFruit("banana"), getFruit("mango"), getAnimal("chicken")],
    oddIndex: 3,
  },
  // 4: 3 instruments, 1 tool/occupation
  {
    items: [getInstrument("guitar"), getInstrument("piano"), getInstrument("drum"), getOccupation("doctor")],
    oddIndex: 3,
  },
  // 5: 3 water vehicles, 1 land vehicle
  {
    items: [getVehicle("boat"), getVehicle("ship"), getVehicle("submarine"), getVehicle("bus")],
    oddIndex: 3,
  },
  // 6: 3 occupations, 1 animal
  {
    items: [getOccupation("police"), getOccupation("teacher"), getOccupation("chef"), getAnimal("dog")],
    oddIndex: 3,
  },
  // 7: 3 ocean animals, 1 bird/farm
  {
    items: [getAnimal("fish"), getAnimal("dolphin"), getAnimal("shark"), getAnimal("duck")],
    oddIndex: 3,
  },
  // 8: 3 sweet fruits, 1 sour/different or instrument
  {
    items: [getFruit("watermelon"), getFruit("strawberry"), getFruit("grape"), getInstrument("flute")],
    oddIndex: 3,
  },
  // 9: 3 people (occupations), 1 vehicle
  {
    items: [getOccupation("farmer"), getOccupation("singer"), getOccupation("painter"), getVehicle("truck")],
    oddIndex: 3,
  },
  // 10: 3 string instruments, 1 wind instrument
  {
    items: [getInstrument("violin"), getInstrument("ukulele"), getInstrument("harp"), getInstrument("trumpet")],
    oddIndex: 3,
  },
];

// Returns either a Pattern puzzle or Image puzzle based on group
export function generatePuzzle(
  groupId: string,
  itemCount: number = 4,
  puzzleIndex: number = 0,
): OddOneOutPuzzle | OddOneOutImagePuzzle {
  if (groupId === "group1") {
    return generateColorPuzzle(itemCount);
  } else if (groupId === "group2") {
    return generateShapePuzzle(itemCount);
  } else {
    // Group 3 uses static 10 image puzzles
    const basePuzzle = IMAGE_PUZZLES[puzzleIndex % IMAGE_PUZZLES.length];

    // We shuffle the static puzzle to randomize the oddIndex each time
    const shuffledItems = [...basePuzzle.items].map((item, index) => ({ item, originalIndex: index }));
    shuffledItems.sort(() => Math.random() - 0.5);

    return {
      items: shuffledItems.map((x) => x.item),
      oddIndex: shuffledItems.findIndex((x) => x.originalIndex === basePuzzle.oddIndex),
    };
  }
}

export const GROUPS: GroupData[] = [
  {
    id: "group1",
    title: "Tìm màu khác biệt",
    description: "Tìm một hình có màu sắc khác với các hình còn lại",
    logo: LogoGroup1,
    variant: "orange" as const,
  },
  {
    id: "group2",
    title: "Tìm hình khác biệt",
    description: "Tìm một hình có hình dạng khác với các hình còn lại",
    logo: LogoGroup2,
    variant: "purple" as const,
  },
  {
    id: "group3",
    title: "Tìm hình khác loại",
    description: "Tìm một hình không cùng loại với các hình còn lại",
    logo: LogoGroup3,
    variant: "blue" as const,
  },
];
