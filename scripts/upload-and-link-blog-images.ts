import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const bucketName = "blog-images";

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// === IMAGE SOURCES (3 artifact directories) ===
const artifactDirs = [
  "/Users/caoquyle/.gemini/antigravity/brain/bd7395b7-29e4-4b25-bdd2-cd1b4d619d8e",
  "/Users/caoquyle/.gemini/antigravity/brain/36ddf949-02bb-4801-bc8e-37d9b6fcaeac",
  "/Users/caoquyle/.gemini/antigravity/brain/67554dea-0f02-4f2c-92fc-f4aa06c5890f",
];

const contentDir = path.join(process.cwd(), "content/blogs");

// === MAPPING: blog slug → { hero: filename, inline: [filename, filename, ...] } ===
// The inline images are ordered to match the sequence of ![...](/og-image.png) in each MDX file
const blogImageMap: Record<string, { hero: string; inline: string[] }> = {
  // --- Nhóm 1: Kỹ năng theo độ tuổi ---
  "be-3-tuoi-nen-hoc-gi": {
    hero: "hero_be3_tuoi",
    inline: ["be3_nao_bo", "be3_kham_pha", "be3_hoc_qua_choi"],
  },
  "be-4-tuoi-nen-hoc-gi": {
    hero: "hero_be4_tuoi",
    inline: ["be4_tri_tuong_tuong", "be4_choi_cung_ban", "be4_phat_trien"],
  },
  "be-5-tuoi-can-biet-nhung-gi": {
    hero: "hero_be5_tuoi",
    inline: ["be5_tu_tin", "be5_du_an_hoc_tap", "be5_san_sang"],
  },
  "giao-duc-som-la-gi": {
    hero: "hero_giao_duc_som",
    inline: ["giaoduc_moitruong", "giaoduc_so_sanh", "giaoduc_cu_thong_minh"],
  },
  "lich-sinh-hoat-cho-be-mam-non": {
    hero: "hero_lich_sinh_hoat",
    inline: ["lich_an_toan", "lich_dieu_chinh"],
  },

  // --- Nhóm 2: Học chữ & Ngôn ngữ ---
  "game-hoc-chu-cho-be": {
    hero: "hero_game_hoc_chu",
    inline: ["game_chon_app", "game_lo_trinh"],
  },
  "day-be-hoc-bang-chu-cai-tai-nha": {
    hero: "hero_bang_chu_cai",
    inline: ["bangchucai_nhom_am", "bangchucai_tro_choi"],
  },
  "be-hoc-ghep-van-nhu-the-nao": {
    hero: "hero_ghep_van",
    inline: ["ghepvan_phuongphap", "ghepvan_hoatdong"],
  },
  "day-tre-tap-doc-som": {
    hero: "hero_tap_doc",
    inline: ["tapdoc_yeu_sach", "tapdoc_doc_to"],
  },
  "dau-tieng-viet-cho-be": {
    hero: "hero_dau_tieng_viet",
    inline: ["dau_thanh_dieu", "dau_cu_chi_tay", "dau_tro_choi"],
  },

  // --- Nhóm 3: Toán & Tư duy logic ---
  "cach-day-be-hoc-so": {
    hero: "hero_hoc_so",
    inline: ["hocso_cap_do", "hocso_do_choi", "hocso_cu_thong_minh"],
  },
  "phep-tinh-don-gian-cho-be-mau-giao": {
    hero: "hero_phep_tinh",
    inline: ["pheptinh_san_sang", "pheptinh_tro_choi"],
  },
  "day-be-tu-duy-logic": {
    hero: "hero_tu_duy_logic",
    inline: ["tuduy_nen_tang", "tuduy_cau_do"],
  },
  "so-sanh-lon-nho-nhieu-it-cho-be": {
    hero: "hero_so_sanh",
    inline: ["sosanh_nen_tang", "sosanh_hoat_dong"],
  },
  "hoc-xem-dong-ho-cho-be": {
    hero: "hero_dong_ho",
    inline: ["dongho_hanh_trinh", "dongho_diy"],
  },

  // --- Nhóm 4: Khoa học & Khám phá ---
  "day-be-yeu-dong-vat": {
    hero: "hero_dong_vat",
    inline: ["dongvat_tuong_tac", "dongvat_phan_loai", "dongvat_cu_thong_minh"],
  },
  "kham-pha-thoi-tiet-cung-be": {
    hero: "hero_thoi_tiet",
    inline: ["thoi_tiet_stem"],
  },
  "be-hoc-ve-co-the-nguoi": {
    hero: "hero_co_the",
    inline: ["cothenguo_giaoduc", "cothe_vung_an_toan"],
  },
  "day-be-nhan-biet-trai-cay-rau-cu": {
    hero: "hero_trai_cay",
    inline: ["traicay_nemblindfold", "traicay_smoothie"],
  },
  "day-be-biet-cac-nghe-nghiep": {
    hero: "hero_nghe_nghiep",
    inline: ["nghenghiep_muonnganh", "nghenghiep_roleplay"],
  },

  // --- Nhóm 5: Nghệ thuật & Sáng tạo ---
  "mau-sac-cho-tre-mau-giao": {
    hero: "hero_mau_sac",
    inline: ["mausac_giaidan", "mausac_hoatdong"],
  },
  "day-be-to-mau-dung-cach": {
    hero: "hero_to_mau",
    inline: ["tomau_biecambu", "tomau_khenduong"],
  },
  "am-nhac-cho-tre-mam-non": {
    hero: "hero_am_nhac",
    inline: ["amnhac_choidongchu", "amnhac_diy_nhaccu"],
  },
  "me-cung-cho-be": {
    hero: "hero_me_cung",
    inline: ["mecung_naobo", "mecung_vetuminh"],
  },
  "day-be-ve-tranh-don-gian": {
    hero: "hero_ve_tranh",
    inline: ["vetranh_12mau", "vetranh_sangtan"],
  },

  // --- Nhóm 6: Kỹ năng sống & An toàn ---
  "ky-nang-tu-phuc-vu-cho-be": {
    hero: "hero_tu_phuc_vu",
    inline: ["tuphucvu_montessori", "tuphucvu_khonggian"],
  },
  "an-toan-giao-thong-cho-be": {
    hero: "hero_an_toan_giao_thong",
    inline: ["antoan_10quytac", "antoan_emlacsgt"],
  },
  "day-be-quan-ly-cam-xuc": {
    hero: "hero_cam_xuc",
    inline: ["camxuc_banhxe", "camxuc_hitho"],
  },
  "day-be-giu-ve-sinh-ca-nhan": {
    hero: "hero_ve_sinh",
    inline: ["vesinh_5thoquen", "vesinh_gamification"],
  },
  "day-be-nhan-biet-nguoi-la": {
    hero: "hero_nguoi_la",
    inline: ["nguoila_3khong", "nguoila_5tinhhong"],
  },
};

// Find an image file across all artifact directories
function findImage(baseName: string): string | null {
  for (const dir of artifactDirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);
    // Match files that start with baseName and end with .png
    const match = files.find((f) => f.startsWith(baseName + "_") && f.endsWith(".png"));
    if (match) return path.join(dir, match);
    // Also try exact match with timestamp
    const exactMatch = files.find((f) => f.startsWith(baseName) && f.endsWith(".png"));
    if (exactMatch) return path.join(dir, exactMatch);
  }
  return null;
}

async function uploadImage(filePath: string, outputBaseName: string): Promise<string> {
  const outputFileName = `${outputBaseName}-${Date.now()}.webp`;
  const tmpPath = path.join("/tmp", outputFileName);

  await sharp(filePath).webp({ quality: 80 }).toFile(tmpPath);

  const fileBuffer = fs.readFileSync(tmpPath);
  const { error } = await supabase.storage.from(bucketName).upload(outputFileName, fileBuffer, {
    contentType: "image/webp",
    upsert: true,
  });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucketName).getPublicUrl(outputFileName);

  fs.unlinkSync(tmpPath);
  return publicUrl;
}

async function main() {
  console.log("🔍 Scanning for images across artifact directories...\n");

  let totalFound = 0;
  let totalMissing = 0;
  const missingImages: string[] = [];

  // First pass: verify all images exist
  for (const [slug, config] of Object.entries(blogImageMap)) {
    // Check hero
    const heroPath = findImage(config.hero);
    if (!heroPath) {
      console.log(`  ❌ MISSING hero: ${config.hero} (for ${slug})`);
      missingImages.push(`${slug}: hero ${config.hero}`);
      totalMissing++;
    } else {
      totalFound++;
    }

    // Check inline images
    for (const imgName of config.inline) {
      const imgPath = findImage(imgName);
      if (!imgPath) {
        console.log(`  ❌ MISSING inline: ${imgName} (for ${slug})`);
        missingImages.push(`${slug}: inline ${imgName}`);
        totalMissing++;
      } else {
        totalFound++;
      }
    }
  }

  console.log(`\n📊 Found: ${totalFound} | Missing: ${totalMissing}\n`);

  if (totalMissing > 0) {
    console.log("Missing images:");
    missingImages.forEach((m) => console.log(`  - ${m}`));
    console.log("\nPlease generate missing images first. Exiting.");
    return;
  }

  console.log("✅ All images found! Starting upload...\n");

  // Upload all images and build URL mapping
  const blogUrls: Record<string, { heroUrl: string; inlineUrls: string[] }> = {};

  for (const [slug, config] of Object.entries(blogImageMap)) {
    console.log(`\n📝 Processing: ${slug}`);

    // Upload hero
    const heroPath = findImage(config.hero)!;
    console.log(`  ⬆️  Uploading hero: ${config.hero}`);
    const heroUrl = await uploadImage(heroPath, config.hero);
    console.log(`  ✅ ${heroUrl}`);

    // Upload inline images
    const inlineUrls: string[] = [];
    for (const imgName of config.inline) {
      const imgPath = findImage(imgName)!;
      console.log(`  ⬆️  Uploading inline: ${imgName}`);
      const inlineUrl = await uploadImage(imgPath, imgName);
      console.log(`  ✅ ${inlineUrl}`);
      inlineUrls.push(inlineUrl);
    }

    blogUrls[slug] = { heroUrl, inlineUrls };
  }

  console.log("\n\n📝 Updating MDX files...\n");

  // Update MDX files
  for (const [slug, urls] of Object.entries(blogUrls)) {
    const mdxPath = path.join(contentDir, `${slug}.mdx`);
    if (!fs.existsSync(mdxPath)) {
      console.log(`  ⚠️ MDX not found: ${slug}.mdx`);
      continue;
    }

    const content = fs.readFileSync(mdxPath, "utf-8");
    const lines = content.split("\n");
    let ogImageIndex = 0;

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes("/og-image.png")) {
        if (lines[i].startsWith("image:")) {
          // This is the frontmatter hero image
          lines[i] = `image: "${urls.heroUrl}"`;
          console.log(`  ✅ ${slug} hero → updated`);
        } else {
          // This is an inline image
          if (ogImageIndex < urls.inlineUrls.length) {
            lines[i] = lines[i].replace("/og-image.png", urls.inlineUrls[ogImageIndex]);
            console.log(`  ✅ ${slug} inline[${ogImageIndex}] → updated`);
            ogImageIndex++;
          } else {
            console.log(`  ⚠️ ${slug}: more /og-image.png refs than inline images!`);
          }
        }
      }
    }

    fs.writeFileSync(mdxPath, lines.join("\n"));
  }

  console.log("\n\n🎉 All done! All blog images uploaded and MDX files updated.");
}

main().catch(console.error);
