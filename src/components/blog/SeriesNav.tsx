import Link from "next/link";
import { BookOpen, Check, ChevronRight } from "lucide-react";
import { PostMeta } from "@/lib/posts";

interface SeriesNavProps {
  seriesName: string;
  posts: PostMeta[];
  currentSlug: string;
}

export default function SeriesNav({
  seriesName,
  posts,
  currentSlug,
}: SeriesNavProps) {
  if (posts.length <= 1) return null;

  const currentIndex = posts.findIndex((p) => p.slug === currentSlug);

  return (
    <div className="p-5 rounded-xl bg-gray-50/80 dark:bg-gray-800/90 border border-gray-200/70 dark:border-gray-700 shadow-sm shadow-gray-200/50 dark:shadow-gray-900/20">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-4 h-4 text-primary" />
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">系列文章</h3>
      </div>

      <Link
        href={`/blog/series/${encodeURIComponent(seriesName)}`}
        className="block text-primary font-medium mb-4 hover:underline"
      >
        {seriesName}
      </Link>

      <div className="space-y-1">
        {posts.map((post, index) => {
          const isCurrent = post.slug === currentSlug;
          const isCompleted = index < currentIndex;

          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isCurrent
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {/* Status Icon */}
              <span
                className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                  isCurrent
                    ? "bg-primary text-white"
                    : isCompleted
                    ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                    : "bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-3 h-3" />
                ) : (
                  index + 1
                )}
              </span>

              {/* Title */}
              <span className="flex-1 line-clamp-1">{post.title}</span>

              {/* Arrow for current */}
              {isCurrent && (
                <ChevronRight className="w-4 h-4 text-primary" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Progress */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
          <span>阅读进度</span>
          <span>
            {currentIndex + 1} / {posts.length}
          </span>
        </div>
        <div className="h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / posts.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
