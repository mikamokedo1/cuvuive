"use client";

import Link from "next/link";
import { GameLayout } from "@/components/layout/GameLayout";
import { GROUPS } from "@/features/games/talk-with-owl/constants";
import { ActionButton } from "@/components/common/ActionButton";
import { cn } from "@/libs/utils/cn";

const lessons = [
  {
    id: "lesson1",
    title: "Học Từ Mới",
    emoji: "📚",
    variant: "green" as const,
  },
  {
    id: "lesson2",
    title: "Học Câu",
    emoji: "💬",
    variant: "orange" as const,
  },
  {
    id: "lesson3",
    title: "Hỏi Đáp",
    emoji: "🎤",
    variant: "purple" as const,
  },
];

const STYLES = {
  green: {
    card: "bg-gradient-to-b from-[#a3e635] to-[#4ade80] border-[#65a30d]",
    header: "text-[#15803d]",
  },
  orange: {
    card: "bg-gradient-to-b from-[#fdba74] to-[#fb923c] border-[#ea580c]",
    header: "text-[#c2410c]",
  },
  purple: {
    card: "bg-gradient-to-b from-[#d8b4fe] to-[#c084fc] border-[#9333ea]",
    header: "text-[#7e22ce]",
  },
};

interface TalkWithOwlGroupClientProps {
  groupId: string;
}

export function TalkWithOwlGroupClient({ groupId }: TalkWithOwlGroupClientProps) {
  const group = GROUPS.find((g) => g.id === groupId);

  if (!group) return <div>Group not found</div>;

  return (
    <GameLayout title={group.title} backTo="/games/talk-with-owl">
      <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-5 px-4 pt-4 max-w-4xl mx-auto w-full">
        {lessons.map((lesson) => {
          const href = `/games/talk-with-owl/${groupId}/lesson/${lesson.id}`;
          const style = STYLES[lesson.variant];

          return (
            <Link
              key={lesson.id}
              href={href}
              className={cn(
                "relative flex flex-col items-center p-4 rounded-[40px] border-[8px] overflow-hidden transition-transform",
                style.card,
                "cursor-pointer hover:scale-105 active:scale-95",
                "w-full aspect-[3/4] max-w-[240px] shadow-xl group",
              )}
            >
              {/* Header */}
              <h3
                className={cn(
                  "text-center text-2xl md:text-[22px] font-bold uppercase tracking-wider font-display",
                  style.header,
                )}
              >
                {lesson.title}
              </h3>
              <div className="flex gap-1 h-10 items-center justify-center" />
              {/* Emoji Area */}
              <div className="relative w-full flex-1 flex items-center justify-center">
                <span className="text-[80px] md:text-[100px] drop-shadow-xl select-none">{lesson.emoji}</span>
              </div>

              {/* Action Button */}
              <ActionButton
                variant="glossy"
                color={lesson.variant}
                size="auto"
                className="w-full flex flex-col items-center justify-center gap-4 py-3 md:py-4 px-4 text-xl md:text-2xl"
                aria-label={`Bắt đầu ${lesson.title}`}
              >
                BẮT ĐẦU
              </ActionButton>
            </Link>
          );
        })}
      </div>
    </GameLayout>
  );
}
