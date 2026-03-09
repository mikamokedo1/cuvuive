import type { Metadata } from "next";
import { GameSchema } from "@/components/common/GameSchema";
import GameVehicleLogo from "@/assets/games/learn-vehicle/logo.webp";

export const metadata: Metadata = {
  title: "Học Phương Tiện Giao Thông | Cú Thông Minh",
  description: "Học các loại phương tiện giao thông: đường bộ, đường thủy, hàng không",
  openGraph: {
    title: "Học Phương Tiện Giao Thông | Cú Thông Minh",
    description: "Khám phá các loại phương tiện giao thông cùng bé.",
    type: "website",
    images: [
      {
        url: GameVehicleLogo.src,
        width: 630,
        height: 630,
        alt: "Học Phương Tiện Giao Thông | Cú Thông Minh",
      },
    ],
  },
};

export default function LearnVehicleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="learn-vehicle" />
      {children}
    </>
  );
}
