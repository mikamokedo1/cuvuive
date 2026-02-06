import { config } from "dotenv";
import { sql } from "drizzle-orm";
config({ path: ".env.local" });

// Use relative path for imports to avoid alias issues if not configured in tsx
import { COURSES } from "../libs/constants/courses";

async function seed() {
  const { db } = await import("./index");
  const { courses, groups, lessons, plans } = await import("./schema");

  console.log("🌱 Seeding courses, groups, and lessons...");

  try {
    // Clear existing data (lessons depend on groups, groups on courses)
    await db.delete(lessons);
    await db.delete(groups);
    await db.delete(courses);
    console.log("Deleted old course data");

    for (const course of COURSES) {
      console.log(`Inserting course: ${course.title}`);
      await db.insert(courses).values({
        id: course.id,
        title: course.title,
        description: course.description,
        thumbnail: course.thumbnail,
        sortIndex: 0, // You can add logic for index if needed
      });

      for (const group of course.groups) {
        // Construct a unique ID for the group since we might have collisions with "group1" across courses if we didn't use composite keys
        // But our schema says group.id is PK text.
        // It's safer to generate a UUID or use composite-like unique string.
        // Let's use `${course.id}-${group.id}` to be essentially unique and readable,
        // OR just use a UUID.
        // The URL uses `groupId` (slug). So we need to store the slug "group1".
        // The table schema has `id` (PK) and `slug`.
        // So `id` = UUID, `slug` = `group.id` (e.g. "group1").

        const groupDbId = crypto.randomUUID();

        await db.insert(groups).values({
          id: groupDbId,
          slug: group.id, // "group1"
          courseId: course.id,
          title: group.title,
          sortIndex: 0,
        });

        for (const lesson of group.lessons) {
          await db.insert(lessons).values({
            id: crypto.randomUUID(),
            slug: lesson.id, // "lesson1"
            groupId: groupDbId,
            courseId: course.id,
            title: lesson.title,
            isFree: lesson.isFree || false,
            sortIndex: 0,
          });
        }
      }
    }

    console.log("✅ Courses seeded successfully");

    // Seed Plans (Keep existing logic)
    console.log("🌱 Seeding plans table...");

    const plansData = [
      {
        name: "Lớp Mầm",
        code: "seed",
        price: 100000,
        durationMonths: 1,
        description: "Gói 1 tháng dành cho bé mới bắt đầu",
      },
      {
        name: "Lớp Chồi",
        code: "bud",
        price: 240000,
        durationMonths: 3,
        description: "Gói 3 tháng tiết kiệm hơn",
      },
      {
        name: "Lớp Lá",
        code: "leaf",
        price: 600000,
        durationMonths: 12,
        description: "Gói 1 năm đầu tư dài hạn",
      },
    ];

    await db
      .insert(plans)
      .values(plansData)
      .onConflictDoUpdate({
        target: plans.code,
        set: {
          name: sql.raw("excluded.name"),
          price: sql.raw("excluded.price"),
          durationMonths: sql.raw("excluded.duration_months"),
          description: sql.raw("excluded.description"),
        },
      });

    console.log("✅ Plans seeded/updated");
  } catch (error) {
    console.error("Error seeding:", error);
    process.exit(1);
  }

  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
