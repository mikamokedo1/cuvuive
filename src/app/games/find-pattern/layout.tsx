import { Metadata } from "next";
import { GameSchema } from "@/components/common/GameSchema";
const GamePatternLogo = "https://assets.cuthongminh.com/games/find-pattern/logo.webp";

export const metadata: Metadata = {
  title: "Tìm Quy Luật | Cú Thông Minh",
  description: "Bé học tìm quy luật qua các hình dạng và màu sắc vui nhộn.",
  openGraph: {
    title: "Tìm Quy Luật | Cú Thông Minh",
    description: "Phát triển tư duy logic qua trò chơi tìm quy luật.",
    type: "website",
    images: [
      {
        url: GamePatternLogo,
        width: 1200,
        height: 630,
        alt: "Tìm Quy Luật | Cú Thông Minh",
      },
    ],
  },
  alternates: {
    canonical: "/games/find-pattern",
  },
};

export default function FindPatternLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="find-pattern" />
      {children}
    </>
  );
}
