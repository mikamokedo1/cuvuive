import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kiếm tiền qua giới thiệu | Cú Thông Minh",
  description:
    "Giới thiệu bạn bè sử dụng Cú Thông Minh và nhận hoa hồng 10% trên đơn hàng đầu tiên. Rút tiền dễ dàng qua chuyển khoản ngân hàng.",
  alternates: {
    canonical: "/gioi-thieu-kiem-tien",
  },
  openGraph: {
    title: "Kiếm tiền qua giới thiệu | Cú Thông Minh",
    description:
      "Giới thiệu bạn bè sử dụng Cú Thông Minh và nhận hoa hồng 10% trên đơn hàng đầu tiên.",
    url: "https://cuthongminh.com/gioi-thieu-kiem-tien",
    type: "website",
    images: [{ url: "/og-image.webp", width: 1200, height: 630, alt: "Cú Thông Minh - Kiếm tiền qua giới thiệu" }],
  },
};

export default function ReferralIntroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
