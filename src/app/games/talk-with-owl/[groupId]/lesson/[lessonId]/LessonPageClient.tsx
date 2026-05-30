"use client";

import { GROUPS, getLessonInstruction, getLessonGreeting } from "@/features/games/talk-with-owl/constants";
import { VoiceChat } from "@/features/games/talk-with-owl/VoiceChat";
import { GameLayout } from "@/components/layout/GameLayout";

interface LessonPageClientProps {
  groupId: string;
  lessonId: string;
}

export function LessonPageClient({ groupId, lessonId }: LessonPageClientProps) {
  const group = GROUPS.find((g) => g.id === groupId);

  if (!group) {
    return <div>Bài học không tồn tại</div>;
  }

  const instruction = getLessonInstruction(groupId, lessonId);
  const greeting = getLessonGreeting(groupId, lessonId);

  return (
    <GameLayout showBackButton={true} backTo={`/games/talk-with-owl/${groupId}`}>
      <main className="w-full">
        <div className="w-full max-w-2xl mx-auto">
          <VoiceChat topicInstruction={instruction} greeting={greeting} />
        </div>
      </main>
    </GameLayout>
  );
}
