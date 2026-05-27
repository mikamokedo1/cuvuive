import type { Metadata } from "next";
import { VoiceChat } from "@/features/games/talk-with-owl/VoiceChat";

export const metadata: Metadata = {
  title: "Nói Chuyện Với Cú — Trợ Lý AI Giọng Nói Cho Bé",
  description:
    "Bé trò chuyện trực tiếp với Cú Thông Minh bằng giọng nói. Cú kể chuyện, đố vui, dạy bé học chữ số và nhiều kiến thức thú vị. An toàn, thân thiện cho trẻ 3-8 tuổi.",
  openGraph: {
    title: "Nói Chuyện Với Cú — Trợ Lý AI Giọng Nói Cho Bé",
    description:
      "Bé trò chuyện trực tiếp với Cú Thông Minh bằng giọng nói. Cú kể chuyện, đố vui, dạy bé học chữ số.",
  },
};

export default function TalkWithOwlPage() {
  return <VoiceChat />;
}
