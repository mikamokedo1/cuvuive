"use client";

import { useRouter } from "next/navigation";
import { GameLayout } from "@/components/layout/GameLayout";
import { GroupCard } from "@/features/games/learn-game/GroupCard";
import { useProgress } from "@/context/ProgressContext";
import Image from "next/image";
import Group1Logo from "@/assets/games/compare-quantity/compare-quantity-logo-1.webp";
import Group2Logo from "@/assets/games/compare-quantity/compare-quantity-logo-2.webp";
import Group3Logo from "@/assets/games/compare-quantity/compare-quantity-logo-3.webp";
import Group4Logo from "@/assets/games/compare-quantity/compare-quantity-logo-4.webp";

// Reuse assets
import compareLogo from "@/assets/games/game-3-logo.png";
import { LessonTitle } from "@/components/games/LessonTitle";

export default function CompareQuantityPage() {
  const router = useRouter();
  const { allProgress } = useProgress();

  // Get progress for this course
  const progress = allProgress["compare-quantity"] || {
    completedGroups: [],
    completedLessons: {},
  };

  const handleGroupClick = (groupId: string) => {
    router.push(`/games/compare-quantity/${groupId}`);
  };

  // Helper to check if group is unlocked
  const isGroupUnlocked = (groupId: string) => {
    if (groupId === "group1") return true;
    if (groupId === "group2") return progress.completedGroups.includes("group1");
    if (groupId === "group3") return progress.completedGroups.includes("group2");
    if (groupId === "group4") return progress.completedGroups.includes("group3");
    return false;
  };

  // Define groups with new structure
  const groups = [
    {
      id: "group1",
      title: "Lớn hơn",
      subtitle: ">",
      variant: "green" as const,
      image: Group1Logo,
    },
    {
      id: "group2",
      title: "Nhỏ hơn",
      subtitle: "<",
      variant: "orange" as const,
      image: Group2Logo,
    },
    {
      id: "group3",
      title: "Bằng nhau",
      subtitle: "=",
      variant: "purple" as const,
      image: Group3Logo,
    },
    {
      id: "group4",
      title: "Luyện tập",
      subtitle: "Mix",
      variant: "blue" as const,
      image: Group4Logo,
    },
  ];

  return (
    <GameLayout showBackButton={false} backTo="/">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center relative mb-8">
        <div className="relative w-32 h-32 mb-4">
          <Image src={compareLogo} alt="So Sánh" fill className="object-contain" />
        </div>
        <LessonTitle>So Sánh Số Lượng</LessonTitle>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl px-4 items-center justify-center">
        {groups.map((group, index) => {
          const unlocked = isGroupUnlocked(group.id);
          const isCompleted = progress.completedGroups.includes(group.id);

          return (
            <GroupCard
              key={group.id}
              title={group.title}
              variant={group.variant}
              isLocked={!unlocked}
              mainImage={group.image}
              level={index + 1}
              onClick={() => handleGroupClick(group.id)}
              isCompleted={isCompleted}
            />
          );
        })}
      </div>
    </GameLayout>
  );
}
