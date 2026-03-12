/**
 * Upload learn-syllable logos to Cloudflare R2
 *
 * Usage: npx tsx scripts/upload-syllable-logos.ts
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

const SOURCE_DIR = "/tmp/learn-syllable-logos";
const R2_PREFIX = "games/learn-syllable";

const FILES_TO_UPLOAD = [
  { localName: "logo.png", r2Name: "logo.webp" },
  { localName: "group1.png", r2Name: "group1.webp" },
  { localName: "group2.png", r2Name: "group2.webp" },
  { localName: "group3.png", r2Name: "group3.webp" },
];

async function uploadFile(localPath: string, r2Key: string): Promise<string> {
  // Convert to webp using sharp
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
  console.log("🚀 Uploading learn-syllable logos to Cloudflare R2...\n");

  const results: { file: string; url: string }[] = [];

  for (const file of FILES_TO_UPLOAD) {
    const localPath = path.join(SOURCE_DIR, file.localName);
    const r2Key = `${R2_PREFIX}/${file.r2Name}`;

    if (!fs.existsSync(localPath)) {
      console.error(`❌ File not found: ${localPath}`);
      continue;
    }

    try {
      console.log(`📤 Uploading ${file.localName} → ${r2Key}...`);
      const url = await uploadFile(localPath, r2Key);
      results.push({ file: file.r2Name, url });
      console.log(`✅ ${url}`);
    } catch (error) {
      console.error(`❌ Failed to upload ${file.localName}:`, error);
    }
  }

  console.log("\n📋 Summary - Copy these URLs to constants.ts:\n");
  console.log("// Main game logo");
  const logoResult = results.find((r) => r.file === "logo.webp");
  if (logoResult) {
    console.log(`const GameSyllableLogo = "${logoResult.url}";`);
  }

  console.log("\n// Group logos");
  for (let i = 1; i <= 3; i++) {
    const groupResult = results.find((r) => r.file === `group${i}.webp`);
    if (groupResult) {
      console.log(`const LogoGroup${i} = "${groupResult.url}";`);
    }
  }
}

main().catch(console.error);
