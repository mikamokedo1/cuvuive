import { WordData } from "./constants";
import Image from "next/image";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

export function WordCard({ word }: { word: WordData }) {
  const { speak } = useTextToSpeech();
  return (
    <div
      onClick={() => speak(word.pronounce ?? word.name)}
      className="flex flex-col items-center justify-center bg-white rounded-[2rem] p-6 shadow-xl border-4 border-blue-100 hover:scale-105 transition-transform duration-300 cursor-pointer h-full min-h-[250px]"
    >
      <div className="relative w-32 h-32 md:w-48 md:h-48 mb-4">
        {word.image ? <Image src={word.image} alt={word.name} fill className="object-contain" /> : null}
      </div>
      <span className="text-3xl md:text-5xl font-extrabold text-[#38BDF8] capitalize">{word.name}</span>
    </div>
  );
}
