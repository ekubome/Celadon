import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { PostMeta } from "@/lib/posts";

interface PostCardProps {
  post: PostMeta;
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="group">
        <article className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full">
                {post.category}
              </span>
              <span className="text-xs text-gray-400">精选</span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors">
              {post.title}
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6 flex-grow">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readingTime} 分钟
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="p-6 md:p-8 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-100/50 transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          {/* Category */}
          <div className="flex-shrink-0">
            <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/8 rounded-full">
              {post.category}
            </span>
          </div>

          {/* Content */}
          <div className="flex-grow min-w-0">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors mb-2">
              {post.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 md:line-clamp-1">
              {post.excerpt}
            </p>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="hidden sm:flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime} 分钟
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
