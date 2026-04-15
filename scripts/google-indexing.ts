// Polyfill for Node 16 (googleapis v171+ expects global Headers)
if (typeof globalThis.Headers === "undefined") {
  (globalThis as any).Headers = class Headers {
    private _headers: Record<string, string> = {};
    constructor(init?: Record<string, string> | [string, string][]) {
      if (init) {
        if (Array.isArray(init)) {
          for (const [k, v] of init) this._headers[k.toLowerCase()] = v;
        } else {
          for (const [k, v] of Object.entries(init)) this._headers[k.toLowerCase()] = v;
        }
      }
    }
    get(name: string) { return this._headers[name.toLowerCase()] ?? null; }
    set(name: string, value: string) { this._headers[name.toLowerCase()] = value; }
    has(name: string) { return name.toLowerCase() in this._headers; }
    delete(name: string) { delete this._headers[name.toLowerCase()]; }
    forEach(cb: (value: string, key: string) => void) {
      for (const [k, v] of Object.entries(this._headers)) cb(v, k);
    }
    entries() { return Object.entries(this._headers)[Symbol.iterator](); }
    keys() { return Object.keys(this._headers)[Symbol.iterator](); }
    values() { return Object.values(this._headers)[Symbol.iterator](); }
    [Symbol.iterator]() { return this.entries(); }
  };
}
if (typeof globalThis.Request === "undefined") {
  (globalThis as any).Request = class Request {
    url: string;
    method: string;
    headers: any;
    body: any;
    constructor(url: string, init?: any) {
      this.url = url;
      this.method = init?.method || "GET";
      this.headers = new (globalThis as any).Headers(init?.headers);
      this.body = init?.body || null;
    }
  };
}
if (typeof globalThis.Response === "undefined") {
  (globalThis as any).Response = class Response {
    body: any;
    status: number;
    headers: any;
    constructor(body?: any, init?: any) {
      this.body = body;
      this.status = init?.status || 200;
      this.headers = new (globalThis as any).Headers(init?.headers);
    }
    async text() { return String(this.body); }
    async json() { return JSON.parse(String(this.body)); }
  };
}

import { google } from "googleapis";
import fs from "fs";
import path from "path";
import https from "https";
import path from "path";

// ============================================================
// google-indexing.ts
// Kiểm tra trạng thái indexing + submit trang chưa index
//
// Usage:
//   npx tsx scripts/google-indexing.ts              # Check + Submit
//   npx tsx scripts/google-indexing.ts --submit-only # Chỉ submit (skip check)
//   npx tsx scripts/google-indexing.ts --check-only  # Chỉ check (skip submit)
// ============================================================

const SITE_URL = "https://cuthongminh.com";
const SITE_URL_VARIANTS = [
  "sc-domain:cuthongminh.com",
  "https://cuthongminh.com/",
  "https://cuthongminh.com",
];
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
const MAX_SUBMIT = 10;

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File paths
const SCRIPTS_DIR = __dirname;
const INDEXED_LOG_FILE = path.join(SCRIPTS_DIR, "indexed-urls.log");
const NOT_INDEXED_FILE = path.join(SCRIPTS_DIR, "not-indexed-urls.log");
const SERVICE_ACCOUNT_PATH = path.join(
  SCRIPTS_DIR,
  "..",
  "config",
  "google-service-account.json"
);

let activeSiteUrl = SITE_URL_VARIANTS[0];

// ============================================================
// URL helpers
// ============================================================

function getUrlPriority(url: string): number {
  if (url === SITE_URL || url === `${SITE_URL}/`) return 0;
  if (url.includes("/games/") && !url.endsWith("/games")) return 1;
  if (
    url.match(
      /\/(games|tro-choi|am-nhac|khoa-hoc|ky-nang|dia-ly|hoc-tieng)/
    ) &&
    !url.includes("/games/")
  )
    return 2;
  if (
    url.includes("/blogs/") &&
    !url.includes("/tag/") &&
    !url.endsWith("/blogs")
  )
    return 3;
  if (url.endsWith("/blogs") || url.endsWith("/games")) return 4;
  if (url.includes("/blogs/tag/")) return 5;
  return 6;
}

function getUrlCategory(url: string): string {
  if (url === SITE_URL || url === `${SITE_URL}/`) return "🏠 Homepage";
  if (url.includes("/games/")) return "🎮 Game";
  if (url.includes("/blogs/tag/")) return "🏷️  Tag";
  if (url.includes("/blogs/")) return "📝 Blog";
  if (
    url.match(
      /\/(tro-choi|am-nhac|khoa-hoc|ky-nang|dia-ly|hoc-tieng|tro-choi-my-thuat|tro-choi-toan-hoc)/
    )
  )
    return "📂 Category";
  return "📄 Page";
}

// ============================================================
// Log file management
// ============================================================

function loadLogFile(filePath: string): Set<string> {
  if (!fs.existsSync(filePath)) return new Set();
  const content = fs.readFileSync(filePath, "utf-8").trim();
  if (!content) return new Set();
  return new Set(content.split("\n").filter(Boolean));
}

function appendToLog(filePath: string, urls: string[]) {
  if (urls.length === 0) return;
  const existing = loadLogFile(filePath);
  const newUrls = urls.filter((u) => !existing.has(u));
  if (newUrls.length === 0) return;
  fs.appendFileSync(filePath, newUrls.join("\n") + "\n", "utf-8");
}

function overwriteLog(filePath: string, urls: string[]) {
  fs.writeFileSync(filePath, urls.join("\n") + "\n", "utf-8");
}

// ============================================================
// Sitemap fetching
// ============================================================

async function fetchSitemapUrls(): Promise<string[]> {
  console.log(`📡 Fetching sitemap from ${SITEMAP_URL}...`);
  const response = await fetch(SITEMAP_URL);
  const xml = await response.text();

  const urls: string[] = [];
  const locRegex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = locRegex.exec(xml)) !== null) {
    urls.push(match[1]);
  }
  console.log(`   Found ${urls.length} URLs in sitemap`);
  return urls;
}

// ============================================================
// Auto-detect Search Console property format
// ============================================================

async function detectSiteUrl(auth: any): Promise<string> {
  const searchconsole = google.searchconsole({ version: "v1", auth });
  console.log("\n🔗 Detecting Search Console property format...");

  for (const variant of SITE_URL_VARIANTS) {
    try {
      await searchconsole.urlInspection.index.inspect({
        requestBody: {
          inspectionUrl: SITE_URL,
          siteUrl: variant,
        },
      });
      console.log(`   ✅ Using: ${variant}\n`);
      return variant;
    } catch (e: any) {
      console.log(`   ❌ ${variant}`);
    }
  }

  throw new Error(
    "Could not detect Search Console property format. Check service account permissions."
  );
}

// ============================================================
// CHECK: Scan indexing status
// ============================================================

async function checkIndexing(auth: any, urls: string[]): Promise<{
  indexed: string[];
  notIndexed: string[];
}> {
  const searchconsole = google.searchconsole({ version: "v1", auth });
  const indexed: string[] = [];
  const notIndexed: string[] = [];
  const total = urls.length;

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const num = `[${i + 1}/${total}]`;

    try {
      const result = await searchconsole.urlInspection.index.inspect({
        requestBody: {
          inspectionUrl: url,
          siteUrl: activeSiteUrl,
        },
      });

      const verdict =
        result.data.inspectionResult?.indexStatusResult?.verdict;
      const coverageState =
        result.data.inspectionResult?.indexStatusResult?.coverageState;
      const cat = getUrlCategory(url);

      if (verdict === "PASS") {
        indexed.push(url);
        console.log(`${num} ✅ ${cat} ${decodeURIComponent(url)}`);
      } else {
        notIndexed.push(url);
        console.log(
          `${num} ❌ ${cat} ${decodeURIComponent(url)} (${coverageState || verdict || "unknown"})`
        );
      }

      await new Promise((r) => setTimeout(r, 200));
    } catch (error: any) {
      const msg = error?.message || "Unknown error";

      if (msg.includes("Quota exceeded") || msg.includes("rateLimitExceeded")) {
        console.error(
          `\n⚠️  API quota exceeded after ${i + 1} requests. Saving partial results...`
        );
        break;
      }

      notIndexed.push(url);
      console.log(`${num} ⚠️  ${decodeURIComponent(url)} (${msg.slice(0, 60)})`);
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  return { indexed, notIndexed };
}

function httpsPost(url: string, accessToken: string, body: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(body);
    const parsed = new URL(url);

    const req = https.request(
      {
        hostname: parsed.hostname,
        path: parsed.pathname + parsed.search,
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(postData),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk: any) => (data += chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch {
            reject(new Error(`Parse error: ${data}`));
          }
        });
      }
    );
    req.on("error", reject);
    req.write(postData);
    req.end();
  });
}

// ============================================================
// SUBMIT: Submit non-indexed URLs via Indexing API
// ============================================================

async function submitUrls(
  auth: any,
  urls: string[]
): Promise<{ submitted: string[]; failed: string[] }> {
  const token = await auth.getAccessToken();
  const submitted: string[] = [];
  const failed: string[] = [];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const num = `[${i + 1}/${urls.length}]`;

    try {
      const response = await httpsPost(
        "https://indexing.googleapis.com/v3/urlNotifications:publish",
        token,
        { url, type: "URL_UPDATED" }
      );

      if (response.error) {
        throw new Error(response.error.message || "API Error");
      }

      submitted.push(url);
      console.log(`${num} ✅ ${getUrlCategory(url)} ${decodeURIComponent(url)}`);
    } catch (error: any) {
      const msg = error?.message || "Unknown error";
      failed.push(url);
      console.log(`${num} ❌ ${decodeURIComponent(url)} — ${msg.slice(0, 80)}`);
    }

    await new Promise((r) => setTimeout(r, 300));
  }

  return { submitted, failed };
}

// ============================================================
// MAIN
// ============================================================

async function main() {
  const args = process.argv.slice(2);
  const submitOnly = args.includes("--submit-only");
  const checkOnly = args.includes("--check-only");

  console.log("🔍 Google Indexing Tool");
  console.log("=".repeat(50));
  console.log(`📌 Site: ${SITE_URL}`);
  console.log(
    `⚙️  Mode: ${submitOnly ? "Submit Only" : checkOnly ? "Check Only" : "Check + Submit"}`
  );

  // Check service account
  if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
    console.error(`\n❌ Service account key not found at:\n   ${SERVICE_ACCOUNT_PATH}`);
    console.error("📋 See SKILL.md for setup instructions.");
    process.exit(1);
  }

  // Load existing indexed URLs log
  const knownIndexed = loadLogFile(INDEXED_LOG_FILE);
  console.log(`📋 Known indexed URLs (from log): ${knownIndexed.size}`);

  // ── SUBMIT ONLY MODE ──
  if (submitOnly) {
    const notIndexedLog = loadLogFile(NOT_INDEXED_FILE);
    if (notIndexedLog.size === 0) {
      console.log("\n❌ No not-indexed URLs found. Run without --submit-only first.");
      process.exit(1);
    }

    const urlsToSubmit = Array.from(notIndexedLog)
      .sort((a, b) => getUrlPriority(a) - getUrlPriority(b))
      .slice(0, MAX_SUBMIT);

    console.log(`\n📤 Submitting ${urlsToSubmit.length} URLs...\n`);

    const authSubmit = new google.auth.GoogleAuth({
      keyFile: SERVICE_ACCOUNT_PATH,
      scopes: ["https://www.googleapis.com/auth/indexing"],
    });

    const { submitted, failed } = await submitUrls(authSubmit, urlsToSubmit);

    // Add submitted URLs to indexed log (treat as indexed)
    appendToLog(INDEXED_LOG_FILE, submitted);

    // Remove submitted URLs from not-indexed log
    const remaining = Array.from(notIndexedLog).filter(
      (u) => !submitted.includes(u)
    );
    overwriteLog(NOT_INDEXED_FILE, remaining);

    printSubmitSummary(submitted, failed, remaining.length);
    return;
  }

  // ── CHECK MODE (with optional submit) ──
  const authCheck = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_PATH,
    scopes: [
      "https://www.googleapis.com/auth/webmasters.readonly",
      "https://www.googleapis.com/auth/indexing",
    ],
  });

  // Detect siteUrl format
  activeSiteUrl = await detectSiteUrl(authCheck);

  // Fetch sitemap URLs
  const allUrls = await fetchSitemapUrls();

  // Filter out already known indexed URLs
  const urlsToCheck = allUrls.filter((u) => !knownIndexed.has(u));
  const skippedCount = allUrls.length - urlsToCheck.length;

  console.log(`⏭️  Skipping ${skippedCount} already-indexed URLs`);
  console.log(`🔎 Checking ${urlsToCheck.length} URLs...\n`);

  // Sort by priority
  urlsToCheck.sort((a, b) => getUrlPriority(a) - getUrlPriority(b));

  // Check indexing status
  const { indexed, notIndexed } = await checkIndexing(authCheck, urlsToCheck);

  // Update logs
  appendToLog(INDEXED_LOG_FILE, indexed);
  overwriteLog(NOT_INDEXED_FILE, notIndexed);

  // Print check summary
  const totalIndexed = knownIndexed.size + indexed.length;
  console.log("\n" + "=".repeat(50));
  console.log("📊 CHECK REPORT");
  console.log("=".repeat(50));
  console.log(`📄 Total URLs in sitemap: ${allUrls.length}`);
  console.log(`⏭️  Skipped (already known): ${skippedCount}`);
  console.log(`🔎 Checked this run: ${urlsToCheck.length}`);
  console.log(`✅ Indexed (total): ${totalIndexed}`);
  console.log(`❌ Not indexed: ${notIndexed.length}`);
  console.log(
    `📊 Index rate: ${((totalIndexed / allUrls.length) * 100).toFixed(1)}%`
  );
  console.log(`💾 Logs saved to: ${SCRIPTS_DIR}/`);

  if (checkOnly) {
    if (notIndexed.length > 0) {
      console.log(
        `\n💡 Run \`npx tsx scripts/google-indexing.ts --submit-only\` to submit non-indexed pages`
      );
    }
    return;
  }

  // ── AUTO SUBMIT ──
  if (notIndexed.length === 0) {
    console.log("\n🎉 All pages are indexed! Nothing to submit.");
    return;
  }

  const urlsToSubmit = notIndexed
    .sort((a, b) => getUrlPriority(a) - getUrlPriority(b))
    .slice(0, MAX_SUBMIT);

  console.log(`\n📤 Submitting top ${urlsToSubmit.length} non-indexed URLs...\n`);

  const { submitted, failed } = await submitUrls(authCheck, urlsToSubmit);

  // Add submitted URLs to indexed log
  appendToLog(INDEXED_LOG_FILE, submitted);

  // Remove submitted from not-indexed log
  const remaining = notIndexed.filter((u) => !submitted.includes(u));
  overwriteLog(NOT_INDEXED_FILE, remaining);

  printSubmitSummary(submitted, failed, remaining.length);
}

function printSubmitSummary(
  submitted: string[],
  failed: string[],
  remaining: number
) {
  console.log("\n" + "=".repeat(50));
  console.log("📊 SUBMIT REPORT");
  console.log("=".repeat(50));
  console.log(`✅ Submitted: ${submitted.length}`);
  if (failed.length > 0) console.log(`❌ Failed: ${failed.length}`);
  console.log(`📄 Remaining not-indexed: ${remaining}`);

  if (remaining > 0) {
    console.log(
      `\n💡 Run again tomorrow: npx tsx scripts/google-indexing.ts --submit-only`
    );
  } else {
    console.log("\n🎯 All non-indexed URLs have been submitted!");
  }
  console.log(
    "⏰ Note: Google may take hours/days to actually crawl and index"
  );
}

main().catch(console.error);
