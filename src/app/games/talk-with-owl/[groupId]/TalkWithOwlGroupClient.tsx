"use client";

import { GameLayout } from "@/components/layout/GameLayout";
import { VoiceChat } from "@/features/games/talk-with-owl/VoiceChat";
import { GROUPS, getTopicInstruction, getTopicGreeting } from "@/features/games/talk-with-owl/constants";
import { LessonTitle } from "@/components/games/LessonTitle";

interface TalkWithOwlGroupClientProps {
  groupId: string;
}

export function TalkWithOwlGroupClient({ groupId }: TalkWithOwlGroupClientProps) {
  const group = GROUPS.find((g) => g.id === groupId);

  if (!group) {
    return (
      <GameLayout showBackButton={true} backTo="/games/talk-with-owl">
        <div className="text-center py-12">
          <p className="text-gray-500">Chủ đề không tồn tại</p>
        </div>
      </GameLayout>
    );
  }

  const instruction = getTopicInstruction(groupId);
  const greeting = getTopicGreeting(groupId);
  return (
    <GameLayout showBackButton={true} backTo="/games/talk-with-owl">
      <main className="w-full">
        <div className="w-full max-w-2xl mx-auto">
          <div className="flex flex-col items-center mb-4">
            <LessonTitle tag="h1">{group.title}</LessonTitle>
          </div>
          <VoiceChat topicInstruction={instruction} greeting={greeting} />
        </div>
      </main>
    </GameLayout>
  );
}
