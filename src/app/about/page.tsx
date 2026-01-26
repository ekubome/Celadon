"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code, Palette, Lightbulb, Heart, MapPin, Calendar, ExternalLink, Mail, Github, Twitter, Linkedin } from "lucide-react";

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

const featuredProjects = [
  {
    title: "品牌视觉系统",
    category: "设计系统",
    description: "为科技初创公司打造的完整品牌视觉识别系统",
    color: "from-primary/20 to-primary/5",
    link: "#",
  },
  {
    title: "数据可视化平台",
    category: "Web 应用",
    description: "实时数据分析与可视化仪表盘",
    color: "from-gray-200 to-gray-100",
    link: "#",
  },
  {
    title: "移动端体验设计",
    category: "UI/UX",
    description: "专注于用户体验的移动应用界面设计",
    color: "from-primary/15 to-gray-100",
    link: "#",
  },
];

const socialLinks = [
  { name: "GitHub", icon: <Github className="w-5 h-5" />, href: "#" },
  { name: "Twitter", icon: <Twitter className="w-5 h-5" />, href: "#" },
  { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, href: "#" },
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

      {/* Featured Projects Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
              精选项目
            </h2>
            <p className="text-gray-500 max-w-2xl">
              一些我参与过的代表性项目。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <motion.a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1">
                  {/* Project Cover */}
                  <div
                    className={`aspect-[4/3] bg-gradient-to-br ${project.color} relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-xl bg-white/50 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-5">
                    <span className="text-xs text-primary font-medium tracking-wide uppercase">
                      {project.category}
                    </span>
                    <h3 className="text-base font-semibold text-gray-900 mt-1.5 mb-1.5 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Hover Icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <ExternalLink className="w-4 h-4 text-gray-700" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-gradient-to-b from-gray-50/80 to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
              联系我
            </h2>
            <p className="text-gray-500 max-w-2xl">
              无论是项目合作、工作机会还是单纯想聊聊，都欢迎与我联系。
            </p>
          </motion.div>

          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Contact Card */}
              <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-lg shadow-gray-100/50">
                <div className="space-y-6">
                  {/* Email */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                      邮箱
                    </h3>
                    <a
                      href="mailto:hello@example.com"
                      className="flex items-center gap-4 text-xl text-gray-900 hover:text-primary transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <Mail className="w-6 h-6" />
                      </div>
                      <span className="font-medium">hello@example.com</span>
                    </a>
                    <p className="text-sm text-gray-500">
                      这是联系我最快的方式，我通常会在 24 小时内回复。
                    </p>
                  </div>

                  {/* Social Links */}
                  <div className="pt-6 border-t border-gray-100 space-y-4">
                    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                      社交媒体
                    </h3>
                    <div className="flex gap-3">
                      {socialLinks.map((link) => (
                        <a
                          key={link.name}
                          href={link.href}
                          className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-900 hover:text-white transition-all duration-300"
                          aria-label={link.name}
                        >
                          {link.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium text-gray-700">
                    目前可接受新项目
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  我正在寻找有趣的项目合作机会，如果你有想法，欢迎通过邮件联系我。
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
