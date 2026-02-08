import { StaticImageData } from "next/image";

// Import images
import Circle from "@/assets/games/learn-shape/circle.webp";
import Square from "@/assets/games/learn-shape/square.webp";
import Triangle from "@/assets/games/learn-shape/triangle.webp";
import Rectangle from "@/assets/games/learn-shape/rectangle.webp";
import Hexagon from "@/assets/games/learn-shape/hexagon.webp";
import Star from "@/assets/games/learn-shape/star.webp";
import Heart from "@/assets/games/learn-shape/heart.webp";
import Diamond from "@/assets/games/learn-shape/diamond.webp";
import Oval from "@/assets/games/learn-shape/oval.webp";
import Trapezium from "@/assets/games/learn-shape/trapezium.webp";

import ObjectCircle from "@/assets/games/learn-shape/object-circle.webp";
import ObjectSquare from "@/assets/games/learn-shape/object-square.webp";
import ObjectTriangle from "@/assets/games/learn-shape/object-triangle.webp";
import ObjectRectangle from "@/assets/games/learn-shape/object-rectangle.webp";
import ObjectHexagon from "@/assets/games/learn-shape/object-hexagon.webp";
import ObjectStar from "@/assets/games/learn-shape/object-star.webp";
import ObjectHeart from "@/assets/games/learn-shape/object-heart.webp";
import ObjectDiamond from "@/assets/games/learn-shape/object-diamond.webp";
import ObjectOval from "@/assets/games/learn-shape/object-oval.webp";
import ObjectTrapezium from "@/assets/games/learn-shape/object-trapezium.webp";

// Placeholder logos for groups (using shape images for now)
import LogoGroup1 from "@/assets/games/learn-shape/learn-shape-group-1.webp";
import LogoGroup2 from "@/assets/games/learn-shape/learn-shape-group-2.webp";
import LogoGroup3 from "@/assets/games/learn-shape/learn-shape-group-3.webp";

export interface ShapeData {
  id: string;
  name: string;
  image: StaticImageData;
  objectImage: StaticImageData;
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
