import { StaticImageData } from "next/image";

// Reuse images from existing games
const Apple = "https://assets.cuthongminh.com/games/learn-fruit/apple.webp";
const Banana = "https://assets.cuthongminh.com/games/learn-fruit/banana.webp";
const Cat = "https://assets.cuthongminh.com/games/learn-animal/cat.webp";
const Dog = "https://assets.cuthongminh.com/games/learn-animal/dog.webp";
const Elephant = "https://assets.cuthongminh.com/games/learn-animal/elephant.webp";
const Fish = "https://assets.cuthongminh.com/games/learn-animal/fish.webp";
const Giraffe = "https://assets.cuthongminh.com/games/learn-animal/giraffe.webp";
const Lion = "https://assets.cuthongminh.com/games/learn-animal/lion.webp";
const Monkey = "https://assets.cuthongminh.com/games/learn-animal/monkey.webp";
const Nose = "https://assets.cuthongminh.com/games/learn-body/nose.webp";
const Orange = "https://assets.cuthongminh.com/games/learn-fruit/orange.webp";
const Pig = "https://assets.cuthongminh.com/games/learn-animal/pig.webp";
const Tiger = "https://assets.cuthongminh.com/games/learn-animal/tiger.webp";
const Watermelon = "https://assets.cuthongminh.com/games/learn-fruit/watermelon.webp";

export interface AlphabetWord {
  id: string;
  letter: string;
  word: string;
  vietnamese: string;
  image: string | StaticImageData;
}

const emojiSvg = (emoji: string, bg: string) =>
  `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' rx='40' fill='%23${bg}'/%3E%3Ctext x='100' y='145' font-family='Arial, sans-serif' font-size='100' text-anchor='middle'%3E${encodeURIComponent(emoji)}%3C/text%3E%3C/svg%3E`;

export const ALPHABET_WORDS: AlphabetWord[] = [
  { id: "a", letter: "A", word: "Apple", vietnamese: "Quả Táo", image: Apple },
  { id: "b", letter: "B", word: "Banana", vietnamese: "Quả Chuối", image: Banana },
  { id: "c", letter: "C", word: "Cat", vietnamese: "Con Mèo", image: Cat },
  { id: "d", letter: "D", word: "Dog", vietnamese: "Con Chó", image: Dog },
  { id: "e", letter: "E", word: "Elephant", vietnamese: "Con Voi", image: Elephant },
  { id: "f", letter: "F", word: "Fish", vietnamese: "Con Cá", image: Fish },
  { id: "g", letter: "G", word: "Giraffe", vietnamese: "Hươu Cao Cổ", image: Giraffe },
  { id: "h", letter: "H", word: "Hat", vietnamese: "Cái Mũ", image: emojiSvg("🎩", "FFF3E0") },
  { id: "i", letter: "I", word: "Ice cream", vietnamese: "Kem", image: emojiSvg("🍦", "FCE4EC") },
  { id: "j", letter: "J", word: "Juice", vietnamese: "Nước Ép", image: emojiSvg("🧃", "E8F5E9") },
  { id: "k", letter: "K", word: "Kite", vietnamese: "Cái Diều", image: emojiSvg("🪁", "E3F2FD") },
  { id: "l", letter: "L", word: "Lion", vietnamese: "Sư Tử", image: Lion },
  { id: "m", letter: "M", word: "Monkey", vietnamese: "Con Khỉ", image: Monkey },
  { id: "n", letter: "N", word: "Nose", vietnamese: "Cái Mũi", image: emojiSvg("👃", "FBE9E7") },
  { id: "o", letter: "O", word: "Orange", vietnamese: "Quả Cam", image: Orange },
  { id: "p", letter: "P", word: "Pig", vietnamese: "Con Lợn", image: Pig },
  { id: "q", letter: "Q", word: "Queen", vietnamese: "Nữ Hoàng", image: emojiSvg("👸", "F3E5F5") },
  { id: "r", letter: "R", word: "Rabbit", vietnamese: "Con Thỏ", image: emojiSvg("🐰", "ECEFF1") },
  { id: "s", letter: "S", word: "Sun", vietnamese: "Mặt Trời", image: emojiSvg("☀️", "FFFDE7") },
  { id: "t", letter: "T", word: "Tiger", vietnamese: "Con Hổ", image: Tiger },
  { id: "u", letter: "U", word: "Umbrella", vietnamese: "Cái Ô", image: emojiSvg("☂️", "E1F5FE") },
  { id: "v", letter: "V", word: "Van", vietnamese: "Xe Tải", image: emojiSvg("🚐", "F1F8E9") },
  { id: "w", letter: "W", word: "Watermelon", vietnamese: "Dưa Hấu", image: Watermelon },
  { id: "x", letter: "X", word: "X-ray", vietnamese: "Tia X", image: "https://assets.cuthongminh.com/games/learn-english-alphabet/xray.webp" },
  { id: "y", letter: "Y", word: "Yo-yo", vietnamese: "Cái Yo-yo", image: emojiSvg("🪀", "FFF3E0") },
  { id: "z", letter: "Z", word: "Zebra", vietnamese: "Ngựa Vằn", image: emojiSvg("🦓", "FAFAFA") },
];

export const GROUPS = [
  {
    id: "group1",
    title: "Bảng Chữ Cái (A-M)",
    description: "Học các chữ cái từ A đến M",
    words: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m"],
    logo: "https://assets.cuthongminh.com/games/learn-english-alphabet/group1.webp",
    variant: "blue" as const,
  },
  {
    id: "group2",
    title: "Bảng Chữ Cái (N-Z)",
    description: "Học các chữ cái từ N đến Z",
    words: ["n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    logo: "https://assets.cuthongminh.com/games/learn-english-alphabet/group2.webp",
    variant: "purple" as const,
  },
];

export function getWordsForGroup(groupId: string): AlphabetWord[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return ALPHABET_WORDS.filter((word) => group.words.includes(word.id));
}

export function speakEnglish(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.8;
  window.speechSynthesis.speak(utterance);
}
