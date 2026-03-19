import type { Metadata } from "next";
import { GameSchema } from "@/components/common/GameSchema";
const GameCleaningLogo = "https://assets.cuthongminh.com/games/learn-cleaning/logo.webp";

export const metadata: Metadata = {
  title: "Học Dọn Dẹp | Cú Thông Minh",
  description: "Bé học cách dọn dẹp nhà cửa gọn gàng và phân loại rác đúng cách qua trò chơi",
  openGraph: {
    title: "Học Dọn Dẹp | Cú Thông Minh",
    description: "Bé học dọn dẹp nhà cửa và phân loại rác cùng Cú Thông Minh.",
    type: "website",
    images: [
      {
        url: GameCleaningLogo,
        width: 630,
        height: 630,
        alt: "Học Dọn Dẹp | Cú Thông Minh",
      },
    ],
  },
  alternates: {
    canonical: "/games/learn-cleaning",
  },
};

export default function LearnCleaningLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="learn-cleaning" />
      {children}
    </>
  );
}
