import Link from "next/link";
import { Metadata } from "next";
import { Tag } from "lucide-react";
import { getAllPostsMeta, getAllTags } from "@/lib/posts";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "标签 | 博客",
  description: "按标签浏览所有博客文章",
};

export default function TagsPage() {
  const posts = getAllPostsMeta();
  const tags = getAllTags();

  // Count posts per tag
  const tagCounts: Record<string, number> = {};
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  // Sort tags by count
  const sortedTags = tags.sort((a, b) => tagCounts[b] - tagCounts[a]);

  // Calculate font size based on count
  const maxCount = Math.max(...Object.values(tagCounts));
  const minCount = Math.min(...Object.values(tagCounts));

  const getTagSize = (count: number) => {
    if (maxCount === minCount) return "text-base";
    const ratio = (count - minCount) / (maxCount - minCount);
    if (ratio > 0.8) return "text-2xl font-semibold";
    if (ratio > 0.6) return "text-xl font-medium";
    if (ratio > 0.4) return "text-lg";
    if (ratio > 0.2) return "text-base";
    return "text-sm";
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <PageHeader
        label="标签"
        title="标签云"
        description="按标签浏览所有文章"
        meta={
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Tag className="w-4 h-4" />
            <span>共 {tags.length} 个标签</span>
          </div>
        }
      />

      {/* Tags Cloud */}
      <section className="pb-32 px-6">
        <div className="max-w-4xl mx-auto">
          {tags.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500">暂无标签</p>
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-white border border-gray-100">
              <div className="flex flex-wrap items-center justify-center gap-4">
                {sortedTags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${encodeURIComponent(tag)}`}
                    className={`group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 hover:bg-primary/10 text-gray-600 hover:text-primary transition-all duration-300 ${getTagSize(
                      tagCounts[tag]
                    )}`}
                  >
                    <Tag className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                    <span>{tag}</span>
                    <span className="text-xs text-gray-400 group-hover:text-primary/60">
                      ({tagCounts[tag]})
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Tags List */}
          <div className="mt-12">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              所有标签
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {sortedTags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${encodeURIComponent(tag)}`}
                  className="group flex items-center justify-between p-4 rounded-xl bg-white border border-gray-100 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Tag className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-gray-700 group-hover:text-primary transition-colors">
                      {tag}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">
                    {tagCounts[tag]} 篇
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
