import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { getAllSeries, getSeriesByName } from "@/lib/posts";

interface PageProps {
  params: Promise<{ series: string }>;
}

export async function generateStaticParams() {
  const allSeries = getAllSeries();
  return allSeries.map((s) => ({
    series: s.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { series: seriesSlug } = await params;
  const series = getSeriesByName(decodeURIComponent(seriesSlug));

  if (!series) {
    return {
      title: "系列未找到",
    };
  }

  return {
    title: `${series.name} | 系列文章`,
    description: `${series.name} 系列共 ${series.posts.length} 篇文章`,
  };
}

export default async function SeriesDetailPage({ params }: PageProps) {
  const { series: seriesSlug } = await params;
  const series = getSeriesByName(decodeURIComponent(seriesSlug));

  if (!series) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <section className="pt-20 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog/series"
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            所有系列
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-primary/10">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <span className="text-sm text-primary font-medium">系列文章</span>
              <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-gray-100">
                {series.name}
              </h1>
            </div>
          </div>

          <p className="text-gray-500 dark:text-gray-400">
            共 {series.posts.length} 篇文章
          </p>
        </div>
      </section>

      <section className="pb-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

            <div className="space-y-6">
              {series.posts.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group relative flex gap-6 pl-12"
                >
                  <div className="absolute left-0 top-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                        index === 0
                          ? "bg-primary text-white"
                          : "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 group-hover:border-primary group-hover:text-primary"
                      }`}
                    >
                      {index + 1}
                    </div>
                  </div>

                  <div className="flex-1 p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 group-hover:border-primary/30 group-hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors mb-2">
                          {post.title}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readingTime} 分钟
                          </span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
