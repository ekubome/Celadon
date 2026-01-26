import { Metadata } from "next";
import { getAllPostsMeta, getAllCategories } from "@/lib/posts";
import BlogListClient from "./BlogListClient";

export const metadata: Metadata = {
  title: "博客 | 思考与分享",
  description: "记录设计与开发过程中的思考、经验和学习心得。",
};

export default function BlogPage() {
  const posts = getAllPostsMeta();
  const categories = getAllCategories();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div>
            <span className="text-sm text-primary font-medium tracking-wide uppercase mb-4 block">
              博客
            </span>
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
              思考与分享
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl">
              记录设计与开发过程中的思考、经验和学习心得。
            </p>
          </div>
        </div>
      </section>

      <BlogListClient posts={posts} categories={categories} />
    </div>
  );
}
