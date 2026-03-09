import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const bucketName = "blog-images";

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadImage(filePath: string) {
  try {
    if (!fs.existsSync(filePath)) {
      console.error(`Error: File not found at ${filePath}`);
      return;
    }

    const fileName = path.basename(filePath, path.extname(filePath));
    const outputFileName = `${fileName}-${Date.now()}.webp`;
    const outputPath = path.join("/tmp", outputFileName);

    console.log(`Converting ${filePath} to WebP...`);
    await sharp(filePath).webp({ quality: 80 }).toFile(outputPath);

    console.log(`Uploading ${outputFileName} to Supabase bucket: ${bucketName}...`);
    const fileBuffer = fs.readFileSync(outputPath);
    const { data, error } = await supabase.storage.from(bucketName).upload(outputFileName, fileBuffer, {
      contentType: "image/webp",
      upsert: true,
    });

    if (error) {
      throw error;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucketName).getPublicUrl(outputFileName);

    console.log("\nSuccess! Image uploaded.");
    console.log(`Public URL: ${publicUrl}`);
    console.log("\nYou can now use this URL in your MDX file frontmatter:");
    console.log(`image: "${publicUrl}"`);

    // Cleanup record
    fs.unlinkSync(outputPath);
  } catch (error) {
    console.error("Error during upload:", error);
  }
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log("Usage: npx tsx scripts/upload-blog-image.ts <path-to-image>");
} else {
  uploadImage(args[0]);
}
