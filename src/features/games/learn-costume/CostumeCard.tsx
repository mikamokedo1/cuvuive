import Image from "next/image";
import { CostumeData } from "./constants";

interface CostumeCardProps {
  costume: CostumeData;
  isFlipped?: boolean;
}

export function CostumeCard({ costume, isFlipped = true }: CostumeCardProps) {
  return (
    <div
      className={`relative w-full aspect-[3/4] preserve-3d transition-transform duration-500 rounded-2xl ${
        isFlipped ? "rotate-y-180" : ""
      }`}
    >
      {/* Front (Hidden state) */}
      <div className="absolute inset-0 backface-hidden bg-white rounded-2xl shadow-sm border-4 border-indigo-100 flex items-center justify-center p-4">
        <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center">
          <span className="text-3xl text-indigo-300">?</span>
        </div>
      </div>

      {/* Back (Revealed state) */}
      <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-2xl shadow-sm border-4 border-indigo-100 overflow-hidden flex flex-col">
        <div className="flex-1 relative bg-[#F8FAFC] p-4 flex items-center justify-center">
          <div className="relative w-full h-full">
            <Image
              src={costume.image}
              alt={costume.name}
              fill
              className="object-contain" // Use object-contain to ensure the whole costume is visible
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority
            />
          </div>
        </div>

        <div className="h-20 bg-white flex flex-col items-center justify-center px-2 text-center border-t-2 border-indigo-50">
          <h3 className="text-lg font-bold text-slate-700 leading-tight">{costume.name}</h3>
          <p className="text-sm font-medium text-slate-500 mt-0.5">{costume.category}</p>
        </div>
      </div>
    </div>
  );
}
