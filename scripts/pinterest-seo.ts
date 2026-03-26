/**
 * Pinterest SEO Script cho Cú Thông Minh
 * ----------------------------------------
 * Đọc tất cả bài blog từ content/blogs/ và tạo Pinterest Pins
 * thông qua Pinterest API v5 để tăng traffic SEO.
 *
 * Usage:
 *   npx tsx scripts/pinterest-seo.ts              # Đăng tất cả bài blog
 *   npx tsx scripts/pinterest-seo.ts --dry-run    # Chỉ in ra, không gọi API
 *   npx tsx scripts/pinterest-seo.ts --limit 5    # Chỉ đăng 5 bài đầu tiên
 *   npx tsx scripts/pinterest-seo.ts --skip 10    # Bỏ qua 10 bài đầu (tiếp tục từ bài 11)
 *
 * Env vars required in .env.local:
 *   PINTEREST_ACCESS_TOKEN=your_oauth_token_here
 *   PINTEREST_BOARD_ID=your_board_id_here         (dạng số, ví dụ: 123456789012345678)
 *
 * Hướng dẫn lấy token:
 *   1. Vào https://developers.pinterest.com/ → tạo Developer App
 *   2. Vào App Settings → Generate Access Token
 *      - Scope cần: boards:read, boards:write, pins:read, pins:write
 *   3. Lấy Board ID: Vào board Pinterest → URL có dạng pinterest.com/username/board-name/
 *      Hoặc dùng API: GET https://api.pinterest.com/v5/boards
 */

import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

// ============================================================
// Config
// ============================================================

const PINTEREST_API_BASE = "https://api.pinterest.com/v5";
const SITE_URL = "https://cuthongminh.com";
const DELAY_BETWEEN_PINS_MS = 2500; // 2.5 giây để tránh rate limit
// Log lưu bên ngoài frontend/, trong thư mục marketing/ ở root project
const LOG_FILE = path.join("..", "marketing", "pinterest-pins-log.json");

const ACCESS_TOKEN = process.env.PINTEREST_ACCESS_TOKEN;
const BOARD_ID = process.env.PINTEREST_BOARD_ID;

// ============================================================
// Types
// ============================================================

interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  image?: string;
}

interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  url: string;
  imageUrl: string;
}

interface PinterestPinPayload {
  board_id: string;
  title: string;
  description: string;
  link: string;
  media_source: {
    source_type: "image_url";
    url: string;
  };
}

interface PinResult {
  slug: string;
  title: string;
  pinId?: string;
  pinUrl?: string;
  error?: string;
  timestamp: string;
}

// ============================================================
// Helpers
// ============================================================

/**
 * Parse frontmatter từ file MDX (hỗ trợ YAML đơn giản)
 * Không dùng thư viện bên ngoài để giữ script đơn giản.
 */
function parseFrontmatter(content: string): BlogFrontmatter {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) throw new Error("Không tìm thấy frontmatter");

  const yamlBlock = match[1];
  const result: Record<string, string | string[]> = {};

  for (const line of yamlBlock.split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    const rawValue = line.slice(colonIndex + 1).trim();

    if (!key || !rawValue) continue;

    // Mảng tags: ["tag1", "tag2", ...]
    if (rawValue.startsWith("[")) {
      const arrayMatch = rawValue.match(/\[([^\]]+)\]/);
      if (arrayMatch) {
        result[key] = arrayMatch[1]
          .split(",")
          .map((t) => t.trim().replace(/^["']|["']$/g, ""));
      }
      continue;
    }

    // String thông thường (có thể có dấu ngoặc kép)
    result[key] = rawValue.replace(/^["']|["']$/g, "");
  }

  return {
    title: (result.title as string) || "",
    description: (result.description as string) || "",
    date: (result.date as string) || "",
    tags: (result.tags as string[]) || [],
    image: (result.image as string) || undefined,
  };
}

/**
 * Lấy absolute URL cho ảnh. Nếu là relative path → kết hợp với SITE_URL.
 * Nếu image không có hoặc là /og-image.png → dùng ảnh mặc định.
 */
function resolveImageUrl(imagePath: string | undefined, slug: string): string {
  const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

  if (!imagePath || imagePath === "/og-image.png") {
    // Thử dùng ảnh riêng của bài blog từ Supabase nếu có pattern chuẩn
    // Fallback về og-image mặc định
    return DEFAULT_IMAGE;
  }

  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  return `${SITE_URL}${imagePath}`;
}

/**
 * Tạo description Pinterest tối ưu SEO (max 500 ký tự)
 */
function buildPinDescription(frontmatter: BlogFrontmatter): string {
  const { description, tags = [] } = frontmatter;

  const hashtags = tags
    .slice(0, 8) // Tối đa 8 hashtags
    .map((tag) => `#${tag.replace(/\s+/g, "").toLowerCase()}`)
    .join(" ");

  const brandTag = "#CúThôngMinh #giáodụctrẻem #họcmàchơi #trẻmầmnon";

  const baseText = `${description}\n\n${brandTag}`;
  const withHashtags = `${baseText} ${hashtags}`;

  // Pinterest cho phép tối đa 500 ký tự
  return withHashtags.slice(0, 500);
}

/**
 * Delay helper
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ============================================================
// Core Functions
// ============================================================

/**
 * Đọc tất cả bài blog từ /content/blogs/
 */
function loadAllBlogPosts(): BlogPost[] {
  const blogsDir = path.join(process.cwd(), "content", "blogs");

  if (!fs.existsSync(blogsDir)) {
    console.error(`❌ Không tìm thấy thư mục: ${blogsDir}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(blogsDir)
    .filter((f) => f.endsWith(".mdx"))
    .sort(); // Sắp xếp alphabetical để dễ theo dõi

  console.log(`📚 Tìm thấy ${files.length} bài blog\n`);

  const posts: BlogPost[] = [];

  for (const file of files) {
    const slug = file.replace(".mdx", "");
    const filePath = path.join(blogsDir, file);

    try {
      const content = fs.readFileSync(filePath, "utf-8");
      const frontmatter = parseFrontmatter(content);

      if (!frontmatter.title) {
        console.warn(`⚠️  Bỏ qua ${file}: thiếu title`);
        continue;
      }

      posts.push({
        slug,
        frontmatter,
        url: `${SITE_URL}/blog/${slug}`,
        imageUrl: resolveImageUrl(frontmatter.image, slug),
      });
    } catch (err) {
      console.warn(`⚠️  Lỗi đọc ${file}: ${(err as Error).message}`);
    }
  }

  return posts;
}

/**
 * Gọi Pinterest API để tạo 1 pin
 */
async function createPinterestPin(
  post: BlogPost,
  boardId: string,
  accessToken: string
): Promise<{ pinId: string; pinUrl: string }> {
  const payload: PinterestPinPayload = {
    board_id: boardId,
    title: post.frontmatter.title.slice(0, 100), // Max 100 ký tự
    description: buildPinDescription(post.frontmatter),
    link: post.url,
    media_source: {
      source_type: "image_url",
      url: post.imageUrl,
    },
  };

  const response = await fetch(`${PINTEREST_API_BASE}/pins`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorBody}`);
  }

  const data = (await response.json()) as { id: string };
  return {
    pinId: data.id,
    pinUrl: `https://www.pinterest.com/pin/${data.id}/`,
  };
}

/**
 * Lấy danh sách boards để hiển thị Board ID nếu user chưa biết
 */
async function listBoards(accessToken: string): Promise<void> {
  console.log("🗂️  Đang lấy danh sách Pinterest Boards của bạn...\n");

  const response = await fetch(`${PINTEREST_API_BASE}/boards`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    console.error("❌ Không thể lấy boards. Kiểm tra lại PINTEREST_ACCESS_TOKEN.");
    return;
  }

  const data = (await response.json()) as {
    items: Array<{ id: string; name: string }>;
  };

  console.log("📌 Danh sách boards của bạn:");
  for (const board of data.items) {
    console.log(`   Board ID: ${board.id}  →  "${board.name}"`);
  }

  console.log(
    '\n👉 Copy Board ID vào .env.local: PINTEREST_BOARD_ID=<board_id>\n'
  );
}

// ============================================================
// Main
// ============================================================

async function main() {
  // Parse CLI args
  const args = process.argv.slice(2);
  const isDryRun = args.includes("--dry-run");
  const limitArg = args.find((a) => a.startsWith("--limit=")) || args[args.indexOf("--limit") + 1];
  const skipArg = args.find((a) => a.startsWith("--skip=")) || args[args.indexOf("--skip") + 1];
  const listBoardsFlag = args.includes("--list-boards");

  const limit = limitArg ? parseInt(String(limitArg)) : undefined;
  const skip = skipArg ? parseInt(String(skipArg)) : 0;

  console.log("🦉 Pinterest SEO Script — Cú Thông Minh");
  console.log("========================================\n");

  // Kiểm tra env vars
  if (!ACCESS_TOKEN) {
    console.error("❌ Thiếu PINTEREST_ACCESS_TOKEN trong .env.local");
    console.error("   Hướng dẫn: https://developers.pinterest.com/docs/getting-started/authentication/");
    process.exit(1);
  }

  if (listBoardsFlag) {
    await listBoards(ACCESS_TOKEN);
    return;
  }

  if (!BOARD_ID && !isDryRun) {
    console.error("❌ Thiếu PINTEREST_BOARD_ID trong .env.local");
    console.error(`   Chạy lệnh này để xem danh sách boards: npx tsx scripts/pinterest-seo.ts --list-boards`);
    process.exit(1);
  }

  // Load blog posts
  const allPosts = loadAllBlogPosts();
  const posts = allPosts.slice(skip, limit ? skip + limit : undefined);

  console.log(`🎯 Sẽ xử lý: ${posts.length} bài blog`);
  if (skip > 0) console.log(`   (Bỏ qua ${skip} bài đầu)`);
  if (isDryRun) console.log("   [DRY RUN] — Không gọi API thật\n");

  console.log("");

  // Load existing log
  const logPath = path.resolve(process.cwd(), LOG_FILE);
  let results: PinResult[] = [];
  if (fs.existsSync(logPath)) {
    try {
      results = JSON.parse(fs.readFileSync(logPath, "utf-8"));
      console.log(`📋 Log cũ: ${results.length} pins đã đăng trước đó\n`);
    } catch {
      results = [];
    }
  }

  const alreadyPosted = new Set(results.map((r) => r.slug));

  // Process posts
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const prefix = `[${i + 1 + skip}/${allPosts.length}]`;

    // Bỏ qua nếu đã đăng
    if (alreadyPosted.has(post.slug)) {
      console.log(`${prefix} ⏭️  Đã đăng trước đó: ${post.slug}`);
      skipCount++;
      continue;
    }

    console.log(`${prefix} 📌 ${post.frontmatter.title.slice(0, 60)}...`);
    console.log(`        URL: ${post.url}`);
    console.log(`        Img: ${post.imageUrl}`);

    if (isDryRun) {
      console.log(`        [DRY RUN] Pin sẽ được tạo với title: "${post.frontmatter.title.slice(0, 50)}..."\n`);
      successCount++;
      continue;
    }

    try {
      const { pinId, pinUrl } = await createPinterestPin(
        post,
        BOARD_ID!,
        ACCESS_TOKEN
      );

      results.push({
        slug: post.slug,
        title: post.frontmatter.title,
        pinId,
        pinUrl,
        timestamp: new Date().toISOString(),
      });

      console.log(`        ✅ Pin created: ${pinUrl}\n`);
      successCount++;

      // Save sau mỗi pin (để không mất data nếu script bị dừng giữa chừng)
      fs.writeFileSync(logPath, JSON.stringify(results, null, 2));
    } catch (err) {
      const errorMsg = (err as Error).message;
      console.error(`        ❌ Lỗi: ${errorMsg}\n`);

      results.push({
        slug: post.slug,
        title: post.frontmatter.title,
        error: errorMsg,
        timestamp: new Date().toISOString(),
      });

      fs.writeFileSync(logPath, JSON.stringify(results, null, 2));
      errorCount++;
    }

    // Rate limit delay (trừ pin cuối cùng)
    if (i < posts.length - 1) {
      await sleep(DELAY_BETWEEN_PINS_MS);
    }
  }

  // Summary
  console.log("========================================");
  console.log("📊 Kết quả:");
  console.log(`   ✅ Thành công: ${successCount}`);
  if (skipCount > 0) console.log(`   ⏭️  Đã đăng rồi: ${skipCount}`);
  if (errorCount > 0) console.log(`   ❌ Lỗi: ${errorCount}`);
  if (!isDryRun) console.log(`\n   📋 Log lưu tại: ${logPath}`);
  console.log("========================================\n");
}

main().catch((err) => {
  console.error("💥 Lỗi không mong muốn:", err);
  process.exit(1);
});
