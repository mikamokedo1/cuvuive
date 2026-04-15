import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

// ============================================================
// gsc-analytics.ts
// Pull Google Search Console performance data & generate report
//
// Usage:
//   npx tsx scripts/gsc-analytics.ts                    # Last 28 days
//   npx tsx scripts/gsc-analytics.ts --days 7           # Last 7 days
//   npx tsx scripts/gsc-analytics.ts --days 90          # Last 90 days
//   npx tsx scripts/gsc-analytics.ts --compare          # Compare previous period
// ============================================================

const __filename2 = fileURLToPath(import.meta.url);
const __dirname2 = path.dirname(__filename2);

const SITE_URL_VARIANTS = [
  "sc-domain:cuthongminh.com",
  "https://cuthongminh.com/",
  "https://cuthongminh.com",
];
let SITE_URL = SITE_URL_VARIANTS[0];
const SERVICE_ACCOUNT_PATH = path.join(
  __dirname2,
  "..",
  "config",
  "google-service-account.json"
);
const REPORT_OUTPUT = path.join(__dirname2, "gsc-report.json");

// ============================================================
// JWT Auth (manual, no googleapis dependency for API calls)
// ============================================================

import crypto from "crypto";

function base64url(data: string | Buffer): string {
  return Buffer.from(data)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function createJwt(
  serviceAccount: any,
  scopes: string[]
): string {
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
  const jwt = createJwt(serviceAccount, [
    "https://www.googleapis.com/auth/webmasters.readonly",
  ]);

  return new Promise((resolve, reject) => {
    const postData =
      `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`;

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
// HTTP helper
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

// ============================================================
// Date helpers
// ============================================================

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function getDateRange(days: number): { startDate: string; endDate: string } {
  const end = new Date();
  end.setDate(end.getDate() - 2); // GSC data has ~2 day lag
  const start = new Date(end);
  start.setDate(start.getDate() - days);
  return { startDate: formatDate(start), endDate: formatDate(end) };
}

function getPreviousPeriod(
  startDate: string,
  endDate: string
): { startDate: string; endDate: string } {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = end.getTime() - start.getTime();
  const prevEnd = new Date(start);
  prevEnd.setDate(prevEnd.getDate() - 1);
  const prevStart = new Date(prevEnd.getTime() - diff);
  return { startDate: formatDate(prevStart), endDate: formatDate(prevEnd) };
}

// ============================================================
// GSC API queries
// ============================================================

const GSC_API =
  "https://www.googleapis.com/webmasters/v3/sites";

async function querySearchAnalytics(
  accessToken: string,
  startDate: string,
  endDate: string,
  dimensions: string[],
  rowLimit: number = 1000
): Promise<any[]> {
  const encodedSite = encodeURIComponent(SITE_URL);
  const url = `${GSC_API}/${encodedSite}/searchAnalytics/query`;

  try {
    const result = await httpsPost(url, accessToken, {
      startDate,
      endDate,
      dimensions,
      rowLimit,
      dataState: "all",
    });

    if (result.error) {
      console.error(`❌ API Error: ${result.error.message}`);
      return [];
    }

    return result.rows || [];
  } catch (error: any) {
    console.error(`❌ Request Error: ${error.message}`);
    return [];
  }
}

// ============================================================
// Report generators
// ============================================================

async function getOverviewMetrics(
  accessToken: string,
  startDate: string,
  endDate: string
) {
  const rows = await querySearchAnalytics(
    accessToken,
    startDate,
    endDate,
    ["date"]
  );

  let totalClicks = 0;
  let totalImpressions = 0;
  let totalPosition = 0;
  let count = 0;

  const dailyData: {
    date: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }[] = [];

  for (const row of rows) {
    totalClicks += row.clicks || 0;
    totalImpressions += row.impressions || 0;
    totalPosition += row.position || 0;
    count++;

    dailyData.push({
      date: row.keys[0],
      clicks: row.clicks || 0,
      impressions: row.impressions || 0,
      ctr: row.ctr || 0,
      position: row.position || 0,
    });
  }

  return {
    totalClicks,
    totalImpressions,
    avgCtr: totalImpressions > 0 ? totalClicks / totalImpressions : 0,
    avgPosition: count > 0 ? totalPosition / count : 0,
    dailyData,
  };
}

async function getTopQueries(
  accessToken: string,
  startDate: string,
  endDate: string,
  limit: number = 50
) {
  const rows = await querySearchAnalytics(
    accessToken,
    startDate,
    endDate,
    ["query"],
    limit
  );

  return rows.map((row: any) => ({
    query: row.keys[0],
    clicks: row.clicks || 0,
    impressions: row.impressions || 0,
    ctr: row.ctr || 0,
    position: row.position || 0,
  }));
}

async function getTopPages(
  accessToken: string,
  startDate: string,
  endDate: string,
  limit: number = 50
) {
  const rows = await querySearchAnalytics(
    accessToken,
    startDate,
    endDate,
    ["page"],
    limit
  );

  return rows.map((row: any) => ({
    page: row.keys[0],
    clicks: row.clicks || 0,
    impressions: row.impressions || 0,
    ctr: row.ctr || 0,
    position: row.position || 0,
  }));
}

async function getDeviceBreakdown(
  accessToken: string,
  startDate: string,
  endDate: string
) {
  const rows = await querySearchAnalytics(accessToken, startDate, endDate, [
    "device",
  ]);

  return rows.map((row: any) => ({
    device: row.keys[0],
    clicks: row.clicks || 0,
    impressions: row.impressions || 0,
    ctr: row.ctr || 0,
    position: row.position || 0,
  }));
}

async function getCountryBreakdown(
  accessToken: string,
  startDate: string,
  endDate: string
) {
  const rows = await querySearchAnalytics(accessToken, startDate, endDate, [
    "country",
  ]);

  return rows.map((row: any) => ({
    country: row.keys[0],
    clicks: row.clicks || 0,
    impressions: row.impressions || 0,
    ctr: row.ctr || 0,
    position: row.position || 0,
  }));
}

async function getSearchAppearance(
  accessToken: string,
  startDate: string,
  endDate: string
) {
  const rows = await querySearchAnalytics(accessToken, startDate, endDate, [
    "searchAppearance",
  ]);

  return rows.map((row: any) => ({
    type: row.keys[0],
    clicks: row.clicks || 0,
    impressions: row.impressions || 0,
    ctr: row.ctr || 0,
    position: row.position || 0,
  }));
}

// ============================================================
// Console formatters
// ============================================================

function printSection(title: string) {
  console.log("\n" + "=".repeat(60));
  console.log(`  ${title}`);
  console.log("=".repeat(60));
}

function formatNum(n: number): string {
  return n.toLocaleString();
}

function formatPct(n: number): string {
  return (n * 100).toFixed(2) + "%";
}

function formatPos(n: number): string {
  return n.toFixed(1);
}

function changeIndicator(current: number, previous: number): string {
  if (previous === 0) return current > 0 ? "NEW" : "--";
  const change = ((current - previous) / previous) * 100;
  if (change > 0) return `+${change.toFixed(1)}%`;
  if (change < 0) return `${change.toFixed(1)}%`;
  return "0%";
}

function printTable(
  headers: string[],
  rows: string[][],
  widths?: number[]
) {
  const w =
    widths ||
    headers.map((_, i) => {
      const maxLen = Math.max(
        headers[i].length,
        ...rows.map((r) => (r[i] || "").length)
      );
      return Math.min(maxLen + 2, 50);
    });

  const headerLine = headers.map((h, i) => h.padEnd(w[i])).join("|");
  const separator = w.map((width) => "-".repeat(width)).join("+");

  console.log(headerLine);
  console.log(separator);
  for (const row of rows) {
    console.log(row.map((c, i) => (c || "").padEnd(w[i])).join("|"));
  }
}

// ============================================================
// MAIN
// ============================================================

async function main() {
  const args = process.argv.slice(2);

  // Parse --days flag
  let days = 28;
  const daysIdx = args.indexOf("--days");
  if (daysIdx !== -1 && args[daysIdx + 1]) {
    days = parseInt(args[daysIdx + 1], 10);
  }

  const doCompare = args.includes("--compare");

  console.log("Google Search Console - Performance Analytics");
  console.log("=".repeat(60));
  console.log(`Site: cuthongminh.com`);
  console.log(`Period: Last ${days} days`);
  console.log(`Compare: ${doCompare ? "Yes (vs previous period)" : "No"}`);

  // Check service account
  if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
    console.error(
      `\nService account key not found at:\n   ${SERVICE_ACCOUNT_PATH}`
    );
    process.exit(1);
  }

  // Load service account & get access token
  const serviceAccount = JSON.parse(
    fs.readFileSync(SERVICE_ACCOUNT_PATH, "utf-8")
  );
  console.log(`\nAuthenticating as: ${serviceAccount.client_email}`);

  const accessToken = await getAccessToken(serviceAccount);
  console.log("Auth OK\n");

  const { startDate, endDate } = getDateRange(days);
  console.log(`Date range: ${startDate} -> ${endDate}`);

  // Auto-detect site URL property format
  console.log("\nDetecting Search Console property format...");
  let detected = false;
  for (const variant of SITE_URL_VARIANTS) {
    const encodedSite = encodeURIComponent(variant);
    const testUrl = `${GSC_API}/${encodedSite}/searchAnalytics/query`;
    try {
      const result = await httpsPost(testUrl, accessToken, {
        startDate,
        endDate,
        dimensions: ["date"],
        rowLimit: 1,
      });
      if (!result.error) {
        SITE_URL = variant;
        console.log(`  OK -> Using: ${variant}`);
        detected = true;
        break;
      } else {
        console.log(`  SKIP ${variant}: ${result.error.message?.slice(0, 60)}`);
      }
    } catch (e: any) {
      console.log(`  SKIP ${variant}: ${e.message?.slice(0, 60)}`);
    }
  }

  if (!detected) {
    console.error(
      "\n*** PERMISSION ISSUE ***"
    );
    console.error(
      "The service account does NOT have Search Analytics access."
    );
    console.error(
      "\nTo fix this, you need to add the service account as a user"
    );
    console.error("in Google Search Console:\n");
    console.error("  1. Go to https://search.google.com/search-console");
    console.error(`  2. Select your property (cuthongminh.com)`);
    console.error("  3. Go to Settings -> Users and permissions");
    console.error(
      `  4. Click 'Add user' and enter: ${serviceAccount.client_email}`
    );
    console.error("  5. Set permission to 'Full' (or at least 'Restricted')");
    console.error("  6. Click 'Add'\n");
    console.error(
      "After adding, wait a few minutes and run this script again."
    );
    process.exit(1);
  }

  // == 1. OVERVIEW ==
  printSection("OVERVIEW");
  const overview = await getOverviewMetrics(accessToken, startDate, endDate);

  if (doCompare) {
    const prev = getPreviousPeriod(startDate, endDate);
    const prevOverview = await getOverviewMetrics(
      accessToken,
      prev.startDate,
      prev.endDate
    );

    console.log(
      `\n  Total Clicks:       ${formatNum(overview.totalClicks).padEnd(12)} ${changeIndicator(overview.totalClicks, prevOverview.totalClicks)}`
    );
    console.log(
      `  Total Impressions:  ${formatNum(overview.totalImpressions).padEnd(12)} ${changeIndicator(overview.totalImpressions, prevOverview.totalImpressions)}`
    );
    console.log(
      `  Avg CTR:            ${formatPct(overview.avgCtr).padEnd(12)} ${changeIndicator(overview.avgCtr, prevOverview.avgCtr)}`
    );
    console.log(
      `  Avg Position:       ${formatPos(overview.avgPosition).padEnd(12)} ${overview.avgPosition < prevOverview.avgPosition ? "Improved" : overview.avgPosition > prevOverview.avgPosition ? "Declined" : "Same"}`
    );

    console.log(
      `\n  Previous period: ${prev.startDate} -> ${prev.endDate}`
    );
    console.log(
      `  Prev Clicks: ${formatNum(prevOverview.totalClicks)} | Prev Impressions: ${formatNum(prevOverview.totalImpressions)}`
    );
  } else {
    console.log(`\n  Total Clicks:       ${formatNum(overview.totalClicks)}`);
    console.log(
      `  Total Impressions:  ${formatNum(overview.totalImpressions)}`
    );
    console.log(`  Avg CTR:            ${formatPct(overview.avgCtr)}`);
    console.log(`  Avg Position:       ${formatPos(overview.avgPosition)}`);
  }

  // == 2. TOP QUERIES ==
  printSection("TOP QUERIES (by Clicks)");
  const queries = await getTopQueries(accessToken, startDate, endDate, 30);

  if (queries.length === 0) {
    console.log("  No query data available yet.");
  } else {
    const queryRows = queries.map((q: any, i: number) => [
      `${i + 1}`,
      q.query.length > 40 ? q.query.slice(0, 37) + "..." : q.query,
      formatNum(q.clicks),
      formatNum(q.impressions),
      formatPct(q.ctr),
      formatPos(q.position),
    ]);
    printTable(
      ["#", "Query", "Clicks", "Impr.", "CTR", "Pos."],
      queryRows,
      [4, 42, 8, 8, 8, 6]
    );
  }

  // == 3. TOP PAGES ==
  printSection("TOP PAGES (by Clicks)");
  const pages = await getTopPages(accessToken, startDate, endDate, 30);

  if (pages.length === 0) {
    console.log("  No page data available yet.");
  } else {
    const pageRows = pages.map((p: any, i: number) => {
      const shortUrl = p.page.replace("https://cuthongminh.com", "");
      return [
        `${i + 1}`,
        shortUrl.length > 40
          ? shortUrl.slice(0, 37) + "..."
          : shortUrl || "/",
        formatNum(p.clicks),
        formatNum(p.impressions),
        formatPct(p.ctr),
        formatPos(p.position),
      ];
    });
    printTable(
      ["#", "Page", "Clicks", "Impr.", "CTR", "Pos."],
      pageRows,
      [4, 42, 8, 8, 8, 6]
    );
  }

  // == 4. DEVICE BREAKDOWN ==
  printSection("DEVICE BREAKDOWN");
  const devices = await getDeviceBreakdown(accessToken, startDate, endDate);

  if (devices.length === 0) {
    console.log("  No device data available.");
  } else {
    const deviceRows = devices.map((d: any) => [
      d.device,
      formatNum(d.clicks),
      formatNum(d.impressions),
      formatPct(d.ctr),
      formatPos(d.position),
    ]);
    printTable(
      ["Device", "Clicks", "Impr.", "CTR", "Pos."],
      deviceRows,
      [12, 8, 10, 8, 6]
    );
  }

  // == 5. COUNTRY BREAKDOWN ==
  printSection("TOP COUNTRIES");
  const countries = await getCountryBreakdown(accessToken, startDate, endDate);

  if (countries.length === 0) {
    console.log("  No country data available.");
  } else {
    const countryRows = countries.slice(0, 15).map((c: any) => [
      c.country,
      formatNum(c.clicks),
      formatNum(c.impressions),
      formatPct(c.ctr),
      formatPos(c.position),
    ]);
    printTable(
      ["Country", "Clicks", "Impr.", "CTR", "Pos."],
      countryRows,
      [10, 8, 10, 8, 6]
    );
  }

  // == 6. SEARCH APPEARANCE ==
  printSection("SEARCH APPEARANCE");
  const appearances = await getSearchAppearance(
    accessToken,
    startDate,
    endDate
  );

  if (appearances.length === 0) {
    console.log("  No search appearance data (rich results, etc.).");
  } else {
    const appRows = appearances.map((a: any) => [
      a.type,
      formatNum(a.clicks),
      formatNum(a.impressions),
      formatPct(a.ctr),
      formatPos(a.position),
    ]);
    printTable(
      ["Type", "Clicks", "Impr.", "CTR", "Pos."],
      appRows,
      [25, 8, 10, 8, 6]
    );
  }

  // == 7. INSIGHTS ==
  printSection("KEY INSIGHTS");

  // High impression, low CTR opportunities
  const lowCtrPages = pages
    .filter((p: any) => p.impressions > 50 && p.ctr < 0.03)
    .slice(0, 5);

  if (lowCtrPages.length > 0) {
    console.log(
      "\n  Pages with HIGH Impressions but LOW CTR (< 3%):"
    );
    console.log("  -> Optimize title & meta description for these pages:\n");
    for (const p of lowCtrPages) {
      const short =
        p.page.replace("https://cuthongminh.com", "") || "/";
      console.log(
        `     ${short.padEnd(45)} Impr: ${formatNum(p.impressions).padEnd(6)} CTR: ${formatPct(p.ctr)}`
      );
    }
  }

  // Striking distance keywords (position 5-20)
  const strikingDistance = queries
    .filter((q: any) => q.position >= 5 && q.position <= 20)
    .sort((a: any, b: any) => a.position - b.position)
    .slice(0, 10);

  if (strikingDistance.length > 0) {
    console.log(
      "\n  Striking Distance Keywords (position 5-20, can push to top 3):"
    );
    for (const q of strikingDistance) {
      console.log(
        `     "${q.query}" -> Pos ${formatPos(q.position)} (${formatNum(q.impressions)} impr)`
      );
    }
  }

  // Top performing (already in top 3)
  const topPerforming = queries
    .filter((q: any) => q.position <= 3 && q.clicks > 0)
    .slice(0, 5);

  if (topPerforming.length > 0) {
    console.log("\n  Top Performing Keywords (already in top 3):");
    for (const q of topPerforming) {
      console.log(
        `     "${q.query}" -> Pos ${formatPos(q.position)} | ${formatNum(q.clicks)} clicks`
      );
    }
  }

  // == Save JSON report ==
  const report = {
    generatedAt: new Date().toISOString(),
    period: { startDate, endDate, days },
    overview: {
      totalClicks: overview.totalClicks,
      totalImpressions: overview.totalImpressions,
      avgCtr: overview.avgCtr,
      avgPosition: overview.avgPosition,
    },
    topQueries: queries,
    topPages: pages,
    devices,
    countries,
    searchAppearance: appearances,
    dailyData: overview.dailyData,
  };

  fs.writeFileSync(REPORT_OUTPUT, JSON.stringify(report, null, 2), "utf-8");
  console.log(`\nFull report saved to: ${REPORT_OUTPUT}`);
  console.log(
    "\nDone! Run with --compare to see period-over-period changes."
  );
}

main().catch(console.error);
