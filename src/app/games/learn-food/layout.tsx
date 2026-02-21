import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Học Món Ăn | Cú Vui Vẻ",
  description: "Bé khám phá thế giới ẩm thực qua hình ảnh sinh động",
};

export default function LearnFoodLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
