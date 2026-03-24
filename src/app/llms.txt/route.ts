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

  // Additional info
  lines.push("- Website: https://cuthongminh.com");
  lines.push("- Ngôn ngữ: Tiếng Việt");
  lines.push("- Đối tượng: Trẻ em 3-8 tuổi, phụ huynh, giáo viên mầm non");
  lines.push("- Nền tảng: Web (PWA), hoạt động trên mọi thiết bị");
  lines.push(
    "- Đặc điểm: Không quảng cáo, không thu thập dữ liệu cá nhân trẻ em, nội dung được giáo viên kiểm duyệt"
  );
  lines.push("");

  // Section: Game Categories
  lines.push("## Chuyên Mục Trò Chơi");
  lines.push("");
  for (const group of GROUPS) {
    lines.push(`- [${group.title}](${baseUrl}/${group.slug})`);
  }
  lines.push("");

  // Section: Games
  lines.push("## Trò Chơi Giáo Dục");
  lines.push("");
  for (const [slug, seo] of Object.entries(GAME_SEO)) {
    lines.push(`- [${seo.title}](${baseUrl}/games/${slug}): ${seo.description}`);
  }
  lines.push("");

  // Section: Blog Posts
  lines.push("## Bài Viết Blog");
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
          const desc = data.description ? `: ${data.description}` : "";
          lines.push(`- [${title}](${baseUrl}/blogs/${slug})${desc}`);
        } catch {
          lines.push(`- [${slug}](${baseUrl}/blogs/${slug})`);
        }
      }
    }
  } catch {
    // skip blog section if error
  }
  lines.push("");

  // Section: Other Pages
  lines.push("## Trang Khác");
  lines.push("");
  lines.push(
    `- [Về Chúng Tôi](${baseUrl}/about-us): Câu chuyện và sứ mệnh của Cú Thông Minh`
  );
  lines.push(
    `- [Tất Cả Trò Chơi](${baseUrl}/games): Danh sách đầy đủ các trò chơi giáo dục`
  );
  lines.push(
    `- [Blog](${baseUrl}/blogs): Bài viết hướng dẫn dạy trẻ và kiến thức giáo dục sớm`
  );
  lines.push(
    `- [Góp Ý](${baseUrl}/feedback): Gửi phản hồi và góp ý cho Cú Thông Minh`
  );
  lines.push(
    `- [Chính Sách Bảo Mật](${baseUrl}/privacy): Chính sách bảo vệ quyền riêng tư`
  );
  lines.push(
    `- [Điều Khoản Sử Dụng](${baseUrl}/terms): Điều khoản và điều kiện sử dụng`
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
