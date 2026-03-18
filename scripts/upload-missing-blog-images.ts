import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)!;
const bucketName = "blog-images";
const supabase = createClient(supabaseUrl, supabaseKey);

const artifactDirs = [
  "/Users/caoquyle/.gemini/antigravity/brain/bd7395b7-29e4-4b25-bdd2-cd1b4d619d8e",
  "/Users/caoquyle/.gemini/antigravity/brain/36ddf949-02bb-4801-bc8e-37d9b6fcaeac",
  "/Users/caoquyle/.gemini/antigravity/brain/67554dea-0f02-4f2c-92fc-f4aa06c5890f",
];

// ALL image prefixes that need to be in the bucket
const allImagePrefixes = [
  // Nhóm 1
  "hero_be3_tuoi", "be3_nao_bo", "be3_kham_pha", "be3_hoc_qua_choi",
  "hero_be4_tuoi", "be4_tri_tuong_tuong", "be4_choi_cung_ban", "be4_phat_trien",
  "hero_be5_tuoi", "be5_tu_tin", "be5_du_an_hoc_tap", "be5_san_sang",
  "hero_giao_duc_som", "giaoduc_moitruong", "giaoduc_so_sanh", "giaoduc_cu_thong_minh",
  "hero_lich_sinh_hoat", "lich_an_toan", "lich_dieu_chinh",
  // Nhóm 2
  "hero_game_hoc_chu", "game_chon_app", "game_lo_trinh",
  "hero_bang_chu_cai", "bangchucai_nhom_am", "bangchucai_tro_choi",
  "hero_ghep_van", "ghepvan_phuongphap", "ghepvan_hoatdong",
  "hero_tap_doc", "tapdoc_yeu_sach", "tapdoc_doc_to",
  "hero_dau_tieng_viet", "dau_thanh_dieu", "dau_cu_chi_tay", "dau_tro_choi",
  // Nhóm 3
  "hero_hoc_so", "hocso_cap_do", "hocso_do_choi", "hocso_cu_thong_minh",
  "hero_phep_tinh", "pheptinh_san_sang", "pheptinh_tro_choi",
  "hero_tu_duy_logic", "tuduy_nen_tang", "tuduy_cau_do",
  "hero_so_sanh", "sosanh_nen_tang", "sosanh_hoat_dong",
  "hero_dong_ho", "dongho_hanh_trinh", "dongho_diy",
  // Nhóm 4
  "hero_dong_vat", "dongvat_tuong_tac", "dongvat_phan_loai", "dongvat_cu_thong_minh",
  "hero_thoi_tiet", "thoi_tiet_stem",
  "hero_co_the", "cothenguo_giaoduc", "cothe_vung_an_toan",
  "hero_trai_cay", "traicay_nemblindfold", "traicay_smoothie",
  "hero_nghe_nghiep", "nghenghiep_muonnganh", "nghenghiep_roleplay",
  // Nhóm 5
  "hero_mau_sac", "mausac_giaidan", "mausac_hoatdong",
  "hero_to_mau", "tomau_biecambu", "tomau_khenduong",
  "hero_am_nhac", "amnhac_choidongchu", "amnhac_diy_nhaccu",
  "hero_me_cung", "mecung_naobo", "mecung_vetuminh",
  "hero_ve_tranh", "vetranh_12mau", "vetranh_sangtan",
  // Nhóm 6
  "hero_tu_phuc_vu", "tuphucvu_montessori", "tuphucvu_khonggian",
  "hero_an_toan_giao_thong", "antoan_10quytac", "antoan_emlacsgt",
  "hero_cam_xuc", "camxuc_banhxe", "camxuc_hitho",
  "hero_ve_sinh", "vesinh_5thoquen", "vesinh_gamification",
  "hero_nguoi_la", "nguoila_3khong", "nguoila_5tinhhong",
];

function findImage(baseName: string): string | null {
  for (const dir of artifactDirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);
    const match = files.find((f) => f.startsWith(baseName + "_") && f.endsWith(".png"));
    if (match) return path.join(dir, match);
    const exactMatch = files.find((f) => f.startsWith(baseName) && f.endsWith(".png"));
    if (exactMatch) return path.join(dir, exactMatch);
  }
  return null;
}

async function main() {
  // 1. List existing files in bucket
  console.log("📋 Checking existing files in bucket...");
  const { data: existingFiles } = await supabase.storage.from(bucketName).list("", { limit: 500 });
  
  const existingPrefixes = new Set<string>();
  for (const f of existingFiles || []) {
    const match = f.name.match(/^(.+?)-\d+\.webp$/);
    if (match) existingPrefixes.add(match[1]);
  }
  
  // 2. Find which prefixes need to be uploaded
  const toUpload = allImagePrefixes.filter((p) => !existingPrefixes.has(p));
  console.log(`\n📊 Total: ${allImagePrefixes.length} | Already in bucket: ${allImagePrefixes.length - toUpload.length} | Need upload: ${toUpload.length}\n`);
  
  if (toUpload.length === 0) {
    console.log("✅ All images already uploaded!");
    return;
  }

  // 3. Upload missing images
  let uploaded = 0;
  let failed = 0;
  for (const prefix of toUpload) {
    const srcPath = findImage(prefix);
    if (!srcPath) {
      console.log(`  ❌ Source not found: ${prefix}`);
      failed++;
      continue;
    }

    try {
      const outputFileName = `${prefix}-${Date.now()}.webp`;
      const tmpPath = path.join("/tmp", outputFileName);
      await sharp(srcPath).webp({ quality: 80 }).toFile(tmpPath);
      
      const fileBuffer = fs.readFileSync(tmpPath);
      const { error } = await supabase.storage.from(bucketName).upload(outputFileName, fileBuffer, {
        contentType: "image/webp",
        upsert: true,
      });

      if (error) throw error;
      
      fs.unlinkSync(tmpPath);
      uploaded++;
      console.log(`  ✅ [${uploaded}/${toUpload.length}] ${prefix}`);
    } catch (err) {
      console.error(`  ❌ Failed: ${prefix}`, err);
      failed++;
    }
  }

  console.log(`\n🎉 Upload complete! Uploaded: ${uploaded} | Failed: ${failed}`);
}

main().catch(console.error);
