import { FeedbackView } from "@/features/feedback/FeedbackView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Góp ý | Cú Vui Vẻ",
  description: "Trang gửi góp ý và phản hồi cho hệ thống Cú Vui Vẻ",
};

export default function FeedbackPage() {
  return <FeedbackView />;
}
