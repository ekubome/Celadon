"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const categories = ["全部", "Web 应用", "设计系统", "UI/UX", "品牌"];

const projects = [
  {
    id: 1,
    title: "品牌视觉系统",
    category: "设计系统",
    description: "为科技初创公司打造的完整品牌视觉识别系统，包含 Logo、色彩、字体和组件库。",
    year: "2024",
    color: "from-primary/20 to-primary/5",
  },
  {
    id: 2,
    title: "数据可视化平台",
    category: "Web 应用",
    description: "实时数据分析与可视化仪表盘，支持多维度数据展示和交互式图表。",
    year: "2024",
    color: "from-gray-200 to-gray-100",
  },
  {
    id: 3,
    title: "移动端体验设计",
    category: "UI/UX",
    description: "专注于用户体验的移动应用界面设计，提升用户留存率 40%。",
    year: "2023",
    color: "from-primary/15 to-gray-100",
  },
  {
    id: 4,
    title: "电商平台重设计",
    category: "Web 应用",
    description: "对现有电商平台进行全面的用户体验优化和视觉升级。",
    year: "2023",
    color: "from-gray-300/50 to-gray-100",
  },
  {
    id: 5,
    title: "企业官网设计",
    category: "品牌",
    description: "为金融科技公司设计的企业官网，展现专业与创新的品牌形象。",
    year: "2023",
    color: "from-primary/10 to-primary/5",
  },
  {
    id: 6,
    title: "SaaS 产品设计",
    category: "UI/UX",
    description: "B2B SaaS 产品的完整设计，从用户研究到最终交付。",
    year: "2022",
    color: "from-gray-200/80 to-gray-100",
  },
];

export default function WorksPage() {
  const [activeCategory, setActiveCategory] = useState("全部");

  const filteredProjects = useMemo(
    () =>
      activeCategory === "全部"
        ? projects
        : projects.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

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
              作品集
            </span>
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
              精选项目
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl">
              这里展示了我近年来参与的部分项目，涵盖品牌设计、Web 开发和用户体验设计。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="pb-12 px-6">
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

      {/* Projects Grid */}
      <section className="pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link href={`/works/${project.id}`} className="group block">
                    <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50">
                      {/* Project Cover */}
                      <div
                        className={`aspect-[16/10] bg-gradient-to-br ${project.color} relative overflow-hidden`}
                      >
                        {/* Decorative elements */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-32 h-32 rounded-3xl bg-white/30 backdrop-blur-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500" />
                        </div>

                        {/* Year badge */}
                        <div className="absolute top-4 left-4 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-gray-600">
                          {project.year}
                        </div>

                        {/* Hover arrow */}
                        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                          <ArrowUpRight className="w-5 h-5 text-gray-700" />
                        </div>
                      </div>

                      {/* Project Info */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs text-primary font-medium tracking-wide uppercase">
                            {project.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-500">该分类下暂无项目</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
