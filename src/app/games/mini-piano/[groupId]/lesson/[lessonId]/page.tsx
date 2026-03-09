"use client";

import { useParams, useRouter } from "next/navigation";
import { COURSES } from "@/libs/constants/courses";
import CreativeLesson from "@/features/games/mini-piano/CreativeLesson";
import SongLesson from "@/features/games/mini-piano/SongLesson";
import ChallengeLesson from "@/features/games/mini-piano/ChallengeLesson";
import RepeatMelodyLesson from "@/features/games/mini-piano/RepeatMelodyLesson";
import Header from "@/components/layout/Header";
import { ArrowLeft } from "lucide-react";
import { useProgress } from "@/context/ProgressContext";

export default function MiniPianoGamePage() {
    const params = useParams();
    const router = useRouter();
    const { markLessonComplete } = useProgress();

    const groupId = params.groupId as string;
    const lessonId = params.lessonId as string;

    const handleComplete = () => {
        markLessonComplete(groupId, lessonId, "mini-piano");
        router.push(`/games/mini-piano/${groupId}`);
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-yellow-100 relative overflow-hidden">
            <Header />

            <div className="container mx-auto px-4 pt-8 pb-20 relative z-10">
                <button
                    onClick={() => router.push(`/games/mini-piano/${groupId}`)}
                    className="mb-8 flex items-center gap-2 bg-white/90 hover:bg-white text-blue-600 px-6 py-3 rounded-full shadow-lg font-bold transition-all hover:scale-105 active:scale-95 group"
                >
                    <ArrowLeft className="text-2xl group-hover:-translate-x-1 transition-transform" />
                    <span>Quay lại danh sách bài học</span>
                </button>

                <div className="flex flex-col items-center">
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
                            className="mt-12 bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-full font-black text-xl shadow-xl transition-all hover:scale-105 active:scale-95"
                        >
                            Hoàn thành bài học!
                        </button>
                    )}
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-20 -left-10 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 -right-10 w-60 h-60 bg-pink-300/20 rounded-full blur-3xl" />
        </main>
    );
}
