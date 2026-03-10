"use client";

import { useState, useEffect } from "react";
import PianoKey from "./PianoKey";
import { PIANO_NOTES } from "./constants";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { playNoteSound } from "./utils/audioUtils";

import { Volume2 } from "lucide-react";

interface ChallengeLessonProps {
    lessonId: string;
    onComplete: () => void;
}

export default function ChallengeLesson({ lessonId, onComplete }: ChallengeLessonProps) {
    const [targetNote, setTargetNote] = useState<any>(null);
    const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
    const [score, setScore] = useState(0);
    const { speak } = useTextToSpeech();

    const generateChallenge = () => {
        const randomNote = PIANO_NOTES[Math.floor(Math.random() * PIANO_NOTES.length)];
        setTargetNote(randomNote);
        setFeedback(null);

        setTimeout(() => {
            speak(`Đố bé đây là nốt gì?`);
            setTimeout(() => playNoteSound(randomNote.freq), 1000);
        }, 500);
    };

    useEffect(() => {
        generateChallenge();
    }, []);

    const handleKeyTap = (note: string) => {
        if (feedback === "correct") return;

        if (note === targetNote.note) {
            setFeedback("correct");
            playWinEffect(500);
            speak(`Đúng rồi! Bạn giỏi quá!`);

            setTimeout(() => {
                const newScore = score + 1;
                setScore(newScore);
                if (newScore >= 3) {
                    onComplete();
                } else {
                    generateChallenge();
                }
            }, 2000);
        } else {
            setFeedback("wrong");
            speak("Chưa đúng rồi, thử lại nhé!");
            setTimeout(() => setFeedback(null), 1000);
        }
    };

    if (!targetNote) return null;

    return (
        <div className="w-full">
            <div className="text-center mb-6 sm:mb-12">
                <h2 className="text-2xl sm:text-4xl font-black text-blue-600 mb-3 sm:mb-4">Đố bé đây là nốt gì?</h2>
                <div className="flex justify-center items-center gap-2 sm:gap-4">
                    <div className="bg-white px-4 sm:px-8 py-2 sm:py-4 rounded-2xl sm:rounded-3xl shadow-lg border-2 sm:border-4 border-blue-200">
                        <span className="text-lg sm:text-2xl font-bold text-blue-800">Điểm: {score}/3</span>
                    </div>

                    <button
                        onClick={() => {
                            speak(`Hãy nghe lại nhé!`);
                            setTimeout(() => playNoteSound(targetNote.freq), 1000);
                        }}
                        className="flex items-center gap-1.5 sm:gap-2 bg-white px-4 sm:px-6 py-2 sm:py-4 rounded-2xl sm:rounded-3xl shadow-lg border-2 sm:border-4 border-blue-200 text-blue-600 transition-all hover:scale-105 active:scale-95 hover:bg-blue-50"
                    >
                        <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
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
                            isHighlighted={feedback === "correct" && note.note === targetNote.note}
                            onClick={handleKeyTap}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
