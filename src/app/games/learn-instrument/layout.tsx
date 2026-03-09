import type { Metadata } from "next";
import { GameSchema } from "@/components/common/GameSchema";
import GameInstrumentLogo from "@/assets/games/learn-instrument/logo.webp";

export const metadata: Metadata = {
  title: "Học Nhạc Cụ | Cú Thông Minh",
  description: "Học các loại nhạc cụ: dây, gõ, hơi",
  openGraph: {
    title: "Học Nhạc Cụ | Cú Thông Minh",
    description: "Khám phá âm thanh của các loại nhạc cụ cùng bé.",
    type: "website",
    images: [
      {
        url: GameInstrumentLogo.src,
        width: 630,
        height: 630,
        alt: "Học Nhạc Cụ | Cú Thông Minh",
      },
    ],
  },
};

export default function LearnInstrumentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="learn-instrument" />
      {children}
    </>
  );
}
