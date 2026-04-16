import { StaticImageData } from "next/image";

// Reuse images from existing games
const Dog = "https://assets.cuthongminh.com/games/learn-animal/dog.webp";
const Cat = "https://assets.cuthongminh.com/games/learn-animal/cat.webp";
const Fish = "https://assets.cuthongminh.com/games/learn-animal/fish.webp";
const Duck = "https://assets.cuthongminh.com/games/learn-animal/duck.webp";
const Cow = "https://assets.cuthongminh.com/games/learn-animal/cow.webp";
const Pig = "https://assets.cuthongminh.com/games/learn-animal/pig.webp";

// Fruit images - placeholder using existing assets
const Apple = "https://assets.cuthongminh.com/games/learn-fruit/apple.webp";
const Banana = "https://assets.cuthongminh.com/games/learn-fruit/banana.webp";
const Orange = "https://assets.cuthongminh.com/games/learn-fruit/orange.webp";
const Grape = "https://assets.cuthongminh.com/games/learn-fruit/grape.webp";
const Watermelon = "https://assets.cuthongminh.com/games/learn-fruit/watermelon.webp";
const Strawberry = "https://assets.cuthongminh.com/games/learn-fruit/strawberry.webp";

// Group logos
const LogoGroup1 = "https://assets.cuthongminh.com/games/learn-animal/group1.webp";
const LogoGroup2 = "https://assets.cuthongminh.com/games/learn-fruit/logo.webp";
const LogoGroup3 = "https://assets.cuthongminh.com/games/learn-color-color.webp";
const LogoGroup4 = "https://assets.cuthongminh.com/games/learn-numbers/number-logo.webp";

export interface EnglishWord {
  id: string;
  english: string;
  vietnamese: string;
  image: string | StaticImageData;
  category: "animal" | "fruit" | "color" | "number";
}

export const ENGLISH_WORDS: EnglishWord[] = [
  // Animals (group1)
  { id: "dog", english: "Dog", vietnamese: "Con Chó", image: Dog, category: "animal" },
  { id: "cat", english: "Cat", vietnamese: "Con Mèo", image: Cat, category: "animal" },
  { id: "fish", english: "Fish", vietnamese: "Con Cá", image: Fish, category: "animal" },
  { id: "duck", english: "Duck", vietnamese: "Con Vịt", image: Duck, category: "animal" },
  { id: "cow", english: "Cow", vietnamese: "Con Bò", image: Cow, category: "animal" },
  { id: "pig", english: "Pig", vietnamese: "Con Lợn", image: Pig, category: "animal" },

  // Fruits (group2)
  { id: "apple", english: "Apple", vietnamese: "Quả Táo", image: Apple, category: "fruit" },
  { id: "banana", english: "Banana", vietnamese: "Quả Chuối", image: Banana, category: "fruit" },
  { id: "orange", english: "Orange", vietnamese: "Quả Cam", image: Orange, category: "fruit" },
  { id: "grape", english: "Grape", vietnamese: "Quả Nho", image: Grape, category: "fruit" },
  { id: "watermelon", english: "Watermelon", vietnamese: "Quả Dưa Hấu", image: Watermelon, category: "fruit" },
  { id: "strawberry", english: "Strawberry", vietnamese: "Quả Dâu Tây", image: Strawberry, category: "fruit" },

  // Colors (group3) - using emoji-style color blocks
  { id: "red", english: "Red", vietnamese: "Màu Đỏ", image: "https://assets.cuthongminh.com/games/learn-color/red.webp", category: "color" },
  { id: "blue", english: "Blue", vietnamese: "Màu Xanh Dương", image: "https://assets.cuthongminh.com/games/learn-color/blue.webp", category: "color" },
  { id: "green", english: "Green", vietnamese: "Màu Xanh Lá", image: "https://assets.cuthongminh.com/games/learn-color/green.webp", category: "color" },
  { id: "yellow", english: "Yellow", vietnamese: "Màu Vàng", image: "https://assets.cuthongminh.com/games/learn-color/yellow.webp", category: "color" },
  { id: "pink", english: "Pink", vietnamese: "Màu Hồng", image: "https://assets.cuthongminh.com/games/learn-color/pink.webp", category: "color" },
  { id: "purple", english: "Purple", vietnamese: "Màu Tím", image: "https://assets.cuthongminh.com/games/learn-color/purple.webp", category: "color" },

  // Numbers (group4) - using number images
  { id: "one", english: "One", vietnamese: "Số 1", image: "https://assets.cuthongminh.com/games/learn-numbers/1.webp", category: "number" },
  { id: "two", english: "Two", vietnamese: "Số 2", image: "https://assets.cuthongminh.com/games/learn-numbers/2.webp", category: "number" },
  { id: "three", english: "Three", vietnamese: "Số 3", image: "https://assets.cuthongminh.com/games/learn-numbers/3.webp", category: "number" },
  { id: "four", english: "Four", vietnamese: "Số 4", image: "https://assets.cuthongminh.com/games/learn-numbers/4.webp", category: "number" },
  { id: "five", english: "Five", vietnamese: "Số 5", image: "https://assets.cuthongminh.com/games/learn-numbers/5.webp", category: "number" },
  { id: "six", english: "Six", vietnamese: "Số 6", image: "https://assets.cuthongminh.com/games/learn-numbers/6.webp", category: "number" },
  { id: "seven", english: "Seven", vietnamese: "Số 7", image: "https://assets.cuthongminh.com/games/learn-numbers/7.webp", category: "number" },
  { id: "eight", english: "Eight", vietnamese: "Số 8", image: "https://assets.cuthongminh.com/games/learn-numbers/8.webp", category: "number" },
  { id: "nine", english: "Nine", vietnamese: "Số 9", image: "https://assets.cuthongminh.com/games/learn-numbers/9.webp", category: "number" },
  { id: "ten", english: "Ten", vietnamese: "Số 10", image: "https://assets.cuthongminh.com/games/learn-numbers/10.webp", category: "number" },
];

const CATEGORY_MAP: Record<string, string[]> = {
  group1: ["dog", "cat", "fish", "duck", "cow", "pig"],
  group2: ["apple", "banana", "orange", "grape", "watermelon", "strawberry"],
  group3: ["red", "blue", "green", "yellow", "pink", "purple"],
  group4: ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"],
};

export const GROUPS = [
  {
    id: "group1",
    title: "Động Vật",
    description: "Học tên các con vật bằng tiếng Anh",
    words: CATEGORY_MAP.group1,
    logo: LogoGroup1,
    variant: "green" as const,
  },
  {
    id: "group2",
    title: "Trái Cây",
    description: "Học tên các loại trái cây bằng tiếng Anh",
    words: CATEGORY_MAP.group2,
    logo: LogoGroup2,
    variant: "orange" as const,
  },
  {
    id: "group3",
    title: "Màu Sắc",
    description: "Học tên các màu sắc bằng tiếng Anh",
    words: CATEGORY_MAP.group3,
    logo: LogoGroup3,
    variant: "purple" as const,
  },
  {
    id: "group4",
    title: "Số Đếm",
    description: "Học đếm số bằng tiếng Anh",
    words: CATEGORY_MAP.group4,
    logo: LogoGroup4,
    variant: "blue" as const,
  },
];

// Helper to get words for a specific group
export function getWordsForGroup(groupId: string): EnglishWord[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return ENGLISH_WORDS.filter((word) => group.words.includes(word.id));
}

// Helper: speak English text using Web Speech API
export function speakEnglish(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.8;
  utterance.pitch = 1.1;
  window.speechSynthesis.speak(utterance);
}
