import { LessonParams } from "@/types/lesson";
import { getGameMetadata } from "@/libs/utils/seo";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: LessonParams }): Promise<Metadata> {
  return getGameMetadata("learn-english-songs", params.groupId);
}

export default function GroupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
