import Link from "next/link";
import { Metadata } from "next";
import { Calendar, FileText } from "lucide-react";
import { getAllPostsMeta, PostMeta } from "@/lib/posts";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "归档 | 博客",
  description: "按时间线浏览所有博客文章",
};

interface PostsByYear {
  [year: string]: {
    [month: string]: PostMeta[];
  };
}

const monthNames = [
  "一月", "二月", "三月", "四月", "五月", "六月",
  "七月", "八月", "九月", "十月", "十一月", "十二月"
];

export default function ArchivePage() {
  const posts = getAllPostsMeta();

  // Group posts by year and month
  const postsByYear: PostsByYear = {};

  posts.forEach((post) => {
    const [year, month] = post.date.split("-");

    if (!postsByYear[year]) {
      postsByYear[year] = {};
    }
    if (!postsByYear[year][month]) {
      postsByYear[year][month] = [];
    }
    postsByYear[year][month].push(post);
  });

  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));
  const totalPosts = posts.length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <PageHeader
        label="归档"
        title="文章归档"
        description="按时间线浏览所有文章"
        meta={
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <FileText className="w-4 h-4" />
            <span>共 {totalPosts} 篇文章</span>
          </div>
        }
      />

      {/* Archive Timeline */}
      <section className="pb-32 px-6">
        <div className="max-w-4xl mx-auto">
          {years.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500">暂无文章</p>
            </div>
          ) : (
            <div className="space-y-12">
              {years.map((year) => {
                const months = Object.keys(postsByYear[year]).sort(
                  (a, b) => Number(b) - Number(a)
                );
                const yearPostCount = months.reduce(
                  (acc, month) => acc + postsByYear[year][month].length,
                  0
                );

                return (
                  <div key={year} className="relative">
                    {/* Year Header */}
                    <div className="sticky top-20 z-10 bg-[#fcfcfc]/80 dark:bg-[#0f1419]/80 backdrop-blur-sm py-4 -mx-6 px-6 mb-6">
                      <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          {year}
                        </h2>
                        <span className="px-3 py-1 text-sm text-primary bg-primary/10 rounded-full">
                          {yearPostCount} 篇
                        </span>
                      </div>
                    </div>

                    {/* Months */}
                    <div className="space-y-8 pl-4 border-l-2 border-gray-100 dark:border-gray-700">
                      {months.map((month) => {
                        const monthPosts = postsByYear[year][month];
                        const monthIndex = parseInt(month) - 1;

                        return (
                          <div key={month} className="relative">
                            {/* Month Dot */}
                            <div className="absolute -left-[calc(1rem+5px)] top-1 w-2 h-2 rounded-full bg-primary" />

                            {/* Month Header */}
                            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-4">
                              {monthNames[monthIndex]}
                            </h3>

                            {/* Posts */}
                            <div className="space-y-3">
                              {monthPosts.map((post) => (
                                <Link
                                  key={post.slug}
                                  href={`/blog/${post.slug}`}
                                  className="group block p-4 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 hover:shadow-lg hover:shadow-gray-100/50 dark:hover:shadow-gray-900/50 transition-all duration-300"
                                >
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors truncate">
                                        {post.title}
                                      </h4>
                                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                                        {post.excerpt}
                                      </p>
                                      <div className="mt-2 flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                                        <span className="flex items-center gap-1">
                                          <Calendar className="w-3 h-3" />
                                          {post.date}
                                        </span>
                                        <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">
                                          {post.category}
                                        </span>
                                      </div>
                                    </div>
                                    <span className="text-xs text-gray-300 dark:text-gray-500 whitespace-nowrap">
                                      {post.readingTime} 分钟
                                    </span>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
