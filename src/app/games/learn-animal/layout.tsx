import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Học Động Vật | Cú Vui Vẻ",
  description: "Bé làm quen với các loài động vật qua hình ảnh và âm thanh",
};

export default function LearnAnimalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
