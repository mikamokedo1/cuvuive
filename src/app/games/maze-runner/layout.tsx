import type { Metadata } from "next";
import { GameSchema } from "@/components/common/GameSchema";
import GameMazeRunnerLogo from "@/assets/games/maze-runner/logo.webp";

export const metadata: Metadata = {
  title: "Giải Cứu Động Vật | Cú Thông Minh",
  description: "Trò chơi giải đố mê cung giúp rèn luyện tư duy không gian và giải quyết vấn đề.",
  openGraph: {
    title: "Giải Cứu Động Vật | Cú Thông Minh",
    description: "Thử thách trí thông minh qua trò chơi giải cứu động vật.",
    type: "website",
    images: [
      {
        url: GameMazeRunnerLogo.src,
        width: 1200,
        height: 630,
        alt: "Giải Cứu Động Vật | Cú Thông Minh",
      },
    ],
  },
};

export default function MazeRunnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="maze-runner" />
      {children}
    </>
  );
}
