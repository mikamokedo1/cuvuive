import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)!;
const bucketName = "blog-images";

const supabase = createClient(supabaseUrl, supabaseKey);

const contentDir = path.join(process.cwd(), "content/blogs");

// Mapping: blog slug → { hero: supabase filename prefix, inline: [supabase filename prefix, ...] }
// Inline images are in order matching the ![...](/og-image.png) occurrences in each MDX
const blogImageMap: Record<string, { hero: string; inline: string[] }> = {
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

async function main() {
  // List all files in blog-images bucket
  console.log("📋 Listing files in Supabase blog-images bucket...\n");
  
  const { data: files, error } = await supabase.storage.from(bucketName).list("", {
    limit: 500,
    sortBy: { column: "name", order: "asc" },
  });

  if (error) {
    console.error("Error listing bucket files:", error);
    return;
  }

  console.log(`Found ${files?.length} files in bucket\n`);

  // Build a map: prefix → public URL
  const urlMap: Record<string, string> = {};
  for (const file of files || []) {
    // Extract prefix (everything before the timestamp-epoch.webp)
    const match = file.name.match(/^(.+?)-\d+\.webp$/);
    if (match) {
      const { data: { publicUrl } } = supabase.storage.from(bucketName).getPublicUrl(file.name);
      urlMap[match[1]] = publicUrl;
    }
  }

  console.log(`Mapped ${Object.keys(urlMap).length} image prefixes\n`);

  // Check for missing mappings
  let missing = 0;
  for (const [slug, config] of Object.entries(blogImageMap)) {
    if (!urlMap[config.hero]) {
      console.log(`  ❌ Missing: ${config.hero} (hero for ${slug})`);
      missing++;
    }
    for (const img of config.inline) {
      if (!urlMap[img]) {
        console.log(`  ❌ Missing: ${img} (inline for ${slug})`);
        missing++;
      }
    }
  }

  if (missing > 0) {
    console.log(`\n⚠️  ${missing} images missing from bucket. Run upload script first.`);
    return;
  }

  console.log("✅ All images found in bucket! Updating MDX files...\n");

  // Update MDX files
  let totalUpdated = 0;
  for (const [slug, config] of Object.entries(blogImageMap)) {
    const mdxPath = path.join(contentDir, `${slug}.mdx`);
    if (!fs.existsSync(mdxPath)) {
      console.log(`  ⚠️  MDX not found: ${slug}.mdx`);
      continue;
    }

    const content = fs.readFileSync(mdxPath, "utf-8");
    const lines = content.split("\n");
    let ogImageIndex = 0;
    let changed = false;

    for (let i = 0; i < lines.length; i++) {
      if (!lines[i].includes("/og-image.png")) continue;

      // Check if this is the frontmatter hero image line
      if (lines[i].trimStart().startsWith("image:")) {
        const heroUrl = urlMap[config.hero];
        if (heroUrl) {
          lines[i] = `image: "${heroUrl}"`;
          changed = true;
        }
      } else if (lines[i].includes("![")) {
        // This is an inline image
        if (ogImageIndex < config.inline.length) {
          const inlineUrl = urlMap[config.inline[ogImageIndex]];
          if (inlineUrl) {
            lines[i] = lines[i].replace("/og-image.png", inlineUrl);
            changed = true;
          }
          ogImageIndex++;
        } else {
          console.log(`  ⚠️  ${slug}: extra /og-image.png at line ${i + 1}`);
        }
      }
    }

    if (changed) {
      fs.writeFileSync(mdxPath, lines.join("\n"));
      totalUpdated++;
      console.log(`  ✅ Updated: ${slug}.mdx (hero + ${ogImageIndex} inline)`);
    }
  }

  console.log(`\n🎉 Done! Updated ${totalUpdated} MDX files.`);

  // Verify
  const remaining = fs.readdirSync(contentDir)
    .filter((f) => f.endsWith(".mdx"))
    .filter((f) => {
      const content = fs.readFileSync(path.join(contentDir, f), "utf-8");
      return content.includes("/og-image.png");
    });

  if (remaining.length === 0) {
    console.log("✅ No more /og-image.png references found!");
  } else {
    console.log(`\n⚠️  ${remaining.length} MDX files still have /og-image.png:`);
    remaining.forEach((f) => console.log(`  - ${f}`));
  }
}

main().catch(console.error);
