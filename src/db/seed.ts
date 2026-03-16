import { config } from "dotenv";
import { sql } from "drizzle-orm";
import fs from "fs";
import path from "path";
config({ path: ".env.local" });

async function seed() {
  const { db } = await import("./index");
  const { courses, groups, lessons, plans } = await import("./schema");

  console.log("🌱 Seeding courses, groups, and lessons from seed.sql...");

  try {
    // Clear existing data (lessons depend on groups, groups on courses)
    await db.delete(lessons);
    await db.delete(groups);
    await db.delete(courses);
    console.log("Deleted old course data");

    const sqlContent = fs.readFileSync(path.join(process.cwd(), "src/db/seed.sql"), "utf8");
    await db.execute(sql.raw(sqlContent));

    console.log("✅ Courses seeded successfully");

    // // Seed Plans (Keep existing logic)
    // console.log("🌱 Seeding plans table...");

    // const plansData = [
    //   {
    //     name: "Lớp Mầm",
    //     code: "seed",
    //     price: 100000,
    //     durationMonths: 1,
    //     description: "Gói 1 tháng dành cho bé mới bắt đầu",
    //   },
    //   {
    //     name: "Lớp Chồi",
    //     code: "bud",
    //     price: 240000,
    //     durationMonths: 3,
    //     description: "Gói 3 tháng tiết kiệm hơn",
    //   },
    //   {
    //     name: "Lớp Lá",
    //     code: "leaf",
    //     price: 600000,
    //     durationMonths: 12,
    //     description: "Gói 1 năm đầu tư dài hạn",
    //   },
    // ];

    // await db
    //   .insert(plans)
    //   .values(plansData)
    //   .onConflictDoUpdate({
    //     target: plans.code,
    //     set: {
    //       name: sql.raw("excluded.name"),
    //       price: sql.raw("excluded.price"),
    //       durationMonths: sql.raw("excluded.duration_months"),
    //       description: sql.raw("excluded.description"),
    //     },
    //   });

    // console.log("✅ Plans seeded/updated");
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
