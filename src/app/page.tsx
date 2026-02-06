import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ActionButton } from "@/components/common/ActionButton";
import TextTitle from "@/components/common/TextTitle";
import Header from "@/components/layout/Header";

// Assets
import BgImage from "@/assets/bg.jpg";
import NumberLogo from "@/assets/games/learn-numbers/number-logo.png";
import Game3Logo from "@/assets/games/game-3-logo.png";
import GameColorLogo from "@/assets/games/learn-color-color.webp";
import ShapeLogo from "@/assets/games/learn-shape/learn-shape-logo.webp";

interface Game {
  id: string;
  title: string;
  href?: string;
  color: "green" | "orange" | "purple" | "blue";
  icon: StaticImageData;
}

const GAMES: Game[] = [
  {
    id: "learn-numbers",
    title: "Học số",
    href: "/games/learn-numbers",
    color: "green",
    icon: NumberLogo,
  },
  {
    id: "compare",
    title: "So sánh",
    href: "/games/compare-quantity",
    color: "purple",
    icon: Game3Logo,
  },
  {
    id: "learn-color",
    title: "Học màu",
    href: "/games/learn-color",
    color: "orange",
    icon: GameColorLogo,
  },
  {
    id: "learn-shape",
    title: "Học hình",
    href: "/games/learn-shape",
    color: "blue",
    icon: ShapeLogo,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col items-center py-6 px-4 isolate overflow-hidden">
      {/* Background Image */}
      <Image src={BgImage} alt="Background" fill className="object-cover -z-10" priority sizes="100vw" />

      {/* Header */}
      <Header />

      {/* Title */}
      <TextTitle>Hôm nay học gì?</TextTitle>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-4xl px-4 md:px-0">
        {GAMES.map((game) => {
          const content = (
            <ActionButton
              variant="glossy"
              color={game.color}
              size="auto"
              className="w-full flex flex-col items-center justify-center p-4 min-h-[160px]"
            >
              <Image
                src={game.icon}
                alt={game.title}
                className="w-48 h-48 md:w-40 md:h-40 object-contain transition-transform group-hover:scale-110"
              />
              <span className="text-3xl md:text-4xl text-white drop-shadow-md">{game.title}</span>
            </ActionButton>
          );

          if (game.href) {
            return (
              <Link key={game.id} href={game.href} className="w-full">
                {content}
              </Link>
            );
          }

          return (
            <div key={game.id} className="w-full cursor-not-allowed opacity-80">
              {content}
            </div>
          );
        })}
      </div>
    </main>
  );
}
