import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Học Địa Danh | Cú Thông Minh",
  description: "Bé khám phá các địa danh và kỳ quan nổi tiếng trên thế giới.",
};

export default function LearnLandmarkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
