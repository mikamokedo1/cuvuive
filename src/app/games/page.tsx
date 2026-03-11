import { getCourses } from "@/libs/actions/courses";
import { GamesMap } from "./GamesMap";
import type { Metadata } from "next";

import { COURSES } from "@/libs/constants/courses";
import { GROUPS } from "@/libs/constants/groups";

export const metadata: Metadata = {
  title: "Kho Trò Chơi Giáo Dục - Cú Thông Minh",
  description:
    "Khám phá hơn 20+ trò chơi giáo dục tương tác đa dạng chủ đề: Toán học, Âm nhạc, Động vật, Địa lý giúp bé phát triển trí tuệ toàn diện.",
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
    url: "https://assets.cuthongminh.com/games",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: COURSES.map((course, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: course.title,
          description: course.description,
          url: `https://assets.cuthongminh.com/games/${course.id}`,
        },
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <GamesMap courses={courses} staticCourses={staticCourses} groups={GROUPS} />
    </>
  );
}
