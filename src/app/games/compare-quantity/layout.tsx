import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bé học so sánh - Cú Thông Minh",
  description: "Dạy bé học khái niệm lớn hơn, nhỏ hơn và bằng nhau thông qua các trò chơi thú vị.",
  keywords: ["học so sánh", "toán mầm non", "lớn hơn nhỏ hơn", "cú thông minh"],
};

export default function CompareQuantityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
