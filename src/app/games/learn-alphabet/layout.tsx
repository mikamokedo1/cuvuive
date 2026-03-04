import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bảng Chữ Cái | Cú Thông Minh",
  description: "Bé học bảng chữ cái tiếng Việt qua hình ảnh và trò chơi vui nhộn",
};

export default function LearnAlphabetLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
