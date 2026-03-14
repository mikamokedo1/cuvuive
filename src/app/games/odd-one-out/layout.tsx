import type { Metadata } from "next";
import { GameSchema } from "@/components/common/GameSchema";
const GameOddOneOutLogo = "https://assets.cuthongminh.com/games/odd-one-out/logo.webp";

export const metadata: Metadata = {
  title: "Tìm Điểm Khác Loại | Cú Thông Minh",
  description: "Phát triển khả năng quan sát và phân loại thông qua trò chơi tìm điểm khác biệt.",
  openGraph: {
    title: "Tìm Điểm Khác Loại | Cú Thông Minh",
    description: "Phát triển tư duy phân loại cùng bé.",
    type: "website",
    images: [
      {
        url: GameOddOneOutLogo,
        width: 1200,
        height: 630,
        alt: "Tìm Điểm Khác Loại | Cú Thông Minh",
      },
    ],
  },
  alternates: {
    canonical: "/games/odd-one-out",
  },
};

export default function OddOneOutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="odd-one-out" />
      {children}
    </>
  );
}
