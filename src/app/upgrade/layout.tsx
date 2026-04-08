import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nâng Cấp Tài Khoản | Cú Thông Minh",
  description: "Chọn gói phù hợp để mở khóa toàn bộ kho trò chơi giáo dục trên Cú Thông Minh.",

};

export default function UpgradeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
