import type { GameGroupType } from "@/libs/constants/groups";

export interface TopicCluster {
  heading: string;
  description: string;
  blogSlugs: string[];
}

export const TOPIC_CLUSTERS: Record<GameGroupType, TopicCluster> = {
  math: {
    heading: "Cụm nội dung Toán Học",
    description: "Các bài viết nền tảng về học số, so sánh số lượng và phép tính đơn giản cho trẻ mầm non.",
    blogSlugs: [
      "cach-day-be-hoc-so",
      "day-be-hoc-dem",
      "so-sanh-so-luong",
      "phep-cong-tru-don-gian",
      "hoc-xem-dong-ho-cho-be",
    ],
  },
  logic: {
    heading: "Cụm nội dung Tư Duy Logic",
    description: "Chuỗi bài viết giúp ba mẹ phát triển tư duy quan sát, tìm quy luật và định hướng không gian cho bé.",
    blogSlugs: [
      "hoc-quy-luat-logic",
      "day-be-tu-duy-logic",
      "tro-choi-tim-diem-khac-biet",
      "tro-choi-me-cung",
      "bai-tap-tu-duy-tim-hinh-khac-loai",
    ],
  },
  language: {
    heading: "Cụm nội dung Ngôn Ngữ",
    description: "Tập trung vào bảng chữ cái, dấu thanh, ghép vần và các nền tảng tập đọc tiếng Việt cho bé.",
    blogSlugs: [
      "hoc-bang-chu-cai-tieng-viet",
      "day-be-hoc-bang-chu-cai-tai-nha",
      "be-hoc-dau-tieng-viet",
      "be-hoc-ghep-van",
      "day-tre-tap-doc-som",
    ],
  },
  science: {
    heading: "Cụm nội dung Khoa Học",
    description: "Khơi gợi sự tò mò về động vật, thiên nhiên, cơ thể người và thế giới xung quanh cho trẻ nhỏ.",
    blogSlugs: [
      "kham-pha-the-gioi-dong-vat",
      "day-be-yeu-dong-vat",
      "hoc-thoi-tiet-va-khi-hau",
      "be-hoc-bo-phan-co-the",
      "kham-pha-dia-hinh",
    ],
  },
  "life-skill": {
    heading: "Cụm nội dung Kỹ Năng Sống",
    description: "Các bài viết giúp bé hình thành thói quen an toàn, tự lập và hiểu môi trường sống hằng ngày.",
    blogSlugs: [
      "hoc-phuong-tien-giao-thong",
      "an-toan-giao-thong-cho-be",
      "ky-nang-ve-sinh-ca-nhan",
      "day-be-biet-cac-nghe-nghiep",
      "day-be-nhan-biet-nguoi-la",
    ],
  },
  geography: {
    heading: "Cụm nội dung Địa Lý Và Văn Hóa",
    description: "Bé khám phá địa danh, địa hình, quốc kỳ và trang phục truyền thống qua các bài viết cùng chủ đề.",
    blogSlugs: [
      "kham-pha-dia-danh",
      "kham-pha-dia-hinh",
      "trang-phuc-cac-quoc-gia",
      "nhan-biet-quoc-ky",
    ],
  },
  music: {
    heading: "Cụm nội dung Âm Nhạc",
    description: "Nội dung dành cho bé làm quen nhạc cụ, nốt nhạc và cảm thụ âm nhạc từ sớm.",
    blogSlugs: [
      "lam-quen-voi-nhac-cu",
      "am-nhac-cho-tre-mam-non",
      "dan-piano-ti-hon",
    ],
  },
  art: {
    heading: "Cụm nội dung Mỹ Thuật",
    description: "Từ nhận biết màu sắc đến pha màu, tô màu và vẽ tranh đơn giản cho trẻ mầm non.",
    blogSlugs: [
      "hoc-mau-sac",
      "mau-sac-cho-tre-mau-giao",
      "be-hoc-pha-mau-nghe-thuat",
      "be-tap-to-mau-sang-tao",
      "day-be-ve-tranh-don-gian",
    ],
  },
  history: {
    heading: "Cụm nội dung Lịch Sử",
    description: "Nhóm chủ đề lịch sử đang được cập nhật thêm nội dung.",
    blogSlugs: [],
  },
};
