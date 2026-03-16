import type { Metadata } from "next";
import { GameSchema } from "@/components/common/GameSchema";
const GameFlagLogo = "https://assets.cuthongminh.com/games/learn-flag/logo.webp";

export const metadata: Metadata = {
  title: "Học Quốc Kỳ | Cú Thông Minh",
  description: "Khám phá thế giới qua quốc kỳ của các quốc gia khác nhau.",
  openGraph: {
    title: "Học Quốc Kỳ | Cú Thông Minh",
    description: "Nhận biết quốc kỳ các nước trên thế giới.",
    type: "website",
    images: [
      {
        url: GameFlagLogo,
        width: 630,
        height: 630,
        alt: "Học Quốc Kỳ | Cú Thông Minh",
      },
    ],
  },
  alternates: {
    canonical: "/games/learn-flag",
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
