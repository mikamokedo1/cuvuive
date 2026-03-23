"use client";

import { BookOpen, Music, Brain } from "lucide-react";
import { GameWrapLessons } from "@/components/layout/GameWrapLessons";
import { COURSES } from "@/libs/constants/courses";
import { useGroupLessons } from "@/hooks/useGroupLessons";
import { useParams } from "next/navigation";

const ICON_MAP: Record<string, React.ReactNode> = {
    "creative-sounds": <Music className="text-white w-6 h-6" />,
    "mini-musician": <BookOpen className="text-white w-6 h-6" />,
    "ear-training": <Brain className="text-white w-6 h-6" />,
};

export default function PianoGroupLessonsPage() {
    const params = useParams();
    const groupId = params.groupId as string;
    const course = COURSES.find((c) => c.id === "mini-piano");
    const groupData = course?.groups.find((g) => g.id === groupId);

    const lessons = (groupData?.lessons || []).map((l) => ({
        id: l.id,
        title: l.title,
        icon: ICON_MAP[groupId] || <Music className="text-white w-6 h-6" />,
        isPremium: !l.isFree,
    }));

    const { activeIndex, handleLessonClick } = useGroupLessons({
        gameSlug: "mini-piano",
        groups: (course?.groups || []) as any,
        lessons,
    });

    if (!course || !groupData) return <div>Group not found</div>;

    return (
        <GameWrapLessons
            gameId="mini-piano"
            lessons={lessons}
            title={groupData.title}
            activeIndex={activeIndex}
            handleLessonClick={handleLessonClick}
        />
    );
}
