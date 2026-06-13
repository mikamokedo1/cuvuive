import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getRoadmapBySlug, ROADMAPS } from "@/libs/constants/roadmaps";
import { RoadmapView } from "./RoadmapView";
import { safeJsonLd } from "@/libs/utils/safe-jsonld";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { HeaderHomeWithSearch } from "@/components/layout/HeaderHomeWithSearch";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return ROADMAPS.map((r) => ({ id: r.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const roadmap = getRoadmapBySlug(id);

  if (!roadmap) {
    return { title: "Không tìm thấy lộ trình" };
  }

  const totalGames = roadmap.stages.reduce(
    (s, st) => s + st.categories.reduce((s2, c) => s2 + c.games.length, 0),
    0,
  );

  return {
    title: `Lộ Trình ${roadmap.title} - Cú Thông Minh`,
    description: `${roadmap.description} ${roadmap.stages.length} chặng học với ${totalGames}+ trò chơi giáo dục tương tác.`,
    keywords: [
      roadmap.title.toLowerCase(),
      `lộ trình học cho bé ${roadmap.ageRange[0]} tuổi`,
      `lộ trình học cho bé ${roadmap.ageRange[1]} tuổi`,
      "game giáo dục",
      "trò chơi giáo dục",
      "cú thông minh",
      ...(roadmap.id === "tien-lop-1"
        ? [
            "tiền lớp 1",
            "bài học tiền lớp 1",
            "tiền tiểu học",
            "bài học tiền tiểu học",
            "chuẩn bị vào lớp 1",
            "bé 5 tuổi vào lớp 1",
          ]
        : []),
    ],
    alternates: {
      canonical: `/lo-trinh/${roadmap.slug}`,
    },
    openGraph: {
      title: `Lộ Trình ${roadmap.title} - Cú Thông Minh`,
      description: roadmap.description,
      images: [
        {
          url: roadmap.heroImage,
          width: 1200,
          height: 630,
          alt: `Cú Thông Minh - Lộ Trình ${roadmap.title}`,
        },
      ],
    },
  };
}

export default async function RoadmapPage({ params }: PageProps) {
  const { id } = await params;
  const roadmap = getRoadmapBySlug(id);

  if (!roadmap) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `Lộ Trình ${roadmap.title} - Cú Thông Minh`,
    description: roadmap.description,
    url: `https://cuthongminh.com/lo-trinh/${roadmap.slug}`,
    provider: {
      "@type": "Organization",
      name: "Cú Thông Minh",
      url: "https://cuthongminh.com",
    },
    educationalLevel: roadmap.educationalLevel,
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
      suggestedMinAge: roadmap.ageRange[0],
      suggestedMaxAge: roadmap.ageRange[1],
    },
    inLanguage: "vi",
    isAccessibleForFree: true,
    hasCourseInstance: roadmap.stages.map((stage) => ({
      "@type": "CourseInstance",
      name: `Chặng ${stage.number}: ${stage.title}`,
      description: stage.subtitle,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <Breadcrumbs
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Lộ Trình", href: "/lo-trinh" },
          { label: roadmap.title, href: `/lo-trinh/${roadmap.slug}` },
        ]}
        className="fixed top-[72px] left-0 right-0 z-20 bg-white/80 backdrop-blur-sm border-b border-slate-100 px-4 py-2 !mb-0"
      />
      <HeaderHomeWithSearch />
      <RoadmapView roadmap={roadmap} />
    </>
  );
}
