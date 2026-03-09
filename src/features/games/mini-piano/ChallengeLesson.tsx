"use client";

import { useState, useEffect } from "react";
import PianoKey from "./PianoKey";
import { PIANO_NOTES } from "./constants";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

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
            speak(`Hãy tìm nốt ${randomNote.label} nào!`);
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
            speak(`Đúng rồi! Đây là nốt ${targetNote.label}`);

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

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-black text-blue-600 mb-4">Đố bé nốt nào là {targetNote?.label}?</h2>
                <div className="flex justify-center gap-4">
                    <div className="bg-white px-8 py-4 rounded-3xl shadow-lg border-4 border-blue-200">
                        <span className="text-2xl font-bold text-blue-800">Điểm: {score}/3</span>
                    </div>
                </div>
            </div>

            <div className="bg-[#4a4a4a] p-4 sm:p-8 rounded-[2rem] shadow-2xl border-t-[10px] border-[#333]">
                <div className="flex justify-center gap-1 sm:gap-2">
                    {PIANO_NOTES.map((note) => (
                        <div key={note.note} onClick={() => handleKeyTap(note.note)} className="w-full">
                            <PianoKey
                                {...note}
                                isHighlighted={feedback === "correct" && note.note === targetNote.note}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
