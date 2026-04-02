import { StaticImageData } from "next/image";

// ── Logos ──
const Group1Logo = "https://assets.cuthongminh.com/games/learn-money/group1.webp";
const Group2Logo = "https://assets.cuthongminh.com/games/learn-money/group2.webp";
const Group3Logo = "https://assets.cuthongminh.com/games/learn-money/group3.webp";

// ── Bill Definitions ──
export interface BillDef {
  value: number;
  label: string;
  labelFull: string;
  color: string; // tailwind bg (CSS fallback)
  textColor: string; // tailwind text
  borderColor: string; // tailwind border
  imageFront: string; // mặt trước (front) — used in Explain lesson
  imageBack: string; // mặt sau (back) — used everywhere else
}

export const BILLS: BillDef[] = [
  {
    value: 1000,
    label: "1.000đ",
    labelFull: "Một nghìn đồng",
    color: "bg-green-100",
    textColor: "text-green-800",
    borderColor: "border-green-300",
    imageFront: "https://assets.cuthongminh.com/games/learn-money/1_000_f.webp",
    imageBack: "https://assets.cuthongminh.com/games/learn-money/1_000_b.webp",
  },
  {
    value: 2000,
    label: "2.000đ",
    labelFull: "Hai nghìn đồng",
    color: "bg-blue-100",
    textColor: "text-blue-800",
    borderColor: "border-blue-300",
    imageFront: "https://assets.cuthongminh.com/games/learn-money/2_000_f.webp",
    imageBack: "https://assets.cuthongminh.com/games/learn-money/2_000_b.webp",
  },
  {
    value: 5000,
    label: "5.000đ",
    labelFull: "Năm nghìn đồng",
    color: "bg-sky-200",
    textColor: "text-sky-900",
    borderColor: "border-sky-400",
    imageFront: "https://assets.cuthongminh.com/games/learn-money/5_000_f.webp",
    imageBack: "https://assets.cuthongminh.com/games/learn-money/5_000_b.webp",
  },
  {
    value: 10000,
    label: "10.000đ",
    labelFull: "Mười nghìn đồng",
    color: "bg-amber-100",
    textColor: "text-amber-800",
    borderColor: "border-amber-300",
    imageFront: "https://assets.cuthongminh.com/games/learn-money/10_000_f.webp",
    imageBack: "https://assets.cuthongminh.com/games/learn-money/10_000_b.webp",
  },
  {
    value: 20000,
    label: "20.000đ",
    labelFull: "Hai mươi nghìn đồng",
    color: "bg-blue-200",
    textColor: "text-blue-900",
    borderColor: "border-blue-400",
    imageFront: "https://assets.cuthongminh.com/games/learn-money/20_000_f.webp",
    imageBack: "https://assets.cuthongminh.com/games/learn-money/20_000_b.webp",
  },
  {
    value: 50000,
    label: "50.000đ",
    labelFull: "Năm mươi nghìn đồng",
    color: "bg-pink-100",
    textColor: "text-pink-800",
    borderColor: "border-pink-300",
    imageFront: "https://assets.cuthongminh.com/games/learn-money/50_000_f.webp",
    imageBack: "https://assets.cuthongminh.com/games/learn-money/50_000_b.webp",
  },
  {
    value: 100000,
    label: "100.000đ",
    labelFull: "Một trăm nghìn đồng",
    color: "bg-emerald-200",
    textColor: "text-emerald-900",
    borderColor: "border-emerald-400",
    imageFront: "https://assets.cuthongminh.com/games/learn-money/100_000_f.webp",
    imageBack: "https://assets.cuthongminh.com/games/learn-money/100_000_b.webp",
  },
  {
    value: 200000,
    label: "200.000đ",
    labelFull: "Hai trăm nghìn đồng",
    color: "bg-red-100",
    textColor: "text-red-800",
    borderColor: "border-red-300",
    imageFront: "https://assets.cuthongminh.com/games/learn-money/200_000_f.webp",
    imageBack: "https://assets.cuthongminh.com/games/learn-money/200_000_b.webp",
  },
  {
    value: 500000,
    label: "500.000đ",
    labelFull: "Năm trăm nghìn đồng",
    color: "bg-teal-200",
    textColor: "text-teal-900",
    borderColor: "border-teal-400",
    imageFront: "https://assets.cuthongminh.com/games/learn-money/500_000_f.webp",
    imageBack: "https://assets.cuthongminh.com/games/learn-money/500_000_b.webp",
  },
];

export function getBill(value: number): BillDef {
  return BILLS.find((b) => b.value === value) ?? BILLS[0];
}

// ── Group Config ──
export interface MoneyGroupConfig {
  title: string;
  lessons: Array<{ id: string; title: string; icon: string }>;
}

export interface GroupData {
  id: string;
  title: string;
  description: string;
  subtitle?: string;
  variant: "green" | "orange" | "purple" | "blue";
  logo: string | StaticImageData;
}

export const GROUPS: GroupData[] = [
  {
    id: "group1",
    title: "Nhận Biết Tiền",
    description: "9 mệnh giá",
    subtitle: "💵",
    variant: "green",
    logo: Group1Logo,
  },
  {
    id: "group2",
    title: "Kỹ Năng Tiền",
    description: "Xếp, đổi, so sánh",
    subtitle: "🧠",
    variant: "orange",
    logo: Group2Logo,
  },
  {
    id: "group3",
    title: "Đi Chợ Cùng Cú",
    description: "Mua hàng & tính tiền",
    subtitle: "🛒",
    variant: "purple",
    logo: Group3Logo,
  },
];

export const GROUP_CONFIG: Record<string, MoneyGroupConfig> = {
  group1: {
    title: "Nhận Biết Tiền",
    lessons: [
      { id: "lesson1", title: "Học nhận biết", icon: "BookOpen" },
      { id: "lesson2", title: "Đây là bao nhiêu?", icon: "Eye" },
    ],
  },
  group2: {
    title: "Kỹ Năng Tiền",
    lessons: [
      { id: "lesson1", title: "Xếp tiền nhỏ→lớn", icon: "ArrowUpDown" },
      { id: "lesson2", title: "Đổi tiền", icon: "ArrowLeftRight" },
      { id: "lesson3", title: "Ai nhiều hơn?", icon: "Scale" },
    ],
  },
  group3: {
    title: "Đi Chợ Cùng Cú",
    lessons: [
      { id: "lesson1", title: "Mua 1 món", icon: "ShoppingCart" },
      { id: "lesson2", title: "Gộp tiền", icon: "Calculator" },
      { id: "lesson3", title: "Tiền thừa", icon: "ReceiptText" },
    ],
  },
};

// ── Shop Items ──
export interface ShopItem {
  name: string;
  price: number;
  emoji: string;
}

export const SHOP_ITEMS: ShopItem[] = [
  { name: "Kẹo", price: 1000, emoji: "🍬" },
  { name: "Bút chì", price: 2000, emoji: "✏️" },
  { name: "Ly sữa", price: 5000, emoji: "🥛" },
  { name: "Bánh mì", price: 10000, emoji: "🥖" },
  { name: "Nước ngọt", price: 10000, emoji: "🥤" },
  { name: "Kem", price: 15000, emoji: "🍦" },
  { name: "Bánh qui", price: 20000, emoji: "🍪" },
  { name: "Truyện tranh", price: 25000, emoji: "📚" },
  { name: "Bút màu", price: 30000, emoji: "🖍️" },
  { name: "Gấu bông", price: 50000, emoji: "🧸" },
];

// ── Utility ──
export function formatMoney(value: number): string {
  return value.toLocaleString("vi-VN") + "đ";
}

// Speak-friendly money text
export function speakMoney(value: number): string {
  const map: Record<number, string> = {
    1000: "một nghìn đồng",
    2000: "hai nghìn đồng",
    5000: "năm nghìn đồng",
    10000: "mười nghìn đồng",
    15000: "mười lăm nghìn đồng",
    20000: "hai mươi nghìn đồng",
    25000: "hai mươi lăm nghìn đồng",
    30000: "ba mươi nghìn đồng",
    50000: "năm mươi nghìn đồng",
    100000: "một trăm nghìn đồng",
    200000: "hai trăm nghìn đồng",
    500000: "năm trăm nghìn đồng",
  };
  return map[value] ?? `${formatMoney(value)}`;
}

// ── Question Generators ──

/** Pick random items from array */
function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/** Generate a bill quiz question */
export function generateBillQuiz(
  bills: BillDef[],
  prevKey?: string,
): { bill: BillDef; choices: BillDef[]; questionKey: string } {
  let bill: BillDef;
  let attempts = 0;
  do {
    bill = bills[Math.floor(Math.random() * bills.length)];
    attempts++;
  } while (`quiz-${bill.value}` === prevKey && attempts < 10);

  // 3 choices: 1 correct + 2 wrong
  const wrong = bills.filter((b) => b.value !== bill.value);
  const wrongPicks = pickRandom(wrong, 2);
  const choices = [bill, ...wrongPicks].sort(() => Math.random() - 0.5);

  return { bill, choices, questionKey: `quiz-${bill.value}` };
}

/** Generate a "sum these bills" question */
export function generateSumQuestion(
  allowedValues: number[],
  prevKey?: string,
): { shownBills: BillDef[]; total: number; choices: number[]; questionKey: string } {
  const count = Math.random() > 0.5 ? 2 : 3;
  let selectedValues: number[];
  let total: number;
  let key: string;
  let attempts = 0;

  do {
    selectedValues = Array.from(
      { length: count },
      () => allowedValues[Math.floor(Math.random() * allowedValues.length)],
    );
    total = selectedValues.reduce((a, b) => a + b, 0);
    key = `sum-${selectedValues.sort().join("-")}`;
    attempts++;
  } while (key === prevKey && attempts < 10);

  const shownBills = selectedValues.map((v) => getBill(v));

  // Generate 3 choices (1 correct + 2 wrong)
  const choices = new Set<number>([total]);
  while (choices.size < 3) {
    const offset = [1000, 2000, 5000, 10000][Math.floor(Math.random() * 4)];
    const wrong = Math.random() > 0.5 ? total + offset : total - offset;
    if (wrong > 0 && wrong !== total) choices.add(wrong);
  }

  return {
    shownBills,
    total,
    choices: Array.from(choices).sort(() => Math.random() - 0.5),
    questionKey: key,
  };
}

/** Generate a shopping question */
export function generateShoppingQuestion(prevKey?: string): {
  item: ShopItem;
  correctBill: BillDef;
  choices: BillDef[];
  questionKey: string;
} {
  let item: ShopItem;
  let attempts = 0;

  do {
    item = SHOP_ITEMS[Math.floor(Math.random() * SHOP_ITEMS.length)];
    attempts++;
  } while (`shop-${item.name}` === prevKey && attempts < 10);

  // Find the smallest bill that can pay for this item
  const validBills = BILLS.filter((b) => b.value >= item.price);
  const correctBill = validBills[0]; // smallest valid bill

  // 3 choices: correct + 2 wrong
  const allBills = BILLS.filter((b) => b.value !== correctBill.value);
  const wrongPicks = pickRandom(allBills, 2);
  const choices = [correctBill, ...wrongPicks].sort(() => Math.random() - 0.5);

  return { item, correctBill, choices, questionKey: `shop-${item.name}` };
}

/** Generate a change question */
export function generateChangeQuestion(prevKey?: string): {
  item: ShopItem;
  paidBill: BillDef;
  change: number;
  choices: number[];
  questionKey: string;
} {
  // Filter items where we can give a bigger bill
  const validPairs: { item: ShopItem; bill: BillDef }[] = [];
  for (const item of SHOP_ITEMS) {
    for (const bill of BILLS) {
      if (bill.value > item.price && bill.value - item.price > 0) {
        validPairs.push({ item, bill });
      }
    }
  }

  let pair: { item: ShopItem; bill: BillDef };
  let attempts = 0;
  do {
    pair = validPairs[Math.floor(Math.random() * validPairs.length)];
    attempts++;
  } while (`change-${pair.item.name}-${pair.bill.value}` === prevKey && attempts < 10);

  const change = pair.bill.value - pair.item.price;

  const choices = new Set<number>([change]);
  while (choices.size < 3) {
    const offset = [1000, 2000, 5000][Math.floor(Math.random() * 3)];
    const wrong = Math.random() > 0.5 ? change + offset : change - offset;
    if (wrong > 0 && wrong !== change) choices.add(wrong);
  }

  return {
    item: pair.item,
    paidBill: pair.bill,
    change,
    choices: Array.from(choices).sort(() => Math.random() - 0.5),
    questionKey: `change-${pair.item.name}-${pair.bill.value}`,
  };
}

/** Generate exchange question: "1 tờ X = mấy tờ Y?" */
export function generateExchangeQuestion(prevKey?: string): {
  bigBill: BillDef;
  smallBill: BillDef;
  answer: number;
  choices: number[];
  questionKey: string;
} {
  // Valid pairs where big / small is a whole number
  const pairs: { big: BillDef; small: BillDef; count: number }[] = [];
  for (const big of BILLS) {
    for (const small of BILLS) {
      if (big.value > small.value && big.value % small.value === 0) {
        const count = big.value / small.value;
        if (count >= 2 && count <= 10) {
          pairs.push({ big, small, count });
        }
      }
    }
  }

  let pair: { big: BillDef; small: BillDef; count: number };
  let attempts = 0;
  do {
    pair = pairs[Math.floor(Math.random() * pairs.length)];
    attempts++;
  } while (`exchange-${pair.big.value}-${pair.small.value}` === prevKey && attempts < 10);

  const choices = new Set<number>([pair.count]);
  while (choices.size < 3) {
    const offset = Math.floor(Math.random() * 3) + 1;
    const wrong = Math.random() > 0.5 ? pair.count + offset : pair.count - offset;
    if (wrong >= 2 && wrong <= 10 && wrong !== pair.count) choices.add(wrong);
  }

  return {
    bigBill: pair.big,
    smallBill: pair.small,
    answer: pair.count,
    choices: Array.from(choices).sort(() => Math.random() - 0.5),
    questionKey: `exchange-${pair.big.value}-${pair.small.value}`,
  };
}

/** Generate compare question: which group of bills has more money? */
export function generateCompareQuestion(prevKey?: string): {
  groupA: BillDef[];
  groupB: BillDef[];
  totalA: number;
  totalB: number;
  answer: "A" | "B";
  questionKey: string;
} {
  const smallBills = [1000, 2000, 5000, 10000, 20000];
  let totalA: number, totalB: number;
  let billsA: number[], billsB: number[];
  let attempts = 0;
  let key: string;

  do {
    const countA = Math.floor(Math.random() * 2) + 2; // 2-3
    const countB = Math.floor(Math.random() * 2) + 2;
    billsA = Array.from({ length: countA }, () => smallBills[Math.floor(Math.random() * smallBills.length)]);
    billsB = Array.from({ length: countB }, () => smallBills[Math.floor(Math.random() * smallBills.length)]);
    totalA = billsA.reduce((a, b) => a + b, 0);
    totalB = billsB.reduce((a, b) => a + b, 0);
    key = `compare-${totalA}-${totalB}`;
    attempts++;
  } while ((totalA === totalB || key === prevKey) && attempts < 20);

  return {
    groupA: billsA.map((v) => getBill(v)),
    groupB: billsB.map((v) => getBill(v)),
    totalA,
    totalB,
    answer: totalA > totalB ? "A" : "B",
    questionKey: key,
  };
}
