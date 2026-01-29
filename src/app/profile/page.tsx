"use client";

import { GameLayout } from "@/components/layout/GameLayout"; // Or MainLayout? Let's use GameLayout for consistency or a new ProfileLayout
import { useUser } from "@/context/UserContext";
import { COURSES } from "@/libs/constants/courses";
import { CourseCard } from "@/features/profile/CourseCard";
import { UserProfileHeader } from "@/features/profile/UserProfileHeader";
import Header from "@/components/layout/Header";
import { ActionButton } from "@/components/common/ActionButton";
import { LessonTitle } from "@/components/games/LessonTitle";

export default function ProfilePage() {
  const { user, isPremium } = useUser();

  if (!user) {
    return (
      <main className="min-h-screen bg-[#F0F7FF] flex flex-col py-6 px-4">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-gray-500 mb-6">Vui lòng đăng nhập để xem hồ sơ.</p>
            <ActionButton variant="glossy" color="orange">
              Đăng nhập ngay
            </ActionButton>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F0F7FF] py-6 px-4">
      <Header />

      <div className="container mx-auto px-4 pt-4">
        <div className="max-w-4xl mx-auto">
          <UserProfileHeader user={user} isPremium={isPremium} />

          <div className="mt-12 mb-8">
            <LessonTitle tag="h1">Tiến độ học tập</LessonTitle>
          </div>

          <div className="flex flex-col gap-6">
            {COURSES.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
