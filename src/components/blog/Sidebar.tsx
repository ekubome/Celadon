import { PostMeta } from "@/lib/posts";
import AuthorCard from "./AuthorCard";
import PopularPosts from "./PopularPosts";
import CategoryNav from "./CategoryNav";
import TagCloud from "./TagCloud";
import { Rss } from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  popularPosts?: PostMeta[];
  categories?: { category: string; count: number }[];
  tags?: { tag: string; count: number }[];
  activeCategory?: string;
  showAuthor?: boolean;
  showRss?: boolean;
}

export default function Sidebar({
  popularPosts = [],
  categories = [],
  tags = [],
  activeCategory,
  showAuthor = true,
  showRss = true,
}: SidebarProps) {
  return (
    <aside className="space-y-6">
      {/* Author Card */}
      {showAuthor && <AuthorCard />}

      {/* Popular Posts */}
      {popularPosts.length > 0 && <PopularPosts posts={popularPosts} />}

      {/* Categories */}
      {categories.length > 0 && (
        <CategoryNav categories={categories} activeCategory={activeCategory} />
      )}

      {/* Tags */}
      {tags.length > 0 && <TagCloud tags={tags} />}

      {/* RSS Subscribe */}
      {showRss && (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10">
          <div className="flex items-center gap-2 mb-3">
            <Rss className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-gray-900">订阅更新</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            通过 RSS 订阅，第一时间获取最新文章。
          </p>
          <Link
            href="/feed.xml"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-white rounded-full hover:bg-primary hover:text-white transition-colors border border-primary/20"
          >
            <Rss className="w-4 h-4" />
            订阅 RSS
          </Link>
        </div>
      )}
    </aside>
  );
}
