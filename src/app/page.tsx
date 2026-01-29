import Image from "next/image";
import Link from "next/link";
import { ActionButton } from "@/components/common/ActionButton";

// Assets
import BgImage from "@/assets/bg.jpg";
import NumberLogo from "@/assets/games/learn-numbers/number-logo.png";
import Game2Logo from "@/assets/games/game-2-logo.png";
import Game3Logo from "@/assets/games/game-3-logo.png";
import Game4Logo from "@/assets/games/game-4-logo.png";
import TextTitle from "@/components/common/TextTitlte";
import Header from "@/components/layout/Header";

export default function Home() {
  return (
    <div className="min-h-screen relative flex flex-col items-center py-6 px-4 isolate overflow-hidden">
      {/* Background Image */}
      <Image src={BgImage} alt="Background" fill className="object-cover -z-10" priority />

      {/* Header */}
      <Header />
      {/* Title */}
      <TextTitle>Hôm nay học gì?</TextTitle>
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl px-4">
        <Link href="/games/learn-numbers" className="w-full">
          <ActionButton
            variant="glossy"
            color="green"
            size="auto"
            className="w-full flex flex-col items-center justify-center gap-4 p-4"
          >
            <Image src={NumberLogo} alt="123" className="w-40 h-40 object-contain" />
            <span className="text-4xl text-white drop-shadow-md">Học số</span>
          </ActionButton>
        </Link>

        {/* Placeholder links for other games */}
        <ActionButton
          variant="glossy"
          color="orange"
          size="auto"
          className="w-full flex flex-col items-center justify-center gap-4 p-4"
        >
          <Image src={Game2Logo} alt="Apple" className="w-40 h-40 object-contain" />
          <span className="text-4xl text-white drop-shadow-md">Đếm hình</span>
        </ActionButton>

        <Link href="/games/compare-quantity" className="w-full">
          <ActionButton
            variant="glossy"
            color="purple"
            size="auto"
            className="w-full flex flex-col items-center justify-center gap-4 p-4"
          >
            <Image src={Game3Logo} alt="Scale" className="w-40 h-40 object-contain" />
            <span className="text-4xl text-white drop-shadow-md">So sánh</span>
          </ActionButton>
        </Link>

        <ActionButton
          variant="glossy"
          color="blue"
          size="auto"
          className="w-full flex flex-col items-center justify-center gap-4 p-4"
        >
          <Image src={Game4Logo} alt="Game" className="w-40 h-40 object-contain" />
          <span className="text-4xl text-white drop-shadow-md">Mini game</span>
        </ActionButton>
      </div>
    </div>
  );
}
