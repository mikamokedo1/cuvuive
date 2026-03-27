// =============================================================================
// K6 Stress Test — Tìm giới hạn server (vượt 100 users)
// Mục đích: Đẩy server tới giới hạn, tìm điểm sập
// ⚠️ CẢNH BÁO: Chỉ chạy ngoài giờ cao điểm (2-5am)
// Chạy: k6 run stress-test/stress-test.js
// =============================================================================

import http from "k6/http";
import { check, sleep, group } from "k6";
import { Counter, Rate, Trend } from "k6/metrics";
import {
  BASE_URL,
  BLOG_SLUGS,
  GAME_PAGES,
  STATIC_PAGES,
  randomItem,
} from "./k6-config.js";

// Custom metrics
const errorRate = new Rate("error_rate");
const slowRequests = new Counter("slow_requests");
const responseTimes = new Trend("response_time_trend", true);

export const options = {
  stages: [
    { duration: "1m", target: 50 },    // Warm up → 50 users
    { duration: "2m", target: 100 },   // Ramp → 100 users (mục tiêu)
    { duration: "3m", target: 100 },   // Hold 100 users — quan sát ổn định
    { duration: "1m", target: 150 },   // Push → 150 users
    { duration: "2m", target: 200 },   // Push → 200 users (tìm giới hạn)
    { duration: "1m", target: 0 },     // Cool down
  ],
  thresholds: {
    error_rate: ["rate<0.10"],                       // <10% error rate
    http_req_duration: ["p(95)<5000", "p(99)<8000"], // tolerant thresholds
    http_req_failed: ["rate<0.10"],
  },
};

export default function () {
  // Mô phỏng mixed traffic — mỗi VU chọn random 1 trong 3 scenarios

  const scenario = Math.random();

  if (scenario < 0.4) {
    // 40% users: Browsing flow (homepage → blog)
    browsingFlow();
  } else if (scenario < 0.75) {
    // 35% users: Gaming flow (games list → game detail)
    gamingFlow();
  } else {
    // 25% users: Quick browse (random static pages)
    quickBrowseFlow();
  }
}

function browsingFlow() {
  group("Browsing Flow", function () {
    let res = http.get(`${BASE_URL}/`);
    trackResponse(res, "homepage");
    sleep(randomThinkTime());

    res = http.get(`${BASE_URL}/blogs`);
    trackResponse(res, "blog_list");
    sleep(randomThinkTime());

    // Đọc 2 bài blog
    for (let i = 0; i < 2; i++) {
      const slug = randomItem(BLOG_SLUGS);
      res = http.get(`${BASE_URL}/blogs/${slug}`);
      trackResponse(res, "blog_detail");
      sleep(randomThinkTime() * 1.5); // đọc lâu hơn
    }
  });
}

function gamingFlow() {
  group("Gaming Flow", function () {
    let res = http.get(`${BASE_URL}/games`);
    trackResponse(res, "games_list");
    sleep(randomThinkTime());

    // Vào 2-3 games
    const numGames = Math.floor(Math.random() * 2) + 2;
    for (let i = 0; i < numGames; i++) {
      const game = randomItem(GAME_PAGES);
      res = http.get(`${BASE_URL}${game}`);
      trackResponse(res, "game_detail");
      sleep(randomThinkTime() * 2); // chơi game lâu hơn
    }
  });
}

function quickBrowseFlow() {
  group("Quick Browse", function () {
    const pages = STATIC_PAGES.slice(); // copy
    // Visit 2-3 random static pages
    const numPages = Math.floor(Math.random() * 2) + 2;
    for (let i = 0; i < numPages; i++) {
      const page = randomItem(pages);
      const res = http.get(`${BASE_URL}${page}`);
      trackResponse(res, "static");
      sleep(randomThinkTime());
    }
  });
}

function trackResponse(res, pageName) {
  const ok = check(res, {
    [`${pageName} status 200`]: (r) => r.status === 200,
    [`${pageName} load < 5s`]: (r) => r.timings.duration < 5000,
  });
  errorRate.add(!ok);
  responseTimes.add(res.timings.duration);
  if (res.timings.duration > 5000) {
    slowRequests.add(1);
  }
}

function randomThinkTime() {
  return Math.random() * 2 + 1; // 1-3 seconds
}
