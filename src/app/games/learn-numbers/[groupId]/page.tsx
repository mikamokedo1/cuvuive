"use client";

import { useParams, useRouter } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import { GameLayout } from "@/components/layout/GameLayout";
import { useProgress } from "@/context/ProgressContext";
import { BookOpen, HelpCircle, Calculator, Lock, PenTool } from "lucide-react";
import PlayButton from "@/components/common/PlayButton";
import { cn } from "@/libs/utils/cn";

// Assets
import group1 from "@/assets/games/learn-numbers/number-logo-1.png";
import group2 from "@/assets/games/learn-numbers/number-logo-2.png";
import group3 from "@/assets/games/learn-numbers/number-logo-3.png";
import LockCardIcon from "@/assets/games/lock-card.png";
import OwnSayHi from "@/assets/games/common/owl-say-hi.webp";
// Note: User mentioned "own-sleep" but design shows lock icon for locked state.
// Using LockCardIcon for the right side image of locked cards.

export default function GroupLessonsPage() {
  const params = useParams();
  const router = useRouter();
  const { isLessonUnlocked, progress } = useProgress();

  // Ensure groupId is string
  const groupId =
    typeof params.groupId === "string" ? params.groupId : Array.isArray(params.groupId) ? params.groupId[0] : "";

  // Config mapping
  const groupConfig: Record<string, { title: string; range: string; image: StaticImageData }> = {
    group1: { title: "Nhóm 1,2,3", range: "1 - 3", image: group1 },
    group2: { title: "Nhóm 4,5,6", range: "4 - 6", image: group2 },
    group3: { title: "Nhóm 7,8,9", range: "7 - 9", image: group3 },
  };

  const config = groupConfig[groupId];

  if (!config) {
    return <div>Group not found</div>;
  }

  const handleLessonClick = (lessonId: string) => {
    router.push(`/games/learn-numbers/${groupId}/lesson/${lessonId}`);
  };

  const lessons = [
    {
      id: "lesson1",
      title: `Học số ${config.range}`,
      icon: <BookOpen className="text-white w-6 h-6" />,
      color: "blue",
    },
    {
      id: "lesson2",
      title: "Số nào đúng?",
      icon: <HelpCircle className="text-white w-6 h-6" />, // Will be grayscale if locked
      color: "green",
    },
    {
      id: "lesson3",
      title: "Đếm và chọn",
      icon: <Calculator className="text-white w-6 h-6" />,
      color: "purple",
    },
    {
      id: "lesson4",
      title: "Tập viết số",
      icon: <PenTool className="text-white w-6 h-6" />,
      color: "green",
    },
  ];

  // Determine active lesson
  // Logic: The first unlocked lesson that is NOT completed?
  // OR simpy the first unlocked lesson if we want linear progression.
  // The design implies one "Active" main card.
  // Let's assume the highest unlocked lesson is the active one to focus on.
  // Or if all completed, maybe looking back at 1?
  // Let's go with: Find the first incomplete lesson. If all complete, default to the last one or first one?
  // For "Learning", usuallly you work on the current level.
  // Let's try: Find the first unlocked lesson.
  // Actually, standard game UI: Focus on the "Current Level".
  // Which is the first one that is NOT completed.

  const groupProgress = progress.completedLessons[groupId] || [];

  // Find the first lesson that is either locked (stop) or unlocked-and-not-completed.
  // Actually simpler: The first lesson that is Unlocked AND Not Completed is the current target.
  // If all unlocked are completed, then the user has finished the group.
  // But maybe they want to replay.
  // Let's default "Active" to be the *first unlocked lesson* that the user clicked?
  // PROPOSAL: The "Active" lesson is determined by:
  // 1. The first unlocked but not completed lesson.
  // 2. If all unlocked are completed, then the last unlocked lesson (or the first one to replay?).
  // Let's set it to the highest unlocked lesson index?
  // User Requirement: "if the leeson active it expand".

  let activeIndex = lessons.findIndex((l) => {
    const unlocked = isLessonUnlocked(groupId, l.id);
    const completed = groupProgress.includes(l.id);
    return unlocked && !completed;
  });

  if (activeIndex === -1) {
    // If all unlocked lessons are completed, reset to the first lesson
    activeIndex = 0;
  }

  // Override logic: The user wants the UI to look specific.
  // If "Active" means "Expanded", we render that one differently.

  return (
    <GameLayout title="" backTo="/games/learn-numbers">
      1{/* Custom Header Section */}
      <div className="w-full max-w-2xl px-4 flex flex-col items-center gap-6 pt-4">
        {/* Title Group */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-[#FF6B00] drop-shadow-sm font-nunito">{config.title}</h1>
          <div className="relative w-60 h-24 mx-auto">
            <Image src={config.image} alt="Group Logo" fill className="object-contain" />
          </div>
        </div>

        {/* Lesson Cards */}
        <div className="w-full space-y-4 pb-10">
          {lessons.map((lesson, index) => {
            const unlocked = isLessonUnlocked(groupId, lesson.id);
            const isActive = index === activeIndex;

            // Render Expanded Active Card
            if (isActive) {
              return (
                <div
                  key={lesson.id}
                  onClick={() => handleLessonClick(lesson.id)}
                  className="relative w-full bg-[#FFF9E6] rounded-[32px] border-4 border-[#FFD057] p-4 shadow-[0_8px_0_#FFEBA0] overflow-hidden cursor-pointer hover:-translate-y-1"
                >
                  {/* Content Container */}
                  <div className="flex items-center justify-between relative z-10">
                    {/* Left Side */}
                    <div className="flex flex-col gap-3">
                      <div className="w-14 h-14 bg-[#2C9AFF] rounded-2xl flex items-center justify-center shadow-[0_4px_0_#1a7ccf]">
                        {lesson.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#FF6B00]">{lesson.title}</h3>
                      </div>
                    </div>
                    <div className="relative w-32 h-32 z-0">
                      <Image src={OwnSayHi} alt="Lesson" fill className="object-contain" />
                    </div>
                    {/* Right Side: Image + Play Button */}
                    <div className="flex flex-col items-center justify-center pl-4 relative">
                      {/* Optional: Lesson Image (Blocks) */}
                      <div className="z-10 scale-110 -ml-4">
                        <PlayButton />
                      </div>
                    </div>
                  </div>
                  {/* Background Decor (optional) */}
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-white/40 to-transparent pointer-events-none" />
                </div>
              );
            }

            // Render Locked/Collapsed Card
            return (
              <div
                key={lesson.id}
                className={cn(
                  "relative w-full h-24 rounded-[24px] flex items-center px-4 border-2 transition-all",
                  unlocked
                    ? "bg-white border-slate-100 shadow-sm cursor-pointer" // Inactive but unlocked state (if any)
                    : "bg-[#F0F0F0]/80 border-transparent shadow-none cursor-not-allowed", // Locked state
                )}
                onClick={() => unlocked && handleLessonClick(lesson.id)}
              >
                {/* Left Icon and Text */}
                <div className="flex items-center gap-4 flex-1">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center bg-green-500")}>
                    {lesson.icon}
                  </div>
                  <div className="flex flex-col">
                    <h3 className={cn("text-lg font-bold", unlocked ? "text-slate-700" : "text-slate-400")}>
                      {lesson.title}
                    </h3>
                    {!unlocked && <p className="text-slate-400 text-xs font-semibold">Đang khóa</p>}
                  </div>
                </div>

                {/* Right Lock Icon */}
                {!unlocked && (
                  <div className="opacity-50">
                    <Image src={LockCardIcon} alt="Locked" width={32} height={32} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </GameLayout>
  );
}
