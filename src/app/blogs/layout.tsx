import { Metadata } from "next";
import { HeaderHomeWithSearch } from "@/components/layout/HeaderHomeWithSearch";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Blog Kiến Thức & Nuôi Dạy Trẻ | Cú Thông Minh",
    template: "%s | Cú Thông Minh",
  },
  description: "Góc chia sẻ kiến thức, phương pháp giáo dục sớm, nuôi dạy trẻ và thông tin cập nhật từ Cú Thông Minh.",
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: "Góc Chia Sẻ | Cú Thông Minh",
    description: "Kiến thức và phương pháp giáo dục sớm cho trẻ từ chuyên gia và cộng đồng phụ huynh.",
    images: [{ url: "/og-image.webp", width: 1200, height: 630, alt: "Cú Thông Minh - Blog" }],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-nunito-sans)] flex flex-col">
      <HeaderHomeWithSearch />

      <main className="py-4 lg:py-8 flex-1 mt-16">{children}</main>

      <Footer />
    </div>
  );
}
