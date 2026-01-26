"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden px-6">
      {/* 装饰性几何元素 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* 浮动圆环 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="absolute top-20 right-[15%] w-32 h-32 rounded-full border border-primary/20"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="absolute top-32 right-[18%] w-20 h-20 rounded-full border border-gray-200"
        />

        {/* 左侧装饰线 */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 120 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute left-[10%] top-1/3 w-[1px] bg-gradient-to-b from-primary/40 to-transparent"
        />

        {/* 底部装饰点阵 */}
        <div className="absolute bottom-20 left-[8%] grid grid-cols-3 gap-2 opacity-30">
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={`dot-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + i * 0.05 }}
              className="w-1.5 h-1.5 rounded-full bg-primary/60"
            />
          ))}
        </div>

        {/* 右下角银色渐变块 */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute bottom-32 right-[5%] w-40 h-40 rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200/50 blur-sm"
        />
      </div>

      {/* 主内容区 */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* 标签 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/60 text-sm text-gray-600 shadow-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            欢迎来到我的数字空间
          </span>
        </motion.div>

        {/* 主标题 */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-gray-900 leading-[1.1] mb-8"
        >
          <span className="block">创造简约而</span>
          <span className="block mt-2">
            <span className="relative inline-block">
              <span className="relative z-10 text-primary">优雅</span>
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute bottom-2 left-0 h-3 bg-primary/15 -z-0 rounded"
              />
            </span>
            <span className="text-gray-400">的数字体验</span>
          </span>
        </motion.h1>

        {/* 副标题 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-12 text-balance"
        >
          专注于用户体验与视觉美学的交汇点，
          <br className="hidden sm:block" />
          用代码构建有温度的产品。
        </motion.p>

        {/* 按钮组 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-medium text-base hover:bg-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-gray-900/20 hover:-translate-y-0.5"
          >
            浏览博客
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 rounded-full font-medium text-base border border-gray-200 hover:bg-white hover:border-gray-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            了解更多
          </Link>
        </motion.div>
      </div>

      {/* 滚动提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-xs text-gray-400 tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-gray-300 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 bg-gray-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
