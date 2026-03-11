import { StaticImageData } from "next/image";
import { EntityData } from "@/types/game";

// Import game logo and group logos
const LogoGroup1 = "https://assets.cuthongminh.com/games/learn-tones/group1.webp";
const LogoGroup2 = "https://assets.cuthongminh.com/games/learn-tones/group2.webp";
const LogoGroup3 = "https://assets.cuthongminh.com/games/learn-tones/group3.webp";
const LogoGroup4 = "https://assets.cuthongminh.com/games/learn-tones/group4.webp";
const LogoGroup5 = "https://assets.cuthongminh.com/games/learn-tones/group5.webp";

// Import words (reusing existing assets)
const ImgLa = "https://assets.cuthongminh.com/games/learn-tones/words/la.webp";
const ImgRan = "https://assets.cuthongminh.com/games/learn-animal/snake.webp";
const ImgTao = "https://assets.cuthongminh.com/games/learn-fruit/apple.webp";
const ImgBo = "https://assets.cuthongminh.com/games/learn-animal/cow.webp";
const ImgRua = "https://assets.cuthongminh.com/games/learn-animal/turtle.webp";
const ImgMeo = "https://assets.cuthongminh.com/games/learn-animal/cat.webp";
const ImgTiger = "https://assets.cuthongminh.com/games/learn-animal/tiger.webp";
const ImgPho = "https://assets.cuthongminh.com/games/learn-food/pho.webp";
const ImgKhi = "https://assets.cuthongminh.com/games/learn-animal/monkey.webp";
const ImgBao = "https://assets.cuthongminh.com/games/learn-weather/bao.webp";
const ImgVit = "https://assets.cuthongminh.com/games/learn-animal/duck.webp";
const ImgNghi = "https://assets.cuthongminh.com/games/learn-emotion/thoughtful.webp";
const ImgHoc = "https://assets.cuthongminh.com/games/learn-tones/words/hoc.webp";
const ImgHat = "https://assets.cuthongminh.com/games/learn-tones/words/hat.webp";
const ImgNga = "https://assets.cuthongminh.com/games/learn-tones/words/nga.webp";

export type ToneType = "ngang" | "sac" | "huyen" | "hoi" | "nga" | "nang";

export interface ToneWord extends EntityData {
  tone: ToneType;
  toneSymbol: string; // "", "´", "`", "?", "~", "."
  baseWord: string; // word without tone marks (simplified for display)
  spelling: string;
}

// Let's create pairs/words

export const WORDS_BY_TONE = [
  {
    id: "la",
    name: "Lá",
    spelling: "Lờ a la sắc lá",
    baseWord: "La",
    tone: "sac",
    toneSymbol: "´",
    image: ImgLa,
  },
  {
    id: "ran",
    name: "Rắn",
    spelling: "Rờ ăn răn sắc rắn",
    baseWord: "Ran",
    tone: "sac",
    toneSymbol: "´",
    image: ImgRan,
  },
  {
    id: "tao",
    name: "Táo",
    spelling: "Tờ ao tao sắc táo",
    baseWord: "Tao",
    tone: "sac",
    toneSymbol: "´",
    image: ImgTao,
  },

  // Huyền & Hỏi
  {
    id: "bo",
    name: "Bò",
    spelling: "Bờ o bo huyền bò",
    baseWord: "Bo",
    tone: "huyen",
    toneSymbol: "`",
    image: ImgBo,
  },
  {
    id: "rua",
    name: "Rùa",
    spelling: "Rờ ua rua huyền rùa",
    baseWord: "Rua",
    tone: "huyen",
    toneSymbol: "`",
    image: ImgRua,
  },
  {
    id: "meo",
    name: "Mèo",
    spelling: "Mờ eo meo huyền mèo",
    baseWord: "Meo",
    tone: "huyen",
    toneSymbol: "`",
    image: ImgMeo,
  },

  {
    id: "tu",
    name: "Hổ",
    spelling: "Hờ ô hô hỏi hổ",
    baseWord: "Ho",
    tone: "hoi",
    toneSymbol: "?",
    image: ImgTiger,
  },
  {
    id: "pho",
    name: "Phở",
    spelling: "Phờ ơ phơ hỏi phở",
    baseWord: "Pho",
    tone: "hoi",
    toneSymbol: "?",
    image: ImgPho,
  },
  {
    id: "khi",
    name: "Khỉ",
    spelling: "Khờ i khi hỏi khỉ",
    baseWord: "Khi",
    tone: "hoi",
    toneSymbol: "?",
    image: ImgKhi,
  },

  // Ngã & Nặng
  {
    id: "bao",
    name: "Bão",
    spelling: "Bờ ao bao ngã bão",
    baseWord: "Bao",
    tone: "nga",
    toneSymbol: "~",
    image: ImgBao,
  },
  {
    id: "nghi",
    name: "Nghĩ",
    spelling: "Nghờ i nghi ngã nghĩ",
    baseWord: "Nghi",
    tone: "nga",
    toneSymbol: "~",
    image: ImgNghi,
  },
  {
    id: "nga",
    name: "Ngã",
    spelling: "Ngờ a nga ngã ngã",
    baseWord: "Nga",
    tone: "nga",
    toneSymbol: "~",
    image: ImgNga,
  },

  {
    id: "vit",
    name: "Vịt",
    spelling: "Vờ it vit nặng vịt",
    baseWord: "Vit",
    tone: "nang",
    toneSymbol: ".",
    image: ImgVit,
  },
  {
    id: "hat",
    name: "Hạt",
    spelling: "Hờ át hát nặng hạt",
    baseWord: "Hat",
    tone: "nang",
    toneSymbol: ".",
    image: ImgHat,
  },
  {
    id: "hoc",
    name: "Học",
    spelling: "Hờ oc hóc nặng học",
    baseWord: "Hoc",
    tone: "nang",
    toneSymbol: ".",
    image: ImgHoc,
  },
] as ToneWord[];

export interface GroupData {
  id: string;
  title: string;
  description: string;
  logo: string | StaticImageData;
  variant: "green" | "blue" | "purple" | "orange";
  tones: ToneType[];
}

export const GROUPS: GroupData[] = [
  {
    id: "group_sac",
    title: "Dấu Sắc",
    description: "Học nhận biết dấu sắc `´`",
    tones: ["sac"],
    logo: LogoGroup1,
    variant: "blue",
  },
  {
    id: "group_huyen",
    title: "Dấu Huyền",
    description: "Học nhận biết dấu huyền `` ` ``",
    tones: ["huyen"],
    logo: LogoGroup2,
    variant: "orange",
  },
  {
    id: "group_hoi",
    title: "Dấu Hỏi",
    description: "Học nhận biết dấu hỏi `?`",
    tones: ["hoi"],
    logo: LogoGroup3,
    variant: "purple",
  },
  {
    id: "group_nga",
    title: "Dấu Ngã",
    description: "Học nhận biết dấu ngã `~`",
    tones: ["nga"],
    logo: LogoGroup4,
    variant: "green",
  },
  {
    id: "group_nang",
    title: "Dấu Nặng",
    description: "Học nhận biết thanh nặng `.`",
    tones: ["nang"],
    logo: LogoGroup5,
    variant: "orange",
  },
];

export function getWordsForGroup(groupId: string): ToneWord[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return WORDS_BY_TONE.filter((word) => group.tones.includes(word.tone));
}
