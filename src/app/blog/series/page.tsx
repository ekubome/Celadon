import { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ArrowRight, FileText } from "lucide-react";
import { getAllSeries } from "@/lib/posts";

export const metadata: Metadata = {
  title: "系列文章 | 博客",
  description: "按系列浏览文章，系统性学习相关主题。",
};

export default function SeriesListPage() {
  const allSeries = getAllSeries();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-primary/10">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-gray-100">
                系列文章
              </h1>
            </div>
          </div>
          <p className="text-xl text-gray-500 dark:text-gray-400">
            按系列浏览文章，系统性学习相关主题。
          </p>
        </div>
      </section>

      {/* Series List */}
      <section className="pb-32 px-6">
        <div className="max-w-4xl mx-auto">
          {allSeries.length > 0 ? (
            <div className="grid gap-6">
              {allSeries.map((series) => (
                <Link
                  key={series.name}
                  href={`/blog/series/${series.slug}`}
                  className="group block p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors mb-2">
                        {series.name}
                      </h2>
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <span className="flex items-center gap-1.5">
                          <FileText className="w-4 h-4" />
                          {series.posts.length} 篇文章
                        </span>
                      </div>
                      {/* Preview of posts */}
                      <div className="space-y-1">
                        {series.posts.slice(0, 3).map((post, index) => (
                          <div
                            key={post.slug}
                            className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2"
                          >
                            <span className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                              {index + 1}
                            </span>
                            <span className="line-clamp-1">{post.title}</span>
                          </div>
                        ))}
                        {series.posts.length > 3 && (
                          <div className="text-sm text-gray-400 dark:text-gray-500 pl-7">
                            还有 {series.posts.length - 3} 篇...
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <BookOpen className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">暂无系列文章</p>
              <Link
                href="/blog"
                className="inline-block mt-4 text-primary hover:underline"
              >
                浏览所有文章
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
