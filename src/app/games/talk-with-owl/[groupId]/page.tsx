import type { Metadata } from "next";
import { TalkWithOwlGroupClient } from "./TalkWithOwlGroupClient";
import { TalkWithOwlSeoSection } from "@/features/games/talk-with-owl/TalkWithOwlSeoSection";
import { GROUPS } from "@/features/games/talk-with-owl/constants";

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

  const title = `Luyện Nói Tiếng Anh Chủ Đề ${group.title} Với Cô Giáo AI | Cú Thông Minh`;
  const description = `Bé luyện nói và giao tiếp tiếng Anh chủ đề ${group.title} trực tiếp qua giọng nói với cô giáo AI Cú Thông Minh. ${group.description}. Hạn mức miễn phí hàng ngày!`;
  const pageUrl = `https://cuthongminh.com/games/talk-with-owl/${groupId}`;

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
          url: group.logo || "https://assets.cuthongminh.com/assets/logo.webp",
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
      images: [group.logo || "https://assets.cuthongminh.com/assets/logo.webp"],
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

