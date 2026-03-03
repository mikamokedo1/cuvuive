"use client";

import { useState, useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import Header from "@/components/layout/Header";
import { WelcomeBackModal } from "@/components/common/WelcomeBackModal";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useProgress } from "@/context/ProgressContext";
import { CourseDef } from "@/libs/actions/courses";
import star from "@/assets/games/star.webp";
import avatarBoy from "@/assets/avatar-boy.webp";
import avatarGirl from "@/assets/avatar-girl.webp";
//main bg
import BgImage from "@/assets/bg-games-home.webp";

//group logo
import MusicLogo from "@/assets/games/home/am_nhac.webp";
import GeographyLogo from "@/assets/games/home/dia_ly.webp";
import ScienceLogo from "@/assets/games/home/khoa_hoc.webp";
import LifeSkillLogo from "@/assets/games/home/ky_nang_song.webp";
import HistoryLogo from "@/assets/games/home/lich_su.webp";
import LanguageLogo from "@/assets/games/home/ngon_ngu.webp";
import MathLogo from "@/assets/games/home/toan.webp";
import LogicLogo from "@/assets/games/home/tu_duy.webp";
import ArtLogo from "@/assets/games/home/ve.webp";
import { COURSES } from "@/libs/constants/courses";
import { playButtonSound } from "@/libs/utils/playSound";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

interface Group {
  id: GameGroupType;
  title: string;
  icon: StaticImageData;
}

export type GameGroupType =
  | "math"
  | "life-skill"
  | "geography"
  | "music"
  | "science"
  | "history"
  | "language"
  | "art"
  | "logic";

const GROUPS: Group[] = [
  { id: "logic", title: "Tư Duy", icon: LogicLogo },
  { id: "art", title: "Mỹ Thuật", icon: ArtLogo },
  { id: "life-skill", title: "Kỹ Năng Sống", icon: LifeSkillLogo },
  { id: "geography", title: "Địa Lý Tự Nhiên", icon: GeographyLogo },
  { id: "music", title: "Âm Nhạc", icon: MusicLogo },
  { id: "science", title: "Khoa Học", icon: ScienceLogo },
  // { id: "history", title: "Lịch Sử", icon: HistoryLogo },
  { id: "language", title: "Ngôn Ngữ", icon: LanguageLogo },
  { id: "math", title: "Toán Học", icon: MathLogo },
];

interface GamesMapProps {
  courses: CourseDef[];
}

export function GamesMap({ courses }: GamesMapProps) {
  const { user } = useUser();
  const router = useRouter();
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const activeGroupRef = useRef<HTMLDivElement>(null);
  const [transformStyles, setTransformStyles] = useState<{ [key: string]: React.CSSProperties }>({});
  const { allProgress, lastPlayedCourseId } = useProgress();

  // Find which group type the last played game belongs to
  const lastPlayedGroupType = lastPlayedCourseId
    ? COURSES.find((c) => c.id === lastPlayedCourseId)?.type || null
    : null;

  /**
   * Mirror the exact same logic as ProfileView.tsx:
   * - "done"     → every lesson across all groups is completed (using server-fetched courses for counts)
   * - "progress" → some lessons started but not all done
   * - "none"     → not started at all
   */
  const getGameStatus = (gameId: string): "done" | "progress" | "none" => {
    const prog = allProgress[gameId];
    if (!prog) return "none";

    const hasAnyLesson = Object.values(prog.completedLessons).some((ls) => ls.length > 0);
    if (!hasAnyLesson) return "none";

    // Use the server-fetched courses data — same as ProfileView.tsx
    const course = courses.find((c) => c.id === gameId);
    if (!course) return "progress"; // course not in DB yet

    const totalLessons = course.groups.reduce((sum, g) => sum + g.lessons.length, 0);
    const completedLessons = course.groups.reduce((sum, g) => {
      const done = prog.completedLessons[g.id] || []; // g.id is the group slug
      return sum + done.length;
    }, 0);

    if (totalLessons > 0 && completedLessons >= totalLessons) return "done";
    return "progress";
  };

  useClickOutside(activeGroupRef, () => {
    if (activeGroupId) {
      setActiveGroupId(null);
      setTransformStyles({});
    }
  });

  // Handle window resizing to reset centered positioning
  useEffect(() => {
    const handleResize = () => {
      setActiveGroupId(null);
      setTransformStyles({});
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="min-h-screen relative flex flex-col items-center pb-20 pt-6 px-4 isolate overflow-x-hidden overflow-y-auto bg-gradient-to-b from-[#e0f7fa] to-[#b2ebf2]">
      {/* Header */}
      <Header />

      {/* Welcome Modal */}
      <WelcomeBackModal />

      {/* Map Container */}
      <div className="relative w-full max-w-5xl md:aspect-[16/10] mt-4 z-10 transition-all px-4 sm:px-10 pt-10 pb-20 md:pt-30 min-h-[600px] flex items-center justify-center">
        <Image
          src={BgImage}
          alt="Bản đồ thế giới trò chơi"
          fill
          className="absolute inset-0 w-full h-full object-cover rounded-[2rem] shadow-2xl border-[6px] border-white/80 -z-10"
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
        <div className="flex flex-wrap justify-center gap-x-10 md:gap-x-20 gap-y-10 relative z-20 w-full h-full">
          {GROUPS.map((group) => {
            const isActive = activeGroupId === group.id;
            const isAnotherGroupActive = activeGroupId !== null && !isActive;
            const groupGames = COURSES.filter((g) => g.type === group.id);
            const radius = 130;
            const isLastPlayedGroup = lastPlayedGroupType === group.id;

            const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
              playButtonSound();
              if (isActive) {
                setActiveGroupId(null);
                setTransformStyles((prev) => ({ ...prev, [group.id]: {} }));
                return;
              }

              const rect = e.currentTarget.getBoundingClientRect();
              const centerX = window.innerWidth / 2;
              const centerY = window.innerHeight / 2;
              const elementCenterX = rect.left + rect.width / 2;
              const elementCenterY = rect.top + rect.height / 2;
              const translateX = centerX - elementCenterX;
              const translateY = centerY - elementCenterY;

              setTransformStyles((prev) => ({
                ...prev,
                [group.id]: {
                  transform: `translate(${translateX}px, ${translateY}px)`,
                  zIndex: 50,
                },
              }));

              setActiveGroupId(group.id);
            };

            return (
              <div
                key={group.id}
                ref={isActive ? activeGroupRef : null}
                style={isActive ? transformStyles[group.id] || {} : {}}
                className={`relative flex items-center justify-center isolate transition-all duration-500 ease-out ${
                  isAnotherGroupActive
                    ? "opacity-30 blur-[2px] grayscale-[30%] scale-95 pointer-events-none"
                    : "opacity-100 scale-100 cursor-pointer"
                } ${isActive ? "z-50" : "z-20"}`}
                onClick={handleClick}
              >
                {/* Group Icon */}
                <div
                  className={`transition-all duration-300 drop-shadow-xl z-30 border-4 rounded-full bg-white relative ${
                    isActive
                      ? "border-orange-500 scale-110 ring-4 ring-orange-300 ring-offset-2"
                      : "border-orange-500 hover:scale-[1.05] scale-100"
                  }`}
                >
                  <Image
                    src={group.icon}
                    alt={group.title}
                    className="w-24 h-24 sm:w-32 sm:h-32 object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.15)]"
                  />
                  {/* Last played indicator */}
                  {user && isLastPlayedGroup && !isActive && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center animate-bounce">
                      <Image
                        src={user?.user_metadata?.sex === "female" ? avatarGirl : avatarBoy}
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full border-1 border-white shadow-md bg-blue-200 object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Child Games showing around the Group */}
                <div
                  className={`absolute inset-0 m-auto w-full h-full pointer-events-none z-20 transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {groupGames.map((game, i) => {
                    const angle = (Math.PI * 2 * i) / groupGames.length - Math.PI / 2;
                    const x = isActive ? Math.cos(angle) * radius : 0;
                    const y = isActive ? Math.sin(angle) * radius : 0;
                    const status = getGameStatus(game.id);

                    return (
                      <div
                        key={game.id}
                        className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 transition-all duration-500 ease-out"
                        style={{
                          transform: `translate(${x}px, ${y}px) scale(${isActive ? 1 : 0.2})`,
                          pointerEvents: isActive ? "auto" : "none",
                        }}
                      >
                        <div
                          className="block w-full h-full group/game"
                          onClick={(e) => {
                            e.stopPropagation();
                            playButtonSound();
                            router.push(`/games/${game.id}`);
                          }}
                        >
                          <div className="relative w-full h-full bg-white rounded-full border-2 border-orange-300 shadow-xl flex items-center justify-center transition-transform hover:scale-110">
                            <Image
                              src={game.icon}
                              alt={game.title}
                              fill
                              className="object-contain p-1 drop-shadow-sm"
                            />
                            {/* Star badge */}
                            {status !== "none" && (
                              <div
                                className={` absolute -top-4 left-1/2 -translate-x-1/2 w-7 h-7 z-10 ${status === "done" ? "" : "grayscale-[100%]"}`}
                              >
                                <Image src={star} alt="completed" fill className="object-contain drop-shadow-md" />
                              </div>
                            )}
                          </div>
                          {/* Tooltip */}
                          <div className="absolute -bottom-0 left-1/2 -translate-x-1/2 bg-blue-600/80 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap transition-opacity pointer-events-none">
                            {game.title}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
