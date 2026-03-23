import Image from "next/image";
import { cn } from "@/libs/utils/cn";
const LockCardIcon = "https://assets.cuthongminh.com/games/lock-card.webp";
const OwnSayHi = "https://assets.cuthongminh.com/games/common/owl-say-hi.webp";
import PlayButton from "@/components/common/PlayButton";
import { playButtonSound } from "@/libs/utils/playSound";

export interface Lesson {
  id: string;
  title: string;
  icon: React.ReactNode;
  hideIcon?: boolean;
}

interface LessonCardProps {
  lesson: Lesson;
  unlocked: boolean;
  isActive: boolean;
  completed?: boolean;
  onClick: (lessonId: string) => void;
}

export const LessonCard = ({ lesson, unlocked, isActive, completed, onClick }: LessonCardProps) => {
  if (isActive && !completed) {
    return (
      <div
        onMouseEnter={() => playButtonSound()}
        key={lesson.id}
        onClick={() => onClick(lesson.id)}
        className="relative w-full bg-[#FFF9E6] rounded-[32px] border-4 border-[#FFD057] p-4 shadow-[0_8px_0_#FFEBA0] overflow-hidden cursor-pointer hover:-translate-y-1 transition-transform"
      >
        <div className="flex items-center justify-between relative z-10">
          <div className="flex flex-col gap-3">
            {!lesson.hideIcon && lesson.icon && (
              <div className="w-14 h-14 bg-[#2C9AFF] rounded-2xl flex items-center justify-center shadow-[0_4px_0_#1a7ccf]">
                {lesson.icon}
              </div>
            )}
            <h3 className="text-xl font-bold text-[#FF6B00]">{lesson.title}</h3>
          </div>
          <div className="relative w-32 h-32 z-0">
            <Image src={OwnSayHi} alt="Lesson" fill className="object-contain" sizes="128px" />
          </div>
          <div className="flex flex-col items-center justify-center pl-4">
            <div className="z-10 scale-110 -ml-4">
              <PlayButton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      key={lesson.id}
      className={cn(
        "relative w-full h-24 rounded-[24px] flex items-center px-4 border-2 transition-all cursor-pointer",
        unlocked
          ? "bg-white border-slate-100 shadow-sm hover:shadow-md"
          : "bg-[#F0F0F0]/80 border-transparent shadow-none",
      )}
      onClick={() => onClick(lesson.id)}
    >
      <div className="flex items-center gap-4 flex-1">
        {!lesson.hideIcon && lesson.icon && (
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-green-500">{lesson.icon}</div>
        )}
        <div className="flex flex-col">
          <h3 className={cn("text-lg font-bold", unlocked ? "text-slate-700" : "text-slate-400")}>{lesson.title}</h3>
          {!unlocked && <p className="text-slate-400 text-xs font-semibold">Đang khóa</p>}
        </div>
      </div>
      {!unlocked && (
        <div className="opacity-50">
          <Image src={LockCardIcon} alt="Locked" width={32} height={32} sizes="32px" />
        </div>
      )}
    </div>
  );
};
