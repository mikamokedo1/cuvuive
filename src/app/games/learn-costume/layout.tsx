import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Học Trang Phục | Cú Thông Minh",
  description: "Bé làm quen với các loại trang phục và phụ kiện hàng ngày.",
};

export default function LearnCostumeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
