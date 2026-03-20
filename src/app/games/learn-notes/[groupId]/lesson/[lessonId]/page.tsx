"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { COURSES } from "@/libs/constants/courses";
import NoteLearnLesson from "@/features/games/learn-notes/NoteLearnLesson";
import NoteListenQuiz from "@/features/games/learn-notes/NoteListenQuiz";
import NoteStaffQuiz from "@/features/games/learn-notes/NoteStaffQuiz";
import NoteOrderLesson from "@/features/games/learn-notes/NoteOrderLesson";
import Header from "@/components/layout/Header";
import { ArrowLeft } from "lucide-react";
import { useProgress } from "@/context/ProgressContext";
import { ActionButton } from "@/components/common/ActionButton";
import { CompletionModal } from "@/components/games/CompletionModal";

export default function LearnNotesLessonPage() {
  const params = useParams();
  const router = useRouter();
  const { markLessonComplete } = useProgress();

  const groupId = params.groupId as string;
  const lessonId = params.lessonId as string;

  const [showComplete, setShowComplete] = useState(false);

  const course = COURSES.find((c) => c.id === "learn-notes");
  const group = course?.groups.find((g) => g.id === groupId);
  const lessons = group?.lessons || [];
  const lessonIndex = lessons.findIndex((l) => l.id === lessonId);

  const currentLessonNum = lessonIndex + 1;
  const isLastLesson = lessonIndex === lessons.length - 1;
  const nextLessonNum = isLastLesson ? undefined : lessonIndex + 2;

  const handleComplete = () => {
    markLessonComplete(groupId, lessonId, "learn-notes");
    setShowComplete(true);
  };

  const handleNext = () => {
    router.push(`/games/learn-notes/${groupId}`);
  };

  // Determine which component to render based on lesson ID and group
  const renderLesson = () => {
    if (groupId === "practice") {
      // Practice group: lesson1 = listen quiz (all notes), lesson2 = order (all notes)
      if (lessonId === "lesson1") {
        return <NoteListenQuiz groupId={groupId} onComplete={handleComplete} />;
      }
      if (lessonId === "lesson2") {
        return <NoteOrderLesson groupId={groupId} onComplete={handleComplete} />;
      }
    }

    // Basic & Advanced groups
    switch (lessonId) {
      case "lesson1":
        return <NoteLearnLesson groupId={groupId} onComplete={handleComplete} />;
      case "lesson2":
        return <NoteListenQuiz groupId={groupId} onComplete={handleComplete} />;
      case "lesson3":
        return <NoteStaffQuiz groupId={groupId} onComplete={handleComplete} />;
      case "lesson4":
        return <NoteOrderLesson groupId={groupId} onComplete={handleComplete} />;
      default:
        return <div>Lesson not found</div>;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 relative overflow-hidden py-4 sm:py-6 px-3 sm:px-4 flex flex-col">
      <Header />

      <div className="flex-1 w-full max-w-6xl mx-auto flex flex-col items-center relative z-10 text-center">
        <div className="w-full flex justify-start mb-4 sm:mb-8">
          <ActionButton
            variant="glossy"
            color="orange"
            size="auto"
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl flex items-center gap-1.5 sm:gap-2"
            onClick={() => router.push(`/games/learn-notes/${groupId}`)}
          >
            <ArrowLeft size={18} className="text-white" />
            <span className="text-white text-sm sm:text-base font-bold">Quay lại</span>
          </ActionButton>
        </div>

        <div className="flex flex-col items-center w-full">
          {renderLesson()}
        </div>
      </div>

      <CompletionModal
        isOpen={showComplete}
        onNext={handleNext}
        currentLessonNum={currentLessonNum}
        nextLessonNum={nextLessonNum}
        isGroupComplete={isLastLesson}
      />

      {/* Decorative elements */}
      <div className="absolute top-20 -left-10 w-40 h-40 bg-purple-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -right-10 w-60 h-60 bg-pink-300/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-300/10 rounded-full blur-2xl" />
    </main>
  );
}
