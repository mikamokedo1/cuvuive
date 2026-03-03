// Assets
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
import GameHygieneLogo from "@/assets/games/learn-hygiene/logo.png";
import GamePatternLogo from "@/assets/games/find-pattern/logo.png";
import GameAlphabetLogo from "@/assets/games/learn-alphabet/logo.png";
import GameFindDifferencesLogo from "@/assets/games/game-4-logo.webp";
import GameOddOneOutLogo from "@/assets/games/odd-one-out/logo.png";
import GameMazeRunnerLogo from "@/assets/games/maze-runner/logo.png";
import { StaticImageData } from "next/image";
import { GameGroupType } from "@/app/games/GamesMap";

export interface LessonDef {
  id: string;
  title: string;
  isFree?: boolean;
}

export interface GroupDef {
  id: string;
  title: string;
  lessons: LessonDef[];
}

export interface CourseDef {
  id: string;
  title: string;
  description: string;
  groups: GroupDef[];
  icon: StaticImageData;
  type: GameGroupType;
}

export const COURSES: CourseDef[] = [
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
          { id: "lesson2", title: "Số nào đúng?" },
          { id: "lesson3", title: "Đếm đồ vật" },
          { id: "lesson4", title: "Tập viết" },
        ],
      },
      {
        id: "group2",
        title: "Làm quen 4-6",
        lessons: [
          { id: "lesson1", title: "Học số 4-6", isFree: true },
          { id: "lesson2", title: "Số nào đúng?" },
          { id: "lesson3", title: "Đếm đồ vật" },
          { id: "lesson4", title: "Tập viết" },
        ],
      },
      {
        id: "group3",
        title: "Làm quen 7-9",
        lessons: [
          { id: "lesson1", title: "Học số 7-9", isFree: true },
          { id: "lesson2", title: "Số nào đúng?" },
          { id: "lesson3", title: "Đếm đồ vật" },
          { id: "lesson4", title: "Tập viết" },
        ],
      },
      {
        id: "group4",
        title: "Làm quen 10-20",
        lessons: [
          { id: "lesson1", title: "Học số 10-20", isFree: true },
          { id: "lesson2", title: "Số nào đúng?" },
          { id: "lesson3", title: "Đếm đồ vật" },
          { id: "lesson4", title: "Tập viết" },
        ],
      },
      {
        id: "group5",
        title: "Luyện tập",
        lessons: [
          { id: "lesson1", title: "Số nào đúng?", isFree: true },
          { id: "lesson2", title: "Đếm đồ vật" },
        ],
      },
    ],
  },
  {
    id: "compare-quantity",
    title: "So sánh số lượng",
    description: "Bé học so sánh nhiều hơn, ít hơn, bằng nhau.",
    icon: Game3Logo,
    type: "math",
    groups: [
      {
        id: "group1",
        title: "Lớn hơn",
        lessons: [
          { id: "lesson1", title: "Học lớn hơn", isFree: true },
          { id: "lesson2", title: "Luyện tập" },
          { id: "lesson3", title: "Thử thách" },
          { id: "lesson4", title: "Trò chơi" },
        ],
      },
      {
        id: "group2",
        title: "Nhỏ hơn",
        lessons: [
          { id: "lesson1", title: "Học nhỏ hơn", isFree: true },
          { id: "lesson2", title: "Luyện tập" },
          { id: "lesson3", title: "Thử thách" },
          { id: "lesson4", title: "Trò chơi" },
        ],
      },
      {
        id: "group3",
        title: "Bằng nhau",
        lessons: [
          { id: "lesson1", title: "Học bằng nhau", isFree: true },
          { id: "lesson2", title: "Luyện tập" },
          { id: "lesson3", title: "Thử thách" },
          { id: "lesson4", title: "Trò chơi" },
        ],
      },
      {
        id: "group4",
        title: "Luyện tập",
        lessons: [
          { id: "lesson1", title: "Luyện tập tổng hợp", isFree: true },
          { id: "lesson2", title: "Thử thách cuối" },
        ],
      },
    ],
  },
  {
    id: "learn-color",
    title: "Màu sắc",
    description: "Bé làm quen với các màu sắc cơ bản.",
    icon: GameColorLogo,
    type: "art",
    groups: [
      {
        id: "group1",
        title: "Màu cơ bản",
        lessons: [
          { id: "lesson1", title: "Học màu sắc", isFree: true },
          { id: "lesson2", title: "Tìm màu giống" },
          { id: "lesson3", title: "Trò chơi màu" },
        ],
      },
      {
        id: "group2",
        title: "Màu nâng cao",
        lessons: [
          { id: "lesson1", title: "Học màu sắc", isFree: true },
          { id: "lesson2", title: "Tìm màu giống" },
          { id: "lesson3", title: "Trò chơi màu" },
        ],
      },
      {
        id: "group3",
        title: "Luyện tập",
        lessons: [
          { id: "lesson1", title: "Luyện tập màu", isFree: true },
          { id: "lesson2", title: "Thử thách màu" },
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
          { id: "lesson2", title: "Tìm hình giống" },
          { id: "lesson3", title: "Tìm đồ vật" },
          { id: "lesson4", title: "Trò chơi hình" },
        ],
      },
      {
        id: "group2",
        title: "Hình nâng cao",
        lessons: [
          { id: "lesson1", title: "Học hình dạng", isFree: true },
          { id: "lesson2", title: "Tìm hình giống" },
          { id: "lesson3", title: "Tìm đồ vật" },
          { id: "lesson4", title: "Trò chơi hình" },
        ],
      },
      {
        id: "group3",
        title: "Luyện tập",
        lessons: [
          { id: "lesson1", title: "Luyện tập hình", isFree: true },
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
          { id: "lesson2", title: "Tập nói" },
          { id: "lesson3", title: "Đây là con gì?" },
          { id: "lesson4", title: "Ghép đôi" },
        ],
      },
      {
        id: "group2",
        title: "Động vật hoang dã",
        lessons: [
          { id: "lesson1", title: "Học tên động vật", isFree: true },
          { id: "lesson2", title: "Tập nói" },
          { id: "lesson3", title: "Đây là con gì?" },
          { id: "lesson4", title: "Ghép đôi" },
        ],
      },
      {
        id: "group3",
        title: "Động vật biển",
        lessons: [
          { id: "lesson1", title: "Học tên động vật", isFree: true },
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
          { id: "lesson2", title: "Đây là gì?" },
          { id: "lesson3", title: "Ghép đôi" },
        ],
      },
      {
        id: "group2",
        title: "Phương tiện đường thủy",
        lessons: [
          { id: "lesson1", title: "Học tên phương tiện", isFree: true },
          { id: "lesson2", title: "Đây là gì?" },
          { id: "lesson3", title: "Ghép đôi" },
        ],
      },
      {
        id: "group3",
        title: "Phương tiện hàng không",
        lessons: [
          { id: "lesson1", title: "Học tên phương tiện", isFree: true },
          { id: "lesson2", title: "Đây là gì?" },
          { id: "lesson3", title: "Ghép đôi" },
        ],
      },
      {
        id: "group4",
        title: "Luyện tập",
        lessons: [
          { id: "lesson1", title: "Đây là gì?", isFree: true },
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
          { id: "lesson2", title: "Đây là gì?" },
          { id: "lesson3", title: "Ghép đôi" },
        ],
      },
      {
        id: "group2",
        title: "Trái cây nhiệt đới",
        lessons: [
          { id: "lesson1", title: "Học tên trái cây", isFree: true },
          { id: "lesson2", title: "Đây là gì?" },
          { id: "lesson3", title: "Ghép đôi" },
        ],
      },
      {
        id: "group3",
        title: "Trái cây khác",
        lessons: [
          { id: "lesson1", title: "Học tên trái cây", isFree: true },
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
          { id: "lesson2", title: "Đây là gì?" },
          { id: "lesson3", title: "Ghép đôi" },
        ],
      },
      {
        id: "group2",
        title: "Món chính",
        lessons: [
          { id: "lesson1", title: "Học tên món ăn", isFree: true },
          { id: "lesson2", title: "Đây là gì?" },
          { id: "lesson3", title: "Ghép đôi" },
        ],
      },
      {
        id: "group3",
        title: "Món tráng miệng",
        lessons: [
          { id: "lesson1", title: "Học tên món ăn", isFree: true },
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
          { id: "lesson2", title: "Đây là gì?" },
          { id: "lesson3", title: "Ghép đôi" },
        ],
      },
      {
        id: "group2",
        title: "Khủng long ăn thịt",
        lessons: [
          { id: "lesson1", title: "Học tên khủng long", isFree: true },
          { id: "lesson2", title: "Đây là gì?" },
          { id: "lesson3", title: "Ghép đôi" },
        ],
      },
      {
        id: "group3",
        title: "Khủng long bay & biển",
        lessons: [
          { id: "lesson1", title: "Học tên khủng long", isFree: true },
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
          { id: "lesson2", title: "Đây là gì?" },
          { id: "lesson3", title: "Ghép đôi" },
        ],
      },
      {
        id: "group2",
        title: "Nhạc cụ gõ",
        lessons: [
          { id: "lesson1", title: "Học nhạc cụ", isFree: true },
          { id: "lesson2", title: "Đây là gì?" },
          { id: "lesson3", title: "Ghép đôi" },
        ],
      },
      {
        id: "group3",
        title: "Nhạc cụ hơi",
        lessons: [
          { id: "lesson1", title: "Học nhạc cụ", isFree: true },
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
          { id: "lesson2", title: "Đây là gì?" },
          { id: "lesson3", title: "Nối dụng cụ" },
        ],
      },
      {
        id: "group2",
        title: "Nghề y tế & khoa học",
        lessons: [
          { id: "lesson1", title: "Học tên nghề", isFree: true },
          { id: "lesson2", title: "Đây là gì?" },
          { id: "lesson3", title: "Nối dụng cụ" },
        ],
      },
      {
        id: "group3",
        title: "Nghề nghệ thuật",
        lessons: [
          { id: "lesson1", title: "Học tên nghề", isFree: true },
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
          { id: "lesson2", title: "Đây là gì?" },
          { id: "lesson3", title: "Ghép đôi" },
        ],
      },
      {
        id: "group2",
        title: "Hoa Tết & Trang trí",
        lessons: [
          { id: "lesson1", title: "Học tên hoa", isFree: true },
          { id: "lesson2", title: "Đây là gì?" },
          { id: "lesson3", title: "Ghép đôi" },
        ],
      },
      {
        id: "group3",
        title: "Cây ăn quả",
        lessons: [
          { id: "lesson1", title: "Học tên cây", isFree: true },
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
          { id: "lesson2", title: "Tập nói" },
          { id: "lesson3", title: "Đây là gì?" },
          { id: "lesson4", title: "Ghép đôi" },
        ],
      },
      {
        id: "group2",
        title: "Thời tiết đặc biệt",
        lessons: [
          { id: "lesson1", title: "Học tên thời tiết", isFree: true },
          { id: "lesson2", title: "Tập nói" },
          { id: "lesson3", title: "Đây là gì?" },
          { id: "lesson4", title: "Ghép đôi" },
        ],
      },
      {
        id: "group3",
        title: "Mùa và khí hậu",
        lessons: [
          { id: "lesson1", title: "Học tên mùa", isFree: true },
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
          { id: "lesson2", title: "Tập nói" },
          { id: "lesson3", title: "Đúng hay Sai?" },
          { id: "lesson4", title: "Sắp xếp thứ tự" },
        ],
      },
      {
        id: "group2",
        title: "Giữ gìn sức khoẻ",
        lessons: [
          { id: "lesson1", title: "Học tên", isFree: true },
          { id: "lesson2", title: "Tập nói" },
          { id: "lesson3", title: "Đúng hay Sai?" },
          { id: "lesson4", title: "Sắp xếp thứ tự" },
        ],
      },
      {
        id: "group3",
        title: "Sạch sẽ gọn gàng",
        lessons: [
          { id: "lesson1", title: "Học tên", isFree: true },
          { id: "lesson2", title: "Tập nói" },
          { id: "lesson3", title: "Đúng hay Sai?" },
          { id: "lesson4", title: "Sắp xếp thứ tự" },
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
          { id: "lesson2", title: "Chọn quốc kỳ đúng" },
          { id: "lesson3", title: "Lật hình ghi nhớ" },
          { id: "lesson4", title: "Ghép hình" },
        ],
      },
      {
        id: "group2",
        title: "Châu Âu",
        lessons: [
          { id: "lesson1", title: "Học tên quốc kỳ", isFree: true },
          { id: "lesson2", title: "Chọn quốc kỳ đúng" },
          { id: "lesson3", title: "Lật hình ghi nhớ" },
          { id: "lesson4", title: "Ghép hình" },
        ],
      },
      {
        id: "group3",
        title: "Châu Mỹ",
        lessons: [
          { id: "lesson1", title: "Học tên quốc kỳ", isFree: true },
          { id: "lesson2", title: "Chọn quốc kỳ đúng" },
          { id: "lesson3", title: "Lật hình ghi nhớ" },
          { id: "lesson4", title: "Ghép hình" },
        ],
      },
      {
        id: "group4",
        title: "Khác",
        lessons: [
          { id: "lesson1", title: "Học tên quốc kỳ", isFree: true },
          { id: "lesson2", title: "Chọn quốc kỳ đúng" },
          { id: "lesson3", title: "Lật hình ghi nhớ" },
          { id: "lesson4", title: "Ghép hình" },
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
          { id: "lesson2", title: "Cộng bằng hình" },
          { id: "lesson3", title: "Cộng bằng số" },
          { id: "lesson4", title: "Tập viết dấu" },
        ],
      },
      {
        id: "group2",
        title: "Phép Trừ",
        lessons: [
          { id: "lesson1", title: "Giải thích phép trừ", isFree: true },
          { id: "lesson2", title: "Trừ bằng hình" },
          { id: "lesson3", title: "Trừ bằng số" },
          { id: "lesson4", title: "Tập viết dấu" },
        ],
      },
      {
        id: "group3",
        title: "Luyện tập",
        lessons: [
          { id: "lesson1", title: "Cộng trừ bằng hình", isFree: true },
          { id: "lesson2", title: "Cộng trừ bằng số" },
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
          { id: "lesson2", title: "Phần tiếp theo?" },
          { id: "lesson3", title: "Điền vào chỗ trống" },
        ],
      },
      {
        id: "group2",
        title: "Quy luật hình dạng",
        lessons: [
          { id: "lesson1", title: "Học quy luật", isFree: true },
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
          { id: "lesson2", title: "Tập nói" },
          { id: "lesson3", title: "Tập viết" },
          { id: "lesson4", title: "Chữ nào đúng?" },
          { id: "lesson5", title: "Ghép đôi" },
        ],
      },
      {
        id: "group2",
        title: "Phụ âm 1",
        lessons: [
          { id: "lesson1", title: "Học chữ cái", isFree: true },
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
          { id: "lesson1", title: "Học chữ cái", isFree: true },
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
          { id: "lesson2", title: "Khu vườn thú vị" },
          { id: "lesson3", title: "Bãi biển đầy nắng" },
          { id: "lesson4", title: "Căn bếp ấm cúng" },
          { id: "lesson5", title: "Sân chơi nhộn nhịp" },
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
        lessons: [{ id: "lesson1", title: "Tìm thử", isFree: true }],
      },
      {
        id: "group3",
        title: "Tìm hình khác loại",
        lessons: [{ id: "lesson1", title: "Khác loại", isFree: true }],
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
        lessons: [{ id: "lesson1", title: "Bắt đầu", isFree: true }],
      },
      {
        id: "group3",
        title: "Mê cung khó",
        lessons: [{ id: "lesson1", title: "Bắt đầu", isFree: true }],
      },
    ],
  },
];
