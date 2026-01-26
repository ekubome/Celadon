import Link from "next/link";
import { Tags } from "lucide-react";

interface TagCloudProps {
  tags: { tag: string; count: number }[];
  maxTags?: number;
}

export default function TagCloud({ tags, maxTags = 15 }: TagCloudProps) {
  if (tags.length === 0) return null;

  const displayTags = tags.slice(0, maxTags);
  const maxCount = Math.max(...displayTags.map((t) => t.count));
  const minCount = Math.min(...displayTags.map((t) => t.count));

  // Calculate font size based on count
  const getFontSize = (count: number) => {
    if (maxCount === minCount) return "text-sm";
    const ratio = (count - minCount) / (maxCount - minCount);
    if (ratio > 0.7) return "text-base font-medium";
    if (ratio > 0.4) return "text-sm";
    return "text-xs";
  };

  return (
    <div className="p-6 rounded-2xl bg-white border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <Tags className="w-4 h-4 text-primary" />
        <h3 className="font-semibold text-gray-900">标签</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {displayTags.map(({ tag, count }) => (
          <Link
            key={tag}
            href={`/blog/tag/${encodeURIComponent(tag)}`}
            className={`px-3 py-1.5 rounded-full bg-gray-50 text-gray-600 hover:bg-primary/10 hover:text-primary transition-colors ${getFontSize(
              count
            )}`}
            title={`${count} 篇文章`}
          >
            {tag}
          </Link>
        ))}
      </div>

      {tags.length > maxTags && (
        <Link
          href="/blog/tags"
          className="block mt-4 text-sm text-primary hover:underline"
        >
          查看全部标签 ({tags.length})
        </Link>
      )}
    </div>
  );
}
