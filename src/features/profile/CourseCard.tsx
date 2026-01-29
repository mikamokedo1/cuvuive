"use client";

import { ActionButton } from "@/components/common/ActionButton";
import { CourseDef } from "@/libs/constants/courses";
import { useProgress } from "@/context/ProgressContext";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

interface CourseCardProps {
  course: CourseDef;
}

export function CourseCard({ course }: CourseCardProps) {
  const { allProgress, isGroupUnlocked } = useProgress(); // Use isGroupUnlocked for simplicity or custom logic?

  const progress = allProgress[course.id];

  // Calculate stats
  const stats = useMemo(() => {
    let totalLessons = 0;
    let completedCount = 0;
    let nextLessonUrl = "";

    course.groups.forEach((group) => {
      totalLessons += group.lessons.length;
      const doneInGroup = progress?.completedLessons[group.id] || [];
      completedCount += doneInGroup.length;

      // Find first incomplete lesson to be "Next"
      if (!nextLessonUrl) {
        // Check if group is unlocked (using context logic or simplified assumption based on previous group completion)
        // Since isGroupUnlocked is legacy-tied to learn-numbers, let's replicate logic or assume group1 unlocked
        // For now, let's iterate.
        const isGroupDone = doneInGroup.length >= group.lessons.length;

        if (!isGroupDone) {
          // Find first missing lesson
          const firstMissing = group.lessons.find((l) => !doneInGroup.includes(l.id));
          if (firstMissing) {
            // Check if actually unlocked?
            // We can simply link to it, the page will handle paywall/lock check
            nextLessonUrl = `/games/${course.id}/${group.id}/lesson/${firstMissing.id}`;
          }
        }
      }
    });

    // If no next lesson found (all done), maybe link to first?
    if (!nextLessonUrl && course.groups.length > 0) {
      nextLessonUrl = `/games/${course.id}`;
    }

    return { totalLessons, completedCount, nextLessonUrl };
  }, [course, progress]);

  const percentage = Math.round((stats.completedCount / stats.totalLessons) * 100) || 0;

  return (
    <div className="bg-white rounded-3xl p-6 border-4 border-blue-100 shadow-xl flex flex-col md:flex-row gap-6 items-center">
      <div className="flex-1 w-full">
        <h3 className="text-2xl font-black text-gray-800 mb-2 font-display text-primary-100">{course.title}</h3>
        <p className="text-gray-500 mb-4">{course.description}</p>

        <div className="w-full bg-gray-200 rounded-full h-4 mb-2 overflow-hidden">
          <div
            className="bg-green-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-sm font-bold text-gray-400">
          <span>
            {stats.completedCount}/{stats.totalLessons} bài học
          </span>
          <span>{percentage}%</span>
        </div>
      </div>

      <div className="flex-shrink-0">
        <Link href={stats.nextLessonUrl}>
          <ActionButton
            variant="glossy"
            color={percentage === 100 ? "green" : "orange"}
            size="auto"
            className="rounded-xl px-8"
          >
            {percentage === 100 ? "Hoàn thành" : "Tiếp tục"}
          </ActionButton>
        </Link>
      </div>
    </div>
  );
}
