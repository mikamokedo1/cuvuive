import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Học Màu Sắc - Cú Thông Minh",
  description: "Bé học nhận biết màu sắc qua các trò chơi thú vị",
};

export default function LearnColorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
