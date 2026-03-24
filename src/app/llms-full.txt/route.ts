import { GAME_SEO } from "@/libs/constants/game-seo";
import { GROUPS } from "@/libs/constants/groups";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const dynamic = "force-static";

export function GET() {
  const baseUrl = "https://cuthongminh.com";
  const lines: string[] = [];

  // H1 - Required
  lines.push("# Cú Thông Minh");
  lines.push("");

  // Blockquote - Summary
  lines.push(
    "> Cú Thông Minh là nền tảng giáo dục tương tác #1 cho trẻ em Việt Nam từ 3-8 tuổi. Hơn 30 trò chơi giáo dục giúp bé vừa học vừa chơi về toán học, ngôn ngữ tiếng Việt, khoa học, kỹ năng sống, âm nhạc, mỹ thuật và tư duy logic. Miễn phí, an toàn, không quảng cáo."
  );
  lines.push("");

  // Detailed info
  lines.push("- Website: https://cuthongminh.com");
  lines.push("- Ngôn ngữ: Tiếng Việt");
  lines.push("- Đối tượng: Trẻ em 3-8 tuổi, phụ huynh, giáo viên mầm non");
  lines.push("- Nền tảng: Web (PWA), hoạt động trên mọi thiết bị di động và máy tính");
  lines.push(
    "- Đặc điểm: Không quảng cáo, không thu thập dữ liệu cá nhân trẻ em, nội dung được giáo viên kiểm duyệt"
  );
  lines.push("- Liên hệ: https://www.facebook.com/cuthongminh");
  lines.push("");
  lines.push(
    "Cú Thông Minh ra đời từ mong muốn biến những giây phút trải nghiệm công nghệ của trẻ em trở nên có ý nghĩa. Tất cả bài học và trò chơi đều được thiết kế bởi đội ngũ giáo viên tâm huyết, đảm bảo tính sư phạm và phù hợp lứa tuổi. Nền tảng hỗ trợ phụ huynh theo dõi tiến độ học tập của bé và giới hạn thời gian sử dụng."
  );
  lines.push("");

  // Section: Game Categories
  lines.push("## Chuyên Mục Trò Chơi");
  lines.push("");
  for (const group of GROUPS) {
    lines.push(`- [${group.title}](${baseUrl}/${group.slug})`);
  }
  lines.push("");

  // Section: Games - Full detail
  lines.push("## Trò Chơi Giáo Dục (Chi Tiết)");
  lines.push("");
  for (const [slug, seo] of Object.entries(GAME_SEO)) {
    lines.push(`### [${seo.title}](${baseUrl}/games/${slug})`);
    lines.push("");
    lines.push(seo.description);
    lines.push("");
    lines.push(seo.seoText);
    lines.push("");
    lines.push("**Tính năng nổi bật:**");
    for (const feature of seo.seoFeatures) {
      lines.push(`- ${feature}`);
    }
    if (seo.relatedBlogs.length > 0) {
      lines.push("");
      lines.push("**Bài viết liên quan:**");
      for (const blog of seo.relatedBlogs) {
        lines.push(`- [${blog.title}](${baseUrl}/blogs/${blog.slug})`);
      }
    }
    lines.push("");
  }

  // Section: Blog Posts - Full detail
  lines.push("## Bài Viết Blog (Chi Tiết)");
  lines.push("");
  const blogsDir = path.join(process.cwd(), "content/blogs");
  try {
    if (fs.existsSync(blogsDir)) {
      const blogFiles = fs
        .readdirSync(blogsDir)
        .filter((file) => file.endsWith(".mdx"))
        .sort();

      for (const file of blogFiles) {
        const slug = file.replace(/\.mdx$/, "");
        try {
          const content = fs.readFileSync(path.join(blogsDir, file), "utf8");
          const { data } = matter(content);
          const title = data.title || slug;
          lines.push(`### [${title}](${baseUrl}/blogs/${slug})`);
          lines.push("");
          if (data.description) {
            lines.push(data.description);
            lines.push("");
          }
          if (data.tags && Array.isArray(data.tags)) {
            lines.push(`Tags: ${data.tags.join(", ")}`);
            lines.push("");
          }
        } catch {
          lines.push(`### [${slug}](${baseUrl}/blogs/${slug})`);
          lines.push("");
        }
      }
    }
  } catch {
    // skip blog section if error
  }

  // Section: Other Pages
  lines.push("## Trang Khác");
  lines.push("");
  lines.push(
    `- [Về Chúng Tôi](${baseUrl}/about-us): Câu chuyện, sứ mệnh và đội ngũ đằng sau Cú Thông Minh. Được phát triển bởi giáo viên, phụ huynh và kỹ sư công nghệ.`
  );
  lines.push(
    `- [Tất Cả Trò Chơi](${baseUrl}/games): Danh sách đầy đủ hơn 30 trò chơi giáo dục chia theo chuyên mục.`
  );
  lines.push(
    `- [Blog](${baseUrl}/blogs): Hơn 60 bài viết hướng dẫn dạy trẻ, kiến thức giáo dục sớm cho phụ huynh.`
  );
  lines.push(
    `- [Giới Thiệu Kiếm Tiền](${baseUrl}/gioi-thieu-kiem-tien): Chương trình giới thiệu bạn bè và nhận thưởng.`
  );
  lines.push(
    `- [Góp Ý](${baseUrl}/feedback): Gửi phản hồi và góp ý cải thiện nền tảng.`
  );
  lines.push(
    `- [Chính Sách Bảo Mật](${baseUrl}/privacy): Cam kết bảo vệ quyền riêng tư, đặc biệt là dữ liệu trẻ em.`
  );
  lines.push(
    `- [Điều Khoản Sử Dụng](${baseUrl}/terms): Điều khoản và điều kiện sử dụng nền tảng.`
  );
  lines.push("");

  const body = lines.join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
