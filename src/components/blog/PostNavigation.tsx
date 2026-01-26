import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PostMeta } from "@/lib/posts";

interface PostNavigationProps {
  prev: PostMeta | null;
  next: PostMeta | null;
}

export default function PostNavigation({ prev, next }: PostNavigationProps) {
  if (!prev && !next) return null;

  return (
    <nav className="grid grid-cols-1 md:grid-cols-2 gap-4 py-8 border-t border-gray-100 dark:border-gray-800">
      {/* Previous Post */}
      <div>
        {prev && (
          <Link
            href={`/blog/${prev.slug}`}
            className="group flex flex-col p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              上一篇
            </span>
            <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors line-clamp-2">
              {prev.title}
            </span>
          </Link>
        )}
      </div>

      {/* Next Post */}
      <div className="md:text-right">
        {next && (
          <Link
            href={`/blog/${next.slug}`}
            className="group flex flex-col p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors md:items-end"
          >
            <span className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              下一篇
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors line-clamp-2">
              {next.title}
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}
