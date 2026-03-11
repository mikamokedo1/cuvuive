import { Metadata } from "next";
import { GameSchema } from "@/components/common/GameSchema";
const ShapeLogo = "https://assets.cuthongminh.com/games/learn-shape/learn-shape-logo.webp";

export const metadata: Metadata = {
  title: "Hình Dạng | Cú Thông Minh",
  description: "Bé nhận biết các hình dạng cơ bản qua đồ vật và trò chơi",
  openGraph: {
    title: "Hình Dạng | Cú Thông Minh",
    description: "Nhận biết hình dạng qua trò chơi tương tác.",
    type: "website",
    images: [
      {
        url: ShapeLogo,
        width: 1200,
        height: 630,
        alt: "Hình Dạng | Cú Thông Minh",
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-sky-50">
      <GameSchema courseId="learn-shape" />
      {children}
    </div>
  );
}
