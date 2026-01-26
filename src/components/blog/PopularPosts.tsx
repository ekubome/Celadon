import Link from "next/link";
import { TrendingUp, Calendar } from "lucide-react";
import { PostMeta } from "@/lib/posts";

interface PopularPostsProps {
  posts: PostMeta[];
}

export default function PopularPosts({ posts }: PopularPostsProps) {
  if (posts.length === 0) return null;

  return (
    <div className="p-6 rounded-2xl bg-white/90 dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700 shadow-sm shadow-gray-200/60 dark:shadow-gray-900/20">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-4 h-4 text-primary" />
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">热门文章</h3>
      </div>

      <div className="space-y-4">
        {posts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block"
          >
            <div className="flex gap-3">
              {/* Number */}
              <span
                className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  index < 3
                    ? "bg-primary/10 text-primary"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
                }`}
              >
                {index + 1}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h4>
                <div className="flex items-center gap-1 mt-1 text-xs text-gray-400 dark:text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
