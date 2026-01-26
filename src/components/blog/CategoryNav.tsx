import Link from "next/link";
import { FolderOpen } from "lucide-react";

interface CategoryNavProps {
  categories: { category: string; count: number }[];
  activeCategory?: string;
}

export default function CategoryNav({
  categories,
  activeCategory,
}: CategoryNavProps) {
  if (categories.length === 0) return null;

  return (
    <div className="p-6 rounded-2xl bg-white border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <FolderOpen className="w-4 h-4 text-primary" />
        <h3 className="font-semibold text-gray-900">分类</h3>
      </div>

      <div className="space-y-1">
        {categories.map(({ category, count }) => {
          const isActive = activeCategory === category;
          return (
            <Link
              key={category}
              href={`/blog/category/${encodeURIComponent(category)}`}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span>{category}</span>
              <span
                className={`text-xs ${
                  isActive ? "text-primary/70" : "text-gray-400"
                }`}
              >
                {count}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
