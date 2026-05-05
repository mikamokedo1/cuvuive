import { getGameMetadata } from "@/libs/utils/seo";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ groupId: string }>;
}): Promise<Metadata> {
  const { groupId } = await params;
  return getGameMetadata("learn-english-alphabet", groupId);
}

export default function GroupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
