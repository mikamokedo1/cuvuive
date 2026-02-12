import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Học Nhạc Cụ | Cú Vui Vẻ",
  description: "Học các loại nhạc cụ: dây, gõ, hơi",
};

export default function LearnInstrumentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
