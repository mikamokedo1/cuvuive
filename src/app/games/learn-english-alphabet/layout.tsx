import { GameSchema } from "@/components/common/GameSchema";

export default function LearnEnglishAlphabetLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="learn-english-alphabet" />
      {children}
    </>
  );
}
