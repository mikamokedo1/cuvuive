import { StaticImageData } from "next/image";

// Import group logos
const LogoGroup1 = "https://assets.cuthongminh.com/games/learn-vehicle/group1.webp";
const LogoGroup2 = "https://assets.cuthongminh.com/games/learn-vehicle/group2.webp";
const LogoGroup3 = "https://assets.cuthongminh.com/games/learn-vehicle/group3.webp";
const LogoGroup4 = "https://assets.cuthongminh.com/games/learn-vehicle/logo.webp";

// Import Land Vehicles (Group 1) - PNG format (AI generated)
const Car = "https://assets.cuthongminh.com/games/learn-vehicle/car.webp";
const Motorbike = "https://assets.cuthongminh.com/games/learn-vehicle/motorbike.webp";
const Bus = "https://assets.cuthongminh.com/games/learn-vehicle/bus.webp";
const Truck = "https://assets.cuthongminh.com/games/learn-vehicle/truck.webp";
const Bicycle = "https://assets.cuthongminh.com/games/learn-vehicle/bicycle.webp";
const Taxi = "https://assets.cuthongminh.com/games/learn-vehicle/taxi.webp";

// Import Water Vehicles (Group 2) - webp format (AI generated)
const Boat = "https://assets.cuthongminh.com/games/learn-vehicle/boat.webp";
const Ship = "https://assets.cuthongminh.com/games/learn-vehicle/ship.webp";
const Submarine = "https://assets.cuthongminh.com/games/learn-vehicle/submarine.webp";
const Jetski = "https://assets.cuthongminh.com/games/learn-vehicle/jetski.webp";
const Canoe = "https://assets.cuthongminh.com/games/learn-vehicle/canoe.webp";

// Import Air Vehicles (Group 3)
const Airplane = "https://assets.cuthongminh.com/games/learn-vehicle/airplane.webp";
const Helicopter = "https://assets.cuthongminh.com/games/learn-vehicle/helicopter.webp";
const Balloon = "https://assets.cuthongminh.com/games/learn-vehicle/balloon.webp";
const Rocket = "https://assets.cuthongminh.com/games/learn-vehicle/rocket.webp";
const Drone = "https://assets.cuthongminh.com/games/learn-vehicle/drone.webp"; // Placeholder

// import zones
const ZoneLand = "https://assets.cuthongminh.com/games/learn-vehicle/road.webp";
const ZoneWater = "https://assets.cuthongminh.com/games/learn-vehicle/beach.webp";
const ZoneAir = "https://assets.cuthongminh.com/games/learn-vehicle/sky.webp";
import { EntityData } from "@/types/game";

export const VEHICLES: EntityData[] = [
  // Land Vehicles (Group 1)
  { id: "car", name: "Ô Tô", image: Car, category: "land" },
  { id: "motorbike", name: "Xe Máy", image: Motorbike, category: "land" },
  { id: "bus", name: "Xe Buýt", image: Bus, category: "land" },
  { id: "truck", name: "Xe Tải", image: Truck, category: "land" },
  { id: "bicycle", name: "Xe Đạp", image: Bicycle, category: "land" },
  { id: "taxi", name: "Xe Taxi", image: Taxi, category: "land" },

  // Water Vehicles (Group 2)
  { id: "boat", name: "Thuyền", image: Boat, category: "water" },
  { id: "ship", name: "Tàu Thủy", image: Ship, category: "water" },
  { id: "submarine", name: "Tàu Ngầm", image: Submarine, category: "water" },
  { id: "jetski", name: "Mô Tô Nước", image: Jetski, category: "water" },
  { id: "canoe", name: "Ca Nô", image: Canoe, category: "water" },

  // Air Vehicles (Group 3)
  { id: "airplane", name: "Máy Bay", image: Airplane, category: "air" },
  { id: "helicopter", name: "Trực Thăng", image: Helicopter, category: "air" },
  { id: "balloon", name: "Khinh Khí Cầu", image: Balloon, category: "air" },
  { id: "rocket", name: "Tên Lửa", image: Rocket, category: "air" },
  { id: "drone", name: "Máy Bay Điều Khiển", image: Drone, category: "air" },
];

export interface GroupData {
  id: string;
  title: string;
  description: string;
  logo: string | StaticImageData;
  variant: "green" | "blue" | "purple" | "orange";
  lessonCount?: number;
  [key: string]: any;
}

export const GROUPS: GroupData[] = [
  {
    id: "group1",
    title: "Đường bộ",
    description: "Học các phương tiện giao thông đường bộ",
    vehicles: ["car", "motorbike", "bus", "truck", "bicycle", "taxi"],
    logo: LogoGroup1,
    variant: "green" as const,
    lessonCount: 3, // Learn, Quiz, Memory
  },
  {
    id: "group2",
    title: "Đường thủy",
    description: "Học các phương tiện giao thông đường thủy",
    vehicles: ["boat", "ship", "submarine", "jetski", "yacht", "canoe"],
    logo: LogoGroup2,
    variant: "blue" as const,
    lessonCount: 3, // Learn, Quiz, Memory
  },
  {
    id: "group3",
    title: "Hàng không",
    description: "Học các phương tiện giao thông hàng không",
    vehicles: ["airplane", "helicopter", "balloon", "rocket", "drone"],
    logo: LogoGroup3,
    variant: "purple" as const,
    lessonCount: 3, // Learn, Quiz, Memory
  },
  {
    id: "group4",
    title: "Luyện tập",
    description: "Ôn tập tất cả các phương tiện",
    vehicles: [
      // All vehicles combined
      "car",
      "motorbike",
      "bus",
      "truck",
      "bicycle",
      "taxi",
      "boat",
      "ship",
      "submarine",
      "jetski",
      "yacht",
      "canoe",
      "airplane",
      "helicopter",
      "balloon",
      "rocket",
      "drone",
    ],
    logo: LogoGroup4,
    variant: "orange" as const,
    lessonCount: 3, // Quiz, Memory, Sort
  },
];

// Helper to get vehicles for a specific group
export function getVehiclesForGroup(groupId: string): EntityData[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return VEHICLES.filter((vehicle) => group.vehicles.includes(vehicle.id));
}

// Helper to get all vehicles
export function getAllVehicles(): EntityData[] {
  return VEHICLES;
}

// Zone data for "Where Does It Go?" game
export const ZONES = [
  { id: "land", name: "Đường Bộ", image: ZoneLand },
  { id: "water", name: "Đường Thủy", image: ZoneWater },
  { id: "air", name: "Hàng Không", image: ZoneAir },
];

// ──── Vehicle Descriptions (for explore lesson) ────
export const VEHICLE_DESCRIPTIONS: Record<string, string> = {
  car: "Ô tô có bốn bánh, chở được cả gia đình đi chơi. Ô tô chạy bằng xăng hoặc điện!",
  motorbike: "Xe máy có hai bánh, rất tiện lợi để đi lại trong thành phố. Nhớ đội mũ bảo hiểm nhé!",
  bus: "Xe buýt to lớn, chở được rất nhiều người. Xe buýt dừng ở trạm để đón khách!",
  truck: "Xe tải rất khỏe, chở được hàng hóa nặng. Xe tải giúp vận chuyển đồ đạc đi xa!",
  bicycle: "Xe đạp chạy bằng sức đạp, rất tốt cho sức khỏe. Đạp xe vừa vui vừa bảo vệ môi trường!",
  taxi: "Xe taxi chở khách đến nơi họ muốn. Taxi thường có màu vàng hoặc trắng!",
  boat: "Thuyền nhỏ chèo trên sông, hồ. Thuyền là phương tiện lâu đời nhất của con người!",
  ship: "Tàu thủy rất to, chở hàng và người đi biển. Tàu thủy có thể đi qua đại dương!",
  submarine: "Tàu ngầm lặn sâu dưới biển. Thủy thủ trên tàu ngầm sống dưới nước nhiều tháng!",
  jetski: "Mô tô nước lướt nhanh trên mặt nước. Chơi mô tô nước rất hào hứng!",
  canoe: "Ca nô chạy nhanh trên sông và biển. Ca nô thường dùng để cứu hộ!",
  airplane: "Máy bay bay trên trời rất cao và rất nhanh. Máy bay chở người đi khắp thế giới!",
  helicopter: "Trực thăng có cánh quạt quay tròn ở trên. Trực thăng có thể bay lên thẳng và đứng yên trên không!",
  balloon: "Khinh khí cầu bay lên nhờ khí nóng. Bay bằng khinh khí cầu rất lãng mạn!",
  rocket: "Tên lửa phóng lên vũ trụ với tốc độ cực nhanh. Tên lửa đưa phi hành gia lên Mặt Trăng!",
  drone: "Máy bay điều khiển từ xa, không có người lái. Drone dùng để chụp ảnh từ trên cao!",
};
