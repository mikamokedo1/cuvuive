import { GroupLessonsClient } from "./GroupLessonsClient";

export default async function GroupLessonsPage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = await params;
  return <GroupLessonsClient groupId={groupId} />;
}
