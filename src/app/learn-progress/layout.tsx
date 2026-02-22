import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hồ sơ của bé - Cú Thông Minh",
  description: "Xem lại tiến độ học tập và thành tích của bé trên Cú Thông Minh.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
