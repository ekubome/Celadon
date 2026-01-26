import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import {
  getPostBySlug,
  getPostSlugs,
  getRelatedPosts,
  getAdjacentPosts,
  getSeriesPosts,
} from "@/lib/posts";
import { markdownToHtml, extractTableOfContents } from "@/lib/markdown";
import { siteConfig } from "@/lib/config";
import TableOfContents from "@/components/blog/TableOfContents";
import RelatedPosts from "@/components/blog/RelatedPosts";
import ReadingProgress from "@/components/blog/ReadingProgress";
import ShareButtons from "@/components/blog/ShareButtons";
import PostNavigation from "@/components/blog/PostNavigation";
import SeriesNav from "@/components/blog/SeriesNav";
import Comments from "@/components/blog/Comments";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "文章未找到",
    };
  }

  return {
    title: `${post.title} | 博客`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.lastModified || post.date,
      tags: post.tags,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const content = await markdownToHtml(post.content);
  const toc = extractTableOfContents(post.content);
  const relatedPosts = getRelatedPosts(slug, 3);
  const { prev, next } = getAdjacentPosts(slug);
  const seriesPosts = post.series ? getSeriesPosts(post.series) : [];

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.lastModified || post.date,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
    image: post.coverImage,
    keywords: post.tags.join(", "),
  };

  return (
    <div className="min-h-screen">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Reading Progress Bar */}
      <ReadingProgress />

      {/* Header */}
      <section className="pt-20 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            返回博客
          </Link>

          {/* Category & Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Link
              href={`/blog/category/${encodeURIComponent(post.category)}`}
              className="px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
            >
              {post.category}
            </Link>
            {post.series && (
              <Link
                href={`/blog/series/${encodeURIComponent(post.series)}`}
                className="px-3 py-1 text-sm font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors"
              >
                {post.series}
              </Link>
            )}
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${encodeURIComponent(tag)}`}
                className="inline-flex items-center gap-1 px-3 py-1 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </Link>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-500 dark:text-gray-400 mb-8">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between gap-6 pb-8 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-6 text-sm text-gray-400 dark:text-gray-500">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readingTime} 分钟阅读
              </span>
            </div>
            <ShareButtons title={post.title} />
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {post.coverImage && (
        <section className="pb-12 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="lg:grid lg:grid-cols-[1fr_200px] lg:gap-12">
            {/* Article Content */}
            <article
              className="prose prose-lg prose-gray dark:prose-invert max-w-none
                prose-headings:font-semibold prose-headings:text-gray-900 dark:prose-headings:text-gray-100
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 dark:prose-strong:text-gray-100
                prose-code:text-primary prose-code:bg-primary/5 dark:prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-[#0d1117] prose-pre:rounded-xl prose-pre:shadow-lg
                prose-ul:text-gray-600 dark:prose-ul:text-gray-300 prose-ol:text-gray-600 dark:prose-ol:text-gray-300
                prose-li:marker:text-gray-400 dark:prose-li:marker:text-gray-500
                prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 dark:prose-blockquote:bg-primary/10 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                prose-img:rounded-xl prose-img:shadow-lg"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Sidebar - Table of Contents & Series Nav */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* Table of Contents */}
                {toc.length > 0 && <TableOfContents items={toc} />}

                {/* Series Navigation */}
                {post.series && seriesPosts.length > 1 && (
                  <SeriesNav
                    seriesName={post.series}
                    posts={seriesPosts}
                    currentSlug={slug}
                  />
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Post Navigation */}
      <section className="px-6">
        <div className="max-w-4xl mx-auto">
          <PostNavigation prev={prev} next={next} />
        </div>
      </section>

      {/* Comments */}
      <section className="px-6">
        <div className="max-w-4xl mx-auto">
          <Comments slug={slug} />
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="pb-32 px-6">
          <div className="max-w-4xl mx-auto">
            <RelatedPosts posts={relatedPosts} />
          </div>
        </section>
      )}
    </div>
  );
}
