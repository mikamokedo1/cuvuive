import type { Metadata } from "next";
import { GameSchema } from "@/components/common/GameSchema";
const GameClockLogo = "https://assets.cuthongminh.com/games/learn-clock/logo-main.webp";

export const metadata: Metadata = {
  title: "Học Xem Đồng Hồ | Cú Thông Minh",
  description: "Bé học cách xem đồng hồ kim và đồng hồ điện tử qua hình ảnh và trò chơi",
  openGraph: {
    title: "Học Xem Đồng Hồ | Cú Thông Minh",
    description: "Nhận biết thời gian qua trò chơi xem đồng hồ.",
    type: "website",
    images: [
      {
        url: GameClockLogo,
        width: 630,
        height: 630,
        alt: "Học Xem Đồng Hồ | Cú Thông Minh",
      },
    ],
  },
};

export default function LearnClockLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="learn-clock" />
      {children}
    </>
  );
}
