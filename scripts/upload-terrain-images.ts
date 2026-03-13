/**
 * Upload learn-terrain images to Cloudflare R2
 *
 * Usage: npx tsx scripts/upload-terrain-images.ts
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

const ARTIFACT_DIR = "/Users/caoquyle/.gemini/antigravity/brain/cd7a2f99-e020-4b0a-8966-7b080ca5ba94";
const R2_PREFIX = "games/learn-terrain";

// Map: generated filename prefix -> R2 target name
const IMAGE_MAP: Record<string, string> = {
  // Logo + Group logos
  terrain_logo: "logo",
  terrain_group1: "group1",
  terrain_group2: "group2",
  terrain_group3: "group3",

  // Group 1 - Land terrains
  terrain_mountain: "mountain",
  terrain_hill: "hill",
  terrain_plain: "plain",
  terrain_plateau: "plateau",
  terrain_valley: "valley",
  terrain_desert: "desert",

  // Group 2 - Water terrains
  terrain_ocean: "ocean",
  terrain_river: "river",
  terrain_lake: "lake",
  terrain_waterfall: "waterfall",
  terrain_island: "island",
  terrain_swamp: "swamp",

  // Group 3 - Special terrains
  terrain_volcano: "volcano",
  terrain_glacier: "glacier",
  terrain_cave: "cave",
  terrain_canyon: "canyon",
  terrain_forest: "forest",
  terrain_beach: "beach",
};

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
  console.log("🚀 Uploading learn-terrain images to Cloudflare R2...\n");

  const results: { file: string; url: string }[] = [];

  for (const [prefix, targetName] of Object.entries(IMAGE_MAP)) {
    // Find the generated file (has timestamp suffix)
    const files = fs.readdirSync(ARTIFACT_DIR).filter((f) => f.startsWith(`${prefix}_`) && f.endsWith(".png"));

    if (files.length === 0) {
      console.error(`❌ No file found for: ${prefix}`);
      continue;
    }

    const localPath = path.join(ARTIFACT_DIR, files[0]);
    const r2Key = `${R2_PREFIX}/${targetName}.webp`;

    try {
      console.log(`📤 Uploading ${files[0]} → ${r2Key}...`);
      const url = await uploadFile(localPath, r2Key);
      results.push({ file: targetName, url });
      console.log(`✅ ${url}`);
    } catch (error) {
      console.error(`❌ Failed to upload ${targetName}:`, error);
    }
  }

  console.log(`\n✅ Uploaded ${results.length}/${Object.keys(IMAGE_MAP).length} images\n`);
}

main().catch(console.error);
