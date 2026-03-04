import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nhận Biết Cảm Xúc | Cú Thông Minh",
  description: "Bé học cách nhận biết và gọi tên cảm xúc qua hình ảnh và tình huống kịch bản",
};

export default function LearnEmotionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
