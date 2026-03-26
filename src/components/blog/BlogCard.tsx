import Link from "next/link";
import Image from "next/image";
import { Clock, Tag } from "lucide-react";
import { BlogPost } from "@/libs/blog";

interface BlogCardProps {
  post: BlogPost;
  headingLevel?: "h2" | "h3";
}

export default function BlogCard({ post, headingLevel = "h2" }: BlogCardProps) {
  const HeadingTag = headingLevel;
  return (
    <article className="group flex flex-col h-full bg-slate-50 rounded-3xl overflow-hidden hover:bg-white hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-orange-200">
      <Link href={`/blogs/${post.slug}`} className="flex-1 flex flex-col">
        {post.image && (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-200">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transform group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        <div className="p-8 flex flex-col flex-1">
          <div className="flex items-center gap-4 text-sm text-slate-500 mb-4 font-medium">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-md border border-slate-200">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime} phút đọc
            </span>
          </div>

          <HeadingTag className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-orange-500 transition-colors font-[family-name:var(--font-baloo-2)] leading-tight">
            {post.title}
          </HeadingTag>

          <p className="text-slate-600 mb-6 leading-relaxed flex-1 line-clamp-3">{post.description}</p>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-200/60">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
