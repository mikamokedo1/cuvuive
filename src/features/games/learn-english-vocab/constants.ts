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
  category: "animal" | "fruit" | "color" | "number" | "vehicle" | "family" | "body";
}

const numSvg = (num: string, bg: string, color: string) =>
  `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' rx='40' fill='%23${bg}'/%3E%3Ctext x='100' y='145' font-family='Arial, sans-serif' font-size='120' font-weight='bold' fill='%23${color}' text-anchor='middle'%3E${num}%3C/text%3E%3C/svg%3E`;

const emojiSvg = (emoji: string, bg: string) =>
  `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' rx='40' fill='%23${bg}'/%3E%3Ctext x='100' y='145' font-family='Arial, sans-serif' font-size='100' text-anchor='middle'%3E${encodeURIComponent(emoji)}%3C/text%3E%3C/svg%3E`;

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
  { id: "red", english: "Red", vietnamese: "Màu Đỏ", image: "https://assets.cuthongminh.com/games/learn-color/red-apple.webp", category: "color" },
  { id: "blue", english: "Blue", vietnamese: "Màu Xanh Dương", image: "https://assets.cuthongminh.com/games/learn-color/blue-whale.webp", category: "color" },
  { id: "green", english: "Green", vietnamese: "Màu Xanh Lá", image: "https://assets.cuthongminh.com/games/learn-color/green-frog.webp", category: "color" },
  { id: "yellow", english: "Yellow", vietnamese: "Màu Vàng", image: "https://assets.cuthongminh.com/games/learn-color/yellow-banana.webp", category: "color" },
  { id: "pink", english: "Pink", vietnamese: "Màu Hồng", image: "https://assets.cuthongminh.com/games/learn-color/pink-pig.webp", category: "color" },
  { id: "purple", english: "Purple", vietnamese: "Màu Tím", image: "https://assets.cuthongminh.com/games/learn-color/purple-grape.webp", category: "color" },

  // Numbers (group4) - using generated SVG images
  { id: "one", english: "One", vietnamese: "Số 1", image: numSvg("1", "FFEBEE", "C62828"), category: "number" },
  { id: "two", english: "Two", vietnamese: "Số 2", image: numSvg("2", "E3F2FD", "1565C0"), category: "number" },
  { id: "three", english: "Three", vietnamese: "Số 3", image: numSvg("3", "E8F5E9", "2E7D32"), category: "number" },
  { id: "four", english: "Four", vietnamese: "Số 4", image: numSvg("4", "FFF3E0", "EF6C00"), category: "number" },
  { id: "five", english: "Five", vietnamese: "Số 5", image: numSvg("5", "F3E5F5", "6A1B9A"), category: "number" },
  { id: "six", english: "Six", vietnamese: "Số 6", image: numSvg("6", "E0F7FA", "00838F"), category: "number" },
  { id: "seven", english: "Seven", vietnamese: "Số 7", image: numSvg("7", "FBE9E7", "D84315"), category: "number" },
  { id: "eight", english: "Eight", vietnamese: "Số 8", image: numSvg("8", "ECEFF1", "37474F"), category: "number" },
  { id: "nine", english: "Nine", vietnamese: "Số 9", image: numSvg("9", "FCE4EC", "AD1457"), category: "number" },
  { id: "ten", english: "Ten", vietnamese: "Số 10", image: numSvg("10", "E8EAF6", "283593"), category: "number" },

  // Vehicles (group5)
  { id: "car", english: "Car", vietnamese: "Ô tô", image: emojiSvg("🚗", "E3F2FD"), category: "vehicle" },
  { id: "bus", english: "Bus", vietnamese: "Xe buýt", image: emojiSvg("🚌", "FFF3E0"), category: "vehicle" },
  { id: "train", english: "Train", vietnamese: "Tàu hỏa", image: emojiSvg("🚂", "E8F5E9"), category: "vehicle" },
  { id: "plane", english: "Plane", vietnamese: "Máy bay", image: emojiSvg("✈️", "F3E5F5"), category: "vehicle" },
  { id: "boat", english: "Boat", vietnamese: "Thuyền", image: emojiSvg("⛵", "E0F7FA"), category: "vehicle" },
  { id: "bicycle", english: "Bicycle", vietnamese: "Xe đạp", image: emojiSvg("🚲", "FBE9E7"), category: "vehicle" },

  // Family (group6)
  { id: "father", english: "Father", vietnamese: "Bố", image: emojiSvg("👨", "E3F2FD"), category: "family" },
  { id: "mother", english: "Mother", vietnamese: "Mẹ", image: emojiSvg("👩", "FCE4EC"), category: "family" },
  { id: "grandfather", english: "Grandfather", vietnamese: "Ông", image: emojiSvg("👴", "E8F5E9"), category: "family" },
  { id: "grandmother", english: "Grandmother", vietnamese: "Bà", image: emojiSvg("👵", "FFF3E0"), category: "family" },
  { id: "brother", english: "Brother", vietnamese: "Anh/Em trai", image: emojiSvg("👦", "E0F7FA"), category: "family" },
  { id: "sister", english: "Sister", vietnamese: "Chị/Em gái", image: emojiSvg("👧", "F3E5F5"), category: "family" },

  // Body (group7)
  { id: "head", english: "Head", vietnamese: "Cái đầu", image: emojiSvg("👤", "E3F2FD"), category: "body" },
  { id: "eye", english: "Eye", vietnamese: "Con mắt", image: emojiSvg("👁️", "E8F5E9"), category: "body" },
  { id: "ear", english: "Ear", vietnamese: "Cái tai", image: emojiSvg("👂", "FFF3E0"), category: "body" },
  { id: "nose", english: "Nose", vietnamese: "Cái mũi", image: emojiSvg("👃", "FCE4EC"), category: "body" },
  { id: "mouth", english: "Mouth", vietnamese: "Cái miệng", image: emojiSvg("👄", "F3E5F5"), category: "body" },
  { id: "hand", english: "Hand", vietnamese: "Bàn tay", image: emojiSvg("✋", "E0F7FA"), category: "body" },
];

const CATEGORY_MAP: Record<string, string[]> = {
  group1: ["dog", "cat", "fish", "duck", "cow", "pig"],
  group2: ["apple", "banana", "orange", "grape", "watermelon", "strawberry"],
  group3: ["red", "blue", "green", "yellow", "pink", "purple"],
  group4: ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"],
  group5: ["car", "bus", "train", "plane", "boat", "bicycle"],
  group6: ["father", "mother", "grandfather", "grandmother", "brother", "sister"],
  group7: ["head", "eye", "ear", "nose", "mouth", "hand"],
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
  {
    id: "group5",
    title: "Giao Thông",
    description: "Học tên các phương tiện giao thông",
    words: CATEGORY_MAP.group5,
    logo: emojiSvg("🚗", "E3F2FD"),
    variant: "orange" as const,
  },
  {
    id: "group6",
    title: "Gia Đình",
    description: "Học từ vựng về các thành viên trong gia đình",
    words: CATEGORY_MAP.group6,
    logo: emojiSvg("👨‍👩‍👧", "FCE4EC"),
    variant: "green" as const,
  },
  {
    id: "group7",
    title: "Cơ Thể Người",
    description: "Học từ vựng về các bộ phận cơ thể",
    words: CATEGORY_MAP.group7,
    logo: emojiSvg("👤", "FFF3E0"),
    variant: "purple" as const,
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
