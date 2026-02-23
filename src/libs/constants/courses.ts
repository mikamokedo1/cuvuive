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
  thumbnail: string;
  groups: GroupDef[];
}

export const COURSES: CourseDef[] = [
  {
    id: "learn-numbers",
    title: "Học đếm số",
    description: "Bé làm quen với các con số từ 1 đến 10 qua các trò chơi thú vị.",
    thumbnail: "/assets/courses/numbers.png",
    groups: [
      {
        id: "group1",
        title: "Làm quen 1-3",
        lessons: [
          { id: "lesson1", title: "Học số 1-3", isFree: true },
          { id: "lesson2", title: "Số nào đúng?" },
          { id: "lesson3", title: "Đếm và chọn" },
          { id: "lesson4", title: "Tập viết số" },
        ],
      },
      {
        id: "group2",
        title: "Làm quen 4-6",
        lessons: [
          { id: "lesson1", title: "Học số 4-6", isFree: true },
          { id: "lesson2", title: "Số nào đúng?" },
          { id: "lesson3", title: "Đếm và chọn" },
          { id: "lesson4", title: "Tập viết số" },
        ],
      },
      {
        id: "group3",
        title: "Làm quen 7-9",
        lessons: [
          { id: "lesson1", title: "Học số 7-9", isFree: true },
          { id: "lesson2", title: "Số nào đúng?" },
          { id: "lesson3", title: "Đếm và chọn" },
          { id: "lesson4", title: "Tập viết số" },
        ],
      },
      {
        id: "group4",
        title: "Số 10-20",
        lessons: [
          { id: "lesson1", title: "Học số 10-20", isFree: true },
          { id: "lesson2", title: "Số nào đúng?" },
          { id: "lesson3", title: "Đếm và chọn" },
          { id: "lesson4", title: "Tập viết số" },
        ],
      },
      {
        id: "group5",
        title: "Luyện tập",
        lessons: [
          { id: "lesson1", title: "Số nào đúng?", isFree: true },
          { id: "lesson2", title: "Đếm và chọn" },
        ],
      },
    ],
  },
  {
    id: "compare-quantity",
    title: "So sánh số lượng",
    description: "Bé học so sánh nhiều hơn, ít hơn và bằng nhau.",
    thumbnail: "/assets/courses/compare.png",
    groups: [
      {
        id: "group1",
        title: "Lớn hơn",
        lessons: [
          { id: "lesson1", title: "Học dấu lớn hơn", isFree: true },
          { id: "lesson2", title: "Nhóm nào nhiều hơn?" },
          { id: "lesson3", title: "Số nào lớn hơn?" },
          { id: "lesson4", title: "Tập viết dấu >" },
        ],
      },
      {
        id: "group2",
        title: "Nhỏ hơn",
        lessons: [
          { id: "lesson1", title: "Học dấu nhỏ hơn", isFree: true },
          { id: "lesson2", title: "Nhóm nào ít hơn?" },
          { id: "lesson3", title: "Số nào nhỏ hơn?" },
          { id: "lesson4", title: "Tập viết dấu <" },
        ],
      },
      {
        id: "group3",
        title: "Bằng nhau",
        lessons: [
          { id: "lesson1", title: "Học dấu bằng", isFree: true },
          { id: "lesson2", title: "Nhóm nào bằng nhau?" },
          { id: "lesson3", title: "Số nào bằng nhau?" },
          { id: "lesson4", title: "Tập viết dấu =" },
        ],
      },
      {
        id: "group4",
        title: "Luyện tập",
        lessons: [
          { id: "lesson1", title: "So sánh đồ vật", isFree: true },
          { id: "lesson2", title: "So sánh số" },
        ],
      },
    ],
  },
  {
    id: "learn-shape",
    title: "Học hình dạng",
    description: "Bé làm quen với các hình tròn, vuông, tam giác... qua các trò chơi thú vị.",
    thumbnail: "/assets/courses/shapes.png",
    groups: [
      {
        id: "group1",
        title: "Hình cơ bản",
        lessons: [
          { id: "lesson1", title: "Học hình dạng", isFree: true },
          { id: "lesson2", title: "Tìm hình giống" },
          { id: "lesson3", title: "Vật gì hình gì?" },
          { id: "lesson4", title: "Vẽ hình" },
        ],
      },
      {
        id: "group2",
        title: "Hình nâng cao",
        lessons: [
          { id: "lesson1", title: "Học hình dạng", isFree: true },
          { id: "lesson2", title: "Tìm hình giống" },
          { id: "lesson3", title: "Vật gì hình gì?" },
          { id: "lesson4", title: "Vẽ hình" },
        ],
      },
      {
        id: "group3",
        title: "Luyện tập",
        lessons: [
          { id: "lesson1", title: "Học hình dạng", isFree: true },
          { id: "lesson2", title: "Tìm hình giống" },
          { id: "lesson3", title: "Vật gì hình gì?" },
        ],
      },
    ],
  },
  {
    id: "learn-color",
    title: "Học màu sắc",
    description: "Bé khám phá thế giới màu sắc rực rỡ và học cách phân biệt màu.",
    thumbnail: "/assets/courses/colors.png",
    groups: [
      {
        id: "group1",
        title: "Màu cơ bản",
        lessons: [
          { id: "lesson1", title: "Học màu sắc", isFree: true },
          { id: "lesson2", title: "Tìm màu giống" },
          { id: "lesson3", title: "Hình gì màu gì?" },
        ],
      },
      {
        id: "group2",
        title: "Màu nâng cao",
        lessons: [
          { id: "lesson1", title: "Học màu sắc", isFree: true },
          { id: "lesson2", title: "Tìm màu giống" },
          { id: "lesson3", title: "Hình gì màu gì?" },
        ],
      },
      {
        id: "group3",
        title: "Luyện tập",
        lessons: [
          { id: "lesson1", title: "Học màu sắc", isFree: true },
          { id: "lesson2", title: "Tìm màu giống" },
          { id: "lesson3", title: "Hình gì màu gì?" },
        ],
      },
    ],
  },
  {
    id: "learn-animal",
    title: "Học động vật",
    description: "Bé làm quen với các loài động vật qua hình ảnh và âm thanh.",
    thumbnail: "/assets/courses/animals.png",
    groups: [
      {
        id: "group1",
        title: "Động vật nuôi",
        lessons: [
          { id: "lesson1", title: "Học tên động vật", isFree: true },
          { id: "lesson2", title: "Đây là con gì?" },
          { id: "lesson3", title: "Ghép đôi" },
        ],
      },
      {
        id: "group2",
        title: "Động vật hoang dã",
        lessons: [
          { id: "lesson1", title: "Học tên động vật", isFree: true },
          { id: "lesson2", title: "Đây là con gì?" },
          { id: "lesson3", title: "Ghép đôi" },
        ],
      },
      {
        id: "group3",
        title: "Động vật biển",
        lessons: [
          { id: "lesson1", title: "Học tên động vật", isFree: true },
          { id: "lesson2", title: "Đây là con gì?" },
          { id: "lesson3", title: "Ghép đôi" },
        ],
      },
    ],
  },
  {
    id: "learn-vehicle",
    title: "Học phương tiện",
    description: "Bé làm quen với các phương tiện giao thông đường bộ, đường thủy và hàng không.",
    thumbnail: "/assets/courses/vehicles.png",
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
    id: "learn-math",
    title: "Học toán đơn giản",
    description: "Bé học phép cộng và phép trừ với các con số đến 20.",
    thumbnail: "/assets/games/learn-math/logo.png",
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
          { id: "lesson2", title: "Cộng trừ bằng số", isFree: true },
        ],
      },
    ],
  },
];
