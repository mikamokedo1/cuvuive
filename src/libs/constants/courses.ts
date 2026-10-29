const NumberLogo = "https://assets.cuthongminh.com/games/learn-numbers/number-logo.webp";
const GameMultiplyLogo = "https://assets.cuthongminh.com/games/learn-multiply/logo.webp";
const GameDivideLogo = "https://assets.cuthongminh.com/games/learn-divide/logo.webp";
const Game3Logo = "https://assets.cuthongminh.com/games/game-3-logo.webp";
const GameColorLogo = "https://assets.cuthongminh.com/games/learn-color-color.webp";
const ShapeLogo = "https://assets.cuthongminh.com/games/learn-shape/learn-shape-logo.webp";
const GameAnimalLogo = "https://assets.cuthongminh.com/games/learn-animal/logo.webp";
const GameVehicleLogo = "https://assets.cuthongminh.com/games/learn-vehicle/logo.webp";
const GameFruitLogo = "https://assets.cuthongminh.com/games/learn-fruit/logo.webp";
const GameInstrumentLogo = "https://assets.cuthongminh.com/games/learn-instrument/logo.webp";
const GameOccupationLogo = "https://assets.cuthongminh.com/games/learn-occupation/logo.webp";
const GameDinosaurLogo = "https://assets.cuthongminh.com/games/learn-dinosaur/logo.webp";
const GameFoodLogo = "https://assets.cuthongminh.com/games/learn-food/logo.webp";
const GameFlowerLogo = "https://assets.cuthongminh.com/games/learn-flower/logo.webp";
const GameMathLogo = "https://assets.cuthongminh.com/games/learn-math/logo.webp";
const GameWeatherLogo = "https://assets.cuthongminh.com/games/learn-weather/logo.webp";
const GameFlagLogo = "https://assets.cuthongminh.com/games/learn-flag/logo.webp";
const GameLandmarkLogo = "https://assets.cuthongminh.com/games/learn-landmark/logo.webp";
const GameHygieneLogo = "https://assets.cuthongminh.com/games/learn-hygiene/logo.webp";
const GamePatternLogo = "https://assets.cuthongminh.com/games/find-pattern/logo.webp";
const GameAlphabetLogo = "https://assets.cuthongminh.com/games/learn-alphabet/logo.webp";
const GameFindDifferencesLogo = "https://assets.cuthongminh.com/games/game-4-logo.webp";
const GameOddOneOutLogo = "https://assets.cuthongminh.com/games/odd-one-out/logo.webp";
const GameMazeRunnerLogo = "https://assets.cuthongminh.com/games/maze-runner/logo.webp";
const PaintPictureLogo = "https://assets.cuthongminh.com/games/paint-picture/logo.webp";
const GameEmotionLogo = "https://assets.cuthongminh.com/games/learn-emotion/logo.webp";
const GameLearnTonesLogo = "https://assets.cuthongminh.com/games/learn-tones/logo.webp";
const MixColorLogo = "https://assets.cuthongminh.com/games/learn-color-color.webp"; // Using placeholder
const GameCostumeLogo = "https://assets.cuthongminh.com/games/learn-costume/logo.webp";
const GameClockLogo = "https://assets.cuthongminh.com/games/learn-clock/logo-main.webp";
const MiniPianoLogo = "https://assets.cuthongminh.com/games/mini-piano/logo.webp";
const CreativeGroupLogo = "https://assets.cuthongminh.com/games/mini-piano/group1.webp";
const MusicianGroupLogo = "https://assets.cuthongminh.com/games/mini-piano/group2.webp";
const EarGroupLogo = "https://assets.cuthongminh.com/games/mini-piano/group3.webp";
const GameSyllableLogo = "https://assets.cuthongminh.com/games/learn-syllable/logo.webp";
const GameTerrainLogo = "https://assets.cuthongminh.com/games/learn-terrain/logo.webp";
const GameBodyLogo = "https://assets.cuthongminh.com/games/learn-body/logo.webp";
const GameLineConnectLogo = "https://assets.cuthongminh.com/games/line-connect/logo.webp";
const LineConnectGroup1Logo = "https://assets.cuthongminh.com/games/line-connect/group1.webp";
const LineConnectGroup2Logo = "https://assets.cuthongminh.com/games/line-connect/group2.webp";
const LineConnectGroup3Logo = "https://assets.cuthongminh.com/games/line-connect/group3.webp";
const GameCleaningLogo = "https://assets.cuthongminh.com/games/learn-cleaning/logo.webp";
const GameTrafficLogo = "https://assets.cuthongminh.com/games/learn-traffic/logo.webp";
const LearnNotesLogo = "https://assets.cuthongminh.com/games/learn-notes/logo.webp";
const LearnNotesGroup1Logo = "https://assets.cuthongminh.com/games/learn-notes/group1.webp";
const LearnNotesGroup2Logo = "https://assets.cuthongminh.com/games/learn-notes/group2.webp";
const LearnNotesGroup3Logo = "https://assets.cuthongminh.com/games/learn-notes/group3.webp";
const GameDangerLogo = "https://assets.cuthongminh.com/games/learn-danger/logo.webp";
const GameMoneyLogo = "https://assets.cuthongminh.com/games/learn-money/logo.webp";
import { StaticImageData } from "next/image";
import { GameGroupType } from "@/libs/constants/groups";

export interface LessonDef {
  id: string;
  title: string;
  isFree?: boolean;
}

export interface GroupDef {
  id: string;
  title: string;
  lessons: LessonDef[];
  description?: string;
  logo?: string | StaticImageData;
  variant?: "green" | "orange" | "purple" | "blue";
}

export interface CourseDef {
  id: string;
  title: string;
  description: string;
  groups: GroupDef[];
  icon: string | StaticImageData;
  type: GameGroupType;
}

export const COURSES: CourseDef[] = [
  {
    id: "learn-word",
    title: "Học Từ Vựng",
    description: "Bé học từ vựng tiếng Việt qua các chủ đề quen thuộc hàng ngày.",
    icon: "https://assets.cuthongminh.com/games/learn-word/logo.webp",
    type: "language",
    groups: [
      {
        id: "group1",
        title: "Gia Đình",
        lessons: [
          { id: "lesson1", title: "Học từ vựng", isFree: true },
          { id: "lesson2", title: "Tập nói", isFree: true },
          { id: "lesson3", title: "Ghép từ", isFree: true },
          { id: "lesson4", title: "Nghe hiểu", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Trường Học",
        lessons: [
          { id: "lesson1", title: "Học từ vựng"},
          { id: "lesson2", title: "Tập nói" },
          { id: "lesson3", title: "Ghép từ" },
          { id: "lesson4", title: "Nghe hiểu" },
        ],
      },
      {
        id: "group3",
        title: "Thiên Nhiên",
        lessons: [
          { id: "lesson1", title: "Học từ vựng"},
          { id: "lesson2", title: "Tập nói" },
          { id: "lesson3", title: "Ghép từ" },
          { id: "lesson4", title: "Nghe hiểu" },
        ],
      },
      {
        id: "group4",
        title: "Đồ Dùng",
        lessons: [
          { id: "lesson1", title: "Học từ vựng"},
          { id: "lesson2", title: "Tập nói" },
          { id: "lesson3", title: "Ghép từ" },
          { id: "lesson4", title: "Nghe hiểu" },
        ],
      },
      {
        id: "group5",
        title: "Quần Áo",
        lessons: [
          { id: "lesson1", title: "Học từ vựng"},
          { id: "lesson2", title: "Tập nói" },
          { id: "lesson3", title: "Ghép từ" },
          { id: "lesson4", title: "Nghe hiểu" },
        ],
      },
    ],
  },
  {
    id: "learn-tones",
    title: "Học Dấu Tiếng Việt",
    description: "Bé học nhận biết và phát âm các dấu thanh trong tiếng Việt.",
    icon: GameLearnTonesLogo,
    type: "language",
    groups: [
      {
        id: "group_sac",
        title: "Thanh Sắc",
        lessons: [
          { id: "lesson1", title: "Học dấu", isFree: true },
          { id: "lesson2", title: "Tập nói", isFree: true },
          { id: "lesson3", title: "Tập viết", isFree: true },
          { id: "lesson4", title: "Chữ nào đúng", isFree: true },
        ],
      },
      {
        id: "group_huyen",
        title: "Thanh Huyền",
        lessons: [
          { id: "lesson1", title: "Học dấu"},
          { id: "lesson2", title: "Tập nói" },
          { id: "lesson3", title: "Tập viết" },
          { id: "lesson4", title: "Chữ nào đúng" },
        ],
      },
      {
        id: "group_hoi",
        title: "Thanh Hỏi",
        lessons: [
          { id: "lesson1", title: "Học dấu"},
          { id: "lesson2", title: "Tập nói" },
          { id: "lesson3", title: "Tập viết" },
          { id: "lesson4", title: "Chữ nào đúng" },
        ],
      },
      {
        id: "group_nga",
        title: "Thanh Ngã",
        lessons: [
          { id: "lesson1", title: "Học dấu"},
          { id: "lesson2", title: "Tập nói" },
          { id: "lesson3", title: "Tập viết" },
          { id: "lesson4", title: "Chữ nào đúng" },
        ],
      },
      {
        id: "group_nang",
        title: "Thanh Nặng",
        lessons: [
          { id: "lesson1", title: "Học dấu"},
          { id: "lesson2", title: "Tập nói" },
          { id: "lesson3", title: "Tập viết" },
          { id: "lesson4", title: "Chữ nào đúng" },
        ],
      },
    ],
  },
  {
    id: "learn-numbers",
    title: "Đếm số",
    description: "Bé học đếm từ 1-9 qua hình ảnh và trò chơi.",
    icon: NumberLogo,
    type: "math",
    groups: [
      {
        id: "group1",
        title: "Làm quen 1-3",
        lessons: [
          { id: "lesson1", title: "Học số 1-3", isFree: true },
          { id: "lesson2", title: "Số nào đúng?", isFree: true },
          { id: "lesson3", title: "Đếm đồ vật", isFree: true },
          { id: "lesson4", title: "Tập viết", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Làm quen 4-6",
        lessons: [
          { id: "lesson1", title: "Học số 4-6"},
          { id: "lesson2", title: "Số nào đúng?" },
          { id: "lesson3", title: "Đếm đồ vật" },
          { id: "lesson4", title: "Tập viết" },
        ],
      },
      {
        id: "group3",
        title: "Làm quen 7-9",
        lessons: [
          { id: "lesson1", title: "Học số 7-9"},
          { id: "lesson2", title: "Số nào đúng?" },
          { id: "lesson3", title: "Đếm đồ vật" },
          { id: "lesson4", title: "Tập viết" },
        ],
      },
      {
        id: "group4",
        title: "Làm quen 10-20",
        lessons: [
          { id: "lesson1", title: "Học số 10-20"},
          { id: "lesson2", title: "Số nào đúng?" },
          { id: "lesson3", title: "Đếm đồ vật" },
          { id: "lesson4", title: "Tập viết" },
        ],
      },
      {
        id: "group5",
        title: "Luyện tập",
        lessons: [
          { id: "lesson1", title: "Số nào đúng?"},
          { id: "lesson2", title: "Đếm đồ vật" },
        ],
      },
    ],
  },
  {
    id: "compare-quantity",
    title: "So sánh",
    description: "Bé học so sánh nhiều hơn, ít hơn, bằng nhau.",
    icon: Game3Logo,
    type: "math",
    groups: [
      {
        id: "group1",
        title: "Lớn hơn",
        lessons: [
          { id: "lesson1", title: "Học lớn hơn", isFree: true },
          { id: "lesson2", title: "Luyện tập", isFree: true },
          { id: "lesson3", title: "Thử thách", isFree: true },
          { id: "lesson4", title: "Trò chơi", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Nhỏ hơn",
        lessons: [
          { id: "lesson1", title: "Học nhỏ hơn"},
          { id: "lesson2", title: "Luyện tập" },
          { id: "lesson3", title: "Thử thách" },
          { id: "lesson4", title: "Trò chơi" },
        ],
      },
      {
        id: "group3",
        title: "Bằng nhau",
        lessons: [
          { id: "lesson1", title: "Học bằng nhau"},
          { id: "lesson2", title: "Luyện tập" },
          { id: "lesson3", title: "Thử thách" },
          { id: "lesson4", title: "Trò chơi" },
        ],
      },
      {
        id: "group4",
        title: "Luyện tập",
        lessons: [
          { id: "lesson1", title: "Luyện tập tổng hợp"},
          { id: "lesson2", title: "Thử thách cuối" },
        ],
      },
    ],
  },
  {
    id: "learn-color",
    title: "Học Màu Sắc",
    description: "Bé làm quen với các màu sắc cơ bản.",
    icon: GameColorLogo,
    type: "art",
    groups: [
      {
        id: "group1",
        title: "Màu cơ bản",
        lessons: [
          { id: "lesson1", title: "Học màu sắc", isFree: true },
          { id: "lesson2", title: "Tìm màu giống", isFree: true },
          { id: "lesson3", title: "Trò chơi màu", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Màu nâng cao",
        lessons: [
          { id: "lesson1", title: "Học màu sắc"},
          { id: "lesson2", title: "Tìm màu giống" },
          { id: "lesson3", title: "Trò chơi màu" },
        ],
      },
      {
        id: "group3",
        title: "Luyện tập",
        lessons: [
          { id: "lesson1", title: "Học màu sắc"},
          { id: "lesson2", title: "Tìm màu giống" },
          { id: "lesson3", title: "Trò chơi màu" },
        ],
      },
    ],
  },
  {
    id: "learn-shape",
    title: "Hình dạng",
    description: "Bé nhận biết các hình dạng qua đồ vật.",
    icon: ShapeLogo,
    type: "math",
    groups: [
      {
        id: "group1",
        title: "Hình cơ bản",
        lessons: [
          { id: "lesson1", title: "Học hình dạng", isFree: true },
          { id: "lesson2", title: "Tìm hình giống", isFree: true },
          { id: "lesson3", title: "Tìm đồ vật", isFree: true },
          { id: "lesson4", title: "Trò chơi hình", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Hình nâng cao",
        lessons: [
          { id: "lesson1", title: "Học hình dạng"},
          { id: "lesson2", title: "Tìm hình giống" },
          { id: "lesson3", title: "Tìm đồ vật" },
          { id: "lesson4", title: "Trò chơi hình" },
        ],
      },
      {
        id: "group3",
        title: "Luyện tập",
        lessons: [
          { id: "lesson1", title: "Luyện tập hình"},
          { id: "lesson2", title: "Thử thách hình" },
        ],
      },
    ],
  },
  {
    id: "learn-animal",
    title: "Động vật",
    description: "Bé làm quen với các loài động vật qua hình ảnh và âm thanh.",
    icon: GameAnimalLogo,
    type: "science",
    groups: [
      {
        id: "group1",
        title: "Động vật nuôi",
        lessons: [
          { id: "lesson1", title: "Học tên động vật", isFree: true },
          { id: "lesson2", title: "Tập nói", isFree: true },
          { id: "lesson3", title: "Đây là con gì?", isFree: true },
          { id: "lesson4", title: "Ghép đôi", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Động vật hoang dã",
        lessons: [
          { id: "lesson1", title: "Học tên động vật"},
          { id: "lesson2", title: "Tập nói" },
          { id: "lesson3", title: "Đây là con gì?" },
          { id: "lesson4", title: "Ghép đôi" },
        ],
      },
      {
        id: "group3",
        title: "Động vật biển",
        lessons: [
          { id: "lesson1", title: "Học tên động vật"},
          { id: "lesson2", title: "Tập nói" },
          { id: "lesson3", title: "Đây là con gì?" },
          { id: "lesson4", title: "Ghép đôi" },
        ],
      },
    ],
  },
  {
    id: "learn-vehicle",
    title: "Phương tiện",
    description: "Bé làm quen với các phương tiện giao thông đường bộ, đường thủy và hàng không.",
    icon: GameVehicleLogo,
    type: "life-skill",
    groups: [
      {
        id: "group1",
        title: "Phương tiện đường bộ",
        lessons: [
          { id: "lesson1", title: "Học tên phương tiện", isFree: true },
          { id: "lesson2", title: "Đây là gì?", isFree: true },
          { id: "lesson3", title: "Ghép đôi", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Phương tiện đường thủy",
        lessons: [
          { id: "lesson1", title: "Học tên phương tiện"},
          { id: "lesson2", title: "Đây là gì?" },
          { id: "lesson3", title: "Ghép đôi" },
        ],
      },
      {
        id: "group3",
        title: "Phương tiện hàng không",
        lessons: [
          { id: "lesson1", title: "Học tên phương tiện"},
          { id: "lesson2", title: "Đây là gì?" },
          { id: "lesson3", title: "Ghép đôi" },
        ],
      },
      {
        id: "group4",
        title: "Luyện tập",
        lessons: [
          { id: "lesson1", title: "Đây là gì?"},
          { id: "lesson2", title: "Ghép đôi" },
          { id: "lesson3", title: "Xe đi đâu?" },
        ],
      },
    ],
  },
  {
    id: "learn-fruit",
    title: "Trái cây",
    description: "Bé nhận biết tên và hình dạng của các loại trái cây quen thuộc.",
    icon: GameFruitLogo,
    type: "science",
    groups: [
      {
        id: "group1",
        title: "Trái cây phổ biến",
        lessons: [
          { id: "lesson1", title: "Học tên trái cây", isFree: true },
          { id: "lesson2", title: "Đây là gì?", isFree: true },
          { id: "lesson3", title: "Ghép đôi", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Trái cây nhiệt đới",
        lessons: [
          { id: "lesson1", title: "Học tên trái cây"},
          { id: "lesson2", title: "Đây là gì?" },
          { id: "lesson3", title: "Ghép đôi" },
        ],
      },
      {
        id: "group3",
        title: "Trái cây khác",
        lessons: [
          { id: "lesson1", title: "Học tên trái cây"},
          { id: "lesson2", title: "Đây là gì?" },
          { id: "lesson3", title: "Ghép đôi" },
        ],
      },
    ],
  },
  {
    id: "learn-food",
    title: "Món ăn",
    description: "Bé học tên các món ăn sáng, món chính và món tráng miệng.",
    icon: GameFoodLogo,
    type: "science",
    groups: [
      {
        id: "group1",
        title: "Món ăn sáng",
        lessons: [
          { id: "lesson1", title: "Học tên món ăn", isFree: true },
          { id: "lesson2", title: "Đây là gì?", isFree: true },
          { id: "lesson3", title: "Ghép đôi", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Món chính",
        lessons: [
          { id: "lesson1", title: "Học tên món ăn"},
          { id: "lesson2", title: "Đây là gì?" },
          { id: "lesson3", title: "Ghép đôi" },
        ],
      },
      {
        id: "group3",
        title: "Món tráng miệng",
        lessons: [
          { id: "lesson1", title: "Học tên món ăn"},
          { id: "lesson2", title: "Đây là gì?" },
          { id: "lesson3", title: "Ghép đôi" },
        ],
      },
    ],
  },
  {
    id: "learn-dinosaur",
    title: "Khủng long",
    description: "Khám phá thế giới của các loài khủng long.",
    icon: GameDinosaurLogo,
    type: "science",
    groups: [
      {
        id: "group1",
        title: "Khủng long ăn cỏ",
        lessons: [
          { id: "lesson1", title: "Học tên khủng long", isFree: true },
          { id: "lesson2", title: "Đây là gì?", isFree: true },
          { id: "lesson3", title: "Ghép đôi", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Khủng long ăn thịt",
        lessons: [
          { id: "lesson1", title: "Học tên khủng long"},
          { id: "lesson2", title: "Đây là gì?" },
          { id: "lesson3", title: "Ghép đôi" },
        ],
      },
      {
        id: "group3",
        title: "Khủng long bay & biển",
        lessons: [
          { id: "lesson1", title: "Học tên khủng long"},
          { id: "lesson2", title: "Đây là gì?" },
          { id: "lesson3", title: "Ghép đôi" },
        ],
      },
    ],
  },
  {
    id: "learn-instrument",
    title: "Nhạc cụ",
    description: "Bé làm quen với các loại nhạc cụ và âm thanh của chúng.",
    icon: GameInstrumentLogo,
    type: "music",
    groups: [
      {
        id: "group1",
        title: "Nhạc cụ dây",
        lessons: [
          { id: "lesson1", title: "Học nhạc cụ", isFree: true },
          { id: "lesson2", title: "Đây là gì?", isFree: true },
          { id: "lesson3", title: "Ghép đôi", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Nhạc cụ gõ",
        lessons: [
          { id: "lesson1", title: "Học nhạc cụ"},
          { id: "lesson2", title: "Đây là gì?" },
          { id: "lesson3", title: "Ghép đôi" },
        ],
      },
      {
        id: "group3",
        title: "Nhạc cụ hơi",
        lessons: [
          { id: "lesson1", title: "Học nhạc cụ"},
          { id: "lesson2", title: "Đây là gì?" },
          { id: "lesson3", title: "Ghép đôi" },
        ],
      },
    ],
  },
  {
    id: "learn-occupation",
    title: "Nghề nghiệp",
    description: "Tìm hiểu về các nghề nghiệp phổ biến trong xã hội.",
    icon: GameOccupationLogo,
    type: "life-skill",
    groups: [
      {
        id: "group1",
        title: "Nghề cộng đồng",
        lessons: [
          { id: "lesson1", title: "Học tên nghề", isFree: true },
          { id: "lesson2", title: "Đây là gì?", isFree: true },
          { id: "lesson3", title: "Nối dụng cụ", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Nghề y tế & khoa học",
        lessons: [
          { id: "lesson1", title: "Học tên nghề"},
          { id: "lesson2", title: "Đây là gì?" },
          { id: "lesson3", title: "Nối dụng cụ" },
        ],
      },
      {
        id: "group3",
        title: "Nghề nghệ thuật",
        lessons: [
          { id: "lesson1", title: "Học tên nghề"},
          { id: "lesson2", title: "Đây là gì?" },
          { id: "lesson3", title: "Nối dụng cụ" },
        ],
      },
    ],
  },
  {
    id: "learn-flower",
    title: "Hoa & Cây",
    description: "Khám phá các loài hoa và cây quen thuộc ở Việt Nam.",
    icon: GameFlowerLogo,
    type: "science",
    groups: [
      {
        id: "group1",
        title: "Hoa phổ biến",
        lessons: [
          { id: "lesson1", title: "Học tên hoa", isFree: true },
          { id: "lesson2", title: "Đây là gì?", isFree: true },
          { id: "lesson3", title: "Ghép đôi", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Hoa Tết & Trang trí",
        lessons: [
          { id: "lesson1", title: "Học tên hoa"},
          { id: "lesson2", title: "Đây là gì?" },
          { id: "lesson3", title: "Ghép đôi" },
        ],
      },
      {
        id: "group3",
        title: "Cây ăn quả",
        lessons: [
          { id: "lesson1", title: "Học tên cây"},
          { id: "lesson2", title: "Đây là gì?" },
          { id: "lesson3", title: "Ghép đôi" },
        ],
      },
    ],
  },
  {
    id: "learn-weather",
    title: "Thời tiết",
    description: "Bé làm quen với các hiện tượng thời tiết và khí hậu qua hình ảnh vui nhộn.",
    icon: GameWeatherLogo,
    type: "science",
    groups: [
      {
        id: "group1",
        title: "Thời tiết cơ bản",
        lessons: [
          { id: "lesson1", title: "Học tên thời tiết", isFree: true },
          { id: "lesson2", title: "Tập nói", isFree: true },
          { id: "lesson3", title: "Đây là gì?", isFree: true },
          { id: "lesson4", title: "Ghép đôi", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Thời tiết đặc biệt",
        lessons: [
          { id: "lesson1", title: "Học tên thời tiết"},
          { id: "lesson2", title: "Tập nói" },
          { id: "lesson3", title: "Đây là gì?" },
          { id: "lesson4", title: "Ghép đôi" },
        ],
      },
      {
        id: "group3",
        title: "Mùa và khí hậu",
        lessons: [
          { id: "lesson1", title: "Học tên mùa"},
          { id: "lesson2", title: "Tập nói" },
          { id: "lesson3", title: "Đây là gì?" },
          { id: "lesson4", title: "Ghép đôi" },
          { id: "lesson5", title: "Mặc gì cho đúng mùa?" },
        ],
      },
    ],
  },
  {
    id: "learn-hygiene",
    title: "Vệ sinh cá nhân",
    description: "Bé học giữ gìn vệ sinh và thói quen sạch sẽ gọn gàng.",
    icon: GameHygieneLogo,
    type: "life-skill",
    groups: [
      {
        id: "group1",
        title: "Vệ sinh hàng ngày",
        lessons: [
          { id: "lesson1", title: "Học tên", isFree: true },
          { id: "lesson2", title: "Tập nói", isFree: true },
          { id: "lesson3", title: "Đúng hay Sai?", isFree: true },
          { id: "lesson4", title: "Sắp xếp thứ tự", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Giữ gìn sức khoẻ",
        lessons: [
          { id: "lesson1", title: "Học tên"},
          { id: "lesson2", title: "Tập nói" },
          { id: "lesson3", title: "Đúng hay Sai?" },
          { id: "lesson4", title: "Sắp xếp thứ tự" },
        ],
      },
      {
        id: "group3",
        title: "Sạch sẽ gọn gàng",
        lessons: [
          { id: "lesson1", title: "Học tên"},
          { id: "lesson2", title: "Tập nói" },
          { id: "lesson3", title: "Đúng hay Sai?" },
          { id: "lesson4", title: "Sắp xếp thứ tự" },
        ],
      },
    ],
  },
  {
    id: "learn-traffic",
    title: "An Toàn Giao Thông",
    description: "Bé học các quy tắc an toàn giao thông qua trò chơi tương tác, phiêu lưu và lắp ráp.",
    icon: GameTrafficLogo,
    type: "life-skill",
    groups: [
      {
        id: "group1",
        title: "Đèn & Biển Báo",
        lessons: [
          { id: "lesson1", title: "Học biển báo", isFree: true },
          { id: "lesson2", title: "Khám phá phố", isFree: true },
          { id: "lesson3", title: "Tìm biển đúng", isFree: true },
          { id: "lesson4", title: "Chọn hành động", isFree: true },
          { id: "lesson5", title: "Lắp biển báo", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Đi Bộ An Toàn",
        lessons: [
          { id: "lesson1", title: "Học quy tắc đi bộ"},
          { id: "lesson2", title: "Khám phá đường" },
          { id: "lesson3", title: "Tình huống đi bộ" },
          { id: "lesson4", title: "An toàn đi bộ" },
          { id: "lesson5", title: "Lắp biển đi bộ" },
        ],
      },
      {
        id: "group3",
        title: "Đi Xe An Toàn",
        lessons: [
          { id: "lesson1", title: "Học quy tắc đi xe"},
          { id: "lesson2", title: "Khám phá xe cộ" },
          { id: "lesson3", title: "Tình huống trên xe" },
          { id: "lesson4", title: "Hành khách an toàn" },
          { id: "lesson5", title: "Lắp biển xe" },
        ],
      },
    ],
  },
  {
    id: "learn-emotion",
    title: "Cảm Xúc",
    description: "Bé học cách nhận biết và gọi tên cảm xúc qua hình ảnh và tình huống kịch bản.",
    icon: GameEmotionLogo,
    type: "life-skill",
    groups: [
      {
        id: "group1",
        title: "Cảm xúc cơ bản",
        lessons: [
          { id: "lesson1", title: "Học cảm xúc", isFree: true },
          { id: "lesson2", title: "Tập nói", isFree: true },
          { id: "lesson3", title: "Đúng hay Sai?", isFree: true },
          { id: "lesson4", title: "Chọn cảm xúc đúng", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Cảm xúc khác",
        lessons: [
          { id: "lesson1", title: "Học cảm xúc"},
          { id: "lesson2", title: "Tập nói" },
          { id: "lesson3", title: "Đúng hay Sai?" },
          { id: "lesson4", title: "Chọn cảm xúc đúng" },
        ],
      },
    ],
  },
  {
    id: "learn-flag",
    title: "Cờ quốc gia",
    description: "Bé nhận biết quốc kỳ các nước trên thế giới.",
    icon: GameFlagLogo,
    type: "geography",
    groups: [
      {
        id: "group1",
        title: "Châu Á",
        lessons: [
          { id: "lesson1", title: "Học tên quốc kỳ", isFree: true },
          { id: "lesson2", title: "Chọn quốc kỳ đúng", isFree: true },
          { id: "lesson3", title: "Lật hình ghi nhớ", isFree: true },
          { id: "lesson4", title: "Ghép hình", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Châu Âu",
        lessons: [
          { id: "lesson1", title: "Học tên quốc kỳ"},
          { id: "lesson2", title: "Chọn quốc kỳ đúng" },
          { id: "lesson3", title: "Lật hình ghi nhớ" },
          { id: "lesson4", title: "Ghép hình" },
        ],
      },
      {
        id: "group3",
        title: "Châu Mỹ",
        lessons: [
          { id: "lesson1", title: "Học tên quốc kỳ"},
          { id: "lesson2", title: "Chọn quốc kỳ đúng" },
          { id: "lesson3", title: "Lật hình ghi nhớ" },
          { id: "lesson4", title: "Ghép hình" },
        ],
      },
      {
        id: "group4",
        title: "Khác",
        lessons: [
          { id: "lesson1", title: "Học tên quốc kỳ"},
          { id: "lesson2", title: "Chọn quốc kỳ đúng" },
          { id: "lesson3", title: "Lật hình ghi nhớ" },
          { id: "lesson4", title: "Ghép hình" },
        ],
      },
    ],
  },
  {
    id: "learn-landmark",
    title: "Địa Danh Nổi Tiếng",
    description: "Bé nhận biết các địa danh nổi tiếng trên thế giới.",
    icon: GameLandmarkLogo,
    type: "geography",
    groups: [
      {
        id: "group1",
        title: "Châu Á",
        lessons: [
          { id: "lesson1", title: "Học địa danh", isFree: true },
          { id: "lesson2", title: "Đây là đâu?", isFree: true },
          { id: "lesson3", title: "Ghép đôi", isFree: true },
          { id: "lesson4", title: "Xếp hình", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Châu Âu",
        lessons: [
          { id: "lesson1", title: "Học địa danh"},
          { id: "lesson2", title: "Đây là đâu?" },
          { id: "lesson3", title: "Ghép đôi" },
          { id: "lesson4", title: "Xếp hình" },
        ],
      },
      {
        id: "group3",
        title: "Châu Mỹ & Khác",
        lessons: [
          { id: "lesson1", title: "Học địa danh"},
          { id: "lesson2", title: "Đây là đâu?" },
          { id: "lesson3", title: "Ghép đôi" },
          { id: "lesson4", title: "Xếp hình" },
        ],
      },
    ],
  },
  {
    id: "learn-costume",
    title: "Trang Phục Thế Giới",
    description: "Bé tìm hiểu về trang phục truyền thống của các quốc gia trên thế giới.",
    icon: GameCostumeLogo,
    type: "geography",
    groups: [
      {
        id: "group1",
        title: "Châu Á",
        lessons: [
          { id: "lesson1", title: "Học trang phục", isFree: true },
          { id: "lesson2", title: "Trang phục nước nào?", isFree: true },
          { id: "lesson3", title: "Mặc Đúng Cho Bạn", isFree: true },
          { id: "lesson4", title: "Ghép đôi", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Châu Âu",
        lessons: [
          { id: "lesson1", title: "Học trang phục"},
          { id: "lesson2", title: "Trang phục nước nào?" },
          { id: "lesson3", title: "Mặc Đúng Cho Bạn" },
          { id: "lesson4", title: "Ghép đôi" },
        ],
      },
      {
        id: "group3",
        title: "Châu Mỹ & Khác",
        lessons: [
          { id: "lesson1", title: "Học trang phục"},
          { id: "lesson2", title: "Trang phục nước nào?" },
          { id: "lesson3", title: "Mặc Đúng Cho Bạn" },
          { id: "lesson4", title: "Ghép đôi" },
        ],
      },
    ],
  },
  {
    id: "learn-math",
    title: "Toán đơn giản",
    description: "Bé học phép cộng và phép trừ với các con số đến 20.",
    icon: GameMathLogo,
    type: "math",
    groups: [
      {
        id: "group1",
        title: "Phép Cộng",
        lessons: [
          { id: "lesson1", title: "Giải thích phép cộng", isFree: true },
          { id: "lesson2", title: "Cộng bằng hình", isFree: true },
          { id: "lesson3", title: "Cộng bằng số", isFree: true },
          { id: "lesson4", title: "Tập viết dấu", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Phép Trừ",
        lessons: [
          { id: "lesson1", title: "Giải thích phép trừ"},
          { id: "lesson2", title: "Trừ bằng hình" },
          { id: "lesson3", title: "Trừ bằng số" },
          { id: "lesson4", title: "Tập viết dấu" },
        ],
      },
      {
        id: "group3",
        title: "Luyện tập",
        lessons: [
          { id: "lesson1", title: "Cộng trừ bằng hình"},
          { id: "lesson2", title: "Cộng trừ bằng số" },
        ],
      },
    ],
  },
  {
    id: "learn-multiply",
    title: "Phép Nhân",
    description: "Bé học bảng cửu chương & phép nhân 2-9 qua 3 trò chơi vật lý tương tác cực vui.",
    icon: GameMultiplyLogo,
    type: "math",
    groups: [
      {
        id: "group1",
        title: "Bảng nhân 2",
        lessons: [
          { id: "lesson1", title: "Khám phá bảng nhân", isFree: true },
          { id: "lesson2", title: "Cân thăng bằng", isFree: true },
          { id: "lesson3", title: "Đại chiến pháo bóng", isFree: true },
          { id: "lesson4", title: "Thác Plinko hứng quả", isFree: true },
          { id: "lesson5", title: "Tìm số bí ẩn", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Bảng nhân 3",
        lessons: [
          { id: "lesson1", title: "Khám phá bảng nhân" },
          { id: "lesson2", title: "Cân thăng bằng" },
          { id: "lesson3", title: "Đại chiến pháo bóng" },
          { id: "lesson4", title: "Thác Plinko hứng quả" },
          { id: "lesson5", title: "Tìm số bí ẩn" },
        ],
      },
      {
        id: "group3",
        title: "Bảng nhân 4",
        lessons: [
          { id: "lesson1", title: "Khám phá bảng nhân" },
          { id: "lesson2", title: "Cân thăng bằng" },
          { id: "lesson3", title: "Đại chiến pháo bóng" },
          { id: "lesson4", title: "Thác Plinko hứng quả" },
          { id: "lesson5", title: "Tìm số bí ẩn" },
        ],
      },
      {
        id: "group4",
        title: "Bảng nhân 5",
        lessons: [
          { id: "lesson1", title: "Khám phá bảng nhân" },
          { id: "lesson2", title: "Cân thăng bằng" },
          { id: "lesson3", title: "Đại chiến pháo bóng" },
          { id: "lesson4", title: "Thác Plinko hứng quả" },
          { id: "lesson5", title: "Tìm số bí ẩn" },
        ],
      },
      {
        id: "group5",
        title: "Bảng nhân 6",
        lessons: [
          { id: "lesson1", title: "Khám phá bảng nhân" },
          { id: "lesson2", title: "Cân thăng bằng" },
          { id: "lesson3", title: "Đại chiến pháo bóng" },
          { id: "lesson4", title: "Thác Plinko hứng quả" },
          { id: "lesson5", title: "Tìm số bí ẩn" },
        ],
      },
      {
        id: "group6",
        title: "Bảng nhân 7",
        lessons: [
          { id: "lesson1", title: "Khám phá bảng nhân" },
          { id: "lesson2", title: "Cân thăng bằng" },
          { id: "lesson3", title: "Đại chiến pháo bóng" },
          { id: "lesson4", title: "Thác Plinko hứng quả" },
          { id: "lesson5", title: "Tìm số bí ẩn" },
        ],
      },
      {
        id: "group7",
        title: "Bảng nhân 8",
        lessons: [
          { id: "lesson1", title: "Khám phá bảng nhân" },
          { id: "lesson2", title: "Cân thăng bằng" },
          { id: "lesson3", title: "Đại chiến pháo bóng" },
          { id: "lesson4", title: "Thác Plinko hứng quả" },
          { id: "lesson5", title: "Tìm số bí ẩn" },
        ],
      },
      {
        id: "group8",
        title: "Bảng nhân 9",
        lessons: [
          { id: "lesson1", title: "Khám phá bảng nhân" },
          { id: "lesson2", title: "Cân thăng bằng" },
          { id: "lesson3", title: "Đại chiến pháo bóng" },
          { id: "lesson4", title: "Thác Plinko hứng quả" },
          { id: "lesson5", title: "Tìm số bí ẩn" },
        ],
      },
      {
        id: "group9",
        title: "Đấu trường 2-9",
        lessons: [
          { id: "lesson1", title: "Cân thăng bằng" },
          { id: "lesson2", title: "Đại chiến pháo bóng" },
          { id: "lesson3", title: "Thác Plinko hứng quả" },
          { id: "lesson4", title: "Tìm số bí ẩn" },
        ],
      },
    ],
  },
  {
    id: "learn-divide",
    title: "Phép Chia",
    description: "Bé học bảng chia 2-9 qua 3 trò chơi vật lý tương tác cực vui.",
    icon: GameDivideLogo,
    type: "math",
    groups: [
      {
        id: "group1",
        title: "Bảng chia 2",
        lessons: [
          { id: "lesson1", title: "Khám phá bảng chia", isFree: true },
          { id: "lesson2", title: "Cân thăng bằng", isFree: true },
          { id: "lesson3", title: "Đại chiến pháo bóng", isFree: true },
          { id: "lesson4", title: "Thác Plinko hứng quả", isFree: true },
          { id: "lesson5", title: "Tìm số bí ẩn", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Bảng chia 3",
        lessons: [
          { id: "lesson1", title: "Khám phá bảng chia" },
          { id: "lesson2", title: "Cân thăng bằng" },
          { id: "lesson3", title: "Đại chiến pháo bóng" },
          { id: "lesson4", title: "Thác Plinko hứng quả" },
          { id: "lesson5", title: "Tìm số bí ẩn" },
        ],
      },
      {
        id: "group3",
        title: "Bảng chia 4",
        lessons: [
          { id: "lesson1", title: "Khám phá bảng chia" },
          { id: "lesson2", title: "Cân thăng bằng" },
          { id: "lesson3", title: "Đại chiến pháo bóng" },
          { id: "lesson4", title: "Thác Plinko hứng quả" },
          { id: "lesson5", title: "Tìm số bí ẩn" },
        ],
      },
      {
        id: "group4",
        title: "Bảng chia 5",
        lessons: [
          { id: "lesson1", title: "Khám phá bảng chia" },
          { id: "lesson2", title: "Cân thăng bằng" },
          { id: "lesson3", title: "Đại chiến pháo bóng" },
          { id: "lesson4", title: "Thác Plinko hứng quả" },
          { id: "lesson5", title: "Tìm số bí ẩn" },
        ],
      },
      {
        id: "group5",
        title: "Bảng chia 6",
        lessons: [
          { id: "lesson1", title: "Khám phá bảng chia" },
          { id: "lesson2", title: "Cân thăng bằng" },
          { id: "lesson3", title: "Đại chiến pháo bóng" },
          { id: "lesson4", title: "Thác Plinko hứng quả" },
          { id: "lesson5", title: "Tìm số bí ẩn" },
        ],
      },
      {
        id: "group6",
        title: "Bảng chia 7",
        lessons: [
          { id: "lesson1", title: "Khám phá bảng chia" },
          { id: "lesson2", title: "Cân thăng bằng" },
          { id: "lesson3", title: "Đại chiến pháo bóng" },
          { id: "lesson4", title: "Thác Plinko hứng quả" },
          { id: "lesson5", title: "Tìm số bí ẩn" },
        ],
      },
      {
        id: "group7",
        title: "Bảng chia 8",
        lessons: [
          { id: "lesson1", title: "Khám phá bảng chia" },
          { id: "lesson2", title: "Cân thăng bằng" },
          { id: "lesson3", title: "Đại chiến pháo bóng" },
          { id: "lesson4", title: "Thác Plinko hứng quả" },
          { id: "lesson5", title: "Tìm số bí ẩn" },
        ],
      },
      {
        id: "group8",
        title: "Bảng chia 9",
        lessons: [
          { id: "lesson1", title: "Khám phá bảng chia" },
          { id: "lesson2", title: "Cân thăng bằng" },
          { id: "lesson3", title: "Đại chiến pháo bóng" },
          { id: "lesson4", title: "Thác Plinko hứng quả" },
          { id: "lesson5", title: "Tìm số bí ẩn" },
        ],
      },
      {
        id: "group9",
        title: "Đấu trường 2-9",
        lessons: [
          { id: "lesson1", title: "Cân thăng bằng" },
          { id: "lesson2", title: "Đại chiến pháo bóng" },
          { id: "lesson3", title: "Thác Plinko hứng quả" },
          { id: "lesson4", title: "Tìm số bí ẩn" },
        ],
      },
    ],
  },
  {
    id: "learn-money",
    title: "Tiền Việt Nam",
    description: "Bé học nhận biết tiền giấy Việt Nam và tập tính tiền qua trò chơi đi chợ.",
    icon: GameMoneyLogo,
    type: "math",
    groups: [
      {
        id: "group1",
        title: "Nhận Biết Tiền",
        lessons: [
          { id: "lesson1", title: "Học nhận biết", isFree: true },
          { id: "lesson2", title: "Đây là bao nhiêu?", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Kỹ Năng Tiền",
        lessons: [
          { id: "lesson1", title: "Xếp tiền nhỏ→lớn"},
          { id: "lesson2", title: "Đổi tiền" },
          { id: "lesson3", title: "Ai nhiều hơn?" },
          { id: "lesson4", title: "Tiết kiệm" },
        ],
      },
      {
        id: "group3",
        title: "Đi Chợ Cùng Cú",
        lessons: [
          { id: "lesson1", title: "Mua 1 món"},
          { id: "lesson2", title: "Gộp tiền" },
          { id: "lesson3", title: "Tiền thừa" },
        ],
      },
    ],
  },
  {
    id: "find-pattern",
    title: "Quy Luật",
    description: "Bé học tìm quy luật qua các hình dạng và màu sắc vui nhộn.",
    icon: GamePatternLogo,
    type: "logic",
    groups: [
      {
        id: "group1",
        title: "Quy luật màu sắc",
        lessons: [
          { id: "lesson1", title: "Học quy luật", isFree: true },
          { id: "lesson2", title: "Phần tiếp theo?", isFree: true },
          { id: "lesson3", title: "Điền vào chỗ trống", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Quy luật hình dạng",
        lessons: [
          { id: "lesson1", title: "Học quy luật"},
          { id: "lesson2", title: "Phần tiếp theo?" },
          { id: "lesson3", title: "Điền vào chỗ trống" },
        ],
      },
    ],
  },
  {
    id: "learn-alphabet",
    title: "Bảng chữ cái",
    description: "Bé học bảng chữ cái tiếng Việt qua hình ảnh và trò chơi.",
    icon: GameAlphabetLogo,
    type: "language",
    groups: [
      {
        id: "group1",
        title: "Nguyên âm",
        lessons: [
          { id: "lesson1", title: "Học chữ cái", isFree: true },
          { id: "lesson2", title: "Tập nói", isFree: true },
          { id: "lesson3", title: "Tập viết", isFree: true },
          { id: "lesson4", title: "Chữ nào đúng?", isFree: true },
          { id: "lesson5", title: "Ghép đôi", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Phụ âm 1",
        lessons: [
          { id: "lesson1", title: "Học chữ cái"},
          { id: "lesson2", title: "Tập nói" },
          { id: "lesson3", title: "Tập viết" },
          { id: "lesson4", title: "Chữ nào đúng?" },
          { id: "lesson5", title: "Ghép đôi" },
        ],
      },
      {
        id: "group3",
        title: "Phụ âm 2",
        lessons: [
          { id: "lesson1", title: "Học chữ cái"},
          { id: "lesson2", title: "Tập nói" },
          { id: "lesson3", title: "Tập viết" },
          { id: "lesson4", title: "Chữ nào đúng?" },
          { id: "lesson5", title: "Ghép đôi" },
        ],
      },
    ],
  },
  {
    id: "find-differences",
    title: "Điểm khác biệt",
    description: "Bé học cách quan sát và phát hiện ra chi tiết khác thường.",
    icon: GameFindDifferencesLogo,
    type: "logic",
    groups: [
      {
        id: "group1",
        title: "Dễ",
        lessons: [
          { id: "lesson1", title: "Phòng khách vui nhộn", isFree: true },
          { id: "lesson2", title: "Khu vườn thú vị", isFree: true },
          { id: "lesson3", title: "Bãi biển đầy nắng", isFree: true },
          { id: "lesson4", title: "Căn bếp ấm cúng", isFree: true },
          { id: "lesson5", title: "Sân chơi nhộn nhịp", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Trung bình",
        lessons: [
          { id: "lesson1", title: "Bầu trời đêm", isFree: false },
          { id: "lesson2", title: "Thám hiểm vũ trụ" },
          { id: "lesson3", title: "Đại dương sâu thẳm" },
          { id: "lesson4", title: "Khu rừng bí ẩn" },
          { id: "lesson5", title: "Tháp hoa hồng" },
        ],
      },
    ],
  },
  {
    id: "odd-one-out",
    title: "Hình khác biệt",
    description: "Bé luyện nhãn quan bằng cách tìm ra hình khác với các hình còn lại.",
    icon: GameOddOneOutLogo,
    type: "logic",
    groups: [
      {
        id: "group1",
        title: "Tìm màu khác biệt",
        lessons: [{ id: "lesson1", title: "Tìm thử", isFree: true }],
      },
      {
        id: "group2",
        title: "Tìm hình khác biệt",
        lessons: [{ id: "lesson1", title: "Tìm thử" }],
      },
      {
        id: "group3",
        title: "Tìm hình khác loại",
        lessons: [{ id: "lesson1", title: "Khác loại" }],
      },
    ],
  },
  {
    id: "maze-runner",
    title: "Mê Cung",
    description: "Bé điều hướng qua các mê cung để tìm ngôi sao.",
    icon: GameMazeRunnerLogo,
    type: "logic",
    groups: [
      {
        id: "group1",
        title: "Mê cung dễ",
        lessons: [{ id: "lesson1", title: "Bắt đầu", isFree: true }],
      },
      {
        id: "group2",
        title: "Mê cung vừa",
        lessons: [{ id: "lesson1", title: "Bắt đầu" }],
      },
      {
        id: "group3",
        title: "Mê cung khó",
        lessons: [{ id: "lesson1", title: "Bắt đầu" }],
      },
    ],
  },
  {
    id: "line-connect",
    title: "Nối Điểm Trí Tuệ",
    description: "Nối các điểm cùng màu để lấp đầy bảng.",
    icon: GameLineConnectLogo,
    type: "logic",
    groups: [
      {
        id: "group1",
        title: "Nối điểm dễ",
        logo: LineConnectGroup1Logo,
        lessons: [{ id: "lesson1", title: "Bắt đầu", isFree: true }],
      },
      {
        id: "group2",
        title: "Nối điểm vừa",
        logo: LineConnectGroup2Logo,
        lessons: [{ id: "lesson1", title: "Bắt đầu" }],
      },
      {
        id: "group3",
        title: "Nối điểm khó",
        logo: LineConnectGroup3Logo,
        lessons: [{ id: "lesson1", title: "Bắt đầu" }],
      },
    ],
  },
  {
    id: "mix-color",
    title: "Pha Màu",
    description: "Bé học cách pha trộn màu sắc để tạo ra màu mới.",
    icon: MixColorLogo,
    type: "art",
    groups: [
      {
        id: "group1",
        title: "Màu cơ bản",
        lessons: [
          { id: "lesson1", title: "Học pha màu", isFree: true },
          { id: "lesson2", title: "Pha màu nào?", isFree: true },
          { id: "lesson3", title: "Thử thách pha màu", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Màu nâng cao",
        lessons: [
          { id: "lesson1", title: "Học pha màu"},
          { id: "lesson2", title: "Pha màu nào?" },
          { id: "lesson3", title: "Thử thách pha màu" },
        ],
      },
      {
        id: "group3",
        title: "Luyện tập",
        lessons: [
          { id: "lesson1", title: "Học pha màu"},
          { id: "lesson2", title: "Pha màu nào?" },
          { id: "lesson3", title: "Thử thách pha màu" },
        ],
      },
    ],
  },
  {
    id: "paint-picture",
    title: "Tô Màu",
    description: "Bé tô màu các hình vẽ dễ thương qua các trò chơi nghệ thuật.",
    icon: PaintPictureLogo,
    type: "art",
    groups: [
      {
        id: "group1",
        title: "Động vật",
        lessons: [
          { id: "lesson1", title: "Tô tự do", isFree: true },
          { id: "lesson2", title: "Hoạ Khám Phá", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Thiên nhiên",
        lessons: [
          { id: "lesson1", title: "Tô tự do"},
          { id: "lesson2", title: "Hoạ Khám Phá" },
        ],
      },
      {
        id: "group3",
        title: "Đồ chơi",
        lessons: [
          { id: "lesson1", title: "Tô tự do"},
          { id: "lesson2", title: "Hoạ Khám Phá" },
        ],
      },
    ],
  },
  {
    id: "learn-clock",
    title: "Xem Đồng Hồ",
    description: "Bé học cách xem đồng hồ kim và đồng hồ điện tử.",
    icon: GameClockLogo,
    type: "life-skill",
    groups: [
      {
        id: "group1",
        title: "Đồng hồ kim",
        lessons: [
          { id: "lesson1", title: "Làm quen đồng hồ", isFree: true },
          { id: "lesson2", title: "Chọn đúng giờ", isFree: true },
          { id: "lesson3", title: "Chỉnh kim đồng hồ", isFree: true },
          { id: "lesson4", title: "Giờ nào làm gì?", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Đồng hồ điện tử",
        lessons: [
          { id: "lesson1", title: "Làm quen đồng hồ"},
          { id: "lesson2", title: "Chọn đúng giờ" },
        ],
      },
    ],
  },
  {
    id: "mini-piano",
    title: "Đàn Piano Tí Hon",
    description: "Bé học chơi đàn và khám phá âm thanh cùng các bài hát vui nhộn.",
    icon: MiniPianoLogo,
    type: "music",
    groups: [
      {
        id: "creative-sounds",
        title: "Học đàn",
        description: "Khám phá các âm thanh vui nhộn",
        logo: CreativeGroupLogo,
        variant: "green",
        lessons: [{ id: "classic-piano", title: "Piano cổ điển", isFree: true }],
      },
      {
        id: "mini-musician",
        title: "Nhạc Công Nhí",
        description: "Học chơi các bài hát đơn giản",
        logo: MusicianGroupLogo,
        variant: "orange",
        lessons: [
          { id: "kia-con-buom-vang", title: "Kìa con bướm vàng", isFree: true },
          { id: "happy-birthday", title: "Chúc mừng sinh nhật", isFree: true },
          { id: "ngoi-sao-lap-lanh", title: "Ngôi sao lấp lánh", isFree: true },
          { id: "ba-oi-ba", title: "Bà ơi bà" },
          { id: "doi-ken-ti-hon", title: "Đội kèn tí hon" },
        ],
      },
      {
        id: "ear-training",
        title: "Đôi Tai Tinh Anh",
        description: "Thử thách trí nhớ âm thanh",
        logo: EarGroupLogo,
        variant: "purple",
        lessons: [
          { id: "find-the-note", title: "Tìm nốt nhạc đúng", isFree: true },
          { id: "repeat-melody", title: "Lặp lại giai điệu" },
        ],
      },
    ],
  },
  {
    id: "learn-syllable",
    title: "Ghép Vần",
    description: "Bé học cách kết hợp nguyên âm và phụ âm để tạo thành tiếng.",
    icon: GameSyllableLogo,
    type: "language",
    groups: [
      {
        id: "group1",
        title: "Vần ie",
        lessons: [
          { id: "lesson1", title: "Học vần", isFree: true },
          { id: "lesson2", title: "Chọn vần đúng", isFree: true },
          { id: "lesson3", title: "Tập phát âm", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Vần uo",
        lessons: [
          { id: "lesson1", title: "Học vần"},
          { id: "lesson2", title: "Chọn vần đúng" },
          { id: "lesson3", title: "Tập phát âm" },
        ],
      },
      {
        id: "group3",
        title: "Vần ươ",
        lessons: [
          { id: "lesson1", title: "Học vần"},
          { id: "lesson2", title: "Chọn vần đúng" },
          { id: "lesson3", title: "Tập phát âm" },
        ],
      },
      {
        id: "group4",
        title: "Vần oa",
        lessons: [
          { id: "lesson1", title: "Học vần"},
          { id: "lesson2", title: "Chọn vần đúng" },
          { id: "lesson3", title: "Tập phát âm" },
        ],
      },
      {
        id: "group5",
        title: "Vần uy",
        lessons: [
          { id: "lesson1", title: "Học vần"},
          { id: "lesson2", title: "Chọn vần đúng" },
          { id: "lesson3", title: "Tập phát âm" },
        ],
      },
      {
        id: "group6",
        title: "Vần khác",
        lessons: [
          { id: "lesson1", title: "Học vần"},
          { id: "lesson2", title: "Chọn vần đúng" },
          { id: "lesson3", title: "Tập phát âm" },
        ],
      },
    ],
  },
  {
    id: "learn-terrain",
    title: "Địa Hình",
    description: "Bé khám phá các dạng địa hình tự nhiên qua trò chơi tương tác sáng tạo.",
    icon: GameTerrainLogo,
    type: "geography",
    groups: [
      {
        id: "group1",
        title: "Trên cạn",
        lessons: [
          { id: "lesson1", title: "Khám phá địa hình", isFree: true },
          { id: "lesson2", title: "Nghe đoán địa hình", isFree: true },
          { id: "lesson3", title: "Xếp lớp địa hình", isFree: true },
          { id: "lesson4", title: "Ai sống ở đây?", isFree: true },
          { id: "lesson5", title: "Phiêu lưu địa hình", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Dưới nước",
        lessons: [
          { id: "lesson1", title: "Khám phá địa hình"},
          { id: "lesson2", title: "Nghe đoán địa hình" },
          { id: "lesson3", title: "Xếp lớp địa hình" },
          { id: "lesson4", title: "Ai sống ở đây?" },
          { id: "lesson5", title: "Phiêu lưu địa hình" },
        ],
      },
      {
        id: "group3",
        title: "Đặc biệt",
        lessons: [
          { id: "lesson1", title: "Khám phá địa hình"},
          { id: "lesson2", title: "Nghe đoán địa hình" },
          { id: "lesson3", title: "Xếp lớp địa hình" },
          { id: "lesson4", title: "Ai sống ở đây?" },
          { id: "lesson5", title: "Phiêu lưu địa hình" },
        ],
      },
    ],
  },
  {
    id: "learn-body",
    title: "Bộ Phận Cơ Thể",
    description: "Bé học nhận biết và gọi tên các bộ phận trên cơ thể qua hình ảnh vui nhộn.",
    icon: GameBodyLogo,
    type: "science",
    groups: [
      {
        id: "group1",
        title: "Đầu & Mặt",
        lessons: [
          { id: "lesson1", title: "Khám phá cơ thể", isFree: true },
          { id: "lesson2", title: "Chạm và nói", isFree: true },
          { id: "lesson3", title: "Tập nói", isFree: true },
          { id: "lesson4", title: "Đây là gì?", isFree: true },
          { id: "lesson5", title: "Cơ thể làm gì?", isFree: true },
          { id: "lesson6", title: "Ghép đôi", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Thân Mình",
        lessons: [
          { id: "lesson1", title: "Khám phá cơ thể"},
          { id: "lesson2", title: "Chạm và nói" },
          { id: "lesson3", title: "Tập nói" },
          { id: "lesson4", title: "Đây là gì?" },
          { id: "lesson5", title: "Cơ thể làm gì?" },
          { id: "lesson6", title: "Ghép đôi" },
        ],
      },
      {
        id: "group3",
        title: "Bàn Tay & Bàn Chân",
        lessons: [
          { id: "lesson1", title: "Khám phá cơ thể"},
          { id: "lesson2", title: "Chạm và nói" },
          { id: "lesson3", title: "Tập nói" },
          { id: "lesson4", title: "Đây là gì?" },
          { id: "lesson5", title: "Cơ thể làm gì?" },
          { id: "lesson6", title: "Ghép đôi" },
        ],
      },
    ],
  },
  {
    id: "learn-cleaning",
    title: "Dọn Dẹp",
    description: "Bé học cách dọn dẹp nhà cửa gọn gàng và phân loại rác đúng cách.",
    icon: GameCleaningLogo,
    type: "life-skill",
    groups: [
      {
        id: "group1",
        title: "Dọn phòng",
        lessons: [
          { id: "lesson1", title: "Học dọn dẹp", isFree: true },
          { id: "lesson2", title: "Tập nói", isFree: true },
          { id: "lesson3", title: "Đúng hay Sai?", isFree: true },
          { id: "lesson4", title: "Sắp xếp thứ tự", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Dọn bếp",
        lessons: [
          { id: "lesson1", title: "Học dọn dẹp"},
          { id: "lesson2", title: "Tập nói" },
          { id: "lesson3", title: "Đúng hay Sai?" },
          { id: "lesson4", title: "Sắp xếp thứ tự" },
        ],
      },
      {
        id: "group3",
        title: "Phân loại rác",
        lessons: [
          { id: "lesson1", title: "Học phân loại"},
          { id: "lesson2", title: "Tập nói" },
          { id: "lesson3", title: "Đúng hay Sai?" },
          { id: "lesson4", title: "Sắp xếp thứ tự" },
        ],
      },
    ],
  },
  {
    id: "learn-notes",
    title: "Học Nốt Nhạc",
    description: "Bé làm quen với các nốt nhạc Đồ Rê Mi trên khuông nhạc qua hình ảnh và âm thanh.",
    icon: LearnNotesLogo,
    type: "music",
    groups: [
      {
        id: "basic-notes",
        title: "Nốt Nhạc Cơ Bản",
        description: "Đồ, Rê, Mi, Fa",
        logo: LearnNotesGroup1Logo,
        variant: "green",
        lessons: [
          { id: "lesson1", title: "Học nốt nhạc", isFree: true },
          { id: "lesson2", title: "Nghe và chọn", isFree: true },
          { id: "lesson3", title: "Nốt nào đúng?", isFree: true },
          { id: "lesson4", title: "Sắp xếp nốt", isFree: true },
        ],
      },
      {
        id: "advanced-notes",
        title: "Nốt Nhạc Nâng Cao",
        description: "Sol, La, Si, Đố",
        logo: LearnNotesGroup2Logo,
        variant: "orange",
        lessons: [
          { id: "lesson1", title: "Học nốt nhạc"},
          { id: "lesson2", title: "Nghe và chọn" },
          { id: "lesson3", title: "Nốt nào đúng?" },
          { id: "lesson4", title: "Sắp xếp nốt" },
        ],
      },
      {
        id: "practice",
        title: "Luyện Tập",
        description: "Ôn tập tất cả các nốt",
        logo: LearnNotesGroup3Logo,
        variant: "purple",
        lessons: [
          { id: "lesson1", title: "Nghe và chọn"},
          { id: "lesson2", title: "Sắp xếp giai điệu" },
        ],
      },
    ],
  },
  {
    id: "learn-danger",
    title: "Đồ Vật Nguy Hiểm",
    description: "Bé học nhận biết các đồ vật nguy hiểm trong nhà và cách giữ an toàn.",
    icon: GameDangerLogo,
    type: "life-skill",
    groups: [
      {
        id: "group1",
        title: "Trong bếp",
        lessons: [
          { id: "lesson1", title: "Học tên đồ vật", isFree: true },
          { id: "lesson2", title: "Khám phá ngôi nhà", isFree: true },
          { id: "lesson3", title: "Tình huống", isFree: true },
          { id: "lesson4", title: "Hành động an toàn", isFree: true },
          { id: "lesson5", title: "Đúng hay Sai?", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Phòng tắm & xung quanh",
        lessons: [
          { id: "lesson1", title: "Học tên đồ vật"},
          { id: "lesson2", title: "Khám phá ngôi nhà" },
          { id: "lesson3", title: "Tình huống" },
          { id: "lesson4", title: "Hành động an toàn" },
          { id: "lesson5", title: "Đúng hay Sai?" },
        ],
      },
      {
        id: "group3",
        title: "Đồ điện",
        lessons: [
          { id: "lesson1", title: "Học tên đồ vật"},
          { id: "lesson2", title: "Khám phá ngôi nhà" },
          { id: "lesson3", title: "Tình huống" },
          { id: "lesson4", title: "Hành động an toàn" },
          { id: "lesson5", title: "Đúng hay Sai?" },
        ],
      },
    ],
  },
  {
    id: "mini-sudoku-kids",
    title: "Sudoku",
    description: "Bé học suy luận logic qua bảng hình đơn giản, tìm ô còn thiếu theo quy luật hàng và cột.",
    icon: "https://assets.cuthongminh.com/games/mini-sudoku-kids/logo.webp",
    type: "logic",
    groups: [
      {
        id: "group1",
        title: "Làm quen 2×2",
        lessons: [
          { id: "lesson1", title: "Học luật chơi", isFree: true },
          { id: "lesson2", title: "Điền ô còn thiếu", isFree: true },
          { id: "lesson3", title: "Chọn đáp án đúng", isFree: true },
          { id: "lesson4", title: "Thử thách nhanh", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Sudoku hình ảnh 3×3",
        lessons: [
          { id: "lesson1", title: "Tìm hình còn thiếu"},
          { id: "lesson2", title: "Điền theo hàng và cột" },
          { id: "lesson3", title: "Luyện phản xạ" },
          { id: "lesson4", title: "Vượt màn logic" },
        ],
      },
      {
        id: "group3",
        title: "Sudoku màu sắc",
        lessons: [
          { id: "lesson1", title: "Điền màu đúng"},
          { id: "lesson2", title: "Tránh trùng màu" },
          { id: "lesson3", title: "Màn hỗn hợp" },
          { id: "lesson4", title: "Thử thách cuối" },
        ],
      },
      {
        id: "group4",
        title: "Sudoku con vật",
        lessons: [
          { id: "lesson1", title: "Nhận diện con vật"},
          { id: "lesson2", title: "Tìm ô đúng" },
          { id: "lesson3", title: "Suy luận nhanh" },
          { id: "lesson4", title: "Bé siêu logic" },
        ],
      },
    ],
  },
  {
    id: "sequence-sort",
    title: "Sắp Xếp",
    description: "Bé học sắp xếp theo kích thước, số lượng và màu sắc.",
    icon: "https://assets.cuthongminh.com/games/sequence-sort/logo.webp",
    type: "logic",
    groups: [
      {
        id: "group1",
        title: "Kích Thước",
        lessons: [
          { id: "lesson1", title: "Nhỏ → Lớn", isFree: true },
          { id: "lesson2", title: "Lớn → Nhỏ", isFree: true },
          { id: "lesson3", title: "Thấp → Cao", isFree: true },
          { id: "lesson4", title: "Cao → Thấp", isFree: true },
          { id: "lesson5", title: "Thử thách", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Số Lượng",
        lessons: [
          { id: "lesson1", title: "Ít → Nhiều"},
          { id: "lesson2", title: "Nhiều → Ít" },
          { id: "lesson3", title: "Thử thách" },
        ],
      },
      {
        id: "group3",
        title: "Màu Sắc",
        lessons: [
          { id: "lesson1", title: "Nhạt → Đậm"},
          { id: "lesson2", title: "Đậm → Nhạt" },
          { id: "lesson3", title: "Thử thách" },
        ],
      },
    ],
  },
  {
    id: "learn-english-vocab",
    title: "Học Từ Vựng",
    description: "Bé học từ vựng tiếng Anh cơ bản qua hình ảnh và phát âm: động vật, trái cây, màu sắc, số đếm.",
    icon: "https://assets.cuthongminh.com/games/learn-english-vocab/logo.webp",
    type: "english",
    groups: [
      {
        id: "group1",
        title: "Động Vật",
        lessons: [
          { id: "lesson1", title: "Học từ vựng", isFree: true },
          { id: "lesson2", title: "Tập nói", isFree: true },
          { id: "lesson3", title: "Nghe & Chọn", isFree: true },
          { id: "lesson4", title: "Ghép từ", isFree: true },
          { id: "lesson5", title: "Kiểm tra", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Trái Cây",
        lessons: [
          { id: "lesson1", title: "Học từ vựng"},
          { id: "lesson2", title: "Tập nói" },
          { id: "lesson3", title: "Nghe & Chọn" },
          { id: "lesson4", title: "Ghép từ" },
          { id: "lesson5", title: "Kiểm tra" },
        ],
      },
      {
        id: "group3",
        title: "Màu Sắc",
        lessons: [
          { id: "lesson1", title: "Học từ vựng"},
          { id: "lesson2", title: "Tập nói" },
          { id: "lesson3", title: "Nghe & Chọn" },
          { id: "lesson4", title: "Ghép từ" },
          { id: "lesson5", title: "Kiểm tra" },
        ],
      },
      {
        id: "group4",
        title: "Số Đếm",
        lessons: [
          { id: "lesson1", title: "Học từ vựng"},
          { id: "lesson2", title: "Tập nói" },
          { id: "lesson3", title: "Nghe & Chọn" },
          { id: "lesson4", title: "Ghép từ" },
          { id: "lesson5", title: "Kiểm tra" },
        ],
      },
      {
        id: "group5",
        title: "Giao Thông",
        lessons: [
          { id: "lesson1", title: "Học từ vựng"},
          { id: "lesson2", title: "Tập nói" },
          { id: "lesson3", title: "Nghe & Chọn" },
          { id: "lesson4", title: "Ghép từ" },
          { id: "lesson5", title: "Kiểm tra" },
        ],
      },
      {
        id: "group6",
        title: "Gia Đình",
        lessons: [
          { id: "lesson1", title: "Học từ vựng"},
          { id: "lesson2", title: "Tập nói" },
          { id: "lesson3", title: "Nghe & Chọn" },
          { id: "lesson4", title: "Ghép từ" },
          { id: "lesson5", title: "Kiểm tra" },
        ],
      },
      {
        id: "group7",
        title: "Cơ Thể Người",
        lessons: [
          { id: "lesson1", title: "Học từ vựng"},
          { id: "lesson2", title: "Tập nói" },
          { id: "lesson3", title: "Nghe & Chọn" },
          { id: "lesson4", title: "Ghép từ" },
          { id: "lesson5", title: "Kiểm tra" },
        ],
      },
    ],
  },
  {
    id: "learn-english-alphabet",
    title: "Bảng Chữ Cái",
    description: "Bé học bảng chữ cái tiếng Anh từ A-Z qua các từ vựng sinh động.",
    icon: "https://assets.cuthongminh.com/games/learn-english-alphabet/logo.webp",
    type: "english",
    groups: [
      {
        id: "group1",
        title: "Bảng Chữ Cái (A-M)",
        lessons: [
          { id: "lesson1", title: "Học chữ cái", isFree: true },
          { id: "lesson2", title: "Tập nói", isFree: true },
          { id: "lesson3", title: "Nghe & Chọn", isFree: true },
          { id: "lesson4", title: "Ghép từ", isFree: true },
          { id: "lesson5", title: "Kiểm tra", isFree: true },
        ],
      },
      {
        id: "group2",
        title: "Bảng Chữ Cái (N-Z)",
        lessons: [
          { id: "lesson1", title: "Học chữ cái"},
          { id: "lesson2", title: "Tập nói" },
          { id: "lesson3", title: "Nghe & Chọn" },
          { id: "lesson4", title: "Ghép từ" },
          { id: "lesson5", title: "Kiểm tra" },
        ],
      },
    ],
  },
  {
    id: "talk-with-owl",
    title: "Giao Tiếp",
    description:
      "Bé luyện giao tiếp tiếng Anh trực tiếp với Cú Thông Minh qua giọng nói AI. Cú dạy bé chào hỏi, hỏi đáp và trò chuyện bằng tiếng Anh.",
    icon: "https://assets.cuthongminh.com/games/talk-with-owl/logo.webp",
    type: "english",
    groups: [
      {
        id: "greetings",
        title: "Chào hỏi",
        lessons: [
          { id: "lesson1", title: "Học Từ Mới", isFree: true },
          { id: "lesson2", title: "Học Câu", isFree: true },
          { id: "lesson3", title: "Hỏi Đáp", isFree: true },
        ],
      },
      {
        id: "fruits",
        title: "Trái Cây",
        lessons: [
          { id: "lesson1", title: "Học Từ Mới"},
          { id: "lesson2", title: "Học Câu"},
          { id: "lesson3", title: "Hỏi Đáp"},
        ],
      },
      {
        id: "colors",
        title: "Màu Sắc",
        lessons: [
          { id: "lesson1", title: "Học Từ Mới"},
          { id: "lesson2", title: "Học Câu"},
          { id: "lesson3", title: "Hỏi Đáp"},
        ],
      },
      {
        id: "numbers",
        title: "Số Đếm",
        lessons: [
          { id: "lesson1", title: "Học Từ Mới"},
          { id: "lesson2", title: "Học Câu"},
          { id: "lesson3", title: "Hỏi Đáp"},
        ],
      },
      {
        id: "animals",
        title: "Động Vật",
        lessons: [
          { id: "lesson1", title: "Học Từ Mới"},
          { id: "lesson2", title: "Học Câu"},
          { id: "lesson3", title: "Hỏi Đáp"},
        ],
      },
      {
        id: "food",
        title: "Đồ ăn",
        lessons: [
          { id: "lesson1", title: "Học Từ Mới"},
          { id: "lesson2", title: "Học Câu"},
          { id: "lesson3", title: "Hỏi Đáp"},
        ],
      },
      {
        id: "transport",
        title: "Giao thông",
        lessons: [
          { id: "lesson1", title: "Học Từ Mới"},
          { id: "lesson2", title: "Học Câu"},
          { id: "lesson3", title: "Hỏi Đáp"},
        ],
      },
      {
        id: "family",
        title: "Gia Đình",
        lessons: [
          { id: "lesson1", title: "Học Từ Mới"},
          { id: "lesson2", title: "Học Câu"},
          { id: "lesson3", title: "Hỏi Đáp"},
        ],
      },
      {
        id: "body",
        title: "Cơ thể",
        lessons: [
          { id: "lesson1", title: "Học Từ Mới"},
          { id: "lesson2", title: "Học Câu"},
          { id: "lesson3", title: "Hỏi Đáp"},
        ],
      },
      {
        id: "school",
        title: "Dụng cụ học tập",
        lessons: [
          { id: "lesson1", title: "Học Từ Mới"},
          { id: "lesson2", title: "Học Câu"},
          { id: "lesson3", title: "Hỏi Đáp"},
        ],
      },
    ],
  },
];
