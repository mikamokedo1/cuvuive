"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { FIND_DIFFERENCES_DATA } from "@/features/games/find-differences/constans";
import { DifferenceBoard } from "@/features/games/find-differences/DifferenceBoard";
import { playCorrectSound, playSound, playWrongSound } from "@/libs/utils/playSound";
import { GameWrapGame } from "@/components/layout/GameWrapGame";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { MAP_PATHNAME_TO_TEXT } from "@/context/owlMaps";

interface LessonPageClientProps {
  groupId: string;
  lessonId: string;
}

export function LessonPageClient({ groupId, lessonId }: LessonPageClientProps) {

  const group = FIND_DIFFERENCES_DATA.find((g) => g.id === groupId);
  const LESSON_ORDER = group?.lessons.map((l) => l.id) || [];
  const groups = FIND_DIFFERENCES_DATA.map((g) => ({ id: g.id, title: g.id }));
  const { speak } = useTextToSpeech();
  const pathname = usePathname();

  useEffect(() => {
    const text = MAP_PATHNAME_TO_TEXT[pathname as keyof typeof MAP_PATHNAME_TO_TEXT] || "Bé hãy tìm các điểm khác biệt nhé";
    const timer = setTimeout(() => {
      speak(text);
    }, 500);
    return () => clearTimeout(timer);
  }, [pathname, speak]);

  const game = useGameLesson({
    gameSlug: "find-differences",
    lessonOrder: LESSON_ORDER,
    groups,
  
    initialGroupId: groupId,
    initialLessonId: lessonId,
  });

  const lesson = group?.lessons.find((l) => l.id === game.lessonId);

  if (!group || !lesson || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const handleAllFound = () => {
    playCorrectSound();
    game.handleComplete();
  };

  const LessonContent = (
    <main className="w-full h-full flex items-center justify-center flex-1">
      <DifferenceBoard
        originalImage={lesson.originalImage}
        modifiedImage={lesson.modifiedImage}
        differences={lesson.differences}
        onFoundDifference={() => playCorrectSound()}
        onWrongClick={() => playWrongSound()}
        onAllFound={handleAllFound}
      />
    </main>
  );

  return (
    <GameWrapGame
      LessonContent={LessonContent}
      LessonTitle={lesson.title}
      groupId={game.groupId}
      gameSlug="find-differences"
      showModal={game.showModal}
      handleNextLesson={game.handleNextLesson}
      currentLessonNum={game.currentLessonNum}
      nextLessonNum={game.nextLessonNum}
      isGroupDone={game.isGroupDone}
      isCourseComplete={game.isCourseComplete}
      isLoaded={game.isLoaded}
    />
  );
}
