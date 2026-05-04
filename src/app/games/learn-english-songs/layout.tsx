import { GameSchema } from "@/components/seo/GameSchema";

export default function LearnEnglishSongsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameSchema courseId="learn-english-songs" />
      {children}
    </>
  );
}
