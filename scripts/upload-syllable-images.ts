/**
 * Upload learn-syllable images to Cloudflare R2
 *
 * Usage: npx tsx scripts/upload-syllable-images.ts
 */
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const accountId = process.env.R2_API_ACCOUNT_ID;
const accessKeyId = process.env.R2_API_KEY;
const secretAccessKey = process.env.R2_API_SECRET;
const bucketName = process.env.R2_API_BUCKET || "cuthongminh";
const publicDomain = "https://assets.cuthongminh.com";

if (!accountId || !accessKeyId || !secretAccessKey) {
  console.error("Error: R2_API_ACCOUNT_ID, R2_API_KEY, and R2_API_SECRET must be set in .env.local");
  process.exit(1);
}

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const ARTIFACT_DIR = "/Users/caoquyle/.gemini/antigravity/brain/cf7405ca-6cb9-4bf2-943b-7a22c265debe";
const R2_PREFIX = "games/learn-syllable";

// Map: generated filename prefix -> R2 target name
const IMAGE_FILES = [
  "dieu",
  "yeu",
  "tien",
  "yen",
  "viet",
  "yem",
  "cuon",
  "buom_sail",
  "chuot",
  "thuoc",
  "luon",
  "duong",
  "buom",
  "nuoc",
  "khoai",
  "khoan",
  "xoan",
  "oanh",
  "uyen",
  "tuyet",
  "khuya",
  "oi",
  "quan",
  "luat",
];

async function uploadFile(localPath: string, r2Key: string): Promise<string> {
  const webpBuffer = await sharp(localPath)
    .resize(512, 512, { fit: "cover" })
    .webp({ quality: 85 })
    .toBuffer();

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: r2Key,
    Body: webpBuffer,
    ContentType: "image/webp",
  });

  await s3.send(command);

  const publicUrl = `${publicDomain}/${r2Key}`;
  return publicUrl;
}

async function main() {
  console.log("🚀 Uploading learn-syllable images to Cloudflare R2...\n");

  const results: { file: string; url: string }[] = [];

  for (const name of IMAGE_FILES) {
    // Find the generated file (has timestamp suffix)
    const files = fs.readdirSync(ARTIFACT_DIR).filter((f) => f.startsWith(`${name}_`) && f.endsWith(".png"));

    if (files.length === 0) {
      console.error(`❌ No file found for: ${name}`);
      continue;
    }

    const localPath = path.join(ARTIFACT_DIR, files[0]);
    const r2Key = `${R2_PREFIX}/${name}.webp`;

    try {
      console.log(`📤 Uploading ${files[0]} → ${r2Key}...`);
      const url = await uploadFile(localPath, r2Key);
      results.push({ file: name, url });
      console.log(`✅ ${url}`);
    } catch (error) {
      console.error(`❌ Failed to upload ${name}:`, error);
    }
  }

  console.log(`\n✅ Uploaded ${results.length}/${IMAGE_FILES.length} images\n`);
  console.log("📋 URLs for constants.ts:\n");
  for (const r of results) {
    console.log(`const Img${r.file.charAt(0).toUpperCase() + r.file.slice(1)} = "${r.url}";`);
  }
}

main().catch(console.error);
