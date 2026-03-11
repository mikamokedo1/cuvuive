import { StaticImageData } from "next/image";

// Import images
const Circle = "https://assets.cuthongminh.com/games/learn-shape/circle.webp";
const Square = "https://assets.cuthongminh.com/games/learn-shape/square.webp";
const Triangle = "https://assets.cuthongminh.com/games/learn-shape/triangle.webp";
const Rectangle = "https://assets.cuthongminh.com/games/learn-shape/rectangle.webp";
const Hexagon = "https://assets.cuthongminh.com/games/learn-shape/hexagon.webp";
const Star = "https://assets.cuthongminh.com/games/learn-shape/star.webp";
const Heart = "https://assets.cuthongminh.com/games/learn-shape/heart.webp";
const Diamond = "https://assets.cuthongminh.com/games/learn-shape/diamond.webp";
const Oval = "https://assets.cuthongminh.com/games/learn-shape/oval.webp";
const Trapezium = "https://assets.cuthongminh.com/games/learn-shape/trapezium.webp";

const ObjectCircle = "https://assets.cuthongminh.com/games/learn-shape/object-circle.webp";
const ObjectSquare = "https://assets.cuthongminh.com/games/learn-shape/object-square.webp";
const ObjectTriangle = "https://assets.cuthongminh.com/games/learn-shape/object-triangle.webp";
const ObjectRectangle = "https://assets.cuthongminh.com/games/learn-shape/object-rectangle.webp";
const ObjectHexagon = "https://assets.cuthongminh.com/games/learn-shape/object-hexagon.webp";
const ObjectStar = "https://assets.cuthongminh.com/games/learn-shape/object-star.webp";
const ObjectHeart = "https://assets.cuthongminh.com/games/learn-shape/object-heart.webp";
const ObjectDiamond = "https://assets.cuthongminh.com/games/learn-shape/object-diamond.webp";
const ObjectOval = "https://assets.cuthongminh.com/games/learn-shape/object-oval.webp";
const ObjectTrapezium = "https://assets.cuthongminh.com/games/learn-shape/object-trapezium.webp";

// Placeholder logos for groups (using shape images for now)
const LogoGroup1 = "https://assets.cuthongminh.com/games/learn-shape/learn-shape-group-1.webp";
const LogoGroup2 = "https://assets.cuthongminh.com/games/learn-shape/learn-shape-group-2.webp";
const LogoGroup3 = "https://assets.cuthongminh.com/games/learn-shape/learn-shape-group-3.webp";
import { EntityData } from "@/types/game";

export interface ShapeData extends EntityData {
  objectImage: string | StaticImageData;
  objectName: string;
  isBasic: boolean;
}

export const SHAPES: ShapeData[] = [
  // Basic Shapes
  { id: "circle", name: "Hình Tròn", image: Circle, objectImage: ObjectCircle, objectName: "Bánh qui", isBasic: true },
  { id: "square", name: "Hình Vuông", image: Square, objectImage: ObjectSquare, objectName: "Hộp quà", isBasic: true },
  {
    id: "triangle",
    name: "Hình Tam Giác",
    image: Triangle,
    objectImage: ObjectTriangle,
    objectName: "Miếng pi da",
    isBasic: true,
  },
  {
    id: "rectangle",
    name: "Hình Chữ Nhật",
    image: Rectangle,
    objectImage: ObjectRectangle,
    objectName: "Điện thoại",
    isBasic: true,
  },

  // Advanced Shapes
  {
    id: "hexagon",
    name: "Hình Lục Giác",
    image: Hexagon,
    objectImage: ObjectHexagon,
    objectName: "Đồng hồ",
    isBasic: false,
  },
  { id: "star", name: "Ngôi Sao", image: Star, objectImage: ObjectStar, objectName: "Con sao biển", isBasic: false },
  {
    id: "heart",
    name: "Hình Trái Tim",
    image: Heart,
    objectImage: ObjectHeart,
    objectName: "Kẹo mút",
    isBasic: false,
  },
  {
    id: "diamond",
    name: "Hình Thoi",
    image: Diamond,
    objectImage: ObjectDiamond,
    objectName: "Con diều",
    isBasic: false,
  },
  { id: "oval", name: "Hình Bầu Dục", image: Oval, objectImage: ObjectOval, objectName: "Quả trứng", isBasic: false },
  {
    id: "trapezium",
    name: "Hình Thang",
    image: Trapezium,
    objectImage: ObjectTrapezium,
    objectName: "Túi bỏng ngô",
    isBasic: false,
  },
];

export const GROUPS = [
  {
    id: "group1",
    title: "Hình cơ bản",
    description: "Học các hình dạng cơ bản",
    shapes: ["circle", "square", "triangle", "rectangle"],
    logo: LogoGroup1,
    variant: "green" as const,
  },
  {
    id: "group2",
    title: "Hình nâng cao",
    description: "Học thêm các hình dạng khác",
    shapes: ["hexagon", "star", "heart", "diamond", "oval", "trapezium"],
    logo: LogoGroup2,
    variant: "purple" as const,
  },
  {
    id: "group3",
    title: "Luyện tập",
    description: "Ôn tập tất cả các hình",
    shapes: SHAPES.map((s) => s.id),
    logo: LogoGroup3,
    variant: "blue" as const,
  },
];
