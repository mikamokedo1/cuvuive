import type { Metadata } from "next";
import { GameSchema } from "@/components/common/GameSchema";
const GameLandmarkLogo = "https://assets.cuthongminh.com/games/learn-landmark/logo.webp";

export const metadata: Metadata = {
  title: "Học Địa Danh | Cú Thông Minh",
  description: "Bé khám phá các địa danh và kỳ quan nổi tiếng trên thế giới.",
  openGraph: {
    title: "Học Địa Danh | Cú Thông Minh",
    description: "Du lịch thế giới khám phá các địa danh nổi tiếng cùng bé.",
    type: "website",
    images: [
      {
        url: GameLandmarkLogo,
        width: 630,
        height: 630,
        alt: "Học Địa Danh | Cú Thông Minh",
      },
    ],
  },
  alternates: {
    canonical: "/games/learn-landmark",
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
