import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giải Cứu Động Vật | Cú Thông Minh",
  description: "Trò chơi giải đố mê cung giúp rèn luyện tư duy không gian và giải quyết vấn đề.",
};

export default function MazeRunnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
