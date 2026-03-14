import { cn } from "@/libs/utils/cn";
import { playSound } from "@/libs/utils/playSound";
import Image, { StaticImageData } from "next/image";
import { useEffect } from "react";
import { ThingImages } from "@/libs/constants/thingImages";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

interface NumberCardProps {
  number: number;
  active?: boolean;
  soundNum?: string;
  image: string | StaticImageData;
}

export const NumberCard = ({ number, active, soundNum, image }: NumberCardProps) => {
  const { speak } = useTextToSpeech();
  // Generate dots corresponding to the number
  const dots = Array.from({ length: number });
  useEffect(() => {
    const timer = setTimeout(() => {
      if (soundNum) {
        playSound(soundNum);
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [number, soundNum]);
  return (
    <div
      className={cn(
        "w-80 md:w-100 rounded-3xl border-8 border-white shadow-xl bg-white flex flex-col items-center justify-between transition-all duration-500",
        active ? "scale-100 opacity-100 rotate-0" : "scale-90 opacity-50 rotate-6",
      )}
    >
      {/* The Digit */}
      <div
        className="flex-1 flex items-center justify-center cursor-pointer  hover:scale-105"
        onClick={() => soundNum && playSound(soundNum)}
      >
        <span className="text-[12rem] leading-none font-display font-black text-orange-500 drop-shadow-md animate-scale ">
          {number}
        </span>
      </div>

      {/* The Visuals (Dots for now) */}
      <div
        className="w-full flex flex-wrap gap-3 justify-center mb-2 hover:scale-105 cursor-pointer"
        onClick={() => speak(`Có ${number} ${ThingImages[number - 1].name}`)}
      >
        {dots.map((_, i) => (
          <div key={i} className="w-30 h-20 relative">
            <Image src={image} alt="Number" fill className="object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
};
