"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, Github, Twitter, Linkedin, CheckCircle } from "lucide-react";

const socialLinks = [
  { name: "GitHub", icon: <Github className="w-5 h-5" />, href: "#" },
  { name: "Twitter", icon: <Twitter className="w-5 h-5" />, href: "#" },
  { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, href: "#" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 模拟提交
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="text-sm text-primary font-medium tracking-wide uppercase mb-4 block">
              联系
            </span>
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
              开始对话
            </h1>
            <p className="text-xl text-gray-500">
              无论是项目合作、工作机会还是单纯想聊聊，都欢迎与我联系。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Email */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                  邮箱
                </h3>
                <a
                  href="mailto:hello@example.com"
                  className="flex items-center gap-3 text-lg text-gray-900 hover:text-primary transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  hello@example.com
                </a>
              </div>

              {/* Location */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                  位置
                </h3>
                <div className="flex items-center gap-3 text-lg text-gray-900">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  中国 · 远程工作
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
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

              {/* Availability */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium text-gray-700">
                    目前可接受新项目
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  我正在寻找有趣的项目合作机会，如果你有想法，欢迎联系我。
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="p-8 md:p-10 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-gray-100/50">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                      消息已发送
                    </h3>
                    <p className="text-gray-500 mb-6">
                      感谢你的来信，我会尽快回复你。
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-primary hover:underline"
                    >
                      发送另一条消息
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="text-sm font-medium text-gray-700"
                        >
                          姓名
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          placeholder="你的名字"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium text-gray-700"
                        >
                          邮箱
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="subject"
                        className="text-sm font-medium text-gray-700"
                      >
                        主题
                      </label>
                      <input
                        type="text"
                        id="subject"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="项目合作 / 工作机会 / 其他"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium text-gray-700"
                      >
                        消息
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                        placeholder="告诉我更多关于你的项目或想法..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/20"
                    >
                      发送消息
                      <Send className="w-4 h-4" />
                    </button>

                    <p className="text-xs text-gray-400 text-center">
                      我会在 24 小时内回复你的消息
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
