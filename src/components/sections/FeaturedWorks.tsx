"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const featuredProjects = [
  {
    id: 1,
    title: "品牌视觉系统",
    category: "设计系统",
    description: "为科技初创公司打造的完整品牌视觉识别系统",
    color: "from-primary/20 to-primary/5",
    accent: "bg-primary/10",
  },
  {
    id: 2,
    title: "数据可视化平台",
    category: "Web 应用",
    description: "实时数据分析与可视化仪表盘",
    color: "from-gray-200 to-gray-100",
    accent: "bg-gray-100",
  },
  {
    id: 3,
    title: "移动端体验设计",
    category: "UI/UX",
    description: "专注于用户体验的移动应用界面设计",
    color: "from-primary/15 to-gray-100",
    accent: "bg-primary/5",
  },
];

export function FeaturedWorks() {
  return (
    <section className="py-32 px-6">
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
              精选作品
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
              近期项目
            </h2>
          </div>
          <Link
            href="/works"
            className="hidden sm:inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors group"
          >
            查看全部
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* 项目网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/works/${project.id}`} className="group block">
                <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1">
                  {/* 项目封面 */}
                  <div
                    className={`aspect-[4/3] bg-gradient-to-br ${project.color} relative overflow-hidden`}
                  >
                    {/* 装饰元素 */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className={`w-24 h-24 rounded-2xl ${project.accent} group-hover:scale-110 transition-transform duration-500`}
                      />
                    </div>
                    {/* 悬停遮罩 */}
                    <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/5 transition-colors duration-300" />
                  </div>

                  {/* 项目信息 */}
                  <div className="p-6">
                    <span className="text-xs text-primary font-medium tracking-wide uppercase">
                      {project.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 mt-2 mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* 悬停箭头 */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight className="w-5 h-5 text-gray-700" />
                  </div>
                </div>
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
            href="/works"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            查看全部作品
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
