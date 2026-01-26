import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { PostMeta } from "@/lib/posts";

interface PostCardCompactProps {
  post: PostMeta;
}

export default function PostCardCompact({ post }: PostCardCompactProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="p-6 md:p-8 rounded-2xl bg-white/90 dark:bg-gray-800/80 border border-gray-200/70 dark:border-gray-700 shadow-sm shadow-gray-200/50 dark:shadow-gray-900/20 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md hover:shadow-gray-200/80 dark:hover:shadow-gray-900/40 transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          {/* Cover Image - Small thumbnail */}
          {post.coverImage && (
            <div className="flex-shrink-0 relative w-full md:w-32 h-24 md:h-20 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}

          {/* Category */}
          {!post.coverImage && (
            <div className="flex-shrink-0">
              <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/8 rounded-full">
                {post.category}
              </span>
            </div>
          )}

          {/* Content */}
          <div className="flex-grow min-w-0">
            {post.coverImage && (
              <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/8 rounded-full mb-2">
                {post.category}
              </span>
            )}
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors mb-2">
              {post.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 md:line-clamp-1">
              {post.excerpt}
            </p>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="hidden sm:flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime} 分钟
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
