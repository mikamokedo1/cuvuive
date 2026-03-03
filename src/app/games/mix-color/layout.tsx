import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pha Màu - Cú Vui Vẻ",
  description: "Bé học cách pha trộn màu sắc để tạo ra màu mới qua các trò chơi thú vị",
};

export default function MixColorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
