import { GameSchema } from "@/components/common/GameSchema";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-[family-name:var(--font-be-vietnam-pro)]">
      <GameSchema courseId="learn-alphabet" />
      {children}
    </div>
  );
}
