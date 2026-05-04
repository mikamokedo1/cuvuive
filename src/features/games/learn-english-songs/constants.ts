export interface Song {
  id: string;
  title: string;
  audioUrl: string;
  imageUrl: string;
  lyrics: { time: number; text: string }[];
}

export const SONGS: Song[] = [
  {
    id: "abc-song",
    title: "ABC Song",
    audioUrl: "https://assets.cuthongminh.com/audio/songs/abc-song.mp3",
    imageUrl: "https://assets.cuthongminh.com/games/learn-english-songs/abc-song.webp",
    lyrics: [
      { time: 0, text: "A B C D E F G" },
      { time: 4, text: "H I J K L M N O P" },
      { time: 8, text: "Q R S, T U V" },
      { time: 12, text: "W X, Y and Z" },
      { time: 16, text: "Now I know my ABC's" },
      { time: 20, text: "Next time won't you sing with me" },
    ],
  },
  {
    id: "twinkle-twinkle",
    title: "Twinkle Twinkle Little Star",
    audioUrl: "https://assets.cuthongminh.com/audio/songs/twinkle.mp3",
    imageUrl: "https://assets.cuthongminh.com/games/learn-english-songs/twinkle.webp",
    lyrics: [
      { time: 0, text: "Twinkle, twinkle, little star" },
      { time: 4, text: "How I wonder what you are" },
      { time: 8, text: "Up above the world so high" },
      { time: 12, text: "Like a diamond in the sky" },
      { time: 16, text: "Twinkle, twinkle, little star" },
      { time: 20, text: "How I wonder what you are" },
    ],
  },
  {
    id: "wheels-on-the-bus",
    title: "The Wheels on the Bus",
    audioUrl: "https://assets.cuthongminh.com/audio/songs/wheels-on-the-bus.mp3",
    imageUrl: "https://assets.cuthongminh.com/games/learn-english-songs/wheels-on-the-bus.webp",
    lyrics: [
      { time: 0, text: "The wheels on the bus go round and round" },
      { time: 4, text: "Round and round, round and round" },
      { time: 8, text: "The wheels on the bus go round and round" },
      { time: 12, text: "All through the town" },
    ],
  },
];

export const GROUPS = [
  {
    id: "group1",
    title: "Bài Hát Vui Nhộn",
    description: "Những bài hát tiếng Anh quen thuộc nhất cho bé",
    songs: ["abc-song", "twinkle-twinkle", "wheels-on-the-bus"],
    logo: "https://assets.cuthongminh.com/games/learn-english-songs/logo-group1.webp",
    variant: "orange" as const,
  },
];

export function getSongsForGroup(groupId: string): Song[] {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];
  return SONGS.filter((song) => group.songs.includes(song.id));
}
