import { StaticImageData } from "next/image";

// Import group logos
const LogoGroup1 = "https://assets.cuthongminh.com/games/learn-landmark/group1.webp"; // Asia
const LogoGroup2 = "https://assets.cuthongminh.com/games/learn-landmark/group2.webp"; // Europe
const LogoGroup3 = "https://assets.cuthongminh.com/games/learn-landmark/group3.webp"; // Americas & Others

// Group 1: Asia
const ImgGreatWall = "https://assets.cuthongminh.com/games/learn-landmark/greatwall.webp";
const ImgAngkorWat = "https://assets.cuthongminh.com/games/learn-landmark/angkorwat.webp";
const ImgTajMahal = "https://assets.cuthongminh.com/games/learn-landmark/tajmahal.webp";
const ImgMtFuji = "https://assets.cuthongminh.com/games/learn-landmark/mtfuji.webp";
const ImgHaLongBay = "https://assets.cuthongminh.com/games/learn-landmark/halongbay.webp";
const ImgPhuket = "https://assets.cuthongminh.com/games/learn-landmark/phuket.webp";

// Group 2: Europe
const ImgEiffelTower = "https://assets.cuthongminh.com/games/learn-landmark/eiffeltower.webp";
const ImgColosseum = "https://assets.cuthongminh.com/games/learn-landmark/colosseum.webp";
const ImgBigBen = "https://assets.cuthongminh.com/games/learn-landmark/bigben.webp";
const ImgLeaningTower = "https://assets.cuthongminh.com/games/learn-landmark/leaningtower.webp";
const ImgWindmills = "https://assets.cuthongminh.com/games/learn-landmark/windmills.webp";
const ImgSagradaFamilia = "https://assets.cuthongminh.com/games/learn-landmark/sagradafamilia.webp";

// Group 3: Americas & Others
const ImgStatueOfLiberty = "https://assets.cuthongminh.com/games/learn-landmark/statueofliberty.webp";
const ImgChristTheRedeemer = "https://assets.cuthongminh.com/games/learn-landmark/christtheredeemer.webp";
const ImgChichenItza = "https://assets.cuthongminh.com/games/learn-landmark/chichenitza.webp";
// Group 3 continued
const ImgMachuPicchu = "https://assets.cuthongminh.com/games/learn-landmark/machupicchu.webp";
const ImgSydneyOperaHouse = "https://assets.cuthongminh.com/games/learn-landmark/sydneyoperahouse.webp";
const ImgMoai = "https://assets.cuthongminh.com/games/learn-landmark/moai.webp";

import { EntityData } from "@/types/game";

export const LANDMARKS: EntityData[] = [
  // Asia
  { id: "greatwall", name: "Vạn Lý Trường Thành", image: ImgGreatWall, category: "asia" },
  { id: "angkorwat", name: "Angkor quát", image: ImgAngkorWat, category: "asia" },
  { id: "tajmahal", name: "Ta Ma ha", image: ImgTajMahal, category: "asia" },
  { id: "mtfuji", name: "Núi Phú Sĩ", image: ImgMtFuji, category: "asia" },
  { id: "halongbay", name: "Vịnh Hạ Long", image: ImgHaLongBay, category: "asia" },
  { id: "phuket", name: "Voi Đá Phuket", image: ImgPhuket, category: "asia" },

  // Europe
  { id: "eiffeltower", name: "Tháp ép phen", image: ImgEiffelTower, category: "europe" },
  { id: "colosseum", name: "Đấu Trường La Mã", image: ImgColosseum, category: "europe" },
  { id: "bigben", name: "Tháp Bíc Ben", image: ImgBigBen, category: "europe" },
  { id: "leaningtower", name: "Tháp Nghiêng Pi sa", image: ImgLeaningTower, category: "europe" },
  { id: "windmills", name: "Cối Xay Gió", image: ImgWindmills, category: "europe" },
  { id: "sagradafamilia", name: "sa gra da fa mi li a", image: ImgSagradaFamilia, category: "europe" },

  // Americas & Others
  { id: "statueofliberty", name: "Nữ Thần Tự Do", image: ImgStatueOfLiberty, category: "americas" },
  { id: "chichenitza", name: "Chi chen It da", image: ImgChichenItza, category: "americas" },
  { id: "christtheredeemer", name: "Chúa Cứu Thế", image: ImgChristTheRedeemer, category: "americas" },
  { id: "machupicchu", name: "Ma chu Pic chu", image: ImgMachuPicchu, category: "americas" },
  { id: "sydneyoperahouse", name: "Nhà Hát Sít ni", image: ImgSydneyOperaHouse, category: "americas" },
  { id: "moai", name: "Tượng Moai", image: ImgMoai, category: "americas" },
];

export const GROUPS = [
  {
    id: "group1",
    title: "Châu Á",
    description: "Khám phá các địa danh Châu Á",
    items: ["greatwall", "angkorwat", "tajmahal", "mtfuji", "halongbay", "phuket"],
    logo: LogoGroup1,
    variant: "purple" as const,
  },
  {
    id: "group2",
    title: "Châu Âu",
    description: "Khám phá các địa danh Châu Âu",
    items: ["eiffeltower", "colosseum", "bigben", "leaningtower", "windmills", "sagradafamilia"],
    logo: LogoGroup2,
    variant: "blue" as const,
  },
  {
    id: "group3",
    title: "Châu Mỹ & Khác",
    description: "Khám phá các địa danh Châu Mỹ & Khác",
    items: ["statueofliberty", "chichenitza", "christtheredeemer", "machupicchu", "sydneyoperahouse", "moai"],
    logo: LogoGroup3,
    variant: "green" as const,
  },
];

export function getLandmarksForGroup(groupId: string): EntityData[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return LANDMARKS.filter((landmark) => group.items.includes(landmark.id));
}

// ──── Landmark Descriptions (for explore lesson) ────
export const LANDMARK_DESCRIPTIONS: Record<string, string> = {
  // Asia
  greatwall:
    "Vạn Lý Trường Thành ở Trung Quốc dài hơn 21.000 km, được xây hàng ngàn năm trước để bảo vệ đất nước bởi vua tần thủy hoàng",
  angkorwat: "Angkor quát ở Campuchia là ngôi đền lớn nhất thế giới. Nhìn bóng đền in trên mặt hồ đẹp lắm!",
  tajmahal:
    "Ta Ma ha ở Ấn Độ được xây bằng đá cẩm thạch trắng. Đây là món quà tình yêu của một vị vua dành cho hoàng hậu.",
  mtfuji: "Núi Phú Sĩ là ngọn núi cao nhất Nhật Bản, đỉnh luôn phủ tuyết trắng. Người Nhật rất yêu quý ngọn núi này!",
  halongbay: "Vịnh Hạ Long ở Việt Nam có gần 2.000 hòn đảo đá nhô lên giữa biển xanh. Tuyệt đẹp!",
  phuket: "Phu ket là hòn đảo lớn nhất Thái Lan với bãi biển cát trắng và nước biển trong vắt. Thiên đường nghỉ mát!",

  // Europe
  eiffeltower: "Tháp ép phen ở Pa ri, Pháp cao 330 mét, được làm bằng sắt. Đêm đến, tháp lấp lánh ánh đèn rất đẹp!",
  colosseum: "Đấu trường La Mã ở Ý được xây gần 2.000 năm trước. Ngày xưa, người ta xem các võ sĩ thi đấu ở đây!",
  bigben: "Tháp Bíc Ben ở Luân Đôn, Anh có chuông nặng 13 tấn! Tiếng chuông vang xa cả thành phố.",
  leaningtower: "Tháp nghiêng Pi sa ở Ý bị nghiêng vì đất mềm bên dưới. Tháp nghiêng nhưng không đổ, thú vị lắm!",
  windmills: "Cối xay gió ở Hà Lan dùng sức gió để bơm nước và xay bột. Trông như những chiếc quạt khổng lồ!",
  sagradafamilia: "Nhà thờ Sagrada Familia ở Tây Ban Nha được xây hơn 140 năm mà vẫn chưa xong! Kiến trúc rất độc đáo.",

  // Americas & Others
  statueofliberty: "Tượng Nữ Thần Tự Do ở New York, Mỹ cao 93 mét. Bà cầm đuốc sáng chào đón mọi người!",
  chichenitza: "Chi chen It da ở Mexico là kim tự tháp bậc thang của người Maya cổ đại. Mỗi bậc là một ngày trong năm!",
  christtheredeemer:
    "Tượng Chúa Cứu Thế ở Brazil đứng trên đỉnh núi, dang rộng hai tay ôm cả thành phố Rio de Janeiro!",
  machupicchu: "Ma chu Pic chu ở Peru là thành phố cổ nằm trên đỉnh núi cao, ẩn mình trong mây. Bí ẩn lắm!",
  sydneyoperahouse: "Nhà hát Sít ni ở Úc có mái nhà hình cánh buồm trắng. Trông như những con thuyền đang lướt sóng!",
  moai: "Tượng Moai trên đảo Phục Sinh là những bức tượng đá khổng lồ bí ẩn. Không ai biết chắc ai đã tạo ra chúng!",
};
