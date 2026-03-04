import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Học Khủng Long | Cú Thông Minh",
  description: "Bé khám phá thế giới khủng long qua hình ảnh sinh động",
};

export default function LearnDinosaurLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
