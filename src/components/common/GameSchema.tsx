import { COURSES } from "@/libs/constants/courses";

export function GameSchema({ courseId }: { courseId: string }) {
  const course = COURSES.find((c) => c.id === courseId);
  if (!course) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: course.title,
    description: course.description,
    image: typeof course.icon === "string" ? course.icon : `https://assets.cuthongminh.com${course.icon.src}`,
    learningResourceType: "Educational Game",
    educationalLevel: "Preschool, Kindergarten, Early Childhood Education",
    publisher: {
      "@type": "Organization",
      name: "Cú Thông Minh",
      logo: "https://cuthongminh.com/icons/favicon-32x32.png",
    },
    inLanguage: "vi",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      key={`game-jsonld-${courseId}`}
    />
  );
}
