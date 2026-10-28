import { getCourses } from "@/libs/actions/courses";
import { GamesMap } from "./GamesMap";
import type { Metadata } from "next";

import { COURSES } from "@/libs/constants/courses";
import { GROUPS } from "@/libs/constants/groups";
import { safeJsonLd } from "@/libs/utils/safe-jsonld";

export const metadata: Metadata = {
  title: "Kho Trò Chơi Giáo Dục Tương Tác Cho Bé 3-8 Tuổi",
  description:
    "Khám phá 45+ trò chơi giáo dục tương tác với hơn 580 bài học đa dạng chủ đề: Toán học, Tiếng Việt, Tiếng Anh, Tư duy logic, Khoa học, Âm nhạc và Kỹ năng sống cho bé.",
  keywords: [
    "trò chơi giáo dục cho bé",
    "game học tập cho trẻ mầm non",
    "trò chơi trí tuệ cho bé 3 tuổi",
    "game toán cho bé online",
    "trò chơi học chữ cái",
    "game giáo dục miễn phí cho trẻ",
    "trò chơi phát triển tư duy cho bé",
    "ứng dụng học tập cho bé mầm non",
  ],
  alternates: {
    canonical: "/games",
  },
  openGraph: {
    title: "Kho Trò Chơi Giáo Dục Tương Tác Cho Bé 3-8 Tuổi | Cú Thông Minh",
    description:
      "Khám phá 45+ trò chơi giáo dục tương tác giúp bé phát triển trí tuệ toàn diện: Toán học, Tiếng Việt, Tiếng Anh, Tư duy logic, Khoa học, Âm nhạc.",
    images: [{ url: "/og-image.webp", width: 1200, height: 630, alt: "Cú Thông Minh - Kho trò chơi giáo dục" }],
  },
};

export default async function GamesPage() {
  const courses = await getCourses();

  // Strip massive lesson hierarchies from COURSES before sending payload to Client Component
  const staticCourses = COURSES.map((course) => ({
    id: course.id,
    title: course.title,
    icon: course.icon,
    type: course.type,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Kho Trò Chơi Giáo Dục - Cú Thông Minh",
    description:
      "Hơn 20+ trò chơi giáo dục tương tác giúp bé phát triển trí tuệ toàn diện: Toán học, Âm nhạc, Động vật, Địa lý.",
    url: "https://cuthongminh.com/games",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: COURSES.map((course, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: course.title,
          description: course.description,
          url: `https://cuthongminh.com/games/${course.id}`,
        },
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
      <GamesMap courses={courses} staticCourses={staticCourses} groups={GROUPS} />
    </>
  );
}
