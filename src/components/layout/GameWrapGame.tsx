"use client";
import { useState, useCallback } from "react";
import { GameLayout } from "@/components/layout/GameLayout";
import { CompletionModal } from "../games/CompletionModal";
import { ShareModal } from "../games/ShareModal";
import { CheckingPermission } from "../common/CheckingPermission";
import { useFirstCompletion } from "@/hooks/useFirstCompletion";

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
  isCourseComplete?: boolean;
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
  isCourseComplete = false,
  isLoaded = true,
}: GameWrapGameProps) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const { hasShownShareModal, markShareModalShown } = useFirstCompletion(gameSlug);

  // When user clicks "Tiếp tục" on CompletionModal
  const handleCompletionNext = useCallback(() => {
    // If course is fully complete and share modal hasn't been shown → show it
    if (isCourseComplete && !hasShownShareModal) {
      markShareModalShown();
      setShowShareModal(true);
      return;
    }
    // Otherwise proceed normally
    handleNextLesson();
  }, [isCourseComplete, hasShownShareModal, markShareModalShown, handleNextLesson]);

  const handleShareClose = useCallback(() => {
    setShowShareModal(false);
    handleNextLesson();
  }, [handleNextLesson]);

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
        isOpen={showModal && !showShareModal}
        onNext={handleCompletionNext}
        currentLessonNum={isGroupDone ? groupId.replace("group", "") : currentLessonNum}
        nextLessonNum={nextLessonNum ?? undefined}
        isGroupComplete={isGroupDone}
      />
      <ShareModal
        isOpen={showShareModal}
        onClose={handleShareClose}
        gameSlug={gameSlug}
      />
    </GameLayout>
  );
};
