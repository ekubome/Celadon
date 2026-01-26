"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function AboutPreview() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 左侧：装饰性图形 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square max-w-md mx-auto relative">
              {/* 主圆形 */}
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" />

              {/* 装饰圆环 */}
              <div className="absolute inset-4 rounded-full border border-gray-200" />
              <div className="absolute inset-0 rounded-full border border-gray-100" />

              {/* 中心内容 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-light text-gray-300 mb-2">5+</div>
                  <div className="text-sm text-gray-500">年设计经验</div>
                </div>
              </div>

              {/* 浮动标签 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -right-4 top-1/4 px-4 py-2 bg-white rounded-xl shadow-lg shadow-gray-200/50 border border-gray-100"
              >
                <span className="text-sm font-medium text-gray-700">UI/UX</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -left-4 bottom-1/4 px-4 py-2 bg-white rounded-xl shadow-lg shadow-gray-200/50 border border-gray-100"
              >
                <span className="text-sm font-medium text-gray-700">Frontend</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute right-8 bottom-8 px-4 py-2 bg-primary/10 rounded-xl"
              >
                <span className="text-sm font-medium text-primary">Creative</span>
              </motion.div>
            </div>
          </motion.div>

          {/* 右侧：文字内容 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="text-sm text-primary font-medium tracking-wide uppercase">
              关于我
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
              热爱设计与技术的
              <br />
              <span className="text-gray-400">创意工作者</span>
            </h2>
            <p className="text-gray-500 leading-relaxed text-lg">
              我相信好的设计是无形的，它应该自然地融入用户的生活，
              而不是刻意地展示自己。在过去的几年里，我一直在探索
              设计与技术的交汇点，致力于创造既美观又实用的数字产品。
            </p>
            <p className="text-gray-500 leading-relaxed">
              专注于用户体验设计、前端开发和品牌视觉，
              帮助企业和个人打造独特的数字形象。
            </p>
            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-gray-900 font-medium hover:text-primary transition-colors group"
              >
                了解更多关于我
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
