import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tô Màu - Cú Thông Minh",
  description: "Bé tô màu các hình vẽ dễ thương qua các trò chơi thú vị",
};

export default function PaintPictureLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
