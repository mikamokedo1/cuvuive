import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ActionButton } from "@/components/common/ActionButton";
import TextTitle from "@/components/common/TextTitle";
import Header from "@/components/layout/Header";
import { WelcomeBackModal } from "@/components/common/WelcomeBackModal";

// Assets
import BgImage from "@/assets/bg-games-home.webp";
import NumberLogo from "@/assets/games/learn-numbers/number-logo.webp";
import Game3Logo from "@/assets/games/game-3-logo.webp";
import GameColorLogo from "@/assets/games/learn-color-color.webp";
import ShapeLogo from "@/assets/games/learn-shape/learn-shape-logo.webp";
import GameAnimalLogo from "@/assets/games/learn-animal/logo.webp";
import GameVehicleLogo from "@/assets/games/learn-vehicle/logo.webp";
import GameFruitLogo from "@/assets/games/learn-fruit/logo.webp";
import GameInstrumentLogo from "@/assets/games/learn-instrument/logo.webp";
import GameOccupationLogo from "@/assets/games/learn-occupation/logo.webp";
import GameDinosaurLogo from "@/assets/games/learn-dinosaur/logo.webp";
import GameFoodLogo from "@/assets/games/learn-food/logo.webp";
import GameFlowerLogo from "@/assets/games/learn-flower/logo.webp";
import GameMathLogo from "@/assets/games/learn-math/logo.png";
import GameWeatherLogo from "@/assets/games/learn-weather/logo.png";
import GameFlagLogo from "@/assets/games/learn-flag/logo.webp";

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
  {
    id: "learn-animal",
    title: "Học động vật",
    href: "/games/learn-animal",
    color: "blue",
    icon: GameAnimalLogo,
  },
  {
    id: "learn-vehicle",
    title: "Học phương tiện",
    href: "/games/learn-vehicle",
    color: "blue",
    icon: GameVehicleLogo,
  },
  {
    id: "learn-fruit",
    title: "Học trái cây",
    href: "/games/learn-fruit",
    color: "green",
    icon: GameFruitLogo,
  },
  {
    id: "learn-instrument",
    title: "Học nhạc cụ",
    href: "/games/learn-instrument",
    color: "purple",
    icon: GameInstrumentLogo,
  },
  {
    id: "learn-occupation",
    title: "Học nghề nghiệp",
    href: "/games/learn-occupation",
    color: "orange",
    icon: GameOccupationLogo,
  },
  {
    id: "learn-dinosaur",
    title: "Học khủng long",
    href: "/games/learn-dinosaur",
    color: "green",
    icon: GameDinosaurLogo,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col items-center py-6 px-4 isolate overflow-hidden">
      {/* <Image src={BgImage} alt="Background" className="object-cover -z-10" priority sizes="100vw" /> */}

      {/* Header */}
      <Header />

      {/* Welcome Modal */}
      <WelcomeBackModal />

      {/* Title */}
      <TextTitle>Hôm nay học gì?</TextTitle>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-4xl px-4 md:px-0">
        {GAMES.concat([
          {
            id: "learn-math",
            title: "Học toán",
            href: "/games/learn-math",
            color: "purple",
            icon: GameMathLogo,
          },
          {
            id: "learn-food",
            title: "Học món ăn",
            href: "/games/learn-food",
            color: "orange",
            icon: GameFoodLogo,
          },
          {
            id: "learn-flower",
            title: "Học hoa & cây",
            href: "/games/learn-flower",
            color: "green",
            icon: GameFlowerLogo,
          },
          {
            id: "learn-weather",
            title: "Học thời tiết",
            href: "/games/learn-weather",
            color: "blue",
            icon: GameWeatherLogo,
          },
          {
            id: "learn-flag",
            title: "Học quốc kỳ",
            href: "/games/learn-flag",
            color: "purple",
            icon: GameFlagLogo,
          },
        ]).map((game) => {
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
                width={192}
                height={192}
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
