import { GameSchema } from "@/components/common/GameSchema";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="learn-animal" />
      {children}
    </>
  );
}
