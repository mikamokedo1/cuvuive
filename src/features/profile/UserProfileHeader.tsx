import { ActionButton } from "@/components/common/ActionButton";
import { Crown, Star } from "lucide-react";
import { User } from "@supabase/supabase-js";

interface UserProfileHeaderProps {
  user: User;
  isPremium: boolean;
  level: number;
}

export function UserProfileHeader({ user, isPremium, level }: UserProfileHeaderProps) {
  return (
    <div className="bg-[#FFF4E0] rounded-3xl p-8 border-4 border-white shadow-xl mb-10 flex flex-col md:flex-row items-center gap-8">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-blue-300 border-4 border-white shadow-md flex items-center justify-center text-3xl font-bold text-white">
          {user?.email?.[0]?.toUpperCase() || "B"}
        </div>
        {isPremium && (
          <div className="absolute -top-2 -right-2 bg-yellow-400 text-white p-2 rounded-full border-4 border-white shadow-sm">
            <Crown size={20} fill="white" />
          </div>
        )}
      </div>

      <div className="flex-1 text-center md:text-left">
        <h1 className="text-3xl font-black text-gray-800 font-display mb-2">
          Xin chào, {user?.user_metadata?.kidName || "Bé Yêu"}!
        </h1>
        <p className="text-gray-500 font-medium">Hôm nay bé muốn học gì nào?</p>
      </div>

      <div className="flex gap-4">
        <div className="bg-white px-6 py-3 rounded-2xl border-2 border-yellow-200 flex flex-col items-center">
          <Star className="text-yellow-400 mb-1" fill="currentColor" />
          <span className="font-bold text-gray-700">Level {level}</span>
        </div>
      </div>
    </div>
  );
}
