import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Học Trái Cây | Cú Vui Vẻ",
  description: "Học các loại trái cây: nhiệt đới, thường gặp, đặc biệt",
};

export default function LearnFruitLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
