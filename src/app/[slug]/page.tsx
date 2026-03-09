import { GROUPS } from "@/libs/constants/groups";
import { COURSES } from "@/libs/constants/courses";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { HeaderHome } from "@/components/layout/HeaderHome";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Star, Play, Trophy } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return GROUPS.map((group) => ({
    slug: group.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const group = GROUPS.find((g) => g.slug === slug);

  if (!group) return {};

  const title = `${group.title} cho bé - Trò chơi giáo dục Cú Thông Minh`;
  const description = `Khám phá các trò chơi ${group.title} hấp dẫn giúp bé phát triển tư duy, sáng tạo và kỹ năng toàn diện tại Cú Thông Minh.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: group.icon.src }],
    },
  };
}

export default async function GroupLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const group = GROUPS.find((g) => g.slug === slug);

  if (!group) {
    notFound();
  }

  const groupGames = COURSES.filter((course) => course.type === group.id);

  return (
    <div className="min-h-screen bg-[#FFF9F0] font-[family-name:var(--font-nunito-sans)]">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <HeaderHome />

        <main className="mt-8">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-orange-400 to-red-500 p-8 md:p-16 text-white mb-12 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="w-40 h-40 md:w-56 md:h-56 relative shrink-0 bg-white/20 backdrop-blur-md rounded-[2rem] p-4 shadow-xl animate-float">
                <Image src={group.icon} alt={group.title} fill className="object-contain p-4" priority />
              </div>
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white font-bold text-sm mb-6 backdrop-blur-sm border border-white/30">
                  <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                  Chủ đề phổ biến
                </div>
                <h1 className="text-4xl md:text-6xl font-black font-[family-name:var(--font-baloo-2)] mb-6 drop-shadow-md">
                  {group.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed font-medium">
                  Với những trò chơi {group.title.toLowerCase()} được thiết kế sinh động, bé sẽ được vừa học vừa chơi
                  một cách hứng thú nhất.
                </p>
              </div>
            </div>
          </div>

          {/* Games Grid */}
          <section className="mb-20">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-baloo-2)] text-slate-800 flex items-center gap-3">
                <Trophy className="w-8 h-8 text-orange-500" />
                Kho trò chơi {group.title}
              </h2>
              <span className="hidden md:block px-4 py-2 bg-orange-100 text-orange-600 rounded-full font-bold text-sm">
                {groupGames.length} Trò chơi
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {groupGames.map((game) => (
                <Link
                  key={game.id}
                  href={`/games/${game.id}`}
                  className="group bg-white rounded-[2.5rem] p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-orange-200 flex flex-col items-center text-center relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-24 h-24 bg-orange-50 rounded-br-[4rem] group-hover:bg-orange-100 transition-colors -z-10"></div>

                  <div className="w-32 h-32 relative mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    <Image src={game.icon} alt={game.title} fill className="object-contain filter drop-shadow-md" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-3 font-[family-name:var(--font-baloo-2)] group-hover:text-orange-500 transition-colors">
                    {game.title}
                  </h3>

                  <p className="text-slate-600 mb-6 line-clamp-2 font-medium">{game.description}</p>

                  <div className="mt-auto w-full flex items-center justify-center gap-2 py-3 bg-slate-50 group-hover:bg-orange-500 group-hover:text-white rounded-2xl font-bold transition-all duration-300">
                    <Play className="w-4 h-4 fill-current" />
                    Chơi ngay
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-slate-900 rounded-[3rem] p-12 text-center text-white mb-20 relative overflow-hidden shadow-2xl">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>

            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-baloo-2)] mb-6 relative z-10">
              Bắt đầu hành trình cùng Cú Thông Minh
            </h2>
            <p className="text-lg md:text-xl text-slate-300 max-w-xl mx-auto mb-10 relative z-10 font-medium">
              Đăng ký tài khoản ngay hôm nay để mở khóa hơn 200+ bài học và theo dõi tiến độ của bé.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link
                href="/auth/sign-up"
                className="w-full sm:w-auto px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full text-lg shadow-xl hover:shadow-orange-500/30 transition-all duration-300"
              >
                Đăng ký miễn phí
              </Link>
              <Link
                href="/games"
                className="w-full sm:w-auto px-10 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full text-lg backdrop-blur-md border border-white/20 transition-all duration-300"
              >
                Khám phá kho game
              </Link>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}
