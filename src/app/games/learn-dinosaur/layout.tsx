import type { Metadata } from "next";
import { GameSchema } from "@/components/common/GameSchema";
const GameDinosaurLogo = "https://assets.cuthongminh.com/games/learn-dinosaur/logo.webp";

export const metadata: Metadata = {
  title: "Học Khủng Long | Cú Thông Minh",
  description: "Bé khám phá thế giới khủng long qua hình ảnh sinh động",
  openGraph: {
    title: "Học Khủng Long | Cú Thông Minh",
    description: "Du hành về thời tiền sử khám phá các loài khủng long.",
    type: "website",
    images: [
      {
        url: GameDinosaurLogo,
        width: 630,
        height: 630,
        alt: "Học Khủng Long | Cú Thông Minh",
      },
    ],
  },
};

export default function LearnDinosaurLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="learn-dinosaur" />
      {children}
    </>
  );
}
