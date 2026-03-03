"use client";
import { useParams } from "next/navigation";
import { GameLayout } from "@/components/layout/GameLayout";
import { useProgress } from "@/context/ProgressContext";
import { LessonCard } from "@/components/games/LessonCard";

export interface LessonData {
  id: string;
  title: string;
  icon: React.ReactNode;
}

interface GameWrapLessonsProps {
  gameId: string;
  lessons: LessonData[];
  title: string;
  activeIndex: number;
  handleLessonClick: (lessonId: string) => void;
}

export const GameWrapLessons = ({ gameId, lessons, title, activeIndex, handleLessonClick }: GameWrapLessonsProps) => {
  const { isLessonUnlocked } = useProgress();
  const params = useParams();
  const groupId = typeof params.groupId === "string" ? params.groupId : "";

  return (
    <GameLayout title={title} backTo={`/games/${gameId}`}>
      <div className="w-full max-w-2xl px-4 flex flex-col items-center gap-6 pt-4">
        {lessons.map((lesson, index) => {
          const unlocked = isLessonUnlocked(groupId, lesson.id);
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
