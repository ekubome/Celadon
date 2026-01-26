import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { PostMeta } from "@/lib/posts";

interface RelatedPostsProps {
  posts: PostMeta[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <div className="border-t border-gray-100 pt-12">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">相关文章</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <article className="p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <span className="inline-block px-2 py-0.5 text-xs font-medium text-primary bg-primary/10 rounded mb-3">
                {post.category}
              </span>
              <h4 className="font-medium text-gray-900 group-hover:text-primary transition-colors mb-2 line-clamp-2">
                {post.title}
              </h4>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
