import type { Metadata } from "next";
import { GameSchema } from "@/components/common/GameSchema";
const GameFindDifferencesLogo = "https://assets.cuthongminh.com/games/game-4-logo.webp";

export const metadata: Metadata = {
  title: "Tìm Điểm Khác Biệt | Cú Thông Minh",
  description: "Rèn luyện khả năng quan sát và sự tinh mắt cho bé qua trò chơi tìm điểm khác biệt.",
  openGraph: {
    title: "Tìm Điểm Khác Biệt | Cú Thông Minh",
    description: "Trò chơi tìm điểm khác biệt hấp dẫn cho bé.",
    type: "website",
    images: [
      {
        url: GameFindDifferencesLogo,
        width: 1200,
        height: 630,
        alt: "Tìm Điểm Khác Biệt | Cú Thông Minh",
      },
    ],
  },
};

export default function FindDifferencesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="find-differences" />
      {children}
    </>
  );
}
