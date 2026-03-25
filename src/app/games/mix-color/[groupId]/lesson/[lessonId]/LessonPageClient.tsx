"use client";

import { useGameLesson } from "@/hooks/useGameLesson";
import { GROUPS, MIXING_RULES } from "@/features/games/mix-color/constants";
import { MixColorLearnLesson } from "@/features/games/mix-color/MixColorLearnLesson";
import { MixColorQuizLesson } from "@/features/games/mix-color/MixColorQuizLesson";
import { MixColorReverseQuizLesson } from "@/features/games/mix-color/MixColorReverseQuizLesson";
import { GameWrapGame } from "@/components/layout/GameWrapGame";

const LESSON_ORDER = ["lesson1", "lesson2", "lesson3"];

interface LessonPageClientProps {
  groupId: string;
  lessonId: string;
}

export function LessonPageClient({ groupId, lessonId }: LessonPageClientProps) {
  const game = useGameLesson({ gameSlug: "mix-color", lessonOrder: LESSON_ORDER, groups: GROUPS ,
    initialGroupId: groupId,
    initialLessonId: lessonId,
  });

  if (!game.group || !game.lessonId) {
    return <div>Bài học không tồn tại</div>;
  }

  const group = game.group;
  const groupRules = MIXING_RULES.filter((r) => group.rules.includes(r.id));
  const requireWins = game.groupId === "group3" ? 6 : 4;

  let LessonContent = null;
  let title = "";

  if (game.lessonId === "lesson1") {
    title = "Học pha màu";
    LessonContent = (
      <main>
        <MixColorLearnLesson rules={groupRules} onComplete={game.handleComplete} />
      </main>
    );
  } else if (game.lessonId === "lesson2") {
    title = "Pha màu nào?";
    LessonContent = (
      <main>
        <MixColorQuizLesson rules={groupRules} onComplete={game.handleComplete} requiredWins={requireWins} />
      </main>
    );
  } else if (game.lessonId === "lesson3") {
    title = "Thử thách pha màu";
    LessonContent = (
      <main>
        <MixColorReverseQuizLesson rules={groupRules} onComplete={game.handleComplete} requiredWins={requireWins} />
      </main>
    );
  }

  return (
    <GameWrapGame
      LessonContent={LessonContent}
      LessonTitle={title}
      groupId={game.groupId}
      gameSlug="mix-color"
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
