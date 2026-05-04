import { LessonParams } from "@/types/lesson";
import { LessonPageClient } from "./LessonPageClient";

export default function LessonPage({ params }: { params: LessonParams }) {
  return <LessonPageClient groupId={params.groupId} lessonId={params.lessonId} />;
}
