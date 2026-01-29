import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bé học đếm số - Cú Thông Minh",
  description: "Trò chơi học số tương tác cho bé từ 1 đến 9 giúp bé nhận diện và đếm số vui vẻ.",
  keywords: ["bé học số", "học đếm", "số học cho trẻ em", "cú thông minh"],
};

export default function NumberGameLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
