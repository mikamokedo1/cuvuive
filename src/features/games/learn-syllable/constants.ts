import { StaticImageData } from "next/image";
import { EntityData } from "@/types/game";

// Group logos — will be updated after generation
const LogoGroup1 = "https://assets.cuthongminh.com/games/learn-syllable/group1.webp";
const LogoGroup2 = "https://assets.cuthongminh.com/games/learn-syllable/group2.webp";
const LogoGroup3 = "https://assets.cuthongminh.com/games/learn-syllable/group3.webp";
const LogoGroup4 = "https://assets.cuthongminh.com/games/learn-syllable/group4.webp";
const LogoGroup5 = "https://assets.cuthongminh.com/games/learn-syllable/group5.webp";
const LogoGroup6 = "https://assets.cuthongminh.com/games/learn-syllable/group6.webp";

// ===== Reusable assets from other games =====
const ImgCrab = "https://assets.cuthongminh.com/games/learn-animal/crab.webp";
const ImgTurtle = "https://assets.cuthongminh.com/games/learn-animal/turtle.webp";
const ImgBanana = "https://assets.cuthongminh.com/games/learn-fruit/banana.webp";
const ImgPomelo = "https://assets.cuthongminh.com/games/learn-fruit/pomelo.webp";
const ImgApple = "https://assets.cuthongminh.com/games/learn-fruit/apple.webp";
const ImgCat = "https://assets.cuthongminh.com/games/learn-animal/cat.webp";
const ImgOrange = "https://assets.cuthongminh.com/games/learn-fruit/orange.webp";
const ImgHat = "https://assets.cuthongminh.com/games/learn-tones/words/hat.webp";
const ImgDuck = "https://assets.cuthongminh.com/games/learn-animal/duck.webp";
const ImgBee = "https://assets.cuthongminh.com/games/learn-alphabet/ong.webp";

// ===== New assets for compound syllables =====
const ImgDieu = "https://assets.cuthongminh.com/games/learn-syllable/dieu.webp";
const ImgYeu = "https://assets.cuthongminh.com/games/learn-syllable/yeu.webp";
const ImgTien = "https://assets.cuthongminh.com/games/learn-syllable/tien.webp";
const ImgYen = "https://assets.cuthongminh.com/games/learn-syllable/yen.webp";
const ImgViet = "https://assets.cuthongminh.com/games/learn-syllable/viet.webp";
const ImgYem = "https://assets.cuthongminh.com/games/learn-syllable/yem.webp";
const ImgCuon = "https://assets.cuthongminh.com/games/learn-syllable/cuon.webp";
const ImgBuom_sail = "https://assets.cuthongminh.com/games/learn-syllable/buom_sail.webp";
const ImgChuot = "https://assets.cuthongminh.com/games/learn-syllable/chuot.webp";
const ImgThuoc = "https://assets.cuthongminh.com/games/learn-syllable/thuoc.webp";
const ImgLuon = "https://assets.cuthongminh.com/games/learn-syllable/luon.webp";
const ImgDuong = "https://assets.cuthongminh.com/games/learn-syllable/duong.webp";
const ImgBuom = "https://assets.cuthongminh.com/games/learn-syllable/buom.webp";
const ImgNuoc = "https://assets.cuthongminh.com/games/learn-syllable/nuoc.webp";
const ImgKhoai = "https://assets.cuthongminh.com/games/learn-syllable/khoai.webp";
const ImgKhoan = "https://assets.cuthongminh.com/games/learn-syllable/khoan.webp";
const ImgXoan = "https://assets.cuthongminh.com/games/learn-syllable/xoan.webp";
const ImgOanh = "https://assets.cuthongminh.com/games/learn-syllable/oanh.webp";
const ImgUyen = "https://assets.cuthongminh.com/games/learn-syllable/uyen.webp";
const ImgTuyet = "https://assets.cuthongminh.com/games/learn-syllable/tuyet.webp";
const ImgKhuya = "https://assets.cuthongminh.com/games/learn-syllable/khuya.webp";
const ImgOi = "https://assets.cuthongminh.com/games/learn-syllable/oi.webp";
const ImgQuan = "https://assets.cuthongminh.com/games/learn-syllable/quan.webp";
const ImgLuat = "https://assets.cuthongminh.com/games/learn-syllable/luat.webp";
const ImgTiec = "https://assets.cuthongminh.com/games/learn-syllable/tiec.webp";
const ImgThiep = "https://assets.cuthongminh.com/games/learn-syllable/thiep.webp";
const ImgGieng = "https://assets.cuthongminh.com/games/learn-syllable/gieng.webp";
const ImgMuop = "https://assets.cuthongminh.com/games/learn-syllable/muop.webp";
const ImgXoay = "https://assets.cuthongminh.com/games/learn-syllable/xoay.webp";
const ImgKhoang = "https://assets.cuthongminh.com/games/learn-syllable/khoang.webp";
const ImgThoat = "https://assets.cuthongminh.com/games/learn-syllable/thoat.webp";
const ImgHuych = "https://assets.cuthongminh.com/games/learn-syllable/huych.webp";
const ImgHuyt = "https://assets.cuthongminh.com/games/learn-syllable/huyt.webp";

export interface SyllableData extends EntityData {
  syllable: string;
  spelling: string;
  fullSpelling: string;
}

export const SYLLABLES: SyllableData[] = [
  // ===== GROUP 1: Vần iê/yê =====
  {
    id: "ieu",
    syllable: "iêu",
    name: "Diều",
    spelling: "i ê u iêu",
    fullSpelling: "dờ iêu diêu huyền diều",
    image: ImgDieu,
    category: "group1",
  },
  {
    id: "yeu",
    syllable: "yêu",
    name: "Yêu",
    spelling: "i ê u iêu",
    fullSpelling: "i ê u iêu",
    image: ImgYeu,
    category: "group1",
  },
  {
    id: "ien",
    syllable: "iên",
    name: "Tiên",
    spelling: "i ê n iên",
    fullSpelling: "Tờ iên tiên",
    image: ImgTien,
    category: "group1",
  },
  {
    id: "yen",
    syllable: "yên",
    name: "Yên",
    spelling: "i ê n yên",
    fullSpelling: "i ê n yên",
    image: ImgYen,
    category: "group1",
  },
  {
    id: "iet",
    syllable: "iêt",
    name: "Viết",
    spelling: "i ê t iêt",
    fullSpelling: "v iêt viêt sắc viết",
    image: ImgViet,
    category: "group1",
  },
  {
    id: "iec",
    syllable: "iêc",
    name: "Tiệc",
    spelling: "i ê c iêc",
    fullSpelling: "tờ iêc tiếc nặng tiệc",
    image: ImgTiec,
    category: "group1",
  },
  {
    id: "iep",
    syllable: "iêp",
    name: "Thiệp",
    spelling: "i ê p iêp",
    fullSpelling: "thờ iêp thiêp nặng thiệp",
    image: ImgThiep,
    category: "group1",
  },
  {
    id: "yem",
    syllable: "yêm",
    name: "Yếm",
    spelling: "y ê m yêm",
    fullSpelling: "i ê m yêm sắc yếm",
    image: ImgYem,
    category: "group1",
  },
  {
    id: "ieng",
    syllable: "iêng",
    name: "Giếng",
    spelling: "i ê ng iêng",
    fullSpelling: "gi iêng giêng sắc giếng",
    image: ImgGieng,
    category: "group1",
  },

  // ===== GROUP 2: Vần uô =====
  {
    id: "ua_crab",
    syllable: "ua",
    name: "Cua",
    spelling: "u a ua",
    fullSpelling: "cờ ua cua",
    image: ImgCrab,
    category: "group2",
  },
  {
    id: "uoi",
    syllable: "uôi",
    name: "Chuối",
    spelling: "u ô i uôi",
    fullSpelling: "chờ uôi chuôi sắc chuối",
    image: ImgBanana,
    category: "group2",
  },
  {
    id: "uon",
    syllable: "uôn",
    name: "Cuốn",
    spelling: "u ô n uôn",
    fullSpelling: "cờ uôn cuôn sắc cuốn",
    image: ImgCuon,
    category: "group2",
  },
  {
    id: "uom",
    syllable: "uôm",
    name: "Buồm",
    spelling: "u ô m uôm",
    fullSpelling: "bờ uôm buôm huyền buồm",
    image: ImgBuom_sail,
    category: "group2",
  },
  {
    id: "uot",
    syllable: "uôt",
    name: "Chuột",
    spelling: "u ô t uôt",
    fullSpelling: "chờ uôt chuôt nặng chuột",
    image: ImgChuot,
    category: "group2",
  },
  {
    id: "uoc",
    syllable: "uôc",
    name: "Thuốc",
    spelling: "u ô c uôc",
    fullSpelling: "thờ uôc thuôc sắc thuốc",
    image: ImgThuoc,
    category: "group2",
  },

  // ===== GROUP 3: Vần ươ =====
  {
    id: "uoi_buoi",
    syllable: "ươi",
    name: "Bưởi",
    spelling: "u ơ i ươi",
    fullSpelling: "bờ ươi bươi hỏi bưởi",
    image: ImgPomelo,
    category: "group3",
  },
  {
    id: "uon_luon",
    syllable: "ươn",
    name: "Lươn",
    spelling: "ư ơ n ươn",
    fullSpelling: "lờ ươn lươn",
    image: ImgLuon,
    category: "group3",
  },
  {
    id: "uong",
    syllable: "ương",
    name: "Đường",
    spelling: "u ơ ng ương",
    fullSpelling: "đờ ương đương huyền đường",
    image: ImgDuong,
    category: "group3",
  },
  {
    id: "uom_buom",
    syllable: "ươm",
    name: "Bướm",
    spelling: "u ơ m ươm",
    fullSpelling: "bờ ươm bươm sắc bướm",
    image: ImgBuom,
    category: "group3",
  },
  {
    id: "uoc_nuoc",
    syllable: "ươc",
    name: "Nước",
    spelling: "ư ơ c ươc",
    fullSpelling: "nờ ươc nươc sắc nước",
    image: ImgNuoc,
    category: "group3",
  },
  {
    id: "uop",
    syllable: "ươp",
    name: "Mướp",
    spelling: "ư ơ pờ ươp",
    fullSpelling: "mờ ươp mươp sắc mướp",
    image: ImgMuop,
    category: "group3",
  },

  // ===== GROUP 4: Vần oa =====
  {
    id: "ao",
    syllable: "ao",
    name: "Táo",
    spelling: "a o ao",
    fullSpelling: "tờ ao tao sắc táo",
    image: ImgApple,
    category: "group4",
  },
  {
    id: "eo",
    syllable: "eo",
    name: "Mèo",
    spelling: "e o eo",
    fullSpelling: "mờ eo meo huyền mèo",
    image: ImgCat,
    category: "group4",
  },
  {
    id: "oai",
    syllable: "oai",
    name: "Khoai",
    spelling: "o a i oai",
    fullSpelling: "khờ oai khoai",
    image: ImgKhoai,
    category: "group4",
  },
  {
    id: "oay",
    syllable: "oay",
    name: "Xoay",
    spelling: "o a i ay",
    fullSpelling: "xờ ay xoay",
    image: ImgXoay,
    category: "group4",
  },
  {
    id: "oan",
    syllable: "oan",
    name: "Khoan",
    spelling: "o a n oan",
    fullSpelling: "khờ oan khoan",
    image: ImgKhoan,
    category: "group4",
  },
  {
    id: "oan_xoan",
    syllable: "oăn",
    name: "Xoăn",
    spelling: "o ắ n oăn",
    fullSpelling: "xờ oăn xoăn",
    image: ImgXoan,
    category: "group4",
  },
  {
    id: "oang",
    syllable: "oang",
    name: "Khoang miệng",
    spelling: "o a ng oang",
    fullSpelling: "khờ oang khoang",
    image: ImgKhoang,
    category: "group4",
  },
  {
    id: "oanh",
    syllable: "oanh",
    name: "Chim Oanh",
    spelling: "o a nh oanh",
    fullSpelling: "o a nh oanh",
    image: ImgOanh,
    category: "group4",
  },
  {
    id: "oat",
    syllable: "oat",
    name: "Thoát",
    spelling: "o a t oat",
    fullSpelling: "thờ oat thoat sắc thoát",
    image: ImgThoat,
    category: "group4",
  },

  // ===== GROUP 5: Vần uy =====
  {
    id: "uyen",
    syllable: "uyen",
    name: "Uyên ương",
    spelling: "u i ê n uyên",
    fullSpelling: "u i ê n uyên",
    image: ImgUyen,
    category: "group5",
  },
  {
    id: "uych",
    syllable: "uych",
    name: "Huých vai",
    spelling: "u i chờ uych",
    fullSpelling: "hờ uych huych sắc huých",
    image: ImgHuych,
    category: "group5",
  },
  {
    id: "uyet",
    syllable: "uyêt",
    name: "Tuyết",
    spelling: "u i ê t uyêt",
    fullSpelling: "tờ uyêt tuyêt sắc tuyết",
    image: ImgTuyet,
    category: "group5",
  },
  {
    id: "uya",
    syllable: "uya",
    name: "Khuya",
    spelling: "u i a uya",
    fullSpelling: "khờ uya khuya",
    image: ImgKhuya,
    category: "group5",
  },
  {
    id: "uyt",
    syllable: "uyt",
    name: "Huýt sáo",
    spelling: "u i t uyt",
    fullSpelling: "hờ uyt huyt sắc huýt",
    image: ImgHuyt,
    category: "group5",
  },

  // ===== GROUP 6: Vần khác =====
  {
    id: "am",
    syllable: "am",
    name: "Cam",
    spelling: "a m am",
    fullSpelling: "cờ am cam",
    image: ImgOrange,
    category: "group6",
  },
  {
    id: "at",
    syllable: "at",
    name: "Hạt",
    spelling: "a t at",
    fullSpelling: "hờ at hat nặng hạt",
    image: ImgHat,
    category: "group6",
  },
  {
    id: "it",
    syllable: "it",
    name: "Vịt",
    spelling: "i t it",
    fullSpelling: "vờ it vit nặng vịt",
    image: ImgDuck,
    category: "group6",
  },
  {
    id: "ong",
    syllable: "ong",
    name: "Ong",
    spelling: "o ng ong",
    fullSpelling: "o ng ong",
    image: ImgBee,
    category: "group6",
  },
  {
    id: "oi",
    syllable: "oi",
    name: "Oi bức",
    spelling: "o i oi",
    fullSpelling: "o i oi",
    image: ImgOi,
    category: "group6",
  },
  {
    id: "uan",
    syllable: "uân",
    name: "Quân",
    spelling: "u â n uân",
    fullSpelling: "quờ uân quân",
    image: ImgQuan,
    category: "group6",
  },
  {
    id: "uat",
    syllable: "uât",
    name: "Luật",
    spelling: "u â t uất",
    fullSpelling: "lờ uât luât nặng luật",
    image: ImgLuat,
    category: "group6",
  },
];

export interface GroupData {
  id: string;
  title: string;
  description: string;
  logo: string | StaticImageData;
  variant: "green" | "blue" | "purple" | "orange";
  syllables: string[];
}

export const GROUPS: GroupData[] = [
  {
    id: "group1",
    title: "Vần iê/yê",
    description: "Học các vần có nguyên âm iê, yê",
    syllables: ["ieu", "yeu", "ien", "yen", "iet", "iec", "iep", "yem", "ieng"],
    logo: LogoGroup1,
    variant: "green",
  },
  {
    id: "group2",
    title: "Vần uô",
    description: "Học các vần có nguyên âm uô",
    syllables: ["ua_crab", "uoi", "uon", "uom", "uot", "uoc"],
    logo: LogoGroup2,
    variant: "blue",
  },
  {
    id: "group3",
    title: "Vần ươ",
    description: "Học các vần có nguyên âm ươ",
    syllables: ["uoi_buoi", "uon_luon", "uong", "uom_buom", "uoc_nuoc", "uop"],
    logo: LogoGroup3,
    variant: "purple",
  },
  {
    id: "group4",
    title: "Vần oa",
    description: "Học các vần có nguyên âm oa, ao, eo",
    syllables: ["ao", "eo", "oai", "oay", "oan", "oan_xoan", "oang", "oanh", "oat"],
    logo: LogoGroup4,
    variant: "orange",
  },
  {
    id: "group5",
    title: "Vần uy",
    description: "Học các vần có nguyên âm uy",
    syllables: ["uyen", "uych", "uyet", "uya", "uyt"],
    logo: LogoGroup5,
    variant: "green",
  },
  {
    id: "group6",
    title: "Vần khác",
    description: "Học các vần có âm cuối và vần đặc biệt",
    syllables: ["am", "at", "it", "ong", "oi", "uan", "uat"],
    logo: LogoGroup6,
    variant: "blue",
  },
];

export function getSyllablesForGroup(groupId: string): SyllableData[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return SYLLABLES.filter((s) => group.syllables.includes(s.id));
}
