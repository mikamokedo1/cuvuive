import type { Metadata } from "next";
import { getGameMetadata } from "@/libs/utils/seo";
import { GameSeoSection } from "@/components/seo/GameSeoSection";
const group1 = "https://assets.cuthongminh.com/games/learn-numbers/number-logo-1.webp";
const group2 = "https://assets.cuthongminh.com/games/learn-numbers/number-logo-2.webp";
const group3 = "https://assets.cuthongminh.com/games/learn-numbers/number-logo-3.webp";
const group4 = "https://assets.cuthongminh.com/games/learn-numbers/number-logo-4.webp";
const group5 = "https://assets.cuthongminh.com/games/compare-quantity/compare-quantity-logo-4.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

const GROUPS = [
  {
    id: "group1",
    title: "Nhóm 1,2,3",
    description: "Học số từ 1 đến 3",
    range: "1 - 3",
    variant: "green" as const,
    logo: group1,
  },
  {
    id: "group2",
    title: "Nhóm 4,5,6",
    description: "Học số từ 4 đến 6",
    range: "4 - 6",
    variant: "orange" as const,
    logo: group2,
  },
  {
    id: "group3",
    title: "Nhóm 7,8,9",
    description: "Học số từ 7 đến 9",
    range: "7 - 9",
    variant: "purple" as const,
    logo: group3,
  },
  {
    id: "group4",
    title: "Số 10-20",
    description: "Học số 0 và số từ 10 đến 20",
    range: "0, 10 - 20",
    variant: "blue" as const,
    logo: group4,
  },
  {
    id: "group5",
    title: "Luyện tập",
    description: "Luyện tập số từ 0 đến 20",
    range: "0 - 20",
    variant: "green" as const,
    logo: group5,
  },
];


export const metadata: Metadata = getGameMetadata("learn-numbers");

export default function NumberGroupsPage() {
  return (
    <>
      <GameWrapGroups logo={group4} gameId="learn-numbers" groups={GROUPS} title="Học số" />
      <GameSeoSection gameId="learn-numbers" />
    </>
  );
}
