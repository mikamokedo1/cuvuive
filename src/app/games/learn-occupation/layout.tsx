import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Học Nghề Nghiệp | Cú Thông Minh",
  description: "Học các nghề nghiệp: cộng đồng, y tế, nghệ thuật",
};

export default function LearnOccupationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
