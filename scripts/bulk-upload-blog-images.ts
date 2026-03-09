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

const blogsDir = path.join(process.cwd(), "public/blogs");
const contentDir = path.join(process.cwd(), "content/blogs");

async function bulkUploadAndReplace() {
  if (!fs.existsSync(blogsDir)) {
    console.error(`Error: blogs directory not found at ${blogsDir}`);
    return;
  }

  const files = fs.readdirSync(blogsDir).filter((file) => /\.(png|jpg|jpeg)$/i.test(file));
  console.log(`Found ${files.length} images to process.`);

  const urlMapping: Record<string, string> = {};

  for (const file of files) {
    const filePath = path.join(blogsDir, file);
    const fileName = path.basename(file, path.extname(file));
    const outputFileName = `${fileName}-${Date.now()}.webp`;
    const outputPath = path.join("/tmp", outputFileName);

    try {
      console.log(`Processing ${file}...`);
      await sharp(filePath).webp({ quality: 80 }).toFile(outputPath);

      const fileBuffer = fs.readFileSync(outputPath);
      const { data, error } = await supabase.storage.from(bucketName).upload(outputFileName, fileBuffer, {
        contentType: "image/webp",
        upsert: true,
      });

      if (error) throw error;

      const {
        data: { publicUrl },
      } = supabase.storage.from(bucketName).getPublicUrl(outputFileName);
      urlMapping[file] = publicUrl;
      console.log(`Uploaded ${file} -> ${publicUrl}`);

      fs.unlinkSync(outputPath);
    } catch (err) {
      console.error(`Failed to process ${file}:`, err);
    }
  }

  console.log("\nUpdating MDX files...");
  const mdxFiles = fs.readdirSync(contentDir).filter((file) => file.endsWith(".mdx"));

  for (const mdxFile of mdxFiles) {
    const mdxPath = path.join(contentDir, mdxFile);
    let content = fs.readFileSync(mdxPath, "utf-8");
    let changed = false;

    for (const [originalName, publicUrl] of Object.entries(urlMapping)) {
      // Try both /blogs/filename.png and blogs/filename.png
      const searchPattern = new RegExp(`/?blogs/${originalName}`, "g");
      if (searchPattern.test(content)) {
        content = content.replace(searchPattern, publicUrl);
        changed = true;
      }
    }

    if (changed) {
      fs.writeFileSync(mdxPath, content);
      console.log(`Updated ${mdxFile}`);
    }
  }

  console.log("\nBulk upload and replacement complete!");
}

bulkUploadAndReplace();
