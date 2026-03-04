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
  isCheckingAccess?: boolean;
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
  isCheckingAccess,
}: GameWrapGameProps) => {
  if (!isLoaded || isCheckingAccess) {
    return <CheckingPermission path={`/games/${gameSlug}/${groupId}`} />;
  }

  if (!LessonContent) {
    return (
      <GameLayout backTo={`/games/${gameSlug}/${groupId}`}>
        <div className="text-center text-slate-500">Lesson not found</div>
      </GameLayout>
    );
  }

  return (
    <GameLayout backTo={`/games/${gameSlug}/${groupId}`} title={LessonTitle}>
      {LessonContent}
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
