import type { Metadata } from "next";
import { GameSchema } from "@/components/common/GameSchema";
import GameFruitLogo from "@/assets/games/learn-fruit/logo.webp";

export const metadata: Metadata = {
  title: "Học Trái Cây | Cú Thông Minh",
  description: "Học các loại trái cây: nhiệt đới, thường gặp, đặc biệt",
  openGraph: {
    title: "Học Trái Cây | Cú Thông Minh",
    description: "Khám phá các loại trái cây thơm ngon cùng bé.",
    type: "website",
    images: [
      {
        url: GameFruitLogo.src,
        width: 630,
        height: 630,
        alt: "Học Trái Cây | Cú Thông Minh",
      },
    ],
  },
};

export default function LearnFruitLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="learn-fruit" />
      {children}
    </>
  );
}
