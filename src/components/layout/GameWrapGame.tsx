"use client";
import { GameLayout } from "@/components/layout/GameLayout";
import { CompletionModal } from "../games/CompletionModal";
import { CheckingPermission } from "../common/CheckingPermission";

interface GameWrapGameProps {
  LessonContent: React.ReactNode;
  LessonTitle: string;
  groupId: string;
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
  showModal,
  handleNextLesson,
  currentLessonNum,
  nextLessonNum,
  isGroupDone,
  isLoaded,
  isCheckingAccess,
}: GameWrapGameProps) => {
  if (!isLoaded || isCheckingAccess) {
    return <CheckingPermission path={`/games/learn-flag/${groupId}`} />;
  }

  if (!LessonContent) {
    return (
      <GameLayout backTo={`/games/compare-quantity/${groupId}`}>
        <div className="text-center text-slate-500">Lesson not found</div>
      </GameLayout>
    );
  }

  return (
    <GameLayout backTo={`/games/compare-quantity/${groupId}`} title={LessonTitle}>
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
