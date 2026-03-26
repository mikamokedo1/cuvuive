"use client";

import { useUser } from "@/context/UserContext";
import { CourseCard } from "@/features/profile/CourseCard";
import { UserProfileHeader } from "@/features/profile/UserProfileHeader";
import Header from "@/components/layout/Header";
import { ActionButton } from "@/components/common/ActionButton";
import { LessonTitle } from "@/components/games/LessonTitle";
import { CourseDef } from "@/libs/actions/courses";
import { COURSES } from "@/libs/constants/courses";
import { GROUPS, GameGroupType } from "@/libs/constants/groups";

interface ProfileViewProps {
  courses: CourseDef[];
  currentStreak: number;
  activeDays: number[];
}

import { useProgress } from "@/context/ProgressContext";
import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";

// Build a static map: courseId → category type
const COURSE_TYPE_MAP: Record<string, GameGroupType> = {};
COURSES.forEach((c) => {
  COURSE_TYPE_MAP[c.id] = c.type;
});

export function ProfileView({ courses, currentStreak, activeDays }: ProfileViewProps) {
  const { user, isPremium } = useUser();
  const { allProgress } = useProgress();

  if (!user) {
    return (
      <main className="min-h-screen bg-[#F0F7FF] flex flex-col py-6 px-4">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-gray-500 mb-6">Vui lòng đăng nhập để xem hồ sơ.</p>
            <Link href="/auth/login">
              <ActionButton variant="glossy" color="orange">
                Đăng nhập ngay
              </ActionButton>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Calculate how many courses are 100% complete (all lessons done)
  const { startedCourses, userLevel } = useMemo(() => {
    let completedCoursesCount = 0;

    const started = courses.filter((course) => {
      const progress = allProgress[course.id];
      if (!progress) return false;

      // Check if any group has completed lessons
      const hasStarted = Object.values(progress.completedLessons).some((lessons) => lessons.length > 0);

      // Check if ALL lessons in ALL groups are completed
      if (hasStarted) {
        const totalLessons = course.groups.reduce((sum, g) => sum + g.lessons.length, 0);
        const completedLessons = course.groups.reduce((sum, g) => {
          const done = progress.completedLessons[g.id] || [];
          return sum + done.length;
        }, 0);

        if (totalLessons > 0 && completedLessons >= totalLessons) {
          completedCoursesCount++;
        }
      }

      return hasStarted;
    });

    return { startedCourses: started, userLevel: 1 + completedCoursesCount };
  }, [courses, allProgress]);

  // Group started courses by category
  const groupedByCategory = useMemo(() => {
    const grouped: Record<string, CourseDef[]> = {};

    startedCourses.forEach((course) => {
      const type = COURSE_TYPE_MAP[course.id] || "other";
      if (!grouped[type]) grouped[type] = [];
      grouped[type].push(course);
    });

    // Order categories following GROUPS order
    const ordered: { type: GameGroupType; title: string; icon: string; courses: CourseDef[] }[] = [];
    GROUPS.forEach((group) => {
      if (grouped[group.id]) {
        ordered.push({
          type: group.id,
          title: group.title,
          icon: typeof group.icon === "string" ? group.icon : "",
          courses: grouped[group.id],
        });
      }
    });

    return ordered;
  }, [startedCourses]);

  return (
    <main className="min-h-screen bg-[#F0F7FF] py-6 px-4">
      <Header />

      <div className="container mx-auto px-4 pt-4">
        <div className="max-w-4xl mx-auto">
          <UserProfileHeader
            user={user}
            isPremium={isPremium}
            level={userLevel}
            currentStreak={currentStreak}
            activeDays={activeDays}
          />

          <div className="mt-12 mb-8">
            <LessonTitle tag="h1">Tiến độ học tập</LessonTitle>
          </div>

          {startedCourses.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-3xl shadow-sm border-2 border-dashed border-gray-200">
              <p className="text-gray-500 text-lg mb-4">Bé chưa bắt đầu học khóa nào cả.</p>
              <p className="text-gray-400">Hãy chọn một trò chơi để bắt đầu nhé!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-10">
              {groupedByCategory.map((category) => (
                <section key={category.type}>
                  <div className="flex items-center gap-3 mb-4">
                    {category.icon && (
                      <Image src={category.icon} alt={category.title} width={40} height={40} className="rounded-xl" />
                    )}
                    <h2 className="text-2xl font-black text-orange-500 font-display">{category.title}</h2>
                  </div>
                  <div className="flex flex-col gap-4">
                    {category.courses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
