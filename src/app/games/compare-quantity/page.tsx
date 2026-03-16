const Group1Logo = "https://assets.cuthongminh.com/games/compare-quantity/compare-quantity-logo-1.webp";
const Group2Logo = "https://assets.cuthongminh.com/games/compare-quantity/compare-quantity-logo-2.webp";
const Group3Logo = "https://assets.cuthongminh.com/games/compare-quantity/compare-quantity-logo-3.webp";
const Group4Logo = "https://assets.cuthongminh.com/games/compare-quantity/compare-quantity-logo-4.webp";

// Reuse assets
const compareLogo = "https://assets.cuthongminh.com/games/game-3-logo.webp";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";

const GROUPS = [
  {
    id: "group1",
    title: "Lớn hơn",
    description: "so sánh hơn",
    subtitle: ">",
    variant: "green" as const,
    logo: Group1Logo,
  },
  {
    id: "group2",
    title: "Nhỏ hơn",
    description: "so sánh kém",
    subtitle: "<",
    variant: "orange" as const,
    logo: Group2Logo,
  },
  {
    id: "group3",
    title: "Bằng nhau",
    description: "so sánh bằng",
    subtitle: "=",
    variant: "purple" as const,
    logo: Group3Logo,
  },
  {
    id: "group4",
    title: "Luyện tập",
    description: "luyện tập so sánh",
    subtitle: "Mix",
    variant: "blue" as const,
    logo: Group4Logo,
  },
];

export default function CompareQuantityPage() {
  return <GameWrapGroups logo={compareLogo} gameId="compare-quantity" groups={GROUPS} title="So Sánh Số Lượng" />;
}
