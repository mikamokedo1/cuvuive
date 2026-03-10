"use client";

import { useState, useEffect } from "react";
import PianoKey from "./PianoKey";
import { PIANO_NOTES } from "./constants";
import { playWinEffect } from "@/libs/utils/playWinEffect";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

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
            // We can't easily trigger the sound from here without refactoring PianoKey, 
            // but we can at least show visual feedback if we had refs.
            // For now, let's just speak the notes to represent the "melody" for the kid.
            const noteObj = PIANO_NOTES.find(n => n.note === sequence[i]);
            speak(noteObj?.label || "");
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
            <div className="text-center mb-12">
                <h2 className="text-4xl font-black text-purple-600 mb-4">Lặp lại giai điệu</h2>
                <div className="flex justify-center gap-4">
                    <div className="bg-white px-8 py-4 rounded-3xl shadow-lg border-4 border-purple-200">
                        <span className="text-2xl font-bold text-purple-800">Điểm: {score}/3</span>
                    </div>
                </div>
            </div>

            <div className="bg-[#4a4a4a] p-4 sm:p-8 rounded-[2rem] shadow-2xl border-t-[10px] border-[#333]">
                <div className="flex justify-center gap-1 sm:gap-2">
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
