"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { COURSES } from "@/libs/constants/courses";
import CreativeLesson from "@/features/games/mini-piano/CreativeLesson";
import SongLesson from "@/features/games/mini-piano/SongLesson";
import ChallengeLesson from "@/features/games/mini-piano/ChallengeLesson";
import RepeatMelodyLesson from "@/features/games/mini-piano/RepeatMelodyLesson";
import Header from "@/components/layout/Header";
import { ArrowLeft } from "lucide-react";
import { useProgress } from "@/context/ProgressContext";
import { ActionButton } from "@/components/common/ActionButton";
import { CompletionModal } from "@/components/games/CompletionModal";

export default function MiniPianoGamePage() {
    const params = useParams();
    const router = useRouter();
    const { markLessonComplete } = useProgress();

    const groupId = params.groupId as string;
    const lessonId = params.lessonId as string;

    const [showComplete, setShowComplete] = useState(false);

    const course = COURSES.find((c) => c.id === "mini-piano");
    const group = course?.groups.find((g) => g.id === groupId);
    const lessons = group?.lessons || [];
    const lessonIndex = lessons.findIndex((l) => l.id === lessonId);

    const currentLessonNum = lessonIndex + 1;
    const isLastLesson = lessonIndex === lessons.length - 1;
    const nextLessonNum = isLastLesson ? undefined : lessonIndex + 2;

    const handleComplete = () => {
        markLessonComplete(groupId, lessonId, "mini-piano");
        setShowComplete(true);
    };

    const handleNext = () => {
        router.push(`/games/mini-piano/${groupId}`);
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-yellow-100 relative overflow-hidden py-4 sm:py-6 px-3 sm:px-4 flex flex-col">
            <Header />

            <div className="flex-1 w-full max-w-6xl mx-auto flex flex-col items-center relative z-10 text-center">
                <div className="w-full flex justify-start mb-4 sm:mb-8">
                    <ActionButton
                        variant="glossy"
                        color="orange"
                        size="auto"
                        className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl flex items-center gap-1.5 sm:gap-2"
                        onClick={() => router.push(`/games/mini-piano/${groupId}`)}
                    >
                        <ArrowLeft size={18} className="text-white" />
                        <span className="text-white text-sm sm:text-base font-bold">Quay lại</span>
                    </ActionButton>
                </div>

                <div className="flex flex-col items-center w-full">
                    {groupId === "creative-sounds" && <CreativeLesson lessonId={lessonId} />}
                    {groupId === "mini-musician" && <SongLesson songId={lessonId} onComplete={handleComplete} />}
                    {groupId === "ear-training" && (
                        lessonId === "repeat-melody"
                            ? <RepeatMelodyLesson onComplete={handleComplete} />
                            : <ChallengeLesson lessonId={lessonId} onComplete={handleComplete} />
                    )}

                    {/* Simple complete button for Creative Mode since it's free play */}
                    {groupId === "creative-sounds" && (
                        <button
                            onClick={handleComplete}
                            className="mt-8 sm:mt-12 bg-green-500 hover:bg-green-600 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-black text-lg sm:text-xl shadow-xl transition-all hover:scale-105 active:scale-95"
                        >
                            Hoàn thành bài học!
                        </button>
                    )}
                </div>
            </div>

            <CompletionModal
                isOpen={showComplete}
                onNext={handleNext}
                currentLessonNum={currentLessonNum}
                nextLessonNum={nextLessonNum}
                isGroupComplete={isLastLesson}
            />


            {/* Decorative elements */}
            <div className="absolute top-20 -left-10 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 -right-10 w-60 h-60 bg-pink-300/20 rounded-full blur-3xl" />
        </main>
    );
}
