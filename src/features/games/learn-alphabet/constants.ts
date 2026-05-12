import { StaticImageData } from "next/image";
import { EntityData } from "@/types/game";

// Import group logos
const LogoGroup1 = "https://assets.cuthongminh.com/games/learn-alphabet/group1.webp";
const LogoGroup2 = "https://assets.cuthongminh.com/games/learn-alphabet/group2.webp";
const LogoGroup3 = "https://assets.cuthongminh.com/games/learn-alphabet/group3.webp";

// Import letter representative images
// Vowels
const ImgCachua = "https://assets.cuthongminh.com/games/learn-alphabet/cachua.webp";
const ImgConGa = "https://assets.cuthongminh.com/games/learn-animal/chicken.webp";
const ImgRan = "https://assets.cuthongminh.com/games/learn-alphabet/ran.webp";
const ImgBocau = "https://assets.cuthongminh.com/games/learn-alphabet/bocau.webp"; // Â - bồ câu
const ImgEmPe = "https://assets.cuthongminh.com/games/learn-alphabet/empe.webp"; // E - em pé
const ImgEch = "https://assets.cuthongminh.com/games/learn-alphabet/ech.webp"; // Ê - con ếch
const ImgVit = "https://assets.cuthongminh.com/games/learn-animal/duck.webp";
const ImgOng = "https://assets.cuthongminh.com/games/learn-alphabet/ong.webp";
const ImgCoGiao = "https://assets.cuthongminh.com/games/learn-occupation/teacher.webp"; // Ô - cô giáo
const ImgOt = "https://assets.cuthongminh.com/games/learn-alphabet/ot.webp"; // Ơ - trái ớt
const ImgCua = "https://assets.cuthongminh.com/games/learn-alphabet/cua.webp";
const ImgSuTu = "https://assets.cuthongminh.com/games/learn-animal/lion.webp";
const ImgYTa = "https://assets.cuthongminh.com/games/learn-occupation/nurse.webp";

// Consonants Group 1
const ImgBo = "https://assets.cuthongminh.com/games/learn-animal/cow.webp"; // B - con bò
const ImgCam = "https://assets.cuthongminh.com/games/learn-fruit/orange.webp"; // C - con cọp
const ImgDoi = "https://assets.cuthongminh.com/games/learn-alphabet/doi.webp"; // D - con dơi
const ImgDen = "https://assets.cuthongminh.com/games/learn-alphabet/den.webp"; // Đ - cái đèn
const ImgHoa = "https://assets.cuthongminh.com/games/learn-alphabet/hoa.webp"; // H - bông hoa
const ImgKem = "https://assets.cuthongminh.com/games/learn-alphabet/kem.webp"; // K - con khỉ
const ImgLa = "https://assets.cuthongminh.com/games/learn-alphabet/la.webp"; // L - lá cờ
const ImgMeo = "https://assets.cuthongminh.com/games/learn-alphabet/meo.webp"; // M - con mèo

// Consonants Group 2
const ImgNam = "https://assets.cuthongminh.com/games/learn-alphabet/nam.webp"; // N - cây nấm
const ImgPin = "https://assets.cuthongminh.com/games/learn-alphabet/pin.webp"; // P - pin
const ImgQuabong = "https://assets.cuthongminh.com/games/learn-numbers/example-num-2.webp";
const ImgRua = "https://assets.cuthongminh.com/games/learn-animal/turtle.webp";
const ImgSao = "https://assets.cuthongminh.com/games/learn-shape/star.webp";
const ImgTenLua = "https://assets.cuthongminh.com/games/learn-vehicle/rocket.webp";
const ImgVoi = "https://assets.cuthongminh.com/games/learn-animal/elephant.webp";
const ImgXeDap = "https://assets.cuthongminh.com/games/learn-vehicle/bicycle.webp";

export interface LetterData extends EntityData {
  letter: string; // Uppercase letter display (e.g. "A", "Ă")
  word: string; // Representative word (e.g. "Áo")
}

export const LETTERS: LetterData[] = [
  // === VOWELS (Group 1) ===
  // Từ đại diện bắt đầu bằng chữ cái tương ứng
  { id: "a", letter: "A", name: "Chữ A", word: "Cà chua", image: ImgCachua, category: "vowel" },
  { id: "ă", letter: "Ă", name: "Chữ Ă", word: "Con rắn", image: ImgRan, category: "vowel" },
  { id: "â", letter: "Â", name: "Chữ Â", word: "Bồ câu", image: ImgBocau, category: "vowel" },
  { id: "e", letter: "E", name: "Chữ E", word: "Em Bé", pronounce: "Em Pé", image: ImgEmPe, category: "vowel" },
  { id: "ê", letter: "Ê", name: "Chữ Ê", word: "Con ếch", image: ImgEch, category: "vowel" },
  { id: "i", letter: "I", name: "Chữ I", word: "Con vịt", image: ImgVit, category: "vowel" },
  { id: "o", letter: "O", name: "Chữ O", word: "Con ong", image: ImgOng, category: "vowel" },
  { id: "ô", letter: "Ô", name: "Chữ Ô", word: "Cô giáo", image: ImgCoGiao, category: "vowel" },
  { id: "ơ", letter: "Ơ", name: "Chữ Ơ", word: "Quả ớt", image: ImgOt, category: "vowel" },
  { id: "u", letter: "U", name: "Chữ U", word: "Con cua", image: ImgCua, category: "vowel" },
  { id: "ư", letter: "Ư", name: "Chữ Ư", word: "Sư tử", image: ImgSuTu, category: "vowel" },
  { id: "y", letter: "Y", name: "Chữ i", word: "i tá", image: ImgYTa, category: "vowel" },

  // === CONSONANTS GROUP 1 (Group 2) ===
  { id: "b", letter: "B", name: "Chữ B", word: "Con bò", image: ImgBo, category: "consonant1" },
  { id: "c", letter: "C", name: "Chữ C", word: "Quả cam", image: ImgCam, category: "consonant1" },
  {
    id: "d",
    letter: "D",
    name: "Chữ D",
    acceptedAnswers: ["chữ giờ"],
    word: "Con dơi",
    image: ImgDoi,
    category: "consonant1",
  },
  {
    id: "đ",
    letter: "Đ",
    name: "Chữ Đờ",
    acceptedAnswers: ["Chữ Đ"],
    word: "Cái đèn",
    image: ImgDen,
    category: "consonant1",
  },
  { id: "g", letter: "G", name: "Chữ G", word: "Con gà", image: ImgConGa, category: "consonant1" },
  {
    id: "h",
    letter: "H",
    name: "Chữ Hờ",
    acceptedAnswers: ["Chữ H"],
    word: "Bông hoa",
    image: ImgHoa,
    category: "consonant1",
  },
  { id: "k", letter: "K", name: "Chữ K", word: "que kem", image: ImgKem, category: "consonant1" },
  { id: "l", letter: "L", name: "Chữ L", word: "Lá cờ", image: ImgLa, category: "consonant1" },
  { id: "m", letter: "M", name: "Chữ M", word: "Con mèo", image: ImgMeo, category: "consonant1" },

  // === CONSONANTS GROUP 2 (Group 3) ===
  { id: "n", letter: "N", name: "Chữ N", word: "Cây nấm", image: ImgNam, category: "consonant2" },
  {
    id: "p",
    letter: "P",
    name: "Chữ Pờ",
    acceptedAnswers: ["chữ P"],
    word: "Cục pin",
    image: ImgPin,
    category: "consonant2",
  },
  { id: "q", letter: "Q", name: "Chữ Q", word: "Quả bóng", image: ImgQuabong, category: "consonant2" },
  { id: "r", letter: "R", name: "Chữ R", word: "Con rùa", image: ImgRua, category: "consonant2" },
  { id: "s", letter: "S", name: "Chữ S", word: "Ngôi sao", image: ImgSao, category: "consonant2" },
  { id: "t", letter: "T", name: "Chữ T", word: "Tên lữa", image: ImgTenLua, category: "consonant2" },
  { id: "v", letter: "V", name: "Chữ V", word: "Con voi", image: ImgVoi, category: "consonant2" },
  {
    id: "x",
    letter: "X",
    name: "Chữ Xờ",
    acceptedAnswers: ["chữ s"],
    word: "Xe đạp",
    image: ImgXeDap,
    category: "consonant2",
  },
];

export interface GroupData {
  id: string;
  title: string;
  description: string;
  logo: string | StaticImageData;
  variant: "green" | "blue" | "purple" | "orange";
  letters: string[];
  [key: string]: any;
}

export const GROUPS: GroupData[] = [
  {
    id: "group1",
    title: "Nguyên âm",
    description: "Học các nguyên âm tiếng Việt",
    letters: ["a", "ă", "â", "e", "ê", "i", "o", "ô", "ơ", "u", "ư", "y"],
    logo: LogoGroup1,
    variant: "green" as const,
  },
  {
    id: "group2",
    title: "Phụ âm 1",
    description: "Học các phụ âm B, C, D, Đ, G, H, K, L, M",
    letters: ["b", "c", "d", "đ", "g", "h", "k", "l", "m"],
    logo: LogoGroup2,
    variant: "blue" as const,
  },
  {
    id: "group3",
    title: "Phụ âm 2",
    description: "Học các phụ âm N, P, Q, R, S, T, V, X",
    letters: ["n", "p", "q", "r", "s", "t", "v", "x"],
    logo: LogoGroup3,
    variant: "purple" as const,
  },
];

// Helper to get letters for a specific group
export function getLettersForGroup(groupId: string): LetterData[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return LETTERS.filter((letter) => group.letters.includes(letter.id));
}
