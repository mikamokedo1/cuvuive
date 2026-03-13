import { StaticImageData } from "next/image";

// Import group logos
const LogoGroup1 = "https://assets.cuthongminh.com/games/learn-flag/group1.webp"; // Asia
const LogoGroup2 = "https://assets.cuthongminh.com/games/learn-flag/group2.webp"; // Europe
const LogoGroup3 = "https://assets.cuthongminh.com/games/learn-flag/group3.webp"; // Americas
const LogoGroup4 = "https://assets.cuthongminh.com/games/learn-flag/group4.webp"; // Africa & Oceania

// Import Asia
const Vietnam = "https://assets.cuthongminh.com/games/learn-flag/vietnam.webp";
const Japan = "https://assets.cuthongminh.com/games/learn-flag/japan.webp";
const SouthKorea = "https://assets.cuthongminh.com/games/learn-flag/southkorea.webp";
const China = "https://assets.cuthongminh.com/games/learn-flag/china.webp";
const Thailand = "https://assets.cuthongminh.com/games/learn-flag/thailand.webp";
const India = "https://assets.cuthongminh.com/games/learn-flag/india.webp";

// Import Europe
const UK = "https://assets.cuthongminh.com/games/learn-flag/uk.webp";
const France = "https://assets.cuthongminh.com/games/learn-flag/france.webp";
const Germany = "https://assets.cuthongminh.com/games/learn-flag/germany.webp";
const Italy = "https://assets.cuthongminh.com/games/learn-flag/italy.webp";
const Spain = "https://assets.cuthongminh.com/games/learn-flag/spain.webp";
const Russia = "https://assets.cuthongminh.com/games/learn-flag/russia.webp";

// Import Americas
const USA = "https://assets.cuthongminh.com/games/learn-flag/usa.webp";
const Canada = "https://assets.cuthongminh.com/games/learn-flag/canada.webp";
const Brazil = "https://assets.cuthongminh.com/games/learn-flag/brazil.webp";
const Argentina = "https://assets.cuthongminh.com/games/learn-flag/argentina.webp";
const Mexico = "https://assets.cuthongminh.com/games/learn-flag/mexico.webp";
const Colombia = "https://assets.cuthongminh.com/games/learn-flag/colombia.webp";

// Import Africa & Oceania
const SouthAfrica = "https://assets.cuthongminh.com/games/learn-flag/southafrica.webp";
const Egypt = "https://assets.cuthongminh.com/games/learn-flag/egypt.webp";
const Australia = "https://assets.cuthongminh.com/games/learn-flag/australia.webp";
const Nigeria = "https://assets.cuthongminh.com/games/learn-flag/nigeria.webp";
const Morocco = "https://assets.cuthongminh.com/games/learn-flag/morocco.webp";
const Kenya = "https://assets.cuthongminh.com/games/learn-flag/kenya.webp";

import { EntityData } from "@/types/game";

export const FLAGS: EntityData[] = [
  // Asia
  { id: "vietnam", name: "Việt Nam", image: Vietnam, category: "asia" },
  { id: "japan", name: "Nhật Bản", image: Japan, category: "asia" },
  { id: "southkorea", name: "Hàn Quốc", image: SouthKorea, category: "asia" },
  { id: "china", name: "Trung Quốc", image: China, category: "asia" },
  { id: "thailand", name: "Thái Lan", image: Thailand, category: "asia" },
  { id: "india", name: "Ấn Độ", image: India, category: "asia" },

  // Europe
  { id: "uk", name: "Vương Quốc Anh", image: UK, category: "europe" },
  { id: "france", name: "Pháp", image: France, category: "europe" },
  { id: "germany", name: "Đức", image: Germany, category: "europe" },
  { id: "italy", name: "Ý", image: Italy, category: "europe" },
  { id: "spain", name: "Tây Ban Nha", image: Spain, category: "europe" },
  { id: "russia", name: "Nga", image: Russia, category: "europe" },

  // Americas
  { id: "usa", name: "Mỹ", image: USA, category: "americas" },
  { id: "canada", name: "Canada", image: Canada, category: "americas" },
  { id: "brazil", name: "Brazil", image: Brazil, category: "americas" },
  { id: "argentina", name: "Argentina", image: Argentina, category: "americas" },
  { id: "mexico", name: "Mexico", image: Mexico, category: "americas" },
  { id: "colombia", name: "Colombia", image: Colombia, category: "americas" },

  // Africa & Oceania
  { id: "southafrica", name: "Nam Phi", image: SouthAfrica, category: "afroceania" },
  { id: "egypt", name: "Ai Cập", image: Egypt, category: "afroceania" },
  { id: "australia", name: "Úc", image: Australia, category: "afroceania" },
  { id: "nigeria", name: "Nigeria", image: Nigeria, category: "afroceania" },
  { id: "morocco", name: "Ma-rốc", image: Morocco, category: "afroceania" },
  { id: "kenya", name: "Kenya", image: Kenya, category: "afroceania" },
];

export const GROUPS = [
  {
    id: "group1",
    title: "Châu Á",
    description: "Học các quốc kỳ Châu Á",
    animals: ["vietnam", "japan", "southkorea", "china", "thailand", "india"],
    logo: LogoGroup1,
    variant: "purple" as const,
  },
  {
    id: "group2",
    title: "Châu Âu",
    description: "Học các quốc kỳ Châu Âu",
    animals: ["uk", "france", "germany", "italy", "spain", "russia"],
    logo: LogoGroup2,
    variant: "blue" as const,
  },
  {
    id: "group3",
    title: "Châu Mỹ",
    description: "Học các quốc kỳ Châu Mỹ",
    animals: ["usa", "canada", "brazil", "argentina", "mexico", "colombia"],
    logo: LogoGroup3,
    variant: "green" as const,
  },
  {
    id: "group4",
    title: "Khác",
    description: "Học các quốc kỳ Châu Phi & Đại Dương",
    animals: ["southafrica", "egypt", "australia", "nigeria", "morocco", "kenya"],
    logo: LogoGroup4,
    variant: "orange" as const,
  },
];

export function getFlagsForGroup(groupId: string): EntityData[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return FLAGS.filter((flag) => group.animals.includes(flag.id));
}

// ──── Flag Descriptions (for explore lesson) ────
export const FLAG_DESCRIPTIONS: Record<string, string> = {
  // Asia
  vietnam: "Cờ đỏ sao vàng năm cánh. Ngôi sao tượng trưng cho sự đoàn kết của nhân dân Việt Nam!",
  japan: "Cờ Nhật Bản có hình tròn đỏ trên nền trắng, gọi là 'Mặt trời mọc'. Nhật Bản là xứ sở hoa anh đào!",
  southkorea: "Cờ Hàn Quốc có vòng tròn âm dương ở giữa và bốn quẻ ở bốn góc. Hàn Quốc nổi tiếng với K-pop!",
  china: "Cờ Trung Quốc có nền đỏ với ngôi sao vàng lớn và bốn sao nhỏ. Trung Quốc có Vạn Lý Trường Thành!",
  thailand: "Cờ Thái Lan có ba màu đỏ, trắng, xanh. Thái Lan được gọi là 'Xứ sở nụ cười'!",
  india: "Cờ Ấn Độ có ba sọc cam, trắng, xanh lá và bánh xe ở giữa. Ấn Độ có đền Taj Mahal nổi tiếng!",
  // Europe
  uk: "Cờ Vương quốc Anh gồm ba lá cờ chồng lên nhau, rất đặc biệt! Nước Anh có Nữ hoàng và Big Ben!",
  france: "Cờ Pháp có ba sọc xanh, trắng, đỏ. Pháp nổi tiếng với tháp Eiffel và bánh mì baguette!",
  germany: "Cờ Đức có ba sọc đen, đỏ, vàng. Đức nổi tiếng với xe hơi và bia!",
  italy: "Cờ Ý có ba sọc xanh lá, trắng, đỏ. Ý là quê hương của pizza và mì Ý!",
  spain: "Cờ Tây Ban Nha có hai sọc đỏ và một sọc vàng rộng ở giữa. Tây Ban Nha nổi tiếng với bóng đá!",
  russia: "Cờ Nga có ba sọc trắng, xanh, đỏ. Nga là nước rộng lớn nhất thế giới!",
  // Americas
  usa: "Cờ Mỹ có 50 ngôi sao cho 50 bang và 13 sọc cho 13 thuộc địa đầu tiên. Mỹ có tượng Nữ Thần Tự Do!",
  canada: "Cờ Canada có lá phong đỏ ở giữa. Canada nổi tiếng với siro phong và tuyết trắng!",
  brazil: "Cờ Brazil có hình quả cầu xanh trên nền vàng với dòng chữ 'Trật tự và Tiến bộ'. Brazil giỏi bóng đá!",
  argentina: "Cờ Argentina có hai sọc xanh nhạt và mặt trời ở giữa. Argentina nổi tiếng với điệu tango!",
  mexico: "Cờ Mexico có ba sọc xanh, trắng, đỏ với hình đại bàng ăn rắn ở giữa. Mexico có nhiều kim tự tháp cổ!",
  colombia: "Cờ Colombia có ba sọc vàng, xanh, đỏ, sọc vàng rộng nhất. Colombia nổi tiếng với cà phê ngon!",
  // Africa & Oceania
  southafrica: "Cờ Nam Phi có sáu màu rất rực rỡ, tượng trưng cho sự đa dạng. Nam Phi có nhiều động vật hoang dã!",
  egypt: "Cờ Ai Cập có ba sọc đỏ, trắng, đen với đại bàng vàng ở giữa. Ai Cập có kim tự tháp cổ đại!",
  australia: "Cờ Úc có ngôi sao lớn và chòm sao Thập Tự phương Nam. Úc có chuột túi kangaroo!",
  nigeria: "Cờ Nigeria có hai sọc xanh lá và một sọc trắng ở giữa. Nigeria là nước đông dân nhất châu Phi!",
  morocco: "Cờ Ma-rốc có nền đỏ với ngôi sao xanh năm cánh ở giữa. Ma-rốc nổi tiếng với sa mạc Sahara!",
  kenya: "Cờ Kenya có nhiều sọc màu và chiếc khiên chiến binh ở giữa. Kenya nổi tiếng với đồng cỏ savanna!",
};
