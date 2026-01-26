import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { PostMeta } from "@/lib/posts";

interface PostCardFeaturedProps {
  post: PostMeta;
}

export default function PostCardFeatured({ post }: PostCardFeaturedProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <article className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-gray-50/80 to-white/90 dark:from-gray-800 dark:to-gray-800/80 border border-gray-200/80 dark:border-gray-700 shadow-sm shadow-gray-200/50 dark:shadow-gray-900/20 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg hover:shadow-gray-200/80 dark:hover:shadow-gray-900/40 transition-all duration-300">
        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative aspect-[2/1] w-full overflow-hidden rounded-xl mb-6 bg-gray-100 dark:bg-gray-700">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full">
              {post.category}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">精选</span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-primary transition-colors">
            {post.title}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6 flex-grow">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-400 dark:text-gray-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readingTime} 分钟
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
