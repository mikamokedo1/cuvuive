/**
 * Upload game images to Cloudflare R2
 *
 * Reusable script — works for any game by specifying source dir and R2 prefix.
 *
 * Usage:
 *   npx tsx scripts/upload-r2-images.ts --src <source_dir> --prefix <r2_prefix> [--size <width>]
 *
 * Examples:
 *   npx tsx scripts/upload-r2-images.ts --src ~/Desktop/learn-body-images --prefix games/learn-body
 *   npx tsx scripts/upload-r2-images.ts --src ~/Desktop/learn-terrain-images --prefix games/learn-terrain --size 512
 *   npx tsx scripts/upload-r2-images.ts --src ./generated-images --prefix games/learn-animal --size 400 --quality 90
 *
 * Options:
 *   --src       Source directory containing images (png, jpg, webp)
 *   --prefix    R2 key prefix (e.g. "games/learn-body")
 *   --size      Resize to NxN pixels (default: 512, use 0 to skip resize)
 *   --quality   WebP quality 1-100 (default: 85)
 *   --dry-run   Show what would be uploaded without actually uploading
 *
 * Required .env.local:
 *   R2_API_ACCOUNT_ID=xxx
 *   R2_API_KEY=xxx
 *   R2_API_SECRET=xxx
 *   R2_API_BUCKET=cuthongminh   (optional, defaults to "cuthongminh")
 */
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// ─── Parse CLI args ───
function parseArgs() {
  const args = process.argv.slice(2);
  const opts: Record<string, string> = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--") && i + 1 < args.length && !args[i + 1].startsWith("--")) {
      opts[args[i].replace("--", "")] = args[i + 1];
      i++;
    } else if (args[i].startsWith("--")) {
      opts[args[i].replace("--", "")] = "true";
    }
  }
  return opts;
}

const opts = parseArgs();

if (!opts.src || !opts.prefix) {
  console.error("Usage: npx tsx scripts/upload-r2-images.ts --src <source_dir> --prefix <r2_prefix>");
  console.error("");
  console.error("Example: npx tsx scripts/upload-r2-images.ts --src ~/Desktop/learn-body-images --prefix games/learn-body");
  process.exit(1);
}

const SRC_DIR = path.resolve(opts.src.replace("~", process.env.HOME || "~"));
const R2_PREFIX = opts.prefix.replace(/\/$/, ""); // remove trailing slash
const RESIZE = parseInt(opts.size || "512", 10);
const QUALITY = parseInt(opts.quality || "85", 10);
const DRY_RUN = opts["dry-run"] === "true";

if (!fs.existsSync(SRC_DIR)) {
  console.error(`❌ Source directory not found: ${SRC_DIR}`);
  process.exit(1);
}

// ─── R2 Setup ───
dotenv.config({ path: ".env.local" });

const accountId = process.env.R2_API_ACCOUNT_ID;
const accessKeyId = process.env.R2_API_KEY;
const secretAccessKey = process.env.R2_API_SECRET;
const bucketName = process.env.R2_API_BUCKET || "cuthongminh";
const publicDomain = "https://assets.cuthongminh.com";

if (!DRY_RUN && (!accountId || !accessKeyId || !secretAccessKey)) {
  console.error("❌ R2_API_ACCOUNT_ID, R2_API_KEY, and R2_API_SECRET must be set in .env.local");
  process.exit(1);
}

const s3 = !DRY_RUN
  ? new S3Client({
      region: "auto",
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: { accessKeyId: accessKeyId!, secretAccessKey: secretAccessKey! },
    })
  : null;

// ─── Supported extensions ───
const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp"];

// ─── Upload function ───
async function uploadFile(localPath: string, r2Key: string): Promise<string> {
  let pipeline = sharp(localPath);

  // Resize if specified (0 = skip)
  if (RESIZE > 0) {
    pipeline = pipeline.resize(RESIZE, RESIZE, { fit: "cover" });
  }

  const webpBuffer = await pipeline.webp({ quality: QUALITY }).toBuffer();

  if (DRY_RUN) {
    const sizeKB = (webpBuffer.length / 1024).toFixed(1);
    return `${publicDomain}/${r2Key} (${sizeKB}KB)`;
  }

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: r2Key,
    Body: webpBuffer,
    ContentType: "image/webp",
  });

  await s3!.send(command);
  return `${publicDomain}/${r2Key}`;
}

// ─── Main ───
async function main() {
  const mode = DRY_RUN ? "DRY RUN" : "UPLOAD";
  console.log(`\n🚀 [${mode}] Uploading images to Cloudflare R2`);
  console.log(`   Source:  ${SRC_DIR}`);
  console.log(`   Prefix:  ${R2_PREFIX}/`);
  console.log(`   Resize:  ${RESIZE > 0 ? `${RESIZE}x${RESIZE}` : "none"}`);
  console.log(`   Quality: ${QUALITY}`);
  console.log("");

  // Find all image files in source directory
  const allFiles = fs.readdirSync(SRC_DIR);
  const imageFiles = allFiles.filter((f) => IMAGE_EXTENSIONS.includes(path.extname(f).toLowerCase()));

  if (imageFiles.length === 0) {
    console.error(`❌ No image files found in ${SRC_DIR}`);
    console.error(`   Supported: ${IMAGE_EXTENSIONS.join(", ")}`);
    process.exit(1);
  }

  console.log(`📁 Found ${imageFiles.length} images\n`);

  const results: { file: string; url: string }[] = [];
  const errors: string[] = [];

  for (const file of imageFiles) {
    const localPath = path.join(SRC_DIR, file);
    const baseName = path.parse(file).name; // remove extension
    const r2Key = `${R2_PREFIX}/${baseName}.webp`;

    try {
      const icon = DRY_RUN ? "🔍" : "📤";
      process.stdout.write(`${icon} ${file} → ${r2Key}...`);
      const url = await uploadFile(localPath, r2Key);
      results.push({ file: baseName, url });
      console.log(` ✅`);
    } catch (error) {
      errors.push(file);
      console.log(` ❌`);
      console.error(`   Error: ${error instanceof Error ? error.message : error}`);
    }
  }

  // Summary
  console.log(`\n${"─".repeat(50)}`);
  console.log(`✅ ${results.length}/${imageFiles.length} images ${DRY_RUN ? "ready" : "uploaded"}`);
  if (errors.length > 0) {
    console.log(`❌ ${errors.length} failed: ${errors.join(", ")}`);
  }
  console.log(`\n📎 Base URL: ${publicDomain}/${R2_PREFIX}/`);
  console.log("");
}

main().catch(console.error);
