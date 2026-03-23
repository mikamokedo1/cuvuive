import { FeedbackView } from "@/features/feedback/FeedbackView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Góp ý | Cú Thông Minh",
  description: "Trang gửi góp ý và phản hồi cho hệ thống Cú Thông Minh",
  alternates: {
    canonical: "/feedback",
  },
  openGraph: {
    title: "Góp ý | Cú Thông Minh",
    description: "Trang gửi góp ý và phản hồi cho hệ thống Cú Thông Minh",
    images: [{ url: "/og-image.webp", width: 1200, height: 630, alt: "Cú Thông Minh - Góp ý" }],
  },
};

export default function FeedbackPage() {
  return <FeedbackView />;
}
