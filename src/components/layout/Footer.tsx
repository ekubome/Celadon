"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail, ArrowUpRight } from "lucide-react";

const footerLinks = [
  { name: "首页", href: "/" },
  { name: "关于", href: "/about" },
  { name: "作品", href: "/works" },
  { name: "博客", href: "/blog" },
  { name: "联系", href: "/contact" },
];

const socialLinks = [
  { name: "GitHub", icon: <Github className="w-4 h-4" />, href: "#" },
  { name: "Twitter", icon: <Twitter className="w-4 h-4" />, href: "#" },
  { name: "LinkedIn", icon: <Linkedin className="w-4 h-4" />, href: "#" },
  { name: "Email", icon: <Mail className="w-4 h-4" />, href: "mailto:hello@example.com" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-gray-100">
      {/* 顶部装饰线 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-xl font-medium tracking-tight">
                <span className="text-primary">C</span>
                <span className="text-gray-800">eladon</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              专注于创造简约优雅的数字体验，
              用设计和代码构建有温度的产品。
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900">导航</h4>
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900">关注我</h4>
            <div className="flex gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-900 hover:text-white transition-all duration-300"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Celadon. All rights reserved.
          </p>
          <motion.a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            whileHover={{ y: -2 }}
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-900 transition-colors"
          >
            回到顶部
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
