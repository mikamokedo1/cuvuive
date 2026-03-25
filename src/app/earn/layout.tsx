import type { Metadata } from "next";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Kiếm Tiền Cùng Cú Thông Minh | Chương trình giới thiệu",
  description:
    "Giới thiệu bạn bè sử dụng Cú Thông Minh và nhận hoa hồng 10% trên đơn hàng đầu tiên. Tham gia chương trình affiliate ngay!",
  alternates: {
    canonical: "/earn",
  },
  openGraph: {
    title: "Kiếm Tiền Cùng Cú Thông Minh",
    description:
      "Giới thiệu bạn bè và nhận hoa hồng 10% đơn hàng đầu tiên. Chương trình affiliate dành cho phụ huynh.",
    images: [{ url: "/og-image.webp", width: 1200, height: 630, alt: "Cú Thông Minh - Kiếm tiền" }],
  },
  robots: { index: false, follow: false },
};

export default function EarnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-50 font-[family-name:var(--font-nunito-sans)] py-6 px-4">
      <Header />
      {children}
    </div>
  );
}
