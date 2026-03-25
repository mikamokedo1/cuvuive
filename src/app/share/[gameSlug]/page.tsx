import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GAME_SEO } from "@/libs/constants/game-seo";
import { COURSES } from "@/libs/constants/courses";

const owlCongrats = "https://assets.cuthongminh.com/games/common/owl-say-hi.webp";
const star = "https://assets.cuthongminh.com/games/star.webp";

interface SharePageProps {
  params: Promise<{ gameSlug: string }>;
  searchParams: Promise<{ name?: string }>;
}

export async function generateMetadata({ params, searchParams }: SharePageProps): Promise<Metadata> {
  const { gameSlug } = await params;
  const { name } = await searchParams;
  const seo = GAME_SEO[gameSlug];
  const course = COURSES.find((c) => c.id === gameSlug);

  if (!seo || !course) return {};

  const displayName = name ? `Bé ${name.charAt(0).toUpperCase() + name.slice(1)}` : "Bé";
  const title = `🎉 ${displayName} đã hoàn thành "${course.title}" trên Cú Thông Minh!`;
  const description = `Cùng bé khám phá trò chơi ${course.title} - ${seo.description}`;

  return {
    title,
    description,
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
      url: `https://cuthongminh.com/share/${gameSlug}`,
      siteName: "Cú Thông Minh",
      locale: "vi_VN",
      type: "website",
      images: [{ url: seo.ogImage, width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function SharePage({ params, searchParams }: SharePageProps) {
  const { gameSlug } = await params;
  const { name } = await searchParams;
  const seo = GAME_SEO[gameSlug];
  const course = COURSES.find((c) => c.id === gameSlug);

  if (!seo || !course) notFound();

  const displayName = name ? `Bé ${name.charAt(0).toUpperCase() + name.slice(1)}` : "Bé";

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-[32px] border-[8px] border-[#FFD057] p-8 shadow-[0_0_60px_rgba(255,208,87,0.4)] flex flex-col items-center text-center relative overflow-visible">
          {/* Stars */}
          <div className="absolute -top-6 -right-6 w-16 h-16 animate-pulse">
            <Image src={star} alt="" width={64} height={64} className="object-contain" sizes="64px" />
          </div>
          <div className="absolute -top-5 -left-5 w-12 h-12 animate-pulse" style={{ animationDelay: "0.3s" }}>
            <Image src={star} alt="" width={48} height={48} className="object-contain" sizes="48px" />
          </div>
          <div className="absolute -bottom-4 -left-6 w-14 h-14 animate-pulse" style={{ animationDelay: "0.6s" }}>
            <Image src={star} alt="" width={56} height={56} className="object-contain" sizes="56px" />
          </div>

          {/* Confetti emoji */}
          <p className="text-4xl mb-2">🎉</p>

          {/* Title */}
          <h1 className="text-2xl font-extrabold text-[#FF6B00] mb-4 font-[var(--font-baloo-2)] leading-tight">
            {displayName} đã hoàn thành khóa học!
          </h1>

          {/* Game Logo */}
          {seo.ogImage && (
            <div className="relative w-32 h-32 mt-2">
              <Image
                src={seo.ogImage}
                alt={course.title}
                fill
                className="object-contain drop-shadow-xl"
                sizes="128px"
                priority
              />
            </div>
          )}

          {/* Game Title */}
          <h2 className="text-2xl font-bold text-orange-600 mt-3 mb-4">{course.title}</h2>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 w-full max-w-[260px]">
            <Link
              href={`/games/${gameSlug}`}
              className="flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 text-white font-bold text-lg shadow-lg hover:brightness-110 active:scale-95 transition-all"
            >
              🎮 Chơi ngay
            </Link>
            <Link
              href="/games"
              className="flex items-center justify-center gap-2 w-full py-3 px-5 rounded-full bg-slate-100 text-slate-600 font-semibold text-base hover:bg-slate-200 active:scale-95 transition-all"
            >
              📚 Khám phá thêm game
            </Link>
          </div>

          {/* Owl */}
          <div className="absolute -bottom-10 -right-4 w-24 h-24">
            <Image src={owlCongrats} alt="Cú Thông Minh" fill className="object-contain drop-shadow-lg" sizes="96px" />
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-400 text-xs mt-14">Cú Thông Minh - Trò chơi giáo dục cho bé 3-8 tuổi</p>
      </div>
    </div>
  );
}
