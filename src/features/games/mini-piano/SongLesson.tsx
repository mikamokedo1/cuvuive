"use client";

import { useState, useEffect } from "react";
import PianoKey from "./PianoKey";
import { PIANO_NOTES, SONGS } from "./constants";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

interface SongLessonProps {
    songId: string;
    onComplete: () => void;
}

export default function SongLesson({ songId, onComplete }: SongLessonProps) {
    const song = (SONGS as any)[songId];
    const [currentIndex, setCurrentIndex] = useState(0);
    const { speak } = useTextToSpeech();

    useEffect(() => {
        if (song) {
            speak(`Hãy chơi bài hát ${song.title} theo hướng dẫn nhé!`);
        }
    }, [song, speak]);

    const handleKeyTap = (note: string) => {
        if (note === song.notes[currentIndex]) {
            if (currentIndex === song.notes.length - 1) {
                playWinEffect(500);
                speak(" Tuyệt vời! Bạn đã hoàn thành bài hát!");
                onComplete();
            } else {
                setCurrentIndex(currentIndex + 1);
            }
        } else {
            // Wrong note
            speak(" Chưa đúng rồi, thử lại nhé!");
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8 text-center bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white">
                <h2 className="text-3xl font-bold text-purple-700 mb-2">{song.title}</h2>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {song.notes.map((n: string, i: number) => (
                        <div
                            key={i}
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-all
                ${i < currentIndex ? "bg-green-500 scale-90" : i === currentIndex ? "bg-purple-600 scale-110 ring-4 ring-purple-200" : "bg-gray-300"}
              `}
                        >
                            {PIANO_NOTES.find((pn) => pn.note === n)?.label}
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-[#4a4a4a] p-4 sm:p-8 rounded-[2rem] shadow-2xl border-t-[10px] border-[#333]">
                <div className="flex justify-center gap-1 sm:gap-2">
                    {PIANO_NOTES.map((note) => (
                        <div key={note.note} onClick={() => handleKeyTap(note.note)} className="w-full">
                            <PianoKey
                                {...note}
                                isHighlighted={note.note === song.notes[currentIndex]}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
