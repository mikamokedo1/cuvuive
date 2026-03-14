import type { Metadata } from "next";
import { GameSchema } from "@/components/common/GameSchema";
const GameHygieneLogo = "https://assets.cuthongminh.com/games/learn-hygiene/logo.webp";

export const metadata: Metadata = {
  title: "Học Vệ Sinh Cá Nhân | Cú Thông Minh",
  description: "Bé học các thói quen vệ sinh cá nhân tốt qua hình ảnh và trò chơi",
  openGraph: {
    title: "Học Vệ Sinh Cá Nhân | Cú Thông Minh",
    description: "Hình thành thói quen vệ sinh sạch sẽ cùng bé.",
    type: "website",
    images: [
      {
        url: GameHygieneLogo,
        width: 630,
        height: 630,
        alt: "Học Vệ Sinh Cá Nhân | Cú Thông Minh",
      },
    ],
  },
  alternates: {
    canonical: "/games/learn-hygiene",
  },
};

export default function LearnHygieneLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="learn-hygiene" />
      {children}
    </>
  );
}
