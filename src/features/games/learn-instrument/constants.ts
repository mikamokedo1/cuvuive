import { StaticImageData } from "next/image";

// Import group logos
import LogoGroup1 from "@/assets/games/learn-instrument/group1.webp";
import LogoGroup2 from "@/assets/games/learn-instrument/group2.webp";
import LogoGroup3 from "@/assets/games/learn-instrument/group3.webp";

// Import String Instruments (Group 1)
import Guitar from "@/assets/games/learn-instrument/guitar.webp";
import Piano from "@/assets/games/learn-instrument/piano.webp";
import Violin from "@/assets/games/learn-instrument/violin.webp";
import DanTranh from "@/assets/games/learn-instrument/dan_tranh.webp";
import Ukulele from "@/assets/games/learn-instrument/ukulele.webp";
import Harp from "@/assets/games/learn-instrument/harp.webp";
import Bau from "@/assets/games/learn-instrument/bau.webp";

// Import Percussion Instruments (Group 2)
import Drum from "@/assets/games/learn-instrument/drum.webp";
import Xylophone from "@/assets/games/learn-instrument/xylophone.webp";
import Tambourine from "@/assets/games/learn-instrument/tambourine.webp";
import Maracas from "@/assets/games/learn-instrument/maracas.webp";
import Gong from "@/assets/games/learn-instrument/gong.webp";
import Torung from "@/assets/games/learn-instrument/torung.webp";

// Import Wind Instruments (Group 3)
import Flute from "@/assets/games/learn-instrument/flute.webp";
import Trumpet from "@/assets/games/learn-instrument/trumpet.webp";
import Saxophone from "@/assets/games/learn-instrument/saxophone.webp";
import Clarinet from "@/assets/games/learn-instrument/clarinet.webp";
import Harmonica from "@/assets/games/learn-instrument/harmonica.webp";
import { EntityData } from "@/types/game";

export const INSTRUMENTS: EntityData[] = [
  // String Instruments (Group 1)
  { id: "guitar", name: "Đàn Ghi ta", image: Guitar, category: "string" },
  { id: "piano", name: "Đàn Piano", image: Piano, category: "string" },
  { id: "violin", name: "Đàn vĩ cầm", image: Violin, category: "string" },
  { id: "dan_tranh", name: "Đàn Tranh", image: DanTranh, category: "string" },
  { id: "ukulele", name: "Đàn u ke le le", image: Ukulele, category: "string" },
  { id: "harp", name: "Đàn Hạc", image: Harp, category: "string" },
  { id: "bau", name: "Đàn bầu", image: Bau, category: "string" },

  // Percussion Instruments (Group 2)
  { id: "drum", name: "Trống", image: Drum, category: "percussion" },
  { id: "xylophone", name: "Đàn Phím Gỗ", image: Xylophone, category: "percussion" },
  { id: "tambourine", name: "Trống Lắc", image: Tambourine, category: "percussion" },
  { id: "maracas", name: "Lục lạc cầm tay", image: Maracas, category: "percussion" },
  { id: "gong", name: "Cồng Chiêng", image: Gong, category: "percussion" },
  { id: "torung", name: "Đàn Tơ rưng", image: Torung, category: "percussion" },

  // Wind Instruments (Group 3)
  { id: "flute", name: "Sáo", image: Flute, category: "wind" },
  { id: "trumpet", name: "Kèn Trumpet", image: Trumpet, category: "wind" },
  { id: "saxophone", name: "Kèn sat sô phôn", image: Saxophone, category: "wind" },
  { id: "clarinet", name: "Kèn Cla ri net", image: Clarinet, category: "wind" },
  { id: "harmonica", name: "Kèn Harmonica", image: Harmonica, category: "wind" },
];

export const GROUPS = [
  {
    id: "group1",
    title: "Nhạc cụ dây",
    description: "Học các loại nhạc cụ dây",
    instruments: ["guitar", "piano", "violin", "dan_tranh", "ukulele", "harp", "bau"],
    logo: LogoGroup1,
    variant: "green" as const,
    lessonCount: 3,
  },
  {
    id: "group2",
    title: "Nhạc cụ gõ",
    description: "Học các loại nhạc cụ gõ",
    instruments: ["drum", "xylophone", "tambourine", "maracas", "gong", "torung"],
    logo: LogoGroup2,
    variant: "orange" as const,
    lessonCount: 3,
  },
  {
    id: "group3",
    title: "Nhạc cụ hơi",
    description: "Học các loại nhạc cụ hơi",
    instruments: ["flute", "trumpet", "saxophone", "clarinet", "harmonica"],
    logo: LogoGroup3,
    variant: "purple" as const,
    lessonCount: 3,
  },
];

export function getInstrumentsForGroup(groupId: string): EntityData[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return group.instruments.map((instId) => INSTRUMENTS.find((i) => i.id === instId)).filter(Boolean) as EntityData[];
}

export function getAllInstruments(): EntityData[] {
  return INSTRUMENTS;
}
