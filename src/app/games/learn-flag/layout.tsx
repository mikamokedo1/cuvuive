import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Học Quốc Kỳ | Cú Thông Minh",
  description: "Khám phá thế giới qua quốc kỳ của các quốc gia khác nhau.",
};

export default function LearnFlagLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
