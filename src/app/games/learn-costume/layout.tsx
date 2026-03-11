import type { Metadata } from "next";
import { GameSchema } from "@/components/common/GameSchema";
const GameCostumeLogo = "https://assets.cuthongminh.com/games/learn-costume/logo.webp";

export const metadata: Metadata = {
  title: "Học Trang Phục | Cú Thông Minh",
  description: "Bé làm quen với các loại trang phục và phụ kiện hàng ngày.",
  openGraph: {
    title: "Học Trang Phục | Cú Thông Minh",
    description: "Khám phá phong cách trang phục đa dạng cùng bé.",
    type: "website",
    images: [
      {
        url: GameCostumeLogo,
        width: 630,
        height: 630,
        alt: "Học Trang Phục | Cú Thông Minh",
      },
    ],
  },
};

export default function LearnCostumeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="learn-costume" />
      {children}
    </>
  );
}
