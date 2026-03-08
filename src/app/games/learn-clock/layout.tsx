import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Học Xem Đồng Hồ | Cú Thông Minh",
  description: "Bé học cách xem đồng hồ kim và đồng hồ điện tử qua hình ảnh và trò chơi",
};

export default function LearnClockLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
