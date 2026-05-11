import fs from "fs";
import path from "path";
import https from "https";
import crypto from "crypto";
import { fileURLToPath } from "url";

// ============================================================
// gsc-indexing-check.ts
// Check URL indexing status via Google Search Console URL Inspection API
//
// Usage:
//   npx tsx scripts/gsc-indexing-check.ts                     # Check all sitemap URLs
//   npx tsx scripts/gsc-indexing-check.ts --limit 10          # Check first 10 URLs
//   npx tsx scripts/gsc-indexing-check.ts --filter /blogs     # Only check /blogs URLs
//   npx tsx scripts/gsc-indexing-check.ts --filter /games     # Only check /games URLs
// ============================================================

const __filename2 = fileURLToPath(import.meta.url);
const __dirname2 = path.dirname(__filename2);

const SITE_URL = "sc-domain:cuthongminh.com";
const SITE_URL_FOR_INSPECTION = "https://cuthongminh.com/";
const SERVICE_ACCOUNT_PATH = path.join(
  __dirname2,
  "..",
  "config",
  "google-service-account.json"
);
const REPORT_OUTPUT = path.join(__dirname2, "gsc-indexing-report.json");
const SITEMAP_URL = "https://cuthongminh.com/sitemap.xml";

// Rate limiting: GSC allows 2000 requests/day, ~600/min
const DELAY_BETWEEN_REQUESTS_MS = 1200; // ~50 req/min to be safe

// ============================================================
// JWT Auth
// ============================================================

function base64url(data: string | Buffer): string {
  return Buffer.from(data)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function createJwt(serviceAccount: any, scopes: string[]): string {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: serviceAccount.client_email,
    scope: scopes.join(" "),
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

  const headerB64 = base64url(JSON.stringify(header));
  const payloadB64 = base64url(JSON.stringify(payload));
  const signInput = `${headerB64}.${payloadB64}`;

  const sign = crypto.createSign("RSA-SHA256");
  sign.update(signInput);
  const signature = sign
    .sign(serviceAccount.private_key)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return `${signInput}.${signature}`;
}

async function getAccessToken(serviceAccount: any): Promise<string> {
  // URL Inspection API requires full webmasters scope (not readonly)
  const jwt = createJwt(serviceAccount, [
    "https://www.googleapis.com/auth/webmasters",
  ]);

  return new Promise((resolve, reject) => {
    const postData = `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`;

    const req = https.request(
      {
        hostname: "oauth2.googleapis.com",
        path: "/token",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": Buffer.byteLength(postData),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk: any) => (data += chunk));
        res.on("end", () => {
          const json = JSON.parse(data);
          if (json.access_token) resolve(json.access_token);
          else reject(new Error(`Token error: ${data}`));
        });
      }
    );
    req.on("error", reject);
    req.write(postData);
    req.end();
  });
}

// ============================================================
// HTTP helpers
// ============================================================

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

function httpsGet(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const req = https.request(
      {
        hostname: parsed.hostname,
        path: parsed.pathname + parsed.search,
        method: "GET",
      },
      (res) => {
        let data = "";
        res.on("data", (chunk: any) => (data += chunk));
        res.on("end", () => resolve(data));
      }
    );
    req.on("error", reject);
    req.end();
  });
}

// ============================================================
// Sitemap parser (simple XML extraction)
// ============================================================

function extractUrlsFromSitemap(xml: string): string[] {
  const urls: string[] = [];
  const regex = /<loc>([^<]+)<\/loc>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

// ============================================================
// URL Inspection API
// ============================================================

const INSPECTION_API =
  "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect";

interface InspectionResult {
  url: string;
  verdict: string;
  coverageState: string;
  robotsTxtState: string;
  indexingState: string;
  lastCrawlTime: string;
  pageFetchState: string;
  crawledAs: string;
  referringUrls: string[];
  sitemap: string[];
  error?: string;
}

async function inspectUrl(
  accessToken: string,
  inspectionUrl: string
): Promise<InspectionResult> {
  const body = {
    inspectionUrl,
    siteUrl: SITE_URL_FOR_INSPECTION,
  };

  try {
    const result = await httpsPost(INSPECTION_API, accessToken, body);

    if (result.error) {
      return {
        url: inspectionUrl,
        verdict: "ERROR",
        coverageState: result.error.message || "API Error",
        robotsTxtState: "",
        indexingState: "",
        lastCrawlTime: "",
        pageFetchState: "",
        crawledAs: "",
        referringUrls: [],
        sitemap: [],
        error: result.error.message,
      };
    }

    const inspection = result.inspectionResult?.indexStatusResult || {};

    return {
      url: inspectionUrl,
      verdict: inspection.verdict || "UNKNOWN",
      coverageState: inspection.coverageState || "UNKNOWN",
      robotsTxtState: inspection.robotsTxtState || "UNKNOWN",
      indexingState: inspection.indexingState || "UNKNOWN",
      lastCrawlTime: inspection.lastCrawlTime || "",
      pageFetchState: inspection.pageFetchState || "UNKNOWN",
      crawledAs: inspection.crawledAs || "UNKNOWN",
      referringUrls: inspection.referringUrls || [],
      sitemap: inspection.sitemap || [],
    };
  } catch (error: any) {
    return {
      url: inspectionUrl,
      verdict: "ERROR",
      coverageState: error.message,
      robotsTxtState: "",
      indexingState: "",
      lastCrawlTime: "",
      pageFetchState: "",
      crawledAs: "",
      referringUrls: [],
      sitemap: [],
      error: error.message,
    };
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ============================================================
// Console formatters
// ============================================================

function printSection(title: string) {
  console.log("\n" + "=".repeat(70));
  console.log(`  ${title}`);
  console.log("=".repeat(70));
}

function statusEmoji(verdict: string): string {
  switch (verdict) {
    case "PASS":
      return "✅";
    case "PARTIAL":
      return "⚠️";
    case "FAIL":
      return "❌";
    case "NEUTRAL":
      return "⬜";
    case "ERROR":
      return "🔴";
    default:
      return "❓";
  }
}

function shortUrl(url: string): string {
  return url.replace("https://cuthongminh.com", "");
}

// ============================================================
// MAIN
// ============================================================

async function main() {
  const args = process.argv.slice(2);

  // Parse --limit flag
  let limit = Infinity;
  const limitIdx = args.indexOf("--limit");
  if (limitIdx !== -1 && args[limitIdx + 1]) {
    limit = parseInt(args[limitIdx + 1], 10);
  }

  // Parse --filter flag
  let filter = "";
  const filterIdx = args.indexOf("--filter");
  if (filterIdx !== -1 && args[filterIdx + 1]) {
    filter = args[filterIdx + 1];
  }

  console.log("Google Search Console - URL Indexing Status Check");
  console.log("=".repeat(70));
  console.log(`Site: cuthongminh.com`);
  if (filter) console.log(`Filter: ${filter}`);
  if (limit < Infinity) console.log(`Limit: ${limit} URLs`);

  // Check service account
  if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
    console.error(
      `\n❌ Service account key not found at:\n   ${SERVICE_ACCOUNT_PATH}`
    );
    process.exit(1);
  }

  // Load service account & get access token
  const serviceAccount = JSON.parse(
    fs.readFileSync(SERVICE_ACCOUNT_PATH, "utf-8")
  );
  console.log(`\nAuthenticating as: ${serviceAccount.client_email}`);

  const accessToken = await getAccessToken(serviceAccount);
  console.log("✅ Auth OK\n");

  // Fetch sitemap
  console.log("Fetching sitemap...");
  const sitemapXml = await httpsGet(SITEMAP_URL);
  let urls = extractUrlsFromSitemap(sitemapXml);
  console.log(`Found ${urls.length} URLs in sitemap`);

  // Apply filter
  if (filter) {
    urls = urls.filter((url) => url.includes(filter));
    console.log(`After filter "${filter}": ${urls.length} URLs`);
  }

  // Apply limit
  if (limit < urls.length) {
    urls = urls.slice(0, limit);
    console.log(`Limited to ${limit} URLs`);
  }

  // Inspect each URL
  printSection(
    `INSPECTING ${urls.length} URLs (delay: ${DELAY_BETWEEN_REQUESTS_MS}ms between requests)`
  );

  const results: InspectionResult[] = [];
  const startTime = Date.now();

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const short = shortUrl(url);
    process.stdout.write(
      `  [${i + 1}/${urls.length}] ${short.padEnd(55)} `
    );

    const result = await inspectUrl(accessToken, url);
    results.push(result);

    console.log(`${statusEmoji(result.verdict)} ${result.coverageState}`);

    // Rate limiting
    if (i < urls.length - 1) {
      await sleep(DELAY_BETWEEN_REQUESTS_MS);
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\nCompleted in ${elapsed}s`);

  // ============================================================
  // ANALYSIS
  // ============================================================

  // Group by verdict
  const byVerdict = new Map<string, InspectionResult[]>();
  for (const r of results) {
    const key = r.verdict;
    if (!byVerdict.has(key)) byVerdict.set(key, []);
    byVerdict.get(key)!.push(r);
  }

  // Group by coverage state
  const byCoverage = new Map<string, InspectionResult[]>();
  for (const r of results) {
    const key = r.coverageState;
    if (!byCoverage.has(key)) byCoverage.set(key, []);
    byCoverage.get(key)!.push(r);
  }

  // == SUMMARY ==
  printSection("SUMMARY");
  console.log(`\n  Total URLs checked: ${results.length}`);
  console.log("");

  for (const [verdict, items] of byVerdict) {
    const pct = ((items.length / results.length) * 100).toFixed(1);
    console.log(
      `  ${statusEmoji(verdict)} ${verdict.padEnd(12)} ${String(items.length).padStart(4)} URLs (${pct}%)`
    );
  }

  // == COVERAGE STATE BREAKDOWN ==
  printSection("COVERAGE STATE BREAKDOWN");
  for (const [state, items] of byCoverage) {
    console.log(`\n  📊 ${state}: ${items.length} URLs`);
    for (const item of items.slice(0, 10)) {
      console.log(`     ${shortUrl(item.url)}`);
    }
    if (items.length > 10) {
      console.log(`     ... and ${items.length - 10} more`);
    }
  }

  // == NOT INDEXED URLS ==
  const notIndexed = results.filter((r) => r.verdict !== "PASS");
  if (notIndexed.length > 0) {
    printSection(`NOT INDEXED URLS (${notIndexed.length})`);
    for (const r of notIndexed) {
      console.log(
        `\n  ${statusEmoji(r.verdict)} ${shortUrl(r.url)}`
      );
      console.log(`     Coverage: ${r.coverageState}`);
      console.log(`     Robots:   ${r.robotsTxtState}`);
      console.log(`     Indexing: ${r.indexingState}`);
      console.log(`     Fetch:    ${r.pageFetchState}`);
      if (r.lastCrawlTime) {
        console.log(`     Crawled:  ${r.lastCrawlTime}`);
      }
      if (r.crawledAs && r.crawledAs !== "UNKNOWN") {
        console.log(`     Agent:    ${r.crawledAs}`);
      }
      if (r.error) {
        console.log(`     Error:    ${r.error}`);
      }
    }
  }

  // == INDEXED URLS ==
  const indexed = results.filter((r) => r.verdict === "PASS");
  if (indexed.length > 0) {
    printSection(`INDEXED URLS (${indexed.length})`);
    for (const r of indexed) {
      const crawlInfo = r.lastCrawlTime
        ? ` | Last crawl: ${r.lastCrawlTime.split("T")[0]}`
        : "";
      console.log(
        `  ✅ ${shortUrl(r.url).padEnd(55)} ${r.crawledAs}${crawlInfo}`
      );
    }
  }

  // == RECOMMENDATIONS ==
  printSection("RECOMMENDATIONS");

  // Check common issues
  const discovered = results.filter(
    (r) =>
      r.coverageState.includes("Discovered") ||
      r.coverageState.includes("discovered")
  );
  const crawledNotIndexed = results.filter(
    (r) =>
      r.coverageState.includes("Crawled") &&
      r.coverageState.includes("not") &&
      r.coverageState.includes("indexed")
  );
  const blocked = results.filter(
    (r) =>
      r.robotsTxtState === "DISALLOWED" ||
      r.coverageState.includes("Blocked")
  );
  const fetchErrors = results.filter(
    (r) =>
      r.pageFetchState === "SOFT_404" ||
      r.pageFetchState === "NOT_FOUND" ||
      r.pageFetchState === "SERVER_ERROR"
  );
  const noIndex = results.filter(
    (r) => r.indexingState === "INDEXING_NOT_ALLOWED"
  );

  let recCount = 0;

  if (discovered.length > 0) {
    recCount++;
    console.log(
      `\n  ${recCount}. "Discovered - currently not indexed" (${discovered.length} URLs)`
    );
    console.log(
      "     → Google knows these pages but hasn't crawled them yet."
    );
    console.log("     → Possible causes:");
    console.log("       - Crawl budget exhaustion (too many pages for site authority)");
    console.log("       - Pages deemed low priority / thin content");
    console.log("       - Internal linking is weak — these pages are hard to reach");
    console.log("     → Actions:");
    console.log("       a. Strengthen internal links TO these pages from high-authority pages");
    console.log("       b. Ensure unique, high-quality content on each page");
    console.log("       c. Submit individual URLs via GSC 'Request Indexing'");
    console.log("       d. Build external backlinks to these pages");
  }

  if (crawledNotIndexed.length > 0) {
    recCount++;
    console.log(
      `\n  ${recCount}. "Crawled - currently not indexed" (${crawledNotIndexed.length} URLs)`
    );
    console.log(
      "     → Google crawled these pages but decided NOT to index them."
    );
    console.log("     → This typically means Google considers them:");
    console.log("       - Low-quality or thin content");
    console.log("       - Duplicate of another page");
    console.log("       - Not useful enough for search results");
    console.log("     → Actions:");
    console.log("       a. Improve content quality and uniqueness");
    console.log("       b. Add more original text (aim for 1500+ words for blogs)");
    console.log("       c. Check for duplicate content issues");
    console.log("       d. Add structured data / schema markup");
  }

  if (blocked.length > 0) {
    recCount++;
    console.log(
      `\n  ${recCount}. "Blocked by robots.txt" (${blocked.length} URLs)`
    );
    console.log("     → robots.txt is preventing Google from crawling.");
    console.log("     → Review robots.ts to ensure these pages aren't accidentally disallowed.");
  }

  if (fetchErrors.length > 0) {
    recCount++;
    console.log(
      `\n  ${recCount}. "Fetch errors" (${fetchErrors.length} URLs)`
    );
    console.log("     → Google couldn't properly fetch these pages.");
    console.log("     → Check for soft 404s, server errors, or redirect chains.");
  }

  if (noIndex.length > 0) {
    recCount++;
    console.log(
      `\n  ${recCount}. "noindex tag detected" (${noIndex.length} URLs)`
    );
    console.log("     → These pages have a noindex meta tag or X-Robots-Tag header.");
    console.log("     → If you WANT them indexed, remove the noindex directive.");
    for (const r of noIndex) {
      console.log(`     - ${shortUrl(r.url)}`);
    }
  }

  if (recCount === 0 && indexed.length === results.length) {
    console.log("\n  🎉 All checked URLs are indexed! Great job!");
  }

  // == Save JSON report ==
  const report = {
    generatedAt: new Date().toISOString(),
    totalUrls: results.length,
    indexed: indexed.length,
    notIndexed: notIndexed.length,
    summary: Object.fromEntries(
      Array.from(byVerdict.entries()).map(([k, v]) => [k, v.length])
    ),
    coverageBreakdown: Object.fromEntries(
      Array.from(byCoverage.entries()).map(([k, v]) => [
        k,
        v.map((r) => shortUrl(r.url)),
      ])
    ),
    results: results.map((r) => ({
      url: shortUrl(r.url),
      verdict: r.verdict,
      coverageState: r.coverageState,
      robotsTxtState: r.robotsTxtState,
      indexingState: r.indexingState,
      lastCrawlTime: r.lastCrawlTime,
      pageFetchState: r.pageFetchState,
      crawledAs: r.crawledAs,
      error: r.error,
    })),
  };

  fs.writeFileSync(REPORT_OUTPUT, JSON.stringify(report, null, 2), "utf-8");
  console.log(`\n📄 Full report saved to: ${REPORT_OUTPUT}`);
}

main().catch(console.error);
