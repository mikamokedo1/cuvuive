import { Metadata } from "next";
import { GameSchema } from "@/components/common/GameSchema";
const NumberLogo = "https://assets.cuthongminh.com/games/learn-numbers/number-logo.webp";

export const metadata: Metadata = {
  title: "Bé học đếm số - Cú Thông Minh",
  description: "Trò chơi học số tương tác cho bé từ 1 đến 9 giúp bé nhận diện và đếm số vui vẻ.",
  keywords: ["bé học số", "học đếm", "số học cho trẻ em", "cú thông minh"],
  openGraph: {
    title: "Bé học đếm số - Cú Thông Minh",
    description: "Trò chơi học số tương tác cho bé từ 1 đến 9.",
    type: "website",
    images: [
      {
        url: NumberLogo,
        width: 1200,
        height: 630,
        alt: "Bé học đếm số - Cú Thông Minh",
      },
    ],
  },
  alternates: {
    canonical: "/games/learn-numbers",
  },
};

export default function NumberGameLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="learn-numbers" />
      {children}
    </>
  );
}
