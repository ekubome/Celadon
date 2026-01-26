"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { PostMeta } from "@/lib/posts";

interface RecentPostsClientProps {
  posts: PostMeta[];
}

export function RecentPostsClient({ posts }: RecentPostsClientProps) {
  return (
    <section className="py-32 px-6 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent">
      <div className="max-w-6xl mx-auto">
        {/* 标题区 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <span className="text-sm text-primary font-medium tracking-wide uppercase mb-3 block">
              博客
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
              最新文章
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors group"
          >
            全部文章
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* 文章列表 */}
        <div className="space-y-4">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block">
                <article className="relative p-6 md:p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-100 hover:border-gray-200 hover:bg-white transition-all duration-300 hover:shadow-lg hover:shadow-gray-100/50">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                    {/* 分类标签 */}
                    <div className="flex-shrink-0">
                      <span className="inline-block px-3 py-1 text-xs font-medium text-primary bg-primary/8 rounded-full">
                        {post.category}
                      </span>
                    </div>

                    {/* 文章内容 */}
                    <div className="flex-grow min-w-0">
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-1">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* 日期和箭头 */}
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
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

        {/* 移动端查看全部 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center sm:hidden"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            查看全部文章
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
