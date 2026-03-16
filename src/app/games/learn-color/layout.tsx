import { Metadata } from "next";
import { GameSchema } from "@/components/common/GameSchema";
const GameColorLogo = "https://assets.cuthongminh.com/games/learn-color-color.webp";

export const metadata: Metadata = {
  title: "Học Màu Sắc - Cú Thông Minh",
  description: "Bé học nhận biết màu sắc qua các trò chơi thú vị",
  openGraph: {
    title: "Học Màu Sắc - Cú Thông Minh",
    description: "Nhận biết màu sắc qua trò chơi sinh động.",
    type: "website",
    images: [
      {
        url: GameColorLogo,
        width: 630,
        height: 630,
        alt: "Học Màu Sắc - Cú Thông Minh",
      },
    ],
  },
  alternates: {
    canonical: "/games/learn-color",
  },
};

export default function LearnColorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="learn-color" />
      {children}
    </>
  );
}
