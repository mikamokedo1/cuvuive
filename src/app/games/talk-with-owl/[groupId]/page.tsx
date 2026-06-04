import { TalkWithOwlGroupClient } from "./TalkWithOwlGroupClient";
import { TalkWithOwlSeoSection } from "@/features/games/talk-with-owl/TalkWithOwlSeoSection";
import { GROUPS } from "@/features/games/talk-with-owl/constants";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ groupId: string }>;
}

export async function generateStaticParams() {
  return GROUPS.map((group) => ({
    groupId: group.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { groupId } = await params;
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) {
    return {
      title: "Luyện Nói Tiếng Anh với AI - Cú Thông Minh",
    };
  }

  const title = `Luyện Nói Tiếng Anh Chủ Đề ${group.title} | Cú Thông Minh`;
  const description = `Bé luyện nói và giao tiếp tiếng Anh chủ đề ${group.title} qua 3 bài học: Học từ mới, Học câu, Hỏi đáp giao tiếp với cô giáo AI. ${group.description}.`;
  const pageUrl = `https://cuthongminh.com/games/talk-with-owl/${groupId}`;
  const imageUrl = typeof group.logo === "string" ? group.logo : "https://assets.cuthongminh.com/assets/logo.webp";

  return {
    title,
    description,
    alternates: {
      canonical: `/games/talk-with-owl/${groupId}`,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function TalkWithOwlGroupPage({ params }: PageProps) {
  const { groupId } = await params;
  return (
    <>
      <TalkWithOwlGroupClient groupId={groupId} />
      <TalkWithOwlSeoSection groupId={groupId} />
    </>
  );
}
