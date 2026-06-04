import { LessonPageClient } from "./LessonPageClient";
import { GROUPS } from "@/features/games/talk-with-owl/constants";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ groupId: string; lessonId: string }>;
}

const LESSON_TITLES: Record<string, string> = {
  lesson1: "Học Từ Mới",
  lesson2: "Học Câu",
  lesson3: "Hỏi Đáp Giao Tiếp",
};

const LESSON_DESCRIPTIONS: Record<string, string> = {
  lesson1: "AI dạy bé từng từ vựng tiếng Anh, cho bé phát âm theo và sửa lỗi ngay lập tức",
  lesson2: "AI dạy bé các câu giao tiếp thông dụng, đặt trong ngữ cảnh thực tế để bé dễ hiểu",
  lesson3: "AI hội thoại tự do với bé, đóng vai tình huống vui nhộn, giúp bé tự tin phản xạ nói",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { groupId, lessonId } = await params;
  const group = GROUPS.find((g) => g.id === groupId);
  const lessonTitle = LESSON_TITLES[lessonId] || "Bài học";
  const lessonDesc = LESSON_DESCRIPTIONS[lessonId] || "";

  if (!group) {
    return {
      title: "Luyện Nói Tiếng Anh với AI - Cú Thông Minh",
    };
  }

  const title = `${lessonTitle} - ${group.title} | Giao Tiếp Tiếng Anh AI | Cú Thông Minh`;
  const description = `Bé ${lessonTitle.toLowerCase()} chủ đề ${group.title} bằng tiếng Anh. ${lessonDesc}. Cô giáo AI Cú Thông Minh dạy song ngữ cho trẻ 3-8 tuổi.`;

  return {
    title,
    description,
    robots: { index: false, follow: true },
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ groupId: string; lessonId: string }>;
}) {
  const { groupId, lessonId } = await params;
  return <LessonPageClient groupId={groupId} lessonId={lessonId} />;
}
