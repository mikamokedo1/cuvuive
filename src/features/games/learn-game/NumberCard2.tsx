"use client";

import { cn } from "@/libs/utils/cn";
import Image from "next/image";
import { useEffect } from "react";
import { getThingImage } from "@/libs/constants/numberData";
import { NUMBER_NAMES_VI } from "@/libs/constants/numberPaths2";
import { useTextToSpeech } from "@/libs/hooks/useTextToSpeech";

interface NumberCard2Props {
  number: number;
  active?: boolean;
}

export const NumberCard2 = ({ number, active }: NumberCard2Props) => {
  const { speak } = useTextToSpeech();
  const nameVi = NUMBER_NAMES_VI[number] ?? `${number}`;
  const thingImage = getThingImage(number);

  // How many objects to show (cap at 12 for layout)
  const displayCount = Math.min(number, 12);
  const dots = Array.from({ length: displayCount });

  useEffect(() => {
    const timer = setTimeout(() => {
      speak(`Số ${number}, ${nameVi}`);
    }, 800);
    return () => clearTimeout(timer);
  }, [number, nameVi, speak]);

  return (
    <div
      className={cn(
        "w-100 rounded-3xl border-8 border-white shadow-xl bg-white flex flex-col items-center justify-between transition-all duration-500",
        active ? "scale-100 opacity-100 rotate-0" : "scale-90 opacity-50 rotate-6",
      )}
    >
      {/* The Digit */}
      <div
        className="flex-1 flex flex-col items-center justify-center cursor-pointer hover:scale-105 gap-1"
        onClick={() => speak(`Số ${number}, ${nameVi}`)}
      >
        <span className="text-[10rem] leading-none font-display font-black text-orange-500 drop-shadow-md animate-scale">
          {number}
        </span>
        <span className="text-2xl font-bold text-blue-600">{nameVi}</span>
      </div>

      {/* The Visuals (objects representing the count) */}
      {number > 0 && (
        <div
          className="w-full flex flex-wrap gap-2 justify-center mb-2 hover:scale-105 cursor-pointer px-2"
          onClick={() => speak(`Có ${number} ${thingImage.name}`)}
        >
          {dots.map((_, i) => (
            <div key={i} className={cn("relative", number > 9 ? "w-14 h-14" : "w-20 h-16")}>
              <Image src={thingImage.icon} alt={thingImage.name} fill className="object-contain" />
            </div>
          ))}
          {number > displayCount && (
            <div className="flex items-center text-lg font-bold text-gray-500">+{number - displayCount}</div>
          )}
        </div>
      )}

      {/* Special display for 0 */}
      {number === 0 && (
        <div className="w-full flex items-center justify-center mb-4 px-2">
          <span className="text-xl text-gray-400 italic">Không có gì cả!</span>
        </div>
      )}
    </div>
  );
};
