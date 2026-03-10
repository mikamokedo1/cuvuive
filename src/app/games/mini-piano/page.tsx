"use client";

import { COURSES } from "@/libs/constants/courses";
import { GameWrapGroups } from "@/components/layout/GameWrapGroups";
import MiniPianoLogo from "@/assets/games/mini-piano/logo.png";

export default function MiniPianoRootPage() {
    const course = COURSES.find((c) => c.id === "mini-piano");
    if (!course) return null;

    return (
        <GameWrapGroups
            logo={MiniPianoLogo}
            gameId="mini-piano"
            groups={course.groups as any}
            title="Đàn Piano Tí Hon"
        />
    );
}
