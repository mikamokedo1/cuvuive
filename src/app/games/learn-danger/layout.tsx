import type { Metadata } from "next";
import { GameSchema } from "@/components/common/GameSchema";
const GameDangerLogo = "https://assets.cuthongminh.com/games/learn-danger/logo.webp";

export const metadata: Metadata = {
  title: "Đồ Vật Nguy Hiểm | Cú Thông Minh",
  description: "Bé học nhận biết các đồ vật nguy hiểm trong nhà qua trò chơi tương tác",
  openGraph: {
    title: "Đồ Vật Nguy Hiểm | Cú Thông Minh",
    description: "Bé học cách an toàn với các đồ vật nguy hiểm trong nhà.",
    type: "website",
    images: [
      {
        url: GameDangerLogo,
        width: 630,
        height: 630,
        alt: "Đồ Vật Nguy Hiểm | Cú Thông Minh",
      },
    ],
  },
  alternates: {
    canonical: "/games/learn-danger",
  },
};

export default function LearnDangerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="learn-danger" />
      {children}
    </>
  );
}
