import { FeedbackView } from "@/features/feedback/FeedbackView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Góp Ý & Phản Hồi | Cú Thông Minh - Game Giáo Dục Cho Bé",
  description: "Gửi góp ý, phản hồi và đề xuất tính năng cho ứng dụng Cú Thông Minh - Game giáo dục cho bé 3-8 tuổi.",
  alternates: {
    canonical: "/feedback",
  },
  openGraph: {
    title: "Góp Ý & Phản Hồi | Cú Thông Minh",
    description: "Gửi góp ý, phản hồi và đề xuất tính năng cho ứng dụng Cú Thông Minh - Game giáo dục cho bé 3-8 tuổi.",
    images: [{ url: "/og-image.webp", width: 1200, height: 630, alt: "Cú Thông Minh - Góp ý" }],
  },
};

export default function FeedbackPage() {
  return <FeedbackView />;
}
