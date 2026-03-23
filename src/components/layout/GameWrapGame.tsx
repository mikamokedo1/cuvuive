"use client";
import { GameLayout } from "@/components/layout/GameLayout";
import { CompletionModal } from "../games/CompletionModal";
import { CheckingPermission } from "../common/CheckingPermission";

interface GameWrapGameProps {
  LessonContent: React.ReactNode;
  LessonTitle: string;
  groupId: string;
  gameSlug: string;
  showModal: boolean;
  handleNextLesson: () => void;
  currentLessonNum: number | string;
  nextLessonNum: number | string | null;
  isGroupDone: boolean;
  isLoaded?: boolean;
}

export const GameWrapGame = ({
  LessonContent,
  LessonTitle,
  groupId,
  gameSlug,
  showModal,
  handleNextLesson,
  currentLessonNum,
  nextLessonNum,
  isGroupDone,
  isLoaded = true,
}: GameWrapGameProps) => {
  if (!isLoaded) {
    return <CheckingPermission path={`/games/${gameSlug}/${groupId}`} />;
  }

  return (
    <GameLayout backTo={`/games/${gameSlug}/${groupId}`} title={LessonTitle}>
      {LessonContent ? (
        LessonContent
      ) : (
        <div className="text-center text-slate-500">Lesson not found</div>
      )}
      <CompletionModal
        isOpen={showModal}
        onNext={handleNextLesson}
        currentLessonNum={isGroupDone ? groupId.replace("group", "") : currentLessonNum}
        nextLessonNum={nextLessonNum ?? undefined}
        isGroupComplete={isGroupDone}
      />
    </GameLayout>
  );
};
