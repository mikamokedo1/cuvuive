import { Metadata } from "next";
import { GameSchema } from "@/components/common/GameSchema";
import MixColorLogo from "@/assets/games/learn-color-color.webp";

export const metadata: Metadata = {
  title: "Pha Màu - Cú Thông Minh",
  description: "Bé học cách pha trộn màu sắc để tạo ra màu mới qua các trò chơi thú vị",
  openGraph: {
    title: "Pha Màu - Cú Thông Minh",
    description: "Thí nghiệm pha trộn màu sắc đầy thú vị cùng bé.",
    type: "website",
    images: [
      {
        url: MixColorLogo.src,
        width: 1200,
        height: 630,
        alt: "Pha Màu - Cú Thông Minh",
      },
    ],
  },
};

export default function MixColorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="mix-color" />
      {children}
    </>
  );
}
