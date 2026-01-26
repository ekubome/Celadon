import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { PostMeta } from "@/lib/posts";

interface FeaturedHeroProps {
  post: PostMeta;
}

export default function FeaturedHero({ post }: FeaturedHeroProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        {/* Background Image */}
        {post.coverImage && (
          <div className="absolute inset-0">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="relative p-8 md:p-12 min-h-[400px] flex flex-col justify-end">
          {/* Badge */}
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-xs font-medium bg-primary/90 text-white rounded-full">
              精选文章
            </span>
            <span className="px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight group-hover:text-primary/90 transition-colors">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-gray-300 text-lg mb-6 line-clamp-2 max-w-2xl">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readingTime} 分钟阅读
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-white group-hover:text-primary transition-colors">
              阅读全文
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
