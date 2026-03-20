import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kiếm tiền qua giới thiệu | Cú Thông Minh",
  description:
    "Giới thiệu bạn bè sử dụng Cú Thông Minh và nhận hoa hồng 10% trên đơn hàng đầu tiên. Rút tiền dễ dàng qua chuyển khoản ngân hàng.",
  openGraph: {
    title: "Kiếm tiền qua giới thiệu | Cú Thông Minh",
    description:
      "Giới thiệu bạn bè sử dụng Cú Thông Minh và nhận hoa hồng 10% trên đơn hàng đầu tiên.",
    url: "https://cuthongminh.com/gioi-thieu-kiem-tien",
    type: "website",
  },
};

export default function ReferralIntroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
