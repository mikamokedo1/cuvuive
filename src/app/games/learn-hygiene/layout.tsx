import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Học Vệ Sinh Cá Nhân | Cú Vui Vẻ",
  description: "Bé học các thói quen vệ sinh cá nhân tốt qua hình ảnh và trò chơi",
};

export default function LearnHygieneLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
