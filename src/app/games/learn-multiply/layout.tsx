import type { Metadata } from "next";
import { GameSchema } from "@/components/common/GameSchema";
const GameMultiplyLogo = "https://assets.cuthongminh.com/games/learn-multiply/logo.webp";

export const metadata: Metadata = {
  title: "Học Phép Nhân | Cú Thông Minh",
  description: "Bé học bảng nhân 2-5 qua các trò chơi tương tác vui nhộn với hình ảnh minh họa.",
  openGraph: {
    title: "Học Phép Nhân | Cú Thông Minh",
    description: "Bé học phép nhân qua trò chơi tương tác.",
    type: "website",
    images: [
      {
        url: GameMultiplyLogo,
        width: 1200,
        height: 630,
        alt: "Học Phép Nhân | Cú Thông Minh",
      },
    ],
  },
  alternates: {
    canonical: "/games/learn-multiply",
  },
};

export default function LearnMultiplyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="learn-multiply" />
      {children}
    </>
  );
}
