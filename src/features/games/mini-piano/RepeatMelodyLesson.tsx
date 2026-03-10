"use client";

import { useState, useEffect } from "react";
import PianoKey from "./PianoKey";
import { PIANO_NOTES } from "./constants";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playNoteSound } from "./utils/audioUtils";

import { Volume2 } from "lucide-react";

interface RepeatMelodyLessonProps {
    onComplete: () => void;
}

export default function RepeatMelodyLesson({ onComplete }: RepeatMelodyLessonProps) {
    const [melody, setMelody] = useState<string[]>([]);
    const [playerSequence, setPlayerSequence] = useState<string[]>([]);
    const [isPlayingMelody, setIsPlayingMelody] = useState(false);
    const [score, setScore] = useState(0);
    const { speak } = useTextToSpeech();

    const generateMelody = (length: number) => {
        const newMelody = [];
        for (let i = 0; i < length; i++) {
            const randomNote = PIANO_NOTES[Math.floor(Math.random() * (PIANO_NOTES.length - 2))].note;
            newMelody.push(randomNote);
        }
        setMelody(newMelody);
        setPlayerSequence([]);
        playMelody(newMelody);
    };

    const playMelody = async (sequence: string[]) => {
        setIsPlayingMelody(true);
        speak("Lắng nghe giai điệu nhé!");

        for (let i = 0; i < sequence.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 800));
            // Play actual sound instead of name
            const noteObj = PIANO_NOTES.find(n => n.note === sequence[i]);
            if (noteObj) {
                playNoteSound(noteObj.freq);
            }
        }

        setTimeout(() => {
            setIsPlayingMelody(false);
            speak("Đến lượt bạn rồi, hãy đánh lại giai điệu nào!");
        }, 1000);
    };

    useEffect(() => {
        generateMelody(2);
    }, []);

    const handleKeyTap = (note: string) => {
        if (isPlayingMelody) return;

        const nextIndex = playerSequence.length;
        if (note === melody[nextIndex]) {
            const newSequence = [...playerSequence, note];
            setPlayerSequence(newSequence);

            if (newSequence.length === melody.length) {
                playWinEffect(500);
                speak("Giỏi quá! Bạn đã lặp lại đúng giai điệu!");

                setTimeout(() => {
                    const newScore = score + 1;
                    setScore(newScore);
                    if (newScore >= 3) {
                        onComplete();
                    } else {
                        generateMelody(newScore + 2); // Increase difficulty
                    }
                }, 2000);
            }
        } else {
            speak("Chưa đúng rồi, hãy nghe lại nhé!");
            setPlayerSequence([]);
            setTimeout(() => playMelody(melody), 1000);
        }
    };

    return (
        <div className="w-full">
            <div className="text-center mb-6 sm:mb-12">
                <h2 className="text-2xl sm:text-4xl font-black text-purple-600 mb-3 sm:mb-4">Lặp lại giai điệu</h2>
                <div className="flex justify-center items-center gap-2 sm:gap-4">
                    <div className="bg-white px-4 sm:px-8 py-2 sm:py-4 rounded-2xl sm:rounded-3xl shadow-lg border-2 sm:border-4 border-purple-200">
                        <span className="text-lg sm:text-2xl font-bold text-purple-800">Điểm: {score}/3</span>
                    </div>

                    <button
                        onClick={() => playMelody(melody)}
                        disabled={isPlayingMelody}
                        className={`
                            flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-4 rounded-2xl sm:rounded-3xl shadow-lg border-2 sm:border-4 transition-all
                            ${isPlayingMelody
                                ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-white border-purple-200 text-purple-600 hover:scale-105 active:scale-95 hover:bg-purple-50"}
                        `}
                    >
                        <Volume2 className={`w-5 h-5 sm:w-6 sm:h-6 ${isPlayingMelody ? "animate-pulse" : ""}`} />
                        <span className="text-lg sm:text-xl font-bold">Nghe lại</span>
                    </button>
                </div>
            </div>

            <div className="bg-[#4a4a4a] p-2 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl border-t-[6px] sm:border-t-[10px] border-[#333]">
                <div className="flex justify-center gap-0.5 sm:gap-2">
                    {PIANO_NOTES.map((note) => (
                        <PianoKey
                            key={note.note}
                            {...note}
                            isHighlighted={!isPlayingMelody && playerSequence.length < melody.length && false} // No auto-highlight in this mode
                            onClick={handleKeyTap}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
