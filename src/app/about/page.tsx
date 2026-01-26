"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code, Palette, Lightbulb, Heart, MapPin, Calendar } from "lucide-react";

const skills = [
  {
    category: "设计",
    items: ["UI/UX 设计", "品牌视觉", "交互设计", "设计系统"],
  },
  {
    category: "开发",
    items: ["React / Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
  },
  {
    category: "工具",
    items: ["Figma", "VS Code", "Git", "Framer Motion"],
  },
];

const values = [
  {
    icon: <Palette className="w-5 h-5" />,
    title: "美学追求",
    description: "相信设计的力量，追求视觉与功能的完美平衡。",
  },
  {
    icon: <Code className="w-5 h-5" />,
    title: "技术热情",
    description: "持续学习新技术，用代码实现创意想法。",
  },
  {
    icon: <Lightbulb className="w-5 h-5" />,
    title: "创新思维",
    description: "不满足于常规解决方案，总在寻找更好的方式。",
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: "用户至上",
    description: "始终将用户体验放在首位，创造有价值的产品。",
  },
];

const timeline = [
  {
    year: "2024",
    title: "独立设计师",
    description: "开始独立接项目，专注于品牌设计和 Web 开发。",
  },
  {
    year: "2022",
    title: "高级前端工程师",
    description: "在科技公司负责产品前端架构和设计系统建设。",
  },
  {
    year: "2020",
    title: "UI/UX 设计师",
    description: "加入创业团队，负责产品设计和用户体验优化。",
  },
  {
    year: "2019",
    title: "开始职业生涯",
    description: "从前端开发入行，逐渐对设计产生浓厚兴趣。",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-sm text-primary font-medium tracking-wide uppercase mb-4 block">
              关于我
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 leading-tight mb-8">
              设计师、开发者、
              <br />
              <span className="text-gray-400">终身学习者</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed mb-6">
              我是一名热爱创造的设计师和开发者，专注于打造简约优雅的数字体验。
              相信好的设计应该是无形的，它自然地融入用户的生活，而不是刻意地展示自己。
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                中国
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                5+ 年经验
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-gray-50/80 to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
              我的价值观
            </h2>
            <p className="text-gray-500 max-w-2xl">
              这些核心理念指导着我的工作方式和创作方向。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-100/50 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
              技能专长
            </h2>
            <p className="text-gray-500 max-w-2xl">
              多年积累的技能和工具，帮助我高效地完成各类项目。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-sm font-medium text-primary uppercase tracking-wide mb-4">
                  {skillGroup.category}
                </h3>
                <div className="space-y-3">
                  {skillGroup.items.map((skill) => (
                    <div
                      key={skill}
                      className="px-4 py-3 rounded-xl bg-gray-50 text-gray-700 text-sm font-medium hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
              职业历程
            </h2>
            <p className="text-gray-500 max-w-2xl">
              从前端开发到设计，一路走来的成长轨迹。
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content */}
                  <div className="flex-1 md:text-right pl-8 md:pl-0">
                    {index % 2 === 0 ? (
                      <div className="md:pl-12">
                        <span className="text-sm text-primary font-medium">
                          {item.year}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900 mt-1 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          {item.description}
                        </p>
                      </div>
                    ) : (
                      <div className="md:pr-12 md:text-right">
                        <span className="text-sm text-primary font-medium">
                          {item.year}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900 mt-1 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          {item.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1/2 mt-1.5" />

                  {/* Empty space for alignment */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
