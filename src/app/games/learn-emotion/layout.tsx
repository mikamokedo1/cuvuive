import type { Metadata } from "next";
import { GameSchema } from "@/components/common/GameSchema";
const GameEmotionLogo = "https://assets.cuthongminh.com/games/learn-emotion/logo.webp";

export const metadata: Metadata = {
  title: "Nhận Biết Cảm Xúc | Cú Thông Minh",
  description: "Bé học cách nhận biết và gọi tên cảm xúc qua hình ảnh và tình huống kịch bản",
  openGraph: {
    title: "Nhận Biết Cảm Xúc | Cú Thông Minh",
    description: "Học cách thấu hiểu và gọi tên cảm xúc cùng bé.",
    type: "website",
    images: [
      {
        url: GameEmotionLogo,
        width: 1200,
        height: 630,
        alt: "Nhận Biết Cảm Xúc | Cú Thông Minh",
      },
    ],
  },
};

export default function LearnEmotionLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="learn-emotion" />
      {children}
    </>
  );
}
