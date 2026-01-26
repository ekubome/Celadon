"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";

export function ContactCTA() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-12 md:p-16 text-center"
        >
          {/* 装饰性背景 */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
            {/* 网格纹理 */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                                  linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          {/* 内容 */}
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center"
            >
              <Mail className="w-7 h-7 text-white" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              有项目想法？
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto">
              无论是品牌设计、网站开发还是其他创意项目，
              我都很乐意与你交流。
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 hover:shadow-xl hover:shadow-white/20 hover:-translate-y-0.5"
              >
                开始对话
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href="mailto:hello@example.com"
                className="inline-flex items-center gap-2 px-8 py-4 text-white/80 hover:text-white transition-colors"
              >
                hello@example.com
              </a>
            </div>
          </div>

          {/* 银色边框光泽 */}
          <div className="absolute inset-0 rounded-3xl border border-white/10" />
        </motion.div>
      </div>
    </section>
  );
}
