import { LessonParams } from "@/types/lesson";
import { GroupLessonsClient } from "./GroupLessonsClient";

export default function GroupLessonsPage({ params }: { params: LessonParams }) {
  return <GroupLessonsClient groupId={params.groupId} />;
}
