"use client";
import { useParams } from "next/navigation";
import { GameLayout } from "@/components/layout/GameLayout";
import { useProgress } from "@/context/ProgressContext";
import { LessonCard } from "@/components/games/LessonCard";

export interface LessonData {
  id: string;
  title: string;
  icon: React.ReactNode;
  isPremium?: boolean;
  color?: string;
}

interface GameWrapLessonsProps {
  gameId: string;
  lessons: LessonData[];
  title: string;
  activeIndex: number;
  handleLessonClick: (lessonId: string) => void;
}

export const GameWrapLessons = ({ gameId, lessons, title, activeIndex, handleLessonClick }: GameWrapLessonsProps) => {
  const { isLessonUnlocked, isLoaded, allProgress } = useProgress();
  const params = useParams();
  const groupId = typeof params.groupId === "string" ? params.groupId : "";

  if (!isLoaded && !allProgress[gameId]) {
    return (
      <GameLayout title={title} backTo={`/games/${gameId}`}>
        <div className="flex flex-col items-center justify-center min-h-[40vh]">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-orange-600 font-bold">Đang tải dữ liệu..</p>
        </div>
      </GameLayout>
    );
  }

  return (
    <GameLayout title={title} backTo={`/games/${gameId}`}>
      <div className="w-full max-w-2xl px-4 flex flex-col items-center gap-6 pt-4">
        {lessons.map((lesson, index) => {
          const unlocked = isLessonUnlocked(groupId, lesson.id, gameId);
          const isActive = index === activeIndex;

          return (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              unlocked={unlocked}
              isActive={isActive}
              onClick={handleLessonClick}
            />
          );
        })}
      </div>
    </GameLayout>
  );
};
