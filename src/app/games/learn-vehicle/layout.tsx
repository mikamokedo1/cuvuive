import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Học Phương Tiện Giao Thông | Cú Vui Vẻ",
  description: "Học các loại phương tiện giao thông: đường bộ, đường thủy, hàng không",
};

export default function LearnVehicleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
