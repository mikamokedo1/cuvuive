import type { Metadata } from "next";
import { GameSchema } from "@/components/common/GameSchema";
import GameAnimalLogo from "@/assets/games/learn-animal/logo.webp";

export const metadata: Metadata = {
  title: "Học Động Vật | Cú Thông Minh",
  description: "Bé làm quen với các loài động vật qua hình ảnh và âm thanh",
  openGraph: {
    title: "Học Động Vật | Cú Thông Minh",
    description: "Khám phá thế giới động vật cùng bé qua hình ảnh và âm thanh sinh động.",
    type: "website",
    images: [
      {
        url: GameAnimalLogo.src,
        width: 630,
        height: 630,
        alt: "Học Động Vật | Cú Thông Minh",
      },
    ],
  },
};

export default function LearnAnimalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="learn-animal" />
      {children}
    </>
  );
}
