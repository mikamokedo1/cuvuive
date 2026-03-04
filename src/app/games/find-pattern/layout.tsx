import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tìm Quy Luật | Cú Thông Minh",
  description: "Bé học tìm quy luật qua các hình dạng và màu sắc vui nhộn.",
};

export default function FindPatternLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
