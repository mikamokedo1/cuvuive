"use client";

import { useRouter } from "next/navigation";
import { useGameLesson } from "@/hooks/useGameLesson";
import { GROUPS, getSongsForGroup } from "@/features/games/learn-english-songs/constants";
import { SongPlayer } from "@/features/games/learn-english-songs/SongPlayer";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

const LESSON_ORDER = ["lesson1", "lesson2", "lesson3"];

interface LessonPageClientProps {
  groupId: string;
  lessonId: string;
}

export function LessonPageClient({ groupId, lessonId }: LessonPageClientProps) {
  const router = useRouter();
  const game = useGameLesson({
    gameSlug: "learn-english-songs",
    lessonOrder: LESSON_ORDER,
    groups: GROUPS,
    initialGroupId: groupId,
    initialLessonId: lessonId,
  });

  if (!game.group || !game.lessonId) {
    return <div>Bài hát không tồn tại</div>;
  }

  const songs = getSongsForGroup(game.groupId);
  const songIndex = LESSON_ORDER.indexOf(game.lessonId);
  const currentSong = songs[songIndex];

  const handleNext = () => {
     if (songIndex < songs.length - 1) {
        router.push(`/games/learn-english-songs/${groupId}/lesson/${LESSON_ORDER[songIndex + 1]}`);
     }
  };

  const handlePrev = () => {
    if (songIndex > 0) {
       router.push(`/games/learn-english-songs/${groupId}/lesson/${LESSON_ORDER[songIndex - 1]}`);
    }
 };

  return (
    <GameWrapGame
      LessonContent={
        currentSong ? (
            <SongPlayer 
                song={currentSong} 
                onNext={handleNext}
                onPrev={handlePrev}
                onComplete={game.handleComplete} 
            />
        ) : null
      }
      LessonTitle={game.group.title}
      groupId={game.groupId}
      gameSlug="learn-english-songs"
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
