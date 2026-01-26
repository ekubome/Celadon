"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const categories = ["全部", "设计", "技术", "随笔", "教程"];

const posts = [
  {
    id: 1,
    title: "设计系统的构建哲学",
    excerpt:
      "探讨如何从零开始构建一套可扩展、易维护的设计系统，以及在实践中遇到的挑战和解决方案。",
    date: "2024-01-15",
    readTime: "8 分钟",
    category: "设计",
    featured: true,
  },
  {
    id: 2,
    title: "前端性能优化实践",
    excerpt:
      "分享在实际项目中积累的性能优化经验与技巧，包括代码分割、懒加载、缓存策略等。",
    date: "2024-01-08",
    readTime: "12 分钟",
    category: "技术",
    featured: true,
  },
  {
    id: 3,
    title: "关于简约设计的思考",
    excerpt:
      "简约不是简单，而是恰到好处的复杂度。探讨如何在设计中找到这个平衡点。",
    date: "2024-01-02",
    readTime: "5 分钟",
    category: "随笔",
    featured: false,
  },
  {
    id: 4,
    title: "Next.js 14 新特性解析",
    excerpt:
      "深入了解 Next.js 14 带来的新特性，包括 Server Actions、Partial Prerendering 等。",
    date: "2023-12-20",
    readTime: "10 分钟",
    category: "技术",
    featured: false,
  },
  {
    id: 5,
    title: "从零开始学习 Framer Motion",
    excerpt:
      "一份完整的 Framer Motion 入门教程，帮助你快速掌握 React 动画开发。",
    date: "2023-12-15",
    readTime: "15 分钟",
    category: "教程",
    featured: false,
  },
  {
    id: 6,
    title: "色彩理论在 UI 设计中的应用",
    excerpt:
      "如何运用色彩理论来提升界面设计的视觉效果和用户体验。",
    date: "2023-12-08",
    readTime: "7 分钟",
    category: "设计",
    featured: false,
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("全部");

  const filteredPosts = useMemo(
    () =>
      activeCategory === "全部"
        ? posts
        : posts.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  const featuredPosts = posts.filter((p) => p.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm text-primary font-medium tracking-wide uppercase mb-4 block">
              博客
            </span>
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
              思考与分享
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl">
              记录设计与开发过程中的思考、经验和学习心得。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {featuredPosts.map((post, index) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="group">
                <article className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-400">精选</span>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-500 leading-relaxed mb-6 flex-grow">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* All Posts */}
      <section className="pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-4">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link href={`/blog/${post.id}`} className="group block">
                  <article className="p-6 md:p-8 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-100/50 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                      {/* Category */}
                      <div className="flex-shrink-0">
                        <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/8 rounded-full">
                          {post.category}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-grow min-w-0">
                        <h3 className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors mb-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 md:line-clamp-1">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Meta */}
                      <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {post.date}
                          </span>
                          <span className="hidden sm:flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readTime}
                          </span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-500">该分类下暂无文章</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
