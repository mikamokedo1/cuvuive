/**
 * Generate seed.sql from the COURSES constant in constants/courses.ts
 *
 * Single source of truth: constants/courses.ts → seed.sql
 *
 * Usage: npm run db:generate-seed
 */

import fs from "fs";
import path from "path";
import { COURSES } from "../libs/constants/courses";

// Helper to escape single quotes for SQL
function esc(str: string): string {
  return str.replace(/'/g, "''");
}

function main() {
  const lines: string[] = [];

  lines.push("-- =============================================");
  lines.push("-- AUTO-GENERATED from constants/courses.ts");
  lines.push(`-- Generated at: ${new Date().toISOString()}`);
  lines.push("-- Do NOT edit manually. Run: npm run db:generate-seed");
  lines.push("-- =============================================");
  lines.push("");

  // ============================================
  // 1. INSERT COURSES
  // ============================================
  lines.push("-- ============================================");
  lines.push("-- 1. INSERT COURSES");
  lines.push("-- ============================================");

  const courseValues: string[] = [];
  COURSES.forEach((course, index) => {
    const thumbnail = typeof course.icon === "string" ? course.icon : null;
    const thumbSql = thumbnail ? `'${esc(thumbnail)}'` : "NULL";
    courseValues.push(
      `  ('${esc(course.id)}', '${esc(course.title)}', '${esc(course.description)}', ${thumbSql}, ${index + 1})`,
    );
  });

  lines.push("INSERT INTO courses (id, title, description, thumbnail, sort_index) VALUES");
  lines.push(courseValues.join(",\n"));
  lines.push("ON CONFLICT (id) DO UPDATE SET");
  lines.push("  title = EXCLUDED.title,");
  lines.push("  description = EXCLUDED.description,");
  lines.push("  thumbnail = EXCLUDED.thumbnail,");
  lines.push("  sort_index = EXCLUDED.sort_index;");
  lines.push("");

  // ============================================
  // 2. INSERT GROUPS
  // ============================================
  lines.push("-- ============================================");
  lines.push("-- 2. INSERT GROUPS FOR EACH COURSE");
  lines.push("-- ============================================");
  lines.push("");

  for (const course of COURSES) {
    if (course.groups.length === 0) continue;

    lines.push(`-- ${course.title} Groups`);

    const groupValues: string[] = [];
    course.groups.forEach((group, gIndex) => {
      const groupId = `${course.id}-${group.id}`;
      groupValues.push(
        `  ('${esc(groupId)}', '${esc(group.id)}', '${esc(course.id)}', '${esc(group.title)}', ${gIndex + 1})`,
      );
    });

    lines.push("INSERT INTO groups (id, slug, course_id, title, sort_index) VALUES");
    lines.push(groupValues.join(",\n"));
    lines.push("ON CONFLICT (id) DO UPDATE SET");
    lines.push("  title = EXCLUDED.title,");
    lines.push("  sort_index = EXCLUDED.sort_index;");
    lines.push("");
  }

  // ============================================
  // 3. INSERT LESSONS
  // ============================================
  lines.push("-- ============================================");
  lines.push("-- 3. INSERT LESSONS (lesson1 is typically FREE)");
  lines.push("-- ============================================");
  lines.push("");

  for (const course of COURSES) {
    if (course.groups.length === 0) continue;

    const lessonValues: string[] = [];
    let hasLessons = false;

    course.groups.forEach((group) => {
      const groupId = `${course.id}-${group.id}`;

      group.lessons.forEach((lesson, lIndex) => {
        hasLessons = true;
        const lessonId = `${course.id}-${group.id}-${lesson.id}`;
        const isFree = lesson.isFree ? "true" : "false";
        lessonValues.push(
          `  ('${esc(lessonId)}', '${esc(lesson.id)}', '${esc(groupId)}', '${esc(course.id)}', '${esc(lesson.title)}', ${isFree}, ${lIndex + 1})`,
        );
      });
    });

    if (!hasLessons) continue;

    lines.push(`-- ${course.title} Lessons`);
    lines.push("INSERT INTO lessons (id, slug, group_id, course_id, title, is_free, sort_index) VALUES");
    lines.push(lessonValues.join(",\n"));
    lines.push("ON CONFLICT (id) DO UPDATE SET");
    lines.push("  title = EXCLUDED.title,");
    lines.push("  is_free = EXCLUDED.is_free,");
    lines.push("  sort_index = EXCLUDED.sort_index;");
    lines.push("");
  }

  // ============================================
  // VERIFY DATA
  // ============================================
  lines.push("-- ============================================");
  lines.push("-- VERIFY DATA");
  lines.push("-- ============================================");
  lines.push("SELECT");
  lines.push("  c.title as course,");
  lines.push('  g.title as "group",');
  lines.push("  l.title as lesson,");
  lines.push("  l.is_free,");
  lines.push("  l.sort_index");
  lines.push("FROM lessons l");
  lines.push("JOIN groups g ON l.group_id = g.id");
  lines.push("JOIN courses c ON l.course_id = c.id");
  lines.push("ORDER BY c.sort_index, g.sort_index, l.sort_index;");
  lines.push("");

  const outputPath = path.join(process.cwd(), "src/db/seed.sql");
  fs.writeFileSync(outputPath, lines.join("\n"), "utf8");

  // Print summary
  const totalCourses = COURSES.length;
  const totalGroups = COURSES.reduce((sum, c) => sum + c.groups.length, 0);
  const totalLessons = COURSES.reduce((sum, c) => sum + c.groups.reduce((gs, g) => gs + g.lessons.length, 0), 0);

  console.log("✅ seed.sql generated successfully!");
  console.log(`   📚 ${totalCourses} courses`);
  console.log(`   📁 ${totalGroups} groups`);
  console.log(`   📝 ${totalLessons} lessons`);
  console.log(`   📄 ${outputPath}`);
}

main();
