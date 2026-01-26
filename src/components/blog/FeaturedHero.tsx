"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { PostMeta } from "@/lib/posts";

interface FeaturedHeroProps {
  posts: PostMeta[];
  autoPlayInterval?: number;
}

export default function FeaturedHero({ posts, autoPlayInterval = 5000 }: FeaturedHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  }, [posts.length]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  }, [posts.length]);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  // 自动播放
  useEffect(() => {
    if (posts.length <= 1 || isHovered) return;

    const timer = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(timer);
  }, [posts.length, isHovered, autoPlayInterval, goToNext]);

  // 触摸滑动支持
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }

    touchStartX.current = null;
  };

  if (posts.length === 0) return null;

  const currentPost = posts[currentIndex];

  // 动画变体
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0, 0, 0.2, 1] as const,
      },
    }),
  };

  return (
    <div
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/[0.03] via-gray-50/80 to-white dark:from-primary/[0.05] dark:via-gray-800/80 dark:to-gray-900 border border-gray-200/80 dark:border-gray-700 shadow-xl shadow-gray-200/50 dark:shadow-gray-900/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 装饰性背景元素 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* 主色调光晕 */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/15 dark:bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-primary/10 dark:bg-primary/[0.07] rounded-full blur-3xl" />

        {/* 浮动圆环 */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-12 right-[15%] w-24 h-24 rounded-full border-2 border-primary/30 dark:border-primary/20"
        />
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-24 right-[20%] w-12 h-12 rounded-full border-2 border-gray-300 dark:border-gray-600"
        />

        {/* 点阵装饰 */}
        <div className="absolute bottom-16 left-8 grid grid-cols-3 gap-2 opacity-30 dark:opacity-20">
          {[...Array(9)].map((_, i) => (
            <div
              key={`dot-${i}`}
              className="w-1.5 h-1.5 rounded-full bg-primary/60"
            />
          ))}
        </div>

        {/* 右下角装饰块 */}
        <div className="absolute bottom-8 right-8 w-32 h-32 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200/50 dark:from-gray-800 dark:to-gray-700/50 blur-sm opacity-50" />
      </div>

      {/* 主内容区 */}
      <div className="relative h-[420px] md:h-[480px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
            }}
            className="absolute inset-0"
          >
            <Link href={`/blog/${currentPost.slug}`} className="group block h-full">
              <article className="relative h-full p-8 md:p-12 flex flex-col md:flex-row gap-8">
                {/* 左侧内容 */}
                <div className="flex-1 flex flex-col justify-center z-10">
                  {/* 标签 */}
                  <motion.div
                    custom={0}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex items-center gap-3 mb-5"
                  >
                    <span className="px-3 py-1.5 text-xs font-medium bg-primary text-white rounded-full shadow-sm">
                      精选文章
                    </span>
                    <span className="px-3 py-1.5 text-xs font-medium bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-600 dark:text-gray-300 rounded-full border border-gray-200/60 dark:border-gray-700/60">
                      {currentPost.category}
                    </span>
                  </motion.div>

                  {/* 标题 */}
                  <motion.h2
                    custom={1}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary transition-colors line-clamp-2"
                  >
                    {currentPost.title}
                  </motion.h2>

                  {/* 摘要 */}
                  <motion.p
                    custom={2}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-gray-600 dark:text-gray-400 text-base md:text-lg mb-6 line-clamp-2 max-w-xl"
                  >
                    {currentPost.excerpt}
                  </motion.p>

                  {/* 元信息 */}
                  <motion.div
                    custom={3}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400"
                  >
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {currentPost.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {currentPost.readingTime} 分钟阅读
                    </span>
                  </motion.div>

                  {/* 阅读按钮 */}
                  <motion.div
                    custom={4}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    className="mt-8"
                  >
                    <span className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-medium text-sm group-hover:bg-primary dark:group-hover:bg-primary dark:group-hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:-translate-y-0.5">
                      阅读全文
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.div>
                </div>

                {/* 右侧图片 */}
                {currentPost.coverImage && (
                  <motion.div
                    custom={2}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    className="hidden md:block w-[45%] relative"
                  >
                    <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl shadow-gray-900/10 dark:shadow-black/30">
                      <Image
                        src={currentPost.coverImage}
                        alt={currentPost.title}
                        fill
                        priority
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {/* 图片遮罩 */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </motion.div>
                )}
              </article>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 导航箭头 */}
      {posts.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.preventDefault();
              goToPrev();
            }}
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 text-gray-700 dark:text-gray-300 flex items-center justify-center transition-all hover:bg-white dark:hover:bg-gray-800 hover:scale-110 hover:shadow-lg ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            aria-label="上一张"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              goToNext();
            }}
            className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 text-gray-700 dark:text-gray-300 flex items-center justify-center transition-all hover:bg-white dark:hover:bg-gray-800 hover:scale-110 hover:shadow-lg ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            aria-label="下一张"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </>
      )}

      {/* 圆点指示器 */}
      {posts.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-200/60 dark:border-gray-700/60">
          {posts.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                goToSlide(index);
              }}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-6 h-2 bg-primary"
                  : "w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
              aria-label={`跳转到第 ${index + 1} 张`}
            />
          ))}
        </div>
      )}

      {/* 进度条 */}
      {posts.length > 1 && !isHovered && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/50 dark:bg-gray-700/50">
          <motion.div
            key={currentIndex}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: autoPlayInterval / 1000, ease: "linear" }}
            className="h-full bg-primary"
          />
        </div>
      )}
    </div>
  );
}
