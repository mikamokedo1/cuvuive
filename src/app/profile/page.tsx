"use client";

import { GameLayout } from "@/components/layout/GameLayout"; // Or MainLayout? Let's use GameLayout for consistency or a new ProfileLayout
import { useUser } from "@/context/UserContext";
import { COURSES } from "@/libs/constants/courses";
import { CourseCard } from "@/features/profile/CourseCard";
import { UserProfileHeader } from "@/features/profile/UserProfileHeader";
import Header from "@/components/layout/Header";

export default function ProfilePage() {
  const { user, isPremium } = useUser();

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F0F7FF] flex flex-col py-6 px-4">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xl text-gray-500">Vui lòng đăng nhập để xem hồ sơ.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F7FF] py-6 px-4">
      <Header />

      <div className="container mx-auto px-4 pt-4">
        <div className="max-w-4xl mx-auto">
          <UserProfileHeader user={user} isPremium={isPremium} />

          <h2 className="text-2xl font-black text-gray-800 mb-6 px-4 border-l-8 border-blue-500 font-display">
            Tiến độ học tập
          </h2>

          <div className="flex flex-col gap-6">
            {COURSES.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
