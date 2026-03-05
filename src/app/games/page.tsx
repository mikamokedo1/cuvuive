import { getCourses } from "@/libs/actions/courses";
import { GamesMap } from "./GamesMap";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kho Trò Chơi Giáo Dục - Cú Thông Minh",
  description:
    "Khám phá hơn 20+ trò chơi giáo dục tương tác đa dạng chủ đề: Toán học, Âm nhạc, Động vật, Địa lý giúp bé phát triển trí tuệ toàn diện.",
};

export default async function GamesPage() {
  const courses = await getCourses();
  return <GamesMap courses={courses} />;
}
