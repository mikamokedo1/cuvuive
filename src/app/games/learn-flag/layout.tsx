import type { Metadata } from "next";
import { GameSchema } from "@/components/common/GameSchema";
import GameFlagLogo from "@/assets/games/learn-flag/logo.webp";

export const metadata: Metadata = {
  title: "Học Quốc Kỳ | Cú Thông Minh",
  description: "Khám phá thế giới qua quốc kỳ của các quốc gia khác nhau.",
  openGraph: {
    title: "Học Quốc Kỳ | Cú Thông Minh",
    description: "Nhận biết quốc kỳ các nước trên thế giới.",
    type: "website",
    images: [
      {
        url: GameFlagLogo.src,
        width: 630,
        height: 630,
        alt: "Học Quốc Kỳ | Cú Thông Minh",
      },
    ],
  },
};

export default function LearnFlagLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="learn-flag" />
      {children}
    </>
  );
}
