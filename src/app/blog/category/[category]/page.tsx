import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  getPostsByCategory,
  getAllCategories,
} from "@/lib/posts";
import { PostCard } from "@/components/blog";
import PageHeader from "@/components/ui/PageHeader";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category: encodeURIComponent(category),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  return {
    title: `${decodedCategory} | 博客分类`,
    description: `浏览所有 ${decodedCategory} 分类下的文章`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const posts = getPostsByCategory(decodedCategory);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            返回博客
          </Link>

          <div>
            <span className="text-sm text-primary font-medium tracking-wide uppercase mb-4 block">
              分类
            </span>
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              {decodedCategory}
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400">
              共 {posts.length} 篇文章
            </p>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
