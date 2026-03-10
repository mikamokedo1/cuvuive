"use client";

import { useState } from "react";
import PianoKey from "./PianoKey";
import { PIANO_NOTES, SOUND_SETS } from "./constants";

interface CreativeLessonProps {
    lessonId: string;
}

export default function CreativeLesson({ lessonId }: CreativeLessonProps) {
    let soundSet: any = SOUND_SETS.classic;
    if (lessonId === "animal-piano") soundSet = SOUND_SETS.animal;
    if (lessonId === "funny-sounds") soundSet = SOUND_SETS.funny;

    return (
        <div className="w-full">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-blue-700 mb-2">Chế độ: {soundSet.title}</h2>
                <p className="text-gray-600 italic">Khám phá các âm thanh {soundSet.title.toLowerCase()} vui tai!</p>
            </div>

            <div className="bg-[#4a4a4a] p-4 sm:p-8 rounded-[2rem] shadow-2xl border-t-[10px] border-[#333]">
                <div className="flex justify-center gap-1 sm:gap-2">
                    {PIANO_NOTES.map((note) => (
                        <PianoKey
                            key={note.note}
                            {...note}
                            soundSet={soundSet.id}
                            animalSound={soundSet.map ? soundSet.map[note.note] : undefined}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
