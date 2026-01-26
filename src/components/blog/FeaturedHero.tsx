"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { PostMeta } from "@/lib/posts";

interface FeaturedHeroProps {
  posts: PostMeta[];
  autoPlayInterval?: number; // 自动播放间隔，单位毫秒
}

export default function FeaturedHero({ posts, autoPlayInterval = 5000 }: FeaturedHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  }, [posts.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  }, [posts.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // 自动播放
  useEffect(() => {
    if (posts.length <= 1 || isHovered) return;

    const timer = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(timer);
  }, [posts.length, isHovered, autoPlayInterval, goToNext]);

  if (posts.length === 0) return null;

  const currentPost = posts[currentIndex];

  return (
    <div
      className="relative overflow-hidden rounded-3xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides Container */}
      <div className="relative h-[400px] md:h-[480px]">
        {posts.map((post, index) => (
          <div
            key={post.slug}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentIndex
                ? "opacity-100 translate-x-0"
                : index < currentIndex
                ? "opacity-0 -translate-x-full"
                : "opacity-0 translate-x-full"
            }`}
          >
            <Link href={`/blog/${post.slug}`} className="group block h-full">
              <article className="relative h-full bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                {/* Background Image */}
                {post.coverImage ? (
                  <div className="absolute inset-0">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      priority={index === 0}
                      className="object-cover opacity-50 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-gray-900/20" />
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-gray-900 to-gray-800" />
                )}

                {/* Content */}
                <div className="relative h-full p-8 md:p-12 flex flex-col justify-end">
                  {/* Badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 text-xs font-medium bg-primary text-white rounded-full">
                      精选文章
                    </span>
                    <span className="px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full">
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight group-hover:text-primary/90 transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-300 text-base md:text-lg mb-6 line-clamp-2 max-w-2xl">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 md:gap-6 text-sm text-gray-400">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {post.readingTime} 分钟阅读
                      </span>
                    </div>

                    <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-white group-hover:text-primary transition-colors">
                      阅读全文
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {posts.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.preventDefault();
              goToPrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
            style={{ opacity: isHovered ? 1 : 0 }}
            aria-label="上一张"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              goToNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
            style={{ opacity: isHovered ? 1 : 0 }}
            aria-label="下一张"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {posts.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {posts.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                goToSlide(index);
              }}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-8 h-2 bg-primary"
                  : "w-2 h-2 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`跳转到第 ${index + 1} 张`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {posts.length > 1 && !isHovered && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div
            className="h-full bg-primary transition-all ease-linear"
            style={{
              width: "100%",
              animation: `progress ${autoPlayInterval}ms linear infinite`,
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
