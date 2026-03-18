import type { Metadata } from "next";
import { GameSchema } from "@/components/common/GameSchema";
const GameTrafficLogo = "https://assets.cuthongminh.com/games/learn-traffic/logo.webp";

export const metadata: Metadata = {
  title: "An Toàn Giao Thông | Cú Thông Minh",
  description: "Bé học các quy tắc an toàn giao thông qua trò chơi tương tác",
  openGraph: {
    title: "An Toàn Giao Thông | Cú Thông Minh",
    description: "Học đèn tín hiệu, biển báo, quy tắc đi bộ và đi xe an toàn cùng bé.",
    type: "website",
    images: [
      {
        url: GameTrafficLogo,
        width: 630,
        height: 630,
        alt: "An Toàn Giao Thông | Cú Thông Minh",
      },
    ],
  },
  alternates: {
    canonical: "/games/learn-traffic",
  },
};

export default function LearnTrafficLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="learn-traffic" />
      {children}
    </>
  );
}
