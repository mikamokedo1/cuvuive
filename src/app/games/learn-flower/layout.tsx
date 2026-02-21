import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Học Hoa & Cây | Cú Vui Vẻ",
  description: "Học các loại hoa và cây quen thuộc ở Việt Nam",
};

export default function LearnFlowerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
