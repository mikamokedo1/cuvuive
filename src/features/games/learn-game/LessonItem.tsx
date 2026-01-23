import React from "react";
import { Lock, Check, Play } from "lucide-react";
import { cn } from "@/libs/utils/cn";

interface LessonItemProps {
  title: string;
  icon: React.ReactNode;
  status: "locked" | "unlocked" | "completed";
  onClick: () => void;
  color?: "blue" | "green" | "purple";
}

export function LessonItem({ title, icon, status, onClick, color = "blue" }: LessonItemProps) {
  const isLocked = status === "locked";
  const isCompleted = status === "completed";

  const colorStyles = {
    blue: "bg-white border-blue-200 hover:border-blue-400",
    green: "bg-white border-green-200 hover:border-green-400",
    purple: "bg-white border-purple-200 hover:border-purple-400",
  };

  return (
    <button
      onClick={isLocked ? undefined : onClick}
      className={cn(
        "w-full flex items-center p-4 rounded-2xl border-4 shadow-sm transition-all text-left group",
        isLocked ? "bg-gray-100 border-gray-200 opacity-70 cursor-not-allowed" : colorStyles[color],
        !isLocked && "active:scale-[0.98] hover:shadow-md",
      )}
    >
      <div
        className={cn(
          "w-16 h-16 rounded-xl flex items-center justify-center text-3xl shrink-0 mr-4 border-2",
          isLocked ? "bg-gray-200 border-gray-300 grayscale" : "bg-white border-transparent shadow-inner",
        )}
      >
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className={cn("text-lg md:text-xl font-bold truncate", isLocked ? "text-gray-500" : "text-gray-800")}>
          {title}
        </h3>
        <p className="text-sm text-gray-400 font-medium">
          {isCompleted ? "Hoàn thành!" : isLocked ? "Chưa mở khóa" : "Nhấn để học"}
        </p>
      </div>

      <div className="ml-4 shrink-0">
        {isCompleted ? (
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white shadow-sm">
            <Check size={24} strokeWidth={3} />
          </div>
        ) : isLocked ? (
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white">
            <Lock size={20} />
          </div>
        ) : (
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-sm group-hover:bg-blue-600 transition-colors">
            <Play size={20} fill="currentColor" />
          </div>
        )}
      </div>
    </button>
  );
}
