import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Tag } from "lucide-react";
import { getPostsByTag, getAllTags } from "@/lib/posts";
import { PostCard } from "@/components/blog";

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return {
    title: `#${decodedTag} | 博客标签`,
    description: `浏览所有带有 #${decodedTag} 标签的文章`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

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
              标签
            </span>
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
              <Tag className="w-10 h-10 text-primary" />
              {decodedTag}
            </h1>
            <p className="text-xl text-gray-500">
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
