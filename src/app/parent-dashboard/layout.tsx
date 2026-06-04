import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thống Kê Học Tập",
  description: "Theo dõi tiến độ và thành tích học tập của bé trên Cú Thông Minh. Xem thống kê thời gian học, số bài hoàn thành, điểm trung bình và phân tích thế mạnh.",
  robots: { index: false, follow: false }, // Private page
};

export default function ParentDashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
