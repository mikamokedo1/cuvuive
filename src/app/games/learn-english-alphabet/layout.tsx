import { GameSchema } from "@/components/seo/GameSchema";

export default function LearnEnglishAlphabetLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="learn-english-alphabet" />
      {children}
    </>
  );
}
