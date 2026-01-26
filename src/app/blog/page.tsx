import { Metadata } from "next";
import {
  getAllPostsMeta,
  getAllCategories,
  getPopularPosts,
  getCategoriesWithCount,
  getTagsWithCount,
  getFeaturedPosts,
} from "@/lib/posts";
import BlogListClient from "./BlogListClient";
import Sidebar from "@/components/blog/Sidebar";
import FeaturedHero from "@/components/blog/FeaturedHero";

export const metadata: Metadata = {
  title: "博客 | 思考与分享",
  description: "记录设计与开发过程中的思考、经验和学习心得。",
};

export default function BlogPage() {
  const posts = getAllPostsMeta();
  const categories = getAllCategories();
  const popularPosts = getPopularPosts(5);
  const categoriesWithCount = getCategoriesWithCount();
  const tagsWithCount = getTagsWithCount();
  const featuredPosts = getFeaturedPosts(1);
  const heroPost = featuredPosts[0];

  // 过滤掉已在 Hero 区域显示的精选文章，避免重复
  const postsWithoutHero = heroPost
    ? posts.filter((p) => p.slug !== heroPost.slug)
    : posts;

  return (
    <div className="min-h-screen">
      {/* Hero Section with Featured Post */}
      <section className="pt-12 pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          {heroPost ? (
            <FeaturedHero post={heroPost} />
          ) : (
            <div>
              <span className="text-sm text-primary font-medium tracking-wide uppercase mb-4 block">
                博客
              </span>
              <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                思考与分享
              </h1>
              <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl">
                记录设计与开发过程中的思考、经验和学习心得。
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-12">
            {/* Posts List */}
            <div>
              <BlogListClient posts={postsWithoutHero} categories={categories} />
            </div>

            {/* Sidebar - Hidden on mobile, shown on desktop */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <Sidebar
                  popularPosts={popularPosts}
                  categories={categoriesWithCount}
                  tags={tagsWithCount}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
