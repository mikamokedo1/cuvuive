import Image, { StaticImageData } from "next/image";
import { cn } from "@/libs/utils/cn";
import lockImg from "@/assets/games/lock-card.png";
import { ActionButton } from "@/components/common/ActionButton";
import Star from "@/assets/games/star.png";

interface GroupCardProps {
  title: string;
  variant: "green" | "orange" | "purple" | "blue";
  isLocked: boolean;
  mainImage: StaticImageData | string;
  level: number;
  onClick?: () => void;
  isCompleted: boolean;
}

const STYLES = {
  green: {
    card: "bg-gradient-to-b from-[#a3e635] to-[#4ade80] border-[#65a30d]",
    header: "text-[#15803d]",
    range: "text-white drop-shadow-md",
    button: "bg-[#65a30d] hover:bg-[#4d7c0f] text-white border-[#3f6212] shadow-[0_4px_0_#3f6212]",
    buttonText: "BẮT ĐẦU",
  },
  orange: {
    card: "bg-gradient-to-b from-[#fdba74] to-[#fb923c] border-[#ea580c]",
    header: "text-[#c2410c]",
    range: "text-[#9a3412]",
    button: "bg-white/40 text-[#9a3412]", // Disabled looking style
    buttonText: "BẮT ĐẦU",
  },
  purple: {
    card: "bg-gradient-to-b from-[#d8b4fe] to-[#c084fc] border-[#9333ea]",
    header: "text-[#7e22ce]",
    range: "text-[#6b21a8]",
    button: "bg-white/40 text-[#6b21a8]", // Disabled looking style
    buttonText: "BẮT ĐẦU",
  },
  blue: {
    card: "bg-gradient-to-b from-[#7dd3fc] to-[#38bdf8] border-[#0284c7]",
    header: "text-[#0369a1]",
    range: "text-[#075985]",
    button: "bg-white/40 text-[#075985]", // Disabled looking style
    buttonText: "BẮT ĐẦU",
  },
};

export function GroupCard({ title, variant, isLocked, mainImage, onClick, isCompleted }: GroupCardProps) {
  const currentStyle = STYLES[variant];

  return (
    <div
      onClick={!isLocked ? onClick : undefined}
      className={cn(
        "relative flex flex-col items-center p-4 rounded-[40px] border-[8px] overflow-hidden transition-transform",
        currentStyle.card,
        !isLocked && "cursor-pointer hover:scale-105 active:scale-95",
        "w-full aspect-[3/4] max-w-[300px] mx-auto shadow-xl group",
      )}
    >
      {/* Header */}
      <h3
        className={cn(
          "text-center text-2xl md:text-[22px] font-bold uppercase tracking-wider font-display",
          currentStyle.header,
        )}
      >
        {title}
      </h3>
      <div className="flex gap-1 h-10 items-center justify-center">
        {isCompleted && (
          <div className="relative w-10 h-10">
            <Image src={Star} alt="Hoàn thành" fill className="object-contain" />
          </div>
        )}
      </div>
      {/* Main Image Area */}
      <div className="relative w-full flex-1 flex items-center justify-center">
        <Image
          src={mainImage}
          alt={title}
          fill
          className={cn("object-contain drop-shadow-xl")}
          sizes="(max-width: 768px) 100vw, 320px"
        />
      </div>

      {/* Action Button */}
      <ActionButton
        variant="glossy"
        color={variant}
        size="auto"
        className="w-full flex flex-col items-center justify-center gap-4 py-3 md:py-4 px-4 text-xl md:text-2xl"
        aria-label={`Bắt đầu học ${title}`}
      >
        {currentStyle.buttonText}
      </ActionButton>

      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center w-full h-full bg-black/50 cursor-not-allowed backdrop-blur-[2px]">
          <div className="relative w-20 h-20 md:w-24 md:h-24">
            <Image src={lockImg} alt="Locked" fill className="object-contain opacity-80" />
          </div>
        </div>
      )}
    </div>
  );
}
