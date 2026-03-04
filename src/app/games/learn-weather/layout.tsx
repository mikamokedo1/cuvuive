import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Học Thời Tiết | Cú Thông Minh",
  description: "Bé làm quen với các hiện tượng thời tiết và khí hậu qua hình ảnh vui nhộn",
};

export default function LearnWeatherLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
