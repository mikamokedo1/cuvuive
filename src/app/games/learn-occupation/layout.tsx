import type { Metadata } from "next";
import { GameSchema } from "@/components/common/GameSchema";
const GameOccupationLogo = "https://assets.cuthongminh.com/games/learn-occupation/logo.webp";

export const metadata: Metadata = {
  title: "Học Nghề Nghiệp | Cú Thông Minh",
  description: "Học các nghề nghiệp: cộng đồng, y tế, nghệ thuật",
  openGraph: {
    title: "Học Nghề Nghiệp | Cú Thông Minh",
    description: "Khám phá các nghề nghiệp thú vị trong xã hội cùng bé.",
    type: "website",
    images: [
      {
        url: GameOccupationLogo,
        width: 630,
        height: 630,
        alt: "Học Nghề Nghiệp | Cú Thông Minh",
      },
    ],
  },
  alternates: {
    canonical: "/games/learn-occupation",
  },
};

export default function LearnOccupationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="learn-occupation" />
      {children}
    </>
  );
}
