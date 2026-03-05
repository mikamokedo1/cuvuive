import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tìm Điểm Khác Biệt | Cú Thông Minh",
  description: "Rèn luyện khả năng quan sát và sự tinh mắt cho bé qua trò chơi tìm điểm khác biệt.",
};

export default function FindDifferencesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
