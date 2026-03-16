import { StaticImageData } from "next/image";

// Import group logos
const LogoGroup1 = "https://assets.cuthongminh.com/games/learn-instrument/group1.webp";
const LogoGroup2 = "https://assets.cuthongminh.com/games/learn-instrument/group2.webp";
const LogoGroup3 = "https://assets.cuthongminh.com/games/learn-instrument/group3.webp";

// Import String Instruments (Group 1)
const Guitar = "https://assets.cuthongminh.com/games/learn-instrument/guitar.webp";
const Piano = "https://assets.cuthongminh.com/games/learn-instrument/piano.webp";
const Violin = "https://assets.cuthongminh.com/games/learn-instrument/violin.webp";
const DanTranh = "https://assets.cuthongminh.com/games/learn-instrument/dan_tranh.webp";
const Ukulele = "https://assets.cuthongminh.com/games/learn-instrument/ukulele.webp";
const Harp = "https://assets.cuthongminh.com/games/learn-instrument/harp.webp";
const Bau = "https://assets.cuthongminh.com/games/learn-instrument/bau.webp";

// Import Percussion Instruments (Group 2)
const Drum = "https://assets.cuthongminh.com/games/learn-instrument/drum.webp";
const Xylophone = "https://assets.cuthongminh.com/games/learn-instrument/xylophone.webp";
const Tambourine = "https://assets.cuthongminh.com/games/learn-instrument/tambourine.webp";
const Maracas = "https://assets.cuthongminh.com/games/learn-instrument/maracas.webp";
const Gong = "https://assets.cuthongminh.com/games/learn-instrument/gong.webp";
const Torung = "https://assets.cuthongminh.com/games/learn-instrument/torung.webp";

// Import Wind Instruments (Group 3)
const Flute = "https://assets.cuthongminh.com/games/learn-instrument/flute.webp";
const Trumpet = "https://assets.cuthongminh.com/games/learn-instrument/trumpet.webp";
const Saxophone = "https://assets.cuthongminh.com/games/learn-instrument/saxophone.webp";
const Clarinet = "https://assets.cuthongminh.com/games/learn-instrument/clarinet.webp";
const Harmonica = "https://assets.cuthongminh.com/games/learn-instrument/harmonica.webp";
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

// ──── Instrument Descriptions (for explore lesson) ────
export const INSTRUMENT_DESCRIPTIONS: Record<string, string> = {
  // String
  guitar: "Đàn ghi ta có sáu dây, chơi bằng cách gảy hoặc búng. Ghi ta là nhạc cụ rất phổ biến!",
  piano: "Đàn piano có nhiều phím đen trắng. Piano tạo ra âm thanh tuyệt vời khi nhấn phím!",
  violin: "Đàn vĩ cầm chơi bằng cung kéo qua dây. Tiếng vĩ cầm rất du dương và lãng mạn!",
  dan_tranh: "Đàn tranh là nhạc cụ cổ truyền Việt Nam có 16 dây. Tiếng đàn tranh rất thanh tao!",
  ukulele: "Đàn u ke le le nhỏ xinh, có bốn dây. U ke le le đến từ quần đảo Hawaii!",
  harp: "Đàn hạc rất to và đẹp, có nhiều dây kéo dài. Tiếng đàn hạc nhẹ nhàng như tiếng thiên thần!",
  bau: "Đàn bầu là nhạc cụ độc đáo của Việt Nam, chỉ có một dây. Tiếng đàn bầu rất da diết!",
  // Percussion
  drum: "Trống đánh bằng dùi, tạo ra nhịp điệu sôi động. Trống là nhạc cụ cổ xưa nhất thế giới!",
  xylophone: "Đàn phím gỗ có nhiều thanh gỗ xếp theo bậc. Gõ vào mỗi thanh phát ra nốt nhạc khác nhau!",
  tambourine: "Trống lắc có những miếng kim loại nhỏ phát ra tiếng xúc xắc khi lắc!",
  maracas: "Lục lạc cầm tay có hạt bên trong, lắc phát ra tiếng rất vui nhộn!",
  gong: "Cồng chiêng là nhạc cụ của các dân tộc Tây Nguyên. Tiếng cồng chiêng vang xa!",
  torung: "Đàn tơ rưng làm từ ống tre, gõ phát ra tiếng trong trẻo. Là nhạc cụ của người Tây Nguyên!",
  // Wind
  flute: "Sáo thổi bằng hơi, có nhiều lỗ để bấm nốt. Tiếng sáo réo rắt rất hay!",
  trumpet: "Kèn trumpet có âm thanh rực rỡ và mạnh mẽ. Trumpet thường chơi trong ban nhạc!",
  saxophone: "Kèn sắc sô phôn có âm thanh ấm áp và quyến rũ. Sắc sô phôn rất phổ biến trong nhạc jazz!",
  clarinet: "Kèn cla ri net có âm thanh trong trẻo. Cla ri net dùng trong dàn nhạc giao hưởng!",
  harmonica: "Kèn hác mô ni ca nhỏ gọn, thổi bằng miệng. Hác mô ni ca bỏ túi mang đi mọi nơi!",
};
