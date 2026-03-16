import { Metadata } from "next";
import { GameSchema } from "@/components/common/GameSchema";
const Game3Logo = "https://assets.cuthongminh.com/games/game-3-logo.webp";

export const metadata: Metadata = {
  title: "Bé học so sánh - Cú Thông Minh",
  description: "Dạy bé học khái niệm lớn hơn, nhỏ hơn và bằng nhau thông qua các trò chơi thú vị.",
  keywords: ["học so sánh", "toán mầm non", "lớn hơn nhỏ hơn", "cú thông minh"],
  openGraph: {
    title: "Bé học so sánh - Cú Thông Minh",
    description: "Nhận biết lớn hơn, nhỏ hơn và bằng nhau cùng bé.",
    type: "website",
    images: [
      {
        url: Game3Logo,
        width: 1200,
        height: 630,
        alt: "Bé học so sánh - Cú Thông Minh",
      },
    ],
  },
  alternates: {
    canonical: "/games/compare-quantity",
  },
};

export default function CompareQuantityLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="compare-quantity" />
      {children}
    </>
  );
}
