"use client";

import { useUser } from "@/context/UserContext";
import { CourseCard } from "@/features/profile/CourseCard";
import { UserProfileHeader } from "@/features/profile/UserProfileHeader";
import Header from "@/components/layout/Header";
import { ActionButton } from "@/components/common/ActionButton";
import { LessonTitle } from "@/components/games/LessonTitle";
import { CourseDef } from "@/libs/actions/courses";

interface ProfileViewProps {
  courses: CourseDef[];
}

import { useProgress } from "@/context/ProgressContext";
import { useRouter } from "next/navigation";

export function ProfileView({ courses }: ProfileViewProps) {
  const { user, isPremium } = useUser();
  const { allProgress } = useProgress();
  const router = useRouter();

  if (!user) {
    return (
      <main className="min-h-screen bg-[#F0F7FF] flex flex-col py-6 px-4">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-gray-500 mb-6">Vui lòng đăng nhập để xem hồ sơ.</p>
            <ActionButton variant="glossy" color="orange" onClick={() => router.push("/auth/login")}>
              Đăng nhập ngay
            </ActionButton>
          </div>
        </div>
      </main>
    );
  }

  // Filter courses where user has finished at least 1 lesson
  const startedCourses = courses.filter((course) => {
    const progress = allProgress[course.id];
    if (!progress) return false;

    // Check if any group has completed lessons
    return Object.values(progress.completedLessons).some((lessons) => lessons.length > 0);
  });

  return (
    <main className="min-h-screen bg-[#F0F7FF] py-6 px-4">
      <Header />

      <div className="container mx-auto px-4 pt-4">
        <div className="max-w-4xl mx-auto">
          <UserProfileHeader user={user} isPremium={isPremium} />

          <div className="mt-12 mb-8">
            <LessonTitle tag="h1">Tiến độ học tập</LessonTitle>
          </div>

          {startedCourses.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-3xl shadow-sm border-2 border-dashed border-gray-200">
              <p className="text-gray-500 text-lg mb-4">Bé chưa bắt đầu học khóa nào cả.</p>
              <p className="text-gray-400">Hãy chọn một trò chơi để bắt đầu nhé!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {startedCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
