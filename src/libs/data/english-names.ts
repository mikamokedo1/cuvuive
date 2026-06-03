/**
 * English Names Database for Vietnamese Children
 *
 * Each name includes: English name, Vietnamese meaning/equivalent,
 * phonetic guide in Vietnamese, gender, origin, and popularity tier.
 */

export interface EnglishName {
  name: string;
  /** Vietnamese phonetic pronunciation */
  phonetic: string;
  /** Meaning in Vietnamese */
  meaning: string;
  /** Gender: boy, girl, unisex */
  gender: "boy" | "girl" | "unisex";
  /** Name origin */
  origin: string;
  /** Popularity: popular, classic, modern, unique */
  tier: "popular" | "classic" | "modern" | "unique";
  /** Vietnamese name equivalents or related meanings */
  vietnameseMatch: string[];
  /** Short description for display */
  note?: string;
}

export const ENGLISH_NAMES: EnglishName[] = [
  // ─── BOY NAMES ─────────────────────────────────────────────────────
  // Popular
  { name: "Leo", phonetic: "Li-ô", meaning: "Sư tử, dũng cảm", gender: "boy", origin: "Latin", tier: "popular", vietnameseMatch: ["Dũng", "Hùng", "Mạnh", "Lực"], note: "Ngắn gọn, dễ gọi, rất phổ biến quốc tế" },
  { name: "Lucas", phonetic: "Lu-cớt", meaning: "Ánh sáng", gender: "boy", origin: "Latin", tier: "popular", vietnameseMatch: ["Quang", "Sáng", "Minh", "Huy"], note: "Top 3 tên phổ biến nhất thế giới" },
  { name: "Oliver", phonetic: "Ô-li-vơ", meaning: "Cây ô-liu, hòa bình", gender: "boy", origin: "Latin", tier: "popular", vietnameseMatch: ["Bình", "An", "Hòa"], note: "Mang nghĩa hòa bình, thanh lịch" },
  { name: "Ethan", phonetic: "I-thần", meaning: "Mạnh mẽ, vững chãi", gender: "boy", origin: "Hebrew", tier: "popular", vietnameseMatch: ["Cường", "Kiên", "Vững", "Mạnh"] },
  { name: "Noah", phonetic: "Nô-a", meaning: "Nghỉ ngơi, bình yên", gender: "boy", origin: "Hebrew", tier: "popular", vietnameseMatch: ["An", "Bình", "Yên", "Tĩnh"], note: "Tên #1 ở Mỹ nhiều năm liền" },
  { name: "Liam", phonetic: "Li-ầm", meaning: "Chiến binh ý chí", gender: "boy", origin: "Irish", tier: "popular", vietnameseMatch: ["Chí", "Dũng", "Hùng", "Quân"] },
  { name: "James", phonetic: "Jêm-s", meaning: "Người thay thế, kế thừa", gender: "boy", origin: "Hebrew", tier: "popular", vietnameseMatch: ["Kế", "Nối", "Truyền"] },
  { name: "Henry", phonetic: "Hen-ri", meaning: "Vua, người cai trị", gender: "boy", origin: "German", tier: "classic", vietnameseMatch: ["Vương", "Quân", "Hoàng"], note: "Tên hoàng gia Anh, sang trọng" },
  { name: "Daniel", phonetic: "Đa-ni-ồ", meaning: "Thượng đế phán xét", gender: "boy", origin: "Hebrew", tier: "classic", vietnameseMatch: ["Công", "Minh", "Chính"] },
  { name: "Alexander", phonetic: "A-léc-xăn-đơ", meaning: "Người bảo vệ", gender: "boy", origin: "Greek", tier: "classic", vietnameseMatch: ["Bảo", "Vệ", "Hộ"], note: "Tên của Alexander Đại đế" },

  // Modern
  { name: "Jayden", phonetic: "Jây-đần", meaning: "Biết ơn, trân trọng", gender: "boy", origin: "Modern", tier: "modern", vietnameseMatch: ["Ân", "Đức", "Phúc"] },
  { name: "Aiden", phonetic: "Ây-đần", meaning: "Ngọn lửa nhỏ", gender: "boy", origin: "Irish", tier: "modern", vietnameseMatch: ["Viêm", "Nhiệt", "Hỏa"] },
  { name: "Mason", phonetic: "Mây-sần", meaning: "Thợ xây, người tạo dựng", gender: "boy", origin: "English", tier: "modern", vietnameseMatch: ["Kiến", "Tạo", "Dựng"] },
  { name: "Ryan", phonetic: "Rai-ần", meaning: "Vị vua nhỏ", gender: "boy", origin: "Irish", tier: "modern", vietnameseMatch: ["Vương", "Hoàng", "Quân"], note: "Phổ biến và dễ phát âm" },
  { name: "Kevin", phonetic: "Ke-vần", meaning: "Duyên dáng, đẹp trai", gender: "boy", origin: "Irish", tier: "modern", vietnameseMatch: ["Tuấn", "Khôi", "Tú"] },
  { name: "Nathan", phonetic: "Nây-thần", meaning: "Món quà từ trời", gender: "boy", origin: "Hebrew", tier: "modern", vietnameseMatch: ["Thiên", "Phúc", "Ân", "Lộc"] },
  { name: "Dylan", phonetic: "Đi-lần", meaning: "Con trai của biển", gender: "boy", origin: "Welsh", tier: "modern", vietnameseMatch: ["Hải", "Dương", "Biển"] },
  { name: "Brandon", phonetic: "Bran-đần", meaning: "Ngọn đồi, dũng cảm", gender: "boy", origin: "English", tier: "modern", vietnameseMatch: ["Sơn", "Dũng", "Hùng"] },

  // Unique
  { name: "Felix", phonetic: "Fi-lịch", meaning: "May mắn, hạnh phúc", gender: "boy", origin: "Latin", tier: "unique", vietnameseMatch: ["Phúc", "Lộc", "Hạnh", "May"] },
  { name: "Hugo", phonetic: "Hiu-gô", meaning: "Trí tuệ, thông minh", gender: "boy", origin: "German", tier: "unique", vietnameseMatch: ["Trí", "Tuệ", "Minh", "Thông"] },
  { name: "Theo", phonetic: "Thi-ô", meaning: "Món quà thần thánh", gender: "boy", origin: "Greek", tier: "unique", vietnameseMatch: ["Thiên", "Phúc", "Ân"] },
  { name: "Kai", phonetic: "Kai", meaning: "Biển cả", gender: "boy", origin: "Hawaiian", tier: "unique", vietnameseMatch: ["Hải", "Khải", "Dương"], note: "Cực kỳ dễ phát âm cho người Việt" },
  { name: "Max", phonetic: "Mắc-s", meaning: "Vĩ đại nhất", gender: "boy", origin: "Latin", tier: "unique", vietnameseMatch: ["Đại", "Vĩ", "Hùng", "Mạnh"] },
  { name: "Jasper", phonetic: "Jas-pơ", meaning: "Viên ngọc quý", gender: "boy", origin: "Persian", tier: "unique", vietnameseMatch: ["Ngọc", "Bảo", "Châu"] },
  { name: "Oscar", phonetic: "Ốt-ca", meaning: "Ngọn giáo thần thánh", gender: "boy", origin: "Irish", tier: "unique", vietnameseMatch: ["Thần", "Linh", "Thiêng"] },
  { name: "Sebastian", phonetic: "Xê-bát-chiần", meaning: "Đáng kính, tôn quý", gender: "boy", origin: "Greek", tier: "unique", vietnameseMatch: ["Tôn", "Quý", "Kính", "Trọng"], note: "Sang trọng, quý phái" },

  // ─── GIRL NAMES ────────────────────────────────────────────────────
  // Popular
  { name: "Emma", phonetic: "Em-ma", meaning: "Toàn vẹn, vạn năng", gender: "girl", origin: "German", tier: "popular", vietnameseMatch: ["Toàn", "Mỹ", "Hoàn"], note: "Top 1 nhiều năm, dịu dàng" },
  { name: "Olivia", phonetic: "Ô-li-vi-a", meaning: "Cây ô-liu, hòa bình", gender: "girl", origin: "Latin", tier: "popular", vietnameseMatch: ["Bình", "An", "Hòa"], note: "Nữ tính, thanh lịch" },
  { name: "Sophia", phonetic: "Xô-phi-a", meaning: "Trí tuệ, thông thái", gender: "girl", origin: "Greek", tier: "popular", vietnameseMatch: ["Trí", "Tuệ", "Minh", "Thông"], note: "Nghĩa đẹp — trí tuệ" },
  { name: "Mia", phonetic: "Mi-a", meaning: "Của tôi, đáng yêu", gender: "girl", origin: "Scandinavian", tier: "popular", vietnameseMatch: ["Mỹ", "Ái", "Yêu"], note: "Ngắn gọn, phát âm giống tiếng Việt" },
  { name: "Ava", phonetic: "A-va", meaning: "Sự sống, hơi thở", gender: "girl", origin: "Latin", tier: "popular", vietnameseMatch: ["Sinh", "Sống", "Xuân"] },
  { name: "Isabella", phonetic: "I-za-bel-la", meaning: "Thượng đế là lời thề", gender: "girl", origin: "Hebrew", tier: "popular", vietnameseMatch: ["Tín", "Thề", "Nguyện"] },
  { name: "Luna", phonetic: "Lu-na", meaning: "Mặt trăng", gender: "girl", origin: "Latin", tier: "popular", vietnameseMatch: ["Nguyệt", "Hằng", "Trăng"], note: "Tên cực đẹp, mặt trăng" },
  { name: "Chloe", phonetic: "Klô-i", meaning: "Mầm xanh, tươi trẻ", gender: "girl", origin: "Greek", tier: "popular", vietnameseMatch: ["Xuân", "Thanh", "Tươi"] },

  // Classic
  { name: "Alice", phonetic: "A-lịt", meaning: "Cao quý, thanh lịch", gender: "girl", origin: "German", tier: "classic", vietnameseMatch: ["Quý", "Thanh", "Nhã"], note: "Cổ điển, nổi tiếng qua Alice in Wonderland" },
  { name: "Grace", phonetic: "Grây-s", meaning: "Duyên dáng, ân sủng", gender: "girl", origin: "Latin", tier: "classic", vietnameseMatch: ["Duyên", "Ân", "Nhã"] },
  { name: "Charlotte", phonetic: "Sa-lốt", meaning: "Tự do, kiên cường", gender: "girl", origin: "French", tier: "classic", vietnameseMatch: ["Tự", "Do", "Kiên"], note: "Tên công chúa Anh" },
  { name: "Victoria", phonetic: "Víc-to-ri-a", meaning: "Chiến thắng", gender: "girl", origin: "Latin", tier: "classic", vietnameseMatch: ["Thắng", "Thành", "Khải"] },
  { name: "Catherine", phonetic: "Ca-thơ-rin", meaning: "Tinh khiết, trong sáng", gender: "girl", origin: "Greek", tier: "classic", vietnameseMatch: ["Khiết", "Trinh", "Sáng"] },
  { name: "Elizabeth", phonetic: "Ê-li-za-bết", meaning: "Lời hứa của Thượng đế", gender: "girl", origin: "Hebrew", tier: "classic", vietnameseMatch: ["Tín", "Thệ", "Ước"] },

  // Modern
  { name: "Lily", phonetic: "Li-li", meaning: "Hoa huệ, thuần khiết", gender: "girl", origin: "English", tier: "modern", vietnameseMatch: ["Huệ", "Liên", "Ly"], note: "Dễ gọi, giống âm tiếng Việt" },
  { name: "Emily", phonetic: "E-mi-li", meaning: "Cần cù, chăm chỉ", gender: "girl", origin: "Latin", tier: "modern", vietnameseMatch: ["Cần", "Chí", "Chăm"] },
  { name: "Zoe", phonetic: "Dô-i", meaning: "Sự sống", gender: "girl", origin: "Greek", tier: "modern", vietnameseMatch: ["Sinh", "Sống", "Xuân"] },
  { name: "Ruby", phonetic: "Ru-bi", meaning: "Viên hồng ngọc", gender: "girl", origin: "English", tier: "modern", vietnameseMatch: ["Ngọc", "Hồng", "Châu"], note: "Viên đá quý đỏ rực" },
  { name: "Hannah", phonetic: "Han-na", meaning: "Ân sủng, duyên dáng", gender: "girl", origin: "Hebrew", tier: "modern", vietnameseMatch: ["Ân", "Duyên", "Hân"], note: "Phát âm gần giống Hân/Hàn" },
  { name: "Stella", phonetic: "Xté-la", meaning: "Ngôi sao", gender: "girl", origin: "Latin", tier: "modern", vietnameseMatch: ["Sao", "Tinh", "Ngôi"] },
  { name: "Aria", phonetic: "A-ri-a", meaning: "Giai điệu, khí chất", gender: "girl", origin: "Italian", tier: "modern", vietnameseMatch: ["Nhạc", "Ca", "Hòa"], note: "Âm nhạc, thanh thoát" },

  // Unique
  { name: "Aurora", phonetic: "Ơ-ro-ra", meaning: "Bình minh, rạng đông", gender: "girl", origin: "Latin", tier: "unique", vietnameseMatch: ["Rạng", "Đông", "Bình Minh", "Dương"], note: "Công chúa Disney, cực đẹp" },
  { name: "Iris", phonetic: "Ai-rịt", meaning: "Cầu vồng, hoa diên vĩ", gender: "girl", origin: "Greek", tier: "unique", vietnameseMatch: ["Hồng", "Cầu Vồng", "Diên Vĩ"] },
  { name: "Ivy", phonetic: "Ai-vi", meaning: "Dây thường xuân", gender: "girl", origin: "English", tier: "unique", vietnameseMatch: ["Xuân", "Thanh", "Tươi"] },
  { name: "Nova", phonetic: "Nô-va", meaning: "Mới, ngôi sao mới", gender: "girl", origin: "Latin", tier: "unique", vietnameseMatch: ["Tân", "Mới", "Tinh"] },
  { name: "Jade", phonetic: "Jêiđ", meaning: "Ngọc bích", gender: "girl", origin: "English", tier: "unique", vietnameseMatch: ["Ngọc", "Bích", "Châu"], note: "Viên ngọc bích — rất hợp với văn hóa Á Đông" },
  { name: "Willow", phonetic: "Uyn-lâu", meaning: "Cây liễu", gender: "girl", origin: "English", tier: "unique", vietnameseMatch: ["Liễu", "Dương", "Thanh"] },
  { name: "Elara", phonetic: "Ê-la-ra", meaning: "Ánh sáng rực rỡ", gender: "girl", origin: "Greek", tier: "unique", vietnameseMatch: ["Quang", "Sáng", "Rạng"] },
  { name: "Mila", phonetic: "Mi-la", meaning: "Duyên dáng, đáng yêu", gender: "girl", origin: "Slavic", tier: "unique", vietnameseMatch: ["Duyên", "Ái", "Mỹ", "Mi"], note: "Rất gần âm tiếng Việt" },

  // ─── UNISEX NAMES ──────────────────────────────────────────────────
  { name: "Alex", phonetic: "A-léc", meaning: "Người bảo vệ", gender: "unisex", origin: "Greek", tier: "popular", vietnameseMatch: ["Bảo", "Vệ", "Hộ"] },
  { name: "Jordan", phonetic: "Jor-đần", meaning: "Dòng chảy, sông", gender: "unisex", origin: "Hebrew", tier: "modern", vietnameseMatch: ["Hà", "Giang", "Sông"] },
  { name: "Riley", phonetic: "Rai-li", meaning: "Dũng cảm, can đảm", gender: "unisex", origin: "Irish", tier: "modern", vietnameseMatch: ["Dũng", "Cảm", "Đảm"] },
  { name: "Avery", phonetic: "Ây-vơ-ri", meaning: "Vua yêu tinh, quyền lực", gender: "unisex", origin: "English", tier: "modern", vietnameseMatch: ["Quyền", "Lực", "Uy"] },
  { name: "Charlie", phonetic: "Cha-li", meaning: "Tự do", gender: "unisex", origin: "English", tier: "popular", vietnameseMatch: ["Tự", "Do", "Khoáng"] },
  { name: "Sam", phonetic: "Xem", meaning: "Được Thượng đế lắng nghe", gender: "unisex", origin: "Hebrew", tier: "popular", vietnameseMatch: ["Phúc", "Ân", "Thiên"] },
  { name: "Sky", phonetic: "Xkai", meaning: "Bầu trời", gender: "unisex", origin: "English", tier: "unique", vietnameseMatch: ["Thiên", "Trời", "Không"], note: "Ngắn, mạnh mẽ, tự do" },
  { name: "Sage", phonetic: "Xây-jờ", meaning: "Thông thái, cây xô thơm", gender: "unisex", origin: "English", tier: "unique", vietnameseMatch: ["Trí", "Tuệ", "Hiền"] },
];

/**
 * Search names by Vietnamese name or meaning keywords.
 */
export function searchNames(
  query: string,
  gender?: "boy" | "girl" | "unisex" | "all",
): EnglishName[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  let filtered = ENGLISH_NAMES;
  if (gender && gender !== "all") {
    filtered = filtered.filter((n) => n.gender === gender || n.gender === "unisex");
  }

  // Score each name
  const scored = filtered.map((name) => {
    let score = 0;

    // Exact Vietnamese match
    if (name.vietnameseMatch.some((v) => v.toLowerCase() === q)) score += 100;

    // Partial Vietnamese match
    if (name.vietnameseMatch.some((v) => v.toLowerCase().includes(q))) score += 50;

    // Meaning match
    if (name.meaning.toLowerCase().includes(q)) score += 30;

    // Name match
    if (name.name.toLowerCase().includes(q)) score += 20;

    // Note match
    if (name.note?.toLowerCase().includes(q)) score += 10;

    return { name, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.name);
}

/**
 * Get random featured names.
 */
export function getRandomNames(count: number, gender?: "boy" | "girl" | "all"): EnglishName[] {
  let pool = ENGLISH_NAMES;
  if (gender && gender !== "all") {
    pool = pool.filter((n) => n.gender === gender || n.gender === "unisex");
  }

  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/** All unique Vietnamese name matches for autocomplete */
export function getAllVietnameseNames(): string[] {
  const set = new Set<string>();
  ENGLISH_NAMES.forEach((n) => n.vietnameseMatch.forEach((v) => set.add(v)));
  return Array.from(set).sort((a, b) => a.localeCompare(b, "vi"));
}

/** Tier display labels */
export const TIER_LABELS: Record<string, { label: string; color: string }> = {
  popular: { label: "Phổ biến", color: "bg-blue-100 text-blue-700" },
  classic: { label: "Cổ điển", color: "bg-amber-100 text-amber-700" },
  modern: { label: "Hiện đại", color: "bg-green-100 text-green-700" },
  unique: { label: "Độc đáo", color: "bg-purple-100 text-purple-700" },
};

/** Gender display */
export const GENDER_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  boy: { label: "Bé trai", icon: "👦", color: "text-blue-600" },
  girl: { label: "Bé gái", icon: "👧", color: "text-pink-600" },
  unisex: { label: "Unisex", icon: "🌟", color: "text-purple-600" },
};
