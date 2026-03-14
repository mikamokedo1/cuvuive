import type { Metadata } from "next";
import { GameSchema } from "@/components/common/GameSchema";
const PaintPictureLogo = "https://assets.cuthongminh.com/games/paint-picture/logo.webp";

export const metadata: Metadata = {
  title: "Vẽ Tranh | Cú Thông Minh",
  description: "Bé phát huy khả năng sáng tạo qua các bức tranh sinh động",
  openGraph: {
    title: "Vẽ Tranh | Cú Thông Minh",
    description: "Khơi dậy niềm đam mê nghệ thuật cùng bé.",
    type: "website",
    images: [
      {
        url: PaintPictureLogo,
        width: 1200,
        height: 630,
        alt: "Vẽ Tranh | Cú Thông Minh",
      },
    ],
  },
  alternates: {
    canonical: "/games/paint-picture",
  },
};

export default function PaintPictureLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="paint-picture" />
      {children}
    </>
  );
}
