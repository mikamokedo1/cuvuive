"use client";

import { useRouter } from "next/navigation";
import { GameLayout } from "@/components/layout/GameLayout";
import { GroupCard } from "@/features/games/learn-game/GroupCard";
import { useProgress } from "@/context/ProgressContext";
import group1 from "@/assets/games/learn-numbers/number-logo-1.png";
import group2 from "@/assets/games/learn-numbers/number-logo-2.png";
import group3 from "@/assets/games/learn-numbers/number-logo-3.png";
import group4 from "@/assets/games/compare-quantity/compare-quantity-logo-4.webp";
import titleGroup from "@/assets/games/learn-numbers/title.png";
import Image, { StaticImageData } from "next/image";

export default function NumberGroupsPage() {
  const router = useRouter();
  const { isGroupUnlocked, progress } = useProgress();

  const handleGroupClick = (groupId: string) => {
    router.push(`/games/learn-numbers/${groupId}`);
  };

  // Define groups with their specific visual configurations
  const groups = [
    {
      id: "group1",
      title: "Nhóm 1,2,3",
      range: "1 - 3",
      variant: "green" as const,
      image: group1,
    },
    {
      id: "group2",
      title: "Nhóm 4,5,6",
      range: "4 - 6",
      variant: "orange" as const,
      image: group2,
    },
    {
      id: "group3",
      title: "Nhóm 7,8,9",
      range: "7 - 9",
      variant: "purple" as const,
      image: group3,
    },
    {
      id: "group4",
      title: "Luyện tập",
      range: "1 - 9",
      variant: "blue" as const,
      image: group4,
    },
  ];

  return (
    <GameLayout showBackButton={false} backTo="/">
      <div className="w-full max-w-6xl mx-auto flex items-center justify-center relative h-40 mb-12">
        <Image src={titleGroup} alt="Title" fill className="object-contain" />
      </div>
      {/* Updated title to match style better if needed, or keep "Chọn số muốn học" */}
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
