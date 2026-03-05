import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vẽ Tranh | Cú Thông Minh",
  description: "Bé phát huy khả năng sáng tạo qua các bức tranh sinh động",
};

export default function PaintPictureLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
