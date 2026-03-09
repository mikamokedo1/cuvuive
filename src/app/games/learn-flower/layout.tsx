import type { Metadata } from "next";
import { GameSchema } from "@/components/common/GameSchema";
import GameFlowerLogo from "@/assets/games/learn-flower/logo.webp";

export const metadata: Metadata = {
  title: "Học Hoa & Cây | Cú Thông Minh",
  description: "Học các loại hoa và cây quen thuộc ở Việt Nam",
  openGraph: {
    title: "Học Hoa & Cây | Cú Thông Minh",
    description: "Khám phá thế giới thực vật màu sắc cùng bé.",
    type: "website",
    images: [
      {
        url: GameFlowerLogo.src,
        width: 630,
        height: 630,
        alt: "Học Hoa & Cây | Cú Thông Minh",
      },
    ],
  },
};

export default function LearnFlowerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="learn-flower" />
      {children}
    </>
  );
}
