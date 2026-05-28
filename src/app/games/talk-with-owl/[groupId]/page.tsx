import { TalkWithOwlGroupClient } from "./TalkWithOwlGroupClient";

export default async function TalkWithOwlGroupPage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = await params;
  return <TalkWithOwlGroupClient groupId={groupId} />;
}
