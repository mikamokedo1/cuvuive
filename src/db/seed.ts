import { config } from "dotenv";
import { sql } from "drizzle-orm";
config({ path: ".env.local" });

async function seed() {
  // Dynamic imports AFTER dotenv loads
  const { db } = await import("./index");
  const { courseAccess, plans } = await import("./schema");

  console.log("🌱 Seeding course_access table...");

  // Seed learn-numbers and compare-quantity courses
  const seedData = [
    // learn-numbers: Group 1 (1-3)
    { courseId: "learn-numbers", groupId: "group1", lessonId: "lesson1", accessType: "free" },
    { courseId: "learn-numbers", groupId: "group1", lessonId: "lesson2", accessType: "premium" },
    { courseId: "learn-numbers", groupId: "group1", lessonId: "lesson3", accessType: "premium" },
    { courseId: "learn-numbers", groupId: "group1", lessonId: "lesson4", accessType: "premium" },
    // learn-numbers: Group 2 (4-6)
    { courseId: "learn-numbers", groupId: "group2", lessonId: "lesson1", accessType: "free" },
    { courseId: "learn-numbers", groupId: "group2", lessonId: "lesson2", accessType: "premium" },
    { courseId: "learn-numbers", groupId: "group2", lessonId: "lesson3", accessType: "premium" },
    { courseId: "learn-numbers", groupId: "group2", lessonId: "lesson4", accessType: "premium" },
    // learn-numbers: Group 3 (7-9)
    { courseId: "learn-numbers", groupId: "group3", lessonId: "lesson1", accessType: "free" },
    { courseId: "learn-numbers", groupId: "group3", lessonId: "lesson2", accessType: "premium" },
    { courseId: "learn-numbers", groupId: "group3", lessonId: "lesson3", accessType: "premium" },
    { courseId: "learn-numbers", groupId: "group3", lessonId: "lesson4", accessType: "premium" },

    // compare-quantity: Group 1 (Lớn hơn)
    { courseId: "compare-quantity", groupId: "group1", lessonId: "lesson1", accessType: "free" },
    { courseId: "compare-quantity", groupId: "group1", lessonId: "lesson2", accessType: "premium" },
    { courseId: "compare-quantity", groupId: "group1", lessonId: "lesson3", accessType: "premium" },
    { courseId: "compare-quantity", groupId: "group1", lessonId: "lesson4", accessType: "premium" },
    // compare-quantity: Group 2 (Nhỏ hơn)
    { courseId: "compare-quantity", groupId: "group2", lessonId: "lesson1", accessType: "free" },
    { courseId: "compare-quantity", groupId: "group2", lessonId: "lesson2", accessType: "premium" },
    { courseId: "compare-quantity", groupId: "group2", lessonId: "lesson3", accessType: "premium" },
    { courseId: "compare-quantity", groupId: "group2", lessonId: "lesson4", accessType: "premium" },
    // compare-quantity: Group 3 (Bằng nhau)
    { courseId: "compare-quantity", groupId: "group3", lessonId: "lesson1", accessType: "free" },
    { courseId: "compare-quantity", groupId: "group3", lessonId: "lesson2", accessType: "premium" },
    { courseId: "compare-quantity", groupId: "group3", lessonId: "lesson3", accessType: "premium" },
    { courseId: "compare-quantity", groupId: "group3", lessonId: "lesson4", accessType: "premium" },
    // compare-quantity: Group 4 (Luyện tập)
    { courseId: "compare-quantity", groupId: "group4", lessonId: "lesson1", accessType: "free" },
    { courseId: "compare-quantity", groupId: "group4", lessonId: "lesson2", accessType: "premium" },
    { courseId: "compare-quantity", groupId: "group4", lessonId: "lesson3", accessType: "premium" },
    { courseId: "compare-quantity", groupId: "group4", lessonId: "lesson4", accessType: "premium" },
  ];

  // Use Upsert for Course Access
  await db
    .insert(courseAccess)
    .values(seedData)
    .onConflictDoUpdate({
      target: [courseAccess.courseId, courseAccess.groupId, courseAccess.lessonId],
      set: { accessType: sql.raw("excluded.access_type") },
    });

  console.log("✅ Seeded/Updated", seedData.length, "course access entries");

  // Seed Plans
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

  // Use Upsert for Plans
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

  console.log("✅ Seeded/Updated", plansData.length, "plans");

  console.log("📊 Access breakdown:");
  console.log("   - learn-numbers: 12 lessons (3 free, 9 premium)");
  console.log("   - compare-quantity: 16 lessons (4 free, 12 premium)");
  console.log("   - PLANS seeded: 3 (Mầm, Chồi, Lá)");

  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
