import { LessonPageClient } from "./LessonPageClient";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ groupId: string; lessonId: string }>;
}) {
  const { groupId, lessonId } = await params;
  return <LessonPageClient groupId={groupId} lessonId={lessonId} />;
}
