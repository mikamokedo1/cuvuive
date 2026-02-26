import { Check } from "lucide-react";
import { DAYS_OF_WEEK } from "@/libs/constants/dayOfWeek";

interface StreakProps {
  activeDays: number[];
}

export function Streak({ activeDays }: StreakProps) {
  const currentDayIndex = new Date().getDay();
  return (
    <div className="flex flex-1 md:flex-none justify-between md:justify-center md:gap-2">
      {DAYS_OF_WEEK.map((day) => {
        const isActive = activeDays.includes(day.index);
        const isToday = day.index === currentDayIndex;

        return (
          <div key={day.label} className="flex flex-col items-center gap-1">
            <span className={`text-[10px] sm:text-xs font-bold ${isToday ? "text-orange-500" : "text-gray-400"}`}>
              {day.label}
            </span>
            <div
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors ${
                isActive ? "bg-[#FF9800] text-white shadow-sm" : "bg-gray-100 text-transparent"
              }`}
            >
              <Check size={16} strokeWidth={4} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
