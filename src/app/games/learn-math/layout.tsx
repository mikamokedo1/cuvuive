import type { Metadata } from "next";
import { GameSchema } from "@/components/common/GameSchema";
import GameMathLogo from "@/assets/games/learn-math/logo.png";

export const metadata: Metadata = {
  title: "Toán Học Cơ Bản | Cú Thông Minh",
  description: "Bé làm quen với các khái niệm toán học cơ bản và luyện tập tư duy logic.",
  openGraph: {
    title: "Toán Học Cơ Bản | Cú Thông Minh",
    description: "Làm quen với các con số và phép tính cơ bản.",
    type: "website",
    images: [
      {
        url: GameMathLogo.src,
        width: 1200,
        height: 630,
        alt: "Toán Học Cơ Bản | Cú Thông Minh",
      },
    ],
  },
};

export default function LearnMathLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="learn-math" />
      {children}
    </>
  );
}
