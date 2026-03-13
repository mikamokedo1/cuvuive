"use client";
import { ShapeData } from "./constants";
import Image from "next/image";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

interface ShapeCardProps {
  shape: ShapeData;
  active?: boolean;
  onClick?: () => void;
  showName?: boolean;
}

export function ShapeCard({ shape, active = false, onClick, showName = true }: ShapeCardProps) {
  const { speak } = useTextToSpeech();

  return (
    <div
      className={`
        relative flex flex-col items-center justify-center gap-6
        transform transition-all duration-300
        ${active ? "scale-110" : "scale-100 hover:scale-105"}
        cursor-pointer
      `}
    >
      {/* Main Container - Side by Side on Tablet+ */}
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Shape Image */}
        <div
          className="w-40 h-40 sm:w-52 sm:h-52 rounded-3xl bg-white shadow-lg border-4 border-orange-100 flex items-center justify-center transition-transform relative overflow-hidden hover:scale-105"
          onClick={() => {
            speak(shape.name);
          }}
        >
          <Image src={shape.image} alt={shape.name} fill className="object-contain p-4" sizes="(max-width: 640px) 160px, 208px" />
        </div>

        {/* Association Object Image */}
        <div className="flex flex-col items-center gap-2">
          <div
            onClick={(e) => {
              speak(`${shape.objectName}`);
            }}
            className="relative w-40 h-40 sm:w-52 sm:h-52 drop-shadow-xl bg-white rounded-3xl p-4 border-4 border-green-100 hover:scale-105"
          >
            <Image src={shape.objectImage} alt={shape.objectName} fill className="object-contain p-4" sizes="(max-width: 640px) 160px, 208px" />
          </div>
        </div>
      </div>
    </div>
  );
}
