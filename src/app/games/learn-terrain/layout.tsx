import type { Metadata } from "next";
import { GameSchema } from "@/components/common/GameSchema";
const GameTerrainLogo = "https://assets.cuthongminh.com/games/learn-terrain/logo.webp";

export const metadata: Metadata = {
  title: "Học Địa Hình | Cú Thông Minh",
  description: "Bé khám phá các dạng địa hình tự nhiên: núi, sông, sa mạc, đại dương qua trò chơi tương tác.",
  openGraph: {
    title: "Học Địa Hình | Cú Thông Minh",
    description: "Khám phá thế giới địa hình tự nhiên cùng bé yêu.",
    type: "website",
    images: [
      {
        url: GameTerrainLogo,
        width: 630,
        height: 630,
        alt: "Học Địa Hình | Cú Thông Minh",
      },
    ],
  },
};

export default function LearnTerrainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="learn-terrain" />
      {children}
    </>
  );
}
