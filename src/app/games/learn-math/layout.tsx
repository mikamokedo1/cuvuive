import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toán Học Cơ Bản | Cú Thông Minh",
  description: "Bé làm quen với các khái niệm toán học cơ bản và luyện tập tư duy logic.",
};

export default function LearnMathLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
