import { StaticImageData } from "next/image";

// Import group logos
import LogoGroup1 from "@/assets/games/learn-vehicle/group1.webp";
import LogoGroup2 from "@/assets/games/learn-vehicle/group2.webp";
import LogoGroup3 from "@/assets/games/learn-vehicle/group3.webp";
import LogoGroup4 from "@/assets/games/learn-vehicle/logo.webp";

// Import Land Vehicles (Group 1) - PNG format (AI generated)
import Car from "@/assets/games/learn-vehicle/car.webp";
import Motorbike from "@/assets/games/learn-vehicle/motorbike.webp";
import Bus from "@/assets/games/learn-vehicle/bus.webp";
import Truck from "@/assets/games/learn-vehicle/truck.webp";
import Bicycle from "@/assets/games/learn-vehicle/bicycle.webp";
import Taxi from "@/assets/games/learn-vehicle/taxi.webp";

// Import Water Vehicles (Group 2) - webp format (AI generated)
import Boat from "@/assets/games/learn-vehicle/boat.webp";
import Ship from "@/assets/games/learn-vehicle/ship.webp";
import Submarine from "@/assets/games/learn-vehicle/submarine.webp";
import Jetski from "@/assets/games/learn-vehicle/jetski.webp";
import Canoe from "@/assets/games/learn-vehicle/canoe.webp";

// Import Air Vehicles (Group 3)
import Airplane from "@/assets/games/learn-vehicle/airplane.webp";
import Helicopter from "@/assets/games/learn-vehicle/helicopter.webp";
import Balloon from "@/assets/games/learn-vehicle/balloon.webp";
import Rocket from "@/assets/games/learn-vehicle/rocket.webp";
import Drone from "@/assets/games/learn-vehicle/drone.webp"; // Placeholder

// import zones
import ZoneLand from "@/assets/games/learn-vehicle/road.webp";
import ZoneWater from "@/assets/games/learn-vehicle/beach.webp";
import ZoneAir from "@/assets/games/learn-vehicle/sky.webp";

export type VehicleCategory = "land" | "water" | "air";

export interface VehicleData {
  id: string;
  name: string;
  image: StaticImageData;
  category: VehicleCategory;
}

export const VEHICLES: VehicleData[] = [
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
  logo: StaticImageData;
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
export function getVehiclesForGroup(groupId: string): VehicleData[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return VEHICLES.filter((vehicle) => group.vehicles.includes(vehicle.id));
}

// Helper to get all vehicles
export function getAllVehicles(): VehicleData[] {
  return VEHICLES;
}

// Zone data for "Where Does It Go?" game
export const ZONES = [
  { id: "land", name: "Đường Bộ", image: ZoneLand },
  { id: "water", name: "Đường Thủy", image: ZoneWater },
  { id: "air", name: "Hàng Không", image: ZoneAir },
];
