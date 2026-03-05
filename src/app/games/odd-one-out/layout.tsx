import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tìm Điểm Khác Loại | Cú Thông Minh",
  description: "Phát triển khả năng quan sát và phân loại thông qua trò chơi tìm điểm khác biệt.",
};

export default function OddOneOutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
