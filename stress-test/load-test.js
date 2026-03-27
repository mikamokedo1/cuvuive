// =============================================================================
// K6 Load Test — Ramp to 100 concurrent users
// Mục đích: Kiểm tra server chịu được 100 users đồng thời không
// Chạy: k6 run stress-test/load-test.js
// =============================================================================

import http from "k6/http";
import { check, sleep, group } from "k6";
import { Counter, Trend } from "k6/metrics";
import {
  BASE_URL,
  STATIC_PAGES,
  BLOG_SLUGS,
  GAME_PAGES,
  DEFAULT_THRESHOLDS,
  randomItem,
} from "./k6-config.js";

// Custom metrics
const pageErrors = new Counter("page_errors");
const homepageDuration = new Trend("homepage_duration", true);
const blogDuration = new Trend("blog_duration", true);
const gameDuration = new Trend("game_duration", true);

export const options = {
  stages: [
    { duration: "30s", target: 10 },   // Warm up: 0 → 10 users
    { duration: "30s", target: 30 },   // Ramp: 10 → 30 users
    { duration: "1m", target: 50 },    // Ramp: 30 → 50 users
    { duration: "1m", target: 100 },   // Ramp: 50 → 100 users
    { duration: "2m", target: 100 },   // Hold: 100 users trong 2 phút
    { duration: "30s", target: 0 },    // Ramp down
  ],
  thresholds: {
    ...DEFAULT_THRESHOLDS,
    homepage_duration: ["p(95)<2000"],
    blog_duration: ["p(95)<3000"],
    game_duration: ["p(95)<3000"],
  },
};

export default function () {
  // Mô phỏng user flow thực tế: vào homepage → xem blog → chơi game

  // 1. Truy cập Homepage
  group("01_Homepage", function () {
    const res = http.get(`${BASE_URL}/`, {
      tags: { page: "homepage" },
    });
    const ok = check(res, {
      "homepage status 200": (r) => r.status === 200,
      "homepage has content": (r) => r.body && r.body.length > 1000,
    });
    homepageDuration.add(res.timings.duration);
    if (!ok) pageErrors.add(1);
    sleep(Math.random() * 2 + 1); // 1-3s think time
  });

  // 2. Xem danh sách blogs
  group("02_Blog_List", function () {
    const res = http.get(`${BASE_URL}/blogs`, {
      tags: { page: "blog_list" },
    });
    check(res, {
      "blog list status 200": (r) => r.status === 200,
    });
    sleep(Math.random() * 1 + 0.5);
  });

  // 3. Đọc 1 bài blog random
  group("03_Blog_Detail", function () {
    const slug = randomItem(BLOG_SLUGS);
    const res = http.get(`${BASE_URL}/blogs/${slug}`, {
      tags: { page: "blog_detail" },
    });
    const ok = check(res, {
      "blog detail status 200": (r) => r.status === 200,
      "blog has content": (r) => r.body && r.body.length > 500,
    });
    blogDuration.add(res.timings.duration);
    if (!ok) pageErrors.add(1);
    sleep(Math.random() * 3 + 2); // 2-5s đọc bài
  });

  // 4. Truy cập trang Games
  group("04_Games_List", function () {
    const res = http.get(`${BASE_URL}/games`, {
      tags: { page: "games_list" },
    });
    check(res, {
      "games list status 200": (r) => r.status === 200,
    });
    sleep(Math.random() * 1 + 0.5);
  });

  // 5. Vào 1 game random
  group("05_Game_Detail", function () {
    const game = randomItem(GAME_PAGES);
    const res = http.get(`${BASE_URL}${game}`, {
      tags: { page: "game_detail" },
    });
    const ok = check(res, {
      "game page status 200": (r) => r.status === 200,
      "game has content": (r) => r.body && r.body.length > 500,
    });
    gameDuration.add(res.timings.duration);
    if (!ok) pageErrors.add(1);
    sleep(Math.random() * 2 + 1);
  });

  // 6. Random: Xem thêm 1 trang static
  group("06_Random_Static", function () {
    const page = randomItem(STATIC_PAGES);
    const res = http.get(`${BASE_URL}${page}`, {
      tags: { page: "static" },
    });
    check(res, {
      "static page status 200": (r) => r.status === 200,
    });
    sleep(Math.random() * 1 + 0.5);
  });
}
