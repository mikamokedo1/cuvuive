import type { Metadata } from "next";
import { GameSchema } from "@/components/common/GameSchema";
import GameLandmarkLogo from "@/assets/games/learn-landmark/logo.png";

export const metadata: Metadata = {
  title: "Học Địa Danh | Cú Thông Minh",
  description: "Bé khám phá các địa danh và kỳ quan nổi tiếng trên thế giới.",
  openGraph: {
    title: "Học Địa Danh | Cú Thông Minh",
    description: "Du lịch thế giới khám phá các địa danh nổi tiếng cùng bé.",
    type: "website",
    images: [
      {
        url: GameLandmarkLogo.src,
        width: 630,
        height: 630,
        alt: "Học Địa Danh | Cú Thông Minh",
      },
    ],
  },
};

export default function LearnLandmarkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="learn-landmark" />
      {children}
    </>
  );
}
