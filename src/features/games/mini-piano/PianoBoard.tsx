"use client";

import PianoKey from "./PianoKey";
import { PIANO_NOTES } from "./constants";

export default function PianoBoard() {
    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:py-12">
            <div className="bg-[#4a4a4a] p-2 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl border-t-[6px] sm:border-t-[10px] border-[#333]">
                <div className="flex justify-center gap-0.5 sm:gap-2">
                    {PIANO_NOTES.map((note) => (
                        <PianoKey key={note.note} {...note} />
                    ))}
                </div>
            </div>

            <div className="mt-8 sm:mt-12 text-center animate-bounce">
                <p className="text-lg sm:text-2xl font-bold text-blue-800 bg-white/80 inline-block px-4 sm:px-8 py-2 sm:py-3 rounded-full shadow-lg border-2 border-blue-400">
                    🎶 Hãy chạm vào các phím đàn nhé! 🎶
                </p>
            </div>
        </div>
    );
}
