import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập - Cú Thông Minh",
  description: "Đăng nhập vào Cú Thông Minh để theo dõi tiến độ học tập của bé.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
