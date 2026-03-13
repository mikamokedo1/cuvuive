import { StaticImageData } from "next/image";

// Import group logos
const LogoGroup1 = "https://assets.cuthongminh.com/games/learn-animal/group1.webp";
const LogoGroup2 = "https://assets.cuthongminh.com/games/learn-animal/group2.webp";
const LogoGroup3 = "https://assets.cuthongminh.com/games/learn-animal/group3.webp";

// Import Farm Animals (Group 1)
const Chicken = "https://assets.cuthongminh.com/games/learn-animal/chicken.webp";
const Duck = "https://assets.cuthongminh.com/games/learn-animal/duck.webp";
const Cow = "https://assets.cuthongminh.com/games/learn-animal/cow.webp";
const Pig = "https://assets.cuthongminh.com/games/learn-animal/pig.webp";
const Dog = "https://assets.cuthongminh.com/games/learn-animal/dog.webp";
const Cat = "https://assets.cuthongminh.com/games/learn-animal/cat.webp";
//fish
const Fish = "https://assets.cuthongminh.com/games/learn-animal/fish.webp";
const Dolphin = "https://assets.cuthongminh.com/games/learn-animal/dolphin.webp";
const Shark = "https://assets.cuthongminh.com/games/learn-animal/shark.webp";
const SeaTurtle = "https://assets.cuthongminh.com/games/learn-animal/turtle.webp";
const Octopus = "https://assets.cuthongminh.com/games/learn-animal/octopus.webp";
const Starfish = "https://assets.cuthongminh.com/games/learn-animal/star.webp";
const Squid = "https://assets.cuthongminh.com/games/learn-animal/squid.webp";
const Crab = "https://assets.cuthongminh.com/games/learn-animal/crab.webp";
//wild
const Lion = "https://assets.cuthongminh.com/games/learn-animal/lion.webp";
const Elephant = "https://assets.cuthongminh.com/games/learn-animal/elephant.webp";
const Tiger = "https://assets.cuthongminh.com/games/learn-animal/tiger.webp";
const Monkey = "https://assets.cuthongminh.com/games/learn-animal/monkey.webp";
const Giraffe = "https://assets.cuthongminh.com/games/learn-animal/giraffe.webp";
const Bear = "https://assets.cuthongminh.com/games/learn-animal/bear.webp";
const Snake = "https://assets.cuthongminh.com/games/learn-animal/snake.webp";
import { EntityData } from "@/types/game";

export const ANIMALS: EntityData[] = [
  // Farm Animals (Group 1)
  { id: "chicken", name: "Con Gà", image: Chicken, category: "farm" },
  { id: "duck", name: "Con Vịt", image: Duck, category: "farm" },
  { id: "cow", name: "Con Bò", image: Cow, category: "farm" },
  { id: "pig", name: "Con Lợn", image: Pig, category: "farm" },
  { id: "dog", name: "Con Chó", image: Dog, category: "farm" },
  { id: "cat", name: "Con Mèo", image: Cat, category: "farm" },

  // Wild Animals (Group 2)
  { id: "lion", name: "Sư Tử", image: Lion, category: "wild" },
  { id: "elephant", name: "Con Voi", image: Elephant, category: "wild" },
  { id: "tiger", name: "Con Hổ", image: Tiger, category: "wild" },
  { id: "monkey", name: "Con Khỉ", image: Monkey, category: "wild" },
  { id: "giraffe", name: "Hươu Cao Cổ", image: Giraffe, category: "wild" },
  { id: "bear", name: "Con Gấu", image: Bear, category: "wild" },
  { id: "snake", name: "Con Rắn", image: Snake, category: "wild" },

  // Ocean Animals (Group 3)
  { id: "fish", name: "Con Cá", image: Fish, category: "ocean" },
  { id: "dolphin", name: "Cá Heo", image: Dolphin, category: "ocean" },
  { id: "shark", name: "Cá Mập", image: Shark, category: "ocean" },
  { id: "seaturtle", name: "Rùa Biển", image: SeaTurtle, category: "ocean" },
  { id: "octopus", name: "Bạch Tuộc", image: Octopus, category: "ocean" },
  { id: "starfish", name: "Sao Biển", image: Starfish, category: "ocean" },
  { id: "squid", name: "Con Mực", image: Squid, category: "ocean" },
  { id: "crab", name: "Con Cua", image: Crab, category: "ocean" },
];

export const GROUPS = [
  {
    id: "group1",
    title: "Động vật nuôi",
    description: "Học các con vật nuôi",
    animals: ["chicken", "duck", "cow", "pig", "dog", "cat"],
    logo: LogoGroup1,
    variant: "green" as const,
  },
  {
    id: "group2",
    title: "Động vật hoang dã",
    description: "Học các con vật trong rừng",
    animals: ["lion", "elephant", "tiger", "monkey", "giraffe", "bear"],
    logo: LogoGroup2,
    variant: "orange" as const,
  },
  {
    id: "group3",
    title: "Động vật biển",
    description: "Học các con vật biển",
    animals: ["fish", "dolphin", "shark", "seaturtle", "octopus", "starfish"],
    logo: LogoGroup3,
    variant: "blue" as const,
  },
];

// Helper to get animals for a specific group
export function getAnimalsForGroup(groupId: string): EntityData[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return ANIMALS.filter((animal) => group.animals.includes(animal.id));
}

// ──── Animal Descriptions (for explore lesson) ────
export const ANIMAL_DESCRIPTIONS: Record<string, string> = {
  // Farm
  chicken: "Con gà gáy ò ó o mỗi sáng để gọi mọi người dậy. Gà mái đẻ trứng rất ngon!",
  duck: "Con vịt biết bơi giỏi lắm, chân có màng giúp vịt bơi nhanh. Vịt kêu cạp cạp!",
  cow: "Con bò cho sữa tươi ngon. Bò ăn cỏ và có bốn cái dạ dày!",
  pig: "Con lợn có cái mũi tròn dễ thương. Lợn thích tắm bùn để mát mẻ!",
  dog: "Con chó là người bạn thân nhất của con người. Chó trung thành và biết giữ nhà!",
  cat: "Con mèo thích ngủ và rất sạch sẽ. Mèo biết bắt chuột!",
  // Wild
  lion: "Sư tử là vua của muôn loài, có bờm dài oai phong. Sư tử sống thành bầy đàn!",
  elephant: "Con voi có cái vòi dài biết hút nước và nhặt đồ. Voi là động vật trên cạn lớn nhất!",
  tiger: "Con hổ có bộ lông sọc vằn đẹp. Hổ chạy rất nhanh và bơi giỏi!",
  monkey: "Con khỉ rất thông minh, biết leo cây nhanh. Khỉ thích ăn chuối!",
  giraffe: "Hươu cao cổ là con vật cao nhất thế giới. Cổ dài giúp hươu ăn lá cây trên cao!",
  bear: "Con gấu rất khỏe, thích ăn mật ong. Mùa đông gấu ngủ đông suốt mấy tháng!",
  snake: "Con rắn không có chân nhưng trườn rất nhanh. Rắn dùng lưỡi để ngửi mùi!",
  // Ocean
  fish: "Con cá sống dưới nước và thở bằng mang. Cá bơi bằng vây và đuôi!",
  dolphin: "Cá heo rất thông minh và thân thiện. Cá heo biết nhảy lên khỏi mặt nước!",
  shark: "Cá mập có hàng răng sắc và bơi rất nhanh. Cá mập sống ở biển sâu!",
  seaturtle: "Rùa biển bơi khắp đại dương và sống rất lâu. Rùa mẹ lên bờ đẻ trứng trên cát!",
  octopus: "Bạch tuộc có tám cái tua và rất thông minh. Bạch tuộc biết đổi màu để trốn kẻ thù!",
  starfish: "Sao biển có hình ngôi sao xinh đẹp. Nếu mất một cánh tay, sao biển mọc lại được!",
  squid: "Con mực bơi bằng cách phun nước ra phía sau. Khi sợ, mực phun mực đen để trốn!",
  crab: "Con cua có hai cái càng to dùng để kẹp. Cua bò ngang chứ không bò thẳng!",
};
