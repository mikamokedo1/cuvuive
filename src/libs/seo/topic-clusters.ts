import type { GameGroupType } from "@/libs/constants/groups";

export interface TopicCluster {
  heading: string;
  description: string;
  blogSlugs: string[];
}

/**
 * Topic clusters map each game category to related blog posts.
 * This drives internal linking from category pages to blog content,
 * which is critical for SEO (prevents orphan pages).
 *
 * IMPORTANT: Every blog post should appear in at least one cluster.
 * Posts can appear in multiple clusters if relevant.
 */
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
      // Previously orphaned posts
      "bang-cuu-chuong-cho-be",
      "game-cong-tru-cho-be",
      "phep-tinh-don-gian-cho-be-mau-giao",
      "so-sanh-lon-nho-nhieu-it-cho-be",
      "nhan-biet-hinh-dang",
      "day-be-nhan-biet-tien",
      "sudoku-cho-be-mam-non",
      "day-be-phep-cong-trong-pham-vi-10",
    ],
  },
  logic: {
    heading: "Cụm nội dung Tư Duy Logic",
    description: "Chuỗi bài viết giúp ba mẹ phát triển tư duy quan sát, tìm quy luật và định hướng không gian cho bé.",
    blogSlugs: [
      "hoc-quy-luat-logic",
      "day-be-tu-duy-logic",
      "tro-choi-tim-diem-khac-biet",
      "me-cung-cho-be",
      "bai-tap-tu-duy-tim-hinh-khac-loai",
      // Previously orphaned posts
      "loi-ich-tro-choi-tri-tue",
      "sudoku-cho-be-mam-non",
      "cach-ren-luyen-su-tap-trung-cho-tre-mam-non",
      "phat-trien-tri-nho-cho-tre-mam-non",
    ],
  },
  language: {
    heading: "Cụm nội dung Ngôn Ngữ",
    description: "Tập trung vào bảng chữ cái, dấu thanh, ghép vần và các nền tảng tập đọc tiếng Việt cho bé.",
    blogSlugs: [
      "hoc-bang-chu-cai-tieng-viet",
      "day-be-hoc-bang-chu-cai-tai-nha",
      "dau-tieng-viet-cho-be",
      "be-hoc-ghep-van",
      "day-tre-tap-doc-som",
      // Previously orphaned posts
      "day-be-ghep-van-tai-nha",
      "day-be-hoc-tu-vung-tieng-viet",
      "game-hoc-chu-cho-be",
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
      // Previously orphaned posts
      "the-gioi-khung-long",
      "tim-hieu-hoa-va-cay",
      "nhan-biet-trai-cay",
      "day-be-nhan-biet-trai-cay-rau-cu",
      "kham-pha-thoi-tiet-cung-be",
      "be-hoc-ve-co-the-nguoi",
      "kham-pha-mon-an",
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
      // Previously orphaned posts
      "day-be-giu-ve-sinh-ca-nhan",
      "day-be-quan-ly-cam-xuc",
      "goi-ten-cam-xuc",
      "day-be-lam-viec-nha",
      "ky-nang-tu-phuc-vu-cho-be",
      "hoc-nghe-nghiep",
      "khung-hoang-tuoi-len-3",
      "lich-sinh-hoat-cho-be-mam-non",
      "nguy-hiem-khi-giao-xe-may-cho-hoc-sinh",
      "phong-chong-bao-hanh-tre-em",
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
      "mau-sac-cho-tre-mau-giao",
      "be-hoc-pha-mau-nghe-thuat",
      "be-tap-to-mau-sang-tao",
      "day-be-ve-tranh-don-gian",
      // Previously orphaned posts
      "day-be-to-mau-dung-cach",
    ],
  },
  history: {
    heading: "Cụm nội dung Lịch Sử",
    description: "Nhóm chủ đề lịch sử đang được cập nhật thêm nội dung.",
    blogSlugs: [],
  },
};

/**
 * Cross-cutting "general parenting" posts that should be linked from
 * the blog listing page and age-based pages, not tied to a single subject.
 * These include age-milestone guides, early education philosophy,
 * and screen-time management.
 */
export const GENERAL_PARENTING_SLUGS = [
  "be-2-tuoi-nen-hoc-gi",
  "be-3-tuoi-nen-hoc-gi",
  "be-4-tuoi-nen-hoc-gi",
  "be-5-tuoi-can-biet-nhung-gi",
  "be-6-tuoi-nen-hoc-gi",
  "be-chuan-bi-vao-lop-1-can-hoc-gi",
  "giao-duc-som-la-gi",
  "tre-xem-tivi-dien-thoai-qua-nhieu",
  "day-be-hoc-qua-tro-choi",
];
