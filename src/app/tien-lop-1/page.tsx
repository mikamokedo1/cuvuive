import type { Metadata } from "next";
import { PRE_GRADE_1_ROADMAP } from "@/libs/constants/roadmaps";
import { PreGrade1Roadmap } from "./PreGrade1Roadmap";
import { safeJsonLd } from "@/libs/utils/safe-jsonld";
import { HeaderHomeWithSearch } from "@/components/layout/HeaderHomeWithSearch";

export const metadata: Metadata = {
  title: "Lộ Trình Tiền Lớp 1 - Cú Thông Minh",
  description:
    "Lộ trình chuẩn bị vào lớp 1 cho bé 5-6 tuổi. 3 chặng học: Làm Quen → Nền Tảng → Tăng Tốc với 25+ trò chơi giáo dục tương tác. Bám sát Bộ chuẩn phát triển trẻ em 5 tuổi.",
  keywords: [
    "tiền lớp 1",
    "chuẩn bị vào lớp 1",
    "lộ trình học cho bé 5 tuổi",
    "bé chuẩn bị vào lớp 1",
    "game giáo dục tiền tiểu học",
    "học chữ cái cho bé",
    "học toán cho bé mầm non",
    "trò chơi giáo dục mầm non",
    "cú thông minh tiền lớp 1",
  ],
  alternates: {
    canonical: "/tien-lop-1",
  },
  openGraph: {
    title: "Lộ Trình Tiền Lớp 1 - Cú Thông Minh",
    description:
      "Lộ trình chuẩn bị vào lớp 1 dành cho bé 5-6 tuổi. 25+ trò chơi giáo dục tương tác giúp bé tự tin bước vào tiểu học.",
    images: [
      {
        url: "https://vnlppyavpkuerviyszxg.supabase.co/storage/v1/object/public/blog-images/hero_chuan-bi-vao-lop-1-toan-dien-1780659661318.webp",
        width: 1200,
        height: 630,
        alt: "Cú Thông Minh - Lộ Trình Tiền Lớp 1",
      },
    ],
  },
};

export default function TienLop1Page() {
  const roadmap = PRE_GRADE_1_ROADMAP;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Lộ Trình Tiền Lớp 1 - Cú Thông Minh",
    description: roadmap.description,
    url: "https://cuthongminh.com/tien-lop-1",
    provider: {
      "@type": "Organization",
      name: "Cú Thông Minh",
      url: "https://cuthongminh.com",
    },
    educationalLevel: "Preschool",
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
      suggestedMinAge: 5,
      suggestedMaxAge: 6,
    },
    inLanguage: "vi",
    isAccessibleForFree: true,
    hasCourseInstance: roadmap.stages.map((stage) => ({
      "@type": "CourseInstance",
      name: `Chặng ${stage.number}: ${stage.title}`,
      description: stage.subtitle,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Trang chủ",
        item: "https://cuthongminh.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Trò chơi",
        item: "https://cuthongminh.com/games",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Tiền Lớp 1",
        item: "https://cuthongminh.com/tien-lop-1",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }}
      />
      <HeaderHomeWithSearch />
      <PreGrade1Roadmap roadmap={roadmap} />
    </>
  );
}
