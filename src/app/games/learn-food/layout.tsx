import type { Metadata } from "next";
import { GameSchema } from "@/components/common/GameSchema";
import GameFoodLogo from "@/assets/games/learn-food/logo.webp";

export const metadata: Metadata = {
  title: "Học Món Ăn | Cú Thông Minh",
  description: "Bé khám phá thế giới ẩm thực qua hình ảnh sinh động",
  openGraph: {
    title: "Học Món Ăn | Cú Thông Minh",
    description: "Tìm hiểu các món ăn ngon mỗi ngày cùng bé.",
    type: "website",
    images: [
      {
        url: GameFoodLogo.src,
        width: 630,
        height: 630,
        alt: "Học Món Ăn | Cú Thông Minh",
      },
    ],
  },
};

export default function LearnFoodLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="learn-food" />
      {children}
    </>
  );
}
