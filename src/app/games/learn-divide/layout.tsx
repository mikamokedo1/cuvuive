import type { Metadata } from "next";
import { GameSchema } from "@/components/common/GameSchema";
const GameDivideLogo = "https://assets.cuthongminh.com/games/learn-divide/logo.webp";

export const metadata: Metadata = {
  title: "Học Phép Chia | Cú Thông Minh",
  description: "Học phép chia cho trẻ em từ bảng chia 2 đến chia 5 với bài học trực quan và tương tác.",
  openGraph: {
    title: "Học Phép Chia | Cú Thông Minh",
    description: "Bé học phép chia qua trò chơi tương tác.",
    type: "website",
    images: [
      {
        url: GameDivideLogo,
        width: 1200,
        height: 630,
        alt: "Học Phép Chia | Cú Thông Minh",
      },
    ],
  },
  alternates: {
    canonical: "/games/learn-divide",
  },
};

export default function LearnDivideLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="learn-divide" />
      {children}
    </>
  );
}
