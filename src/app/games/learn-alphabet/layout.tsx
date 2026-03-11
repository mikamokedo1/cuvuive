import type { Metadata } from "next";
import { GameSchema } from "@/components/common/GameSchema";
const GameAlphabetLogo = "https://assets.cuthongminh.com/games/learn-alphabet/logo.webp";

export const metadata: Metadata = {
  title: "Bảng Chữ Cái | Cú Thông Minh",
  description: "Bé học bảng chữ cái tiếng Việt qua hình ảnh và trò chơi vui nhộn",
  openGraph: {
    title: "Bảng Chữ Cái | Cú Thông Minh",
    description: "Học bảng chữ cái tiếng Việt vui nhộn.",
    type: "website",
    images: [
      {
        url: GameAlphabetLogo,
        width: 1200,
        height: 630,
        alt: "Bảng Chữ Cái | Cú Thông Minh",
      },
    ],
  },
};

export default function LearnAlphabetLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="learn-alphabet" />
      {children}
    </>
  );
}
