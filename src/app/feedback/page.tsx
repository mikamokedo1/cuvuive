import { FeedbackView } from "@/features/feedback/FeedbackView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Góp ý | Cú Thông Minh",
  description: "Trang gửi góp ý và phản hồi cho hệ thống Cú Thông Minh",
};

export default function FeedbackPage() {
  return <FeedbackView />;
}
