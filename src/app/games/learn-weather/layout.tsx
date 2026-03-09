import type { Metadata } from "next";
import { GameSchema } from "@/components/common/GameSchema";
import GameWeatherLogo from "@/assets/games/learn-weather/logo.png";

export const metadata: Metadata = {
  title: "Học Thời Tiết | Cú Thông Minh",
  description: "Bé làm quen với các hiện tượng thời tiết và khí hậu qua hình ảnh vui nhộn",
  openGraph: {
    title: "Học Thời Tiết | Cú Thông Minh",
    description: "Khám phá các hiện tượng thời tiết cùng bé.",
    type: "website",
    images: [
      {
        url: GameWeatherLogo.src,
        width: 630,
        height: 630,
        alt: "Học Thời Tiết | Cú Thông Minh",
      },
    ],
  },
};

export default function LearnWeatherLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="learn-weather" />
      {children}
    </>
  );
}
