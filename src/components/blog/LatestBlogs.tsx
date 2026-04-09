import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPaginatedPosts } from "@/libs/blog";
import BlogCard from "./BlogCard";

export default async function LatestBlogs() {
  const { posts } = await getPaginatedPosts(1, 4);

  if (posts.length === 0) return null;

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-baloo-2)] text-slate-900 mb-6 tracking-tight">
              Góc Chia Sẻ <span className="text-orange-500">Kinh Nghiệm</span>
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed font-medium">
              Khám phá những bài viết mới nhất về phương pháp giáo dục sớm, kinh nghiệm nuôi dạy trẻ và các hoạt động
              vui chơi bổ ích tại nhà.
            </p>
          </div>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-orange-500 font-bold hover:text-orange-600 transition-colors group text-lg"
          >
            Xem tất cả bài viết
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} headingLevel="h3" />
          ))}
        </div>
      </div>
    </section>
  );
}
