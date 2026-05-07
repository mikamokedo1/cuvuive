import { getGameMetadata } from "@/libs/utils/seo";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return getGameMetadata("learn-english-alphabet");
}

export default function GroupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
